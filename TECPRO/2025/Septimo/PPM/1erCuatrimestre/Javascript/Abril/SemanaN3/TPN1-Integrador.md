**Enunciado del Problema: Sistema de Gestión de Inventario con Métodos de Arreglo en JavaScript**  

---

### **Contexto**  
Eres parte de un equipo de desarrollo encargado de implementar un módulo de gestión de inventario para una empresa de retail. El sistema debe procesar un conjunto de productos con diversas propiedades y ejecutar operaciones críticas para la toma de decisiones. Los datos iniciales son:  

```javascript
const productos = [
  { id: 1, nombre: 'Laptop', categoria: 'electronica', precio: 1200, stock: 15, ubicacion: 'A12' },
  { id: 2, nombre: 'Smartphone', categoria: 'electronica', precio: 800, stock: 0, ubicacion: 'B7' },
  { id: 3, nombre: 'Camiseta', categoria: 'ropa', precio: 25, stock: 50, ubicacion: 'C3' },
  { id: 4, nombre: 'Zapatos', categoria: 'ropa', precio: 90, stock: 5, ubicacion: 'D9' },
  { id: 5, nombre: 'Libro JS', categoria: 'libros', precio: 45, stock: 20, ubicacion: 'E14' }
];
```

---

### **Requerimientos**  
Debes implementar las siguientes funcionalidades utilizando métodos de arreglo de JavaScript (`map`, `filter`, `reduce`, `find`, `forEach`, `some`, `every`):  

1. **Actualización Masiva de Precios**  
   - Aumentar un **5%** el precio de todos los productos de la categoría *"electronica"*.  
   - *Método sugerido:* `map()`.  
   - *Salida esperada:* Nuevo arreglo con precios actualizados, sin modificar el original.  

2. **Gestión de Stock Crítico**  
   - Identificar productos con **stock menor a 10 unidades** (excluyendo los agotados).  
   - *Método sugerido:* `filter()`.  
   - *Salida esperada:* Arreglo con productos en riesgo de agotarse.  

3. **Cálculo del Valor Total del Inventario por Categoría**  
   - Calcular el valor total (*precio * stock*) agrupado por categoría.  
   - *Método sugerido:* `reduce()`.  
   - *Salida esperada:* Objeto con claves por categoría y valores numéricos. Ej: `{ electronica: 18000, ropa: 1700 }`.  

4. **Búsqueda de Productos por Ubicación**  
   - Implementar una función que reciba un código de ubicación (ej: `"A12"`) y retorne el producto correspondiente.  
   - *Método sugerido:* `find()`.  
   - *Salida esperada:* Objeto del producto o `undefined` si no existe.  

5. **Reabastecimiento de Stock**  
   - Añadir **10 unidades** a todos los productos con stock actual menor a 15.  
   - *Método sugerido:* `map()`.  
   - *Salida esperada:* Nuevo arreglo con stock actualizado.  

6. **Alerta de Productos Agotados**  
   - Verificar si existe al menos un producto con **stock igual a 0**.  
   - *Método sugerido:* `some()`.  
   - *Salida esperada:* Booleano (`true`/`false`).  

7. **Validación de Datos Completos**  
   - Asegurar que todos los productos tengan una ubicación válida (formato: `Letra + Número`, ej: `"A12"`).  
   - *Método sugerido:* `every()`.  
   - *Salida esperada:* Booleano (`true`/`false`).  

8. **Registro de Productos en Consola**  
   - Mostrar en consola el nombre y stock de cada producto con el formato: `"Laptop - Stock: 15"`.  
   - *Método sugerido:* `forEach()`.  

---

### **Ejercicio Integrado: Generación de Reporte Consolidado**  
Combina múltiples métodos para crear un reporte que incluya:  
- Precios actualizados (solo electrónicos).  
- Stock reabastecido (productos con stock inicial < 15).  
- Valor total del inventario por categoría.  
- Lista de productos agotados y con exceso de stock (>50 unidades).  

*Salida esperada:*  
```javascript
{
  categorias: {
    electronica: { totalProductos: 2, valorTotal: 22800 },
    ropa: { totalProductos: 2, valorTotal: 3350 },
    libros: { totalProductos: 1, valorTotal: 900 }
  },
  alertas: {
    agotados: ["Smartphone"],
    exceso: ["Camiseta"]
  }
}
```

---

### **Consideraciones Adicionales**  
- **Inmutabilidad:** No modifiques el arreglo original de productos.  
- **Validaciones:** Maneja casos donde el cálculo del valor total podría generar errores (ej: stock negativo).  
- **Eficiencia:** Evita anidar más de tres métodos en operaciones sobre grandes volúmenes de datos.  
- **Legibilidad:** Usa nombres de variables descriptivos (ej: `productosReabastecidos` en lugar de `newArray`).  
