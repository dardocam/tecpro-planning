### **Esquemático del Product Backlog y User Stories para el Proyecto eCommerce**  

El **product backlog** es una lista priorizada de tareas y características necesarias para desarrollar el proyecto. A continuación, se presenta un ejemplo esquemático del backlog, dividido en **épicas**, **historias de usuario** y sus respectivas tareas.  

---

## **1. Product Backlog**  

### **Épica 1: Gestión de Usuarios**  
**Historia de Usuario 1.1**:  
**Como** visitante, **quiero** registrarme en el sitio web, **para** poder realizar compras.  
- **Tareas**:  
  - Diseñar la interfaz del formulario de registro.  
  - Implementar validación de datos en el cliente y en el servidor.  
  - Guardar los datos del usuario en la base de datos.  
  - Enviar correo de confirmación.  

**Historia de Usuario 1.2**:  
**Como** usuario registrado, **quiero** iniciar sesión, **para** acceder a mi cuenta y realizar pedidos.  
- **Tareas**:  
  - Crear formulario de login.  
  - Implementar funcionalidad de autenticación con hashing.  
  - Gestionar sesiones de usuario con PHP.  
  - Crear un sistema de recuperación de contraseñas.  

**Historia de Usuario 1.3**:  
**Como** administrador, **quiero** gestionar usuarios registrados, **para** mantener el sistema limpio y ordenado.  
- **Tareas**:  
  - Crear interfaz de administración de usuarios (CRUD).  
  - Implementar paginación y búsqueda en la lista de usuarios.  
  - Validar permisos de administrador.  

---

### **Épica 2: Gestión de Productos**  
**Historia de Usuario 2.1**:  
**Como** administrador, **quiero** agregar productos al catálogo, **para** que los usuarios puedan comprarlos.  
- **Tareas**:  
  - Diseñar la interfaz de creación de productos.  
  - Implementar carga de imágenes.  
  - Guardar la información del producto en la base de datos.  

**Historia de Usuario 2.2**:  
**Como** usuario, **quiero** buscar y filtrar productos, **para** encontrar lo que necesito fácilmente.  
- **Tareas**:  
  - Implementar barra de búsqueda.  
  - Crear filtros dinámicos (categoría, precio, etc.).  
  - Usar AJAX para actualizaciones en tiempo real.  

**Historia de Usuario 2.3**:  
**Como** usuario, **quiero** ver los detalles de un producto, **para** tomar una decisión informada antes de comprar.  
- **Tareas**:  
  - Diseñar la página de detalles del producto.  
  - Mostrar datos dinámicos desde la base de datos.  
  - Incluir imágenes, descripción, precio y stock.  

---

### **Épica 3: Carrito de Compras**  
**Historia de Usuario 3.1**:  
**Como** usuario, **quiero** agregar productos al carrito, **para** realizar compras.  
- **Tareas**:  
  - Crear funcionalidad de agregar al carrito.  
  - Guardar el estado del carrito en sesiones o base de datos.  
  - Mostrar una notificación de confirmación.  

**Historia de Usuario 3.2**:  
**Como** usuario, **quiero** ver y modificar mi carrito, **para** ajustar mis productos antes de pagar.  
- **Tareas**:  
  - Crear página del carrito con una tabla para los productos seleccionados.  
  - Permitir actualizar cantidades o eliminar productos.  
  - Calcular el total automáticamente.  

---

### **Épica 4: Proceso de Pago (Checkout)**  
**Historia de Usuario 4.1**:  
**Como** usuario, **quiero** completar mi pedido con un proceso de pago, **para** finalizar mi compra.  
- **Tareas**:  
  - Diseñar la página de checkout.  
  - Crear formularios para datos de envío y pago.  
  - Implementar validaciones en el cliente y servidor.  
  - Guardar el pedido en la base de datos.  

**Historia de Usuario 4.2**:  
**Como** usuario, **quiero** recibir una confirmación de mi compra, **para** tener registro de mi pedido.  
- **Tareas**:  
  - Generar un resumen del pedido.  
  - Enviar un correo de confirmación al usuario.  
  - Mostrar un mensaje de éxito en la página.  

---

### **Épica 5: Gestión de Pedidos**  
**Historia de Usuario 5.1**:  
**Como** administrador, **quiero** gestionar los pedidos, **para** cumplir con las entregas de manera eficiente.  
- **Tareas**:  
  - Diseñar una interfaz para listar pedidos (CRUD).  
  - Implementar filtros por estado (pendiente, procesado, completado).  
  - Actualizar el estado del pedido.  

---

## **2. Tablero de Trabajo (Kanban)**  

| **Estado**          | **Tarea**                                                 | **Prioridad** |  
|----------------------|----------------------------------------------------------|---------------|  
| **To Do**            | Crear formulario de registro y validaciones              | Alta          |  
| **In Progress**      | Implementar búsqueda y filtros dinámicos                 | Media         |  
| **Code Review**      | Finalizar la página de detalles del producto             | Baja          |  
| **Done**             | Diseño del prototipo de las interfaces principales       | Alta          |  

---

Este esquema asegura que el proyecto esté bien estructurado y priorizado, permitiendo que los estudiantes trabajen de manera colaborativa y organizada mientras desarrollan un eCommerce funcional. 