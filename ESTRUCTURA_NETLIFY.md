# 📁 Estructura de Archivos para Netlify

## ✅ Estructura Correcta (Tu proyecto ya está así)

```
CyC/
│
├── index.html                    ✅ Archivo principal (DEBE estar en la raíz)
├── estilos.css                   ✅ Estilos (en la raíz)
├── script.js                     ✅ JavaScript (en la raíz)
│
├── imagenes.img/                 ✅ Carpeta de imágenes
│   ├── iden (1).png
│   ├── logo.jpg
│   ├── logo.png
│   ├── Ilustración digital .png
│   ├── Ilustración digital2.png
│   ├── logo C&C con texto '.png
│   ├── logo2.jpeg
│   ├── f1.webp
│   └── fondo.webp
│
└── (archivos de documentación - no se suben a Netlify)
    ├── NETLIFY_PASO_A_PASO.md
    ├── HOSTING_GRATIS.md
    └── ...
```

---

## 📋 Checklist de Estructura

### ✅ Archivos en la Raíz (Obligatorios)
- [x] `index.html` - ✅ Está en la raíz
- [x] `estilos.css` - ✅ Está en la raíz
- [x] `script.js` - ✅ Está en la raíz

### ✅ Carpetas
- [x] `imagenes.img/` - ✅ Carpeta de imágenes existe

### ✅ Rutas en el Código
- [x] Rutas relativas correctas: `imagenes.img/...`
- [x] CSS: `estilos.css` (sin carpeta)
- [x] JS: `script.js` (sin carpeta)

---

## 🚨 Importante para Netlify

### ✅ Lo que SÍ debes subir:
- `index.html`
- `estilos.css`
- `script.js`
- Carpeta `imagenes.img/` completa

### ❌ Lo que NO debes subir (opcional):
- Archivos `.md` (documentación)
- Carpeta `ejemplos-backend/` (solo ejemplos)
- Cualquier archivo que no use el sitio

**Nota:** Netlify acepta todos los archivos, pero es mejor subir solo lo necesario.

---

## 📝 Rutas Verificadas

### En `index.html`:
```html
✅ <link rel="stylesheet" href="estilos.css">
✅ <link href="imagenes.img/iden (1).png" rel="icon">
✅ <img src="imagenes.img/logo.jpg">
✅ <img src="imagenes.img/logo.png">
✅ <img src="imagenes.img/Ilustración digital .png">
```

### En `index.html` (al final):
```html
✅ <script src="script.js"></script>
```

**Todas las rutas son correctas y relativas** ✅

---

## 🎯 Cómo Subir a Netlify

### Opción 1: Arrastrar Carpeta Completa (Recomendado)

1. **Selecciona TODA la carpeta `CyC`**
2. **Arrastra** la carpeta completa a Netlify
3. **Netlify detectará automáticamente:**
   - `index.html` como página principal
   - Todas las rutas relativas
   - La estructura de carpetas

### Opción 2: Solo Archivos Necesarios

Si quieres subir solo lo esencial:

1. **Crea una carpeta temporal** llamada `sitio-web`
2. **Copia estos archivos:**
   - `index.html`
   - `estilos.css`
   - `script.js`
   - Carpeta `imagenes.img/` completa
3. **Arrastra la carpeta `sitio-web`** a Netlify

---

## ✅ Verificación Final

Antes de subir, verifica:

### 1. Estructura de Carpetas
```
✅ index.html en la raíz
✅ estilos.css en la raíz
✅ script.js en la raíz
✅ imagenes.img/ existe
```

### 2. Rutas en el Código
```html
✅ href="estilos.css" (correcto)
✅ src="script.js" (correcto)
✅ src="imagenes.img/..." (correcto)
```

### 3. Archivo Principal
```
✅ index.html existe
✅ index.html está en la raíz (no en subcarpeta)
```

---

## 🚀 Pasos para Publicar

1. **Abre Netlify:** https://www.netlify.com
2. **Arrastra la carpeta `CyC` completa**
3. **Espera 10-20 segundos**
4. **¡Listo!** Tu sitio está en línea

**Netlify automáticamente:**
- ✅ Detecta `index.html` como página principal
- ✅ Mantiene la estructura de carpetas
- ✅ Resuelve todas las rutas relativas
- ✅ Configura HTTPS automáticamente

---

## 🔍 Si Algo No Funciona

### Problema: Las imágenes no se ven
**Solución:**
- Verifica que la carpeta `imagenes.img/` esté incluida
- Revisa que las rutas en `index.html` sean: `imagenes.img/nombre-archivo.png`
- Asegúrate de que los nombres de archivo coincidan exactamente

### Problema: El CSS no carga
**Solución:**
- Verifica que `estilos.css` esté en la raíz
- Revisa que en `index.html` sea: `href="estilos.css"` (sin carpeta)

### Problema: El JavaScript no funciona
**Solución:**
- Verifica que `script.js` esté en la raíz
- Revisa que al final de `index.html` sea: `src="script.js"`

---

## 📊 Estructura Visual

```
CyC/                          ← Arrastra ESTA carpeta a Netlify
│
├── 📄 index.html             ← Página principal
├── 🎨 estilos.css            ← Estilos
├── ⚙️ script.js              ← JavaScript
│
└── 📁 imagenes.img/          ← Imágenes
    ├── 🖼️ iden (1).png
    ├── 🖼️ logo.jpg
    ├── 🖼️ logo.png
    └── ... (más imágenes)
```

---

## ✅ Tu Estructura Actual

**Estado:** ✅ **PERFECTA para Netlify**

No necesitas cambiar nada. Tu estructura ya está correcta:
- ✅ `index.html` en la raíz
- ✅ Archivos CSS y JS en la raíz
- ✅ Imágenes en carpeta `imagenes.img/`
- ✅ Rutas relativas correctas

**¡Solo arrastra la carpeta y listo!** 🚀

---

## 💡 Tips

1. **Mantén la estructura:** No muevas archivos después de publicar
2. **Nombres de archivo:** Respeta mayúsculas/minúsculas
3. **Rutas:** Siempre usa rutas relativas (sin `/` al inicio)
4. **Actualizaciones:** Arrastra la carpeta completa de nuevo para actualizar

---

## 🎉 Resumen

**Tu proyecto está 100% listo para Netlify:**

✅ Estructura correcta
✅ Rutas correctas
✅ Archivos en su lugar
✅ Formulario configurado

**Siguiente paso:** Arrastra la carpeta `CyC` a Netlify

---

¿Listo? ¡Ve a Netlify y publica tu sitio! 🚀
