// ============================================
// EJEMPLO: EMAILJS
// ============================================
// INSTRUCCIONES:
// 1. Ve a https://www.emailjs.com y regístrate
// 2. Crea un servicio de email (Gmail, Outlook, etc.)
// 3. Crea una plantilla de email
// 4. Obtén tu Service ID, Template ID y Public Key
// 5. Agrega esto en index.html antes de </body>:
//    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
//    <script>emailjs.init("YOUR_PUBLIC_KEY");</script>
// 6. Reemplaza el código del setTimeout en script.js con este código
// ============================================

// Reemplaza esta línea en script.js (línea ~360):
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    from_name: formData.nombre,
    from_email: formData.email,
    phone: formData.telefono || 'No proporcionado',
    service: formData.servicio || 'No especificado',
    message: formData.mensaje
})
.then(() => {
    formMessage.textContent = '¡Mensaje enviado con éxito! Te responderemos pronto.';
    formMessage.className = 'form-message show success';
    formMessage.setAttribute('role', 'alert');
    contactForm.reset();
    
    setTimeout(() => {
        formMessage.classList.remove('show');
    }, 5000);
})
.catch(() => {
    formMessage.textContent = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
    formMessage.className = 'form-message show error';
    formMessage.setAttribute('role', 'alert');
})
.finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
