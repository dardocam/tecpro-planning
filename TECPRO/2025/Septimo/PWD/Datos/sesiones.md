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

