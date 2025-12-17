# Ejemplos de Backend para el Formulario de Contacto

Este directorio contiene ejemplos listos para usar de diferentes formas de conectar el formulario con un backend.

## 📁 Archivos incluidos

### Para el Frontend (JavaScript)
- **`formspree-ejemplo.js`** - Código para usar con Formspree (más fácil)
- **`emailjs-ejemplo.js`** - Código para usar con EmailJS
- **`backend-propio-ejemplo.js`** - Código para usar con tu propio servidor

### Para el Backend
- **`server-nodejs.js`** - Servidor completo en Node.js + Express
- **`contact.php`** - Script PHP listo para usar

## 🚀 Guía rápida

### Opción más fácil: Formspree

1. Ve a https://formspree.io y regístrate (gratis)
2. Crea un nuevo formulario
3. Copia tu Form ID
4. Abre `formspree-ejemplo.js`
5. Reemplaza `YOUR_FORM_ID` con tu ID real
6. Copia el código y reemplázalo en `script.js` (línea ~360)

### Opción intermedia: EmailJS

1. Ve a https://www.emailjs.com y regístrate (gratis)
2. Configura tu servicio de email
3. Crea una plantilla
4. Agrega el script de EmailJS en `index.html`
5. Usa el código de `emailjs-ejemplo.js`

### Opción avanzada: Backend propio

#### Node.js:
1. Instala Node.js
2. Ejecuta: `npm install express cors nodemailer`
3. Configura `server-nodejs.js`
4. Ejecuta: `node server-nodejs.js`
5. Usa el código de `backend-propio-ejemplo.js`

#### PHP:
1. Sube `contact.php` a tu servidor
2. Configura el email de destino
3. En `script.js`, cambia la URL a `contact.php`
4. Usa el código de `backend-propio-ejemplo.js` (pero con FormData)

## 📖 Documentación completa

Lee el archivo `GUIA_BACKEND.md` en la raíz del proyecto para instrucciones detalladas.

## ⚠️ Importante

- **Nunca** subas credenciales a GitHub
- Usa variables de entorno para datos sensibles
- En producción, siempre usa HTTPS
- Considera agregar CAPTCHA para prevenir spam
