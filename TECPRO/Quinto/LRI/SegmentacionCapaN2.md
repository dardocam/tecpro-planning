Sí, tu planteamiento es **correcto** y es una práctica común para segmentar redes mediante VLANs con equipos limitados. Aquí está la explicación detallada y cómo implementarlo:

---

### **Topología Propuesta**
```
[OPNsense (Router/Firewall)] 
        ↓ (Puerto Trunk con VLANs)
[Switch Administrable (VLAN-aware)] 
        ↓ (Puertos Access para VLANs específicas)
[Switches No Administrables] → Dispositivos finales (en VLANs asignadas)
```

---

### **Pasos para Configurar la Segmentación**

#### **1. Configuración en OPNsense**
- **Crear VLANs**:
  - Ve a **Interfaces > Other Types > VLAN**.
  - Define cada VLAN (ej.: VLAN 10 para LAN principal, VLAN 20 para invitados, VLAN 30 para IoT).
  - Asigna una interfaz física (ej.: `igb1` para la LAN principal).

- **Interfaces VLAN en OPNsense**:
  - Cada VLAN aparecerá como una nueva interfaz (ej.: `VLAN10`, `VLAN20`).
  - Configura IPs para cada VLAN (ej.: `192.168.10.1/24` para VLAN10).

- **Reglas de Firewall**:
  - Define políticas para permitir o bloquear tráfico entre VLANs (ej.: bloquear IoT desde invitados).

---

#### **2. Switch Administrable (VLAN-aware)**
- **Configurar Puertos Trunk y Access**:
  - **Puerto Trunk**: Conectado a OPNsense. Configúralo para transportar todas las VLANs (ej.: tagging VLAN10, VLAN20, VLAN30).
  - **Puertos Access**: Conectados a switches no administrables. Asigna cada puerto a una VLAN específica (ej.: puerto 1 → VLAN10, puerto 2 → VLAN20).

- **Ejemplo en Cisco/TP-Link/Ubiquiti**:
  ```bash
  # En un switch Cisco (ejemplo):
  interface GigabitEthernet0/24  # Puerto Trunk a OPNsense
    switchport mode trunk
    switchport trunk allowed vlan 10,20,30

  interface GigabitEthernet0/1   # Puerto Access para VLAN10 (LAN)
    switchport mode access
    switchport access vlan 10
  ```

---

#### **3. Switches No Administrables**
- **Comportamiento**:
  - Los switches no administrables **no entienden VLANs**, pero heredarán la VLAN del puerto del switch administrable al que están conectados.
  - Todos los dispositivos conectados a un switch no administrable estarán en la misma VLAN asignada al puerto del switch administrable.

---

### **Consideraciones Clave**
1. **Etiquetado de Puertos**:
   - Etiqueta físicamente los puertos del switch administrable (ej.: "VLAN10-LAN", "VLAN20-Invitados").
   - Evita conectar switches no administrables a puertos trunk (solo a puertos access).

2. **Seguridad**:
   - Los switches no administrables no filtran tráfico, por lo que **todos sus puertos estarán en la misma VLAN**.
   - Si un dispositivo malicioso se conecta a un switch no administrable, podría acceder a toda la VLAN asignada a ese switch.

3. **Rendimiento**:
   - El tráfico entre VLANs se enrutará a través de OPNsense, lo que puede generar cuellos de botella si no hay suficiente capacidad de procesamiento.

---

### **Ejemplo Práctico**
#### **Escenario**:
- **VLAN10 (LAN)**: `192.168.10.0/24` → Switch no administrable en puerto 1 del switch administrable.
- **VLAN20 (Invitados)**: `192.168.20.0/24` → Switch no administrable en puerto 2.
- **VLAN30 (IoT)**: `192.168.30.0/24` → Switch no administrable en puerto 3.

#### **Configuración en OPNsense**:
- Firewall → Reglas para bloquear tráfico desde VLAN20 a VLAN10, pero permitir acceso a Internet.

---

### **Ventajas y Desventajas**
| **Ventajas**                                   | **Desventajas**                                  |
|------------------------------------------------|--------------------------------------------------|
| Segmentación básica sin costos adicionales.    | Sin seguridad avanzada (ej.: port-security).     |
| Fácil implementación con hardware existente.  | Tráfico entre VLANs depende del firewall (OPNsense). |
| Ideal para redes pequeñas o presupuestos ajustados. | Riesgo de propagación de broadcast dentro de cada VLAN. |

---

### **Recomendaciones**
- **Para mayor seguridad**: Usa switches administrables en todos los niveles (para implementar port-security, ACLs, etc.).
- **Etiquetado claro**: Física y lógicamente, para evitar errores de conexión.
- **Monitorización**: Usa herramientas como **Netflow** o **Reporting en OPNsense** para analizar el tráfico entre VLANs.

---

### **Diagrama Final**
```
[OPNsense]
  │
  └──[Switch Administrable]
      ├──[Puerto 1 (VLAN10)] → [Switch No Administrable] → PCs/Laptops (LAN)
      ├──[Puerto 2 (VLAN20)] → [Switch No Administrable] → Dispositivos Invitados
      └──[Puerto 3 (VLAN30)] → [Switch No Administrable] → Cámaras IoT
```

Con este esquema, logras segmentación básica, pero siempre es preferible migrar a switches administrables en toda la red para mayor control y seguridad.