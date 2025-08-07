
# 🟦 **Clase 1: Presentación e Instalación del Entorno**


## 📘 PARTE TEÓRICA 

### 🎯 1. Desarrollo Móvil 

### 📱 2. Introducción al Desarrollo Móvil 

#### ✅ Contenido

* ¿Qué es una app móvil?
* Clasificación de apps:

  * **Nativas**: Swift (iOS), Kotlin (Android).
  * **Híbridas**: Ionic, Cordova.
  * **Multiplataforma**: Flutter, React Native.
* Ventajas de usar React Native:

  * Código compartido para iOS y Android.
  * Gran comunidad y soporte.
  * Fácil integración con librerías JS.
  * Aprende una vez, escribe en todas partes.

#### 🧠 Comparativa

| Tipo de App  | Lenguaje       | Acceso nativo | Desempeño | Código compartido |
| ------------ | -------------- | ------------- | --------- | ----------------- |
| Nativa       | Swift, Kotlin  | ✅            | ✅        | ❌                |
| Híbrida      | HTML/CSS/JS    | ⚠️ limitado   | ⚠️        | ✅                |
| React Native | JavaScript/JSX | ✅            | ✅        | ✅                |

---

### 🧰 3. Herramientas del Entorno 

#### ✅ Contenido

* **Node.js**: entorno de ejecución de JS fuera del navegador.
* **npm**: gestor de paquetes para instalar herramientas JS.
* **Expo CLI**: facilita desarrollo móvil sin necesidad de Android Studio o Xcode.
* **Visual Studio Code (VSCode)**: editor con soporte para JS y React Native.
* **Expo Go**: app para emular proyectos en dispositivos reales.

#### 🧠 Tips Profesionales

* Usar LTS de Node.js para evitar incompatibilidades.
* Mantener el entorno actualizado.
* Trabajar con control de versiones: Git + GitHub.

---

### 🌐 4. Flujo de trabajo con Expo

#### ✅ Contenido

* ¿Cómo funciona Expo?

  * Permite crear, compilar y probar sin Android Studio.
  * Live Reload (hot reloading).
* ¿Qué hace `npx create-expo-app`?

  * Instala dependencias y estructura base.
* ¿Qué es Expo Go?

  * App para escanear el QR y correr apps directamente en el celular.

#### 📌 Diagrama de flujo básico

```plaintext
VSCode (escribes código)
   ↓
Expo CLI (sirve la app en un server local)
   ↓
Expo Go (dispositivo real escanea el QR y ejecuta el código)
```

---

## 🧪 PARTE PRÁCTICA

> 💡 *Objetivo: Instalar el entorno de desarrollo y dejar la estructura de proyecto funcionando.*

### 🛠 1. Instalación del Entorno

#### 📝 Pasos guiados

1. **Instalar Node.js:**

   * Descargar desde [https://nodejs.org/](https://nodejs.org/)
   * Verificar con:

     ```bash
     node -v
     npm -v
     ```

2. **Instalar Expo CLI:**

   ```bash
   npm install -g expo-cli
   ```

3. **Crear cuenta en Expo:**

   * [https://expo.dev/signup](https://expo.dev/signup)

4. **Instalar Expo Go en celular:**

   * Desde Play Store o App Store

5. **Instalar VSCode:**

   * [https://code.visualstudio.com](https://code.visualstudio.com)
   * Extensiones sugeridas:

     * React Native Tools
     * ESLint
     * Prettier

---

### 🧪 2. Crear primer proyecto con Expo

#### 🎯 Objetivo

Crear una app "Hola Mundo" y visualizarla en un dispositivo real.

#### 📦 Instrucciones

1. Crear proyecto tipo Blank:

   ```bash
   npx create-expo-app hola-mundo -t
   cd hola-mundo
   ```

2. Iniciar el servidor local:

   ```bash
   npx expo start
   ```

3. Abrir `App.js` en VSCode:

   * Cambiar el texto:

     ```jsx
     export default function App() {
       return (
         <View style={styles.container}>
           <Text>¡Hola mundo desde React Native!</Text>
         </View>
       );
     }
     ```

4. Escanear el código QR con **Expo Go**

---

### 🧪 3. Validación del Entorno

#### ✅ Checklist para cada estudiante

| Elemento                        | Estado   |
| ------------------------------- | -------- |
| Node.js instalado               | ✅ / ❌  |
| Expo CLI funcionando            | ✅ / ❌  |
| VSCode instalado y configurado  | ✅ / ❌  |
| Proyecto “Hola Mundo” creado    | ✅ / ❌  |
| Proyecto visualizado en celular | ✅ / ❌  |

---

## 📝 Recursos complementarios

* [Documentación oficial de Expo](https://docs.expo.dev/)
* [React Native Getting Started](https://reactnative.dev/docs/environment-setup)
* [Descarga de Node.js](https://nodejs.org/)
* [Expo Go App](https://expo.dev/client)

---
