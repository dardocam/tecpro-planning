## 📂 Script: `demo_bash.sh`

```bash
#!/bin/bash
# ===========================================
# Demo: Bash como lenguaje de programación
# ===========================================

# Variable
NOMBRE="Usuario"

# Función
saludar() {
    echo "👋 Hola, $1!"
}

# Condicional
echo "¿Cuál es tu edad?"
read EDAD

if [ "$EDAD" -ge 18 ]; then
    echo "✅ Eres mayor de edad"
else
    echo "❌ Eres menor de edad"
fi

# Bucle
echo "Contando del 1 al 5:"
for i in {1..5}; do
    echo "Número: $i"
    sleep 1
done

# Uso de la función
saludar "$NOMBRE"
```

---

## 🚀 Cómo ejecutarlo

1. Crear el archivo:

   ```bash
   nano demo_bash.sh
   ```
2. Pegar el código y guardar.
3. Dar permisos de ejecución:

   ```bash
   chmod +x demo_bash.sh
   ```
4. Ejecutar:

   ```bash
   ./demo_bash.sh
   ```

---

## 📌 ¿Qué demuestra?

* **Variables** → `NOMBRE="Usuario"`
* **Entrada de usuario** → `read`
* **Condicionales** → `if ... else ... fi`
* **Bucles** → `for i in {1..5}`
* **Funciones** → `saludar()`

👉 Esto prueba que **Bash es un lenguaje de programación completo** (aunque orientado a administración de sistemas).

---

¡Perfecto! 🚀
Ahora te armo un **mini menú interactivo en Bash** que demuestra un uso más profesional:

---

## 📂 Script: `menu_bash.sh`

```bash
#!/bin/bash
# ===========================================
# Mini Menú Interactivo en Bash
# ===========================================

# Funciones
mostrar_fecha() {
    echo "📅 Hoy es: $(date)"
}

mostrar_usuarios() {
    echo "👥 Usuarios conectados:"
    who
}

mostrar_uso_disco() {
    echo "💾 Uso de disco:"
    df -h /
}

salir() {
    echo "👋 Saliendo del programa..."
    exit 0
}

# Bucle principal con menú
while true; do
    clear
    echo "==============================="
    echo "      MENÚ DE ADMIN BASH"
    echo "==============================="
    echo "1) Mostrar fecha y hora"
    echo "2) Listar usuarios conectados"
    echo "3) Mostrar uso de disco"
    echo "4) Salir"
    echo "-------------------------------"
    read -p "👉 Elige una opción [1-4]: " opcion

    case $opcion in
        1) mostrar_fecha ;;
        2) mostrar_usuarios ;;
        3) mostrar_uso_disco ;;
        4) salir ;;
        *) echo "⚠️  Opción inválida";;
    esac

    echo
    read -p "Presiona ENTER para continuar..."
done
```

---

## 🚀 Cómo usarlo

1. Guardar el archivo como `menu_bash.sh`.
2. Dar permisos:

   ```bash
   chmod +x menu_bash.sh
   ```
3. Ejecutar:

   ```bash
   ./menu_bash.sh
   ```

---

## 📌 ¿Qué demuestra?

* **Funciones reutilizables** → `mostrar_fecha()`, `mostrar_usuarios()`…
* **Bucle infinito controlado** → `while true; do ... done`
* **Menú interactivo** con `read`.
* **Condicional tipo switch** → `case ... esac`.

👉 Este tipo de script ya parece una **mini aplicación de consola** 🎛️.

---

