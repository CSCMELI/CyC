// ============================================
// EJEMPLO: FORMSPREE
// ============================================
// INSTRUCCIONES:
// 1. Ve a https://formspree.io y regístrate
// 2. Crea un nuevo formulario
// 3. Copia tu Form ID (ejemplo: xjvqkzpn)
// 4. Reemplaza 'YOUR_FORM_ID' abajo con tu ID
// 5. Reemplaza el código del setTimeout en script.js con este código
// ============================================

// Reemplaza esta línea en script.js (línea ~360):
// fetch('https://formspree.io/f/YOUR_FORM_ID', {
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => {
    if (response.ok) {
        formMessage.textContent = '¡Mensaje enviado con éxito! Te responderemos pronto.';
        formMessage.className = 'form-message show success';
        formMessage.setAttribute('role', 'alert');
        contactForm.reset();
        
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    } else {
        throw new Error('Error en el servidor');
    }
})
.catch(error => {
    formMessage.textContent = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
    formMessage.className = 'form-message show error';
    formMessage.setAttribute('role', 'alert');
})
.finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
