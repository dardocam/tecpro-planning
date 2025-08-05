## 🧠 **Clase 6: Estilizado en React Native: Uso de StyleSheet, conceptos de Flexbox. Manejo de imágenes, fuentes y assets**

### 🎯 **Objetivos de la clase**

* Comprender cómo aplicar estilos en React Native usando `StyleSheet`.
* Familiarizarse con los principios de diseño responsivo usando `Flexbox`.
* Aprender a integrar imágenes, fuentes personalizadas y otros recursos estáticos en la app.

---

## ⏰ **Parte Teórica (40 minutos)**

### 1. Introducción al sistema de estilos en React Native

* A diferencia del CSS tradicional del navegador, React Native utiliza su propio sistema de estilos basado en JavaScript.
* Se utiliza el objeto `StyleSheet.create()` para definir estilos reutilizables.

**Ejemplo básico:**

```js
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});
```

### 2. Principales propiedades de estilo 

* **Texto:** `fontSize`, `color`, `fontWeight`, `textAlign`, `lineHeight`
* **Espaciado:** `margin`, `padding`
* **Dimensiones:** `width`, `height`, `% vs números`
* **Colores:** Códigos hexadecimales, nombres predefinidos
* **Bordes:** `borderWidth`, `borderColor`, `borderRadius`

### 3. Diseño con Flexbox en React Native

* Flexbox es el sistema principal de layout en React Native.
* Conceptos clave:

  * **Flex Direction:** `row` o `column` (por defecto)
  * **Justify Content:** Alineación vertical u horizontal
  * **Align Items:** Alineación cruzada
  * **Flex:** proporción de crecimiento

**Ejemplo:**

```js
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
```

### 4. Manejo de imágenes, fuentes y otros assets 

#### a. Imágenes:

* Importación local vs remota:

```js
<Image source={require('./assets/logo.png')} />
<Image source={{ uri: 'https://example.com/image.png' }} />
```

#### b. Fuentes personalizadas:

* Colocar archivos `.ttf` en `/assets/fonts`
* Configurar en `app.json`:

```json
"expo": {
  "assetBundlePatterns": ["**/*"],
  "fonts": {
    "Poppins-Regular": "./assets/fonts/Poppins-Regular.ttf"
  }
}
```

* Usar con `useFonts` de `expo-font`.

#### c. Otros recursos:

* Íconos (`@expo/vector-icons`)
* Archivos multimedia

---

## 🛠️ **Parte Práctica (40 minutos)**

### Actividad 1: Crear un diseño de tarjeta de presentación 

**Objetivo:** Aplicar `StyleSheet` y `Flexbox` para crear una tarjeta personal.

```js
import { View, Text, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/avatar.png')} style={styles.avatar} />
      <Text style={styles.name}>Dardo Camaño</Text>
      <Text style={styles.role}>Desarrollador React Native</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
    borderRadius: 10,
    margin: 20
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10
  },
  role: {
    fontSize: 16,
    color: '#666'
  }
});
```

### Actividad 2: Maquetar un layout con Flexbox

**Objetivo:** Crear una fila de elementos distribuidos equitativamente.

```js
<View style={styles.row}>
  <View style={styles.box}></View>
  <View style={styles.box}></View>
  <View style={styles.box}></View>
</View>

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  box: {
    width: 60,
    height: 60,
    backgroundColor: 'skyblue'
  }
});
```

### Actividad 3: Cargar una fuente personalizada 

1. Copiar una fuente `.ttf` en `/assets/fonts`
2. Agregar configuración en `app.json`
3. Usar `useFonts`:

```js
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const [fontsLoaded] = useFonts({
  'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
});

if (!fontsLoaded) return <AppLoading />;
```

4. Aplicarla en un `Text`:

```js
<Text style={{ fontFamily: 'Poppins-Regular' }}>Texto con fuente</Text>
```

---