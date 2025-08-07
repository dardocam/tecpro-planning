# 🟦 **Clase 2: Primeros Pasos con Expo y Estructura del Proyecto**

**Objetivo de clase:** Comprender el ciclo básico de desarrollo con Expo y analizar la estructura de un proyecto React Native para adquirir una visión clara de cómo funciona la plataforma desde el primer momento.

## 📘 PARTE TEÓRICA 

### 🎯 1. Recordatorio de la clase anterior

> **Objetivo:** Activar conocimientos previos y verificar que el entorno esté listo.

#### ✅ Puntos clave repasados

* ¿Qué es React Native?
* ¿Qué es Expo CLI y Expo Go?
* Herramientas instaladas:

  * Node.js
  * Expo CLI
  * VSCode
  * Expo Go
* Primer proyecto "Hola Mundo"

---

### 📦 2. ¿Qué es un Proyecto en React Native con Expo? 

#### ✅ Contenido

##### 🗂 Estructura de Archivos (proyecto recién creado)

| Archivo/Carpeta     | Descripción                                                          |
| ------------------- | -------------------------------------------------------------------- |
| **`App.js`**        | Punto de entrada de la aplicación                                    |
| **`package.json`**  | Define el nombre, scripts y dependencias del proyecto                |
| **`assets/`**       | Carpeta para imágenes, fuentes y otros recursos estáticos            |
| **`node_modules/`** | Dependencias instaladas (no se edita manualmente)                    |
| **`.gitignore`**    | Indica qué archivos no se deben subir a Git                          |
| **`app.json`**      | Configuración del proyecto Expo (nombre, ícono, splash screen, etc.) |

---

##### 🔄 Ciclo de vida básico del desarrollo con Expo

```plaintext
1. Escribes código en App.js
↓
2. Expo CLI actualiza en tiempo real
↓
3. Expo Go muestra los cambios en el celular o emulador
↓
4. Validás, depurás, volvés a codificar
```

---

##### ⚙️ ¿Cómo funciona App.js?

* Contiene un **componente raíz**
* Retorna **JSX** que describe la interfaz visual
* Importa los estilos desde un objeto JS con `StyleSheet`

#### 📌 Ejemplo básico:

```jsx
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>¡Hola desde React Native!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

---

### 📖 3. ¿Qué hace Expo por detrás?

#### ✅ Contenido

* Compila automáticamente el código JS en una app funcional.
* Permite cargar imágenes, acceder a sensores, notificaciones, GPS, cámara, etc.
* Permite compartir tu app como enlace QR o como app compilada.

#### 💡 Beneficios en etapa inicial

* No requiere conocimientos nativos.
* Entorno estable para empezar rápido.
* Compatible con múltiples librerías del ecosistema React.

---

### ❓ 4. Preguntas frecuentes y errores comunes

| Problema                      | Posible solución                         |
| ----------------------------- | ---------------------------------------- |
| El QR no carga                | Verificar conexión Wi-Fi en PC y celular |
| `expo start` no inicia        | Reinstalar expo-cli / revisar permisos   |
| La app no recarga             | Asegurarse de guardar los archivos       |
| El celular no detecta cambios | Refrescar manualmente en Expo Go         |

---

## 🧪 PARTE PRÁCTICA

> 💡 *Objetivo: familiarizarse con el flujo de trabajo básico y explorar la estructura del proyecto mediante ejercicios guiados.*

---

### 🛠 2. Modificar el contenido del componente raíz

#### Actividad 1: Cambiar el texto del componente `Text`

```jsx
<Text>¡Mi primera app móvil personalizada!</Text>
```

#### Actividad 2: Agregar un segundo bloque `Text` con otro mensaje

```jsx
<Text>Curso de Desarrollo Móvil</Text>
```

#### Actividad 3: Cambiar el color de fondo del `View` desde `StyleSheet`

```jsx
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fef9c3',
}
```

---

### 🛠 3. Práctica de estructura de carpetas y assets

#### Actividad: Agregar una imagen desde la carpeta `assets`

1. Copiar una imagen a `assets/`
2. Usar el componente `Image`:

```jsx
import { Image } from 'react-native';

<Image source={require('./assets/logo.png')} style={{ width: 100, height: 100 }} />
```

3. Organizar archivos creando nuevas carpetas:

   * `/components/`
   * `/screens/`
   * `/styles/`

---

### 🛠 4. Validación del flujo completo

* Verificar cambios en tiempo real en el dispositivo con Expo Go.
* Guardar todos los cambios y hacer commit inicial con Git (opcional):

```bash
git init
git add .
git commit -m "Proyecto base listo"
```

---

## 📚 Actividad final

> **Objetivo:** Reforzar la comprensión del flujo de trabajo.

#### Consigna:

Crear un nuevo proyecto llamado `mi-primer-app` con los siguientes requisitos:

* Cambiar el texto por una presentación personal.
* Agregar una imagen personal o ícono decorativo.
* Cambiar los colores de fondo.
* Subir el código a GitHub.

---

## 🧰 Recursos complementarios

* 📘 [Expo CLI docs](https://docs.expo.dev/)
* 📘 [React Native docs](https://reactnative.dev/)
* 🎥 Video recomendado: “What is Expo?” (Expo YouTube channel)
* 🧠 Cheat Sheet JSX + Flexbox (se puede entregar impreso)

---

