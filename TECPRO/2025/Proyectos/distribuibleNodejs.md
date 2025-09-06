Para generar un archivo .exe distribuible de una aplicación en Node.js, tienes varias opciones. Las más comunes y efectivas incluyen el uso de herramientas como **pkg** y la funcionalidad experimental de **Aplicaciones Ejecutables Únicas (Single Executable Applications, SEA)** de Node.js. Aquí te explico cómo utilizar estas herramientas:

### 📦 1. **Usando `pkg` (Recomendado para la mayoría de casos)**
`pkg` es un paquete de línea de comandos que permite empaquetar tu aplicación de Node.js, junto con sus dependencias y el runtime de Node.js, en un único ejecutable. Esto permite que la aplicación se ejecute en sistemas incluso sin Node.js instalado .

#### Pasos para usar `pkg`:
1.  **Instalación global de `pkg`**:
    ```bash
    npm install -g pkg
    ```

2.  **Preparar el proyecto**:
    Asegúrate de que tu `package.json` tenga un campo `"bin"` o `"main"` que apunte al archivo de entrada principal de tu aplicación (ej. `index.js` o `app.js`). Por ejemplo:
    ```json
    {
      "name": "mi-app",
      "version": "1.0.0",
      "main": "app.js",
      "bin": "app.js"
    }
    ```

3.  **Generar el ejecutable**:
    Ejecuta `pkg` desde el directorio de tu proyecto. Puedes especificar plataformas y arquitecturas objetivo.
    -   Para generar ejecutables para Windows, Linux y macOS por defecto:
        ```bash
        pkg .
        ```
    -   Para generar un ejecutable específico para Windows (x64) con un nombre personalizado:
        ```bash
        pkg -t node18-win-x64 -o mi-app.exe .
        ```
        📝 *Nota: `-t` especifica el objetivo (target), y `-o` el nombre de salida. Asegúrate de usar una versión de Node.js compatible con tu código.*

4.  **Encontrar los ejecutables**:
    `pkg` generará los archivos ejecutables en el mismo directorio. Para Windows, obtendrás un archivo `.exe` que puedes distribuir.

#### Consideraciones con `pkg`:
-   **Archivos y recursos estáticos**: Si tu aplicación lee archivos estáticos (como plantillas, imágenes o otros recursos) en tiempo de ejecución usando rutas relativas, `pkg` podría no empaquetarlos automáticamente. En estos casos, debes especificarlos manualmente en el `package.json` bajo la propiedad `pkg.assets` .
-   **Variables de entorno y argumentos dinámicos**: Funcionan normalmente.
-   **Protección del código fuente**: El código se ofusca parcialmente, pero no es completamente seguro. Para una protección robusta, considera herramientas adicionales de ofuscación.

### ⚙️ 2. **Usando la funcionalidad experimental de Node.js: Single Executable Applications (SEA)**
A partir de la versión 19.7.0 de Node.js (y versiones posteriores), existe una funcionalidad experimental para crear aplicaciones ejecutables únicas. Este método implica inyectar el código de tu aplicación en el binario de Node.js .

#### Pasos básicos para SEA (ejemplo en Windows):
1.  **Crear un archivo de configuración SEA** (ej. `sea-config.json`):
    ```json
    {
      "main": "app.js",
      "output": "sea-prep.blob"
    }
    ```

2.  **Generar el "blob" preparatorio**:
    ```bash
    node --experimental-sea-config sea-config.json
    ```

3.  **Copiar el ejecutable de Node.js**:
    ```bash
    node -e "require('fs').copyFileSync(process.execPath, 'mi-app.exe')"
    ```

4.  **Remover la firma del ejecutable (opcional, pero recomendado en Windows)**:
    Puedes usar `signtool remove /s mi-app.exe` si tienes el Windows SDK instalado.

5.  **Inyectar el blob en el ejecutable** usando una herramienta como `postject`:
    ```bash
    npx postject mi-app.exe NODE_SEA_BLOB sea-prep.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2
    ```

6.  **Re-firmar el ejecutable** (recomendado para evitar advertencias de seguridad):
    Puedes usar herramientas como `signtool` (Windows) o `codesign` (macOS).

#### Consideraciones con SEA:
-   **Experimental**: Esta funcionalidad aún está en desarrollo activo y puede cambiar en futuras versiones de Node.js .
-   **Solo CommonJS**: Por el momento, SEA solo soporta aplicaciones que utilizan el sistema de módulos CommonJS .
-   **Complejidad**: El proceso es más manual y técnico comparedo con `pkg`.
-   **Recursos estáticos**: Node.js 20.3 y superiores permiten incluir assets en el blob usando el campo `assets` en `sea-config.json` y acceder a ellos mediante APIs como `sea.getAsset()` .

### 💡 3. **Otras alternativas (Mencionadas brevemente)**
-   **nexe**: Otra herramienta similar a `pkg` para crear ejecutables de Node.js. Sin embargo, `pkg` suele ser más popular y activa .
-   **node-webkit (nw.js)**: Originalmente diseñado para aplicaciones con interfaz gráfica, pero también puede empaquetar aplicaciones de consola. Podría ser excesivo si no necesitas una GUI .
-   **Electron**: Ideal para aplicaciones de escritorio con interfaz gráfica, pero genera ejecutables de mayor tamaño debido a que incluye Chromium. No es la mejor opción para aplicaciones simples de consola .

### 📊 Comparación rápida: pkg vs. SEA de Node.js
| Característica | `pkg` | SEA de Node.js |
| :--- | :--- | :--- |
| Facilidad de uso | ✅ Alto (comando simple) | ⚠️ Media/Baja (proceso manual) |
| Soporte a módulos ES | ✅ Sí (depende de la versión de Node target) | ❌ Solo CommonJS (por ahora) |
| Tamaño del ejecutable | ⚖️ Moderado (incluye runtime) | ⚖️ Moderado (basado en binario Node) |
| Recursos estáticos | ✅ Soporte con configuración | ✅ Soporte con configuración (v20.3+) |
| Estabilidad | ✅ Estable y popular | ⚠️ Experimental |
| Ofuscación de código | ✅ Básica | ✅ Básica (integrado en el binario) |

### 🛠️ Recomendación general
-   Para la **mayoría de usuarios y casos de uso**, **`pkg` es la opción más recomendada** debido a su facilidad de uso, soporte para múltiples plataformas y versatilidad.
-   Si te sientes cómodo con herramientas experimentales y necesitas una solución más estrechamente integrada con el runtime de Node.js, puedes probar la funcionalidad **SEA**. Monitorea su desarrollo ya que podría mejorar en el futuro.
-   Siempre **verifica el ejecutable generado** en un entorno limpio (sin Node.js instalado) para asegurarte de que todos los recursos y dependencias se han empaquetado correctamente.

### ❗ Consideraciones adicionales
-   **Dependencias nativas**: Si tu proyecto depende de módulos nativos de Node.js (que necesitan compilación), ambas herramientas (`pkg` y SEA) deben manejarlos. `pkg` a menudo requiere que incluyas los archivos binarios (.node) manualmente como assets y uses `process.pkg` para ajustar las rutas de carga.
-   **Variables de entorno y argumentos**: Ambas soluciones respetan los argumentos de línea de comandos (`process.argv`) y variables de entorno.
-   **Firmado digital**: Para distribuir tu aplicación en entornos production, especialmente en Windows, considera **firmar digitalmente tu ejecutable** para evitar advertencias de seguridad de SmartScreen. Esto aplica tanto para ejecutables generados con `pkg` como con SEA.

