document.addEventListener('DOMContentLoaded', function() {
    
    const typewriterText = document.querySelector('.typewriter-text');
    const phrases = [
        'Business Analytics Graduate',
        'Data-Driven Problem Solver',
        'Process Optimization Expert',
        'Aspiring Project Manager'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    if (typewriterText) {
        typeWriter();
    }

    const navbar = document.querySelector('.custom-navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.querySelector('.progress-bar')) {
                    const progressBars = entry.target.querySelectorAll('.progress-bar');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                    });
                }
                
                if (entry.target.classList.contains('stagger-fade-in')) {
                    const siblings = entry.target.parentElement.querySelectorAll('.stagger-fade-in');
                    siblings.forEach((sibling, index) => {
                        setTimeout(() => {
                            sibling.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up, .slide-up, .stagger-fade-in, #skills');
    animatedElements.forEach(el => observer.observe(el));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const toast = document.createElement('div');
            toast.className = 'position-fixed top-0 end-0 p-3';
            toast.style.zIndex = '9999';
            toast.innerHTML = `
                <div class="toast show" role="alert" style="background: linear-gradient(135deg, #10b981, #059669); color: white; border: none;">
                    <div class="toast-header" style="background: rgba(255,255,255,0.1); color: white; border: none;">
                        <strong class="me-auto">Success!</strong>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                    </div>
                    <div class="toast-body">
                        Message sent successfully! I'll get back to you soon.
                    </div>
                </div>
            `;
            document.body.appendChild(toast);
            
            contactForm.reset();
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        });
    }

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shape');
        
        parallaxElements.forEach((el, index) => {
            const speed = (index + 1) * 0.5;
            el.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    const experienceBadge = document.querySelector('.experience-badge h3');
    if (experienceBadge) {
        const observerBadge = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'countUp 2s ease-out';
                    observerBadge.unobserve(entry.target);
                }
            });
        });
        observerBadge.observe(experienceBadge);
    }
});