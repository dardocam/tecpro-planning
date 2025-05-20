
### **Filmina 1: ¿Qué es Git?**
- **Definición**: Sistema de control de versiones que permite guardar cambios en proyectos de software.
- **Beneficios**:
  - Guarda historial de cambios.
  - Facilita el trabajo en equipo.
  - Permite revertir errores.

---

### **Filmina 2: Instalación de Git**
1. **Descargar Git**: [git-scm.com](https://git-scm.com/)
2. **Verificar instalación**:
   ```bash
   git --version
   ```
   Ejemplo de salida: `git version 2.34.1`.

---

### **Filmina 3: Configurar Git por primera vez**
- Establece tu nombre y correo:
  ```bash
  git config --global user.name "Tu Nombre"
  git config --global user.email "tu@email.com"
  ```

---

### **Filmina 4: Crear un repositorio**
1. **Inicializar un repositorio**:
   ```bash
   mkdir mi-proyecto
   cd mi-proyecto
   git init
   ```
   - Se crea una carpeta oculta `.git`.

---

### **Filmina 5: Trabajar con cambios**
1. **Crear un archivo**: `touch README.md`
2. **Ver estado del repositorio**:
   ```bash
   git status
   ```
3. **Agregar cambios al área de staging**:
   ```bash
   git add README.md
   ```
   - O usar `git add .` para agregar todos los archivos.

---

### **Filmina 6: Hacer un commit**
- **Commit**: Guardar cambios en el historial.
  ```bash
  git commit -m "Primer commit: agregar README"
  ```
  - **¡Importante!**: Siempre incluir un mensaje claro.

---

### **Filmina 7: Ver el historial de commits**
```bash
git log
```
- Muestra detalles como autor, fecha y mensaje de cada commit.

---

### **Filmina 8: Crear una rama (branch)**
- **Rama**: Línea de desarrollo independiente.
  ```bash
  git branch nueva-funcionalidad
  git checkout nueva-funcionalidad
  ```
  - O en un solo comando: `git checkout -b nueva-funcionalidad`.

---

### **Filmina 9: Fusionar ramas (merge)**
1. **Volver a la rama principal**:
   ```bash
   git checkout main
   ```
2. **Fusionar cambios**:
   ```bash
   git merge nueva-funcionalidad
   ```

---

### **Filmina 10: Trabajar con repositorios remotos (Ej: GitHub)**
1. **Conectar repositorio local a uno remoto**:
   ```bash
   git remote add origin https://github.com/tu-usuario/mi-proyecto.git
   ```
2. **Subir cambios**:
   ```bash
   git push -u origin main
   ```

---

### **Filmina 11: Clonar un repositorio existente**
```bash
git clone https://github.com/tu-usuario/mi-proyecto.git
```

---

### **Filmina 12: Comandos útiles**
- `git diff`: Ver diferencias entre cambios.
- `git reset --hard HEAD`: Descartar cambios no guardados.
- `git pull`: Traer cambios del repositorio remoto.

---

### **Filmina 13: Flujo de trabajo típico**
1. `git pull` (actualizar)
2. Trabajar en cambios.
3. `git add .`
4. `git commit -m "mensaje"`
5. `git push`

---

### **Filmina 14: Consejos para principiantes**
- Haz commits pequeños y frecuentes.
- Usa mensajes de commit descriptivos.
- Practica con repositorios de prueba.

---

### **Filmina 15: Recursos adicionales**
- **Documentación oficial**: [git-scm.com/doc](https://git-scm.com/doc)
- **Plataformas**: GitHub, GitLab, Bitbucket.
- **Práctica**: ¡Crea un proyecto personal y experimenta!
