
# Proyecto de Instalación y Configuración de Red Cableada en P.A del sector TECPRO  
**Institución:** EESTN3 - "Nikola Tesla-Necochea"  
**Dispositivo Central:** MikroTik RouterBOARD hEX GR3 RB750Gr3  
**Fecha:** 13/03/2025 


**Responsable del proyecto:** Prof. Dardo Camaño

**Jefe de área:** Prof. Matias Gigena



---

## 1. Resumen Ejecutivo

El presente documento tiene como objetivo presentar el proyecto de instalación de una red cableada en la institución educativa "EESTN3 - Nikola Tesla-Necochea", así como la configuración del router MikroTik RouterBOARD hEX GR3 RB750Gr3. Se detallan las fases de planificación, diseño, instalación física, configuración de equipos, pruebas y validación, garantizando una infraestructura robusta, segura y escalable que cumpla con las necesidades actuales y futuras de conectividad y servicios de red de la institución.

---

## 2. Introducción

El creciente requerimiento de conectividad en entornos educativos demanda la implementación de soluciones de red que ofrezcan alta disponibilidad, seguridad y facilidad de gestión. Este proyecto se enfoca en la instalación de un sistema de red cableada, complementado con la configuración avanzada de un router MikroTik para garantizar el acceso a Internet (WAN), segmentación de tráfico interno y políticas de seguridad.

---

## 3. Objetivos

### 3.1 Objetivo General
- Implementar una red cableada robusta en la institución educativa, integrando la configuración del router MikroTik hEX GR3 RB750Gr3 para administrar de forma centralizada el acceso a la WAN y la distribución interna del servicio.

### 3.2 Objetivos Específicos
- Diseñar y documentar la infraestructura de red, considerando los requerimientos actuales y futuros de la institución.
- Seleccionar y ejecutar la instalación del cableado estructurado siguiendo las mejores prácticas.
- Configurar el router MikroTik para gestionar el acceso a Internet, implementar reglas de firewall, NAT y asignación de direcciones IP mediante DHCP.
- Realizar pruebas de conectividad, rendimiento y seguridad que garanticen el correcto funcionamiento del sistema.
- Capacitar al personal técnico en el mantenimiento y administración de la red.

---

## 4. Alcance del Proyecto

El proyecto abarca:
- El diseño y la instalación física del cableado estructurado en las áreas designadas (salones, laboratorios, oficinas y áreas comunes).
- La configuración e integración del router MikroTik conectado a la WAN, que actuará como puerta de enlace y gestor de tráfico.
- La documentación completa del proyecto, incluyendo diagramas de red, configuraciones y protocolos de mantenimiento.
- La realización de pruebas de conectividad, rendimiento y seguridad antes de la entrega final.

---

## 5. Descripción del Proyecto

### 5.1 Infraestructura de Red
- **Cableado Estructurado:** Se instalará cable UTP categoría 6 o superior, asegurando el cumplimiento de normativas y certificaciones que garanticen la calidad de la transmisión.
- **Equipos Complementarios:** Se utilizarán switches (no administrables ) para la segmentación de la red interna, además de puntos de acceso en principio un dispositivo Ubiquiti Unifi y TP‑Link WR840N
- **Router Central:** MikroTik RouterBOARD hEX GR3 RB750Gr3, encargado de la conexión WAN, la gestión del tráfico y la seguridad perimetral.

### 5.2 Requerimientos Técnicos
- Disponibilidad de canalizaciones y canalizaciones (ductos, bandejas, etc.) para el paso del cableado.
- Espacios adecuados para la instalación de armarios de red y racks.
- Conexión a la red de área amplia (WAN) de la institución o proveedor externo de Internet.

---

## 6. Diseño y Planificación de la Red

### 6.1 Diseño Físico
- **Plano de Ubicación:** Se elaborará un plano detallado de la institución, indicando la ubicación de cada punto de red, armarios de telecomunicaciones y equipos de distribución.
- **Ruta del Cableado:** Se definirá la ruta óptima para el tendido de cables, minimizando interferencias y facilitando futuros mantenimientos.

### 6.2 Diseño Lógico
- **Segmentación de Red:** Se establecerán subredes para separar el tráfico cableado del tráfico wifi.
- **Políticas de Seguridad:** Definición de reglas de firewall, NAT y protocolos de acceso, especialmente en el router MikroTik.
- **Asignación de Direcciones IP:** Uso de DHCP para la asignación dinámica de direcciones en la red interna, con reservas para servidores y equipos críticos.

---

## 7. Instalación de la Red Cableada

### 7.1 Materiales y Herramientas
- Cable UTP categoría 6 (o superior) y conectores RJ45.
- Herramientas de crimpado, certificadores de cableado y etiquetadoras.
- Armarios de telecomunicaciones, racks y canalizaciones.

### 7.2 Procedimiento de Instalación
- **Planificación y Marcado:** Revisión del plano y marcaje de rutas en obra.
- **Tendido del Cableado:** Instalación física del cableado siguiendo las rutas establecidas.
- **Conectividad y Pruebas:** Conexión de cables en puntos de red y realización de pruebas de certificación para verificar la calidad de la instalación.

---

## 8. Configuración del Router MikroTik RouterBOARD hEX GR3 RB750Gr3

### 8.1 Conexión y Acceso Inicial
- **Conexión Física:** El puerto WAN del router se conecta a la fuente de Internet, mientras que los puertos LAN distribuyen el tráfico interno.
- **Acceso a la Interfaz:** Acceso vía web con usuario y contraseña privado entregado a la jefatura.

### 8.2 Configuración de Interfaces y Servicios
- **Asignación de IP:** Configuración de la dirección IP WAN vía DHCP, creación de la red interna cableada 192.168.10.0/24 en la interfaz LAN ether2 creación de la red interna wifi 192.168.20.0/24 en la interface ether4, creación de la red interna wifi para brindar conectividad al sector de biblioteca 192.168.30.0/24 ambas integrando el sistema de portal cautivo. (tecpro-tecpro (~50M/50M) / biblioteca-biblioteca (~5M/5M))
- **DHCP Server:** Configuración del servidor DHCP para asignar direcciones IP dinámicamente a los dispositivos conectados.
- **NAT y Firewall:** 
  - Configuración de reglas NAT para traducir la red interna hacia la WAN.

### 8.3 Seguridad y Respaldo
- **Actualizaciones de Firmware:** Verificación y actualización a la última versión del firmware del dispositivo.
- **Backups:** Configuración de respaldos periódicos de la configuración del router.
- **Monitoreo:** Implementación de herramientas de monitoreo para la detección temprana de incidencias.

---

## 9. Pruebas y Validación de la Red

### 9.1 Pruebas de Conectividad
- Verificar la comunicación entre dispositivos internos y la correcta salida a Internet.
- Ejecución de pruebas de ping, traceroute y verificación de rutas.

### 9.2 Pruebas de Rendimiento
- Evaluación de la velocidad y estabilidad de la red interna y la conexión WAN.
- Pruebas de carga para identificar posibles cuellos de botella.

### 9.3 Validación de la Seguridad
- Simulaciones de ataques y análisis de tráfico para confirmar la efectividad de las reglas de firewall.
- Revisión de logs y auditorías de acceso para detectar vulnerabilidades.

---

## 10. Cronograma y Presupuesto

### 10.1 Cronograma
- **Fase de Planificación:** 10/02/2025
- **Instalación Física:** 17/02/2025
- **Configuración y Pruebas:** 24/02/2025
- **Capacitación y Puesta en Marcha:** 31/02/2025

### 10.2 Presupuesto
- **Materiales:** Cableado, conectores, armarios y herramientas.
- **Equipos:** Router MikroTik y switches.
- **Mano de Obra y Servicios:** Instalación, configuración y pruebas.
- **Contingencias:** Reserva presupuestaria para imprevistos.

---

## 11. Mantenimiento y Soporte

- **Plan de Mantenimiento Preventivo:** Revisión periódica de la infraestructura, actualización de firmware y verificación de la integridad del cableado.
- **Capacitación:** Entrenamiento al personal técnico en la administración del router y solución de incidencias.
- **Soporte Técnico:** Acuerdos de soporte con proveedores para atención de incidencias críticas y actualizaciones de sistema.

---

## 12. Conclusiones y Recomendaciones

La implementación de esta red cableada, junto con la configuración especializada del router MikroTik RouterBOARD hEX GR3 RB750Gr3, proporcionará a la institución educativa una infraestructura de conectividad confiable, segura y escalable. Se recomienda seguir las pautas de mantenimiento y capacitación presentadas para asegurar el óptimo funcionamiento a largo plazo y adaptarse a futuros requerimientos tecnológicos.

---

## 13. Anexos

- **Diagramas de Red:** Esquemas detallados del diseño físico y lógico.
- **Factura de compra router MikroTik RouterBOARD hEX GR3 RB750Gr3:** [Factura](./factura-router.pdf)
- **Documento para imprimir en papel:** [PDF](redPlantaAlta.pdf)