## 🖥️ Instalación profesional de Debian en un PC antiguo, incluyendo **particionado, activación de ACLs, y preparación para roles, grupos y sudoers**.

## 🧾 Objetivo

Instalar Debian en un PC antiguo (disco magnético de aprox. 84 GB) con un esquema profesional que permita:
- Separación lógica de datos
- Activación de ACLs (Access Control Lists)
- Gestión de usuarios por roles y grupos
- Seguridad y mantenimiento simplificados

---

## 🔧 Requisitos

- Medio de instalación de Debian (USB/DVD)
- Acceso físico al equipo
- Conexión a Internet

---

## 📐 Esquema de particionado

| Punto de montaje | Tamaño     | Sistema de archivos | Opciones de montaje                   |
|------------------|------------|----------------------|----------------------------------------|
| `/`              | 20 GB      | ext4                | `defaults,acl`                         |
| `/home`          | 50 GB      | ext4                | `defaults,acl,nodev,nosuid`            |
| `/var`           | 10 GB      | ext4                | `defaults,acl,nosuid,noexec`           |
| swap             | 4 GB       | swap                | `sw`                                   |

---

## 🚀 Paso a paso: Instalación y configuración

### 1. Iniciar la instalación

- Insertar el medio de instalación y arrancar (booteo) el sistema desde él.
  - Opciones de booteo del BIOS
- Medio de instalación: 
  - Imágen: debian-12.11.0-amd64-netinst.iso
  - Memoria USB 8Gb
  - Por ejemplo en windows utilizar Rufus para crear el medio de instalación.
- Seleccionar: `Instalación experta` para personalizar particionado.

---

### 2. Particionado Manual

#### 2.1 Crear partición root (`/`)
- Tamaño: `20 GB`
- Tipo: `primaria`
- Punto de montaje: `/`
- Sistema de archivos: `ext4`
- Opciones de montaje: `defaults,acl`

#### 2.2 Crear partición `/home`
- Tamaño: `50 GB`
- Tipo: `lógica`
- Punto de montaje: `/home`
- Sistema de archivos: `ext4`
- Opciones de montaje: `defaults,acl,nodev,nosuid`

#### 2.3 Crear partición `/var`
- Tamaño: `10 GB`
- Tipo: `lógica`
- Punto de montaje: `/var`
- Sistema de archivos: `ext4`
- Opciones de montaje: `defaults,acl,nosuid,noexec`

#### 2.4 Crear partición swap
- Tamaño: `4 GB`
- Tipo: `lógica`
- Uso: `área de intercambio`

---

### 3. Finalizar la instalación

- Completar la instalación de Debian.
- Seleccionar entorno mínimo (sin entorno gráfico).
- Reiniciar el sistema.

---

### 4. Verificar montajes con ACL

```bash
mount | grep acl
````

Si no aparecen, editar `/etc/fstab`:

```fstab
UUID=xxxxx-root   /      ext4    defaults,acl                0 1
UUID=xxxxx-home   /home  ext4    defaults,acl,nodev,nosuid   0 2
UUID=xxxxx-var    /var   ext4    defaults,acl,nosuid,noexec  0 2
UUID=xxxxx-swap   none   swap    sw                          0 0
```

Y remontar:

```bash
sudo mount -o remount /
sudo mount -o remount /home
sudo mount -o remount /var
```

---

### 5. Probar ACL

```bash
sudo mkdir /home/prueba_acl
sudo setfacl -m g:soporte:rx /home/prueba_acl
getfacl /home/prueba_acl
```

---

## 👥 Preparación para roles de usuario

### Crear grupos

```bash
sudo groupadd admin
sudo groupadd soporte
sudo groupadd devs
sudo groupadd auditoria
sudo groupadd usuarios
```

### Crear usuarios y asignar a grupos

```bash
sudo useradd -m -s /bin/bash -G admin dardo
sudo useradd -m -s /bin/bash -G devs juan
sudo useradd -m -s /bin/bash -G soporte maria
sudo useradd -m -s /bin/bash -G auditoria pedro
```

### Establecer contraseñas

```bash
sudo passwd dardo
sudo passwd juan
sudo passwd maria
sudo passwd pedro
```

---

## 🔐 Configurar sudoers (con `visudo`)

```bash
sudo visudo
```

Agregar:

```bash
%admin     ALL=(ALL:ALL) ALL
%soporte   ALL=NOPASSWD: /bin/systemctl restart *, /bin/systemctl status *
%auditoria ALL=NOPASSWD: /bin/journalctl, /usr/bin/less /var/log/syslog
```

---

## ✅ Buenas prácticas

* Deshabilitar login SSH para root: editar `/etc/ssh/sshd_config` → `PermitRootLogin no`
* Usar `umask 027` para seguridad por defecto
* Backup de archivos clave:

  ```bash
  sudo cp /etc/passwd /etc/passwd.bak
  sudo cp /etc/group /etc/group.bak
  sudo cp /etc/sudoers /etc/sudoers.bak
  getfacl -R /home > /root/backup_home_acls.txt
  ```

---

## 🧪 Verificación final

```bash
# Ver usuarios y grupos
getent passwd
getent group

# Ver uso de disco
df -h

# Ver uso de ACL
getfacl /home
```

---

## 🏁 Sistema listo

Tu servidor Debian en PC antiguo está listo para:

* Gestión profesional de usuarios
* Permisos detallados con ACL
* Seguridad con sudoers y aislamiento por partición

```

---

¿Querés que lo exporte también a `.pdf` o te paso directamente este `.md` como archivo descargable?
```
