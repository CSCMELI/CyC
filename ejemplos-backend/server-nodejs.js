// ============================================
// SERVIDOR NODE.JS + EXPRESS
// ============================================
// INSTRUCCIONES:
// 1. Instala Node.js desde https://nodejs.org
// 2. En la terminal, ejecuta: npm init -y
// 3. Instala las dependencias: npm install express cors nodemailer
// 4. Crea este archivo como server.js
// 5. Configura tu email en las líneas 18-22
// 6. Ejecuta: node server.js
// 7. Tu servidor estará en http://localhost:3000
// ============================================

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Habilitar CORS para permitir peticiones desde tu sitio web
app.use(cors());
app.use(express.json());

// Configurar transporter de email
// OPCIÓN 1: Gmail (necesitas una "Contraseña de aplicación")
// https://support.google.com/accounts/answer/185833
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu-email@gmail.com',        // Cambia esto
        pass: 'tu-contraseña-de-aplicacion' // Cambia esto
    }
});

// OPCIÓN 2: Otro proveedor (SMTP)
/*
const transporter = nodemailer.createTransport({
    host: 'smtp.tu-proveedor.com',
    port: 587,
    secure: false,
    auth: {
        user: 'tu-email@tudominio.com',
        pass: 'tu-contraseña'
    }
});
*/

// Endpoint para recibir el formulario
app.post('/api/contact', async (req, res) => {
    try {
        const { nombre, email, telefono, servicio, mensaje } = req.body;

        // Validar datos requeridos
        if (!nombre || !email || !mensaje) {
            return res.status(400).json({
                success: false,
                message: 'Campos requeridos faltantes'
            });
        }

        // Enviar email a ti
        await transporter.sendMail({
            from: 'tu-email@gmail.com', // Cambia esto
            to: 'contacto@cyc-soluciones.com', // Email donde recibirás los mensajes
            subject: `Nuevo contacto: ${servicio || 'Consulta general'}`,
            html: `
                <h2>Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
                <p><strong>Servicio:</strong> ${servicio || 'No especificado'}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${mensaje.replace(/\n/g, '<br>')}</p>
            `
        });

        // Opcional: Enviar email de confirmación al cliente
        await transporter.sendMail({
            from: 'contacto@cyc-soluciones.com',
            to: email,
            subject: 'Gracias por contactarnos - C & C Soluciones',
            html: `
                <h2>¡Gracias por contactarnos!</h2>
                <p>Hola ${nombre},</p>
                <p>Hemos recibido tu mensaje y te responderemos a la brevedad posible.</p>
                <p>Saludos,<br>Equipo de C & C Soluciones</p>
            `
        });

        res.json({
            success: true,
            message: 'Mensaje enviado correctamente'
        });
    } catch (error) {
        console.error('Error al procesar el formulario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al enviar el mensaje'
        });
    }
});

// Endpoint de prueba
app.get('/api/test', (req, res) => {
    res.json({ message: 'Servidor funcionando correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📧 Endpoint de contacto: http://localhost:${PORT}/api/contact`);
});
