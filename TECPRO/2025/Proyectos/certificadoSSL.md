A continuación se detalla un ejemplo de procedimiento para implementar un hotspot que utilice HTTPS en un MikroTik hEX GR3 (RB750Gr3):

---

### 1. Preparar el certificado SSL  
Para que el portal del Hotspot funcione sobre HTTPS es necesario contar con un certificado válido (ya sea auto‐firmado o de una CA reconocida). Por ejemplo:

- **Crear un certificado auto‐firmado:**

  ```shell
  /certificate add common-name=hotspot.midominio.local name=hotspot_cert key-usage=tls-server
  /certificate sign hotspot_cert
  ```

- **Verificar el certificado:**

  ```shell
  /certificate print
  ```

*Nota:* Si se requiere un certificado de una CA externa, deberá importarse a RouterOS.

---

### 2. Configurar el Hotspot para usar HTTPS  
Con el certificado listo, se debe indicar al Hotspot que utilice HTTPS en la página de login. Por ejemplo, en el perfil del Hotspot:

1. Acceder a la configuración del Hotspot:
   ```shell
   /ip hotspot profile print
   ```
2. Seleccionar (o crear) el perfil (por ejemplo, "hsprof1") y editar la opción de **"ssl-certificate"** para asignar el certificado creado:
   ```shell
   /ip hotspot profile set hsprof1 ssl-certificate=hotspot_cert
   ```
3. Opcionalmente, si se requiere redirigir a HTTPS, asegurarse de que el parámetro *login-by* incluya métodos seguros (por ejemplo, HTTPS) y que el portal se llame mediante la URL con el prefijo “https://”.

---

### 3. Ajustar el Firewall y el Servicio Web  
Asegúrese de que el servicio web del RouterOS (HTTPs) esté activo y que la regla de firewall permita el tráfico al puerto 443 (HTTPS). Para ello:

- **Habilitar el servicio www-ssl (puerto 443):**

  ```shell
  /ip service set www-ssl address=0.0.0.0/0 disabled=no
  ```

- **Verificar que no existan reglas de firewall que bloqueen el tráfico hacia el puerto 443.**

---

### 4. Probar el acceso al Hotspot  
Una vez realizado lo anterior:

- Configure un cliente para que, al conectarse al Hotspot, se redirija a la página de login mediante la URL HTTPS (por ejemplo, https://hotspot.midominio.local).
- Es posible que el navegador advierta de certificado no confiable si se utiliza uno auto‐firmado; en un entorno de pruebas esto es aceptable o bien se deberá instalar el certificado raíz en el cliente.

---

### Resumen de pasos  
1. **Generar/Importar y firmar el certificado SSL.**  
2. **Asignar el certificado al perfil del Hotspot.**  
3. **Habilitar el servicio HTTPS (www-ssl) y ajustar el firewall.**  
4. **Verificar la redirección y funcionamiento del portal HTTPS.**

Con estas operaciones se logra que el portal de autenticación del Hotspot se ofrezca vía HTTPS, mejorando la seguridad en la transmisión de credenciales.

---

Esta es una guía básica; en función de la versión de RouterOS y de la infraestructura, puede ser necesario ajustar detalles adicionales. Si requiere pasos más específicos o tiene alguna duda, por favor comente y profundizaremos en la configuración.

citeturn0search7