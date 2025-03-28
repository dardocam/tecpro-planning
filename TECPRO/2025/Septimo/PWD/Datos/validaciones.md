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

---
**Filmina 15: Material complementario**  


**Explicación Profesional de la Función `preg_match()` en PHP**

La función `preg_match()` en PHP es una herramienta esencial para trabajar con **expresiones regulares (regex)**, permitiendo buscar patrones complejos en cadenas de texto. Su principal propósito es determinar si un patrón específico coincide total o parcialmente con una cadena dada, lo que la hace fundamental para tareas como validación de datos, extracción de información o manipulación de strings.

---

### **Sintaxis**
```php
preg_match(
    string $pattern,
    string $subject,
    array &$matches = null,
    int $flags = 0,
    int $offset = 0
): int|false
```

#### **Parámetros Clave**
1. **`$pattern`**  
   - La expresión regular (regex) a buscar.  
   - Debe incluir **delimitadores** (ej.: `/patrón/`, `#patrón#`).  
   - Ejemplo: `/^[a-z]+@[a-z]+\.[a-z]+$/` para validar un email simple.

2. **`$subject`**  
   - La cadena de texto donde se realizará la búsqueda.

3. **`$matches` (opcional)**  
   - Array que almacena los resultados de la coincidencia:  
     - `$matches[0]`: Texto que coincide con el patrón completo.  
     - `$matches[1]`, `$matches[2]`, etc.: Subcoincidencias (grupos capturados con `()`).  
   - Si se usa el flag `PREG_OFFSET_CAPTURE`, cada elemento es un array con el texto y su posición.

4. **`$flags` (opcional)**  
   - **`PREG_OFFSET_CAPTURE`**: Devuelve la posición (índice) de cada coincidencia.  
   - **`PREG_UNMATCHED_AS_NULL`**: Los grupos no coincidentes se devuelven como `null`.

5. **`$offset` (opcional)**  
   - Posición en `$subject` desde la que comenzar la búsqueda.

---

### **Valor de Retorno**
- **`1`**: Si el patrón coincide con la cadena.  
- **`0`**: Si no hay coincidencia.  
- **`false`**: Si ocurre un error (ej.: regex inválida).

---

### **Casos de Uso Comunes**
#### 1. **Validación de Datos**  
Verificar si un email cumple con un formato básico:  
```php
$email = "usuario@dominio.com";
$patron = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';

if (preg_match($patron, $email)) {
    echo "Email válido.";
} else {
    echo "Email inválido.";
}
```

#### 2. **Extracción de Subcadenas**  
Capturar componentes de una fecha:  
```php
$fecha = "2023-10-25";
$patron = '/^(\d{4})-(\d{2})-(\d{2})$/';

if (preg_match($patron, $fecha, $matches)) {
    echo "Año: " . $matches[1]; // 2023
    echo "Mes: " . $matches[2]; // 10
    echo "Día: " . $matches[3]; // 25
}
```

#### 3. **Seguridad en Contraseñas**  
Validar complejidad (mínimo 8 caracteres, al menos una mayúscula y un número):  
```php
$password = "Passw0rd!";
$patron = '/^(?=.*[A-Z])(?=.*\d).{8,}$/';

if (preg_match($patron, $password)) {
    echo "Contraseña segura.";
}
```

---

### **Consideraciones Clave**
1. **Rendimiento**  
   - Las regex complejas pueden ser lentas en textos largos. Optimice patrones y evite backtracking excesivo (ej.: `.*` sin límites).

2. **Errores Comunes**  
   - **Delimitadores faltantes**: `preg_match('[a-z]', $texto)` genera un error.  
   - **Caracteres no escapados**: Usar `preg_quote()` si el patrón incluye datos dinámicos.

3. **Seguridad**  
   - Evitar **ReDoS** (Regular Expression Denial of Service) causado por patrones mal diseñados.  
   - Ejemplo riesgoso: `/(a+)+$/` en cadenas como "aaaaaaaaaaaaaaaaaaaaaaaa!".

4. **Alternativas a Regex**  
   - Para validaciones simples (ej.: emails, URLs), prefiera funciones nativas como `filter_var()`:  
     ```php
     filter_var($email, FILTER_VALIDATE_EMAIL);
     ```

---

### **Mejores Prácticas**
- **Comente sus patrones** para mejorar la legibilidad:  
  ```php
  $patron = '
    /^               # Inicio de la cadena
    (?=.*[A-Z])      # Al menos una mayúscula
    (?=.*\d)         # Al menos un número
    .{8,}            # Mínimo 8 caracteres
    $/x              # Modificador "x" (ignora espacios y comentarios)
  ';
  ```
- **Pruebe patrones** en herramientas como [Regex101](https://regex101.com/).
- **Use grupos nombrados** para claridad:  
  ```php
  $patron = '/^(?<anio>\d{4})-(?<mes>\d{2})-(?<dia>\d{2})$/';
  preg_match($patron, $fecha, $matches);
  echo $matches['anio']; // 2023
  ```

---
**Explicación Profesional de la Función `filter_var()` en PHP**  
La función `filter_var()` en PHP es una herramienta estándar para **validar** y **sanitizar** datos, especialmente útiles en formularios web, APIs y operaciones con entradas externas. Su diseño sigue las mejores prácticas de seguridad, aunque ciertas funcionalidades están **obsoletas en PHP 8.1+**, requiriendo ajustes en su uso moderno.

---

### **Sintaxis y Propósito**  
```php
filter_var(mixed $value, int $filter = FILTER_DEFAULT, array|int $options = 0): mixed
```  
- **`$value`**: Dato a validar/sanitizar (ej.: `$_POST['email']`).  
- **`$filter`**: Constante de filtrado (ej.: `FILTER_VALIDATE_EMAIL`).  
- **`$options`**: Configuración adicional (ej.: rangos, flags).  

**Retorna:**  
- El dato validado/sanitizado si es exitoso.  
- `false` si falla la validación.  
- `null` si el filtro es inválido.

---

### **Casos de Uso Principales**  
#### 1. **Validación de Datos**  
Verificar que un valor cumpla con un formato específico:  
```php
$email = "usuario@dominio.com";
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Email válido.";
} else {
    echo "Email inválido.";
}
```  
- **Filtros comunes de validación:**  
  - `FILTER_VALIDATE_EMAIL`  
  - `FILTER_VALIDATE_URL`  
  - `FILTER_VALIDATE_IP`  
  - `FILTER_VALIDATE_INT`  

#### 2. **Sanitización de Datos**  
Limpiar contenido peligroso o no deseado:  
```php
$input = "<script>alert('XSS');</script>";
$sanitized = filter_var($input, FILTER_SANITIZE_SPECIAL_CHARS);
echo $sanitized; // &lt;script&gt;alert('XSS');&lt;/script&gt;
```  
- **Filtros comunes de sanitización (algunos obsoletos):**  
  - `FILTER_SANITIZE_SPECIAL_CHARS` (activo) → Escapa caracteres HTML.  
  - `FILTER_SANITIZE_STRING` (**obsoleto en PHP 8.1**) → Eliminaba etiquetas HTML.  

---

### **Funcionalidades Obsoletas y Alternativas**  
A partir de **PHP 8.1**, los siguientes filtros están **deprecados**:  
- **`FILTER_SANITIZE_STRING`**  
- **`FILTER_SANITIZE_STRIPPED`**  
- **`FILTER_SANITIZE_MAGIC_QUOTES`**  

#### **Alternativas Modernas:**  
| Filtro Obsoleto       | Reemplazo Recomendado                          |  
|-----------------------|-----------------------------------------------|  
| `FILTER_SANITIZE_STRING` | `htmlspecialchars()` o `strip_tags()`          |  
| `FILTER_SANITIZE_STRIPPED` | `strip_tags()` + `htmlspecialchars()`          |  
| `FILTER_SANITIZE_MAGIC_QUOTES` | `addslashes()` (solo si es estrictamente necesario) |  

**Ejemplo de migración:**  
```php
// Obsoleto (PHP < 8.1):
$clean = filter_var($input, FILTER_SANITIZE_STRING);

// Moderno (PHP 8.1+):
$clean = htmlspecialchars(strip_tags($input)); 
// o usar librerías como HTMLPurifier para sanitización avanzada.
```

---

### **Mejores Prácticas en 2023**  
1. **Validación vs. Sanitización:**  
   - Usa `FILTER_VALIDATE_*` para verificar formatos (ej.: emails).  
   - Evita `FILTER_SANITIZE_*` obsoletos; prefiere funciones explícitas como:  
     - `htmlspecialchars()` para escapar HTML.  
     - `strip_tags()` para eliminar etiquetas.  
     - `PDO::quote()` o **prepared statements** para bases de datos.  

2. **Configuración de Opciones:**  
   Personalizar validaciones con parámetros:  
   ```php
   $numero = "150";
   $options = [
       "options" => ["min_range" => 1, "max_range" => 100]
   ];
   if (filter_var($numero, FILTER_VALIDATE_INT, $options)) {
       echo "Número válido.";
   } else {
       echo "Fuera de rango.";
   }
   ```

3. **Seguridad en Entradas de Usuario:**  
   - Nunca confíes en `filter_var()` como única capa de seguridad.  
   - Combínala con:  
     - **Prepared Statements** para SQL.  
     - **Librerías especializadas** (ej.: `HTMLPurifier` para HTML complejo).  

---

### **¿Está `filter_var()` Obsoleta?**  
- **No**, pero su uso debe actualizarse:  
  - **Validación:** Sigue siendo la opción recomendada para formatos estándar (emails, URLs, etc.).  
  - **Sanitización:** Los filtros deprecados deben reemplazarse con funciones modernas o librerías.  

---

### **Conclusión**  
`filter_var()` sigue siendo relevante para validación básica, pero su componente de sanitización requiere ajustes en PHP 8.1+. Prioriza:  
- Funciones nativas como `htmlspecialchars()` y `strip_tags()`.  
- Librerías robustas para casos complejos (ej.: sanitización de HTML o SQL).  
- **Siempre** valida y sanitiza en el servidor, incluso si usas JavaScript en el cliente.

**Explicación Profesional de la Función `htmlspecialchars()` en PHP**  
La función `htmlspecialchars()` es una herramienta crítica en el desarrollo web seguro, diseñada para **prevenir ataques XSS (Cross-Site Scripting)** al convertir caracteres especiales en entidades HTML. Su uso es obligatorio al mostrar datos no confiables (ej.: entradas de usuario) en un contexto HTML, evitando que el navegador interprete código malicioso.

---

### **Sintaxis y Parámetros**  
```php
htmlspecialchars(
    string $string,
    int $flags = ENT_QUOTES | ENT_SUBSTITUTE | ENT_HTML401,
    string|null $encoding = null,
    bool $double_encode = true
): string
```  

#### **Parámetros Clave**  
1. **`$string`**  
   - Texto a convertir (ej.: contenido de un formulario o base de datos).  

2. **`$flags` (opcional)**  
   - **`ENT_QUOTES`**: Convierte comillas dobles (`"`) y simples (`'`).  
   - **`ENT_SUBSTITUTE`**: Reemplaza caracteres inválidos con el carácter de sustitución Unicode (�).  
   - **`ENT_HTML401`** (por defecto): Maneja el texto como HTML 4.01.  
   - Otros: `ENT_XML1`, `ENT_XHTML`, `ENT_DISALLOWED`.  

3. **`$encoding` (opcional)**  
   - Codificación de caracteres (ej.: `UTF-8`). Si es `null`, usa la configuración predeterminada de PHP.  

4. **`$double_encode` (opcional)**  
   - Si es `false`, evita codificar entidades ya existentes (ej.: `&amp;` → no se convierte a `&amp;amp;`).  

---

### **Caracteres Convertidos**  
| Carácter Original | Entidad HTML Resultante |  
|--------------------|-------------------------|  
| `<`                | `&lt;`                  |  
| `>`                | `&gt;`                  |  
| `"`                | `&quot;`                |  
| `'`                | `&#039;` (con `ENT_QUOTES`) |  
| `&`                | `&amp;`                 |  

---

### **Casos de Uso**  
#### 1. **Protección contra XSS**  
Escapar contenido dinámico en HTML:  
```php
$comentario = "<script>alert('Hacked');</script>"; // Entrada maliciosa  
echo htmlspecialchars($comentario);  
// Resultado: &lt;script&gt;alert(&#039;Hacked&#039;);&lt;/script&gt;  
```  
El navegador muestra el texto como literal, no ejecuta el script.

#### 2. **Atributos HTML Seguros**  
Evitar inyección en atributos:  
```html
<input value="<?= htmlspecialchars($_GET['valor'], ENT_QUOTES) ?>">
```  
Si `$_GET['valor']` es `" onmouseover="alert(1)`, se convierte en `&quot; onmouseover=&quot;alert(1)`.

#### 3. **Manejo de Codificación**  
Garantizar compatibilidad con UTF-8:  
```php
$texto = "Café & Croissant";  
echo htmlspecialchars($texto, ENT_QUOTES, 'UTF-8');  
// "Café &amp; Croissant"  
```

---

### **Mejores Prácticas**  
1. **Usar `ENT_QUOTES` siempre**:  
   Convierte comillas simples y dobles, esencial para atributos HTML.  
   ```php
   htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
   ```  

2. **Definir explícitamente el encoding**:  
   Evita errores con caracteres multibyte (ej.: `UTF-8`).  

3. **No usar para otros contextos**:  
   - **JavaScript**: Usar `json_encode($var, JSON_HEX_TAG)` para escapar.  
   - **URLs**: Usar `urlencode()` o `rawurlencode()`.  

4. **Evitar doble escapado**:  
   Si los datos ya están sanitizados, usa `$double_encode = false`.  

---

### **Comparación con `htmlentities()`**  
| Característica          | `htmlspecialchars()`      | `htmlentities()`              |  
|--------------------------|---------------------------|--------------------------------|  
| **Alcance**              | Solo caracteres especiales | Todas las entidades HTML       |  
| **Rendimiento**          | Más rápido                | Más lento (convierte más)      |  
| **Casos recomendados**   | Prevención XSS           | Mostrar texto con símbolos raros (ej.: ©, ®) |  

---

### **Errores Comunes**  
1. **No escapar en el momento correcto**:  
   - Escapar al **mostrar datos**, no al almacenarlos en la base de datos.  

2. **Olvidar `ENT_QUOTES`**:  
   ```php
   // ¡Inseguro si el atributo usa comillas simples!
   echo '<div class="'. htmlspecialchars($clase) .'">'; 
   ```  

3. **Codificación incorrecta**:  
   Si el documento es UTF-8 pero se usa `ISO-8859-1`, caracteres como `ñ` o `á` se corrompen.

---

### **Conclusión**  
`htmlspecialchars()` es una función esencial para la seguridad web en PHP. Su correcta implementación:  
- **Previene XSS** al neutralizar caracteres críticos.  
- **Garantiza integridad** en la renderización de contenido.  
- **Debe usarse sistemáticamente** al imprimir datos dinámicos en HTML.  

**Nota final:** Siempre combine esta función con otras prácticas como validación de entrada, prepared statements y CSP (Content Security Policy) para una defensa en profundidad.