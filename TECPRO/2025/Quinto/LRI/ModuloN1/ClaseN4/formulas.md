La fórmula para calcular la dirección de broadcast en función de la máscara de subred es la siguiente:

1. **Calcular la dirección de red**:

2. **Calcular la máscara wildcard (inversa de la máscara de subred)**:

3. **Calcular la dirección de broadcast**:

### Ejemplo:
- **IP**: 192.168.1.100  
- **Máscara de Subred**: 255.255.255.0  

**Pasos**:
1. **Dirección de Red**:  
   \(192.168.1.100 \land 255.255.255.0 = 192.168.1.0\)  
2. **Máscara Wildcard**:  
   \(255.255.255.255 - 255.255.255.0 = 0.0.0.255\)  
3. **Dirección de Broadcast**:  
   \(192.168.1.0 + 0.0.0.255 = 192.168.1.255\)  

### Explicación:
- **AND (\(\land\))**: Aísla los bits de la red.  
- **Máscara Wildcard**: Identifica los bits del host.  
- **Suma (+)**: Convierte todos los bits del host a 1s, obteniendo la dirección de broadcast.


---
# Fórmula para Calcular la Dirección de Broadcast

La dirección de broadcast se obtiene mediante la **operación lógica OR** (a nivel de bits) entre:
- **Dirección de Red**: Resultado de aplicar `AND` entre la IP y la máscara de subred.
- **Máscara Wildcard**: Inversa de la máscara de subred (bits de host en `1`).

\[ Broadcast = (Dir de Red) OR ~(Netmask)  ]
---

### **Explicación Detallada**
1. **Dirección de Red** (`AND` lógico):  
   - Aísla los bits de la red (donde la máscara tiene `1`s).  
   - Ejemplo:  
     ```
     IP: 192.168.1.100  → 11000000.10101000.00000001.01100100  
     Máscara: 255.255.255.0 → 11111111.11111111.11111111.00000000  
     Dirección de Red (AND): 192.168.1.0 → 11000000.10101000.00000001.00000000  
     ```

2. **Máscara Wildcard** (`NOT` de la máscara):  
   - Marca los bits del host (donde la máscara tiene `0`s).  
   - Ejemplo:  
     ```
     Máscara: 255.255.255.0 → 11111111.11111111.11111111.00000000  
     Wildcard: 0.0.0.255 → 00000000.00000000.00000000.11111111  
     ```

3. **Operación OR**:  
   - Convierte los bits del host a `1`, manteniendo los de la red.  
   - Ejemplo:  
     ```
     Dirección de Red: 11000000.10101000.00000001.00000000  
     OR  
     Wildcard:        00000000.00000000.00000000.11111111  
     ------------------------------------------------  
     Broadcast:      11000000.10101000.00000001.11111111 → 192.168.1.255  
     ```

---

### **¿Por qué funciona el OR?**
- La máscara wildcard tiene `1`s solo en las posiciones de los bits del host.  
- Al aplicar `OR`, esos bits se activan (`1`), mientras que los bits de la red (ya definidos por el `AND`) permanecen intactos.  
- **Equivalencia con la suma aritmética**:  
  La suma octeto a octeto (sin acarreo) y el `OR` son equivalentes en este contexto, ya que no hay superposición de `1`s entre la red y la wildcard.

---

### **Conclusión**
La operación lógica `OR` es la forma más directa y elegante de calcular la dirección de broadcast, ya que refleja claramente el objetivo: **activar todos los bits del host**.