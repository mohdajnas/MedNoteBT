

// MediNoteBT Interactive Brochure JavaScript

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBvRCss6PagzzU0Dj1jJ3JNh1Yf0PrFzp8",
  authDomain: "medinotebt.firebaseapp.com",
  projectId: "medinotebt",
  storageBucket: "medinotebt.firebasestorage.app",
  messagingSenderId: "984374779633",
  appId: "1:984374779633:web:b7c4aacbe3b8c71ac6d350",
  measurementId: "G-GDW70TBSRY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeNavigation();
    initializeScrollAnimations();
    initializeWorkflowAnimations();
    initializeFormHandling();
    initializeHoverEffects();
    initializeParallaxEffects();
    initializeHeroButtons();
});




// Hero button functionality
function initializeHeroButtons() {
    const requestDemoBtn = document.querySelector('.hero__button');
    const learnMoreBtn = document.querySelector('.btn--outline');
    
    if (requestDemoBtn) {
        requestDemoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 70; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const solutionSection = document.querySelector('#solution');
            if (solutionSection) {
                const offsetTop = solutionSection.offsetTop - 70; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Navigation functionality
function initializeNavigation() {
    const nav = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Header background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.problem__card, .benefit__card, .solution__content, .section-header');
    animatableElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}



// Workflow step animations
function initializeWorkflowAnimations() {
    const workflowSteps = document.querySelectorAll('.workflow__step');
    
    const workflowObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200); // Stagger animation
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    workflowSteps.forEach(step => {
        workflowObserver.observe(step);
    });
    
    // Add interactive step highlighting
    workflowSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Form handling
function initializeFormHandling() {
    const demoForm = document.querySelector('.demo-form');
    
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleDemoFormSubmission(this);
        });
    }
    
    // Add real-time form validation
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidationError);
    });
    
    // Fix dropdown styling and ensure options are visible
    const roleSelect = document.querySelector('select.form-control');
    if (roleSelect) {
        // Ensure proper styling for dropdown options
        roleSelect.style.color = '#1e293b';
        roleSelect.style.backgroundColor = '#ffffff';
        
        // Add focus styling
        roleSelect.addEventListener('focus', function() {
            this.style.borderColor = '#3b82f6';
            this.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
        });
        
        roleSelect.addEventListener('blur', function() {
            this.style.borderColor = '#cbd5e1';
            this.style.boxShadow = 'none';
        });
    }
}

// Replace the existing handleDemoFormSubmission function with this:
async function handleDemoFormSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    submitButton.textContent = 'Scheduling...';
    submitButton.disabled = true;
    
    try {
        // Get form data
        const formData = {
            name: form.querySelector('input[type="text"]').value,
            email: form.querySelector('input[type="email"]').value,
            organization: form.querySelector('input[placeholder*="Organization"]').value,
            role: form.querySelector('select').value,
            phone: form.querySelector('input[type="tel"]')?.value || '',
            message: form.querySelector('textarea')?.value || '',
            submittedAt: serverTimestamp(),
            status: 'pending'
        };
        
        // Save to Firebase
        const docRef = await addDoc(collection(db, 'demoRequests'), formData);
        console.log('Demo request saved with ID:', docRef.id);
        
        showSuccessMessage();
        form.reset();
    } catch (error) {
        console.error('Error saving demo request:', error);
        showErrorMessage('Failed to submit request. Please try again.');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Add this new function for error messages
function showErrorMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        ">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <svg style="width: 20px; height: 20px;" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                    <div style="font-weight: 600;">Error</div>
                    <div style="font-size: 0.875rem; opacity: 0.9;">${message}</div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.firstElementChild.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.firstElementChild.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    return isValid;
}

function validateInput(e) {
    const field = e.target;
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(field, 'This field is required');
    } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        showFieldError(field, 'Please enter a valid email address');
    } else {
        clearFieldError(field);
    }
}

function clearValidationError(e) {
    clearFieldError(e.target);
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#dc2626';
    field.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#dc2626';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        ">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <svg style="width: 20px; height: 20px;" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                    <div style="font-weight: 600;">Demo Request Submitted!</div>
                    <div style="font-size: 0.875rem; opacity: 0.9;">We'll contact you within 24 hours.</div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.firstElementChild.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.firstElementChild.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Interactive hover effects
function initializeHoverEffects() {
    // Card hover effects
    const cards = document.querySelectorAll('.card, .problem__card, .benefit__card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Hero mockup interaction
    const heroMockup = document.querySelector('.hero__mockup');
    if (heroMockup) {
        heroMockup.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.05)';
        });
        
        heroMockup.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(10deg) scale(1)';
        });
    }
}

// Parallax effects
function initializeParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Hero background parallax
        const heroBackground = document.querySelector('.hero__background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
        
        // Workflow step stagger animation based on scroll
        const workflowSteps = document.querySelectorAll('.workflow__step');
        workflowSteps.forEach((step, index) => {
            const stepTop = step.offsetTop;
            const stepHeight = step.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Calculate if step is in viewport
            if (scrolled + windowHeight > stepTop && scrolled < stepTop + stepHeight) {
                const progress = (scrolled + windowHeight - stepTop) / (windowHeight + stepHeight);
                const translateY = Math.max(0, (1 - progress) * 50);
                step.style.transform = `translateY(${translateY}px)`;
                step.style.opacity = Math.min(1, progress * 1.5);
            }
        });
    });
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

// Smooth scrolling polyfill for older browsers
function smoothScrollTo(target) {
    const targetPosition = target.offsetTop - 70;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Add CSS for animations that need to be defined in JavaScript
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav__link.active {
        color: var(--medical-blue-500);
    }
    
    .nav__link.active::after {
        width: 100%;
    }
    
    .workflow__step {
        transition: all 0.6s ease;
    }
    
    .card {
        transition: all 0.3s ease;
    }
    
    .btn {
        transition: all 0.3s ease;
    }
    
    /* Fix dropdown option visibility */
    select.form-control option {
        color: #1e293b !important;
        background-color: #ffffff !important;
        padding: 8px 12px;
        font-size: 14px;
    }
    
    select.form-control option:hover,
    select.form-control option:focus {
        background-color: #f1f5f9 !important;
        color: #1e293b !important;
    }
    
    @media (max-width: 768px) {
        .success-notification > div {
            right: 10px !important;
            left: 10px !important;
            transform: translateY(-100px) !important;
        }
        
        .success-notification > div.show {
            transform: translateY(0) !important;
        }
    }
`;

document.head.appendChild(style);

// Initialize intersection observer for better performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Performance optimization: Throttle scroll events
const throttledScrollHandler = debounce(function() {
    updateActiveNavigation();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// Add loading animation for the page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero elements on load
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroCTA = document.querySelector('.hero__cta');
    const heroMockup = document.querySelector('.hero__mockup');
    
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(30px)';
            heroTitle.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 100);
        }, 200);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.opacity = '0';
            heroSubtitle.style.transform = 'translateY(30px)';
            heroSubtitle.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 100);
        }, 400);
    }
    
    if (heroCTA) {
        setTimeout(() => {
            heroCTA.style.opacity = '0';
            heroCTA.style.transform = 'translateY(30px)';
            heroCTA.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                heroCTA.style.opacity = '1';
                heroCTA.style.transform = 'translateY(0)';
            }, 100);
        }, 600);
    }
    
    if (heroMockup) {
        setTimeout(() => {
            heroMockup.style.opacity = '0';
            heroMockup.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(20deg) translateY(50px)';
            heroMockup.style.transition = 'all 1s ease';
            
            setTimeout(() => {
                heroMockup.style.opacity = '1';
                heroMockup.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(10deg) translateY(0)';
            }, 100);
        }, 800);
    }
});