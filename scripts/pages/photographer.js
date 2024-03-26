/* eslint-disable no-undef */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* ----------------------------------------------------------------
RÉCUPÉRER L'ID PHOTOGRAPHER ET SES MEDIAS
----------------------------------------------------------------- */
const url = new URL(window.location.href);
const photographerId = url.searchParams.get('id');
let mediaArray = [];

async function getPhotographers() {
  // Récupérer le paramètre 'id' de l'URL

  try {
    // J'utilise ces valeurs pour récupérer les photographes
    const response = await fetch('data/photographers.json');
    const media = await response.json();
    getPhotographeMedia(media, photographerId);

    return media; // Retourne les données des photographes
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des photographes:', error);
  }
}

async function getPhotographeMedia(data, id) {
  try {
    const showMedia = data.media.filter((media) => media.photographerId == id);
    const photographersSection = document.querySelector('.photograph-content');

    mediaArray = showMedia.map((media) => ({
      id: media.id,
      title: media.title,
      image: media.image,
      video: media.video,
      likes: media.likes,
      date: media.date,
      price: media.price,
    }));

    showMedia.forEach((media, i) => {
      const mediaCard = getUserCardDOM(media, i);
      photographersSection.appendChild(mediaCard);
    });

    /* ----------------------------------------------------------------
GERER DROPDOWN
----------------------------------------------------------------- */

    // J'ajoute les écouteurs d'événements pour les autres options de tri
    const boutonTrierPopularite = document.getElementById('popularity');
    const boutonTrierDate = document.getElementById('dropdown_middle-option');
    const boutonTrierTitre = document.getElementById('dropdown-title');
    const dropdownContainer = document.querySelector('.dropdown-content');
    const dropdownON = document.getElementById('fa-chevron-up');
    const dropdownOFF = document.getElementById('fa-chevron-down');
    const dropdownSelected = document.getElementById('selected');
    const dropdownSelectedContainer = document.querySelector('.dropdownIcon-content');

    function sortBy(criteria) {
      switch (criteria) {
        case 'likes':
          showMedia.sort((a, b) => b.likes - a.likes);
          dropdownSelected.innerText = 'Popularité';
          break;
        case 'title':
          showMedia.sort((a, b) => a.title.localeCompare(b.title));
          dropdownSelected.innerText = 'Titre';
          break;
        case 'date':
          showMedia.sort((a, b) => new Date(a.date) - new Date(b.date));
          dropdownSelected.innerText = 'Date';
          break;
        default:
          console.error('Critère de tri non pris en charge :', criteria);
          return;
      }
      // Je supprime les médias actuels du DOM
      const container = document.querySelector('.photograph-content');
      container.innerHTML = '';
      // J'affiche les médias triés dans le DOM
      showMedia.forEach((media, i) => {
        const mediaElement = getUserCardDOM(media, i);
        container.appendChild(mediaElement);
      });
    }

    dropdownON.addEventListener('click', closeDropdown);
    dropdownSelected.addEventListener('click', openDropdown);
    dropdownOFF.addEventListener('click', openDropdown);

    // Écouteur d'événement pour fermer modal avec clavier (touche Esc/escape)
    dropdownContainer.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'Enter':
          openDropdown();
          break;
        case 'Escape':
          closeDropdown();
          break;
        default:
          break;
      }
    });

    // Fonction pour ouvrir la dropdown
    function openDropdown() {
      const dropdown = document.getElementById('show-selected');
      dropdown.style.display = 'block';
      dropdownOFF.style.display = 'none';
      dropdownON.style.display = 'block';
      dropdownSelected.style.display = 'none';
      dropdownSelectedContainer.classList.add('dropdownIcon-content-opened');
    }

    // Fonction pour fermer la dropdown
    function closeDropdown() {
      const dropdown = document.getElementById('show-selected');
      dropdown.style.display = 'none';
      dropdownOFF.style.display = 'block';
      dropdownON.style.display = 'none';
      dropdownSelected.style.display = 'block';
      dropdownSelectedContainer.classList.remove('dropdownIcon-content-opened');
    }

    // Fonction pour trier et fermer la dropdown
    function sortByAndClose(criteria) {
      sortBy(criteria);
      closeDropdown();
    }

    boutonTrierPopularite.addEventListener('click', () => sortByAndClose('likes'), closeDropdown, dropdownSelected.textContent = 'Popularité');
    boutonTrierPopularite.addEventListener('click', () => closeDropdown);

    boutonTrierDate.addEventListener('click', () => sortByAndClose('date'));
    boutonTrierDate.addEventListener('click', () => closeDropdown);

    boutonTrierTitre.addEventListener('click', () => sortByAndClose('title'));
    boutonTrierTitre.addEventListener('click', () => closeDropdown);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des médias du photographe:', error);
  }
}

/* ----------------------------------------------------------------
AFFICHER PROFILE PHOTOGRAPHER
----------------------------------------------------------------- */
async function getPhotographersProfile(singlePhotographerId) {
  try {
    const photographers = await getPhotographers();
    const photographerProfile = photographers.photographers.find((profile) => profile.id == singlePhotographerId);
    if (!photographerProfile) {
      console.error('Aucun photographe trouvé avec l\'ID spécifié.');
      return null;
    }

    // Création des éléments HTML
    const photographHeader = document.querySelector('.photograph-header');
    const leftContainer = document.createElement('div');
    leftContainer.classList.add('left-container');
    const rightContainer = document.createElement('div');
    rightContainer.classList.add('right-container');
    const contactButton = document.createElement('button');
    contactButton.classList.add('contact_button'); // Ajout de class contact_button
    const centerContainer = document.createElement('div');
    centerContainer.appendChild(contactButton);
    centerContainer.classList.add('center-container');
    const nameElement = document.createElement('h2');
    const locationElement = document.createElement('p');
    const countryElement = document.createElement('p');
    const taglineElement = document.createElement('p');
    const portraitElement = document.createElement('img'); // Élément img pour l'image du portrait
    portraitElement.alt = `${photographerProfile.name}`;
    const imageContainer = document.createElement('div');
    imageContainer.appendChild(portraitElement);

    // Construction du chemin relatif de l'image du portrait
    const portraitPath = `assets/photographers/${photographerProfile.portrait}`;

    // Remplissage des éléments avec les données du photographe
    nameElement.textContent = `${photographerProfile.name}`;
    locationElement.textContent = `${photographerProfile.city} , ${photographerProfile.country}`;
    locationElement.classList.add('photograph-location');
    taglineElement.textContent = `${photographerProfile.tagline}`;
    taglineElement.classList.add('photograph-tagline');
    portraitElement.src = portraitPath; // Définition du chemin de l'image
    contactButton.textContent = 'Contactez-moi';

    // J'ajoute le nom du photographe dans le formulaire
    const newParagraphElement = document.querySelector('.modal form');

    // Je vais créer un nouveau h2
    const displayPhotographerName = document.createElement('h2');
    displayPhotographerName.classList.add('form_photograph_name');
    displayPhotographerName.textContent = `${photographerProfile.name}`;

    // Je vais Insérer le paragraphe après l'élément h2
    newParagraphElement.parentNode.insertBefore(displayPhotographerName, newParagraphElement);

    contactButton.addEventListener('click', (e) => {
      displayModal();
    });

    // Ajout des éléments au DOM
    leftContainer.appendChild(nameElement);
    leftContainer.appendChild(locationElement);
    leftContainer.appendChild(countryElement);
    leftContainer.appendChild(taglineElement);

    rightContainer.appendChild(imageContainer);// Ajout de l'élément img

    photographHeader.appendChild(leftContainer);
    photographHeader.appendChild(centerContainer);
    photographHeader.appendChild(rightContainer);

    return photographerProfile;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération du profil du photographe:', error);
  }
}

// Appel de la fonction avec l'ID du photographe
getPhotographersProfile(photographerId);

/* ----------------------------------------------------------------
CRÉATION DES ARTICLES DU PHOTOGRAPHE
----------------------------------------------------------------- */

// Tableau pour stocker les articles par leur ID
const mediaElementsById = [];
let currentMediaIndex;

function getUserCardDOM(media, i) {
  const mediaElement = (media.image) ? document.createElement('img') : document.createElement('video');
  mediaElement.classList.add('article-media');
  mediaElement.src = `assets/images/${media.photographerId}/${media.image || media.video}`;
  // mediaElement.alt = media.title;
  mediaElement.setAttribute('alt', media.title);
  mediaElement.id = i;
  mediaElement.setAttribute('tabindex', i);
  const article = document.createElement('article');
  article.setAttribute('data-media-id', media.id);
  article.setAttribute('tabindex', i);
  article.id = i;
  article.alt = media.title;

  // Stocker les articles dans le tableau par leur ID
  mediaElementsById[mediaElement.id] = article;

  // Je créé le titre de l'article
  const mediaTitle = document.createElement('p');
  mediaTitle.textContent = media.title;

  // Je créé l'affichage des nombres des likes
  const avis = document.createElement('p');
  avis.textContent = `${media.likes} likes`;

  // Je crée l'icône des likes
  const iconAvis = document.createElement('i');
  iconAvis.setAttribute('tabindex', i);
  iconAvis.setAttribute('data-liked', 'false');
  iconAvis.classList.add('fa-solid', 'fa-heart');

  // J'ajout les événements clique ou clavier pour l'icône des likes
  iconAvis.addEventListener('click', () => toggleLike(media, iconAvis, avis));
  iconAvis.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      toggleLike(media, iconAvis, avis);
    }
  });

  const description = document.createElement('div');
  description.classList.add('media_description');

  const descriptionAvis = document.createElement('div');
  descriptionAvis.classList.add('media_description_avis');
  descriptionAvis.appendChild(avis);
  descriptionAvis.appendChild(iconAvis);
  description.appendChild(mediaTitle);
  description.appendChild(descriptionAvis);

  article.appendChild(mediaElement);
  article.appendChild(description);

  // J'ajoute l'événement pour ouvrir la lightbox
  // J'ajoute l'événement pour le média (clic et touche Entrée)
  mediaElement.addEventListener('click', handleEvent);
  mediaElement.addEventListener('keydown', handleEvent);

  switch (article.alt) {
    case 'Adventure Door, India':
      mediaElement.src = 'assets/images/195/Travel _Adventure_Door.jpg';
      break;
    case 'Contrast, St Petersburg':
      mediaElement.src = 'assets/images/195/Architecure_Contrast.jpg';
      break;
    default:
      mediaElement.src = `assets/images/${media.photographerId}/${media.image || media.video}`;
  }

  return article;
}

/* ----------------------------------------------------------------
GÉRÉR LA LIGHTBOX
----------------------------------------------------------------- */

// Je crée la fonction pour detecter l'événement click ou keydown
function handleEvent(event) {
  // Vérifier si l'événement est un clic ou une touche Entrée
  if (event.type === 'click' || (event.type === 'keydown' && event.code === 'Enter')) {
    // Récupérer l'ID du mediaElement
    const mediaElementId = event.currentTarget.id;
    // Appeler la fonction initializeLightbox avec l'ID
    initializeLightbox(mediaElementId);
  }
}

// Je crée la fonction pour initialiser ma lightbox
function initializeLightbox(id) {
  const lightboxElement = document.getElementById('lightbox');
  currentMediaIndex = id;
  console.log(currentMediaIndex);

  if (!mediaElementsById[currentMediaIndex]) {
    console.error('Article avec ID non trouvé.');
    return;
  }

  const currentMedia = mediaElementsById[currentMediaIndex];
  const currentMediaElement = currentMedia.querySelector('.article-media').cloneNode(true);
  const currentMediaCaption = document.querySelector('.lightbox_caption');
  currentMediaCaption.textContent = currentMediaElement.getAttribute('alt');

  if (currentMediaElement.src.endsWith('.mp4')) {
    currentMediaElement.setAttribute('controls', 'true');
  }

  // Je vais créer un conteneur pour l'image/vidéo et le vider avant d'ajouter le nouvel élément
  const mediaContainer = lightboxElement.querySelector('.lightbox_content');
  mediaContainer.innerHTML = '';
  mediaContainer.appendChild(currentMediaElement);

  lightboxElement.setAttribute('aria-hidden', 'false');
  lightboxElement.style.visibility = 'visible';

  isLightboxInitialized = true;
  window.addEventListener('keydown', handleLightboxKeyboardNavigation);
}

// J'ajoute les écouteurs d'événements pour les boutons précédent et suivant
document.querySelector('.lightbox_prev').addEventListener('click', () => {
  previousMedia();
});

document.querySelector('.lightbox_prev').addEventListener('keydown', (event) => {
  if (event.code == 'ArrowLeft') {
    previousMedia();
  }
});

document.querySelector('.lightbox_next').addEventListener('click', () => {
  nextMedia();
});

document.querySelector('.lightbox_next').addEventListener('keydown', (event) => {
  if (event.code == 'ArrowRight') {
    nextMedia();
  }
});

// Fonction pour afficher le média précédent
function previousMedia() {
  currentMediaIndex = (currentMediaIndex - 1 + mediaElementsById.length) % mediaElementsById.length;
  initializeLightbox(currentMediaIndex);
}

// Fonction pour afficher le média suivant
function nextMedia() {
  currentMediaIndex = (currentMediaIndex + 1) % mediaElementsById.length;
  initializeLightbox(currentMediaIndex);
}

/* ----------------------------------------------------------------
TOGGLE LIKE PHOTOGRAPHER
----------------------------------------------------------------- */

// Fonction pour ajouter/retirer un like
async function toggleLike(media, icon, likesDisplay, event) {
  const allLikes = await getLikes(currentPhotographer);
  const singleMedia = media;
  const mediaIcon = icon;
  const mediaLikes = likesDisplay;
  const isLiked = icon.getAttribute('data-liked') === 'true';
  const nbTotalLikes = document.querySelector('.div_likes p');
  let totalLikeBanner = parseInt(nbTotalLikes.textContent, 10);

  if (isLiked) {
    singleMedia.likes -= 1;
    totalLikeBanner -= 1;
    mediaIcon.style.color = ''; // Réinitialiser à la couleur par défaut
    mediaIcon.setAttribute('data-liked', 'false');
  } else {
    singleMedia.likes += 1;
    totalLikeBanner += 1;
    mediaIcon.style.color = '#901C1C'; // Couleur indiquant que le média est liké
    mediaIcon.setAttribute('data-liked', 'true');
  }

  // Mise à jour du texte de l'élément <p> avec le nouveau total de likes
  nbTotalLikes.textContent = totalLikeBanner;
  mediaLikes.textContent = `${singleMedia.likes} likes`;

  // Mise à jour de l'affichage total des likes
  updateTotalLikesDisplay();
}

// Fonction calculer le nombre total de likes
function calculateTotalLikes(photographerMedia) {
  return photographerMedia.reduce((sum, media) => sum + media.likes, 0);
}

// Fonction pour mettre a jour l'affichage des likes

let totalLikesDisplay; // Référence globale pour l'affichage des likes

async function updateTotalLikesDisplay() {
  // Récupérer les médias du photographe
  const response = await fetch('data/photographers.json');
  const data = await response.json();
  const photographerMedia = data.media.filter((media) => media.photographerId == photographerId);
  const totalLikes = calculateTotalLikes(photographerMedia);
}

// Fonction pour récupérer le price depuis le tableau photographers
async function getPriceById() {
  try {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    const currentPhotographer = data.photographers.find((photographer) => photographer.id == photographerId);

    if (!currentPhotographer) {
      console.error('Photographe non trouvé.');
      return null;
    }

    const { price } = currentPhotographer;
    return price;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération du prix:', error);
    return null;
  }
}

// Fonction pour récupérer les photographes et calculer le total des likes
async function getLikes(currentPhotographerId) {
  try {
    // Récupérer le fichier JSON contenant les photographes et les médias
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    // Filtrer les médias par l'ID du photographe
    const photographerMedia = data.media.filter((media) => media.photographerId == currentPhotographerId);
    // Calculer la somme totale des likes
    const totalLikes = photographerMedia.reduce((sum, media) => sum + media.likes, 0);
    // Retourner la somme totale des likes
    return totalLikes;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des likes:', error);
  }
}

// Fonction pour afficher likes et prix
// Utilisation de la fonction
const photographerIdLikes = photographerId;
const photographerLikes = getLikes(photographerIdLikes);

// Detecter l'ID du photographe en question
const currentPhotographer = photographerId;

async function displayLikesAndPrice() {
  // Appeler les fonctions pour obtenir les likes et le prix
  const currentPhotographerLikes = await getLikes(currentPhotographer);
  const photographerPrice = await getPriceById(currentPhotographer);

  // Créer un élément div pour afficher les likes et le prix
  const bannerLikes = document.createElement('div');
  bannerLikes.classList.add('div_likes');
  const bannerPrice = document.createElement('div');
  bannerPrice.classList.add('div_price');

  // Créer un élément p pour afficher le prix
  const prix = document.createElement('p');
  prix.textContent = `${photographerPrice}€ / jour`;

  // Créer un élément i pour afficher l'icône des likes
  const iconAvis = document.createElement('i');
  iconAvis.classList.add('fa-solid');
  iconAvis.classList.add('fa-heart');

  // Créer un élément p pour afficher le total des likes
  const nbTotalLikes = document.createElement('p');
  nbTotalLikes.textContent = `${currentPhotographerLikes}  `;
  // Ajouter les éléments à la div
  bannerLikes.appendChild(nbTotalLikes);
  bannerLikes.appendChild(iconAvis);
  bannerPrice.appendChild(prix);

  // Ajouter la div au contenu principal (main)
  const sectionMain = document.querySelector('.photograph-header');

  const displayLikesAndPriceContainer = document.createElement('div');
  displayLikesAndPriceContainer.appendChild(bannerLikes);
  displayLikesAndPriceContainer.appendChild(bannerPrice);

  sectionMain.appendChild(displayLikesAndPriceContainer);
  displayLikesAndPriceContainer.classList.add('banner_likes_prix');
}

// Appeler la fonction asynchrone
displayLikesAndPrice();
