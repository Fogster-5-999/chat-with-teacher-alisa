const lightbox = document.getElementById('photo-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

export function openLightbox(url) {
    if (!url) return;
    lightboxImg.src = url;
    lightbox.classList.add('active');
}

export function closeLightbox() {
    lightbox.classList.remove('active');
}

export function initLightbox() {
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}