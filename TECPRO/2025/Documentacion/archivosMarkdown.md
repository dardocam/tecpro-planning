**Filmina 1: Portada**  
**Título**: Documentación con Archivos Markdown  
**Subtítulo**: Simplicidad y Eficiencia para Escritura Técnica  
**Autor**: Dardo Camaño
---

**Filmina 2: ¿Qué es Markdown?**  
- **Definición**: Lenguaje de marcado ligero para formatear texto plano.  
- **Propósito**:  
  - Escribir contenido estructurado de forma rápida y legible.  
  - Convertirse fácilmente a HTML, PDF u otros formatos.  
- **Ventajas**:  
  - **Portable**: Funciona en cualquier editor de texto.  
  - **Colaborativo**: Ideal para documentación en repositorios (ej: GitHub).  
  - **Minimalista**: Sin distracciones de software complejo.  

---

**Filmina 3: Sintaxis Básica de Markdown**  
- **Encabezados**:  
  ```markdown
  # Título 1  
  ## Título 2  
  ### Título 3  
  ```  
- **Texto**:  
  - *Cursiva*: `*texto*` o `_texto_`  
  - **Negrita**: `**texto**` o `__texto__`  
- **Listas**:  
  - No ordenadas: `- Elemento` o `* Elemento`  
  - Ordenadas: `1. Elemento`  
- **Enlaces**: `[Texto](URL)`  
- **Imágenes**: `![Alt](URL-imagen)`  
- **Código**:  
  - En línea: `` `código` ``  
  - Bloques:  
    ````markdown
    ```lenguaje  
    código  
    ```  
    ````  

---

**Filmina 4: Funcionalidades Avanzadas**  
- **Tablas**:  
  ```markdown
  | Cabecera 1 | Cabecera 2 |  
  |------------|------------|  
  | Dato 1     | Dato 2     |  
  ```  
- **Citas**: `> Texto citado`  
- **Líneas horizontales**: `---` o `***`  
- **Notas al pie**:  
  ```markdown
  Texto[^1]  
  [^1]: Explicación.  
  ```  
- **Checklists** (compatible en GitHub/GitLab):  
  ```markdown
  - [x] Tarea completada  
  - [ ] Pendiente  
  ```  

---

**Filmina 5: Herramientas y Plataformas que Usan Markdown**  
- **GitHub/GitLab**:  
  - README.md, Wikis, y comentarios en issues/PRs.  
- **Editores**:  
  - VS Code, Obsidian, Typora, Notion.  
- **Static Site Generators**:  
  - Jekyll, Hugo, MkDocs (generan sitios web desde Markdown).  
- **Chats**: Slack, Discord (soporte básico).  

---

**Filmina 6: Flujo de Trabajo para Documentación**  
1. **Crear archivo .md**: `README.md`, `docs/guia.md`, etc.  
2. **Escribir contenido**: Usar sintaxis Markdown.  
3. **Previsualizar**: Herramientas como VS Code o GitHub.  
4. **Versionar**: Agregar al repositorio Git con `git add` y `git commit`.  
5. **Publicar**: Subir a GitHub/GitLab o convertir a HTML/PDF.  

---

**Filmina 7: Buenas Prácticas**  
- **Encabezados consistentes**: Jerarquía clara (`#`, `##`, etc.).  
- **Mantener simplicidad**: Evitar HTML embebido a menos que sea necesario.  
- **Tabla de contenidos (TOC)**: Usar enlaces a encabezados (ej: `[Sección 1](#sección-1)`).  
- **Documentación modular**: Dividir en múltiples archivos (ej: `instalacion.md`, `api.md`).  
- **Validar sintaxis**: Usar linters como `markdownlint`.  

---

**Filmina 8: Markdown vs. Otras Herramientas**  
| **Markdown** | **HTML** | **Word/PDF** |  
|--------------|----------|--------------|  
| Fácil de leer/editaren texto plano. | Requiere conocimiento técnico. | Formato binario, difícil de versionar. |  
| Ideal para colaboración en Git. | Ideal para sitios web complejos. | Útil para informes estáticos. |  

---

**Filmina 9: Integración con GitHub**  
- **README.md**: Archivo principal de un repositorio (se muestra en la página del repo).  
- **GitHub Wikis**: Documentación basada en Markdown.  
- **GitHub Pages**: Publicar sitios web estáticos desde Markdown usando Jekyll.  
- **Renderizado automático**: GitHub muestra tablas, imágenes y código con sintaxis resaltada.  

---

**Filmina 10: Ejemplo de Documentación Efectiva**  
```markdown
# Proyecto X  

## Instalación  
```bash  
npm install proyecto-x  
```  

## Uso  
```javascript  
import ProyectoX from 'proyecto-x';  
ProyectoX.init();  
```  

## Contribuir  
1. Clona el repositorio.  
2. Sigue las [guías de estilo](CONTRIBUTING.md).  
```  

---

**Filmina 11: Demo Rápida (Opcional)**  
1. Crear un `README.md` en VS Code.  
2. Agregar encabezados, lista de features y código de ejemplo.  
3. Previsualizar con extensión Markdown.  
4. Subir a GitHub y ver el renderizado.  

---

**Filmina 12: Beneficios Clave**  
- **Portabilidad**: Abierto en cualquier editor.  
- **Colaboración**: Compatible con Git/GitHub.  
- **Eficiencia**: Enfoque en contenido, no en diseño.  
- **Estándar universal**: Adoptado por comunidades técnicas.  

---

**Filmina 13: Cierre y Recursos**  
- **Documentación oficial**:  
  - [Guía de Markdown](https://www.markdownguide.org/)  
  - [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/)  
- **Herramientas**:  
  - [StackEdit](https://stackedit.io/) (editor online).  
  - [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)  
- **¡Preguntas?**  

--- 