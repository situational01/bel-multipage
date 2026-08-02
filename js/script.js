// ============================================================
// BROAD EXPERIENTIAL LTD - MAIN JAVASCRIPT
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initNavigation();
    initHeroSlider();
    initScrollReveal();
    initClientsCarousel();
    initContactForm();
    initSmoothScroll();
});

// ============================================================
// PRELOADER
// ============================================================
function initPreloader() {
    var p = document.getElementById('preloader');
    if (!p) return;

    function hide() {
        p.classList.add('hidden');
        setTimeout(function() {
            if (p && p.parentNode) p.style.display = 'none';
        }, 400);
    }

    if (document.readyState === 'complete') {
        hide();
        return;
    }
    window.addEventListener('load', function() {
        setTimeout(hide, 300);
    });
    setTimeout(function() {
        if (!p.classList.contains('hidden')) hide();
    }, 2500);
}

// ============================================================
// NAVIGATION
// ============================================================
function initNavigation() {
    var n = document.getElementById('navbar'),
        t = document.getElementById('topBar'),
        tg = document.getElementById('navToggle'),
        m = document.getElementById('navMenu');

    // Scroll effects
    if (n && t) {
        var ls = window.scrollY,
            tk = false;
        window.addEventListener('scroll', function() {
            if (!tk) {
                requestAnimationFrame(function() {
                    var s = window.scrollY,
                        d = s > ls,
                        p = s > 100;
                    n.classList.toggle('scrolled', s > 50);
                    if (p && d) {
                        t.classList.add('hidden');
                        n.classList.add('top-hidden');
                    } else if (!d) {
                        t.classList.remove('hidden');
                        n.classList.remove('top-hidden');
                    }
                    if (s <= 10) {
                        t.classList.remove('hidden');
                        n.classList.remove('top-hidden');
                    }
                    ls = s;
                    tk = false;
                });
                tk = true;
            }
        });
    }

    // Mobile toggle
    if (tg && m) {
        var o = document.createElement('div');
        o.className = 'nav-overlay';
        document.body.appendChild(o);

        function op() {
            m.classList.add('active');
            tg.classList.add('active');
            o.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function cl() {
            m.classList.remove('active');
            tg.classList.remove('active');
            o.classList.remove('active');
            document.body.style.overflow = '';
        }

        tg.addEventListener('click', function() {
            m.classList.contains('active') ? cl() : op();
        });
        o.addEventListener('click', cl);
        m.querySelectorAll('.nav-link').forEach(function(l) {
            l.addEventListener('click', cl);
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') cl();
        });

        // Mobile dropdown toggle - stays open, doesn't close nav
        var dropdowns = document.querySelectorAll('.nav-item-dropdown');
        dropdowns.forEach(function(dd) {
            var link = dd.querySelector('.nav-link');
            if (link && window.innerWidth <= 768) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    dd.classList.toggle('active');
                    if (!m.classList.contains('active')) {
                        m.classList.add('active');
                        tg.classList.add('active');
                        o.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            }
        });

        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                dropdowns.forEach(function(dd) {
                    if (!dd.contains(e.target)) {
                        dd.classList.remove('active');
                    }
                });
            }
        });
    }

    // Active link
    var cp = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function(l) {
        var lp = l.getAttribute('href').split('/').pop() || l.getAttribute('href');
        if (lp === cp) l.classList.add('active');
    });
}

// ============================================================
// HERO SLIDER - INFINITE LOOP (3 second interval, 0.8s transition)
// ============================================================
function initHeroSlider() {
    var slides = document.querySelectorAll('.hero-slide');
    if (slides.length < 2) return;

    var currentIndex = 0;
    var intervalId = null;
    var isPaused = false;

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(function(slide) {
            slide.classList.remove('active');
        });
        // Add active class to current slide
        slides[index].classList.add('active');
    }

    // Function to go to the next slide (infinite loop)
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Function to go to the previous slide (infinite loop)
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // Start the autoplay
    function startAutoplay() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        intervalId = setInterval(nextSlide, 3000); // Change every 3 seconds
        isPaused = false;
    }

    // Stop the autoplay
    function stopAutoplay() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            isPaused = true;
        }
    }

    // Initialize with first slide
    showSlide(0);

    // Start autoplay
    startAutoplay();

    // Pause on hover
    var hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', function() {
            stopAutoplay();
        });
        hero.addEventListener('mouseleave', function() {
            if (isPaused) {
                startAutoplay();
            }
        });
    }

    // Optional: Pause on touch devices
    hero.addEventListener('touchstart', function() {
        stopAutoplay();
    });
    hero.addEventListener('touchend', function() {
        if (isPaused) {
            setTimeout(function() {
                startAutoplay();
            }, 3000); // Restart after 3 seconds of inactivity
        }
    });

    // Expose functions globally for manual control (optional)
    window.heroSlider = {
        next: nextSlide,
        prev: prevSlide,
        goTo: function(index) {
            if (index >= 0 && index < slides.length) {
                currentIndex = index;
                showSlide(currentIndex);
            }
        },
        play: startAutoplay,
        pause: stopAutoplay
    };
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initScrollReveal() {
    var els = document.querySelectorAll('.fade-in-up, .service-card-home, .testimonial-card-home, .blog-card, .goal-card');
    if (!els.length) return;

    var ob = new IntersectionObserver(function(es) {
        es.forEach(function(e) {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                ob.unobserve(e.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    });
    els.forEach(function(el) {
        if (!el.classList.contains('fade-in-up')) el.classList.add('fade-in-up');
        ob.observe(el);
    });
}

// ============================================================
// CLIENTS CAROUSEL
// ============================================================
function initClientsCarousel() {
    var t = document.getElementById('clientsTrack');
    if (!t) return;

    var clients = [
        { name: 'Sunking', logo: 'images/clients/sunking.png', desc: 'Affordable Solar Systems' },
        { name: 'World Vision', logo: 'images/clients/world_vision.png', desc: 'Helping children across 37 counties' },
        { name: 'Fresh Life', logo: 'images/clients/freshlife.jfif', desc: 'Clean Sanitation Solutions' },
        { name: 'M-Gas', logo: 'images/clients/m_gas_logo.jfif', desc: 'Clean cooking solutions' },
        { name: 'Telkom Kenya', logo: 'images/clients/telkom-kenya.webp', desc: 'Leading telecommunications' },
        { name: 'UIP Real Estate', logo: 'images/clients/uip_real_estate.jfif', desc: 'Trusted real estate' },
        { name: 'Rachier & Amollo', logo: 'images/clients/rachier_and_amollo.png', desc: 'Nationally recognized law firm' },
        { name: 'Sistema Bio', logo: 'images/clients/sistema_bio.png', desc: 'Biodigester solutions' }
    ];

    var html = '';
    for (var d = 0; d < 2; d++) {
        clients.forEach(function(c) {
            html += '<div class="client-item"><div class="client-logo-wrapper"><img src="' + c.logo + '" alt="' + c.name + '" loading="lazy"><div class="client-overlay"><p class="client-description">' + c.desc + '</p><button class="client-btn">View Work <i class="fas fa-arrow-right"></i></button></div></div><span class="client-name">' + c.name + '</span></div>';
        });
    }
    t.innerHTML = html;

    var ob = new IntersectionObserver(function(es) {
        es.forEach(function(e) {
            t.style.animationPlayState = e.isIntersecting ? 'running' : 'paused';
        });
    }, { threshold: 0.1 });
    ob.observe(t);

    t.addEventListener('mouseenter', function() {
        t.style.animationPlayState = 'paused';
    });
    t.addEventListener('mouseleave', function() {
        t.style.animationPlayState = 'running';
    });
}

// ============================================================
// CONTACT FORM
// ============================================================
function initContactForm() {
    var f = document.getElementById('contactForm');
    if (!f) return;

    f.addEventListener('submit', function(e) {
        e.preventDefault();
        var name = document.getElementById('name'),
            email = document.getElementById('email'),
            service = document.getElementById('service'),
            message = document.getElementById('message');

        if (!name.value.trim() || !email.value.trim() || !service.value || !message.value.trim()) {
            showNotification('Please fill all required fields.', 'error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            showNotification('Invalid email address.', 'error');
            return;
        }

        var btn = f.querySelector('button[type="submit"]');
        if (btn) {
            btn.disabled = true;
            var orig = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            setTimeout(function() {
                showNotification('Message sent successfully!', 'success');
                f.reset();
                btn.disabled = false;
                btn.innerHTML = orig;
            }, 1500);
        }
    });
}

// ============================================================
// NOTIFICATION
// ============================================================
function showNotification(msg, type) {
    var existing = document.querySelector('.notification');
    if (existing) {
        existing.classList.remove('show');
        setTimeout(function() {
            existing.remove();
        }, 300);
    }

    var n = document.createElement('div');
    n.className = 'notification notification-' + type;
    n.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i> ' + msg;
    document.body.appendChild(n);
    requestAnimationFrame(function() {
        n.classList.add('show');
    });
    setTimeout(function() {
        n.classList.remove('show');
        setTimeout(function() {
            if (n.parentNode) n.remove();
        }, 300);
    }, 4000);
}

// ============================================================
// SMOOTH SCROLL
// ============================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
        a.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            var t = document.querySelector(href);
            if (t) {
                e.preventDefault();
                window.scrollTo({
                    top: t.getBoundingClientRect().top + window.scrollY - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================================
// KEYBOARD CONTROLS FOR HERO SLIDER (Optional)
// ============================================================
document.addEventListener('keydown', function(e) {
    // Only if hero slider exists
    if (typeof window.heroSlider !== 'undefined') {
        if (e.key === 'ArrowRight') {
            window.heroSlider.next();
            // Reset autoplay timer
            window.heroSlider.pause();
            setTimeout(function() {
                window.heroSlider.play();
            }, 5000);
        }
        if (e.key === 'ArrowLeft') {
            window.heroSlider.prev();
            window.heroSlider.pause();
            setTimeout(function() {
                window.heroSlider.play();
            }, 5000);
        }
    }
});