document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.querySelector('header');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const profileImage = document.getElementById('profile-image');

    // Sticky Header
    function toggleStickyHeader() {
        if (window.scrollY > 0) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    // Toggle Mobile Menu
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    }

    // Close Mobile Menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Scroll to Top Button
    function toggleScrollTopBtn() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }

  
    function highlightActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    // Filter Projects
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {

            filterBtns.forEach(btn => btn.classList.remove('active'));
         
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    
                    // Add animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    // Hide after animation completes
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Form Validation
    function validateForm() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');
        
        let isValid = true;
        
        // Reset error messages
        nameError.textContent = '';
        emailError.textContent = '';
        subjectError.textContent = '';
        messageError.textContent = '';
        
        // Validate name
        if (name.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate subject
        if (subject.value.trim() === '') {
            subjectError.textContent = 'Subject is required';
            isValid = false;
        }
        
        // Validate message
        if (message.value.trim() === '') {
            messageError.textContent = 'Message is required';
            isValid = false;
        } else if (message.value.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters long';
            isValid = false;
        }
        
        return isValid;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Form is valid, show success message
            formSuccess.classList.add('show');
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 3000);
        }
    });

    // Scroll to top when clicking the button
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

 
    if (profileImage) {
        profileImage.addEventListener('mouseenter', () => {
            profileImage.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'scale(1) rotate(0)';
        });
    }

    // Event Listeners
    window.addEventListener('scroll', function() {
        toggleStickyHeader();
        toggleScrollTopBtn();
        highlightActiveNavLink();
    });
    
    hamburger.addEventListener('click', toggleMobileMenu);

    // Mobile Menu Styles (added via JS to prevent conflicts)
    const style = document.createElement('style');
    style.textContent = `
        @media screen and (max-width: 768px) {
            .hamburger {
                display: block;
                z-index: 101;
            }
            
            .hamburger.active .bar:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }
            
            .hamburger.active .bar:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active .bar:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
            
            .nav-links {
                position: fixed;
                top: 0;
                right: -100%;
                width: 70%;
                height: 100vh;
                background-color: var(--white);
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transition: 0.5s;
                box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                z-index: 100;
            }
            
            .nav-links.active {
                right: 0;
            }
            
            .nav-links li {
                margin: 15px 0;
            }
            
            .hero-content {
                flex-direction: column-reverse;
                text-align: center;
            }
            
            .hero-text {
                padding-right: 0;
                margin-top: 50px;
            }
            
            .hero-buttons {
                justify-content: center;
            }
            
            .social-icons {
                justify-content: center;
            }
            
            .about-content, .contact-content {
                flex-direction: column;
            }
            
            .about-image {
                margin-bottom: 30px;
                text-align: center;
            }
            
            .about-image img {
                max-width: 250px;
            }
            
            .contact-info {
                margin-bottom: 50px;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize - trigger events once on load
    toggleStickyHeader();
    toggleScrollTopBtn();
    highlightActiveNavLink();

    // Add animation to sections on scroll
    const animateOnScroll = function() {
        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition) {
                section.classList.add('animate');
            }
        });
    };

    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        section.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        #home {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);

    // Run animation check on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});