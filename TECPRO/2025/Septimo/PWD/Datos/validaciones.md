**Filmina 1: Portada**  
- **Título:** Validación y Sanitización de Datos en PHP y MySQL  
- **Materia:** Proyecto de Desarrollo Web Dinámica  
- **Logo institucional**  
- **Docente/Autor**  Dardo Camaño
- **Fecha**  

---

**Filmina 2: Introducción**  
- **¿Por qué son importantes?**  
  - Proteger la integridad de los datos.  
  - Prevenir vulnerabilidades (SQL Injection, XSS).  
  - Mejorar la experiencia del usuario (ej.: errores en formularios).  
- **Contexto:** Aplicaciones web dinámicas manejan datos de usuarios (formularios, APIs, etc.).  

---

**Filmina 3: Validación vs. Sanitización**  
- **Validación:**  
  - Verificar que los datos cumplan reglas específicas (ej.: formato de email).  
  - Respuesta: "Válido" o "No válido".  
- **Sanitización:**  
  - Limpiar o modificar datos para eliminar contenido peligroso (ej.: etiquetas HTML).  
  - Respuesta: Datos seguros para su uso.  

---

**Filmina 4: Técnicas de Validación en PHP**  
- **Funciones clave:**  
  - `filter_var($dato, FILTER_VALIDATE_EMAIL)`  
  - Expresiones regulares (`preg_match()`).  
  - Validaciones personalizadas (longitud, rangos).  
- **Ejemplo de código:**  
  ```php
  $email = $_POST['email'];
  if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
      // Válido
  } else {
      // Error
  }
  ```

---

**Filmina 5: Validación en Formularios (Ejemplo Práctico)**  
- **Campo "Contraseña":**  
  - Validar longitud mínima (8 caracteres).  
  - Requerir mayúsculas y números.  
- **Código:**  
  ```php
  $password = $_POST['password'];
  if (preg_match('/^(?=.*[A-Z])(?=.*\d).{8,}$/', $password)) {
      // Válido
  }
  ```

---

**Filmina 6: Técnicas de Sanitización en PHP**  
- **Funciones clave:**  
  - `htmlspecialchars()`: Escapa caracteres HTML.  
  - `strip_tags()`: Elimina etiquetas HTML.  
  - `filter_var($dato, FILTER_SANITIZE_STRING)` (obsoleto en PHP 8.1).  
- **Ejemplo:**  
  ```php
  $comentario = htmlspecialchars($_POST['comentario'], ENT_QUOTES, 'UTF-8');
  ```

---

**Filmina 7: Sanitización para Bases de Datos**  
- **¡Nunca uses concatenación directa!**  
- **Prepared Statements (MySQLi/PDO):**  
  ```php
  // MySQLi
  $stmt = $mysqli->prepare("INSERT INTO usuarios (nombre) VALUES (?)");
  $stmt->bind_param("s", $nombre);
  $stmt->execute();
  ```

---

**Filmina 8: Riesgos de Seguridad**  
- **SQL Injection:**  
  ```sql
  SELECT * FROM usuarios WHERE id = '1' OR '1'='1';
  ```  
- **XSS (Cross-Site Scripting):**  
  ```html
  <script>alert('Hacked');</script>
  ```  
- **Solución:** Validación + Sanitización + Prepared Statements.  

---

**Filmina 9: Buenas Prácticas**  
1. Validar siempre en el servidor (aunque se haga en el cliente).  
2. Sanitizar según el contexto (HTML, SQL, URLs).  
3. Usar "lista blanca" (permitir solo lo esperado).  
4. Actualizar PHP y librerías.  

---

**Filmina 10: Ejemplo Integrado (Formulario de Contacto)**  
1. Validar email y nombre (no vacío).  
2. Sanitizar comentario con `htmlspecialchars()`.  
3. Guardar en BD con prepared statements.  
4. Mostrar datos sanitizados en la vista.  

---

**Filmina 11: Herramientas Recomendadas**  
- **PHP Filter Extension:** Para validación/sanitización básica.  
- **HTMLPurifier:** Sanitización avanzada de HTML.  
- **Librerías:** Respect/Validation, Symfony Validator.  

---

**Filmina 12: Resumen**  
- Validación = ¿Es correcto?  
- Sanitización = ¿Es seguro?  
- Combinar ambas para proteger la aplicación.  

---

**Filmina 13: Preguntas y Respuestas**  
- **¡Participa!**  
- Ejemplo de duda: "¿Es suficiente con validar en JavaScript?"  

---

**Filmina 14: Desafío Práctico**  
- **Consigna:** Crear un formulario con:  
  - Validación de email y contraseña segura.  
  - Sanitización de entrada y salida.  
  - Uso de prepared statements en MySQL.  

