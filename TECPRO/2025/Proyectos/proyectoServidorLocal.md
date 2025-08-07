
# Proyecto de Instalación y Configuración de Servidor Local

- **Institución:** EESTN3 - "Nikola Tesla-Necochea"  
- **Dispositivo Central:** PC antigua
- **Fecha:** 08/08/2025 
- **Responsable del proyecto:** Prof. Dardo Camaño
- **Jefe de área:** Prof. Matias Gigena

---

## 1. Resumen Ejecutivo

Este proyecto propone la puesta en marcha de un servidor local basado en GNU/Linux (Debian) utilizando un equipo antiguo disponible en la institución. El servidor será empleado para alojar entornos de desarrollo de aplicaciones web y móviles.

---

## 2. Justificación

* **Reutilización de recursos existentes**, impulsando la sustentabilidad y economía institucional.
* **Entornos controlados para alumnos**, facilitando el desarrollo de aplicaciones web (por ejemplo ambientes LAMP) y móviles, sin depender de servicios en la nube.
* **Sólida base de conectividad**, ya habilitada por la red cableada en salones y laboratorios.
* **Formación práctica para estudiantes**, al interactuar con tecnologías reales de servidores y redes.

---

## 3. Antecedentes

El proyecto de red cableada implementado previamente en la institución fue fundamental para establecer una infraestructura confiable y segura. Gracias a ese despliegue, el servidor podrá integrarse desde el primer día, aprovechando la infraestructura física (cableado, switches, conectividad LAN) existente.

---

## 4. Objetivos

### 4.1 Objetivo General

Instalar y configurar un servidor Debian en un equipo antiguo, optimizado para ser plataforma de desarrollo de aplicaciones web y móviles.

### 4.2 Objetivos Específicos

* Preparar el hardware (PC antiguo), validando componentes y almacenamiento.
* Instalar Debian usando **red cableada** para la descarga automatizada de paquetes (instalación netinst) ([debian.org][1], [The Debian Administrator's Handbook][2]).
* Configurar servicios esenciales: SSH, servidor web (Apache o Nginx), base de datos (MySQL/PostgreSQL), lenguajes y frameworks (PHP, Node.js, etc.) ([alt72.com.ar][3], [elseniordeloslinux.com][4]).
* Asignar IP estática al servidor para estabilidad en conexiones ([debianchile.org][5]).
* Asegurar la operatividad mediante backups, control de acceso y documentación detallada ([Wikipedia][6]).

---

## 5. Alcance del Proyecto

* **Hardware**: Reciclaje de un PC antiguo, con comprobación de RAM, almacenamiento y adaptador de red.
* **Software**: Debian (modo “netinst”), sin entorno gráfico.
* **Servicios**: SSH para administración remota, LAMP/LNMP para desarrollo, repositorios internos opcionales.
* **Red**: Explotación de la infraestructura cableada ya existente.
* **Documentación**: Manual de instalación, configuración, red tomada (diagrama), usuarios, backups.

---

## 6. Detalles Técnicos

### 6.1 Instalación de Debian

* Utilizar instalador netinst por USB o CD-ROM, eligiendo instalación automatizada por DHCP y configuración de red ([debian.org][1], [The Debian Administrator's Handbook][2]).
* Establecer contraseña de root o habilitar usuario con permisos sudo ([debian.org][7], [The Debian Administrator's Handbook][2]).

### 6.2 Configuración de red

* Asignación de IP estática mediante archivo `/etc/network/interfaces` para asegurar conexión fija dentro de la LAN ([debianchile.org][5]).
* Verificación de conectividad mediante `ifconfig` o `ip a` (comandos típicos para comprobar IP y estado de interfaces) ([alt72.com.ar][3], [Jugando a ejercer la Ingeniería][8]).

### 6.3 Instalación de servicios

* Entorno de desarrollo tipo LAMP: Apache, PHP, MySQL o PostgreSQL, con la configuración abierta para alumnos ([alt72.com.ar][3]).
* Alternativamente, se pueden instalar stacks modernos según necesidades (Node.js, frameworks, repositorios privados).
* Herramientas de administración: SSH, backups automatizados y documentación organizada.

---

## 7. Pruebas y Validación

* **Accesibilidad**: Verificar acceso via SSH desde otros puestos de la LAN.
* **Servicios web**: Desplegar una página de prueba (“It works!”) en Debian y comprobar acceso desde navegadores del aula.
* **Desempeño**: Evaluar tiempos de respuesta, carga en el hardware antiguo.
* **Estabilidad**: Pruebas de reinicio, recuperación, respaldos y documentación.

---

## 8. Cronograma

| Fase                                       | Duración Estimada |
| ------------------------------------------ | ----------------- |
| Preparación de hardware y respaldo         | 1 semana          |
| Instalación de Debian y configuración base | 1 semana          |
| Configuración de servicios y pruebas       | 1 semana          |
| Documentación y capacitación               | 1 semana          |

---

## 9. Presupuesto

* Hardware: equipo existente (sin costo).
* Software: Debian y herramientas libres.
* Mano de obra: horas de instalación, pruebas y documentación.
* Riesgos: componentes obsoletos (ej. discos mecánicos), posible necesidad de ampliar RAM o almacenamiento.

---

## 10. Mantenimiento y Soporte

* **Actualizaciones periódicas** (apt‑get update/upgrade).
* **Backups diarios o semanales** de proyectos y configuraciones.
* **Documentación activa**, diagramas de red, usuarios, licencias.

---

## 11. Conclusión

La instalación de un servidor local Debian en un equipo antiguo promueve la experimentación y el desarrollo práctico en la EESTN3 – “Nikola Tesla‑Necochea”. Este proyecto solo es posible gracias a la infraestructura de red cableada previamente instalada, que garantiza conectividad estable y segura. La combinación de plataforma física reutilizada, software libre y entorno educativo práctico constituye una solución eficiente, sostenible y formativa.

---

## 12. Anexos

* **Diagrama de red** que muestra la ubicación del servidor dentro de la infraestructura cableada.
* **Configuración de Debian**: fragmentos del archivo `/etc/network/interfaces`, sshd\_config, habilitación de servicios.
* **Manual de uso para estudiantes**: cómo desplegar una app, acceder al servidor, buenas prácticas.
* **Historial de pruebas y logs**.

---