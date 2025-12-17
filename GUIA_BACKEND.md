# Guía: Conectar Formulario de Contacto con Backend

## ¿Para qué sirve conectar el formulario con el backend?

### 1. **Almacenar los mensajes de contacto**
   - Guardar los datos en una base de datos
   - Tener un historial de todos los contactos
   - Poder responder desde un panel de administración

### 2. **Enviar notificaciones por email**
   - Recibir un email cada vez que alguien envía el formulario
   - Enviar un email de confirmación al cliente
   - Mantener un registro de comunicaciones

### 3. **Integración con CRM o sistemas de gestión**
   - Conectar con herramientas como HubSpot, Salesforce, etc.
   - Automatizar el seguimiento de leads
   - Mejorar la gestión de clientes potenciales

### 4. **Validación y seguridad**
   - Validar datos en el servidor (más seguro que solo en el cliente)
   - Proteger contra spam y ataques
   - Implementar CAPTCHA si es necesario

### 5. **Análisis y métricas**
   - Saber qué servicios generan más interés
   - Analizar el origen de los contactos
   - Mejorar la estrategia de marketing

---

## Opciones para conectar el formulario

### Opción 1: Servicios de terceros (MÁS FÁCIL - Sin programar backend)

#### A. **Formspree** (Recomendado para empezar)
- ✅ Gratis hasta 50 envíos/mes
- ✅ No requiere servidor propio
- ✅ Configuración en 5 minutos
- 🔗 https://formspree.io

**Cómo usarlo:**
1. Regístrate en Formspree
2. Crea un nuevo formulario
3. Obtén tu URL (ej: `https://formspree.io/f/YOUR_FORM_ID`)
4. Reemplaza la URL en el código JavaScript

#### B. **EmailJS** (Envío directo de emails)
- ✅ Gratis hasta 200 emails/mes
- ✅ Envía emails sin servidor
- ✅ Integración directa desde el navegador
- 🔗 https://www.emailjs.com

#### C. **Netlify Forms** (Si usas Netlify para hosting)
- ✅ Gratis e ilimitado
- ✅ Solo agrega `netlify` al atributo del form
- ✅ Funciona automáticamente

---

### Opción 2: Backend propio (MÁS CONTROL)

#### A. **Node.js + Express**
- ✅ Control total
- ✅ Puedes guardar en base de datos
- ✅ Más personalizable

#### B. **PHP**
- ✅ Fácil de implementar
- ✅ Compatible con la mayoría de hosting
- ✅ Puede usar mail() nativo

#### C. **Python + Flask/Django**
- ✅ Moderno y potente
- ✅ Bueno para análisis de datos

---

## Ejemplos de implementación

### Ejemplo 1: Formspree (MÁS FÁCIL)

**Paso 1:** Regístrate en https://formspree.io
**Paso 2:** Crea un formulario y obtén tu URL
**Paso 3:** Actualiza el código en `script.js`:

```javascript
// Reemplazar el setTimeout con esto:
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => {
    if (response.ok) {
        // Éxito
        formMessage.textContent = '¡Mensaje enviado con éxito! Te responderemos pronto.';
        formMessage.className = 'form-message show success';
        contactForm.reset();
    } else {
        throw new Error('Error en el servidor');
    }
})
.catch(error => {
    // Error
    formMessage.textContent = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
    formMessage.className = 'form-message show error';
})
.finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
});
```

---

### Ejemplo 2: EmailJS (Envío directo de emails)

**Paso 1:** Regístrate en https://www.emailjs.com
**Paso 2:** Configura tu servicio de email (Gmail, Outlook, etc.)
**Paso 3:** Obtén tu Service ID, Template ID y Public Key
**Paso 4:** Agrega esto al HTML antes de `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    emailjs.init("YOUR_PUBLIC_KEY");
</script>
```

**Paso 5:** Actualiza el código en `script.js`:

```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    from_name: formData.nombre,
    from_email: formData.email,
    phone: formData.telefono,
    service: formData.servicio,
    message: formData.mensaje
})
.then(() => {
    formMessage.textContent = '¡Mensaje enviado con éxito! Te responderemos pronto.';
    formMessage.className = 'form-message show success';
    contactForm.reset();
})
.catch(() => {
    formMessage.textContent = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
    formMessage.className = 'form-message show error';
})
.finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
});
```

---

### Ejemplo 3: Backend Node.js + Express

**Archivo: `server.js`**

```javascript
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(cors());
app.use(express.json());

// Configurar transporter de email (Gmail, por ejemplo)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu-email@gmail.com',
        pass: 'tu-contraseña-de-aplicacion'
    }
});

// Endpoint para recibir el formulario
app.post('/api/contact', async (req, res) => {
    try {
        const { nombre, email, telefono, servicio, mensaje } = req.body;

        // Enviar email
        await transporter.sendMail({
            from: 'tu-email@gmail.com',
            to: 'contacto@cyc-soluciones.com',
            subject: `Nuevo contacto: ${servicio || 'Consulta general'}`,
            html: `
                <h2>Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
                <p><strong>Servicio:</strong> ${servicio || 'No especificado'}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${mensaje}</p>
            `
        });

        res.json({ success: true, message: 'Mensaje enviado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al enviar el mensaje' });
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
```

**Actualizar `script.js`:**

```javascript
fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        formMessage.textContent = '¡Mensaje enviado con éxito! Te responderemos pronto.';
        formMessage.className = 'form-message show success';
        contactForm.reset();
    } else {
        throw new Error(data.message);
    }
})
.catch(error => {
    formMessage.textContent = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
    formMessage.className = 'form-message show error';
})
.finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
});
```

---

### Ejemplo 4: PHP (Para hosting tradicional)

**Archivo: `contact.php`**

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? '';
    $email = $_POST['email'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $servicio = $_POST['servicio'] ?? '';
    $mensaje = $_POST['mensaje'] ?? '';

    // Validar datos
    if (empty($nombre) || empty($email) || empty($mensaje)) {
        echo json_encode(['success' => false, 'message' => 'Campos requeridos faltantes']);
        exit;
    }

    // Enviar email
    $to = 'contacto@cyc-soluciones.com';
    $subject = "Nuevo contacto: " . ($servicio ?: 'Consulta general');
    $body = "
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> $nombre</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Teléfono:</strong> " . ($telefono ?: 'No proporcionado') . "</p>
        <p><strong>Servicio:</strong> " . ($servicio ?: 'No especificado') . "</p>
        <p><strong>Mensaje:</strong></p>
        <p>$mensaje</p>
    ";
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al enviar el email']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
```

**Actualizar `script.js`:**

```javascript
// Cambiar a FormData para PHP
const formDataToSend = new FormData();
formDataToSend.append('nombre', formData.nombre);
formDataToSend.append('email', formData.email);
formDataToSend.append('telefono', formData.telefono);
formDataToSend.append('servicio', formData.servicio);
formDataToSend.append('mensaje', formData.mensaje);

fetch('contact.php', {
    method: 'POST',
    body: formDataToSend
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        formMessage.textContent = '¡Mensaje enviado con éxito! Te responderemos pronto.';
        formMessage.className = 'form-message show success';
        contactForm.reset();
    } else {
        throw new Error(data.message);
    }
})
.catch(error => {
    formMessage.textContent = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
    formMessage.className = 'form-message show error';
})
.finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
});
```

---

## Recomendación

**Para empezar rápido:** Usa **Formspree** o **EmailJS**
- No necesitas servidor
- Configuración en minutos
- Gratis para empezar

**Para producción profesional:** Usa **Node.js** o **PHP**
- Más control
- Puedes guardar en base de datos
- Mejor para escalar

---

## Seguridad importante

1. **Nunca expongas credenciales** en el código JavaScript
2. **Valida en el servidor**, no solo en el cliente
3. **Usa HTTPS** en producción
4. **Considera CAPTCHA** para prevenir spam
5. **Limita la tasa de envíos** (rate limiting)

---

## Próximos pasos

1. Elige una opción según tus necesidades
2. Sigue los pasos del ejemplo correspondiente
3. Prueba el formulario
4. Monitorea los mensajes recibidos
5. Ajusta según sea necesario
