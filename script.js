// Complete Cinematic Interactive Experience
class CinematicExperience {
    constructor() {
        this.isInitialized = false;
        this.isMusicPlaying = false;
        this.currentTheme = 'dark';
        this.isFullscreen = false;
        this.demoActive = false;
        this.currentTestimonial = 0;
        this.userAuthenticated = false;
        
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupCustomCursor();
        this.setupAudio();
        this.setupParticles();
        this.setupEventListeners();
        this.setupAnimations();
        this.setupScrollEffects();
        this.setupTestimonials();
        this.setupServiceData();
        this.setupQuickActions();
    }

    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressFill = document.querySelector('.progress-fill');
        const loadingText = document.querySelector('.loading-text');
        const details = document.querySelectorAll('.detail');
        
        const steps = [
            "Initializing Security Protocols...",
            "Encrypting Connection...",
            "Loading AI Modules...",
            "Establishing Secure Channel...",
            "Calibrating Defense Systems...",
            "Ready to Launch..."
        ];

        let progress = 0;
        let currentStep = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        this.startMainExperience();
                    }, 1000);
                }, 500);
            }
            
            progressFill.style.width = `${progress}%`;
            
            // Update loading text based on progress
            if (progress >= (currentStep + 1) * (100 / steps.length)) {
                currentStep = Math.min(currentStep + 1, steps.length - 1);
                loadingText.textContent = steps[currentStep];
                
                // Animate details
                if (details[currentStep - 1]) {
                    details[currentStep - 1].style.animation = 'none';
                    setTimeout(() => {
                        details[currentStep - 1].style.animation = 'detailFade 3s infinite';
                    }, 10);
                }
            }
        }, 200);
    }

    setupCustomCursor() {
        // Create custom cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);

        this.cursorFollower = document.createElement('div');
        this.cursorFollower.className = 'cursor-follower';
        document.body.appendChild(this.cursorFollower);

        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                this.cursorFollower.style.left = e.clientX + 'px';
                this.cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Add hover effects
        const interactiveElements = document.querySelectorAll('button, a, .feature-card, .nav-link, .service-card, .pricing-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursorFollower.style.transform = 'scale(1.2)';
                this.playSound('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursorFollower.style.transform = 'scale(1)';
            });
        });

        // Click effects
        document.addEventListener('click', () => {
            this.cursor.style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.cursor.style.transform = 'scale(1)';
            }, 100);
        });
    }

    setupAudio() {
        this.backgroundMusic = document.getElementById('background-music');
        this.clickSound = document.getElementById('click-sound');
        this.hoverSound = document.getElementById('hover-sound');
        this.successSound = document.getElementById('success-sound');
        this.errorSound = document.getElementById('error-sound');
        
        // Set volume
        this.backgroundMusic.volume = 0.3;
        this.clickSound.volume = 0.5;
        this.hoverSound.volume = 0.3;
        this.successSound.volume = 0.6;
        this.errorSound.volume = 0.6;

        // Try to play background music (will be muted until user interaction)
        this.backgroundMusic.play().catch(e => {
            console.log('Autoplay prevented:', e);
        });
        this.backgroundMusic.pause();
    }

    setupParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 100, density: { enable: true, value_area: 800 } },
                    color: { value: "#00f3ff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#00f3ff",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    }
                }
            });
        }
    }

    setupEventListeners() {
        // Music toggle
        document.getElementById('music-toggle').addEventListener('click', () => {
            this.toggleMusic();
        });
        document.getElementById('mobile-music-toggle').addEventListener('click', () => {
            this.toggleMusic();
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });
        document.getElementById('mobile-theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Fullscreen toggle
        document.getElementById('fullscreen-toggle').addEventListener('click', () => {
            this.toggleFullscreen();
        });

        // Mobile menu
        document.getElementById('mobile-menu-btn').addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Login/Signup buttons
        document.getElementById('login-btn').addEventListener('click', () => {
            this.showLoginModal();
        });

        document.getElementById('signup-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.showSignupModal();
        });

        document.getElementById('login-from-signup').addEventListener('click', (e) => {
            e.preventDefault();
            this.showLoginModal();
        });

        // Main action buttons
        document.getElementById('start-trial').addEventListener('click', () => {
            this.startTrial();
        });

        document.getElementById('watch-demo').addEventListener('click', () => {
            this.showDemoModal();
        });

        document.getElementById('learn-more').addEventListener('click', () => {
            this.scrollToSection('features');
        });

        document.getElementById('explore-all-features').addEventListener('click', () => {
            this.showFeatureOverview();
        });

        // Feature buttons
        document.querySelectorAll('.feature-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.closest('.feature-btn').dataset.action;
                const feature = e.target.closest('.feature-card').dataset.feature;
                this.handleFeatureAction(action, feature);
            });
        });

        // Service buttons
        document.querySelectorAll('.service-actions .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const service = e.target.closest('.btn').dataset.service;
                this.handleServiceAction(service);
            });
        });

        // Pricing toggle
        document.getElementById('pricing-toggle').addEventListener('change', (e) => {
            this.togglePricing(e.target.checked);
        });

        // Pricing plan selection
        document.querySelectorAll('.pricing-select').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const plan = e.target.closest('.pricing-select').dataset.plan;
                this.selectPricingPlan(plan);
            });
        });

        // Testimonial controls
        document.getElementById('testimonial-prev').addEventListener('click', () => {
            this.prevTestimonial();
        });
        document.getElementById('testimonial-next').addEventListener('click', () => {
            this.nextTestimonial();
        });
        document.querySelectorAll('.carousel-dots .dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.showTestimonial(index);
            });
        });

        // Demo controls
        document.querySelectorAll('.demo-control-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const scenario = e.target.closest('.demo-control-btn').dataset.scenario;
                this.runDemoScenario(scenario);
            });
        });

        // Refresh scan
        document.getElementById('refresh-scan').addEventListener('click', () => {
            this.refreshSecurityScan();
        });

        // Form submissions
        document.getElementById('auth-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
        });

        document.getElementById('contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactForm();
        });

        // Password strength indicator
        document.getElementById('quantum-key').addEventListener('input', (e) => {
            this.updatePasswordStrength(e.target.value);
        });

        // Quick actions
        document.getElementById('quick-scan').addEventListener('click', () => {
            this.quickSecurityScan();
        });
        document.getElementById('quick-vpn').addEventListener('click', () => {
            this.toggleVPN();
        });
        document.getElementById('quick-support').addEventListener('click', () => {
            this.openLiveSupport();
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModals();
            });
        });

        // Close modal on background click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModals();
                }
            });
        });

        // Navigation links
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('href');
                this.scrollToSection(target.substring(1));
                this.closeMobileMenu();
            });
        });

        // Logo click
        document.getElementById('nav-logo').addEventListener('click', () => {
            this.scrollToSection('hero');
        });
    }

    setupAnimations() {
        // Animate stats
        this.animateStats();
        
        // Setup GSAP animations
        this.setupGSAPAnimations();

        // Update scan time
        this.updateScanTime();
        setInterval(() => {
            this.updateScanTime();
        }, 60000); // Update every minute
    }

    setupGSAPAnimations() {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Animate elements on scroll
        gsap.utils.toArray('.feature-card, .service-card, .pricing-card').forEach(card => {
            gsap.fromTo(card, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Parallax effect for hero elements
        gsap.to('.floating-shapes .shape', {
            y: (i, target) => -i * 20,
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "none"
        });

        // Animate trust bar logos
        gsap.to('.logo-item', {
            y: -5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            stagger: 0.2,
            ease: "sine.inOut"
        });
    }

    animateStats() {
        const statValues = document.querySelectorAll('.stat-value');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseFloat(target.dataset.target);
                    this.animateCounter(target, 0, finalValue, 2000);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statValues.forEach(stat => observer.observe(stat));
    }

    animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            if (element.textContent.includes('.')) {
                element.textContent = value.toFixed(1);
            } else {
                element.textContent = value;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    setupScrollEffects() {
        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.cinematic-nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(10, 10, 31, 0.95)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'rgba(10, 10, 31, 0.8)';
                nav.style.backdropFilter = 'blur(20px)';
            }
        });

        // Update active nav link
        window.addEventListener('scroll', () => {
            this.updateActiveNavLink();
        });
    }

    setupTestimonials() {
        this.testimonials = document.querySelectorAll('.testimonial-card');
        this.showTestimonial(0);
        
        // Auto-rotate testimonials
        setInterval(() => {
            this.nextTestimonial();
        }, 5000);
    }

    setupServiceData() {
        this.serviceData = {
            'data-erasure': {
                title: 'Data Erasure Service',
                description: 'Completely remove your personal information from the internet with our advanced data erasure technology.',
                features: [
                    'Automated monitoring of 500+ data broker sites',
                    'Continuous scanning and removal requests',
                    'Legal compliance and GDPR support',
                    'Real-time progress tracking',
                    'Priority removal for sensitive information'
                ],
                price: '$29/month'
            },
            'identity-cloaking': {
                title: 'Identity Cloaking',
                description: 'Generate unlimited virtual identities that are indistinguishable from real personas for complete online anonymity.',
                features: [
                    'Unlimited identity generation',
                    'Realistic profile creation',
                    'Secure identity storage',
                    'Automatic identity rotation',
                    'Cross-platform compatibility'
                ],
                price: '$49/month'
            },
            'privacy-analytics': {
                title: 'Privacy Analytics',
                description: 'Comprehensive insights into your digital footprint with real-time monitoring and actionable recommendations.',
                features: [
                    '24/7 digital footprint monitoring',
                    '50+ privacy metrics tracked',
                    'Real-time threat detection',
                    'Customizable alerts and reports',
                    'Expert privacy recommendations'
                ],
                price: '$39/month'
            }
        };
    }

    setupQuickActions() {
        // Add tooltips to quick actions
        const quickActions = document.querySelectorAll('.quick-action');
        quickActions.forEach(action => {
            const title = action.getAttribute('title');
            action.addEventListener('mouseenter', () => {
                this.showTooltip(action, title);
            });
            action.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    startMainExperience() {
        this.isInitialized = true;
        
        // Animate hero elements
        this.animateHero();
        
        // Show welcome notification
        this.showNotification('Security systems initialized. Welcome to IdentifyHub.', 'success');
    }

    animateHero() {
        const tl = gsap.timeline();
        
        tl.from('.hero-badge', {
            opacity: 0,
            y: -20,
            duration: 1
        })
        .from('.text-reveal', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        }, "-=0.5")
        .from('.hero-description', {
            opacity: 0,
            y: 20,
            duration: 1
        }, "-=0.3")
        .from('.hero-actions', {
            opacity: 0,
            y: 30,
            duration: 1
        }, "-=0.3")
        .from('.hero-stats', {
            opacity: 0,
            y: 30,
            duration: 1
        }, "-=0.3")
        .from('.hologram-card', {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: "back.out(1.7)"
        }, "-=0.5");
    }

    // Music Controls
    toggleMusic() {
        const musicBtn = document.getElementById('music-toggle');
        const mobileMusicBtn = document.getElementById('mobile-music-toggle');
        
        if (this.isMusicPlaying) {
            this.backgroundMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            mobileMusicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            this.isMusicPlaying = false;
        } else {
            this.backgroundMusic.play();
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            mobileMusicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            this.isMusicPlaying = true;
        }
        
        this.playSound('click');
    }

    // Theme Controls
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        
        if (this.currentTheme === 'light') {
            document.documentElement.style.setProperty('--dark', '#ffffff');
            document.documentElement.style.setProperty('--light', '#0a0a1f');
            document.documentElement.style.setProperty('--gray', '#666666');
            document.documentElement.style.setProperty('--gray-light', '#888888');
        } else {
            document.documentElement.style.setProperty('--dark', '#0a0a1f');
            document.documentElement.style.setProperty('--light', '#ffffff');
            document.documentElement.style.setProperty('--gray', '#8b8ba0');
            document.documentElement.style.setProperty('--gray-light', '#b8b8c8');
        }
        
        this.playSound('click');
        this.showNotification(`Theme switched to ${this.currentTheme} mode`, 'info');
    }

    // Fullscreen Controls
    toggleFullscreen() {
        if (!this.isFullscreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
            this.isFullscreen = true;
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            this.isFullscreen = false;
        }
        
        this.playSound('click');
    }

    // Mobile Menu
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('active');
        this.playSound('click');
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.remove('active');
    }

    // Modal Controls
    showLoginModal() {
        this.closeModals();
        document.getElementById('login-modal').classList.add('active');
        this.playSound('click');
    }

    showSignupModal() {
        this.closeModals();
        document.getElementById('signup-modal').classList.add('active');
        this.playSound('click');
    }

    showDemoModal() {
        this.closeModals();
        document.getElementById('demo-modal').classList.add('active');
        this.playSound('click');
        
        // Reset demo state
        this.resetDemo();
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        this.playSound('click');
    }

    // Navigation
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Main Actions
    startTrial() {
        this.playSound('click');
        
        // Show loading state
        const btn = document.getElementById('start-trial');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> INITIALIZING...';
        btn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> ACCESS GRANTED!';
            btn.style.background = 'linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.background = '';
                this.showSignupModal();
                this.showNotification('Free trial activated! Complete your registration.', 'success');
            }, 2000);
        }, 3000);
    }

    handleFeatureAction(action, feature) {
        this.playSound('click');
        
        if (action === 'demo') {
            this.showDemoModal();
        } else if (action === 'learn') {
            this.showFeatureInfo(feature);
        }
    }

    showFeatureInfo(feature) {
        const info = {
            biometric: {
                title: "Quantum Biometrics",
                description: "Our quantum biometric system uses multidimensional scanning to create a unique biological signature that's impossible to replicate or spoof."
            },
            ai: {
                title: "Neural AI Defense",
                description: "Self-learning artificial intelligence that continuously adapts to new threats and predicts attacks before they happen."
            },
            vpn: {
                title: "Quantum VPN",
                description: "Instantaneous global connectivity through our quantum-entangled server network with zero latency and maximum security."
            }
        };

        // Create floating info card
        const infoCard = document.createElement('div');
        infoCard.className = 'feature-info-card';
        infoCard.innerHTML = `
            <h4>${info[feature].title}</h4>
            <p>${info[feature].description}</p>
        `;
        
        document.body.appendChild(infoCard);
        
        // Animate in
        gsap.fromTo(infoCard, {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5
        });
        
        // Remove after delay
        setTimeout(() => {
            gsap.to(infoCard, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                onComplete: () => infoCard.remove()
            });
        }, 4000);
    }

    showFeatureOverview() {
        this.scrollToSection('features');
        this.showNotification('Exploring all security features...', 'info');
    }

    // Service Actions
    handleServiceAction(service) {
        this.playSound('click');
        
        if (service.includes('info')) {
            const serviceKey = service.replace('-info', '');
            this.showServiceInfo(serviceKey);
        } else {
            this.selectService(service);
        }
    }

    showServiceInfo(serviceKey) {
        if (!this.serviceData[serviceKey]) return;
        
        const service = this.serviceData[serviceKey];
        const modal = document.getElementById('service-info-modal');
        const title = document.getElementById('service-info-title');
        const content = document.getElementById('service-info-content');
        
        title.textContent = service.title;
        content.innerHTML = `
            <div class="service-info">
                <p class="service-description">${service.description}</p>
                <div class="service-price">${service.price}</div>
                <h4>Features:</h4>
                <ul class="service-features-list">
                    ${service.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
                <div class="service-actions-modal">
                    <button class="btn btn-primary" onclick="cinematicExp.selectService('${serviceKey}')">
                        <i class="fas fa-shopping-cart"></i>
                        Get Started
                    </button>
                </div>
            </div>
        `;
        
        this.closeModals();
        modal.classList.add('active');
    }

    selectService(service) {
        this.showNotification(`Added ${this.serviceData[service]?.title || service} to cart`, 'success');
        this.playSound('success');
        
        // Simulate adding to cart
        const quickScan = document.getElementById('quick-scan');
        quickScan.style.background = 'var(--accent)';
        quickScan.style.color = 'var(--darker)';
        setTimeout(() => {
            quickScan.style.background = '';
            quickScan.style.color = '';
        }, 2000);
    }

    // Pricing Controls
    togglePricing(isYearly) {
        const prices = document.querySelectorAll('.price');
        prices.forEach(price => {
            const monthly = price.dataset.monthly;
            const yearly = price.dataset.yearly;
            price.textContent = isYearly ? yearly : monthly;
            price.innerHTML += '<span>/mo</span>';
        });
        
        this.playSound('click');
    }

    selectPricingPlan(plan) {
        const planNames = {
            basic: 'Basic',
            professional: 'Professional',
            enterprise: 'Enterprise'
        };
        
        this.showNotification(`${planNames[plan]} plan selected!`, 'success');
        this.playSound('success');
        
        // Show signup modal with pre-selected plan
        this.showSignupModal();
        
        // You could pre-fill the plan selection in the signup form
        setTimeout(() => {
            const reasonSelect = document.getElementById('signup-reason');
            if (reasonSelect) {
                reasonSelect.value = 'business';
            }
        }, 100);
    }

    // Testimonial Controls
    showTestimonial(index) {
        this.testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
        
        // Update dots
        document.querySelectorAll('.carousel-dots .dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        this.currentTestimonial = index;
    }

    nextTestimonial() {
        const nextIndex = (this.currentTestimonial + 1) % this.testimonials.length;
        this.showTestimonial(nextIndex);
    }

    prevTestimonial() {
        const prevIndex = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
        this.showTestimonial(prevIndex);
    }

    // Demo Controls
    resetDemo() {
        const sphere = document.getElementById('security-sphere');
        const threatLevel = document.getElementById('threat-level');
        const protectionLevel = document.getElementById('protection-level');
        const activeShields = document.getElementById('active-shields');
        const demoLog = document.getElementById('demo-log');
        
        sphere.style.animation = 'sphereRotate 10s linear infinite';
        sphere.style.borderColor = 'var(--primary)';
        threatLevel.textContent = 'LOW';
        threatLevel.style.color = 'var(--accent)';
        protectionLevel.textContent = '100%';
        activeShields.textContent = '8/8';
        demoLog.innerHTML = '<div class="log-entry">System initialized. All shields active.</div>';
        
        this.demoActive = false;
    }

    runDemoScenario(scenario) {
        if (this.demoActive) return;
        this.demoActive = true;
        
        const sphere = document.getElementById('security-sphere');
        const threatLevel = document.getElementById('threat-level');
        const protectionLevel = document.getElementById('protection-level');
        const activeShields = document.getElementById('active-shields');
        const demoLog = document.getElementById('demo-log');
        
        // Reset sphere animation
        sphere.style.animation = 'none';
        
        const scenarios = {
            phishing: {
                threat: 'HIGH',
                protection: '95%',
                shields: '7/8',
                color: 'var(--warning)',
                log: 'Phishing attempt detected and neutralized',
                animation: () => {
                    gsap.to(sphere, {
                        borderColor: '#ff4444',
                        duration: 0.5,
                        yoyo: true,
                        repeat: 3
                    });
                }
            },
            malware: {
                threat: 'MEDIUM',
                protection: '98%',
                shields: '8/8',
                color: 'var(--warning)',
                log: 'Malware signature identified and quarantined',
                animation: () => {
                    gsap.to(sphere, {
                        scale: 1.2,
                        duration: 0.3,
                        yoyo: true,
                        repeat: 2
                    });
                }
            },
            tracking: {
                threat: 'LOW',
                protection: '100%',
                shields: '8/8',
                color: 'var(--accent)',
                log: 'Tracking cookies blocked and removed',
                animation: () => {
                    gsap.to(sphere, {
                        rotation: 360,
                        duration: 2,
                        ease: "power2.inOut"
                    });
                }
            },
            ddos: {
                threat: 'CRITICAL',
                protection: '85%',
                shields: '6/8',
                color: '#ff0000',
                log: 'DDoS attack mitigated. Traffic rerouted.',
                animation: () => {
                    gsap.to(sphere, {
                        borderColor: '#ff0000',
                        boxShadow: '0 0 30px #ff0000',
                        duration: 0.2,
                        yoyo: true,
                        repeat: 5
                    });
                }
            }
        };
        
        const scenarioData = scenarios[scenario];
        if (!scenarioData) return;
        
        // Update stats
        threatLevel.textContent = scenarioData.threat;
        threatLevel.style.color = scenarioData.color;
        protectionLevel.textContent = scenarioData.protection;
        activeShields.textContent = scenarioData.shields;
        
        // Add log entry
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${scenarioData.log}`;
        demoLog.appendChild(logEntry);
        demoLog.scrollTop = demoLog.scrollHeight;
        
        // Run animation
        scenarioData.animation();
        
        // Restore after delay
        setTimeout(() => {
            sphere.style.animation = 'sphereRotate 10s linear infinite';
            sphere.style.borderColor = 'var(--primary)';
            sphere.style.boxShadow = 'none';
            this.demoActive = false;
        }, 3000);
        
        this.playSound('click');
    }

    // Security Scan
    refreshSecurityScan() {
        const btn = document.getElementById('refresh-scan');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';
        btn.disabled = true;
        
        // Simulate scan
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            this.updateScanTime();
            this.showNotification('Security scan completed. All systems secure.', 'success');
            this.playSound('success');
        }, 2000);
    }

    updateScanTime() {
        const scanTime = document.getElementById('last-scan-time');
        scanTime.textContent = 'Just now';
    }

    quickSecurityScan() {
        this.showNotification('Quick security scan initiated...', 'info');
        this.playSound('click');
        
        // Simulate scan
        setTimeout(() => {
            this.showNotification('Quick scan complete. No threats detected.', 'success');
            this.playSound('success');
        }, 1500);
    }

    toggleVPN() {
        const vpnBtn = document.getElementById('quick-vpn');
        const isActive = vpnBtn.style.background === 'var(--accent)';
        
        if (isActive) {
            vpnBtn.style.background = '';
            vpnBtn.style.color = '';
            this.showNotification('VPN disconnected', 'info');
        } else {
            vpnBtn.style.background = 'var(--accent)';
            vpnBtn.style.color = 'var(--darker)';
            this.showNotification('VPN connected securely', 'success');
        }
        
        this.playSound('click');
    }

    openLiveSupport() {
        this.showNotification('Connecting to live support...', 'info');
        this.playSound('click');
        
        // Simulate connection
        setTimeout(() => {
            this.showNotification('Support agent connected. How can we help?', 'success');
        }, 2000);
    }

    // Form Handlers
    handleLogin() {
        const form = document.getElementById('auth-form');
        const btn = form.querySelector('button');
        
        this.playSound('click');
        
        // Show loading state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AUTHENTICATING...';
        btn.disabled = true;
        
        // Simulate authentication
        setTimeout(() => {
            this.userAuthenticated = true;
            btn.innerHTML = '<i class="fas fa-check"></i> ACCESS GRANTED';
            btn.style.background = 'linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%)';
            
            setTimeout(() => {
                this.closeModals();
                this.showNotification('Authentication successful! Welcome back.', 'success');
                this.playSound('success');
                
                // Reset form
                btn.innerHTML = '<i class="fas fa-lock-open"></i> AUTHENTICATE';
                btn.disabled = false;
                btn.style.background = '';
                form.reset();
                
                // Update UI for authenticated user
                this.updateUIForAuthenticatedUser();
            }, 1500);
        }, 2000);
    }

    handleSignup() {
        const form = document.getElementById('signup-form');
        const btn = form.querySelector('button');
        
        this.playSound('click');
        
        // Show loading state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PROCESSING...';
        btn.disabled = true;
        
        // Simulate signup process
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> REQUEST SENT';
            btn.style.background = 'linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%)';
            
            setTimeout(() => {
                this.closeModals();
                this.showNotification('Access request submitted! We\'ll contact you shortly.', 'success');
                this.playSound('success');
                
                // Reset form
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> REQUEST ACCESS';
                btn.disabled = false;
                btn.style.background = '';
                form.reset();
            }, 1500);
        }, 2000);
    }

    handleContactForm() {
        const form = document.getElementById('contact-form');
        const btn = form.querySelector('button');
        
        this.playSound('click');
        
        // Show loading state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
        btn.disabled = true;
        
        // Simulate sending
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> MESSAGE SENT';
            btn.style.background = 'linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%)';
            
            setTimeout(() => {
                this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                this.playSound('success');
                
                // Reset form
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> SEND MESSAGE';
                btn.disabled = false;
                btn.style.background = '';
                form.reset();
            }, 1500);
        }, 2000);
    }

    updatePasswordStrength(password) {
        const strengthBar = document.querySelector('.strength-bar');
        let strength = 0;
        
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        
        strengthBar.style.setProperty('--strength-width', `${strength}%`);
        
        if (strength < 50) {
            strengthBar.style.background = 'var(--warning)';
        } else if (strength < 75) {
            strengthBar.style.background = 'var(--accent)';
        } else {
            strengthBar.style.background = 'var(--success)';
        }
    }

    updateUIForAuthenticatedUser() {
        const loginBtn = document.getElementById('login-btn');
        loginBtn.innerHTML = '<i class="fas fa-user-shield"></i> DASHBOARD';
        loginBtn.onclick = () => {
            this.showNotification('Redirecting to dashboard...', 'info');
            // In a real app, this would redirect to the dashboard
        };
        
        this.showNotification('Welcome back! Your security dashboard is ready.', 'success');
    }

    // Notification System
    showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        container.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Tooltip System
    showTooltip(element, text) {
        let tooltip = document.getElementById('custom-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'custom-tooltip';
            tooltip.className = 'custom-tooltip';
            document.body.appendChild(tooltip);
        }
        
        tooltip.textContent = text;
        tooltip.style.display = 'block';
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) + 'px';
        tooltip.style.top = rect.top - 40 + 'px';
    }

    hideTooltip() {
        const tooltip = document.getElementById('custom-tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }

    // Sound System
    playSound(type) {
        try {
            const sound = this[`${type}Sound`];
            if (sound) {
                sound.currentTime = 0;
                sound.play().catch(e => {
                    // Ignore play errors (usually due to autoplay restrictions)
                });
            }
        } catch (e) {
            console.log('Sound play failed:', e);
        }
    }

    // Utility Methods
    animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            if (element.textContent.includes('.')) {
                element.textContent = value.toFixed(1);
            } else {
                element.textContent = value;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

// Add tooltip styles
const tooltipStyles = `
    .custom-tooltip {
        position: fixed;
        background: var(--dark);
        color: var(--light);
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.8rem;
        white-space: nowrap;
        z-index: 10000;
        border: 1px solid var(--primary);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        transform: translateX(-50%);
        display: none;
    }
    
    .custom-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: var(--primary);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = tooltipStyles;
document.head.appendChild(styleSheet);

// Initialize the cinematic experience when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cinematicExp = new CinematicExperience();
});

// Add global error handler for better user experience
window.addEventListener('error', (e) => {
    console.error('Application error:', e);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause music
        if (window.cinematicExp && window.cinematicExp.isMusicPlaying) {
            window.cinematicExp.backgroundMusic.pause();
        }
    } else {
        // Page is visible, resume music if it was playing
        if (window.cinematicExp && window.cinematicExp.isMusicPlaying) {
            window.cinematicExp.backgroundMusic.play().catch(console.error);
        }
    }
});