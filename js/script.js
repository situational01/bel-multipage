// ============================================================
// BROAD EXPERIENTIAL LTD - COMPLETE JAVASCRIPT
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initNavigation();
    initHeroSlider();
    initScrollReveal();
    initClientsCarousel();
    initFAQ();
    initPortfolioFilter();
    initLightbox();
    initContactForm();
    initSmoothScroll();
    initServiceModals();
});

// Preloader
function initPreloader() {
    var p = document.getElementById('preloader');
    if (!p) return;
    function hide() {
        p.classList.add('hidden');
        setTimeout(function() { if (p && p.parentNode) p.style.display = 'none'; }, 400);
    }
    if (document.readyState === 'complete') { hide(); return; }
    window.addEventListener('load', function() { setTimeout(hide, 300); });
    setTimeout(function() { if (!p.classList.contains('hidden')) hide(); }, 2500);
}

// Navigation
function initNavigation() {
    var n = document.getElementById('navbar'), t = document.getElementById('topBar'), tg = document.getElementById('navToggle'), m = document.getElementById('navMenu');
    if (n && t) {
        var ls = window.scrollY, tk = false;
        window.addEventListener('scroll', function() {
            if (!tk) {
                requestAnimationFrame(function() {
                    var s = window.scrollY, d = s > ls, p = s > 100;
                    n.classList.toggle('scrolled', s > 50);
                    if (p && d) { t.classList.add('hidden'); n.classList.add('top-hidden'); }
                    else if (!d) { t.classList.remove('hidden'); n.classList.remove('top-hidden'); }
                    if (s <= 10) { t.classList.remove('hidden'); n.classList.remove('top-hidden'); }
                    ls = s; tk = false;
                });
                tk = true;
            }
        });
    }
    if (tg && m) {
        var o = document.createElement('div'); o.className = 'nav-overlay'; document.body.appendChild(o);
        function op() { m.classList.add('active'); tg.classList.add('active'); o.classList.add('active'); document.body.style.overflow = 'hidden'; }
        function cl() { m.classList.remove('active'); tg.classList.remove('active'); o.classList.remove('active'); document.body.style.overflow = ''; }
        tg.addEventListener('click', function() { m.classList.contains('active') ? cl() : op(); });
        o.addEventListener('click', cl);
        m.querySelectorAll('.nav-link').forEach(function(l) { l.addEventListener('click', cl); });
        document.addEventListener('keydown', function(e) { if (e.key === 'Escape') cl(); });
    }
    var cp = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function(l) {
        var lp = l.getAttribute('href').split('/').pop();
        if (lp === cp) l.classList.add('active');
    });
}

// Hero Slider
function initHeroSlider() {
    var s = document.querySelectorAll('.hero-slide');
    if (s.length < 2) return;
    var c = 0, iv;
    function sh(i) { s.forEach(function(sl) { sl.classList.remove('active'); }); s[i].classList.add('active'); }
    function nx() { c = (c + 1) % s.length; sh(c); }
    sh(0); iv = setInterval(nx, 5000);
    var h = document.querySelector('.hero');
    if (h) { h.addEventListener('mouseenter', function() { clearInterval(iv); }); h.addEventListener('mouseleave', function() { iv = setInterval(nx, 5000); }); }
}

// Scroll Reveal
function initScrollReveal() {
    var els = document.querySelectorAll('.fade-in-up, .service-card-home, .testimonial-card-home, .service-detail-card, .portfolio-card, .value-card, .process-step, .contact-info-card, .contact-form-wrapper, .about-feature-item');
    if (!els.length) return;
    var ob = new IntersectionObserver(function(es) { es.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('visible'); ob.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    els.forEach(function(el) { if (!el.classList.contains('fade-in-up')) el.classList.add('fade-in-up'); ob.observe(el); });
}

// Clients Carousel
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
    var ob = new IntersectionObserver(function(es) { es.forEach(function(e) { t.style.animationPlayState = e.isIntersecting ? 'running' : 'paused'; }); }, { threshold: 0.1 });
    ob.observe(t);
    t.addEventListener('mouseenter', function() { t.style.animationPlayState = 'paused'; });
    t.addEventListener('mouseleave', function() { t.style.animationPlayState = 'running'; });
}

// FAQ
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(function(q) {
        q.addEventListener('click', function() {
            var item = q.parentElement, isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(function(f) { f.classList.remove('active'); });
            if (!isActive) item.classList.add('active');
        });
    });
}

// Portfolio Filter
function initPortfolioFilter() {
    var btns = document.querySelectorAll('.filter-btn'), items = document.querySelectorAll('.portfolio-card');
    if (!btns.length) return;
    btns.forEach(function(b) {
        b.addEventListener('click', function() {
            btns.forEach(function(x) { x.classList.remove('active'); });
            b.classList.add('active');
            var f = b.dataset.filter;
            items.forEach(function(i) {
                if (f === 'all' || i.dataset.category === f) { i.style.display = 'block'; requestAnimationFrame(function() { i.style.opacity = '1'; i.style.transform = 'scale(1)'; }); }
                else { i.style.opacity = '0'; i.style.transform = 'scale(0.95)'; setTimeout(function() { i.style.display = 'none'; }, 300); }
            });
        });
    });
}

// Lightbox
function initLightbox() {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    var img = lb.querySelector('img'), closeBtn = lb.querySelector('.lightbox-close'), prevBtn = lb.querySelector('.lightbox-prev'), nextBtn = lb.querySelector('.lightbox-next');
    var images = [], idx = 0;
    function open(list, i) { images = list; idx = Math.max(0, Math.min(i, images.length - 1)); update(); lb.classList.add('active'); document.body.style.overflow = 'hidden'; }
    function close() { lb.classList.remove('active'); document.body.style.overflow = ''; }
    function update() { if (img && images[idx]) { img.style.opacity = '0'; setTimeout(function() { img.src = images[idx]; img.style.opacity = '1'; }, 150); } }
    function next() { idx = (idx + 1) % images.length; update(); }
    function prev() { idx = (idx - 1 + images.length) % images.length; update(); }
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);
    lb.addEventListener('click', function(e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function(e) { if (!lb.classList.contains('active')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); });
    document.querySelectorAll('.portfolio-card').forEach(function(c) {
        c.addEventListener('click', function() {
            var ci = c.querySelector('img'); if (!ci) return;
            var vc = Array.from(document.querySelectorAll('.portfolio-card')).filter(function(x) { return x.style.display !== 'none' && x.querySelector('img'); });
            var list = vc.map(function(x) { return x.querySelector('img').src; });
            open(list, list.indexOf(ci.src));
        });
    });
}

// Contact Form
function initContactForm() {
    var f = document.getElementById('contactForm');
    if (!f) return;
    f.addEventListener('submit', function(e) {
        e.preventDefault();
        var name = document.getElementById('name'), email = document.getElementById('email'), service = document.getElementById('service'), message = document.getElementById('message');
        if (!name.value.trim() || !email.value.trim() || !service.value || !message.value.trim()) { showNotification('Please fill all required fields.', 'error'); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showNotification('Invalid email address.', 'error'); return; }
        var btn = f.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; var orig = btn.innerHTML; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'; setTimeout(function() { showNotification('Message sent successfully!', 'success'); f.reset(); btn.disabled = false; btn.innerHTML = orig; }, 1500); }
    });
}

// Notification
function showNotification(msg, type) {
    var existing = document.querySelector('.notification');
    if (existing) { existing.classList.remove('show'); setTimeout(function() { existing.remove(); }, 300); }
    var n = document.createElement('div'); n.className = 'notification notification-' + type;
    n.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i> ' + msg;
    document.body.appendChild(n);
    requestAnimationFrame(function() { n.classList.add('show'); });
    setTimeout(function() { n.classList.remove('show'); setTimeout(function() { if (n.parentNode) n.remove(); }, 300); }, 4000);
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
        a.addEventListener('click', function(e) {
            var href = this.getAttribute('href'); if (href === '#' || href === '#!') return;
            var t = document.querySelector(href);
            if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' }); }
        });
    });
}

// Service Modals
var serviceDetails = {
    'vehicle-branding': { title: 'Vehicle Branding', description: 'We turn your fleet into powerful, moving billboards that capture attention across East Africa. Our premium vehicle wraps use 3M vinyl for durability and vibrant color retention.', tags: ['Full Fleet Branding', 'Partial Wraps', 'Magnetic Signage', '3M Premium Vinyl', 'Bus Branding', 'Truck Branding'], gallery: ['../images/car_branding/carbranding3.jpg', '../images/car_branding/lorrybranding.jpeg', '../images/car_branding/van3.jpeg', '../images/car_branding/van.jpeg', '../images/car_branding/pepsi.jpeg'] },
    'shop-branding': { title: 'Shop & Retail Branding', description: 'Create immersive retail environments that enhance customer experience and strengthen brand recall.', tags: ['Storefront Branding', 'Interior Graphics', 'Window Displays', 'Retail Fixtures'], gallery: ['../images/shop_branding/sunking_shopbranding.jfif'] },
    'wall-branding': { title: 'Wall & Outdoor Branding', description: 'Large-scale wall murals and outdoor branding that transform ordinary spaces into powerful brand statements.', tags: ['Building Murals', 'Wall Wraps', 'Perimeter Branding', 'Weather-Resistant'], gallery: ['../images/wall_branding/vihiga_wallbranding1.jfif', '../images/wall_branding/wallbranding1.jpeg'] },
    'printing': { title: 'Printing & Design', description: 'High-quality digital, screen, and offset printing services for all your marketing collateral.', tags: ['Digital Printing', 'Screen/Offset', 'Large Format', 'Graphic Design'], gallery: ['../images/print/print1.webp'] },
    'merchandise': { title: 'Merchandise Branding', description: 'Custom-branded merchandise that keeps your brand top-of-mind.', tags: ['Apparel Branding', 'Promotional Items', 'Corporate Gifts', 'Heat Press'], gallery: ['../images/merch/merch_4.jpg', '../images/merch/merch_3.jpg', '../images/merch/merch_1.jpg'] },
    'experiential': { title: 'Experiential Activations', description: 'Immersive brand experiences that create memorable connections with your target audience.', tags: ['Product Launches', 'Trade Shows', 'Road Shows', 'Sampling Campaigns'], gallery: ['../images/experiential_promotions/captain_morgan.jpg', '../images/experiential_promotions/tusker_1.jpg', '../images/experiential_promotions/exp_1.jpg'] },
    'office-branding': { title: 'Office Branding', description: 'Professional office environments that reflect your corporate culture.', tags: ['Reception Branding', 'Wayfinding Signage', 'Wall Graphics', 'Glass Manifestation'], gallery: ['../images/office_branding.jpg'] },
    'signages': { title: 'Signage Solutions', description: 'High-impact indoor and outdoor signage that commands attention.', tags: ['Illuminated Signs', 'Directional Signage', 'Safety Signage', 'Custom Fabrication'], gallery: [] }
};

function initServiceModals() {
    document.querySelectorAll('.service-detail-card').forEach(function(card) {
        card.addEventListener('click', function() { openServiceModal(card.dataset.service); });
    });
}

function openServiceModal(id) {
    var data = serviceDetails[id]; if (!data) return;
    var modal = document.getElementById('serviceModal'), content = document.getElementById('serviceModalContent');
    if (!modal || !content) return;
    var gHTML = data.gallery.map(function(img) { return '<div class="gallery-thumb" onclick="event.stopPropagation();openModalLightbox(\'' + img + '\')"><img src="' + img + '" alt="" loading="lazy"></div>'; }).join('');
    content.innerHTML = '<div class="service-modal-header"><h2>' + data.title + '</h2><p>' + data.description + '</p></div><div class="service-modal-tags">' + data.tags.map(function(t) { return '<span>' + t + '</span>'; }).join('') + '</div><h3 style="margin-bottom:16px;font-size:18px;font-weight:700">Project Gallery</h3><div class="service-modal-gallery">' + gHTML + '</div>';
    modal.classList.add('active'); document.body.style.overflow = 'hidden';
}

function closeServiceModal() { var m = document.getElementById('serviceModal'); if (m) { m.classList.remove('active'); document.body.style.overflow = ''; } }

function openModalLightbox(src) {
    var lb = document.getElementById('modalLightbox');
    if (!lb) { lb = document.createElement('div'); lb.className = 'modal-lightbox'; lb.id = 'modalLightbox'; lb.innerHTML = '<button class="modal-lightbox-close" onclick="closeModalLightbox()"><i class="fas fa-times"></i></button><img src="" alt="">'; document.body.appendChild(lb); lb.addEventListener('click', function(e) { if (e.target === lb) closeModalLightbox(); }); }
    lb.querySelector('img').src = src; lb.classList.add('active'); document.body.style.overflow = 'hidden';
}

function closeModalLightbox() { var lb = document.getElementById('modalLightbox'); if (lb) { lb.classList.remove('active'); document.body.style.overflow = ''; } }

document.addEventListener('click', function(e) { if (e.target.classList.contains('service-modal-backdrop')) closeServiceModal(); });
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') { closeServiceModal(); closeModalLightbox(); } });