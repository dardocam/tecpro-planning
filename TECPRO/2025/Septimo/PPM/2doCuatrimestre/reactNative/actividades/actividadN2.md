# Clase Teórica — React: JSX, Componentes, Props y State

**Curso:** Proyecto de Desarrollo para Plataformas Móviles
**Clase:** — Fundamentos de React
**Duración:** 80 minutos
**Tema:** JSX, componentes funcionales, Props y State

---

## 1. Objetivos

Al finalizar la clase, el estudiante podrá:

* Explicar qué es JSX.
* Reconocer un componente funcional.
* Crear componentes reutilizables.
* Pasar información mediante `props`.
* Utilizar `children`.
* Comprender qué es el `state`.
* Utilizar `useState()` para almacenar información que puede cambiar.
* Diferenciar `props` de `state`.
* Comprender cómo un cambio de `state` provoca una nueva representación de la interfaz.

---

# 2. Activación de conocimientos previos

Comenzamos recordando:

```jsx
export default function App() {
  return (
    <View>
      <Text>Hola React Native</Text>
    </View>
  );
}
```

Preguntas para los estudiantes:

* ¿Qué es `View`?
* ¿Qué es `Text`?
* ¿Qué lenguaje estamos utilizando?
* ¿Qué parte del código representa la interfaz?
* ¿Cómo podemos reutilizar una parte de esta interfaz?

Esto nos lleva al concepto de **componente**.

---

# 3. JSX

## ¿Qué es JSX?

JSX es una extensión de sintaxis de JavaScript que permite escribir estructuras similares a HTML dentro de JavaScript.

Por ejemplo:

```jsx
const nombre = "Lucía";

return (
  <View>
    <Text>Hola, {nombre}</Text>
  </View>
);
```

La expresión:

```jsx
{nombre}
```

permite insertar un valor de JavaScript dentro del JSX.

### Importante

JSX **no es HTML**.

Es una sintaxis que posteriormente es transformada para que React pueda crear los elementos de la interfaz.

---

# 4. Componentes funcionales

Un componente funcional es una función que devuelve JSX.

```jsx
const Saludo = () => {
  return (
    <Text>Hola!</Text>
  );
};
```

Podemos utilizarlo:

```jsx
<Saludo />
```

La ventaja es que podemos reutilizarlo.

```jsx
<Saludo />
<Saludo />
<Saludo />
```

Pero probablemente queramos que cada saludo sea diferente.

Ahí aparecen las **props**.

---

# 5. Props

Las props permiten enviar información desde un componente padre hacia un componente hijo.

Por ejemplo:

```jsx
const Saludo = ({ nombre }) => {
  return (
    <Text>
      Hola, {nombre}!
    </Text>
  );
};
```

Podemos utilizarlo:

```jsx
<Saludo nombre="Lucía" />
<Saludo nombre="Mateo" />
```

El mismo componente recibe diferentes valores.

Visualmente podemos pensar:

```text
                 props
                   ↓
             ┌───────────┐
             │   App     │
             └─────┬─────┘
                   │
          nombre="Lucía"
                   │
                   ↓
             ┌───────────┐
             │  Saludo   │
             └───────────┘
```

---

# 6. Una característica importante de las Props

Las props son información que el componente **recibe**.

El componente hijo no debería modificar directamente esas props.

Por ejemplo:

```jsx
const Saludo = ({ nombre }) => {
  // nombre se utiliza
  // pero no se modifica directamente
};
```

Entonces aparece una pregunta:

> ¿Qué hacemos cuando necesitamos que un dato pueda cambiar durante la ejecución de la aplicación?

La respuesta es:

# State

---

# 7. ¿Qué es State?

El **state** es información que pertenece al componente y que puede cambiar durante la ejecución de la aplicación.

Ejemplos:

* Un contador.
* Un botón activado/desactivado.
* Un formulario.
* Un menú abierto/cerrado.
* Un usuario conectado/desconectado.
* Una cantidad de productos.
* Un texto escrito por el usuario.

Podemos pensar:

```text
PROPS
↓
Información que recibo

STATE
↓
Información que puedo controlar y cambiar
```

---

# 8. `useState`

En React utilizamos el Hook `useState` para crear state.

Primero importamos:

```jsx
import { useState } from "react";
```

Luego:

```jsx
const [contador, setContador] = useState(0);
```

Esta línea contiene dos elementos:

```text
contador
    ↓
valor actual

setContador
    ↓
función para modificarlo
```

Y:

```jsx
useState(0)
```

indica que el valor inicial es `0`.

---

# 9. Ejemplo: contador

```jsx
import { useState } from "react";
import { View, Text, Button } from "react-native";

const Contador = () => {

  const [contador, setContador] = useState(0);

  return (
    <View>
      <Text>Contador: {contador}</Text>

      <Button
        title="Sumar"
        onPress={() => setContador(contador + 1)}
      />
    </View>
  );
};
```

Al presionar el botón:

```jsx
setContador(contador + 1)
```

el valor cambia.

Por ejemplo:

```text
0
↓
1
↓
2
↓
3
↓
4
```

---

# 10. ¿Qué ocurre cuando cambia el State?

Esta es una de las ideas más importantes de la clase.

Cuando hacemos:

```jsx
setContador(contador + 1);
```

React actualiza el state y vuelve a renderizar el componente para representar el nuevo estado de la interfaz.

Podemos simplificar el proceso así:

```text
Usuario
   │
   │ presiona botón
   ↓
setContador(...)
   │
   ↓
cambia el State
   │
   ↓
React vuelve a renderizar
   │
   ↓
se actualiza la interfaz
```

Por eso no necesitamos modificar manualmente el contenido del `Text`.

No hacemos:

```text
buscar elemento
modificar texto
actualizar pantalla
```

Decimos cuál es el estado:

```jsx
<Text>{contador}</Text>
```

y React se encarga de mantener la interfaz sincronizada.

---

# 11. State y JSX

El state puede utilizarse directamente dentro del JSX.

```jsx
const [nombre, setNombre] = useState("Lucía");

return (
  <Text>
    Hola, {nombre}
  </Text>
);
```

Si posteriormente hacemos:

```jsx
setNombre("Mateo");
```

la interfaz pasa a mostrar:

```text
Hola, Mateo
```

---

# 12. State booleano

No todo state tiene que ser un número.

Podemos utilizar `boolean`.

```jsx
const [activo, setActivo] = useState(false);
```

Podemos utilizarlo para representar un estado:

```jsx
<Text>
  {activo ? "Usuario activo" : "Usuario inactivo"}
</Text>
```

Y modificarlo:

```jsx
setActivo(true);
```

o:

```jsx
setActivo(false);
```

También podemos alternarlo:

```jsx
setActivo(!activo);
```

---

# 13. Ejemplo: botón Activar / Desactivar

```jsx
const Usuario = () => {

  const [activo, setActivo] = useState(false);

  return (
    <View>

      <Text>
        Estado: {activo ? "Activo" : "Inactivo"}
      </Text>

      <Button
        title={activo ? "Desactivar" : "Activar"}
        onPress={() => setActivo(!activo)}
      />

    </View>
  );
};
```

Aquí tenemos:

```text
State
 ↓
activo
```

y ese state controla dos elementos de la interfaz:

```text
Estado: Activo

        +

Botón: Desactivar
```

---

# 14. Props vs State

Esta diferencia debe quedar muy clara.

| Props                             | State                          |
| --------------------------------- | ------------------------------ |
| Vienen desde otro componente      | Pertenece al componente        |
| Se reciben                        | Se administra                  |
| Son de solo lectura para el hijo  | Puede cambiar                  |
| Permiten parametrizar componentes | Permite representar cambios    |
| Se pasan al componente            | Se modifica mediante su setter |

Podemos resumirlo:

```text
PROPS
"Me dicen cómo debo mostrarme"

STATE
"Me permite recordar y cambiar información"
```

---

# 15. Ejemplo combinando Props y State

Ahora podemos combinar ambos conceptos.

```jsx
const Usuario = ({ nombre }) => {

  const [activo, setActivo] = useState(false);

  return (
    <View>

      <Text>
        Usuario: {nombre}
      </Text>

      <Text>
        Estado: {activo ? "Activo" : "Inactivo"}
      </Text>

      <Button
        title="Cambiar estado"
        onPress={() => setActivo(!activo)}
      />

    </View>
  );
};
```

Uso:

```jsx
<Usuario nombre="Lucía" />
<Usuario nombre="Mateo" />
```

Aquí:

```text
nombre
   ↓
PROP
```

mientras:

```text
activo
   ↓
STATE
```

Tenemos entonces:

```text
              Usuario
                 │
        ┌────────┴────────┐
        │                 │
      props             state
        │                 │
     nombre             activo
        │                 │
        ↓                 ↓
  "Lucía" / "Mateo"    true / false
```

---

# 16. Un concepto fundamental: cada componente tiene su propio State

Si tenemos:

```jsx
<Usuario nombre="Lucía" />
<Usuario nombre="Mateo" />
```

y el componente contiene:

```jsx
const [activo, setActivo] = useState(false);
```

cada instancia del componente tiene su propio state.

Por ejemplo:

```text
Usuario Lucía
activo = true

Usuario Mateo
activo = false
```

Cambiar el estado de Lucía no cambia automáticamente el estado de Mateo.

Esto es fundamental para construir interfaces reutilizables.

---

# 17. `children`

`children` es una prop especial que permite colocar contenido dentro de un componente.

Por ejemplo:

```jsx
const Caja = ({ children }) => {

  return (
    <View>
      {children}
    </View>
  );

};
```

Uso:

```jsx
<Caja>
  <Text>Contenido de la caja</Text>
</Caja>
```

Podemos combinar:

```text
Props
+
Children
+
State
```

para construir componentes más flexibles.

---

# 18. Ejemplo integrador

Podemos construir una tarjeta de usuario:

```jsx
const PerfilUsuario = ({ nombre, descripcion }) => {

  const [activo, setActivo] = useState(false);

  return (
    <View>

      <Text>{nombre}</Text>

      <Text>{descripcion}</Text>

      <Text>
        {activo ? "Activo" : "Inactivo"}
      </Text>

      <Button
        title="Cambiar estado"
        onPress={() => setActivo(!activo)}
      />

    </View>
  );
};
```

Y utilizarla:

```jsx
<PerfilUsuario
  nombre="Lucía"
  descripcion="Estudiante de programación"
/>
```

Aquí aparecen todos los conceptos estudiados:

```text
JSX
 │
 ├── Componentes
 │
 ├── Props
 │
 ├── Children
 │
 └── State
```

---

# 19. El modelo mental de React

Una forma sencilla de entender React es:

```text
             DATOS
               │
       ┌───────┴───────┐
       │               │
     Props           State
       │               │
       └───────┬───────┘
               ↓
          COMPONENTE
               ↓
             JSX
               ↓
          INTERFAZ
```

Cuando cambia el state:

```text
State
  ↓
cambia
  ↓
React renderiza nuevamente
  ↓
JSX representa el nuevo estado
  ↓
UI actualizada
```

---

# 20. Error común: modificar directamente el State

No debemos hacer:

```jsx
contador = contador + 1;
```

Debemos utilizar la función proporcionada por `useState`:

```jsx
setContador(contador + 1);
```

La función `setContador` es la forma correcta de solicitar el cambio del state.

---

# 21. Error común: confundir Props con State

No debemos pensar:

```text
Props = datos que cambian
State = datos que no cambian
```

La diferencia no está simplemente en si el dato cambia.

La pregunta correcta es:

> ¿Quién controla ese dato?

Si viene desde el componente padre:

```text
PROP
```

Si pertenece al componente y este necesita modificarlo:

```text
STATE
```

---

# 22. Ejemplo final para analizar en clase

Observar:

```jsx
const Contador = ({ titulo }) => {

  const [cantidad, setCantidad] = useState(0);

  return (
    <View>

      <Text>{titulo}</Text>

      <Text>
        Cantidad: {cantidad}
      </Text>

      <Button
        title="Agregar"
        onPress={() => setCantidad(cantidad + 1)}
      />

    </View>
  );
};
```

Preguntar a los estudiantes:

### ¿Cuál es el componente?

```text
Contador
```

### ¿Cuál es la prop?

```text
titulo
```

### ¿Cuál es el state?

```text
cantidad
```

### ¿Cuál es la función que modifica el state?

```text
setCantidad
```

### ¿Cuál es el valor inicial?

```text
0
```

### ¿Qué ocurre al presionar el botón?

```text
cantidad aumenta
        ↓
State cambia
        ↓
React vuelve a renderizar
        ↓
se muestra el nuevo valor
```

---

# 23. Actividad rápida durante la explicación

Modificar el ejemplo anterior para que el botón permita:

```text
Agregar
Restar
```

El state debe comenzar en:

```text
0
```

Y producir:

```text
0 → 1 → 2 → 3
```

o:

```text
3 → 2 → 1 → 0
```

Intentar además evitar valores negativos.

---

# 24. Preguntas de cierre

1. ¿Qué es JSX?
2. ¿Qué es un componente funcional?
3. ¿Qué son las props?
4. ¿Qué es el state?
5. ¿Para qué sirve `useState()`?
6. ¿Qué diferencia existe entre `contador` y `setContador`?
7. ¿Qué ocurre cuando cambia un state?
8. ¿Puede un componente tener varios estados?
9. ¿Cada instancia de un componente tiene su propio state?
10. ¿Cuándo utilizarías una prop y cuándo utilizarías state?

---

# 25. Conceptos que deben quedar incorporados

Al finalizar la clase, el estudiante debería poder interpretar:

```jsx
const [contador, setContador] = useState(0);
```

como:

> "Creo un estado llamado `contador`, cuyo valor inicial es `0`, y obtengo una función llamada `setContador` para solicitar cambios en ese estado."

Y debería poder diferenciar:

```jsx
<Usuario nombre="Lucía" />
```

como:

> "Estoy enviando una prop llamada `nombre`."

Mientras que:

```jsx
const [activo, setActivo] = useState(false);
```

significa:

> "El componente mantiene internamente un estado llamado `activo` que puede cambiar."

---

## Idea final de la clase

La progresión conceptual que debemos conservar es:

```text
JSX
 ↓
permite describir la interfaz

COMPONENTES
 ↓
permiten dividir y reutilizar la interfaz

PROPS
 ↓
permiten pasar datos al componente

STATE
 ↓
permite que el componente mantenga y modifique datos

RENDERIZADO
 ↓
React actualiza la interfaz cuando cambia el State
```

**En una frase:**

> **Props permiten configurar un componente; State permite que un componente recuerde y cambie información durante la ejecución.**
