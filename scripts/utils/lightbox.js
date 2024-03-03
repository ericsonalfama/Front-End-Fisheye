let currentMediaIndex = 0; // Variable pour suivre l'index du média actuel
let mediaElement;

// Déclarez mediaList globalement pour qu'elle soit accessible partout où vous en avez besoin
let mediaList = [];

// Déplacez retrieveMediaList en dehors de openLightbox pour qu'elle soit globale
function retrieveMediaList() {
    const mediaElements = document.querySelectorAll('.article-media');
    let mediaList = Array.from(mediaElements).map((media, index,) => {
      return {
        index: index, // Position dans le NodeList
        type: media.nodeName, // 'IMG' ou 'VIDEO'
        src: media.src, // Source du fichier média
        alt: media.alt, // Texte alternatif pour l'image ou la vidéo
      };
    });
 
    return mediaList;
  }

async function openLightbox(mediaUrl, mediaTitle, mediaType) {
    const lightboxElement = document.getElementById('lightbox');

      
      // Utilisez cette fonction pour récupérer et stocker la liste des médias
      const mediaList = retrieveMediaList();
      
 
    // Création d'une nouvelle image ou vidéo en fonction de l'extension du média
    if (mediaType.endsWith('.jpg') || mediaType.endsWith('.jpeg') || mediaUrl.endsWith('.png')) {
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
}

function closeLightbox() {
    const lightboxElement = document.getElementById('lightbox');
    lightboxElement.setAttribute('aria-hidden', 'true');
    lightboxElement.style.visibility = 'hidden';
}

 
// Événement pour le bouton précédent
document.querySelector('.lightbox_prev').addEventListener('click', previousMedia);

// Événement pour le bouton suivant
document.querySelector('.lightbox_next').addEventListener('click', nextMedia);

// Fonction pour afficher le média précédent
/*function previousMedia(i) {
    // Assurez-vous que mediaList est à jour
    const mediaList = retrieveMediaList(i);
    currentMediaIndex = (currentMediaIndex - 1 + mediaList.length) % mediaList.length;
    const currentMedia = mediaList[currentMediaIndex];
    openLightbox(currentMedia.src, currentMedia.alt); // Utilisez src et alt de mediaList
}

// Fonction pour afficher le média suivant
function nextMedia(i) {
    // Assurez-vous que mediaList est à jour
    const mediaList = retrieveMediaList(i);
    currentMediaIndex = (currentMediaIndex + 1) % mediaList.length;
    const currentMedia = mediaList[currentMediaIndex];
    openLightbox(currentMedia.src, currentMedia.alt); // Utilisez src et alt de mediaList
}

*/

let currentMediaId; // Variable pour suivre l'ID du média actuel

// Fonction pour ouvrir la lightbox en fonction de l'ID du média
async function openLightboxById(mediaId) {
    const lightboxElement = document.getElementById('lightbox');

    // Utilisez cette fonction pour récupérer et stocker la liste des médias
    mediaList = retrieveMediaList();

    // Trouvez l'index du média avec l'ID spécifié
    const index = mediaList.findIndex(media => media.index == mediaId);

    // Assurez-vous que l'index est valide
    if (index !== -1) {
        currentMediaIndex = index;
        const currentMedia = mediaList[currentMediaIndex];

        // Utilisez le type de média correctement depuis la liste
        const mediaType = (currentMedia.type === 'IMG') ? document.createElement('img') : document.createElement('video');

        mediaType.classList.add('lightbox_image');
        mediaType.src = currentMedia.src;
        mediaType.alt = currentMedia.alt;

        const media_caption = document.querySelector('.lightbox_caption');
        media_caption.textContent = mediaType.alt;

        // Créer un conteneur pour l'image/vidéo et vider avant d'ajouter le nouvel élément
        const mediaContainer = lightboxElement.querySelector('.lightbox_content');
        mediaContainer.innerHTML = ''; // Nettoyer le contenu précédent
        mediaContainer.appendChild(mediaType);

        lightboxElement.setAttribute('aria-hidden', 'false');
        lightboxElement.style.visibility = 'visible';
    }

    console.log(index);
}

// Modifier la fonction pour ouvrir la lightbox en fonction de l'ID du média
function previousMedia() {
    // Assurez-vous que mediaList est à jour
    mediaList = retrieveMediaList();
    currentMediaIndex = (currentMediaIndex - 1 + mediaList.length) % mediaList.length;
    const currentMedia = mediaList[currentMediaIndex];
    openLightboxById(currentMedia.index);
    console.log(currentMediaIndex, currentMedia.index);
}

// Modifier la fonction pour ouvrir la lightbox en fonction de l'ID du média
function nextMedia() {
    // Assurez-vous que mediaList est à jour
    mediaList = retrieveMediaList();
    currentMediaIndex = (currentMediaIndex + 1) % mediaList.length;
    const currentMedia = mediaList[currentMediaIndex];
    openLightboxById(currentMedia.index);
    console.log(currentMediaIndex, currentMedia.index);
}



