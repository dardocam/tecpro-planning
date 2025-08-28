# 📱 Proyecto: **Contador de Hábitos Diarios**

👉 Una app simple en **Expo + React Native**, donde el usuario puede registrar un hábito (ej: tomar agua, hacer ejercicio) y contar cuántas veces lo cumplió en el día.
Incluye:

* **Clase 1:** Configuración del proyecto con Expo y estructura inicial.
* **Clase 2:** Uso de **componentes funcionales y props** para mostrar hábitos.
* **Clase 3:** Manejo de estado con `useState` para contar repeticiones.
* **Clase 4:** Uso de `useEffect` para **reiniciar automáticamente el contador cada día**.

---

## 📂 Estructura del Proyecto

```
habit-tracker/
├── App.js
├── components/
│   └── HabitCard.js
└── package.json
```

---

## 📝 Código del Proyecto

### `App.js`

```jsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import HabitCard from "./components/HabitCard";

export default function App() {
  const [habits, setHabits] = useState([
    { id: "1", name: "Tomar Agua", count: 0 },
    { id: "2", name: "Hacer Ejercicio", count: 0 },
  ]);

  // Reinicia los contadores cada día
  useEffect(() => {
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem("lastReset");

    if (lastReset !== today) {
      const resetHabits = habits.map(habit => ({ ...habit, count: 0 }));
      setHabits(resetHabits);
      localStorage.setItem("lastReset", today);
    }
  }, []);

  const incrementHabit = (id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, count: habit.count + 1 } : habit
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Mis Hábitos Diarios</Text>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitCard habit={item} onIncrement={incrementHabit} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
```

---

### `components/HabitCard.js`

```jsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HabitCard({ habit, onIncrement }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{habit.name}</Text>
      <Text style={styles.count}>✅ {habit.count}</Text>
      <Button title="Sumar" onPress={() => onIncrement(habit.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  count: {
    fontSize: 16,
    marginVertical: 5,
  },
});
```

---

## 🎯 Conceptos Cubiertos

1. **Clase 1:** Proyecto creado con `npx create-expo-app habit-tracker`.
2. **Clase 2:** `HabitCard` es un **componente funcional** que recibe props (`habit`, `onIncrement`).
3. **Clase 3:** `useState` controla la lista de hábitos y sus contadores.
4. **Clase 4:** `useEffect` resetea automáticamente el contador cuando cambia el día.

