
// Variables pour garder une trace de l'état de la lightbox
let currentMediaIndex = 0;
//let mediaArray = []; // Ce tableau sera rempli par la fonction getPhotographeMedia

 
// Ouvre la lightbox avec le média sélectionné
function openLightbox(index) {
  currentMediaIndex = index;
  const media = mediaArray[index];
  const lightboxElement = document.getElementById('lightbox');
  const mediaElement = lightboxElement.querySelector('.lightbox_content');
  
  // Nettoyer le contenu précédent
  mediaElement.innerHTML = '';

  // Créer l'élément média approprié
  let element = document.createElement(media.image ? 'img' : 'video');
  element.src = media.image || media.video;
  element.alt = media.title;
  element.classList.add('lightbox_image');

  if (!media.image) {
    element.setAttribute('controls', 'true');
  }

  mediaElement.appendChild(element);

  // Mettre à jour le titre
  const mediaTitle = lightboxElement.querySelector('.lightbox_caption');
  mediaTitle.textContent = media.title;

  // Afficher la lightbox
  lightboxElement.style.display = 'flex';
}

// Ferme la lightbox
function closeLightbox() {
  const lightboxElement = document.getElementById('lightbox');
  lightboxElement.style.display = 'none';
}

// Passe au média précédent
function previousMedia() {
  if (currentMediaIndex > 0) {
    openLightbox(currentMediaIndex - 1);
  } else {
    openLightbox(mediaArray.length - 1); // Boucle au dernier média
  }
}

// Passe au média suivant
function nextMedia() {
  if (currentMediaIndex < mediaArray.length - 1) {
    openLightbox(currentMediaIndex + 1);
  } else {
    openLightbox(0); // Boucle au premier média
  }
}

// Ajoute des écouteurs d'événements pour les boutons de navigation et de fermeture
function setupLightboxControls() {
  document.getElementById('lightbox_close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox_prev').addEventListener('click', previousMedia);
  document.getElementById('lightbox_next').addEventListener('click', nextMedia);
}

// Initialise la lightbox une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', setupLightboxControls);
 









    // Création d'une nouvelle image ou vidéo en fonction de l'extension du média
    if (mediaUrl.endsWith('.jpg') || mediaUrl.endsWith('.jpeg') || mediaUrl.endsWith('.png')) {
      mediaElement = document.createElement('img');
      
  } else if (mediaUrl.endsWith('.mp4')) {
      mediaElement = document.createElement('video');
      mediaElement.setAttribute('controls', 'true'); // Ajouter les commandes de lecture pour les vidéos
  } else {
      // Gérer d'autres types de médias si nécessaire
      console.error('Format de média non pris en charge :', mediaUrl);
      return;
  }

  mediaElement.classList.add('lightbox_image');
  //mediaElement.src = mediaUrl;
  mediaElement.src = mediaUrl;
  mediaElement.alt = mediaTitle;

  const media_caption = document.querySelector('.lightbox_caption');
  media_caption.textContent = mediaElement.alt;

  // Créer un conteneur pour l'image/vidéo et vider avant d'ajouter le nouvel élément
  const mediaContainer = lightboxElement.querySelector('.lightbox_content');
  mediaContainer.innerHTML = ''; // Nettoyer le contenu précédent
  mediaContainer.appendChild(mediaElement);

  lightboxElement.setAttribute('aria-hidden', 'false');
  lightboxElement.style.visibility = 'visible';