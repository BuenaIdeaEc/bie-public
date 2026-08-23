# 📸 Inventario de Imágenes — BIE Website

> Generado el 15 de mayo de 2026  
> Revisado con todos los componentes del sitio.

---

## ✅ LISTAS (no necesitan acción)

| Imagen | Ruta | Nota |
|--------|------|------|
| OG Image (redes sociales) | `/images/og/og-default.jpg` | Generada automáticamente — fondo negro + texto BIE |
| Portfolio: BIE | `/images/portfolio/bie.jpg` | Screenshot real de businessintelligence.solutions |
| Portfolio: Carolina Arroba | `/images/portfolio/carolina-arroba.jpg` | Screenshot real de carolinaarroba.com |
| Portfolio: Costa Optics (placeholder) | `/images/portfolio/costa-optics.svg` | SVG temporal — ver sección ⚠️ abajo |
| Caso: Island Estates | `/images/cases/island-estates/hero.svg` | SVG generado — funcional |
| Caso: SmartVision | `/images/cases/smartvision/hero.svg` | SVG generado — funcional |
| Caso: Costa Optics | `/images/cases/costa-optics/hero.svg` | SVG generado — funcional |
| Home: Dashboard mockup | `/images/home/dashboard-mockup.svg` | SVG generado — funcional |
| Logo / Favicon | `/icons/logo.svg` | ✅ Listo |

---

## ⚠️ PENDIENTE — Necesita foto real

### 1. Portfolio: Costa Optics (PRIORIDAD ALTA)
**Ruta:** `/images/portfolio/costa-optics.svg`  
**Tamaño objetivo:** 1440×860 px, JPEG

**Situación:** El antivirus Bitdefender bloquea www.costaoptics.com como sitio sospechoso, 
impidiendo capturar screenshot. Dos opciones:

- **Opción A (Recomendada):** Desactivar Bitdefender temporalmente → ejecutar:
  ```
  node capture-portfolio.mjs
  ```
  (ya está configurado para capturar Costa Optics)

- **Opción B:** Tomar screenshot manual del sitio → guardar como:
  `/public/images/portfolio/costa-optics.jpg`
  El sitio tomará la foto automáticamente al hacer build.

---

### 2. Catálogo en homepage — PopularSection (PRIORIDAD ALTA)

Los 6 servicios populares usan fotos de Unsplash genéricas. Opciones:

| Servicio | Foto ideal |
|----------|-----------|
| **Sitio Web** | Screenshot de un sitio web hecho por BIE, o foto de pantalla de computadora con diseño real |
| **Landing Page** | Screenshot de una landing page real de cliente |
| **Tienda Online** | Screenshot de tienda hecha por BIE |
| **Auto Ventas** | Screenshot del agente de ventas en WhatsApp / dashboard |
| **Logo e Identidad** | Foto del resultado real: manual de marca, papelería, etc. |
| **Chatbot IA** | Screenshot del chatbot en conversación real |

**Dónde colocar las fotos:**
```
public/images/home/
  sitio-web.jpg          (900×560 px)
  landing-page.jpg       (900×560 px)
  tienda-online.jpg      (900×560 px)
  auto-ventas.jpg        (900×560 px)
  logo-identidad.jpg     (900×560 px)
  chatbot-ia.jpg         (900×560 px)
```

Luego actualizar en `src/components/home/PopularSection.astro`:
```js
photo: '/images/home/sitio-web.jpg',
// etc.
```

---

### 3. Catálogo completo de servicios — /servicios (PRIORIDAD MEDIA)

La página `/servicios` tiene ~44 imágenes de Unsplash. No es urgente reemplazarlas todas, 
pero idealmente se reemplazan con trabajo real de BIE o ilustraciones propias.

**Categorías con más visibilidad (reemplazar primero):**

#### Identidad & Marca (6 imágenes)
```
public/images/servicios/identidad/
  logo-identidad-visual.jpg        (resultado real de diseño)
  manual-de-marca.jpg              (foto del manual impreso o PDF)
  papeleria-corporativa.jpg        (foto de tarjetas, sobres, etc.)
  presentaciones-corporativas.jpg  (diapositivas en pantalla)
  social-media-kit.jpg             (mockup de posts en redes)
  contenido-visual.jpg             (collage de contenido creado)
```

#### Presencia Digital (6 imágenes)
```
public/images/servicios/presencia/
  sitio-web-institucional.jpg      (screenshot de sitio real)
  dominio-hosting.jpg              (dashboard de Netlify / panel)
  landing-page.jpg                 (screenshot de landing)
  tienda-online.jpg                (screenshot de tienda)
  seo-local.jpg                    (Google My Business / resultados)
  mantenimiento-web.jpg            (dashboard de analytics)
```

#### Datos (6 imágenes)
```
public/images/servicios/datos/
  migracion-datos.jpg
  cerebro-ampliado.jpg
  dashboard-analitica.jpg
  analisis-de-mercado.jpg
  crm-implementacion.jpg
  base-de-datos.jpg
```

#### Automatización (6 imágenes)
```
public/images/servicios/automatizacion/
  automatizacion-ventas.jpg
  atencion-cliente-24-7.jpg
  automatizacion-facturacion.jpg
  aplicacion-web.jpg
  automatizacion-marketing.jpg
  integracion-sistemas.jpg
```

#### Inteligencia IA (6 imágenes)
```
public/images/servicios/inteligencia/
  ecosistema-agentes-ia.jpg
  chatbot-ia.jpg
  ia-documentos.jpg
  prediccion-forecasting.jpg
  agente-ventas-ia.jpg
  ia-recursos-humanos.jpg
```

#### Escala (6 imágenes)
```
public/images/servicios/escala/
  white-label.jpg
  expansion-mercados.jpg
  integracion-enterprise.jpg
  programa-satelites.jpg
  transformacion-digital.jpg
  auditoria-optimizacion.jpg
```

**Tamaño recomendado:** 600×300 px, JPEG, calidad 85+

---

### 4. Fotos del equipo — TeamSection (PRIORIDAD BAJA)

Actualmente el equipo usa iniciales en lugar de fotos. Si se quiere personalizar:

```
public/images/team/
  [nombre-apellido].jpg    (400×400 px, formato cuadrado, fondo neutro)
```

Y actualizar en `src/components/home/TeamSection.astro`.

---

## 🗂️ Estructura completa de carpetas objetivo

```
public/
  images/
    og/
      og-default.jpg          ✅ Lista
    portfolio/
      bie.jpg                 ✅ Lista
      carolina-arroba.jpg     ✅ Lista
      costa-optics.jpg        ⚠️ Pendiente (reemplazar el SVG)
    cases/
      island-estates/
        hero.svg              ✅ Lista (SVG)
      smartvision/
        hero.svg              ✅ Lista (SVG)
      costa-optics/
        hero.svg              ✅ Lista (SVG)
    home/
      dashboard-mockup.svg    ✅ Lista
      sitio-web.jpg           ⚠️ Pendiente
      landing-page.jpg        ⚠️ Pendiente
      tienda-online.jpg       ⚠️ Pendiente
      auto-ventas.jpg         ⚠️ Pendiente
      logo-identidad.jpg      ⚠️ Pendiente
      chatbot-ia.jpg          ⚠️ Pendiente
    servicios/
      identidad/              ⚠️ 6 imágenes pendientes
      presencia/              ⚠️ 6 imágenes pendientes
      datos/                  ⚠️ 6 imágenes pendientes
      automatizacion/         ⚠️ 6 imágenes pendientes
      inteligencia/           ⚠️ 6 imágenes pendientes
      escala/                 ⚠️ 6 imágenes pendientes
    team/                     (opcional — actualmente usa iniciales)
```

---

## 📋 Resumen ejecutivo

| Prioridad | Área | # Imágenes | Estado |
|-----------|------|-----------|--------|
| 🔴 Alta | Costa Optics (portfolio) | 1 | Screenshot bloqueado por Bitdefender |
| 🔴 Alta | Homepage catálogo (PopularSection) | 6 | Unsplash genéricas |
| 🟡 Media | Servicios completo | 36 | Unsplash genéricas |
| 🟢 Baja | Team photos | 0–5 | Opcional (usa iniciales) |
| ✅ Listo | OG / Portfolio / Cases / Logo | 10+ | Listos |

**Acción más impactante:** Proporcionar 6 fotos reales de trabajo de BIE 
para el catálogo del homepage. Son las más vistas y las que más impactan 
la credibilidad del sitio.
