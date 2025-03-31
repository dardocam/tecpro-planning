**Filmina 1: Portada**  
- **Título:** Gestión de Sesiones en PHP  
- **Materia:** Proyecto de Desarrollo Web Dinámica  
- **Logo institucional**  
- **Docente/Autor**  Dardo Camaño
- **Fecha**  

---

**Filmina 2: Introducción**  
- **¿Qué es una sesión?**  
  - Mecanismo para preservar información entre peticiones HTTP.  
  - Útil para autenticación, carritos de compra, personalización, etc.  
- **Contexto:** HTTP es un protocolo sin estado; las sesiones añaden persistencia.  

---

**Filmina 3: Sesiones vs. Cookies**  
- **Cookies:**  
  - Almacenan datos en el cliente (navegador).  
  - Límites de tamaño y seguridad (modificables por el usuario).  
- **Sesiones:**  
  - Almacenan datos en el servidor (ID único en cookie o URL).  
  - Más seguras para datos sensibles (ej.: ID de usuario).  

---

**Filmina 4: Funcionamiento de Sesiones en PHP**  
- **Flujo básico:**  
  1. Iniciar sesión: `session_start()`.  
  2. Almacenar datos en `$_SESSION`.  
  3. Destruir sesión al cerrar o manualmente.  
- **Ejemplo:**  
  ```php
  session_start();
  $_SESSION['usuario'] = 'JuanPerez';
  ```

---

**Filmina 5: Funciones Clave para Gestión de Sesiones**  
- **Funciones principales:**  
  - `session_start()`: Inicia o reanuda una sesión.  
  - `session_destroy()`: Elimina la sesión actual.  
  - `session_unset()`: Limpia variables de sesión.  
  - `session_id()`: Obtiene o establece el ID de sesión.  
- **Ejemplo de cierre de sesión:**  
  ```php
  session_start();
  session_unset();
  session_destroy();
  ```

---

**Filmina 6: Configuración de Sesiones (php.ini)**  
- **Parámetros comunes:**  
  - `session.save_path`: Ruta de almacenamiento de sesiones.  
  - `session.cookie_lifetime`: Tiempo de vida de la cookie (en segundos).  
  - `session.cookie_secure`: Solo envía cookies por HTTPS.  
  - `session.use_strict_mode`: Previene la fijación de sesión.  

---

**Filmina 7: Seguridad en Sesiones**  
- **Riesgos comunes:**  
  - **Hijacking:** Robo de ID de sesión.  
  - **Fixation:** Forzar un ID de sesión a un usuario.  
  - **Exposición de datos:** Sesiones accesibles por terceros.  
- **Soluciones:**  
  - Usar HTTPS.  
  - Regenerar ID tras autenticación: `session_regenerate_id(true)`.  
  - Validar IP/User-Agent del usuario.  

---

**Filmina 8: Buenas Prácticas**  
1. **Regenerar ID de sesión** después del login.  
2. **Limitar tiempo de inactividad:**  
   ```php
   if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 1800)) {
       session_destroy();
   }
   $_SESSION['LAST_ACTIVITY'] = time();
   ```  
3. **No almacenar datos sensibles** (ej.: contraseñas).  

---

**Filmina 9: Ejemplo de Autenticación con Sesiones**  
- **Login:**  
  ```php
  session_start();
  if ($usuario_valido && $contrasena_valida) {
      $_SESSION['autenticado'] = true;
      $_SESSION['usuario_id'] = $id_usuario;
      session_regenerate_id(true); // Seguridad
  }
  ```  
- **Logout:**  
  ```php
  session_start();
  session_unset();
  session_destroy();
  ```

---

**Filmina 10: Manejo de Errores Comunes**  
- **"Headers already sent":**  
  - Asegurar que `session_start()` se llame antes de enviar salida HTML.  
- **Sesiones bloqueantes:**  
  - Evitar almacenar sesiones en archivo si hay alta concurrencia (usar bases de datos).  

---

**Filmina 11: Almacenamiento de Sesiones en Bases de Datos**  
- **Ventajas:**  
  - Escalabilidad en aplicaciones distribuidas.  
  - Mayor control y seguridad.  
- **Implementación:**  
  ```php
  session_set_save_handler($handler); // Custom handler para MySQL
  ```

---

**Filmina 12: Sesiones y AJAX/APIs**  
- **Retos:**  
  - Mantener estado en aplicaciones SPA o móviles.  
- **Solución:**  
  - Enviar token de sesión (ej.: JWT) en headers.  

---

**Filmina 13: Resumen**  
- **Sesiones = Estado persistente.**  
- **PHP facilita su uso** con `$_SESSION` y funciones nativas.  
- **Seguridad es crítica:** HTTPS, regeneración de IDs, tiempo de expiración.  

---

**Filmina 14: Preguntas y Respuestas**  
- Ejemplo: "¿Cómo evitar que un usuario modifique manualmente `$_SESSION['rol']`?"  
  - Respuesta: Validar siempre en el servidor y no confiar en datos de sesión no controlados.  

---

**Filmina 15: Desafío Práctico**  
- **Consigna:**  
  - Crear un sistema de login/logout con sesiones.  
  - Implementar regeneración de ID y tiempo de expiración.  
  - Almacenar sesiones en MySQL.  

---

**Filmina 3: Sesiones vs. Cookies**  
**Ampliación y Desarrollo**  

---

### **1. Cookies**  
**Definición:**  
Pequeños archivos de texto almacenados en el navegador del cliente. Se utilizan para guardar información específica del usuario y mantener el estado entre solicitudes HTTP.  

**Características:**  
- **Almacenamiento:** En el cliente (navegador).  
- **Tamaño máximo:** ~4 KB por cookie (límite varía según el navegador).  
- **Persistencia:**  
  - **Cookies de sesión:** Eliminadas al cerrar el navegador.  
  - **Cookies persistentes:** Guardadas hasta su fecha de expiración (`max-age` o `expires`).  
- **Seguridad:**  
  - Modificables por el usuario (ej.: herramientas de desarrollo).  
  - Vulnerables a ataques como **XSS** (Cross-Site Scripting) o **CSRF** (Cross-Site Request Forgery).  
  - Recomendado usar atributos `Secure` (solo HTTPS) y `HttpOnly` (no accesible desde JavaScript).  
- **Ejemplo de uso:** Preferencias de idioma, carritos de compra temporales, autenticación recordada.  

---

### **2. Sesiones**  
**Definición:**  
Mecanismo para almacenar datos del usuario en el servidor durante una interacción. El cliente solo recibe un **ID de sesión único** vinculado a esos datos.  

**Características:**  
- **Almacenamiento:** En el servidor (memoria, base de datos, sistemas como Redis).  
- **ID de sesión:**  
  - Almacenado en una cookie (común) o incluido en la URL (menos seguro).  
  - Ejemplo: `PHPSESSID=abc123`.  
- **Persistencia:**  
  - Duración configurable (ej.: 30 minutos de inactividad).  
  - Finaliza al cerrar el navegador o invalidar manualmente la sesión.  
- **Seguridad:**  
  - Más seguras para datos sensibles (contraseñas, tokens) porque la información no se expone directamente al cliente.  
  - Ataques comunes: **hijacking** (robo del ID de sesión) o **session fixation**.  
- **Ejemplo de uso:** Autenticación de usuarios, datos de transacciones bancarias.  

---

### **3. Diferencias Clave**  
| **Aspecto**         | **Cookies**                          | **Sesiones**                          |  
|----------------------|--------------------------------------|---------------------------------------|  
| **Ubicación**        | Cliente (navegador).                | Servidor.                            |  
| **Seguridad**        | Menos seguras (manipulables).        | Más seguras (datos protegidos).      |  
| **Límite de tamaño** | ~4 KB por cookie.                   | Ilimitado (depende del servidor).    |  
| **Rendimiento**      | No consumen recursos del servidor.  | Consumen memoria/almacenamiento.     |  
| **Persistencia**     | Configurable (corta o larga duración). | Típicamente efímera (dura la sesión). |  

---

### **4. Consideraciones Importantes**  
- **Cookies:**  
  - **Privacidad:** Reguladas por leyes como GDPR (requieren consentimiento explícito).  
  - **Configuración:** Usar `SameSite=Lax/Strict` para prevenir CSRF.  
- **Sesiones:**  
  - **Escalabilidad:** En entornos distribuidos (ej.: múltiples servidores), usar almacenamiento centralizado (Redis, DB).  
  - **Cookies vs. URL:** Evitar incluir el ID de sesión en la URL (riesgo de exposición en logs o bookmarks).  

---

### **5. Casos de Uso Recomendados**  
- **Cookies:**  
  - Personalización no sensible (tema oscuro, región).  
  - Rastreo analítico (Google Analytics).  
  - Autenticación "recordar usuario".  
- **Sesiones:**  
  - Autenticación de usuarios (ej.: `$_SESSION["user_id"]`).  
  - Carritos de compra complejos.  
  - Procesos transaccionales (ej.: pasarelas de pago).  

---

**Conclusión:**  
Las cookies son ideales para datos no críticos y persistencia ligera, mientras que las sesiones son esenciales para manejar información sensible y operaciones seguras. Combinar ambas estrategias (ej.: ID de sesión en cookie + datos en servidor) es una práctica común en desarrollo web.


---

Aquí tienes una guía detallada para implementar cookies en PHP, incluyendo ejemplos prácticos y buenas prácticas:

---

### **Implementación de Cookies en PHP**

#### **1. Crear una Cookie**
Se usa la función `setcookie()` **antes de cualquier salida HTML** (headers HTTP).

```php
<?php
// Sintaxis básica
setcookie(
    name: "nombre_cookie",
    value: "valor",
    expires_or_options: time() + 3600, // Expira en 1 hora
    path: "/",
    domain: "tudominio.com",
    secure: true,
    httponly: true
);

// Ejemplo práctico: Guardar preferencia de idioma
setcookie("idioma", "es", time() + (86400 * 30), "/"); // 30 días
?>
```

**Parámetros clave:**
- **name**: Nombre de la cookie.
- **value**: Datos a almacenar (strings o números).
- **expires**: Tiempo de vida en timestamp (usar `time() + segundos`).
- **path**: Ruta donde es accesible (usar `/` para todo el sitio).
- **domain**: Dominio válido (ej: `.tudominio.com` para subdominios).
- **secure**: Solo se envía sobre HTTPS.
- **httponly**: Bloquea acceso desde JavaScript.

---

#### **2. Leer una Cookie**
Acceder al array superglobal `$_COOKIE`.

```php
<?php
// Verificar si existe
if (isset($_COOKIE["idioma"])) {
    $idioma = $_COOKIE["idioma"];
    echo "Idioma preferido: " . htmlspecialchars($idioma);
} else {
    echo "Cookie no configurada.";
}
?>
```

---

#### **3. Modificar una Cookie**
Usar `setcookie()` nuevamente con el mismo nombre:

```php
<?php
// Actualizar valor y tiempo
setcookie("idioma", "en", time() + (86400 * 15), "/");
?>
```

---

#### **4. Eliminar una Cookie**
Establecer una fecha de expiración pasada:

```php
<?php
setcookie("idioma", "", time() - 3600, "/");
?>
```

---

### **Buenas Prácticas y Seguridad**
1. **Validación y Sanitización:**
   ```php
   $valor = filter_input(INPUT_COOKIE, 'idioma', FILTER_SANITIZE_STRING);
   ```

2. **Atributos de Seguridad:**
   ```php
   setcookie("sesion_id", $token, [
       'expires' => time() + 3600,
       'path' => '/',
       'domain' => 'tudominio.com',
       'secure' => true,
       'httponly' => true,
       'samesite' => 'Strict' // Previene CSRF
   ]);
   ```

3. **No almacenes datos sensibles:**
   - Nunca guardes contraseñas o información crítica en cookies.
   - Usa IDs de sesión encriptados si es necesario.

---

### **Ejemplo Completo: Contador de Visitas**
```php
<?php
$contador = 1;

if (isset($_COOKIE['visitas'])) {
    $contador = (int)$_COOKIE['visitas'] + 1;
}

setcookie("visitas", $contador, time() + 86400 * 30, "/");
echo "Has visitado esta página $contador veces.";
?>
```

---

### **Ejemplo de Autenticación (Recordar Usuario)**
```php
<?php
// Al iniciar sesión
if ($login_exitoso) {
    $token = bin2hex(random_bytes(32)); // Token seguro
    setcookie("remember_token", $token, time() + 86400 * 30, "/", "tudominio.com", true, true);
    // Guardar token en la base de datos asociado al usuario
}

// Al cargar la página
if (!isset($_SESSION['usuario']) && isset($_COOKIE['remember_token'])) {
    // Validar token contra la base de datos
    // Si coincide, iniciar sesión automáticamente
}
?>
```

---

### **Errores Comunes**
1. **Enviar output antes de `setcookie()`:** Genera error de headers.
2. **No sanitizar valores:** Riesgo de inyección XSS.
3. **Confiar en cookies para autenticación:** Siempre validar en el servidor.

---

**Conclusión:**  
Las cookies en PHP son sencillas de implementar, pero requieren atención a la seguridad y gestión adecuada de tiempos de expiración. Usa siempre parámetros como `HttpOnly`, `Secure` y `SameSite` para proteger tus aplicaciones.