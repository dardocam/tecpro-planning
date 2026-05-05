
# 🌍 "Buscador Inteligente de Países"

## Objetivo

Construir una aplicación que consuma una API real y permita buscar información de cualquier país.

---

## API a utilizar

REST Countries

Endpoint:

```plaintext
https://restcountries.com/v3.1/all
```

---

# Requisitos mínimos

La app debe:

### 1

Tener un input de búsqueda

---

### 2

Permitir buscar por nombre

---

### 3

Mostrar:

* Bandera
* Nombre
* Capital
* Región
* Población

---

### 4

Actualizar sin recargar página

---

### 5

Mostrar mensaje si no encuentra resultados

---

# Estructura base

## HTML

```html id="r6u7wo"
<input type="text" id="buscar" placeholder="Buscar país">
<button id="btnBuscar">Buscar</button>

<div id="resultado"></div>
```

---

# Desafío 

## Nivel 1 
Mostrar datos correctamente

---

## Nivel 2

Agregar loading

---

## Nivel 3

Manejo de errores

---

## Nivel 4

Permitir buscar presionando Enter

---

## Nivel 5

Mostrar múltiples coincidencias

---

# Nivel Experto 

Agregar:

## 🌐 Filtro por continente

Ejemplo:

* América
* Europa
* Asia
* África

---

## 📊 Ordenar por población

Mayor a menor

---

## ❤️ Favoritos usando LocalStorage

Guardar países favoritos

---

# Restricciones

❌ No usar frameworks
❌ No usar librerías externas
✔ Solo HTML + CSS + JavaScript puro

---

# Lo que deberán investigar solos

Para resolverlo deberán descubrir:

* Cómo filtrar arrays
* Cómo usar `includes()`
* Cómo ordenar con `sort()`
* Cómo guardar en LocalStorage


**“Consumir APIs significa conectar nuestras aplicaciones con el mundo real.”**

A partir de acá pueden crear:

* Apps del clima
* Cotizadores
* Sistemas de geolocalización
* Dashboards IoT
* Integraciones con backend propio

Es uno de los saltos más importantes en desarrollo web moderno.
