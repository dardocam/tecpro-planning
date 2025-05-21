La fórmula para calcular la dirección de broadcast en función de la máscara de subred es la siguiente:

1. **Calcular la dirección de red**:
   \[
   \text{Dirección de Red} = \text{IP} \land \text{Máscara de Subred}
   \]
   (Operación **AND** bit a bit entre la IP y la máscara).

2. **Calcular la máscara wildcard (inversa de la máscara de subred)**:
   \[
   \text{Máscara Wildcard} = 255.255.255.255 - \text{Máscara de Subred}
   \]
   (Resta octeto a octeto).

3. **Calcular la dirección de broadcast**:
   \[
   \text{Dirección de Broadcast} = \text{Dirección de Red} + \text{Máscara Wildcard}
   \]
   (Suma octeto a octeto, sin acarreo entre octetos).

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

### Fórmula Compacta:
\[
\boxed{\text{Broadcast} = (\text{IP} \land \text{Máscara}) + (255.255.255.255 - \text{Máscara})}
\]

### Explicación:
- **AND (\(\land\))**: Aísla los bits de la red.  
- **Máscara Wildcard**: Identifica los bits del host.  
- **Suma (+)**: Convierte todos los bits del host a 1s, obteniendo la dirección de broadcast.