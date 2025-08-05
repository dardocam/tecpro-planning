## 🧠 Clase N°7 — Componentes Básicos y Composición

**Objetivo:** Conocer y dominar los componentes visuales básicos de React Native, comprender cómo se componen entre sí y aprender a construir interfaces simples y responsivas.

---

### 🧩 Parte 1: Teoría (40 minutos)

#### 1. ¿Qué son los componentes básicos?

* En React Native, la UI se construye a partir de componentes reutilizables.
* Estos componentes son la base de toda aplicación móvil con React Native.

**Componentes fundamentales:**

| Componente   | Descripción                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------- |
| `View`       | Contenedor básico, similar a un `<div>` en HTML. Agrupa y posiciona elementos.               |
| `Text`       | Renderiza texto en pantalla.                                                                 |
| `Image`      | Muestra imágenes locales o remotas.                                                          |
| `ScrollView` | Contenedor con capacidad de desplazamiento vertical u horizontal. Útil para contenido largo. |

---

#### 2. Uso y propiedades más comunes

* **`View`**

  * Props: `style`, `flexDirection`, `justifyContent`, `alignItems`
* **`Text`**

  * Props: `style`, `numberOfLines`, `onPress`
* **`Image`**

  * Props: `source`, `resizeMode`, `style`
* **`ScrollView`**

  * Props: `horizontal`, `contentContainerStyle`, `showsVerticalScrollIndicator`

---

#### 3. Composición de componentes

* **Concepto:** React Native permite anidar componentes entre sí para construir estructuras jerárquicas.
* Ejemplo:

```jsx
<View>
  <Text>Bienvenido</Text>
  <Image source={require('./logo.png')} />
</View>
```

* Buenas prácticas:

  * Usar composición en lugar de lógica compleja.
  * Mantener componentes pequeños y reutilizables.
  * Separar la lógica y la presentación.

---

#### 4. Diseño responsivo en React Native

* React Native no utiliza unidades como px o %, sino que trabaja con el sistema de flexbox.
* Uso de `Dimensions` para obtener el tamaño de la pantalla.
* Alternativas:

  * `flex: 1`
  * `alignItems: 'center'`
  * `justifyContent: 'space-around'`
* Consideración: usar ScrollView si hay riesgo de desbordamiento visual.

---

#### 5. Ejemplos visuales (mostrar durante la clase)

* Capturas o live coding de ejemplos con layout de tarjetas, menús verticales, y galería de imágenes.

---

### 🛠 Parte 2: Práctica (40 minutos)

#### 🧪 Objetivo práctico:

Crear una interfaz de bienvenida para una app ficticia usando los componentes básicos (`View`, `Text`, `Image`, `ScrollView`) y principios de diseño responsivo.

---

#### 🧩 Actividad 1: Interfaz de bienvenida simple 

**Descripción:**
Los estudiantes crearán una pantalla inicial que muestre:

* Un logo
* Un título
* Un subtítulo
* Un botón ficticio (texto con onPress)

**Código base sugerido:**

```jsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>¡Bienvenido a MiApp!</Text>
      <Text style={styles.subtitle}>Tu app para aprender React Native</Text>
      <TouchableOpacity onPress={() => alert('Comenzar')}>
        <Text style={styles.button}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    color: '#fff',
    backgroundColor: '#1e90ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
```

---

#### 🧩 Actividad 2: ScrollView con tarjetas 

**Descripción:**
Crear una lista desplazable de tarjetas de información con `ScrollView`.

**Pasos:**

1. Crear un componente `Card` reutilizable.
2. Usar `ScrollView` para mostrar múltiples tarjetas.
3. Aplicar diseño responsivo.

**Código base sugerido:**

```jsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Card = ({ title, content }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text>{content}</Text>
  </View>
);

export default function InfoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card title="React" content="Una biblioteca para interfaces." />
      <Card title="React Native" content="Permite crear apps móviles nativas." />
      <Card title="Expo" content="Una herramienta para desarrollo rápido." />
      {/* Agregar más tarjetas */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
```

---

## 📘 **Clase 7 – Componentes básicos y creación de layouts responsivos**

### 🎯 **Objetivos de la clase**

* Conocer y dominar los componentes básicos provistos por React Native.
* Comprender cómo componer interfaces móviles mediante jerarquías de componentes.
* Aplicar principios de diseño responsivo usando `Flexbox`.
* Construir layouts sencillos que se adapten a diferentes tamaños de pantalla.

---

## 🧠 Parte 1 – Teoría (40 minutos)

### 1. Introducción a los Componentes Básicos (15 minutos)

| Componente   | Descripción                                                                               |
| ------------ | ----------------------------------------------------------------------------------------- |
| `View`       | Contenedor visual, similar a un `div` en HTML. Se utiliza para agrupar otros componentes. |
| `Text`       | Muestra texto. Es el único componente que renderiza contenido textual.                    |
| `Image`      | Muestra imágenes desde una URL o desde los assets locales.                                |
| `ScrollView` | Permite hacer scroll vertical/horizontal sobre una vista con contenido extenso.           |

> 💡 **Concepto clave:** Todo en React Native es un componente. Los básicos son bloques de construcción para la UI.

#### ⚠️ Diferencias con HTML/CSS:

* No existe `div`, `p`, `h1`, etc. Se reemplazan por `View`, `Text`, etc.
* No se utilizan clases CSS ni selectores. Se estiliza con objetos JavaScript.

---

### 2. Composición de Componentes (10 minutos)

* La **composición** es una técnica para construir componentes complejos a partir de componentes simples.
* Un componente puede tener hijos (children) y puede ser reutilizado dentro de otros componentes.

```jsx
<View>
  <Text>Título</Text>
  <Image source={{uri: 'https://...'}} />
</View>
```

> 🧱 **Principio de diseño:** Cada componente debe tener una única responsabilidad.

---

### 3. Diseño de Layouts Responsivos con Flexbox (15 minutos)

React Native implementa un subset de Flexbox:

| Propiedad        | Función                                                   |
| ---------------- | --------------------------------------------------------- |
| `flex`           | Define cuánto espacio ocupa un componente.                |
| `flexDirection`  | Define la dirección del eje principal (`row` o `column`). |
| `justifyContent` | Alineación en el eje principal.                           |
| `alignItems`     | Alineación en el eje secundario.                          |

#### Ejemplo básico:

```jsx
<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <View style={{ width: 50, height: 50, backgroundColor: 'red' }} />
  <View style={{ width: 50, height: 50, backgroundColor: 'blue' }} />
</View>
```

> 📏 **Responsive design:** Se logra usando proporciones (con `flex`) en lugar de medidas fijas.

---

## 🛠️ Parte 2 – Práctica (40 minutos)

### 🧪 Actividad 1: Galería simple con `ScrollView` (15 minutos)

**Objetivo:** Usar `ScrollView`, `Image`, y `Text`.

```jsx
<ScrollView>
  <Text style={{ fontSize: 24, margin: 10 }}>Galería de Imágenes</Text>
  <Image source={{ uri: 'https://via.placeholder.com/300' }} style={{ width: 300, height: 200 }} />
  <Image source={{ uri: 'https://via.placeholder.com/300' }} style={{ width: 300, height: 200 }} />
  <Image source={{ uri: 'https://via.placeholder.com/300' }} style={{ width: 300, height: 200 }} />
</ScrollView>
```

**✔️ Habilidades desarrolladas:**

* Uso de `ScrollView`.
* Renderización de contenido dinámico.
* Alineación básica de imágenes.

---

### 🧪 Actividad 2: Layout de Tarjetas Responsivas 

**Objetivo:** Construir un layout con tarjetas usando `Flexbox`.

#### Paso 1: Crear una tarjeta reutilizable

```jsx
const Card = ({ title }) => (
  <View style={{
    backgroundColor: '#eee',
    margin: 10,
    padding: 20,
    borderRadius: 8,
    width: 150
  }}>
    <Text style={{ fontWeight: 'bold' }}>{title}</Text>
  </View>
);
```

#### Paso 2: Componer varias tarjetas con `flexWrap`

```jsx
<View style={{
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
}}>
  <Card title="Card 1" />
  <Card title="Card 2" />
  <Card title="Card 3" />
  <Card title="Card 4" />
</View>
```

**✔️ Habilidades desarrolladas:**

* Creación de componentes reutilizables.
* Aplicación de `flexWrap` para adaptar contenido.
* Diseño modular de interfaces.

---

## 🎓 Cierre

* Preguntas y repaso de los conceptos clave: `View`, `Text`, `Image`, `ScrollView`, `Flexbox`.
* Tarea sugerida: Reproducir un diseño real (como un perfil de usuario o una grilla de productos).
* Avance: En la siguiente clase se integrarán todos los conceptos aprendidos en un proyecto de práctica guiado.

---

