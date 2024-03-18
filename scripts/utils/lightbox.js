/* eslint-disable default-case */
/* eslint-disable no-undef */
let isLightboxInitialized = false;
function closeLightbox() {
  const lightboxElement = document.getElementById('lightbox');
  lightboxElement.setAttribute('aria-hidden', 'true');
  lightboxElement.style.visibility = 'hidden';
  currentMediaIndex = 0;
  isLightboxInitialized = false;
}

// eslint-disable-next-line no-unused-vars
function handleLightboxKeyboardNavigation(event) {
  if (isLightboxInitialized) {
    const key = event.code;
    switch (key) {
      case 'ArrowRight':
        nextMedia();
        break;
      case 'ArrowLeft':
        previousMedia();
        break;
      case 'Escape':
        closeLightbox();
        break;
    }
  }
}
