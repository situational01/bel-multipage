// ============================================================
// GALLERY LIGHTBOX - Standalone for Service Pages
// ============================================================

(function() {
    // Initialize only if gallery exists
    const items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;

    const overlay = document.getElementById('lightboxOverlay');
    if (!overlay) return;

    const lightboxImg = document.getElementById('lightboxImage');
    const counter = document.getElementById('lightboxCounter');
    let currentIndex = 0;
    let images = [];
    let zoomLevel = 1;

    // Collect image sources
    items.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            const src = img.src;
            images.push(src);
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                const idx = images.indexOf(src);
                if (idx !== -1) openLightbox(idx);
            });
        }
    });

    function openLightbox(index) {
        currentIndex = index;
        zoomLevel = 1;
        lightboxImg.style.transform = 'scale(1)';
        updateLightbox();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateLightbox() {
        lightboxImg.src = images[currentIndex];
        counter.textContent = (currentIndex + 1) + ' / ' + images.length;
    }

    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextImage() {
        if (images.length === 0) return;
        currentIndex = (currentIndex + 1) % images.length;
        zoomLevel = 1;
        lightboxImg.style.transform = 'scale(1)';
        updateLightbox();
    }

    function prevImage() {
        if (images.length === 0) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        zoomLevel = 1;
        lightboxImg.style.transform = 'scale(1)';
        updateLightbox();
    }

    function zoomIn() {
        zoomLevel = Math.min(zoomLevel + 0.25, 3);
        lightboxImg.style.transform = 'scale(' + zoomLevel + ')';
    }

    function zoomOut() {
        zoomLevel = Math.max(zoomLevel - 0.25, 0.5);
        lightboxImg.style.transform = 'scale(' + zoomLevel + ')';
    }

    // Event listeners
    const closeBtn = document.getElementById('lightboxClose');
    const nextBtn = document.getElementById('lightboxNext');
    const prevBtn = document.getElementById('lightboxPrev');
    const zoomInBtn = document.getElementById('lightboxZoomIn');
    const zoomOutBtn = document.getElementById('lightboxZoomOut');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (zoomInBtn) zoomInBtn.addEventListener('click', zoomIn);
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', zoomOut);

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === '=' || e.key === '+') zoomIn();
        if (e.key === '-') zoomOut();
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    overlay.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    overlay.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextImage();
            else prevImage();
        }
    }, { passive: true });

    // Double tap zoom
    let lastTap = 0;
    overlay.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTap < 300 && now - lastTap > 0) {
            if (zoomLevel > 1.5) {
                zoomLevel = 1;
            } else {
                zoomLevel = 2;
            }
            lightboxImg.style.transform = 'scale(' + zoomLevel + ')';
        }
        lastTap = now;
    }, { passive: true });

    // Expose functions globally for inline onclick
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;
    window.nextImage = nextImage;
    window.prevImage = prevImage;
    window.zoomIn = zoomIn;
    window.zoomOut = zoomOut;
})();