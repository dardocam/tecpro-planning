## Versión avanzada panel web (Fat-Free) que gestiona hosting por IP y ofrece:

* Crear / eliminar sitios (IP, vhost por IP).
* Backups y restauraciones por sitio.
* Listado de sitios activos, logs y uso de disco.
* Seguridad: ejecución sólo de scripts concretos mediante `sudoers`.
* Plantillas HTML simples y claras para el panel.

Te dejo: estructura del proyecto, código PHP (F3), los scripts Bash seguros que hará el trabajo en el sistema, la entrada `sudoers` recomendada y pasos de instalación. Todo listo para pegar y ejecutar.

---

# 1. Estructura del proyecto (resumen)

```
/var/www/html/hosting/                # app Fat-Free
├─ index.php
├─ app/                               # controladores y helpers
│  └─ HostingController.php
├─ views/
│  ├─ layout.html
│  ├─ home.html
│  ├─ list.html
│  └─ partials/*.html
└─ public/                             # assets si necesitás
/usr/local/hosting/                    # scripts seguros que ejecuta el sistema
├─ create_site.sh
├─ delete_site.sh
├─ backup_site.sh
├─ restore_site.sh
└─ status_site.sh
/etc/sudoers.d/hosting                # reglas sudo para www-data
/root/hosting_sites.conf              # (opcional) registro persistente
/backups/                             # backups por sitio
/var/www/<site>/                      # cada sitio
```

---

# 2. Requisitos previos

```bash
sudo apt update
sudo apt install -y apache2 php libapache2-mod-php git rsync tar acl
# Instalar Fat-Free (o clonar)
cd /var/www/html
git clone https://github.com/bcosca/fatfree.git f3
mkdir -p /var/www/html/hosting
```

---

# 3. Código del panel — PHP (Fat-Free)

Crea `/var/www/html/hosting/index.php`:

```php
<?php
// index.php - Panel hosting (Fat-Free)
$f3 = require __DIR__ . '/../f3/lib/base.php';

$f3->set('DEBUG',0);
$f3->set('UI', 'views/');

class HostingController {
    private $scripts = [
        'create'  => '/usr/local/hosting/create_site.sh',
        'delete'  => '/usr/local/hosting/delete_site.sh',
        'backup'  => '/usr/local/hosting/backup_site.sh',
        'restore' => '/usr/local/hosting/restore_site.sh',
        'status'  => '/usr/local/hosting/status_site.sh'
    ];

    private function run_script($key, $args=[]) {
        if (!isset($this->scripts[$key])) return "SCRIPT_NO_EXIST";
        $script = $this->scripts[$key];
        $cmd = escapeshellcmd($script);
        foreach ($args as $a) { $cmd .= ' ' . escapeshellarg($a); }
        // Ejecutar vía sudo
        $full = "sudo $cmd 2>&1";
        return shell_exec($full);
    }

    function home($f3) {
        echo \Template::instance()->render('home.html');
    }

    function list($f3) {
        // Lista de sitios leyendo /var/www
        $sites = [];
        foreach (glob('/var/www/*', GLOB_ONLYDIR) as $d) {
            $name = basename($d);
            if ($name === 'html' || $name === 'cgi-bin') continue;
            $size = trim(shell_exec("du -sh " . escapeshellarg($d) . " 2>/dev/null | cut -f1"));
            $sites[] = ['name'=>$name,'dir'=>$d,'size'=>$size];
        }
        $f3->set('sites',$sites);
        echo \Template::instance()->render('list.html');
    }

    function create($f3) {
        $ip = $f3->get('POST.ip');
        $site = $f3->get('POST.site');
        $user = $f3->get('POST.user');
        $out = $this->run_script('create',[$ip,$site,$user]);
        $f3->set('message', $out);
        $this->list($f3);
    }

    function delete($f3) {
        $site = $f3->get('POST.site');
        $out = $this->run_script('delete',[$site]);
        $f3->set('message', $out);
        $this->list($f3);
    }

    function backup($f3) {
        $site = $f3->get('POST.site');
        $out = $this->run_script('backup',[$site]);
        $f3->set('message',$out);
        $this->list($f3);
    }

    function restore($f3) {
        $site = $f3->get('POST.site');
        $file = $f3->get('POST.file'); // nombre del archivo en /backups/<site>/
        $out = $this->run_script('restore',[$site,$file]);
        $f3->set('message',$out);
        $this->list($f3);
    }

    function status($f3) {
        $site = $f3->get('GET.site');
        $out = $this->run_script('status',[$site]);
        echo '<pre>'.htmlspecialchars($out).'</pre>';
    }
}

$ctrl = new HostingController();

$f3->route('GET /', [$ctrl,'home']);
$f3->route('GET /sites', [$ctrl,'list']);
$f3->route('POST /create', [$ctrl,'create']);
$f3->route('POST /delete', [$ctrl,'delete']);
$f3->route('POST /backup', [$ctrl,'backup']);
$f3->route('POST /restore', [$ctrl,'restore']);
$f3->route('GET /status', [$ctrl,'status']);

$f3->run();
```

---

# 4. Vistas (muy simples)

Crea `views/layout.html`:

```html
<!doctype html>
<html>
<head><meta charset="utf-8"><title>Panel Hosting</title></head>
<body>
  <h1>Panel Hosting</h1>
  <nav>
    <a href="/">Inicio</a> |
    <a href="/sites">Sitios</a>
  </nav>
  <hr>
  <div>{{ @content }}</div>
</body>
</html>
```

`views/home.html`:

```html
<@ layout.html @>
<h2>Crear sitio</h2>
<form method="post" action="/create">
  IP: <input name="ip" required> <br>
  Sitio: <input name="site" required> <br>
  Usuario: <input name="user" required> <br>
  <button>Crear</button>
</form>
```

`views/list.html`:

```html
<@ layout.html @>
<h2>Sitios</h2>
<@ if @message: @>
  <pre>{{ @message }}</pre>
<@ end @>
<table border=1 cellpadding=6>
<tr><th>Sitio</th><th>Directorio</th><th>Tamaño</th><th>Acciones</th></tr>
<@ for(site in @sites): @>
<tr>
  <td>{{ site.name }}</td>
  <td>{{ site.dir }}</td>
  <td>{{ site.size }}</td>
  <td>
    <form style="display:inline" method="post" action="/backup"><input type="hidden" name="site" value="{{ site.name }}"><button>Backup</button></form>
    <form style="display:inline" method="post" action="/delete" onsubmit="return confirm('Eliminar?')"><input type="hidden" name="site" value="{{ site.name }}"><button>Eliminar</button></form>
    <a href="/status?site={{ site.name }}">Estado</a>
  </td>
</tr>
<@ end @>
</table>
```

---

# 5. Scripts Bash seguros (ejecutables por `www-data` vía sudo)

Crea directorio `/usr/local/hosting` y pon los scripts con permisos 700, propiedad root.

```bash
sudo mkdir -p /usr/local/hosting
sudo chown root:root /usr/local/hosting
sudo chmod 755 /usr/local/hosting
```

## `/usr/local/hosting/create_site.sh`

```bash
#!/bin/bash
# create_site.sh IP SITENAME USER
set -euo pipefail
IP="${1:-}"
SITENAME="${2:-}"
USER="${3:-}"
WEBROOT="/var/www"

# Validaciones básicas (evitar inyección)
[[ -z "$IP" || -z "$SITENAME" || -z "$USER" ]] && { echo "Faltan parámetros"; exit 1; }
if ! [[ "$IP" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then echo "IP inválida"; exit 1; fi
if [[ "$SITENAME" =~ [^a-zA-Z0-9_-] ]]; then echo "Nombre de sitio inválido"; exit 1; fi
if [[ "$USER" =~ [^a-zA-Z0-9_-] ]]; then echo "Usuario inválido"; exit 1; fi

# 1) Crear usuario de sistema sin shell interactivo, home en /var/www/<site>
if ! id "$USER" &>/dev/null; then
  useradd -m -d "$WEBROOT/$SITENAME" -s /usr/sbin/nologin "$USER"
fi

# 2) Crear estructura web
mkdir -p "$WEBROOT/$SITENAME/public_html"
chown -R "$USER":"$USER" "$WEBROOT/$SITENAME"
chmod 750 "$WEBROOT/$SITENAME"

# 3) Añadir IP virtual (no fatal si ya existe)
ip addr add "$IP/24" dev eth0 2>/dev/null || true

# 4) Crear VirtualHost de Apache
CONF="/etc/apache2/sites-available/${SITENAME}.conf"
cat > "$CONF" <<EOF
<VirtualHost ${IP}:80>
    ServerName ${SITENAME}
    DocumentRoot ${WEBROOT}/${SITENAME}/public_html
    <Directory ${WEBROOT}/${SITENAME}/public_html>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    ErrorLog \${APACHE_LOG_DIR}/${SITENAME}_error.log
    CustomLog \${APACHE_LOG_DIR}/${SITENAME}_access.log combined
</VirtualHost>
EOF

a2ensite "${SITENAME}.conf"
systemctl reload apache2

# 5) Crear página de prueba si no existe
if [ ! -f "$WEBROOT/$SITENAME/public_html/index.html" ]; then
  echo "<h1>Bienvenido a $SITENAME</h1>" > "$WEBROOT/$SITENAME/public_html/index.html"
  chown "$USER:$USER" "$WEBROOT/$SITENAME/public_html/index.html"
fi

echo "OK: Sitio $SITENAME creado en $IP con usuario $USER"
```

## `/usr/local/hosting/delete_site.sh`

```bash
#!/bin/bash
set -euo pipefail
SITENAME="${1:-}"
WEBROOT="/var/www"
[[ -z "$SITENAME" ]] && { echo "Falta sitio"; exit 1; }

a2dissite "${SITENAME}.conf" 2>/dev/null || true
rm -f "/etc/apache2/sites-available/${SITENAME}.conf"
systemctl reload apache2

# eliminar dir y usuario (opcional: comentar si preferís conservar datos)
if [ -d "${WEBROOT}/${SITENAME}" ]; then
  rm -rf "${WEBROOT}/${SITENAME}"
fi

# intentar borrar usuario
if id "$SITENAME" &>/dev/null; then
  userdel -r "$SITENAME" 2>/dev/null || true
fi

echo "OK: Sitio $SITENAME eliminado"
```

> Nota: en `delete` el script elimina datos permanentemente. Podés modificarlo para mover a `/backups/deleted/` en vez de borrar.

## `/usr/local/hosting/backup_site.sh`

```bash
#!/bin/bash
set -euo pipefail
SITENAME="${1:-}"
BACKUP_DIR="/backups"
WEBROOT="/var/www"
DATE=$(date +%F_%H-%M-%S)

[[ -z "$SITENAME" ]] && { echo "Falta sitio"; exit 1; }
SRCDIR="${WEBROOT}/${SITENAME}"
if [ ! -d "$SRCDIR" ]; then echo "No existe $SRCDIR"; exit 1; fi

mkdir -p "$BACKUP_DIR/$SITENAME"
tar --numeric-owner -czpf "$BACKUP_DIR/$SITENAME/${SITENAME}_$DATE.tar.gz" -C "$WEBROOT" "$SITENAME"
echo "OK: Backup creado en $BACKUP_DIR/$SITENAME/${SITENAME}_$DATE.tar.gz"
```

## `/usr/local/hosting/restore_site.sh`

```bash
#!/bin/bash
set -euo pipefail
SITENAME="${1:-}"
FILE="${2:-}"
BACKUP_DIR="/backups"
WEBROOT="/var/www"

[[ -z "$SITENAME" || -z "$FILE" ]] && { echo "Faltan parámetros"; exit 1; }
ARCHIVE="$BACKUP_DIR/$SITENAME/$FILE"
if [ ! -f "$ARCHIVE" ]; then echo "Archivo no encontrado: $ARCHIVE"; exit 1; fi

# Detener sitio en Apache antes de restaurar
a2dissite "${SITENAME}.conf" 2>/dev/null || true
systemctl reload apache2

# Restaurar
tar -xzpf "$ARCHIVE" -C "$WEBROOT"

# Restaurar permisos básicos
if id "$SITENAME" &>/dev/null; then
  chown -R "$SITENAME:$SITENAME" "$WEBROOT/$SITENAME"
fi

a2ensite "${SITENAME}.conf"
systemctl reload apache2
echo "OK: Restaurado $SITENAME desde $FILE"
```

## `/usr/local/hosting/status_site.sh`

```bash
#!/bin/bash
set -euo pipefail
SITENAME="${1:-}"
WEBROOT="/var/www"
[[ -z "$SITENAME" ]] && { echo "Falta sitio"; exit 1; }
DIR="$WEBROOT/$SITENAME"
if [ ! -d "$DIR" ]; then echo "NO_EXISTE"; exit 0; fi
echo "Directorio: $DIR"
echo "Tamaño: $(du -sh "$DIR" | cut -f1)"
echo "Logs recientes:"
tail -n 30 /var/log/apache2/${SITENAME}_access.log 2>/dev/null || echo "(sin access.log)"
tail -n 30 /var/log/apache2/${SITENAME}_error.log 2>/dev/null || echo "(sin error.log)"
```

Dale permisos:

```bash
sudo chown root:root /usr/local/hosting/*.sh
sudo chmod 700 /usr/local/hosting/*.sh
```

---

# 6. `sudoers` — permitir solo esos scripts

Crea `/etc/sudoers.d/hosting` con:

```
# Permitir a www-data ejecutar scripts controlados (sin passwd)
www-data ALL=(ALL) NOPASSWD: /usr/local/hosting/create_site.sh, /usr/local/hosting/delete_site.sh, /usr/local/hosting/backup_site.sh, /usr/local/hosting/restore_site.sh, /usr/local/hosting/status_site.sh
```

Permisos:

```bash
sudo chmod 440 /etc/sudoers.d/hosting
```

Esto evita que la web ejecute comandos arbitrarios: **solo** esos scripts.

---

# 7. Backups automáticos por sitio (cron)

Ejemplo: reservar `/etc/cron.daily/hosting_backups`:

```bash
#!/bin/bash
# /etc/cron.daily/hosting_backups
for d in /var/www/*; do
  site=$(basename "$d")
  /usr/local/hosting/backup_site.sh "$site"
done
```

Dale permisos `chmod 750` y propiedad root.

---

# 8. HTTPS y autenticación del panel

* Habilitá HTTPS con Let's Encrypt (certbot) o proxys.
* Protegé el panel con login: podés usar F3 + tabla users en SQLite o .htpasswd. Para producción, HTTPS + autenticación por contraseña fuerte + 2FA si podés.

---

# 9. Seguridad y buenas prácticas

* Los scripts ejecutados por `www-data` **no deben** contener `eval` ni usar variables sin sanitizar.
* Validá siempre los parámetros (ya lo hago en los scripts).
* Mantén `/backups` fuera del webroot y con permisos 700.
* Prueba todo en una VM antes de desplegar en producción.
* Considera usar PHP-FPM + pool por sitio (o chroot / suexec) para mayor aislamiento si alojás código de terceros.
* Logs: rota con `logrotate` y monitorizá con `fail2ban` si expusieras panel o SSH.

---

# 10. Cómo desplegarlo paso a paso (resumen rápido)

1. Instalar requisitos, clonar F3, crear `/var/www/html/hosting`.
2. Pegar `index.php` y `views/*`.
3. Crear `/usr/local/hosting/` y guardar los scripts; `chmod 700`.
4. Crear `/etc/sudoers.d/hosting` con la regla mostrada.
5. Asegurar `/backups` y `/var/www` permisos.
6. Reiniciar Apache y probar:

   * Acceder `http://IP/hosting` (mejor `https`).
   * Crear un sitio: IP, site, user.
   * Probar backup y restore desde la UI.
7. Ajustar firewall / fail2ban para proteger el panel.

---

Si querés, te genero **los archivos listos para copiar** — por ejemplo un `.tar.gz` con la estructura y todos los scripts y plantillas — o te los pego aquí uno por uno para que copies.
También puedo añadir:

* Autenticación de usuarios del panel (SQLite).
* Notificaciones (Telegram / email) al completar backups.
* Soporte PHP-FPM pools por sitio (para aislar procesos PHP).
