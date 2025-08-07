## 📘 Clase 4: Manejo de Estado Local con el Hook `useState`

### 🎯 Objetivo general:

Comprender el concepto de **estado local** en React y cómo gestionarlo utilizando el **hook `useState`**, aplicándolo a la actualización dinámica de la interfaz de usuario.

---

## 🧠 Parte Teórica 

### 1. ¿Qué es el estado en React? 

* El estado representa datos **dinámicos** que afectan el comportamiento o renderizado de un componente.
* A diferencia de las **props** (que son inmutables), el estado **puede cambiar** durante el ciclo de vida del componente.
* Es la forma en la que React maneja **interacciones del usuario**, **entradas**, **resultados de cálculos**, etc.

**Ejemplo:** Un contador, un formulario, un botón que cambia de color, etc.

---

### 2. Introducción al Hook `useState` 

#### Sintaxis básica:

```javascript
const [valor, setValor] = useState(valorInicial);
```

* `valor`: Es el valor actual del estado.
* `setValor`: Es la función que actualiza ese valor.
* `useState`: Es un hook de React que debe importarse desde `'react'`.

#### Reglas del hook:

* Solo se puede usar dentro de **componentes funcionales** o **otros hooks**.
* Debe llamarse siempre **en el mismo orden** y **no dentro de condicionales o bucles**.

#### Ejemplo mínimo:

```jsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function App() {
  const [contador, setContador] = useState(0);

  return (
    <View>
      <Text>Contador: {contador}</Text>
      <Button title="Incrementar" onPress={() => setContador(contador + 1)} />
    </View>
  );
}
```

---

### 3. Estado vs Props 

| Propiedad          | Estado (`useState`)  | Propiedades (`props`) |
| ------------------ | -------------------- | --------------------- |
| Mutable            | ✅ Sí                 | ❌ No (son inmutables) |
| Quién lo define    | El propio componente | El componente padre   |
| Se puede modificar | ✅ Con `setState`     | ❌ No directamente     |

---

### 4. Renderizado reactivo 

* Cuando se actualiza el estado con `setValor`, React vuelve a renderizar el componente para reflejar el nuevo estado.
* Esta característica permite que la interfaz se mantenga sincronizada con los datos del usuario o del sistema.

#### Casos comunes:

* Cambiar texto con un botón.
* Mostrar u ocultar elementos.
* Cambiar estilos dinámicamente.

---

## 💻 Parte Práctica 

> Requiere: Expo CLI y emulador o dispositivo real (mediante QR).

### 🧪 Ejercicio 1: Contador interactivo 

**Objetivo:** Implementar un contador que se incremente y decremente con dos botones.

#### Requisitos:

* Botón “+” para incrementar.
* Botón “-” para decrementar.
* Mostrar el valor del contador en pantalla.

#### Código base:

```jsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Contador: {contador}</Text>
      <Button title="Incrementar" onPress={() => setContador(contador + 1)} />
      <Button title="Decrementar" onPress={() => setContador(contador - 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  texto: { fontSize: 24, marginBottom: 10 }
});
```

---

### 🧪 Ejercicio 2: Cambiar texto dinámicamente 

**Objetivo:** Mostrar un mensaje que cambia al presionar un botón.

#### Desafío:

* Mostrar un texto inicial: “Presiona el botón”.
* Al presionar el botón, mostrar: “¡Gracias por presionar!”.

---

### 🧪 Ejercicio 3: Toggle (mostrar/ocultar) 

**Objetivo:** Mostrar u ocultar un texto al presionar un botón.

#### Funcionalidad:

* Botón que diga “Mostrar/Ocultar”.
* Un texto que se muestra o se oculta según el estado booleano.

---

### 🧪 Extensión (opcional si hay tiempo): Color dinámico 

**Objetivo:** Cambiar el color de fondo de un componente presionando un botón.

---

## 📋 Cierre de clase 

* Breve repaso de los conceptos aprendidos.
* Explicación del uso de `useState` como base para formularios, lógica condicional, animaciones, etc.
* Adelanto de la siguiente clase: Introducción al hook `useEffect`.

