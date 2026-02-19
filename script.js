/*  
   ISVRA TECH - JAVASCRIPT
    */

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initContactForm();
    updateActiveNavLink();
});

// Handle scroll events
window.addEventListener('scroll', function() {
    handleNavbarScroll();
    updateActiveNavLink();
});

/* 
   NAVIGATION
    */

/**
 * Initialize navigation functionality
 * - Hamburger menu toggle
 * - Mobile menu close on link click
 */
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/**
 * Handle navbar styling on scroll
 * - Add background and blur effect when scrolling
 * - Remove effect when at top
 */
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/**
 * Update active navigation link based on current scroll position
 * - Highlights the current page section
 */
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    let currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* 
   SCROLL ANIMATIONS
    */

/**
 * Initialize Intersection Observer for fade-in animations
 * - Animates elements as they come into view
 * - Uses CSS classes to trigger animations
 */
function initScrollAnimations() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is in view, animation already applied via CSS
                // This observer ensures we don't need to add classes dynamically
            }
        });
    }, options);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/* 
   CONTACT FORM
    */

/**
 * Initialize contact form functionality
 * - Form submission handling
 * - Validation
 * - Success message display
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate form
            if (!validateForm()) {
                return;
            }

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Simulate form submission
            submitForm(data);
        });
    }
}

/**
 * Validate contact form
 * - Check required fields
 * - Validate email format
 * - Show error messages
 */
function validateForm() {
    const form = document.getElementById('contactForm');
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const service = form.querySelector('#service').value;
    const timeline = form.querySelector('#timeline').value;
    const message = form.querySelector('#message').value.trim();

    // Clear previous error messages

    clearErrorMessages();

    let isValid = true;

    // Validate name
    if (name.length < 2) {
        showError('name', 'Please enter a valid name');
        isValid = false;
    }

    // Validate email
    if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate service selection
    if (!service) {
        showError('service', 'Please select a service');
        isValid = false;
    }

    // Validate timeline selection
    if (!timeline) {
        showError('timeline', 'Please select a timeline');
        isValid = false;
    }

    // Validate message
    if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

/**
 * Check if email format is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show error message for form field
 */
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ff6b6b';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    field.parentElement.appendChild(errorElement);
    field.style.borderColor = '#ff6b6b';
}

/**
 * Clear error messages from form
 */
function clearErrorMessages() {
    const form = document.getElementById('contactForm');
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());

    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => input.style.borderColor = '');
}

/**
 * Handle form submission
 * - Show success message
 * - Reset form
 */
function submitForm(data) {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // In a real application, you would send the data to a server here
    // For now, we'll just show a success message
    console.log('Form submitted with data:', data);

    // Hide form
    form.style.display = 'none';

    // Show success message
    if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Reset form after 3 seconds (optional)
    setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        if (successMessage) {
            successMessage.style.display = 'none';
        }
    }, 5000);
}

/* 
   SMOOTH SCROLLING
    */

/**
 * Enable smooth scrolling for anchor links
 * - Native CSS scroll-behavior handles this
 * - Fallback JavaScript implementation if needed
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

/* 
   UTILITY FUNCTIONS
    */

/**
 * Debounce function to limit function calls
 * Useful for scroll/resize events
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

/**
 * Throttle function to limit function calls
 * Useful for scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* 
   PERFORMANCE OPTIMIZATION
    */

/**
 * Lazy load images (if implemented)
 * Use native lazy loading for modern browsers
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
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

        images.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Preload critical resources
 * Improves perceived performance
 */
function preloadResources() {
    // Preload fonts
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
}

/* 
   ACCESSIBILITY
    */

/**
 * Improve keyboard navigation
 * - Add focus styles to interactive elements
 * - Ensure keyboard navigation works
 */
function initAccessibility() {
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-blue)';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

/* 
   LOCAL STORAGE
    */

/**
 * Save user preferences to localStorage
 * - Theme preference
 * - User settings
 */
function savePreference(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn('Could not save preference:', error);
    }
}

/**
 * Load user preferences from localStorage
 */
function loadPreference(key, defaultValue) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
        console.warn('Could not load preference:', error);
        return defaultValue;
    }
}

/* 
   ANALYTICS & TRACKING
    */

/**
 * Track user interactions
 * - Form submissions
 * - Button clicks
 * - Page views
 */
function initAnalytics() {
    // Track page view
    if (window.location.pathname) {
        console.log('Page viewed:', window.location.pathname);
    }

    // Track button clicks
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const text = this.textContent;
            console.log('Button clicked:', text);
        });
    });
}

/* 
   ERROR HANDLING
    */

/**
 * Global error handler
 * Log errors for debugging
 */
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

/* 
   INITIALIZATION
    */

// Call initialization functions
document.addEventListener('DOMContentLoaded', function() {
    preloadResources();
    initAccessibility();
    initAnalytics();
});

// Log initialization complete
console.log('ISVRA Tech website initialized successfully');
