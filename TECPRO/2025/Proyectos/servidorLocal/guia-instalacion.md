## 🖥️ Instalación profesional de Debian en un PC antiguo, incluyendo **particionado, activación de ACLs, y preparación para roles, grupos y sudoers**.

**Institución:** EESTN3 - "Nikola Tesla-Necochea"  
**Dispositivo Central:** PC Antiguo.  
**Fecha de inicio:** 08/08/2025 

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

### 3. Finalizar la instalación del sistema

- Completar la instalación de Debian.
- Seleccionar entorno mínimo (sin entorno gráfico).
- Reiniciar el sistema.

---