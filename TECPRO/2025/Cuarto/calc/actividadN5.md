## Proyecto: “Nuestra fiesta en equipo”
**Objetivo:** Crear un libro de Google Sheets colaborativo para planificar una fiesta o salida grupal real, donde cada integrante gestiona una pieza clave de información. Las 5 tablas cubren todos los aspectos necesarios y la hoja de inicio (Dashboard) muestra el estado general del evento de un vistazo.

---

## Roles y tablas asignadas (una por integrante)

| Integrante | Tabla a cargo | ¿Qué controla? |
|------------|---------------|----------------|
| 1 | **Presupuesto de Gastos** | Todos los costos previstos y reales del evento. |
| 2 | **Ingresos y Aportes** | Dinero que entra: cuotas, donaciones, venta de entradas. |
| 3 | **Lista de Invitados** | Asistentes, confirmaciones y necesidades especiales. |
| 4 | **Proveedores y Cotizaciones** | Comparación de opciones para contratar servicios/productos. |
| 5 | **Cronograma de Tareas** | Reparto de responsabilidades y fechas límite. |

**Dashboard (hoja de inicio):** la construyen **entre todas** al final, usando referencias a celdas clave de cada tabla. La coordinadora general (puede ser rotativo) guía la unión, pero todas participan decidiendo qué métricas mostrar y cómo se ve.

---

## Estructura del libro
- 5 hojas de datos (cada una con el nombre de su tabla y dueña).
- 1 hoja **Dashboard**.
- 1 hoja oculta **Listas** (opcional, si quieren unificar las opciones de validación; la puede crear la dueña de cualquier tabla y compartir el rango).

---

## Detalle de cada tabla, con validaciones y significado

### 1. Tabla “Gastos” (Responsable: Integrante 1)
**Columnas:**  
A: Concepto (ej. Decoración, DJ, Comida)  
B: Categoría (lista desplegable: Comida, Bebida, Música, Decoración, Transporte, Otros)  
C: Presupuestado ($)  
D: Gasto Real ($)  
E: Diferencia (fórmula)

**Validaciones:**  
- Columna B: validación de datos tipo lista de elementos, con las categorías fijas.  
- Columnas C y D: validación de número mayor o igual a 0 (para evitar errores).

**Fórmulas simples que debe incluir:**  
- `=C2-D2` en E2, arrastrada hacia abajo.  
- Totales al final: `=SUMA(C2:C50)`, `=SUMA(D2:D50)`.  
- Gasto por categoría (tabla aparte abajo): `=SUMAR.SI(B2:B50; "Comida"; D2:D50)` y similar para cada categoría.

**Formato condicional:**  
- En columna E: fondo verde si >0 (ahorro), rojo si <0 (excedido).

**Gráfico individual (opcional en su propia hoja):**  
Gráfico de barras con Concepto y Gasto Real para visualizar los rubros más costosos.

---

### 2. Tabla “Ingresos” (Responsable: Integrante 2)
**Columnas:**  
A: Fuente (ej. Cuota por persona, Venta de rifa, Donación)  
B: Tipo (lista: Cuota, Venta, Donación, Otro)  
C: Monto esperado ($)  
D: Monto recibido ($)  
E: ¿Cobrado? (lista: Sí, No)  
F: Diferencia (fórmula `=D2-C2`)

**Validaciones:**  
- Columna B y E con listas desplegables.  
- Columnas C y D solo números positivos.

**Fórmulas:**  
- Total esperado, total recibido, total pendiente (suma de donde E = “No”).  
- `=SUMAR.SI(E2:E50; "Sí"; D2:D50)` para lo ya cobrado.

**Significado real:**  
Permite saber si se está recaudando lo necesario para cubrir los gastos (se compara con la tabla de Gastos en el Dashboard).

---

### 3. Tabla “Invitados” (Responsable: Integrante 3)
**Columnas:**  
A: Nombre completo  
B: ¿Confirmó? (lista: Sí, No, Pendiente)  
C: Acompañantes (número)  
D: Menú especial (lista: Ninguno, Vegetariano, Vegano, Sin gluten, Otro)  
E: Observaciones

**Validaciones:**  
- Columna B y D con listas desplegables.  
- Columna C: número entero mayor o igual a 0.

**Fórmulas:**  
- Total invitados registrados: `=CONTARA(A2:A100)`  
- Confirmados: `=CONTAR.SI(B2:B100; "Sí")`  
- Pendientes: `=CONTAR.SI(B2:B100; "Pendiente")`  
- Porcentaje de asistencia: `=CONTAR.SI(B2:B100; "Sí")/CONTARA(A2:A100)` (formato %)

**Formato condicional:**  
En columna B: texto “Sí” → fondo verde, “No” → rojo, “Pendiente” → amarillo.

**Gráfico individual:**  
Gráfico circular con la distribución de estados de confirmación.

---

### 4. Tabla “Proveedores” (Responsable: Integrante 4)
**Columnas:**  
A: Servicio (ej. DJ, Pastelería, Fotógrafo)  
B: Nombre del proveedor  
C: Teléfono/Contacto  
D: Precio cotizado ($)  
E: ¿Incluye IVA? (lista: Sí, No)  
F: Puntaje (lista: 1 a 5 estrellas, o números 1-5)  
G: Seleccionado (casilla de verificación)

**Validaciones:**  
- Columna E: lista desplegable “Sí, No”.  
- Columna F: validación de número entero entre 1 y 5.  
- Columna G: insertar → Casilla de verificación.

**Fórmulas:**  
- Total de presupuesto de proveedores seleccionados: `=SUMAR.SI(G2:G50; VERDADERO; D2:D50)`  
- Mejor puntuación (opcional): `=MAX(F2:F50)`

**Formato condicional:**  
- Resaltar toda la fila en verde claro si la casilla G está marcada (fórmula `=$G2=VERDADERO` aplicada al rango A2:G).

**Significado:**  
Comparan precios y eligen proveedores; el gasto de los seleccionados se enlaza automáticamente con la hoja de Gastos (la dueña de Gastos puede tomar ese total como referencia).

---

### 5. Tabla “Cronograma de Tareas” (Responsable: Integrante 5)
**Columnas:**  
A: Tarea (ej. Reservar salón, Comprar decoración, Armar playlist)  
B: Responsable (nombre de la integrante)  
C: Fecha límite (formato fecha)  
D: Estado (lista: Pendiente, En proceso, Completado)  
E: Días restantes (fórmula `=C2-HOY()`)

**Validaciones:**  
- Columna B: lista desplegable con los nombres de las 5 integrantes.  
- Columna D: lista con los tres estados.

**Formato condicional:**  
- Aplicar a toda la tabla: si D = “Completado”, toda la fila se pinta de verde (fórmula `=$D2="Completado"`).  
- Si D = “En proceso”, fondo amarillo suave.  
- Si los días restantes son negativos y la tarea no está “Completado”, resaltar la fila en rojo (regla con `=Y(E2<0; D2<>"Completado")`).

**Fórmulas:**  
- Total de tareas: `=CONTARA(A2:A50)`  
- Tareas completadas: `=CONTAR.SI(D2:D50; "Completado")`  
- % de avance: `=CONTAR.SI(D2:D50; "Completado")/CONTARA(A2:A50)`

---

## Dashboard: construcción colaborativa
Una vez que cada tabla está lista, las 5 integrantes se reúnen (guiadas por la coordinadora) para crear la hoja **Dashboard**. Todas opinan sobre qué información clave quieren ver y cómo presentarla.

**Elementos fáciles de incluir (con referencias a las hojas):**

- **Indicadores numéricos:**
  - Presupuesto total de gastos: `=Gastos!C51` (asumiendo que el total está en C51)
  - Gasto real hasta ahora: `=Gastos!D51`
  - Ingresos recibidos: `=Ingresos!D20` (total recibido)
  - Invitados confirmados: `=Invitados!F1` (donde pusieron la fórmula)
  - Tareas completadas: `=Cronograma!F1` (% de avance)

- **Comparativa visual simple:**  
  Colocar en celdas contiguas “Total ingresos recibidos” y “Total gastos realizados” y restarlos para ver el saldo. Aplicar formato condicional a la celda del saldo: verde si es positivo, rojo si es negativo.

- **Gráficos en el Dashboard:**  
  Pueden copiar y pegar los gráficos más útiles de cada hoja (click derecho sobre el gráfico → Copiar gráfico, luego pegar en Dashboard). Como están vinculados, se actualizan solos. Ejemplos:
  - Gráfico circular de estados de invitados (de la tabla Invitados).
  - Gráfico de barras de gastos por categoría (de Gastos).
  - Gráfico de columnas con ingresos por fuente (de Ingresos).

- **Diseño visual:**  
  La integrante con habilidades de diseño unifica colores, organiza los elementos y se asegura de que sea legible. El Dashboard es la cara del proyecto.

**Importante:** Nadie escribe datos manualmente en el Dashboard; todo se alimenta con referencias. Si alguna métrica no estaba calculada en la tabla original, se agrega la fórmula en esa tabla y se referencia desde el Dashboard.

---

## Protección y trabajo en equipo
Para que la colaboración sea ordenada, cada integrante protege su hoja al terminar:
1. Clic derecho en la pestaña de su hoja → Proteger hoja.
2. En permisos, selecciona “Restringir quién puede editar este rango” → “Solo tú”.
3. Así, las demás pueden ver los datos pero no modificarlos accidentalmente.
4. La hoja Dashboard puede quedar editable por todas o solo por la coordinadora (según acuerden). Si se protege, se puede dar acceso de edición a una persona de confianza.

**Nota para la profesora:** Esto demuestra que entienden la importancia de la seguridad de los datos y la división de responsabilidades.

---

## Aplicación en la vida real
Este mismo archivo lo pueden usar para:
- Organizar su propia fiesta de cumpleaños o reunión.
- Planificar un emprendimiento escolar (venta de comida, rifa).
- Gestionar un evento solidario (colecta, kermesse).

Cada tabla tiene un propósito claro y significativo: manejar dinero, coordinar personas, elegir proveedores y cumplir plazos. Son habilidades transferibles a cualquier proyecto personal o profesional futuro.

---

## Presentación del proyecto
1. **Introducción:** Cada integrante explica qué tabla manejó y por qué era importante para el evento.
2. **Demostración en vivo:**  
   - Muestran cómo al marcar una casilla en Proveedores, la fila se pinta de verde.  
   - Modifican un gasto y se ve el impacto en el Dashboard (saldo cambia de color).  
   - Agregan un invitado y el gráfico circular se actualiza automáticamente.  
3. **Dashboard:** Explican que lo construyeron juntas y que cualquier persona del equipo puede entender el estado del evento en segundos.
4. **Conclusión:** “Aprendimos a dividir un problema grande en partes manejables, usar Google Sheets como herramienta de equipo y crear algo que realmente podemos usar. Ahora sabemos organizar cualquier evento con orden y control.”

---

Este formato da a cada estudiante propiedad sobre una parte vital del proyecto, todas las tablas son significativas, y el Dashboard conjunto refuerza la idea de que el todo es más que la suma de las partes. ¡Un proyecto colaborativo, realista y perfecto para el nivel básico!