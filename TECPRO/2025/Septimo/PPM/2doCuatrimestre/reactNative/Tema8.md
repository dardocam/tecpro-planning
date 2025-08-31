# 📚 Clase 8: Sesión práctica de repaso e integración

## 🎯 Objetivos de aprendizaje

* Reforzar los conceptos trabajados en las clases 1 a 7.
* Integrar **componentes, estado, props, estilos y hooks** en una app práctica.
* Consolidar el flujo de trabajo con Expo y React Native.
* Resolver dudas frecuentes y preparar el terreno para la siguiente unidad.

---

## 🧩 Parte Teórica 
### 1. Repaso general de contenidos previos

* **JSX**: la forma de describir la UI.
* **Componentes funcionales**: bloques reutilizables.
* **Props**: datos que viajan de padres a hijos.
* **useState**: manejo de estado interno.
* **useEffect**: efectos secundarios.
* **StyleSheet y Flexbox**: diseño responsivo.
* **Componentes básicos**: `View`, `Text`, `Image`, `ScrollView`, `TouchableOpacity`.

👉 Breve quiz o preguntas rápidas a los estudiantes para activar conocimientos previos.

---

### 2. Diseño de una mini aplicación integradora 

Se propone construir una **App de Lista de Tareas (To-Do App)** que integre:

* Entrada de texto para escribir tareas (`TextInput`).
* Botón para agregar la tarea (`Button` o `TouchableOpacity`).
* Listado de tareas con scroll (`ScrollView` o `FlatList`).
* Manejo de estado (`useState`) para la lista.
* Pequeño efecto de inicialización (`useEffect`) para cargar tareas de ejemplo.
* Estilos básicos con `StyleSheet` y Flexbox.

---

### 3. Ejemplo de estructura de la app

```jsx
import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Efecto inicial
  useEffect(() => {
    setTasks(["Estudiar React Native", "Practicar hooks", "Revisar estilos"]);
  }, []);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Lista de Tareas</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe una tarea..."
        value={task}
        onChangeText={setTask}
      />
      <Button title="Agregar" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.task}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: "#ccc", padding: 10,
    marginBottom: 10, borderRadius: 5
  },
  task: {
    fontSize: 16, padding: 8, borderBottomWidth: 1, borderBottomColor: "#eee"
  }
});
```

---

## 🛠️ Parte Práctica 

### **Actividad guiada paso a paso**

1. **Crear un nuevo proyecto Expo**: `npx create-expo-app tareasApp`.
2. **Construir la estructura básica** (`View` + `Text`).
3. **Agregar un campo de texto (`TextInput`) y un botón para añadir tareas**.
4. **Implementar `useState`** para manejar la entrada y la lista de tareas.
5. **Mostrar la lista de tareas** usando `FlatList`.
6. **Aplicar estilos con `StyleSheet`** para mejorar la presentación.
7. **Integrar `useEffect`** para cargar algunas tareas iniciales.

---

### **Actividad libre / desafío **

* Añadir botón para **eliminar tareas**.
* Estilizar la lista alternando colores en las filas.
* Opcional: mostrar un mensaje si no hay tareas (“Lista vacía”).

---

## 🎤 Cierre y discusión

* Preguntar:

  * ¿Qué fue lo más difícil de integrar?
  * ¿Qué parte se siente más clara después de este repaso?
* Enfatizar que este tipo de app integra **todo lo aprendido hasta ahora**.
* Introducir brevemente lo que vendrá en la **Unidad 2: Navegación y estructura de aplicaciones**.

---


