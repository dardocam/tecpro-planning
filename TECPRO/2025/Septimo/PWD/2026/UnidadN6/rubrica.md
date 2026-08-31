# Rúbrica de Evaluación – Etapa 3

## Proyecto Final: Sitio Web Dinámico

**Puntaje total: 100 puntos**

| Criterio                             | Excelente                                                                                                   | Bueno                                                                     | Básico                                                                             | Insuficiente                                                                    | Puntos |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -----: |
| **1. HTML y CSS**                    | Estructura semántica, organizada, diseño coherente y adaptable.                                             | Estructura correcta y diseño organizado, con algunos aspectos mejorables. | Presenta estructura y estilos básicos, con problemas de organización o adaptación. | Presenta errores importantes o una interfaz incompleta.                         | **10** |
| **2. PHP e integración del sistema** | PHP está correctamente integrado y resuelve la lógica principal del sistema.                                | La integración funciona correctamente con algunos problemas menores.      | Existe integración parcial, pero presenta errores o funcionalidades incompletas.   | PHP tiene una implementación mínima, incorrecta o no funcional.                 | **15** |
| **3. Base de datos MySQL**           | Modelo relacional correcto, organizado y completamente integrado con el sistema.                            | Base de datos funcional con pequeños problemas de diseño.                 | Base de datos funcional pero simple o con errores de modelado.                     | No existe una integración funcional con MySQL.                                  | **15** |
| **4. CRUD**                          | CRUD completo, funcional y correctamente conectado con MySQL.                                               | CRUD funcional con pequeños errores o detalles pendientes.                | CRUD parcialmente funcional.                                                       | No implementa un CRUD funcional.                                                | **15** |
| **5. Usuarios y sesiones**           | Registro/login, sesiones y cierre de sesión funcionan correctamente.                                        | Sistema funcional con pequeños problemas.                                 | Implementación parcial de usuarios o sesiones.                                     | No existe un sistema funcional de usuarios/sesiones.                            | **10** |
| **6. Control de acceso**             | Las funcionalidades protegidas están correctamente restringidas según el estado del usuario.                | El control funciona pero presenta alguna limitación.                      | Existe control básico pero puede ser evadido o está incompleto.                    | No existe control de acceso.                                                    |  **5** |
| **7. JavaScript y/o AJAX**           | JavaScript/AJAX aporta funcionalidades relevantes y mejora la interacción.                                  | Se utiliza correctamente en funcionalidades concretas.                    | Uso limitado o principalmente superficial.                                         | No se utiliza o no aporta funcionalidad significativa.                          | **10** |
| **8. Validaciones**                  | Validaciones completas tanto en cliente como en servidor.                                                   | Validaciones correctas con algunas omisiones.                             | Existen validaciones básicas pero insuficientes.                                   | No se realizan validaciones adecuadas.                                          |  **5** |
| **9. Seguridad básica**              | Aplica correctamente hash de contraseñas, consultas preparadas, validación de datos y protección de acceso. | Aplica la mayoría de las medidas solicitadas.                             | Aplica algunas medidas pero mantiene vulnerabilidades importantes.                 | Almacena datos sensibles incorrectamente o presenta vulnerabilidades evidentes. | **10** |
| **10. Organización y documentación** | Código ordenado y documentación completa, clara y útil.                                                     | Buena organización y documentación con algunos aspectos incompletos.      | Organización o documentación básica.                                               | Código desorganizado y documentación insuficiente o inexistente.                |  **5** |

### Total: **100 puntos**

---

# Escala de desempeño

|      Puntaje | Desempeño                |
| -----------: | ------------------------ |
| **90 – 100** | 🟢 Excelente             |
|  **75 – 89** | 🟢 Muy bueno             |
|  **60 – 74** | 🟡 Bueno / Satisfactorio |
|  **50 – 59** | 🟠 Básico / En proceso   |
|   **0 – 49** | 🔴 Insuficiente          |

---

# Condiciones mínimas

Para aprobar el proyecto no alcanza solamente con obtener un determinado puntaje.

El sistema deberá cumplir con los **componentes fundamentales** del proyecto:

* PHP funcional.
* MySQL funcional.
* Al menos un CRUD completo.
* Sistema de usuarios.
* Manejo de sesiones.
* Control de acceso.
* Validaciones.
* Seguridad básica.
* Documentación.

### ⚠️ Funcionalidad

Si el proyecto presenta una interfaz visualmente correcta pero **no permite realizar realmente las operaciones sobre la base de datos**, el criterio correspondiente deberá calificarse según el funcionamiento real y no según la apariencia.

Por ejemplo:

> Un botón "Eliminar producto" que solamente muestra un mensaje pero no elimina el registro de MySQL **no constituye una operación DELETE funcional**.

---

# Evaluación de la demostración

Durante la presentación, el grupo deberá demostrar el funcionamiento del sistema.

### Secuencia sugerida

**1. Acceso**

* Iniciar sesión.
* Mostrar una funcionalidad pública.
* Mostrar una funcionalidad restringida.

**2. Gestión**

* Crear un registro.
* Consultar registros.
* Modificar un registro.
* Eliminar un registro.

**3. Base de datos**

* Mostrar que las operaciones realizadas afectan realmente a MySQL.

**4. Seguridad**

* Mostrar el funcionamiento de las sesiones.
* Mostrar el control de acceso.
* Explicar cómo se almacenan las contraseñas.
* Explicar cómo se protegen las consultas SQL.

**5. JavaScript/AJAX**

* Mostrar la funcionalidad implementada.

---

# Criterio pedagógico

La evaluación priorizará:

**Funcionamiento → Integración → Seguridad → Organización → Diseño visual**

Por lo tanto, se espera que los estudiantes desarrollen un proyecto **simple, pero completo y funcional**, en lugar de un proyecto muy grande con numerosas funcionalidades incompletas.

> **Un proyecto pequeño que funciona correctamente tendrá mayor valoración que un proyecto ambicioso que no logra integrar los contenidos fundamentales.**
