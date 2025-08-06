## 🎓 PLAN DE ESTUDIOS – CSS MODERNO PARA INTERFACES RESPONSIVAS

### ✅ Duración Sugerida: 6 a 8 semanas

Ideal para estudiantes de nivel intermedio en desarrollo web.


---

### 📘 MÓDULO 1 – Fundamentos de CSS y Preparación del Entorno

**Objetivos**: Comprender el rol del CSS en el diseño web y preparar el entorno.

* ¿Qué es CSS? Rol en HTML.
* Tipos de CSS (inline, interno, externo).
* Estructura básica de una hoja de estilo.
* Herramientas recomendadas: VSCode + Live Server.

**Práctica**:

* Aplicar estilos simples a una página HTML.

---

### 🎨 MÓDULO 2 – Variables CSS y Diseño Consistente

**Objetivos**: Aprender a usar `:root` y personalizar estilos de forma global.

* Uso de `:root` para declarar variables CSS.
* Variables de color, fuentes, sombra, radio, transición.
* Ventajas de las variables (mantenibilidad, consistencia).

**Práctica**:

* Crear tu propio set de variables y aplicarlas a diferentes elementos.

---

### 🧼 MÓDULO 3 – Reset de Estilos y Box Model

**Objetivos**: Controlar los márgenes y rellenos iniciales, y comprender cómo se mide un elemento.

* Propiedades `margin`, `padding`, `box-sizing`.
* Reset universal con `* { box-sizing: border-box; }`
* Cascada y especificidad en CSS.

**Práctica**:

* Comparar `content-box` vs `border-box`.

---

### 🖼️ MÓDULO 4 – Diseño de Contenedor y Tipografía

**Objetivos**: Crear contenedores fluidos y definir una base tipográfica profesional.

* `.container`: uso de `max-width`, `padding`, centrado con `margin: auto`.
* Propiedades tipográficas: `font-family`, `line-height`, `color`, `font-size`.

**Práctica**:

* Diseñar un contenedor adaptable y aplicar estilos globales de texto.

---

### 🧭 MÓDULO 5 – Layout con Flexbox y Grid

**Objetivos**: Aplicar diseño adaptable mediante Flexbox y Grid.

* Flexbox: `display: flex`, `justify-content`, `align-items`, `gap`, `flex-wrap`.
* Grid: `grid-template-columns`, `gap`, `auto-fill` y `minmax`.

**Práctica**:

* Reproducir las secciones `.header-top`, `.hero-content`, `.categories`, `.products-grid`.

---

### 📋 MÓDULO 6 – Estilos Interactivos y Transiciones

**Objetivos**: Crear una experiencia interactiva visualmente fluida.

* Uso de `:hover`, `:focus`, `transition`, `box-shadow`.
* Efectos visuales: sombras, escalado, transformaciones.

**Práctica**:

* Aplicar efectos `hover` a botones, imágenes y enlaces.

---

### 🧩 MÓDULO 7 – Componentes Comunes (Header, Navbar, Hero, Cards)

**Objetivos**: Diseñar y entender los componentes visuales clave.

* `.logo`, `.search-bar`, `.nav-links`, `.hero`, `.category-card`, `.product-card`
* Composición visual: espaciado, alineación, jerarquía.

**Práctica**:

* Diseñar cada componente en HTML + CSS usando las clases vistas.

---

### 📱 MÓDULO 8 – Diseño Responsivo (Media Queries)

**Objetivos**: Adaptar el diseño a diferentes tamaños de pantalla.

* Media queries: `@media (max-width: 992px)` etc.
* Técnicas responsivas: dirección de flex, columnas adaptables, tipografía fluida.

**Práctica**:

* Simular el comportamiento de `.hero`, `.nav-links`, `.categories` en dispositivos móviles.

---

### 🧠 MÓDULO 9 – Buenas Prácticas, Optimización y Accesibilidad

**Objetivos**: Refinar el código para producción profesional.

* Organización y legibilidad de CSS.
* Accesibilidad visual (colores, contraste).
* Reutilización de estilos y separación de componentes.

**Práctica**:

* Refactorizar el código en módulos y aplicar herramientas como Prettier.

---

### 🧪 MÓDULO 10 – Proyecto Final

**Objetivos**: Integrar todo lo aprendido.

**Actividad**:

* Reproducir una Landing Page basada en el CSS estudiado.
* Aplicar: variables, layout, interactividad y responsive.
* Documentar el código y justificar decisiones de diseño.

---

## 📚 Recursos Sugeridos

* [MDN Web Docs – CSS](https://developer.mozilla.org/es/docs/Web/CSS)
* [CSS Tricks](https://css-tricks.com/)
* [Flexbox Froggy](https://flexboxfroggy.com/) y [Grid Garden](https://cssgridgarden.com/)
* [Google Fonts – Poppins](https://fonts.google.com/specimen/Poppins)

---

## Archivo para trabajar la teoria

    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ShopTech - Plataforma de E-commerce</title>
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
        />
        <style>
        /* Variables y Reset */
        :root {
            --primary: #2563eb;
            --primary-dark: #1d4ed8;
            --secondary: #f97316;
            --dark: #1f2937;
            --light: #f9fafb;
            --gray: #9ca3af;
            --success: #10b981;
            --border-radius: 8px;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            --transition: all 0.3s ease;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: "Poppins", sans-serif;
            background-color: #f5f7fa;
            color: var(--dark);
            line-height: 1.6;
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header */
        header {
            background-color: white;
            box-shadow: var(--shadow);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .header-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
        }

        .logo {
            display: flex;
            align-items: center;
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary);
        }

        .logo i {
            margin-right: 10px;
        }

        .search-bar {
            flex: 1;
            max-width: 600px;
            margin: 0 20px;
            position: relative;
        }

        .search-bar input {
            width: 100%;
            padding: 12px 20px;
            border-radius: 30px;
            border: 1px solid var(--gray);
            font-size: 1rem;
            transition: var(--transition);
        }

        .search-bar input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
        }

        .search-bar button {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 30px;
            padding: 8px 20px;
            cursor: pointer;
            transition: var(--transition);
        }

        .search-bar button:hover {
            background: var(--primary-dark);
        }

        .header-icons {
            display: flex;
            gap: 20px;
        }

        .icon-btn {
            position: relative;
            background: none;
            border: none;
            font-size: 1.4rem;
            color: var(--dark);
            cursor: pointer;
            transition: var(--transition);
        }

        .icon-btn:hover {
            color: var(--primary);
        }

        .badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background: var(--secondary);
            color: white;
            font-size: 0.7rem;
            font-weight: 600;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Navigation */
        nav {
            background-color: var(--primary);
            padding: 15px 0;
        }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 25px;
        }

        .nav-links a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .nav-links a:hover {
            color: #e0f2fe;
        }

        .nav-links a i {
            font-size: 0.9rem;
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, #2563eb, #3b82f6);
            color: white;
            padding: 60px 0;
            margin-bottom: 40px;
        }

        .hero-content {
            display: flex;
            align-items: center;
            gap: 40px;
        }

        .hero-text {
            flex: 1;
        }

        .hero-text h1 {
            font-size: 2.8rem;
            margin-bottom: 15px;
            line-height: 1.2;
        }

        .hero-text p {
            font-size: 1.2rem;
            margin-bottom: 25px;
            opacity: 0.9;
        }

        .btn {
            display: inline-block;
            background: var(--secondary);
            color: white;
            padding: 12px 30px;
            border-radius: var(--border-radius);
            text-decoration: none;
            font-weight: 600;
            transition: var(--transition);
            border: none;
            cursor: pointer;
            font-size: 1rem;
        }

        .btn:hover {
            background: #ea580c;
            transform: translateY(-3px);
            box-shadow: 0 10px 15px rgba(249, 115, 22, 0.3);
        }

        .hero-image {
            flex: 1;
            display: flex;
            justify-content: center;
        }

        .hero-image img {
            max-width: 100%;
            border-radius: var(--border-radius);
            box-shadow: 0 20px 25px rgba(0, 0, 0, 0.2);
        }

        /* Categories */
        .section-title {
            text-align: center;
            margin-bottom: 40px;
            position: relative;
        }

        .section-title h2 {
            font-size: 2.2rem;
            color: var(--dark);
            display: inline-block;
            padding-bottom: 10px;
        }

        .section-title h2::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: var(--primary);
            border-radius: 2px;
        }

        .categories {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 50px;
        }

        .category-card {
            background: white;
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: var(--transition);
            text-align: center;
            padding: 25px 15px;
        }

        .category-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .category-icon {
            width: 70px;
            height: 70px;
            background: #dbeafe;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
            color: var(--primary);
            font-size: 1.8rem;
        }

        .category-card h3 {
            font-size: 1.2rem;
            margin-bottom: 10px;
        }

        .category-card p {
            color: var(--gray);
            font-size: 0.9rem;
        }

        /* Featured Products */
        .featured-products {
            margin-bottom: 50px;
        }

        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 25px;
        }

        .product-card {
            background: white;
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: var(--transition);
        }

        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .product-image {
            height: 200px;
            overflow: hidden;
            position: relative;
        }

        .product-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: var(--transition);
        }

        .product-card:hover .product-image img {
            transform: scale(1.05);
        }

        .product-badge {
            position: absolute;
            top: 15px;
            left: 15px;
            background: var(--success);
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .product-info {
            padding: 20px;
        }

        .product-category {
            color: var(--gray);
            font-size: 0.85rem;
            margin-bottom: 5px;
        }

        .product-title {
            font-weight: 600;
            margin-bottom: 10px;
            font-size: 1.1rem;
        }

        .product-rating {
            color: #f59e0b;
            margin-bottom: 10px;
            font-size: 0.9rem;
        }

        .product-price {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
        }

        .current-price {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--primary);
        }

        .old-price {
            color: var(--gray);
            text-decoration: line-through;
            font-size: 0.9rem;
        }

        .add-to-cart {
            width: 100%;
            background: var(--primary);
            color: white;
            border: none;
            padding: 10px;
            border-radius: var(--border-radius);
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .add-to-cart:hover {
            background: var(--primary-dark);
        }

        /* Promo Banner */
        .promo-banner {
            background: linear-gradient(90deg, var(--primary), var(--primary-dark));
            border-radius: var(--border-radius);
            padding: 40px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 50px 0;
        }

        .promo-text h2 {
            font-size: 2rem;
            margin-bottom: 10px;
        }

        .promo-text p {
            opacity: 0.9;
            margin-bottom: 20px;
        }

        .btn-light {
            background: white;
            color: var(--primary);
        }

        .btn-light:hover {
            background: #e0f2fe;
        }

        /* Footer */
        footer {
            background: var(--dark);
            color: white;
            padding: 60px 0 30px;
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }

        .footer-column h3 {
            font-size: 1.3rem;
            margin-bottom: 20px;
            position: relative;
            padding-bottom: 10px;
        }

        .footer-column h3::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 40px;
            height: 3px;
            background: var(--primary);
        }

        .footer-links {
            list-style: none;
        }

        .footer-links li {
            margin-bottom: 10px;
        }

        .footer-links a {
            color: #d1d5db;
            text-decoration: none;
            transition: var(--transition);
            display: block;
        }

        .footer-links a:hover {
            color: white;
            padding-left: 5px;
        }

        .social-icons {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }

        .social-icons a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            color: white;
            transition: var(--transition);
        }

        .social-icons a:hover {
            background: var(--primary);
            transform: translateY(-3px);
        }

        .newsletter input {
            width: 100%;
            padding: 12px;
            border-radius: var(--border-radius);
            border: none;
            margin-bottom: 10px;
        }

        .footer-bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 20px;
            text-align: center;
            color: #9ca3af;
            font-size: 0.9rem;
        }

        /* Responsive Design */
        @media (max-width: 992px) {
            .hero-content {
            flex-direction: column;
            text-align: center;
            }

            .hero-text {
            display: flex;
            flex-direction: column;
            align-items: center;
            }

            .promo-banner {
            flex-direction: column;
            text-align: center;
            gap: 20px;
            }

            .promo-text {
            display: flex;
            flex-direction: column;
            align-items: center;
            }
        }

        @media (max-width: 768px) {
            .header-top {
            flex-wrap: wrap;
            }

            .search-bar {
            order: 3;
            margin: 15px 0 0;
            max-width: 100%;
            }

            .nav-links {
            overflow-x: auto;
            padding-bottom: 10px;
            }

            .promo-banner img {
            max-width: 100%;
            }
        }

        @media (max-width: 576px) {
            .section-title h2 {
            font-size: 1.8rem;
            }

            .hero-text h1 {
            font-size: 2.2rem;
            }

            .categories {
            grid-template-columns: repeat(2, 1fr);
            }
        }
        </style>
    </head>
    <body>
        <!-- Header -->
        <header>
        <div class="container">
            <div class="header-top">
            <div class="logo">
                <i class="fas fa-laptop-code"></i>
                <span>ShopTech</span>
            </div>

            <div class="search-bar">
                <input type="text" placeholder="Buscar productos..." />
                <button><i class="fas fa-search"></i> Buscar</button>
            </div>

            <div class="header-icons">
                <button class="icon-btn">
                <i class="fas fa-user"></i>
                </button>
                <button class="icon-btn">
                <i class="fas fa-heart"></i>
                <span class="badge">3</span>
                </button>
                <button class="icon-btn">
                <i class="fas fa-shopping-cart"></i>
                <span class="badge">5</span>
                </button>
            </div>
            </div>
        </div>

        <nav>
            <div class="container">
            <ul class="nav-links">
                <li>
                <a href="#"><i class="fas fa-home"></i> Inicio</a>
                </li>
                <li>
                <a href="#"><i class="fas fa-mobile-alt"></i> Smartphones</a>
                </li>
                <li>
                <a href="#"><i class="fas fa-laptop"></i> Laptops</a>
                </li>
                <li>
                <a href="#"><i class="fas fa-tablet-alt"></i> Tablets</a>
                </li>
                <li>
                <a href="#"><i class="fas fa-headphones"></i> Audio</a>
                </li>
                <li>
                <a href="#"><i class="fas fa-tv"></i> TV & Monitores</a>
                </li>
                <li>
                <a href="#"><i class="fas fa-gamepad"></i> Gaming</a>
                </li>
                <li>
                <a href="#"><i class="fas fa-percent"></i> Ofertas</a>
                </li>
            </ul>
            </div>
        </nav>
        </header>

        <!-- Hero Section -->
        <section class="hero">
        <div class="container">
            <div class="hero-content">
            <div class="hero-text">
                <h1>La mejor tecnología al mejor precio</h1>
                <p>
                Descubre nuestra colección de productos tecnológicos con DARDO
                descuentos exclusivos y envío gratis
                </p>
                <a href="#" class="btn">Explorar productos</a>
            </div>
            <div class="hero-image">
                <img
                src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Tecnología"
                />
            </div>
            </div>
        </div>
        </section>

        <!-- Categories -->
        <section class="container">
        <div class="section-title">
            <h2>Categorías Populares</h2>
        </div>

        <div class="categories">
            <div class="category-card">
            <div class="category-icon">
                <i class="fas fa-mobile-alt"></i>
            </div>
            <h3>Smartphones</h3>
            <p>120+ productos</p>
            </div>

            <div class="category-card">
            <div class="category-icon">
                <i class="fas fa-laptop"></i>
            </div>
            <h3>Laptops</h3>
            <p>85+ productos</p>
            </div>

            <div class="category-card">
            <div class="category-icon">
                <i class="fas fa-tablet-alt"></i>
            </div>
            <h3>Tablets</h3>
            <p>45+ productos</p>
            </div>

            <div class="category-card">
            <div class="category-icon">
                <i class="fas fa-headphones"></i>
            </div>
            <h3>Audio</h3>
            <p>200+ productos</p>
            </div>

            <div class="category-card">
            <div class="category-icon">
                <i class="fas fa-tv"></i>
            </div>
            <h3>TV & Monitores</h3>
            <p>75+ productos</p>
            </div>

            <div class="category-card">
            <div class="category-icon">
                <i class="fas fa-gamepad"></i>
            </div>
            <h3>Gaming</h3>
            <p>150+ productos</p>
            </div>
        </div>
        </section>

        <!-- Featured Products -->
        <section class="container featured-products">
        <div class="section-title">
            <h2>Productos Destacados</h2>
        </div>

        <div class="products-grid">
            <!-- Product 1 -->
            <div class="product-card">
            <div class="product-image">
                <img
                src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Smartphone"
                />
                <span class="product-badge">Nuevo</span>
            </div>
            <div class="product-info">
                <div class="product-category">Smartphones</div>
                <h3 class="product-title">Samsung Galaxy S23 Ultra</h3>
                <div class="product-rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
                <span>(128)</span>
                </div>
                <div class="product-price">
                <span class="current-price">$1,099.99</span>
                <span class="old-price">$1,199.99</span>
                </div>
                <button class="add-to-cart">
                <i class="fas fa-shopping-cart"></i> Añadir al carrito
                </button>
            </div>
            </div>

            <!-- Product 2 -->
            <div class="product-card">
            <div class="product-image">
                <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Laptop"
                />
                <span class="product-badge">Oferta</span>
            </div>
            <div class="product-info">
                <div class="product-category">Laptops</div>
                <h3 class="product-title">MacBook Pro M2 14"</h3>
                <div class="product-rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
                <span>(98)</span>
                </div>
                <div class="product-price">
                <span class="current-price">$1,899.99</span>
                <span class="old-price">$1,999.99</span>
                </div>
                <button class="add-to-cart">
                <i class="fas fa-shopping-cart"></i> Añadir al carrito
                </button>
            </div>
            </div>

            <!-- Product 3 -->
            <div class="product-card">
            <div class="product-image">
                <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Auriculares"
                />
            </div>
            <div class="product-info">
                <div class="product-category">Audio</div>
                <h3 class="product-title">Sony WH-1000XM5</h3>
                <div class="product-rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <span>(245)</span>
                </div>
                <div class="product-price">
                <span class="current-price">$349.99</span>
                </div>
                <button class="add-to-cart">
                <i class="fas fa-shopping-cart"></i> Añadir al carrito
                </button>
            </div>
            </div>

            <!-- Product 4 -->
            <div class="product-card">
            <div class="product-image">
                <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                alt="Auriculares"
                />
                <span class="product-badge">Popular</span>
            </div>
            <div class="product-info">
                <div class="product-category">Audio</div>
                <h3 class="product-title">AirPods Pro 2da Gen</h3>
                <div class="product-rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
                <span>(187)</span>
                </div>
                <div class="product-price">
                <span class="current-price">$249.99</span>
                </div>
                <button class="add-to-cart">
                <i class="fas fa-shopping-cart"></i> Añadir al carrito
                </button>
            </div>
            </div>
        </div>
        </section>

        <!-- Promo Banner -->
        <section class="container">
        <div class="promo-banner">
            <div class="promo-text">
            <h2>Gran Venta de Verano</h2>
            <p>
                Hasta 40% de descuento en productos seleccionados. Oferta válida
                hasta el 31 de agosto.
            </p>
            <a href="#" class="btn btn-light">Ver Ofertas</a>
            </div>
            <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            alt="Oferta"
            width="300"
            />
        </div>
        </section>

        <!-- Footer -->
        <footer>
        <div class="container">
            <div class="footer-content">
            <div class="footer-column">
                <h3>ShopTech</h3>
                <p>
                Tu tienda de tecnología de confianza con los mejores productos y
                precios del mercado.
                </p>
                <div class="social-icons">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
                </div>
            </div>

            <div class="footer-column">
                <h3>Enlaces Rápidos</h3>
                <ul class="footer-links">
                <li><a href="#">Sobre Nosotros</a></li>
                <li><a href="#">Contacto</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Preguntas Frecuentes</a></li>
                <li><a href="#">Política de Privacidad</a></li>
                </ul>
            </div>

            <div class="footer-column">
                <h3>Categorías</h3>
                <ul class="footer-links">
                <li><a href="#">Smartphones</a></li>
                <li><a href="#">Laptops</a></li>
                <li><a href="#">Tablets</a></li>
                <li><a href="#">Audio</a></li>
                <li><a href="#">TV & Monitores</a></li>
                </ul>
            </div>

            <div class="footer-column">
                <h3>Boletín Informativo</h3>
                <p>Suscríbete para recibir ofertas exclusivas y novedades.</p>
                <div class="newsletter">
                <input type="email" placeholder="Tu correo electrónico" />
                <button class="btn">Suscribirse</button>
                </div>
            </div>
            </div>

            <div class="footer-bottom">
            <p>&copy; 2023 ShopTech. Todos los derechos reservados.</p>
            </div>
        </div>
        </footer>

        <script>
        // Simple cart functionality
        document.querySelectorAll(".add-to-cart").forEach((button) => {
            button.addEventListener("click", function () {
            const product = this.closest(".product-card");
            const title = product.querySelector(".product-title").textContent;

            // Update cart badge
            const cartBadge = document.querySelector(
                ".header-icons .fa-shopping-cart + .badge"
            );
            let count = parseInt(cartBadge.textContent);
            cartBadge.textContent = count + 1;

            // Show notification
            alert(`"${title}" añadido al carrito`);
            });
        });
        </script>
    </body>
    </html>

