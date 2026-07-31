// ============================================================
// BROAD EXPERIENTIAL LTD - COMPLETE JAVASCRIPT
// Fixed top bar / navbar scroll behavior
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initNavigation();
    initHeroSlider();
    initScrollReveal();
    initFAQ();
    initPortfolioFilter();
    initLightbox();
    initContactForm();
    initSmoothScroll();
});

// ============================================================
// PRELOADER
// ============================================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                if (preloader && preloader.parentNode) {
                    preloader.style.display = 'none';
                }
            }, 500);
        }, 600);
    });
}

// ============================================================
// NAVIGATION - Fixed scroll behavior
// ============================================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const topBar = document.getElementById('topBar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Scroll effect
    if (navbar && topBar) {
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const isScrollingDown = scrollY > lastScrollY;
                    const isPastThreshold = scrollY > 100;
                    
                    // Navbar shadow on scroll
                    if (scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                    
                    // Hide top bar and move navbar up when scrolling down past threshold
                    if (isPastThreshold && isScrollingDown) {
                        if (!topBar.classList.contains('hidden')) {
                            topBar.classList.add('hidden');
                            navbar.classList.add('top-hidden');
                        }
                    } 
                    // Show top bar and move navbar down when scrolling up
                    else if (!isScrollingDown) {
                        if (topBar.classList.contains('hidden')) {
                            topBar.classList.remove('hidden');
                            navbar.classList.remove('top-hidden');
                        }
                    }
                    
                    // Always show both when at top of page
                    if (scrollY <= 10) {
                        topBar.classList.remove('hidden');
                        navbar.classList.remove('top-hidden');
                    }
                    
                    lastScrollY = scrollY;
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    } else if (navbar) {
        // Fallback if no top bar
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
        
        function openMenu() {
            navMenu.classList.add('active');
            navToggle.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeMenu() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        navToggle.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        overlay.addEventListener('click', closeMenu);
        
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu on window resize if desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    // Active link highlighting based on current page
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            const linkPage = href.split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else if (currentPage === '' && linkPage === 'index.html') {
                link.classList.add('active');
            }
        }
    });
}

// ============================================================
// HERO SLIDER
// ============================================================
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length < 2) return;
    
    let current = 0;
    let interval;
    let isPaused = false;
    
    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        if (!isPaused) {
            current = (current + 1) % slides.length;
            showSlide(current);
        }
    }
    
    function startSlider() {
        isPaused = false;
        interval = setInterval(nextSlide, 5000);
    }
    
    function stopSlider() {
        isPaused = true;
        clearInterval(interval);
    }
    
    showSlide(0);
    startSlider();
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', stopSlider);
        hero.addEventListener('mouseleave', startSlider);
        hero.addEventListener('touchstart', stopSlider, { passive: true });
        hero.addEventListener('touchend', () => setTimeout(startSlider, 2000));
    }
}

// ============================================================
// SCROLL REVEAL ANIMATION
// ============================================================
function initScrollReveal() {
    const elements = document.querySelectorAll(
        '.fade-in-up, .service-card-home, .testimonial-card-home, ' +
        '.service-detail-card, .portfolio-card, .value-card, .process-step, ' +
        '.contact-info-card, .contact-form-wrapper, .about-feature-item'
    );
    
    if (elements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.12, 
        rootMargin: '0px 0px -30px 0px' 
    });
    
    elements.forEach(el => {
        if (!el.classList.contains('fade-in-up')) {
            el.classList.add('fade-in-up');
        }
        observer.observe(el);
    });
}

// ============================================================
// FAQ ACCORDION
// ============================================================
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length === 0) return;
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ============================================================
// PORTFOLIO FILTER
// ============================================================
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-card');
    
    if (filterBtns.length === 0 || items.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Filter items with animation
            items.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    });
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        if (item.style.opacity === '0') {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
}

// ============================================================
// LIGHTBOX (Portfolio Page)
// ============================================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    const img = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    let images = [];
    let currentIndex = 0;
    
    function open(imageList, index) {
        if (!imageList || imageList.length === 0) return;
        
        images = imageList;
        currentIndex = Math.max(0, Math.min(index, images.length - 1));
        updateImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function close() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { 
            if (img) img.src = ''; 
        }, 300);
    }
    
    function updateImage() {
        if (img && images[currentIndex]) {
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = images[currentIndex];
                img.style.opacity = '1';
            }, 150);
        }
    }
    
    function next() {
        if (images.length === 0) return;
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }
    
    function prev() {
        if (images.length === 0) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }
    
    // Button event listeners
    if (closeBtn) closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        close();
    });
    if (prevBtn) prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prev();
    });
    if (nextBtn) nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        next();
    });
    
    // Click outside to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) close();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                close();
                break;
            case 'ArrowRight':
                next();
                break;
            case 'ArrowLeft':
                prev();
                break;
        }
    });
    
    // Touch swipe support
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    lightbox.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) next();
            else prev();
        }
    });
    
    // Portfolio card click handlers
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('click', () => {
            const cardImg = card.querySelector('img');
            if (!cardImg) return;
            
            const visibleCards = Array.from(document.querySelectorAll('.portfolio-card'))
                .filter(c => c.style.display !== 'none' && c.querySelector('img'));
            
            const imageList = visibleCards.map(c => c.querySelector('img').src);
            const index = imageList.indexOf(cardImg.src);
            
            open(imageList, index >= 0 ? index : 0);
        });
    });
}

// ============================================================
// SERVICE DATA FOR MODALS
// ============================================================
const serviceDetails = {
    'vehicle-branding': {
        title: 'Vehicle Branding',
        description: 'We turn your fleet into powerful, moving billboards that capture attention across East Africa. Our premium vehicle wraps use 3M vinyl for durability and vibrant color retention.',
        tags: ['Full Fleet Branding', 'Partial Wraps', 'Magnetic Signage', '3M Premium Vinyl', 'Bus Branding', 'Truck Branding'],
        gallery: [
            '../images/car_branding/carbranding3.jpg',
            '../images/car_branding/carbranding2.webp',
            '../images/car_branding/carbranding4.jpg',
            '../images/car_branding/carbranding5.jpg',
            '../images/car_branding/carbranding6.jpg',
            '../images/car_branding/lorrybranding.jpeg',
            '../images/car_branding/van3.jpeg',
            '../images/car_branding/van.jpeg',
            '../images/car_branding/van1.jpeg',
            '../images/car_branding/van2.jpeg',
            '../images/car_branding/pepsi.jpeg',
            '../images/car_branding/pepsi1.jpeg'
        ]
    },
    'shop-branding': {
        title: 'Shop & Retail Branding',
        description: 'Create immersive retail environments that enhance customer experience and strengthen brand recall. We handle complete shop makeovers from storefront to interior graphics.',
        tags: ['Storefront Branding', 'Interior Graphics', 'Window Displays', 'Retail Fixtures', 'POP Displays'],
        gallery: [
            '../images/shop_branding/sunking_shopbranding.jfif'
        ]
    },
    'wall-branding': {
        title: 'Wall & Outdoor Branding',
        description: 'Large-scale wall murals and outdoor branding that transform ordinary spaces into powerful brand statements. Weather-resistant materials ensure long-lasting impact visible to thousands daily.',
        tags: ['Building Murals', 'Wall Wraps', 'Perimeter Branding', 'Weather-Resistant', 'High-Visibility'],
        gallery: [
            '../images/wall_branding/vihiga_wallbranding1.jfif',
            '../images/wall_branding/wallbranding1.jpeg'
        ]
    },
    'printing': {
        title: 'Printing & Design',
        description: 'High-quality digital, screen, and offset printing services. From business cards to large-format banners, we deliver exceptional print quality for all your marketing collateral needs.',
        tags: ['Digital Printing', 'Screen/Offset', 'Large Format', 'Graphic Design', 'Annual Reports', 'Brochures'],
        gallery: [
            '../images/print/print1.webp'
        ]
    },
    'merchandise': {
        title: 'Merchandise Branding',
        description: 'Custom-branded merchandise that keeps your brand top-of-mind. We offer a wide range of promotional items including apparel, corporate gifts, and accessories customized to your specifications.',
        tags: ['Apparel Branding', 'Promotional Items', 'Corporate Gifts', 'Heat Press', 'Embroidery', 'Mugs & Caps'],
        gallery: [
            '../images/merch/merch_4.jpg',
            '../images/merch/merch_3.jpg',
            '../images/merch/merch_1.jpg',
            '../images/merch/merch_2.jpg',
            '../images/merch/cap1.jpeg',
            '../images/merch/calendar1.jpeg'
        ]
    },
    'experiential': {
        title: 'Experiential Activations',
        description: 'Immersive brand experiences and event activations that create memorable connections with your target audience. From product launches to large-scale road shows across East Africa.',
        tags: ['Product Launches', 'Trade Shows', 'Road Shows', 'Sampling Campaigns', 'Event Management'],
        gallery: [
            '../images/experiential_promotions/captain_morgan.jpg',
            '../images/experiential_promotions/captain_morgan1.jpg',
            '../images/experiential_promotions/tusker_1.jpg',
            '../images/experiential_promotions/tusker_2.jpg',
            '../images/experiential_promotions/tusker_3.jpg',
            '../images/experiential_promotions/exp_1.jpg',
            '../images/experiential_promotions/exp_2.jpg',
            '../images/experiential_promotions/exp_3.jpg',
            '../images/experiential_promotions/exp_4.jpg'
        ]
    },
    'office-branding': {
        title: 'Office Branding',
        description: 'Professional office environments that reflect your corporate culture. From reception areas to meeting rooms, we create spaces that impress clients and inspire your team daily.',
        tags: ['Reception Branding', 'Wayfinding Signage', 'Wall Graphics', 'Glass Manifestation', 'Meeting Rooms'],
        gallery: [
            '../images/office_branding.jpg'
        ]
    },
    'signages': {
        title: 'Signage Solutions',
        description: 'High-impact indoor and outdoor signage including illuminated signs, directional signs, and custom fabrication. Make a lasting impression with professional signage that commands attention.',
        tags: ['Illuminated Signs', 'Directional Signage', 'Safety Signage', 'Custom Fabrication', '3D Lettering'],
        gallery: [
            'https://images.unsplash.com/photo-1553531384-cc0ac1ae1f0d?w=600&q=80'
        ]
    }
};

// ============================================================
// SERVICE MODAL FUNCTIONS
// ============================================================
function openServiceModal(serviceId) {
    const data = serviceDetails[serviceId];
    if (!data) return;
    
    const modal = document.getElementById('serviceModal');
    const content = document.getElementById('serviceModalContent');
    
    if (!modal || !content) return;
    
    const galleryHTML = data.gallery.map((img, i) => `
        <div class="gallery-thumb" onclick="event.stopPropagation(); openModalLightbox('${img}', ${i}, '${serviceId}')">
            <img src="${img}" alt="${data.title} - Image ${i + 1}" loading="lazy">
        </div>
    `).join('');
    
    content.innerHTML = `
        <div class="service-modal-header">
            <h2>${data.title}</h2>
            <p>${data.description}</p>
        </div>
        <div class="service-modal-tags">
            ${data.tags.map(tag => `<span>${tag}</span>`).join('')}
        </div>
        <h3 style="margin-bottom: 16px; font-size: 18px; font-weight: 700;">Project Gallery</h3>
        <div class="service-modal-gallery">
            ${galleryHTML}
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modal.dataset.serviceId = serviceId;
    
    // Scroll modal to top
    const container = modal.querySelector('.service-modal-container');
    if (container) {
        container.scrollTop = 0;
    }
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================================
// MODAL LIGHTBOX
// ============================================================
let modalLightboxImages = [];
let modalLightboxIndex = 0;

function openModalLightbox(imgSrc, index, serviceId) {
    const data = serviceDetails[serviceId];
    if (!data) return;
    
    modalLightboxImages = data.gallery;
    modalLightboxIndex = index;
    
    let lightbox = document.getElementById('modalLightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'modal-lightbox';
        lightbox.id = 'modalLightbox';
        lightbox.innerHTML = `
            <button class="modal-lightbox-close" id="modalLightboxClose"><i class="fas fa-times"></i></button>
            <button class="modal-lightbox-prev" id="modalLightboxPrev"><i class="fas fa-chevron-left"></i></button>
            <button class="modal-lightbox-next" id="modalLightboxNext"><i class="fas fa-chevron-right"></i></button>
            <img src="" alt="Gallery Image" id="modalLightboxImg">
            <div class="modal-lightbox-counter" id="modalLightboxCounter"></div>
        `;
        document.body.appendChild(lightbox);
        
        // Close button
        document.getElementById('modalLightboxClose').addEventListener('click', closeModalLightbox);
        
        // Navigation buttons
        document.getElementById('modalLightboxPrev').addEventListener('click', () => {
            modalLightboxIndex = (modalLightboxIndex - 1 + modalLightboxImages.length) % modalLightboxImages.length;
            updateModalLightboxImage();
        });
        
        document.getElementById('modalLightboxNext').addEventListener('click', () => {
            modalLightboxIndex = (modalLightboxIndex + 1) % modalLightboxImages.length;
            updateModalLightboxImage();
        });
        
        // Click outside to close
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeModalLightbox();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    closeModalLightbox();
                    break;
                case 'ArrowRight':
                    modalLightboxIndex = (modalLightboxIndex + 1) % modalLightboxImages.length;
                    updateModalLightboxImage();
                    break;
                case 'ArrowLeft':
                    modalLightboxIndex = (modalLightboxIndex - 1 + modalLightboxImages.length) % modalLightboxImages.length;
                    updateModalLightboxImage();
                    break;
            }
        });
    }
    
    updateModalLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateModalLightboxImage() {
    const img = document.getElementById('modalLightboxImg');
    const counter = document.getElementById('modalLightboxCounter');
    
    if (img && modalLightboxImages[modalLightboxIndex]) {
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = modalLightboxImages[modalLightboxIndex];
            img.style.opacity = '1';
        }, 150);
    }
    
    if (counter) {
        counter.textContent = `${modalLightboxIndex + 1} / ${modalLightboxImages.length}`;
    }
}

function closeModalLightbox() {
    const lightbox = document.getElementById('modalLightbox');
    if (!lightbox) return;
    
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================================
// CONTACT FORM
// ============================================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const service = document.getElementById('service')?.value;
        const message = document.getElementById('message')?.value.trim();
        
        // Validation
        if (!name || !email || !service || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate submission
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            setTimeout(() => {
                showNotification('Message sent successfully! We will get back to you within 24 hours.', 'success');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHTML;
            }, 1500);
        }
    });
}

// ============================================================
// NOTIFICATION TOAST
// ============================================================
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.classList.remove('show');
        setTimeout(() => existing.remove(), 300);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
    notification.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // Auto remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// ============================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 100;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ 
                    top: position, 
                    behavior: 'smooth' 
                });
            }
        });
    });
}

// ============================================================
// EVENT DELEGATION FOR MODALS
// ============================================================
document.addEventListener('click', function(e) {
    // Close service modal on backdrop click
    if (e.target.classList.contains('service-modal-backdrop')) {
        closeServiceModal();
    }
    
    // Close service modal on close button (delegated)
    if (e.target.closest('.service-modal-close')) {
        closeServiceModal();
    }
});

// Keyboard shortcut to close modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const serviceModal = document.getElementById('serviceModal');
        if (serviceModal && serviceModal.classList.contains('active')) {
            closeServiceModal();
        }
    }
});

// ============================================================
// INITIALIZATION ON LOAD
// ============================================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                if (preloader && preloader.parentNode) {
                    preloader.style.display = 'none';
                }
            }, 500);
        }, 500);
    }
});

// Add this inside the DOMContentLoaded event:
initClientsCarousel();

// Add this function after initSmoothScroll():
// ============================================================
// CLIENTS CAROUSEL
// ============================================================
function initClientsCarousel() {
    const track = document.getElementById('clientsTrack');
    if (!track) return;
    
    // Pause animation when not visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                track.style.animationPlayState = 'running';
            } else {
                track.style.animationPlayState = 'paused';
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(track);
    
    // Pause on hover
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
    
    // Touch device support
    track.addEventListener('touchstart', () => {
        track.style.animationPlayState = 'paused';
    }, { passive: true });
    
    track.addEventListener('touchend', () => {
        setTimeout(() => {
            track.style.animationPlayState = 'running';
        }, 2000);
    });
}