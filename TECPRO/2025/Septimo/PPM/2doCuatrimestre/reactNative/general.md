
## 🟦 Tema 1: Presentación e Instalación del Entorno

### Contenido Teórico

#### 🎯 Objetivos del Curso

* Comprender la lógica de desarrollo móvil multiplataforma.
* Desarrollar apps móviles funcionales con React Native y Expo.
* Aplicar buenas prácticas en diseño, estado y componentes.

#### 📱 Desarrollo Móvil: Tipos

* **Nativas:** Swift (iOS), Kotlin (Android).
* **Híbridas:** Ionic, Cordova.
* **Multiplataforma:** React Native, Flutter.

#### ⚛️ Ventajas de React Native

* Código compartido entre Android e iOS.
* Basado en React: fácil transición si se conoce React web.
* Gran comunidad, soporte, plugins.

#### 🧰 Herramientas Básicas

* **Node.js** (entorno de ejecución)
* **Expo CLI** (herramienta para iniciar apps sin configuraciones nativas)
* **VSCode** (editor de código con plugins útiles)
* **Dispositivo físico o emulador** para pruebas

### Contenido Práctico

1. **Instalación paso a paso:**

   * Node.js y npm
   * Expo CLI: `npm install -g expo-cli`
   * VSCode con extensiones recomendadas:

     * ESLint
     * React Native Tools

2. **Verificación del entorno:**

   * `node -v`, `npm -v`, `expo --version`

3. **Creación de cuenta en Expo.dev**

4. **Verificación de dispositivo/emulador**

   * Instalación de Expo Go en smartphone

---

## 🟦 Tema 2: Primeros Pasos con Expo

### Contenido Teórico

#### 📁 Estructura del Proyecto

* `App.js`: punto de entrada
* `assets/`: imágenes, fuentes
* `package.json`: dependencias y scripts
* `.gitignore`, `node_modules/`

#### 🚀 ¿Qué hace Expo?

* Permite compilar sin Android Studio / Xcode.
* Usa Metro Bundler para recarga instantánea.
* Sirve como "puente" entre JS y el hardware del dispositivo.

### Contenido Práctico

1. **Crear la primera app:**

   ```bash
   npx create-expo-app hola-mundo --template blank
   cd hola-mundo
   npx expo start
   ```

2. **Explorar App.js:**

   * Modificar el texto del componente `Text`
   * Agregar otro componente `View`

3. **Probar en el celular con Expo Go**

4. **Introducción al uso de `console.log`**

---

## 🟦 Tema 3: Fundamentos de React

### Contenido Teórico

#### 🔤 JSX

* Sintaxis parecida a HTML pero en JS.
* Permite embebido de JS con `{}`.
* Reglas:

  * Un solo elemento padre.
  * `className` se usa como `style`.

#### 🧩 Componentes Funcionales

* Funciones que retornan JSX.
* Separación de lógica/estética.

#### 📦 Props

* Parámetros que se pasan a un componente.
* **Inmutables.**

### Contenido Práctico

1. **Crear un componente personalizado:**

   ```jsx
   const Saludo = (props) => {
     return <Text>Hola {props.nombre}!</Text>;
   };
   ```

2. **Usarlo en `App.js`:**

   ```jsx
   <Saludo nombre="Ana" />
   ```

3. **Explorar console.log(props)**

---

## 🟦 Tema 4: Estado con useState

### Contenido Teórico

#### ⚙️ ¿Qué es el estado?

* Información dinámica que cambia durante la ejecución.
* `useState` devuelve:

  * estado
  * función para modificarlo

### Contenido Práctico

1. **Ejemplo: Contador**

   ```jsx
   const [contador, setContador] = useState(0);
   <Button title="Sumar" onPress={() => setContador(contador + 1)} />
   <Text>{contador}</Text>
   ```

2. **Ejercicio:**

   * Mostrar/ocultar texto con toggle.
   * Cambiar colores con botones.

---

## 🟦 Tema 5: Ciclo de Vida con useEffect

### Contenido Teórico

#### 🔁 ¿Qué es useEffect?

* Hook para manejar efectos secundarios.
* Se ejecuta:

  * al montar el componente
  * cuando cambia una dependencia
  * al desmontar

#### 📚 Casos de uso:

* Llamadas a APIs
* Temporizadores
* Suscripciones

### Contenido Práctico

1. **Ejemplo: mostrar mensaje al cargar**

   ```jsx
   useEffect(() => {
     console.log("App cargada");
   }, []);
   ```

2. **Temporizador:**

   ```jsx
   useEffect(() => {
     const timer = setInterval(() => setContador(c => c + 1), 1000);
     return () => clearInterval(timer);
   }, []);
   ```

3. **Ejercicio:**

   * Simular carga de datos (setTimeout)
   * Mostrar "Cargando..." → luego contenido

---

## 🟦 Tema 6: Estilos en React Native

### Contenido Teórico

#### 🎨 ¿Cómo se estiliza?

* Estilo en objeto JS
* `StyleSheet.create()` es recomendado

#### 🧭 Flexbox:

* Direcciones: `row` / `column`
* Alineación: `justifyContent`, `alignItems`

### Contenido Práctico

1. **Ejemplo básico:**

   ```jsx
   const styles = StyleSheet.create({
     caja: {
       backgroundColor: "skyblue",
       padding: 10,
       margin: 10,
     },
   });
   ```

2. **Ejercicio:**

   * Crear tarjetas con imagen, texto y color
   * Usar `flexDirection`, `justifyContent`

3. **Uso de imágenes y fuentes**

   * Imágenes locales
   * Cargar fuentes personalizadas

---

## 🟦 Tema 7: Componentes Básicos y Layouts

### Contenido Teórico

#### 🧱 Componentes nativos:

* `Text`, `View`, `Image`, `ScrollView`

#### 🧩 Composición

* Jerarquía y anidamiento de componentes
* Contenedores + elementos hijos

### Contenido Práctico

1. **Crear un layout de perfil:**

   * Imagen arriba
   * Nombre y descripción
   * Botones abajo

2. **Ejercicio:**

   * Hacer que el contenido sea scrollable
   * Probar en distintas resoluciones

3. **Responsive con Flexbox:**

   * Cambio de orientación
   * Distribución en columnas o filas

---

## 🟦 Tema 8: Repaso Integrador

### Contenido Teórico

#### ✔️ Revisión general:

* JSX y props
* Estado y efectos
* Estilos y composición

### Contenido Práctico

1. **Desafío Final de Unidad 1:**

   * Crear una mini app con:

     * Header con imagen
     * Sección de datos con botones que cambien el estado
     * Pie con diseño usando Flexbox

2. **Actividad guiada:**

   * El docente plantea un diseño
   * Los estudiantes lo replican en vivo

3. **Cierre:**

   * Compartir por Expo.dev
   * Feedback del profesor

---

