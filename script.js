/*
   RAMANI S - Interactive Client-Side Portfolio Engine
   Features: Typewriter, Particles background, Skills Intersection Observer, Scrollspy Active Menu, Form Verification
*/

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initialize Particles.js Background
    if (typeof particlesJS !== "undefined") {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 900 } },
                "color": { "value": "#00f2fe" },
                "shape": { "type": "circle" },
                "opacity": { 
                    "value": 0.15, 
                    "random": true, 
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.05, "sync": false } 
                },
                "size": { 
                    "value": 2, 
                    "random": true, 
                    "anim": { "enable": false } 
                },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#00f2fe", 
                    "opacity": 0.08, 
                    "width": 1 
                },
                "move": { 
                    "enable": true, 
                    "speed": 1.2, 
                    "direction": "none", 
                    "random": true, 
                    "straight": false, 
                    "out_mode": "out", 
                    "bounce": false 
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "bubble" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "bubble": { "distance": 150, "size": 3, "duration": 2, "opacity": 0.3, "speed": 3 },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }

    // 2. Typewriter Text Engine
    const roles = ["Aspiring Software Engineer.", "Machine Learning Enthusiast.", "Frontend Developer."];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeTarget = document.getElementById("type-target");

    function type() {
        if (!typeTarget) return;
        
        const currentRole = roles[roleIdx];
        
        if (isDeleting) {
            typeTarget.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typeTarget.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIdx === currentRole.length) {
            // Pause at full word
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            // Short pause before writing next word
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typing loop
    setTimeout(type, 1000);

    // 3. Navigation Scrolling Interactions (Scrolled State & Scrollspy Active)
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section, header");

    window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY;

        // Sticky Nav styling
        if (scrollPos > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Active link tracking (Scrollspy)
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });

    // 4. Mobile Menu Toggle Drawer
    const hamburger = document.getElementById("hamburger-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Close menu on selecting item
        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // 5. Skills Progress Bar Visual Entrance (Intersection Observer)
    const skillSection = document.getElementById("skills");
    const progressBars = document.querySelectorAll(".progress-bar");

    if (skillSection && progressBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute("data-width");
                        bar.style.width = targetWidth;
                    });
                    // Unobserve after running once
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        skillsObserver.observe(skillSection);
    }

    // 6. Contact Form Validation & Mock Submission
    const contactForm = document.getElementById("contact-form");
    const statusMsg = document.getElementById("form-status-message");

    if (contactForm && statusMsg) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("form-name").value.trim();
            const email = document.getElementById("form-email").value.trim();
            const subject = document.getElementById("form-subject").value.trim();
            const message = document.getElementById("form-message").value.trim();
            const submitBtn = document.getElementById("form-submit-btn");

            // Simple client-side checks
            if (!name || !email || !subject || !message) {
                showStatus("Please fill in all inputs before submitting.", "error");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showStatus("Please provide a valid email format.", "error");
                return;
            }

            // Simulate form submission loader
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
            statusMsg.className = "form-status";
            statusMsg.textContent = "";

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
                
                showStatus("Thank you! Your message has been sent successfully.", "success");
                contactForm.reset();
            }, 1800);
        });
    }

    function showStatus(text, type) {
        if (!statusMsg) return;
        statusMsg.textContent = text;
        statusMsg.className = `form-status ${type}`;
    }

    // 7. Back-to-Top Widget Trigger
    const backToTopBtn = document.getElementById("back-to-top-btn");

    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 8. ScrollReveal Initializations
    if (typeof ScrollReveal !== "undefined") {
        ScrollReveal().reveal('.reveal', {
            delay: 150,
            distance: '30px',
            origin: 'bottom',
            duration: 800,
            interval: 150,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            mobile: true
        });
    }
});
