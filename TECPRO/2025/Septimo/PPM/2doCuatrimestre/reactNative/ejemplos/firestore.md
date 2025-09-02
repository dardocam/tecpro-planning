# Actividad guiada: Mi primera app con **Cloud Firestore** y **React Native (Expo)**

> **Objetivo:** Construir una app simple de tareas (To‑Do) que cree, liste, marque como hecha y elimine tareas usando **Cloud Firestore** en tiempo real.

**Duración estimada:** 90–120 minutos
**Nivel:** Inicial / Intermedio
**Producto final:** App móvil funcionando + colección `todos` en Firestore

---

## 0) Requisitos previos

* Node.js LTS instalado (v18+).
* Cuenta en [Firebase Console](https://console.firebase.google.com/).
* Android Studio (emulador) **o** Xcode (simulador) **o** dispositivo físico con Expo Go.
* Conocimientos básicos de React Native (componentes, estados, hooks).

---

## 1) Crear el proyecto Expo

```bash
npx create-expo-app firestore-todos
cd firestore-todos
npm start   # o: npx expo start
```

Abre la app **Expo Go** en tu teléfono y escanea el QR para ver la app en vivo.

---

## 2) Crear el proyecto en Firebase y obtener la configuración

1. Entra a **Firebase Console** → **Agregar proyecto** → ponle un nombre (ej.: `rn-firestore-todos`).
2. Habilita Google Analytics **(opcional)**. Crea el proyecto.
3. Dentro del proyecto, en **Configuración (ícono de engranaje) → Configuración del proyecto → Tus apps** haz clic en **\</> Web** para **registrar una app Web** (solo para obtener el `firebaseConfig`).
4. Copia el objeto **`firebaseConfig`** que te muestra Firebase (apiKey, authDomain, etc.). Lo usaremos enseguida.

> *Nota:* Aunque nuestra app es React Native, el **SDK web de Firebase** funciona perfecto con Expo en JavaScript puro.

---

## 3) Instalar dependencias

```bash
npm i firebase
```

---

## 4) Configurar Firebase (`src/firebase.js`)

Crea la carpeta `src/` y el archivo `firebase.js`:

```javascript
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ⚠️ Reemplaza con TU configuración de Firebase Console
const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_AUTH_DOMAIN',
  projectId: 'TU_PROJECT_ID',
  storageBucket: 'TU_STORAGE_BUCKET',
  messagingSenderId: 'TU_SENDER_ID',
  appId: 'TU_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

> **Tip opcional (buena práctica):** Usa variables de entorno con `app.config.js` o `expo-env` para no exponer tus claves en el repo.

---

## 5) Reglas de seguridad (modo prueba con fecha de caducidad)

En **Firestore Database → Reglas**, pega algo como lo siguiente para desarrollo:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      // Permitir solo durante las prácticas (ajusta la fecha)
      allow read, write: if request.time < timestamp.date(2025, 10, 1);
    }
  }
}
```

> Más adelante cambia a `allow read, write: if request.auth != null;` y agrega **Firebase Auth**.

---

## 6) Crear la UI y la lógica (CRUD en tiempo real)

Reemplaza el contenido de `App.js` por lo siguiente:

```javascript
import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, FlatList, Pressable, Alert, StyleSheet } from 'react-native';
import { db } from './src/firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

export default function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  // Suscripción en tiempo real
  useEffect(() => {
    const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setTodos(items);
    }, (err) => console.error('onSnapshot error:', err));

    return () => unsub();
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    try {
      await addDoc(collection(db, 'todos'), {
        title: text.trim(),
        done: false,
        createdAt: serverTimestamp(),
      });
      setText('');
    } catch (e) {
      Alert.alert('Error', 'No se pudo crear la tarea');
      console.error(e);
    }
  };

  const toggleDone = async (id, current) => {
    try {
      await updateDoc(doc(db, 'todos', id), { done: !current });
    } catch (e) {
      Alert.alert('Error', 'No se pudo actualizar la tarea');
      console.error(e);
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (e) {
      Alert.alert('Error', 'No se pudo eliminar la tarea');
      console.error(e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Pressable onPress={() => toggleDone(item.id, item.done)}>
        <Text style={[styles.title, item.done && styles.done]}>• {item.title}</Text>
      </Pressable>
      <Pressable onPress={() => removeTodo(item.id)}>
        <Text style={styles.delete}>Eliminar</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Mis Tareas (Firestore)</Text>

      <View style={styles.row}>
        <TextInput
          placeholder="Nueva tarea..."
          value={text}
          onChangeText={setText}
          style={styles.input}
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <Button title="Agregar" onPress={addTodo} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        contentContainerStyle={{ paddingVertical: 12 }}
        ListEmptyComponent={<Text>No hay tareas aún ✨</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  title: { fontSize: 16 },
  done: { textDecorationLine: 'line-through', color: 'gray' },
  delete: { color: 'tomato' },
});
```

---

## 7) Probar la app

1. Ejecuta `npm start` y abre el emulador o tu dispositivo con **Expo Go**.
2. Agrega varias tareas. Verás que aparecen al instante.
3. Toca una tarea para marcarla como hecha / no hecha.
4. Toca **Eliminar** para borrarla.
5. Abre **Firestore → Datos** y verifica que la colección `todos` se actualiza en tiempo real.

---

## 8) (Opcional) Estructura de carpetas sugerida

```
firestore-todos/
├─ src/
│  ├─ firebase.js
│  └─ features/
│     └─ todos/
│        ├─ components/
│        ├─ hooks/
│        └─ services/
├─ App.js
├─ package.json
└─ app.json / app.config.js
```

Separar *servicios*, *componentes* y *hooks* te prepara para escalar la app.

---

## 9) Desafíos para estudiantes

* **D1. Edición inline:** permitir editar el título con un `TextInput` por ítem y `updateDoc`.
* **D2. Filtros y orden:** mostrar solo pendientes / hechas; ordenar por `createdAt` asc/desc.
* **D3. Contador:** mostrar cuántas tareas pendientes hay.
* **D4. Subcolecciones:** crear `lists/{listId}/todos` y soportar múltiples listas.
* **D5. Autenticación:** integrar **Firebase Auth** (email/contraseña) y filtrar `todos` por `uid`.
* **D6. Validación de reglas:** cambiar reglas a `request.auth != null` y probar accesos no autorizados.

---

## 10) Errores comunes y soluciones

* **`FirebaseError: Missing or insufficient permissions`** → Revisa las **Reglas** de Firestore o la fecha de caducidad.
* **No aparece `createdAt`** inmediatamente → `serverTimestamp()` se materializa en el servidor; puede llegar `null` en el primer render.
* **Múltiples inicializaciones** → Asegúrate de llamar a `initializeApp` **una sola vez** (centraliza en `firebase.js`).
* **IDs de documento** → Usa `doc(db, 'todos', id)` exactamente con la ruta correcta.
* **SDKs diferentes** → En Expo puro usa el **SDK web** (`firebase`); si usas *bare workflow* puedes optar por `@react-native-firebase`.

---

## 11) Cierre y próximos pasos

* Migrar a reglas seguras con Auth.
* Añadir paginación con `startAfter` / `limit`.
* Implementar sincronización por usuario (`where('uid','==', user.uid)`).
* Extra: aplicar un diseño con una librería UI (Paper, NativeWind/Tailwind, etc.).

---

## 12) Entregables sugeridos

* Código fuente en un repositorio.
* Capturas de pantalla: creación, listado, actualización y eliminación.
* Video corto (30–60s) mostrando la app en funcionamiento.
* Documento de 1 página explicando la estructura y decisiones técnicas.

---

### Lista de verificación (checklist)

* [ ] Proyecto Expo corre en dispositivo/emulador.
* [ ] Firestore inicializado con `firebaseConfig` correcto.
* [ ] Reglas temporales configuradas.
* [ ] CRUD funcional (crear, leer en tiempo real, actualizar, eliminar).
* [ ] Código organizado y comentado.
* [ ] Desafíos (al menos 1) completados.
