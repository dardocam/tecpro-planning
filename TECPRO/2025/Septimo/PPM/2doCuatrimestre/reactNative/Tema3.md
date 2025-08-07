# 🟦 **Clase 3: Fundamentos de React — JSX, Componentes Funcionales y Props**

**Objetivo de la clase:** Entender qué es JSX, cómo se construyen componentes funcionales y cómo se comunican mediante props. Aplicar esos conceptos creando componentes reutilizables y parametrizables.

---

## 📘 PARTE TEÓRICA 

### 1. Activación y repaso rápido 

* Breve repaso: ¿Qué vimos en las clases anteriores?

  * Proyecto Expo funcionando
  * Estructura básica (`App.js`, `View`, `Text`)
* Pregunta para la clase: “Si React Native usa JavaScript, ¿cómo se escribe la UI dentro de JS?” → Introducción a JSX.

---

### 2. JSX 

#### ¿Qué es JSX?

* JSX es una extensión de sintaxis de JavaScript que permite escribir una “apariencia” declarativa parecida a HTML dentro de código JS.
* No es HTML: se compila/transpila a llamadas a `React.createElement` bajo el capó.

#### Ventajas

* Sintaxis expresiva.
* Mezcla lógica y estructura de manera legible.
* Permite interpolar valores de JS usando `{}`.

#### Ejemplos claves:

```jsx
// Variable dentro de JSX
const nombre = "Dardo";
<Text>Hola, {nombre}!</Text>

// Condicional simple
{isLoggedIn ? <Text>Bienvenido</Text> : <Text>Por favor inicia sesión</Text>}

// Listado dinámico
const items = ["Manzana", "Banana", "Cereza"];
{items.map((i, idx) => <Text key={idx}>{i}</Text>)}
```

#### Reglas importantes

* Debe haber un **solo elemento padre** (usar `<>...</>` fragmentos si no se quiere un `View` adicional).
* Atributos con nombres de JS: `style` (no `class`), `onPress` (no `onclick`).
* `{}` para insertar expresiones JS.
* Clave en listas (`key`).

#### Errores comunes

* Olvidar la prop `key` en `.map()`: genera warnings y problemas de render.
* Intentar usar comentarios HTML: se usan `{/* comentario */}`.
* Retornar múltiples hermanos sin fragmento: causa error.

---

### 3. Componentes funcionales

#### ¿Qué es un componente?

* Es una función que recibe propiedades y devuelve JSX.
* Unidad reutilizable de interfaz.

#### Sintaxis básica:

```jsx
function Saludo() {
  return <Text>Hola!</Text>;
}

// Con arrow function
const Saludo = () => <Text>Hola!</Text>;
```

#### Composición

* Un componente puede incluir otros:

```jsx
const Tarjeta = () => (
  <View style={{ padding: 10, backgroundColor: "#eee" }}>
    <Text>Título</Text>
    <Text>Descripción</Text>
  </View>
);
```

#### Buenas prácticas

* Componentes pequeños y enfocados (una sola responsabilidad).
* Separar “presentación” de “lógica” cuando crezca la complejidad.
* Nombrado con PascalCase (`MiComponente`).

---

### 4. Props — Comunicación entre componentes 

#### ¿Qué son?

* “Propiedades” que se pasan desde un padre a un hijo como parámetros.
* Inmutables dentro del componente hijo (si hay que cambiarlas, se levanta estado).

#### Ejemplo:

```jsx
const Saludo = ({ nombre }) => (
  <Text>Hola, {nombre}!</Text>
);

// Uso
<Saludo nombre="Ana" />
```

#### Destructuring y default props

```jsx
const Tarjeta = ({ titulo = "Sin título", contenido }) => (
  <View>
    <Text>{titulo}</Text>
    <Text>{contenido}</Text>
  </View>
);
```

#### Paso de múltiples props

```jsx
<Usuario avatar="url" nombre="Dardo" estado="Activo" />
```

#### Children

* Props especiales que permiten anidar:

```jsx
const Caja = ({ children }) => (
  <View style={{ borderWidth: 1, padding: 10 }}>{children}</View>
);

// Uso
<Caja>
  <Text>Dentro de la caja</Text>
</Caja>
```

---

## 🧪 PARTE PRÁCTICA

### 🕒 **Distribución sugerida (práctica)**

### Ejercicio 1: Componentes + Props básicos

#### Objetivo:

Construir dos componentes reutilizables y usarlos desde `App.js` pasando datos via props.

#### Pasos:

1. **Crear componente `SaludoPersonalizado.js`**

   ```jsx
   import { Text, View, StyleSheet } from "react-native";

   const SaludoPersonalizado = ({ nombre, mensaje }) => {
     return (
       <View style={styles.card}>
         <Text style={styles.titulo}>Hola, {nombre}!</Text>
         <Text>{mensaje}</Text>
       </View>
     );
   };

   const styles = StyleSheet.create({
     card: {
       padding: 12,
       backgroundColor: "#d1e7dd",
       borderRadius: 8,
       marginVertical: 6,
     },
     titulo: {
       fontWeight: "bold",
       fontSize: 16,
     },
   });

   export default SaludoPersonalizado;
   ```

2. **Usar en `App.js`**

   ```jsx
   import SaludoPersonalizado from "./SaludoPersonalizado";

   export default function App() {
     return (
       <View style={{ padding: 20, marginTop: 40 }}>
         <SaludoPersonalizado nombre="Lucía" mensaje="Bienvenida al curso!" />
         <SaludoPersonalizado nombre="Mateo" mensaje="Listo para crear apps!" />
       </View>
     );
   }
   ```

3. **Variar props** y observar cómo cambian los textos.

---

### Ejercicio 2: Componente de “Perfil de Usuario” 

#### Objetivo:

Hacer un componente más completo que reciba varias props y use `children`.

#### Requisitos del componente `PerfilUsuario.js`:

* Props: `avatar` (imagen local o remota), `nombre`, `descripcion`, `estado` (ej: “Online” / “Offline”)
* Mostrar `nombre` y `estado` juntos con estilo.
* Incluir un `children` para colocar un botón o nota extra.

```jsx
import { View, Text, Image, StyleSheet } from "react-native";

const PerfilUsuario = ({ avatar, nombre, descripcion, estado, children }) => {
  return (
    <View style={styles.container}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.estado}>{estado}</Text>
        <Text>{descripcion}</Text>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", padding: 10, backgroundColor: "#f0f4f8", borderRadius: 10, marginVertical: 8 },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  info: { flex: 1 },
  nombre: { fontSize: 18, fontWeight: "bold" },
  estado: { fontSize: 12, color: "#555" },
});

export default PerfilUsuario;
```

#### Uso desde `App.js`:

```jsx
import PerfilUsuario from "./PerfilUsuario";

export default function App() {
  return (
    <View style={{ padding: 16 }}>
      <PerfilUsuario
        avatar={require("./assets/avatar1.png")}
        nombre="Dardo Camaño"
        descripcion="Desarrollador en formación"
        estado="Activo"
      >
        <Text style={{ marginTop: 4, fontStyle: "italic" }}>Última conexión: hoy</Text>
      </PerfilUsuario>
    </View>
  );
}
```

---

### Autoevaluación

Preguntas tipo “flash” para verificar comprensión:

1. ¿Qué es JSX y por qué no es HTML puro?
2. ¿Cómo se pasa una prop a un componente? Da un ejemplo.
3. ¿Qué hace `{children}` dentro de un componente?
4. ¿Por qué se recomienda dividir la UI en componentes pequeños?

---

## 🏠 Desafío

Crear una pantalla de “tarjetas de productos” donde cada tarjeta sea un componente que reciba via props:

* Nombre del producto
* Precio
* Imagen
* Estado (ej: “En stock” / “Agotado”)

Agregar un “badge” visual (texto con fondo) que cambie de color según el estado.
Bonus: hacer una lista con al menos 3 productos usando `.map()` y asignando `key`.

---

## 📌 Buenas prácticas y consejos

* Destructurar props para claridad: `const MiComponente = ({ titulo, subtitulo }) => { ... }`.
* Usar nombres semánticos en props (`isActive` en lugar de `activo1`).
* Mantener componentes pequeños y testables.
* Evitar lógica pesada dentro del JSX; extraer funciones si es necesario.

---

## 📚 Recursos auxiliares

* Documentación oficial de React (JSX y componentes): reactjs.org/docs
* Guía práctica sobre props y composición
* Cheatsheet: “JSX quick reference” y “Component patterns” (puede entregarse impreso)

---

