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
---

### Resolución Paso a Paso para Completar la Instalación, Configurar IP Estática y Habilitar SSH

#### **1. Completar la Instalación sin Mirrors**
Cuando los mirrors fallan durante la instalación, Debian instala solo el sistema base. Al iniciar el sistema por primera vez:

**a. Configurar repositorios manualmente:**
```bash
# Editar sources.list
sudo nano /etc/apt/sources.list
```

**Contenido para Debian Bookworm (ajustar según versión):**
```
deb http://deb.debian.org/debian bookworm main contrib non-free non-free-firmware
deb http://deb.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware
deb http://deb.debian.org/debian bookworm-updates main contrib non-free non-free-firmware
```

**b. Actualizar repositorios:**
```bash
sudo apt update
sudo apt upgrade -y
sudo apt install --no-install-recommends sudo vim net-tools
```

---

#### **2. Configurar IP Estática**
**a. Identificar interfaz de red:**
```bash
ip link show  # Buscar nombre (ej: enp0s3, eth0)
```

**b. Configurar IP estática (2 métodos):**

**Método 1: `/etc/network/interfaces` (Clásico)**
```bash
sudo nano /etc/network/interfaces
```

```conf
auto enp0s3
iface enp0s3 inet static
    address 192.168.1.100/24
    gateway 192.168.1.1
    dns-nameservers 8.8.8.8 8.8.4.4
```

**Método 2: Netplan (Debian modernas):**
```bash
sudo nano /etc/netplan/00-installer-config.yaml
```

```yaml
network:
  version: 2
  ethernets:
    enp0s3:
      dhcp4: no
      addresses: [192.168.1.100/24]
      routes:
        - to: default
          via: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]
```

**c. Aplicar cambios:**
```bash
# Para método clásico:
sudo systemctl restart networking

# Para Netplan:
sudo netplan apply
```

**Verificar:**
```bash
ip addr show enp0s3
ping google.com
```

---

#### **3. Configurar y Habilitar SSH**
**a. Instalar servidor SSH:**
```bash
sudo apt install --no-install-recommends openssh-server
```

**b. Configurar seguridad básica:**
```bash
sudo nano /etc/ssh/sshd_config
```

**Ajustes recomendados:**
```conf
PermitRootLogin no
PasswordAuthentication yes  # Cambiar a 'no' luego de configurar keys
AllowUsers tu_usuario
Port 2222  # Opcional: Cambiar puerto predeterminado
```

**c. Habilitar e iniciar servicio:**
```bash
sudo systemctl enable ssh
sudo systemctl restart ssh
```

**d. Verificar funcionamiento:**
```bash
ss -tuln | grep ':22'  # O ':2222' si cambiaste puerto
```

---

#### **4. Acceso Remoto desde otro Equipo**
```bash
ssh tu_usuario@192.168.1.100 -p 22
```

**Si usaste puerto diferente:**
```bash
ssh tu_usuario@192.168.1.100 -p 2222
```

---

#### **5. Firewall Básico (Opcional pero Recomendado)**
```bash
sudo apt install ufw
sudo ufw allow 22/tcp  # O 2222/tcp si cambiaste puerto
sudo ufw enable
sudo ufw status
```

---

#### **Solución de Problemas Comunes**
**Si SSH no funciona:**
1. Verificar que el servicio está activo:
   ```bash
   systemctl status ssh
   ```
2. Comprobar reglas de firewall:
   ```bash
   sudo ufw status
   ```
3. Revisar logs:
   ```bash
   sudo journalctl -u ssh -f
   ```

**Si la red no responde:**
```bash
# Recargar configuración de red
sudo systemctl restart systemd-networkd

# Diagnosticar rutas
ip route show
ping 192.168.1.1  # ¿Llega al gateway?
```

---

### **Resumen de Comandos Esenciales**
| Propósito | Comando |
|-----------|---------|
| **Configurar IP** | `sudo nano /etc/network/interfaces` o `sudo nano /etc/netplan/*.yaml` |
| **Habilitar SSH** | `sudo apt install openssh-server && sudo systemctl enable --now ssh` |
| **Verificar IP** | `ip a` |
| **Probar conectividad** | `ping 8.8.8.8` |
| **Reiniciar red** | `sudo systemctl restart networking` o `sudo netplan apply` |
