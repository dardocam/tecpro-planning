## ✅ Clase 8: Sesión práctica de repaso

### 🧠 Objetivo general:

Consolidar los conocimientos adquiridos en las clases anteriores a través de la integración de los distintos conceptos: componentes, props, hooks (`useState`, `useEffect`), estilizado con `StyleSheet` y uso de componentes básicos. Resolver dudas y reforzar los aprendizajes clave.

---

## 🕒 Parte teórica (40 minutos)

### 1. Repaso general de conceptos (20 minutos)

#### 📌 Componentes funcionales

* Qué son y cómo se declaran.
* Reutilización y composición de componentes.

#### 📌 Props

* Paso de información entre componentes padres e hijos.
* Inmutabilidad de las props.

#### 📌 `useState`

* Hook para manejar el estado local.
* Casos de uso: contadores, toggles, formularios.

#### 📌 `useEffect`

* Hook para efectos secundarios.
* Sincronización con eventos externos: timers, fetch, cambios de estado.

#### 📌 Estilizado con `StyleSheet`

* Declaración de estilos.
* Uso de Flexbox para layout responsivo.
* Estilos condicionales.

#### 📌 Componentes básicos

* `View`, `Text`, `Image`, `ScrollView`, `TextInput`, `Button`.
* Buenas prácticas para composición de la UI.

---

### 2. Buenas prácticas y patrones (10 minutos)

#### 🧱 Separación de responsabilidades

* Separar lógica y presentación.
* Componentes pequeños y reutilizables.

#### 🧪 Pruebas simples manuales

* Cómo verificar que los estados, props y efectos funcionan correctamente.

#### 📦 Organización del proyecto

* Revisión de la estructura: `components/`, `assets/`, `screens/`, etc.

---

### 3. Resolución de dudas (10 minutos)

* Espacio abierto para preguntas.
* Ejemplos en vivo según dudas planteadas.

---

## 🛠️ Parte práctica (40 minutos)

### Desafío integrador: "Mi perfil"

**Objetivo:** Crear una pequeña app que muestre un perfil de usuario con una imagen, nombre, descripción y un contador de seguidores con botón para aumentar.

---

### 🧩 Requisitos del proyecto

#### Componentes a utilizar:

* `View`, `Text`, `Image`, `Button`
* `useState`, `StyleSheet`, `props`

#### Estructura sugerida:

```bash
/App.js
/components/UserProfile.js
/assets/profile.jpg
```

---

### 👨‍💻 Paso a paso

#### 1. Crear el componente `UserProfile`

```jsx
// components/UserProfile.js
import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function UserProfile({ name, description, image }) {
  const [followers, setFollowers] = useState(100);

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.followers}>Seguidores: {followers}</Text>
      <Button title="Seguir" onPress={() => setFollowers(followers + 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  followers: {
    marginVertical: 10,
    fontSize: 16,
  },
});
```

---

#### 2. Utilizar el componente en `App.js`

```jsx
// App.js
import React from 'react';
import { SafeAreaView } from 'react-native';
import UserProfile from './components/UserProfile';

export default function App() {
  return (
    <SafeAreaView>
      <UserProfile
        name="Juan Pérez"
        description="Desarrollador móvil y entusiasta de la tecnología"
        image={require('./assets/profile.jpg')}
      />
    </SafeAreaView>
  );
}
```

---

### 🧪 Verificación de funcionamiento:

* El perfil se muestra correctamente.
* El contador aumenta al presionar el botón "Seguir".
* El layout responde bien a diferentes tamaños de pantalla.

---

## 📝 Cierre de clase (últimos 5 minutos)

* Preguntas finales.
* Breve encuesta oral: ¿qué fue lo más útil de la unidad?
* Introducción al próximo módulo: **Navegación y estructuras de pantallas**.

---
