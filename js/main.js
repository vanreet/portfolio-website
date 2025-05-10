// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out'
});

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Form Validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Reset previous errors
            const errorElements = form.querySelectorAll('[id$="-error"]');
            errorElements.forEach(el => {
                el.classList.add('hidden');
                el.textContent = '';
            });

            // Get form values
            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const subject = form.querySelector('#subject').value.trim();
            const message = form.querySelector('#message').value.trim();

            let isValid = true;

            // Validate name
            if (name.length < 2) {
                const nameError = form.querySelector('#name-error');
                nameError.textContent = 'Name must be at least 2 characters long';
                nameError.classList.remove('hidden');
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                const emailError = form.querySelector('#email-error');
                emailError.textContent = 'Please enter a valid email address';
                emailError.classList.remove('hidden');
                isValid = false;
            }

            // Validate subject
            if (subject.length < 5) {
                const subjectError = form.querySelector('#subject-error');
                subjectError.textContent = 'Subject must be at least 5 characters long';
                subjectError.classList.remove('hidden');
                isValid = false;
            }

            // Validate message
            if (message.length < 10) {
                const messageError = form.querySelector('#message-error');
                messageError.textContent = 'Message must be at least 10 characters long';
                messageError.classList.remove('hidden');
                isValid = false;
            }

            if (isValid) {
                // Show success message
                const successMessage = form.querySelector('#form-success');
                successMessage.textContent = 'Message sent successfully!';
                successMessage.classList.remove('hidden');

                // Reset form
                form.reset();

                // Hide success message after 3 seconds
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 3000);
            }
        });
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Lightbox Functionality
const lightbox = document.querySelector('.lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.portfolio-item img').forEach(image => {
    image.addEventListener('click', () => {
        const imgSrc = image.getAttribute('src');
        const imgAlt = image.getAttribute('alt');
        
        lightboxContent.innerHTML = `
            <img src="${imgSrc}" alt="${imgAlt}" class="w-full h-auto rounded-lg">
        `;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
}

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Video Player Controls
document.querySelectorAll('.video-container').forEach(container => {
    const video = container.querySelector('video');
    if (video) {
        container.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    }
}); 