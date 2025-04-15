**Filmina 1: Portada**  
**Título**: Git y GitHub: Control de Versiones Colaborativo  
**Subtítulo**: Gestión eficiente de código y trabajo en equipo  
**Autor**: Dardo Camaño  

---

**Filmina 2: ¿Qué es el control de versiones?**  
- **Definición**: Sistema para registrar cambios en archivos a lo largo del tiempo.  
- **Propósito**:  
  - Recuperar versiones específicas.  
  - Comparar cambios.  
  - Trabajar en equipo sin conflictos.  
- **Tipos**:  
  - **Centralizado** (ej: SVN): Un único repositorio central.  
  - **Distribuido** (ej: Git): Cada usuario tiene una copia completa del repositorio.  

---

**Filmina 3: Introducción a Git**  
- **Creado en 2005** por Linus Torvalds (creador de Linux).  
- **Características clave**:  
  - **Descentralizado**: Trabajo offline y sincronización posterior.  
  - **Rendimiento rápido**: Optimizado para grandes proyectos.  
  - **Integridad de datos**: Usa SHA-1 para identificar cambios.  
  - **Ramificaciones (branches)**: Aislamiento de funcionalidades.  

---

**Filmina 4: Conceptos básicos de Git**  
- **Repositorio (repo)**: Carpeta del proyecto gestionada por Git.  
- **Commit**: "Instantánea" de cambios con un mensaje descriptivo.  
- **Branch**: Línea independiente de desarrollo (ej: `main`, `feature/login`).  
- **Merge**: Unir ramas.  
- **Pull/Push**: Sincronizar cambios con repositorios remotos.  
- **Clone**: Descargar un repositorio completo.  

---

**Filmina 5: Flujo de trabajo en Git**  
1. **Modificar archivos** en tu directorio local.  
2. **`git add`**: Preparar cambios para commit (área de *staging*).  
3. **`git commit`**: Guardar cambios en el historial local.  
4. **`git push`**: Enviar commits al repositorio remoto (ej: GitHub).  
5. **`git pull`**: Obtener actualizaciones del repositorio remoto.  

*Diagrama opcional: Local vs. Remote workflow*  

---

**Filmina 6: ¿Qué es GitHub?**  
- **Plataforma en la nube** para alojar repositorios Git (SaaS).  
- **Funcionalidades clave**:  
  - Colaboración mediante *pull requests* y *code reviews*.  
  - Seguimiento de issues (tickets de errores o mejoras).  
  - GitHub Actions (CI/CD).  
  - Documentación con GitHub Pages y Wikis.  
- **Alternativas**: GitLab, Bitbucket.  

---

**Filmina 7: Diferencias entre Git y GitHub**  
| **Git** | **GitHub** |  
|---------|------------|  
| Herramienta local de control de versiones. | Plataforma web para alojar repositorios Git. |  
| Open-source y gratuito. | Gratuito para proyectos públicos, pago para privados. |  
| Se ejecuta en tu máquina. | Servicio en la nube con herramientas adicionales. |  

---

**Filmina 8: Caso de uso colaborativo en GitHub**  
1. **Clonar repositorio**: `git clone [URL]`.  
2. **Crear rama**: `git checkout -b mi-rama`.  
3. **Hacer commits locales**.  
4. **Publicar rama**: `git push origin mi-rama`.  
5. **Abrir Pull Request (PR)** en GitHub para fusionar cambios.  
6. **Revisión y merge** por el equipo.  

---

**Filmina 9: Buenas prácticas**  
- **Commits atómicos**: Un commit por funcionalidad/cambio.  
- **Mensajes claros**: Ej: "feat: agregar autenticación con OAuth".  
- **Ramificar estrategias**: Git Flow, GitHub Flow.  
- **Sincronizar frecuentemente**: `git pull` antes de trabajar.  
- **Ignorar archivos innecesarios**: Usar `.gitignore`.  

---

**Filmina 10: Beneficios de Git + GitHub**  
- **Trazabilidad**: Historial completo de quién, cuándo y por qué.  
- **Recuperación**: Revertir a versiones estables fácilmente.  
- **Colaboración global**: Trabajo asíncrono y en paralelo.  
- **Integración con herramientas**: IDEs (VSCode), CI/CD, Jira.  

---

**Filmina 11: Demo rápida (opcional)**  
- Crear un repositorio en GitHub.  
- Clonar, hacer cambios y subir commits.  
- Resolver un conflicto de merge.  
- Usar GitHub para revisar un PR.  

---

**Filmina 12: Cierre y recursos**  
- **Para aprender más**:  
  - Documentación oficial: [git-scm.com](https://git-scm.com/), [docs.github.com](https://docs.github.com/).  
  - Práctica con ejercicios: [GitHub Learning Lab](https://lab.github.com/).  
- **¡Preguntas?**  

--- 

