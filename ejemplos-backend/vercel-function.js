// ============================================
// FUNCIÓN VERCEL/NETLIFY (Serverless)
// ============================================
// INSTRUCCIONES:
// 
// PARA VERCEL:
// 1. Crea carpeta 'api' en la raíz del proyecto
// 2. Crea este archivo como 'api/contact.js'
// 3. Instala: npm install nodemailer (o usa otro servicio)
// 4. Despliega en Vercel: vercel deploy
// 5. La URL será: https://tudominio.com/api/contact
//
// PARA NETLIFY:
// 1. Crea carpeta 'netlify/functions' en la raíz
// 2. Crea este archivo como 'netlify/functions/contact.js'
// 3. Despliega en Netlify
// 4. La URL será: https://tudominio.com/.netlify/functions/contact
//
// ============================================

// OPCIÓN 1: Usando Nodemailer (necesitas configurar SMTP)
const nodemailer = require('nodemailer');

// OPCIÓN 2: Usando Resend (más fácil, gratis hasta 3,000 emails/mes)
// npm install resend
// const { Resend } = require('resend');
// const resend = new Resend('re_YOUR_API_KEY');

// OPCIÓN 3: Usando SendGrid (gratis hasta 100 emails/día)
// npm install @sendgrid/mail
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
    // Solo permitir POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ success: false, message: 'Método no permitido' })
        };
    }

    // Habilitar CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
        'Content-Type': 'application/json'
    };

    try {
        const { nombre, email, telefono, servicio, mensaje } = JSON.parse(event.body);

        // Validar datos
        if (!nombre || !email || !mensaje) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Campos requeridos faltantes'
                })
            };
        }

        // ============================================
        // OPCIÓN 1: Enviar email con Nodemailer
        // ============================================
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'contacto@cyc-soluciones.com',
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

        // ============================================
        // OPCIÓN 2: Enviar email con Resend (más fácil)
        // ============================================
        /*
        await resend.emails.send({
            from: 'contacto@cyc-soluciones.com',
            to: 'contacto@cyc-soluciones.com',
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
        */

        // ============================================
        // OPCIÓN 3: Guardar en base de datos (opcional)
        // ============================================
        // Puedes usar MongoDB, PostgreSQL, etc.
        // Ejemplo con MongoDB Atlas (gratis):
        /*
        const { MongoClient } = require('mongodb');
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const db = client.db('cyc-contacts');
        await db.collection('contacts').insertOne({
            nombre, email, telefono, servicio, mensaje,
            fecha: new Date()
        });
        await client.close();
        */

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Mensaje enviado correctamente'
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                message: 'Error al procesar el mensaje'
            })
        };
    }
};

// ============================================
// VARIABLES DE ENTORNO NECESARIAS
// ============================================
// Crea archivo .env.local (para desarrollo):
// EMAIL_USER=tu-email@gmail.com
// EMAIL_PASS=tu-contraseña-de-aplicacion
//
// En Vercel/Netlify, agrega estas variables en:
// Settings > Environment Variables
// ============================================
