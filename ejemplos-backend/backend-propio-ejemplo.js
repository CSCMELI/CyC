// ============================================
// EJEMPLO: BACKEND PROPIO (Node.js/PHP/Python)
// ============================================
// INSTRUCCIONES:
// 1. Crea tu servidor backend (ver ejemplos en GUIA_BACKEND.md)
// 2. Asegúrate de que tu servidor esté corriendo
// 3. Reemplaza '/api/contact' con la URL de tu servidor
//    Ejemplo: 'http://localhost:3000/api/contact'
//    Ejemplo producción: 'https://tudominio.com/api/contact'
// 4. Reemplaza el código del setTimeout en script.js con este código
// ============================================

// Reemplaza esta línea en script.js (línea ~360):
fetch('/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => {
    if (!response.ok) {
        throw new Error('Error en el servidor');
    }
    return response.json();
})
.then(data => {
    if (data.success) {
        formMessage.textContent = '¡Mensaje enviado con éxito! Te responderemos pronto.';
        formMessage.className = 'form-message show success';
        formMessage.setAttribute('role', 'alert');
        contactForm.reset();
        
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    } else {
        throw new Error(data.message || 'Error desconocido');
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
