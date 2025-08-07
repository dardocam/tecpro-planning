## 📚 Clase 5: Introducción al ciclo de vida de componentes con `useEffect`

### 🎯 Objetivos de la clase

* Comprender el **ciclo de vida de los componentes funcionales** en React mediante el hook `useEffect`.
* Aplicar `useEffect` para realizar operaciones con **efectos secundarios**: peticiones HTTP, temporizadores, suscripciones, etc.
* Integrar `useEffect` con `useState` para actualizar y controlar datos dinámicos en la interfaz.

---

## 🧠 Parte Teórica 

### 1. ¿Qué es un efecto secundario en React?

Un **efecto secundario (side effect)** es cualquier operación que:

* Interactúa con el **mundo exterior** (API, base de datos, almacenamiento local).
* Modifica **estados fuera del componente actual**.
* No es puramente determinista (como un `fetch`, un `setTimeout`, etc.).

🔎 Ejemplos comunes:

* Fetch de datos desde una API.
* Temporizadores y contadores.
* Manipulación directa del DOM (en web).
* Subscripciones y listeners de eventos.

---

### 2. Introducción al hook `useEffect`

```jsx
import React, { useEffect } from 'react';
```

Sintaxis básica:

```jsx
useEffect(() => {
  // Código a ejecutar como efecto
}, [dependencias]);
```

📌 El `useEffect` recibe dos argumentos:

* Una función que se ejecuta como efecto.
* Un **array de dependencias** que determina cuándo ejecutar el efecto.

---

### 3. Casos de uso del `useEffect`

#### 3.1. Sin dependencias → Ejecuta solo una vez (componentDidMount)

```jsx
useEffect(() => {
  console.log("Se ejecuta una vez al montar el componente");
}, []);
```

#### 3.2. Con dependencias → Ejecuta cada vez que cambia alguna dependencia (componentDidUpdate)

```jsx
useEffect(() => {
  console.log("Se ejecuta cuando cambia `count`");
}, [count]);
```

#### 3.3. Efecto con limpieza (componentWillUnmount)

```jsx
useEffect(() => {
  const timer = setInterval(() => console.log("tick"), 1000);
  return () => {
    clearInterval(timer);
    console.log("Limpiando intervalo");
  };
}, []);
```

---

### 4. Comparación con ciclo de vida en componentes de clase

| Ciclo de vida en clase | Equivalente con `useEffect`   |
| ---------------------- | ----------------------------- |
| componentDidMount      | `useEffect(() => {}, [])`     |
| componentDidUpdate     | `useEffect(() => {}, [deps])` |
| componentWillUnmount   | Limpieza en `useEffect`       |

---

### 5. Buenas prácticas

* Siempre limpiar los efectos cuando sea necesario.
* No colocar efectos que modifiquen el mismo estado dentro de la dependencia del mismo efecto (evitar bucles infinitos).
* Colocar todas las variables externas al efecto en el array de dependencias.

---

## 🛠️ Parte Práctica 

### 💡 Proyecto práctico: **“Contador con título dinámico y temporizador”**

#### 📌 Requisitos:

* Crear un contador que aumente al presionar un botón.
* Usar `useEffect` para:

  * Cambiar el título de la app dinámicamente (simulando el `document.title` en web).
  * Mostrar en consola cada vez que cambia el contador.
  * Agregar un temporizador que actualice la hora actual cada segundo.

---

### Paso a paso:

#### 1. Crear componente básico

```jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export default function Contador() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  return (
    <View style={{ padding: 20 }}>
      <Text>Contador: {count}</Text>
      <Button title="Aumentar" onPress={() => setCount(count + 1)} />
      <Text>Hora actual: {time}</Text>
    </View>
  );
}
```

---

#### 2. Efecto que escucha cambios del contador

```jsx
useEffect(() => {
  console.log(`El contador cambió a: ${count}`);
}, [count]);
```

---

#### 3. Efecto para temporizador

```jsx
useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

---

### 🔄 Variaciones y prácticas guiadas

✅ Agregar un botón de “Reset” para volver el contador a 0.

✅ Crear un efecto que muestre un mensaje al montar el componente y otro al desmontarlo.

✅ Utilizar dos efectos diferentes: uno para el contador y otro para el temporizador.

✅ Analizar en grupo: ¿Qué sucede si olvidamos el array de dependencias?

---
