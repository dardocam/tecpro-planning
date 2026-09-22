# Hook `useCallback` en React

`useCallback` es un **Hook de React** que permite **memorizar una función**.

Esto significa que React puede conservar la misma referencia de una función entre distintos renderizados del componente, evitando crear una función nueva cada vez que el componente vuelve a renderizarse.

---

## 1. ¿Por qué existe `useCallback`?

En React, cada vez que un componente se vuelve a renderizar, el código del componente se ejecuta nuevamente.

Por ejemplo:

```jsx
const App = () => {

  const saludar = () => {
    console.log('Hola');
  };

  return (
    <Button title="Saludar" onPress={saludar} />
  );
};
```

Cada vez que `App` se renderiza, JavaScript vuelve a crear la función:

```jsx
saludar
```

Aunque el código de la función sea exactamente el mismo, se crea una **nueva referencia**.

Esto normalmente no representa ningún problema.

Sin embargo, puede ser importante cuando esa función se pasa como propiedad (`prop`) a otros componentes, especialmente componentes optimizados para evitar renderizados innecesarios.

---

# 2. ¿Qué hace `useCallback`?

La sintaxis básica es:

```jsx
const miFuncion = useCallback(() => {
  // código
}, []);
```

El primer parámetro es la función que queremos memorizar.

El segundo parámetro es el **array de dependencias**.

Por ejemplo:

```jsx
const saludar = useCallback(() => {
  console.log('Hola');
}, []);
```

React conserva la referencia de `saludar` mientras las dependencias no cambien.

---

# 3. La diferencia fundamental

Sin `useCallback`:

```jsx
const saludar = () => {
  console.log('Hola');
};
```

Con `useCallback`:

```jsx
const saludar = useCallback(() => {
  console.log('Hola');
}, []);
```

En ambos casos podemos ejecutar:

```jsx
saludar();
```

y el resultado será el mismo.

La diferencia está en **la referencia de la función**.

`useCallback` no hace que la función sea más rápida ni modifica lo que hace.

Su objetivo principal es controlar **cuándo se crea una nueva referencia de esa función**.

---

# 4. ¿Qué significa el `[]`?

En:

```jsx
const saludar = useCallback(() => {
  console.log('Hola');
}, []);
```

tenemos:

```jsx
[]
```

que es el array de dependencias.

Un array vacío significa que la función no depende de valores que deban hacer que React cree una nueva referencia.

Conceptualmente:

```text
Primer renderizado
      ↓
React crea la función
      ↓
Se guarda su referencia

Segundo renderizado
      ↓
React conserva la misma referencia

Tercer renderizado
      ↓
React conserva la misma referencia
```

---

# 5. ¿Qué son las dependencias?

Supongamos que tenemos:

```jsx
const [nombre, setNombre] = useState('Dardo');

const saludar = useCallback(() => {
  console.log(`Hola ${nombre}`);
}, [nombre]);
```

Ahora la función utiliza:

```jsx
nombre
```

Por lo tanto `nombre` aparece en las dependencias:

```jsx
[nombre]
```

Si `nombre` no cambia, React conserva la función.

Si `nombre` cambia, React crea una nueva versión de la función para que utilice el nuevo valor.

Conceptualmente:

```text
nombre = "Dardo"
      ↓
función utiliza "Dardo"

nombre cambia
      ↓
nombre = "Juan"
      ↓
React crea una nueva referencia de la función
```

---

# 6. ¿Por qué necesitamos las dependencias?

Porque la función utiliza valores que existen fuera de ella.

Por ejemplo:

```jsx
const [contador, setContador] = useState(0);

const mostrarContador = useCallback(() => {
  console.log(contador);
}, [contador]);
```

La función utiliza:

```jsx
contador
```

Por eso debe estar en:

```jsx
[contador]
```

De esta manera, cuando `contador` cambia, la función también se actualiza.

---

# 7. Relación entre `useCallback` y `useState`

Es muy común utilizar ambos Hooks juntos.

Por ejemplo:

```jsx
const [contador, setContador] = useState(0);

const incrementar = useCallback(() => {
  setContador(contador + 1);
}, [contador]);
```

Tenemos dos conceptos diferentes.

`useState`:

```jsx
useState(0)
```

permite almacenar información que puede cambiar.

`useCallback`:

```jsx
useCallback(...)
```

permite conservar la referencia de una función mientras sus dependencias permanezcan iguales.

---

# 8. `useCallback` no ejecuta la función

Este punto es muy importante.

Cuando escribimos:

```jsx
const saludar = useCallback(() => {
  console.log('Hola');
}, []);
```

**la función no se ejecuta**.

Solamente estamos creando o reutilizando la función.

Para ejecutarla necesitamos:

```jsx
saludar();
```

Por ejemplo:

```jsx
const saludar = useCallback(() => {
  console.log('Hola');
}, []);

saludar();
```

---

# 9. Relación con el ejemplo de `RefreshControl`

En el ejemplo anterior aparecía:

```jsx
const onRefresh = useCallback(() => {
  setRefreshing(true);

  setTimeout(() => {
    setRefreshing(false);
  }, 2000);
}, []);
```

Aquí `onRefresh` se utiliza como una función que se pasa al componente:

```jsx
<RefreshControl
  refreshing={refreshing}
  onRefresh={onRefresh}
/>
```

React puede conservar la misma referencia de `onRefresh` mientras las dependencias no cambien.

En este caso:

```jsx
[]
```

indica que `onRefresh` no utiliza ningún valor externo que requiera actualizar la referencia de la función.

---

# 10. `useCallback` no es obligatorio

Un error frecuente es pensar que todas las funciones deben utilizar `useCallback`.

No es así.

Este código puede funcionar perfectamente:

```jsx
const onRefresh = () => {
  setRefreshing(true);
};
```

No necesitamos automáticamente:

```jsx
const onRefresh = useCallback(() => {
  setRefreshing(true);
}, []);
```

`useCallback` se utiliza cuando existe una razón para conservar la referencia de una función.

Por ejemplo, puede ser útil cuando:

* una función se pasa a un componente hijo;
* ese componente está optimizado para evitar renderizados;
* una función forma parte de dependencias de otros Hooks;
* se quiere evitar recreaciones innecesarias en determinados casos.

---

# 11. `useCallback` y `useMemo`

Ambos Hooks están relacionados con la memorización, pero trabajan sobre cosas diferentes.

### `useCallback`

Memoriza una **función**:

```jsx
const funcion = useCallback(() => {
  // ...
}, []);
```

### `useMemo`

Memoriza un **resultado**:

```jsx
const resultado = useMemo(() => {
  return calcularAlgo();
}, []);
```

Podemos verlo así:

```text
useCallback
     ↓
conserva una función


useMemo
     ↓
conserva un valor calculado
```

---

# 12. Una forma sencilla de entenderlo

Podemos imaginar que React tiene que volver a ejecutar nuestro componente:

```text
Renderizado
     ↓
se ejecuta el componente
     ↓
se crean las funciones
```

Con `useCallback` podemos decir:

> “Mientras estas dependencias no cambien, conservá esta misma función.”

Por ejemplo:

```jsx
const guardar = useCallback(() => {
  console.log('Guardando...');
}, []);
```

React puede reutilizar la misma referencia de `guardar` en los siguientes renderizados.

---

# 13. Idea fundamental

`useCallback` **no sirve para ejecutar una función ni para actualizar el estado**.

Su propósito es:

```text
memorizar una función
        ↓
conservar su referencia
        ↓
hasta que cambien sus dependencias
```

Por eso, cuando vemos:

```jsx
useCallback(() => {
  ...
}, [dependencias]);
```

debemos leerlo conceptualmente como:

> “React, conservá esta función mientras estos valores no cambien.”

---

## Ejemplo completo

```jsx
import React, { useState, useCallback } from 'react';
import { Button, Text, View } from 'react-native';

const App = () => {
  const [contador, setContador] = useState(0);

  const incrementar = useCallback(() => {
    setContador(contador + 1);
  }, [contador]);

  return (
    <View>
      <Text>Contador: {contador}</Text>

      <Button
        title="Incrementar"
        onPress={incrementar}
      />
    </View>
  );
};

export default App;
```

En este ejemplo:

```jsx
useState
```

mantiene el valor del contador.

```jsx
useCallback
```

mantiene la referencia de `incrementar`.

```jsx
[contador]
```

indica que la función debe actualizarse cuando cambie el contador.

La idea central es entonces:

```text
useState
→ administra datos que cambian

useCallback
→ memoriza funciones

dependencias
→ indican cuándo debe cambiar la función
```
