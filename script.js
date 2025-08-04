// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Service booking modal functionality
const modal = document.getElementById('bookingModal');
const bookNowButtons = document.querySelectorAll('.book-now');
const closeModal = document.querySelector('.close');
const bookingServiceInput = document.getElementById('bookingService');

// Open modal when clicking "Book Now"
bookNowButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceName = button.getAttribute('data-service');
        bookingServiceInput.value = serviceName;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close modal when clicking X
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Schedule call button functionality
document.querySelectorAll('.schedule-call').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // In a real implementation, this would integrate with Calendly or similar
        alert('This would open a calendar booking system like Calendly. For demo purposes, please use the contact form below.');
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        alert(`Thank you ${data.name}! Your message has been received. I'll get back to you within 24 hours.`);
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// Booking form submission
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitButton = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Booking...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        alert(`Thank you ${data.name}! Your booking for "${data.service}" has been received. I'll contact you within 24 hours to discuss next steps.`);
        bookingForm.reset();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes('+')) {
                    counter.textContent = Math.ceil(current) + '+';
                } else if (counter.textContent.includes('%')) {
                    counter.textContent = Math.ceil(current) + '%';
                } else {
                    counter.textContent = Math.ceil(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent; // Reset to original
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('#about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const highlightNavigation = () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// Typing animation for hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
}

// Portfolio item hover effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const preview = item.querySelector('.project-preview');
        if (preview) {
            preview.style.transform = 'scale(1.05)';
            preview.style.transition = 'transform 0.3s ease';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const preview = item.querySelector('.project-preview');
        if (preview) {
            preview.style.transform = 'scale(1)';
        }
    });
});

// Add loading states for external links
document.querySelectorAll('a[href^="http"], a[href^="mailto"], a[href^="tel"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.href.includes('mailto:') || link.href.includes('tel:')) {
            return; // Allow default behavior for email and phone links
        }
        
        // Add loading state for external links
        const originalText = link.textContent;
        link.textContent = 'Opening...';
        
        setTimeout(() => {
            link.textContent = originalText;
        }, 2000);
    });
});

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance optimization: Debounce scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debouncing to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    highlightNavigation();
}, 10));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Navigate with arrow keys when modal is open
    if (modal.style.display === 'block') {
        const focusableElements = modal.querySelectorAll('input, textarea, button, select');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('DevCraft Studios website loaded successfully!');
    
    // Add smooth reveal animation to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            hero.style.transition = 'opacity 1s ease, transform 1s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
});
