// Navbar scroll effect
const header = document.getElementById('header');
const scrollToTop = document.querySelector('.scroll-to-top');
const whatsappFloating = document.querySelector('.btn-whatsapp-floating');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroHeight = hero ? hero.offsetHeight : 0;
    const btnPrimary = document.querySelector('.hero .btn-primary');
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Mostrar/ocultar flecha scroll to top y botón WhatsApp
    // Ocultar botón Contáctanos cuando se hace scroll fuera del hero
    if (currentScroll > heroHeight * 0.8) {
        if (scrollToTop) scrollToTop.classList.add('show');
        if (whatsappFloating) whatsappFloating.classList.add('show');
        if (btnPrimary) btnPrimary.style.opacity = '0';
        if (btnPrimary) btnPrimary.style.pointerEvents = 'none';
    } else {
        if (scrollToTop) scrollToTop.classList.remove('show');
        if (whatsappFloating) whatsappFloating.classList.remove('show');
        if (btnPrimary) btnPrimary.style.opacity = '1';
        if (btnPrimary) btnPrimary.style.pointerEvents = 'auto';
    }
    
    lastScroll = currentScroll;
});

// Menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const menuOverlay = document.getElementById('menu-overlay');
const navLinks = document.querySelectorAll('.nav-link');

function openMenu() {
    navMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Open menu
if (navToggle) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        openMenu();
    });
}

// Close menu
if (navClose) {
    navClose.addEventListener('click', () => {
        closeMenu();
    });
}

// Close menu when clicking on overlay
if (menuOverlay) {
    menuOverlay.addEventListener('click', () => {
        closeMenu();
    });
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// Smooth scroll for anchor links con mejor precisión para servicios
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const targetId = href.substring(1);
        const target = document.querySelector(href);
        
        // IDs de servicios en el grid
        const serviceIds = ['soporte-tecnico', 'instalacion', 'videovigilancia', 'reparacion', 'desarrollo', 'servidores'];
        
        if (target) {
            const headerOffset = 100; // Offset para el header
            
            // Si es un servicio del grid, hacer scroll más preciso
            if (serviceIds.includes(targetId)) {
                // Calcular posición considerando el viewport
                const targetRect = target.getBoundingClientRect();
                const absoluteTargetTop = targetRect.top + window.pageYOffset;
                const offsetPosition = absoluteTargetTop - headerOffset;
                
                // Scroll suave
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Agregar efecto visual después del scroll
                setTimeout(() => {
                    highlightServiceCard(targetId);
                }, 600);
            } else {
                // Para otras secciones (nosotros, contacto, etc.)
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Función para destacar una tarjeta de servicio
function highlightServiceCard(serviceId) {
    // Remover highlight de todas las tarjetas
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Agregar highlight a la tarjeta objetivo
    const targetCard = document.getElementById(serviceId);
    if (targetCard) {
        targetCard.classList.add('highlighted');
        
        // Remover el highlight después de 3 segundos
        setTimeout(() => {
            targetCard.classList.remove('highlighted');
        }, 3000);
        
        // Scroll adicional para centrar mejor la tarjeta si es necesario
        const cardRect = targetCard.getBoundingClientRect();
        const cardCenter = cardRect.top + (cardRect.height / 2);
        const viewportCenter = window.innerHeight / 2;
        const scrollAdjustment = cardCenter - viewportCenter;
        
        if (Math.abs(scrollAdjustment) > 50) {
            window.scrollBy({
                top: scrollAdjustment,
                behavior: 'smooth'
            });
        }
    }
}

// Manejar hash en la URL al cargar la página
window.addEventListener('load', () => {
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const serviceIds = ['soporte-tecnico', 'instalacion', 'videovigilancia', 'reparacion', 'desarrollo', 'servidores'];
        
        if (serviceIds.includes(hash)) {
            setTimeout(() => {
                const target = document.getElementById(hash);
                if (target) {
                    const headerOffset = 100;
                    const targetRect = target.getBoundingClientRect();
                    const absoluteTargetTop = targetRect.top + window.pageYOffset;
                    const offsetPosition = absoluteTargetTop - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    setTimeout(() => {
                        highlightServiceCard(hash);
                    }, 600);
                }
            }, 300);
        }
    }
});

// Active link highlighting on scroll (mejorado para incluir tarjetas de servicios)
const sections = document.querySelectorAll('section[id]');
const serviceIds = ['soporte-tecnico', 'instalacion', 'videovigilancia', 'reparacion', 'desarrollo', 'servidores'];

function scrollActive() {
    const scrollY = window.pageYOffset;
    const serviciosSection = document.getElementById('servicios');

    // Verificar secciones normales
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Verificar si estamos en la sección de servicios y qué tarjeta está visible
    if (serviciosSection) {
        const serviciosTop = serviciosSection.offsetTop;
        const serviciosBottom = serviciosTop + serviciosSection.offsetHeight;
        
        if (scrollY >= serviciosTop - 150 && scrollY <= serviciosBottom) {
            serviceIds.forEach(serviceId => {
                const serviceCard = document.getElementById(serviceId);
                if (serviceCard) {
                    const cardRect = serviceCard.getBoundingClientRect();
                    const cardTop = cardRect.top + window.pageYOffset;
                    const cardBottom = cardTop + cardRect.height;
                    const viewportTop = scrollY + 150;
                    const viewportBottom = scrollY + window.innerHeight - 100;
                    
                    // Si la tarjeta está visible en el viewport
                    if (cardTop < viewportBottom && cardBottom > viewportTop) {
                        document.querySelectorAll('.nav-link').forEach(link => {
                            if (link.getAttribute('href') === `#${serviceId}`) {
                                link.classList.add('active');
                            } else if (serviceIds.some(id => link.getAttribute('href') === `#${id}`)) {
                                link.classList.remove('active');
                            }
                        });
                    }
                }
            });
        }
    }
}

window.addEventListener('scroll', scrollActive);

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service sections
document.querySelectorAll('.service-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Animaciones para las tarjetas de servicios
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cardObserver.observe(card);
});

// Funcionalidad para botones "Más información" - Expandir/Contraer detalles
document.querySelectorAll('.service-card-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const card = this.closest('.service-card');
        const details = card.querySelector('.service-card-details');
        const isExpanded = this.getAttribute('data-expanded') === 'true';
        
        if (details) {
            if (isExpanded) {
                // Contraer
                details.classList.remove('expanded');
                this.setAttribute('data-expanded', 'false');
                this.setAttribute('aria-expanded', 'false');
                this.querySelector('.btn-text').textContent = 'Más información';
            } else {
                // Expandir
                details.classList.add('expanded');
                this.setAttribute('data-expanded', 'true');
                this.setAttribute('aria-expanded', 'true');
                this.querySelector('.btn-text').textContent = 'Menos información';
                
                // Scroll suave para asegurar que la tarjeta expandida sea visible
                setTimeout(() => {
                    const cardRect = card.getBoundingClientRect();
                    const cardBottom = cardRect.bottom;
                    const viewportHeight = window.innerHeight;
                    
                    // Si la tarjeta expandida se sale del viewport, hacer scroll
                    if (cardBottom > viewportHeight - 50) {
                        const scrollAmount = cardBottom - viewportHeight + 100;
                        window.scrollBy({
                            top: scrollAmount,
                            behavior: 'smooth'
                        });
                    }
                }, 200);
            }
        }
    });
    
    // Agregar atributos ARIA para accesibilidad
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', btn.closest('.service-card').id + '-details');
});

// Formulario de Contacto
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evitamos el envío nativo

        const formMessage = document.getElementById('form-message');
        const submitBtn = contactForm.querySelector('.form-submit-btn');
        const originalBtnText = submitBtn.innerHTML;

        // Deshabilitar botón durante el envío
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';

        // Crear FormData para enviar correctamente a Netlify
        const formData = new FormData(contactForm);
        const encodedData = new URLSearchParams(formData).toString();

        // Enviar a Netlify usando fetch (siempre a la ruta raíz)
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encodedData
        })
        .then(response => {
            // Redirigir a la página personalizada de agradecimiento
            // Netlify procesará el formulario en segundo plano
            if (response.ok || response.status === 200 || response.status === 302) {
                window.location.href = 'mensaje-enviado.html';
            } else {
                // Si hay error, redirigir de todas formas (Netlify procesará el formulario)
                window.location.href = 'mensaje-enviado.html';
            }
        })
        .catch(() => {
            // En caso de error (puede ser desarrollo local), redirigir de todas formas
            // En producción, Netlify procesará el formulario automáticamente
            window.location.href = 'mensaje-enviado.html';
        });
    });

    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.setAttribute('aria-invalid', 'true');
            } else {
                this.setAttribute('aria-invalid', 'false');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.hasAttribute('aria-invalid') && this.getAttribute('aria-invalid') === 'true') {
                if (this.value.trim()) {
                    this.setAttribute('aria-invalid', 'false');
                }
            }
        });
    });
}


// Mejorar accesibilidad: Navegación por teclado en tarjetas
document.querySelectorAll('.service-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
    card.setAttribute('aria-labelledby', card.id + '-title');
    
    // Agregar ID al título para aria-labelledby
    const title = card.querySelector('h3');
    if (title && !title.id) {
        title.id = card.id + '-title';
    }
    
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const btn = this.querySelector('.service-card-btn');
            if (btn) {
                btn.click();
            }
        }
    });
});

// Mejorar accesibilidad: Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#nosotros';
skipLink.className = 'skip-link';
skipLink.textContent = 'Saltar al contenido principal';
skipLink.setAttribute('aria-label', 'Saltar al contenido principal');
if (document.body) {
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Actualizar aria-controls dinámicamente en los botones
document.querySelectorAll('.service-card-btn').forEach(btn => {
    const card = btn.closest('.service-card');
    if (card) {
        const cardId = card.id;
        const detailsId = cardId + '-details';
        const details = card.querySelector('.service-card-details');
        if (details && !details.id) {
            details.id = detailsId;
        }
        if (!btn.getAttribute('aria-controls')) {
            btn.setAttribute('aria-controls', detailsId);
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", function () {
    const email = document.getElementById("email").value;
    document.getElementById("reply-to").value = email;
  });
});

