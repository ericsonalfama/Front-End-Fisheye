 
/* ----------------------------------------------------------------
RÉCUPÉRER L'ID PHOTOGRAPHER ET SES MEDIAS
----------------------------------------------------------------- */
const url = new URL(window.location.href);
const photographerId = url.searchParams.get('id');
let mediaArray = [];
async function getPhotographers() {
    // Récupérer le paramètre 'id' de l'URL
    console.log(photographerId);

    try {
        // Vous pouvez maintenant utiliser ces valeurs pour récupérer les photographes
        const response = await fetch('data/photographers.json');
        const media = await response.json();
        getPhotographeMedia(media, photographerId);

        return media; // Retourner les données des photographes
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des photographes:', error);
    }
}

async function getPhotographeMedia(data, id) {
    try {
        const showMedia = data.media.filter(media => media.photographerId == id);
        console.log(showMedia);
        const photographersSection = document.querySelector(".photograph-content");
 
        mediaArray = showMedia.map(media => {
            return {
                id: media.id,
                title: media.title,
                image: media.image,
                video: media.video,
                likes: media.likes,
                date : media.date,
                price: media.price
            };
        });
        console.log(mediaArray);

        showMedia.forEach((media, i) => {
            const mediaCard = getUserCardDOM(media, i);
            photographersSection.appendChild(mediaCard);
        });

        
        /* ----------------------------------------------------------------
        GERER DROPDOWN
        ----------------------------------------------------------------- */
        // Ajoutez les écouteurs d'événements pour les autres options de tri
        let boutonTrierPopularite = document.getElementById('popularity');
        let boutonTrierDate = document.getElementById('dropdown_middle-option');
        let boutonTrierTitre = document.getElementById('dropdown-title');
        let dropdownON = document.getElementById('fa-chevron-up');
        let dropdownOFF = document.getElementById('fa-chevron-down');
        let dropdownSelected = document.getElementById('selected');
        
        function sortBy(criteria) {
            switch (criteria) {
                case 'likes':
                    showMedia.sort((a, b) => b.likes - a.likes);
                dropdownSelected.innerText= 'Popularité';
                    break;
                case 'title':
                    showMedia.sort((a, b) => a.title.localeCompare(b.title));
                    dropdownSelected.innerText = 'Titre';
                     
                    break;
                case 'date':
                    // Ajoutez votre logique de tri par prix ici
                    // Par exemple, si les médias ont une propriété 'prix', utilisez :
                    showMedia.sort((a, b) => new Date(a.date) - new Date(b.date));
                    dropdownSelected.innerText = 'Date';
                    //console.log(showMedia.sort((a, b) => a.price - b.price));
                    console.log (showMedia.sort((a, b) => new Date(a.date) - new Date(b.date)));
                    break;
                default:
                    console.error('Critère de tri non pris en charge :', criteria);
                    return;
            }
        
            // Supprime les médias actuels du DOM
            const container = document.querySelector('.photograph-content');
            container.innerHTML = '';
        
            // Affiche les médias triés dans le DOM
            showMedia.forEach(media => {
                const mediaElement = getUserCardDOM(media, mediaArray); // Vous devrez écrire cette fonction
                container.appendChild(mediaElement);
            });
        }
        //boutonTrierPopularite.addEventListener('click', () => sortBy('likes'));
        //boutonTrierDate.addEventListener('click',() => sortBy('price'));
       // boutonTrierTitre.addEventListener('click', () => sortBy('title'));
       dropdownON.addEventListener('click', closeDropdown);
       dropdownSelected.addEventListener('click' , openDropdown)
       dropdownOFF.addEventListener('click', openDropdown);
       
       // Fonction pour ouvrir la dropdown
       function openDropdown() {
           
           const dropdown = document.getElementById('show-selected');
           //dropdown.classList.add("show");
           dropdown.style.display = 'block';
           dropdownOFF.style.display = 'none';
           dropdownON.style.display = 'block';
           dropdownSelected.style.display ="none";
        }
        
 


// Fonction pour fermer la dropdown
function closeDropdown() {
    const dropdown = document.getElementById("show-selected");
 
    //dropdown.classList.remove("show");
    dropdown.style.display = 'none';
    dropdownOFF.style.display = 'block';
    dropdownON.style.display = 'none';
    dropdownSelected.style.display = 'block';
    
}

// Fonction pour trier et fermer la dropdown
function sortByAndClose(criteria) {
    sortBy(criteria);
    closeDropdown();
}


boutonTrierPopularite.addEventListener('click', () => sortByAndClose('likes'), closeDropdown, dropdownSelected.textContent = 'Popularité');
boutonTrierPopularite.addEventListener('click', () => closeDropdown);
//boutonTrierPopularite.addEventListener('click', () => dropdownSelected.textContent = 'Popularité');
 

boutonTrierDate.addEventListener('click', () => sortByAndClose('date'));
boutonTrierDate.addEventListener('click', () => closeDropdown);
//boutonTrierDate.addEventListener('click', () => dropdownSelected.textContent = 'date');
 

boutonTrierTitre.addEventListener('click', () => sortByAndClose('title'));
boutonTrierTitre.addEventListener('click', () => closeDropdown);
//boutonTrierTitre.addEventListener('click', () => dropdownSelected.textContent = 'Titre');
 

 


    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des médias du photographe:', error);
    }
}




 
/* ----------------------------------------------------------------
AFFICHER PROFILE PHOTOGRAPHER
----------------------------------------------------------------- */
async function getPhotographersProfile(photographerId) {
    try {
        const photographers = await getPhotographers();
        const photographerProfile = photographers.photographers.find(profile => profile.id == photographerId);
        if (!photographerProfile) {
            console.error('Aucun photographe trouvé avec l\'ID spécifié.');
            return null;
        }

        // Création des éléments HTML
        const photographHeader = document.querySelector(".photograph-header");
        const leftContainer = document.createElement('div');
        leftContainer.classList.add('left-container');
        const rightContainer = document.createElement('div');
        rightContainer.classList.add('right-container');
        const contactButton = document.createElement('button');
        contactButton.classList.add('contact_button'); // Ajout de class contact_button
        const centerContainer = document.createElement('div');
        centerContainer.appendChild(contactButton);
        centerContainer.classList.add('center-container')
        const nameElement = document.createElement('h2');
        const locationElement = document.createElement('p');
        const countryElement = document.createElement('p');
        const taglineElement = document.createElement('p');
        const portraitElement = document.createElement('img'); // Élément img pour l'image du portrait
        const imageContainer = document.createElement('div');
        imageContainer.appendChild(portraitElement);
        
        // Construction du chemin relatif de l'image du portrait
        const portraitPath = `assets/photographers/${photographerProfile.portrait}`;
        
        // Remplissage des éléments avec les données du photographe
        nameElement.textContent = `${photographerProfile.name}`;
        locationElement.textContent = `${photographerProfile.city} , ${photographerProfile.country}`;
        locationElement.classList.add('photograph-location');
        //countryElement.textContent = `Country: ${photographerProfile.country}`;
        taglineElement.textContent = `${photographerProfile.tagline}`;
        taglineElement.classList.add('photograph-tagline');
        portraitElement.src = portraitPath; // Définition du chemin de l'image
        contactButton.textContent = 'Contactez-moi';

        // Ajouter le nom du photographe dans le formulaire
        const newParagraphElement = document.querySelector('.modal form');

        // Je vais créer un nouveau h2
        const displayPhotographerName = document.createElement('h2');
        displayPhotographerName.classList.add('form_photograph_name')
        displayPhotographerName.textContent = `${photographerProfile.name}`;
        // Je vais Insérer le paragraphe après l'élément h2
        newParagraphElement.parentNode.insertBefore(displayPhotographerName, newParagraphElement);

        contactButton.addEventListener("click", function (e) {
            //console.log("Voici les données du formulaire"); 
            displayModal();// logs the className of my_element
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

        console.log(photographerProfile);
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
function getUserCardDOM(media, i) {
    const mediaElement = (media.image) ? document.createElement('img') : document.createElement('video');
    mediaElement.classList.add('article-media');
    mediaElement.src = `assets/images/${media.photographerId}/${media.image || media.video}`;
    mediaElement.alt = media.title;  // Assurez-vous d'inclure un attribut alt pour l'accessibilité
    
    const article = document.createElement('article');
    article.setAttribute('data-media-id', media.id);
    article.id = i;

    const mediaTitle = document.createElement('p');
    mediaTitle.textContent = media.title;
    
    const avis = document.createElement('p');
    avis.textContent = `${media.likes} likes`;
    
    const iconAvis = document.createElement('i');
    iconAvis.setAttribute('data-liked', 'false');
    iconAvis.classList.add('fa-solid', 'fa-heart');
    iconAvis.addEventListener('click', () => toggleLike(media, iconAvis, avis));

    const description = document.createElement('div');
    description.classList.add('media_description');

    const description_Avis = document.createElement('div');
    description_Avis.classList.add('media_description_avis');
    description_Avis.appendChild(avis);
    description_Avis.appendChild(iconAvis);
    description.appendChild(mediaTitle);
    description.appendChild(description_Avis);

    // Ajoutez mediaElement à l'article, pas mediaLink directement
    article.appendChild(mediaElement);
    article.appendChild(description);

    // Ajoutez l'événement pour ouvrir la lightbox
    mediaElement.addEventListener('click', async function openLightbox() {
        const lightboxElement = document.getElementById('lightbox');
        const currentMediaElement = (media.image) ? document.createElement('img') : document.createElement('video');
        currentMediaElement.classList.add('article-media');
        currentMediaElement.src = `assets/images/${media.photographerId}/${media.image || media.video}`;
        currentMediaElement.alt = media.title;  // Assurez-vous d'inclure un attribut alt pour l'accessibilité
    
        currentMediaElement.classList.add('lightbox_image');
        
        const currentMedia_caption = document.querySelector('.lightbox_caption');
        currentMedia_caption.textContent = currentMediaElement.alt;
    
        // Créer un conteneur pour l'image/vidéo et vider avant d'ajouter le nouvel élément
        const mediaContainer = lightboxElement.querySelector('.lightbox_content');
        mediaContainer.innerHTML = ''; // Nettoyer le contenu précédent
        mediaContainer.appendChild(currentMediaElement);
    
        lightboxElement.setAttribute('aria-hidden', 'false');
        lightboxElement.style.visibility = 'visible';

        console.log(article.id)
    });




    let currentMediaId; // Variable pour suivre l'ID du média actuel

    async function openLightboxById(mediaId) {
        const lightboxElement = document.getElementById('lightbox');
        
        // Utilisez cette fonction pour récupérer et stocker la liste des médias
        mediaList = retrieveMediaList();
        
        // Trouvez le média avec l'ID spécifié
       // const currentMedia = mediaList.find(media => media.id == mediaId);
        const currentMedia = mediaList.findIndex(media => media.index == article.id);
        
        // Assurez-vous que le média est trouvé
        if (currentMedia) {
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
    }
 
    return article;
}


/* ----------------------------------------------------------------
TOGGLE LIKE PHOTOGRAPHER
----------------------------------------------------------------- */
async function toggleLike(media, icon, likesDisplay) {
    let allLikes = await getLikes(currentPhotographer);
    const isLiked = icon.getAttribute('data-liked') === 'true';
    const nbTotalLikes = document.querySelector('.div_likes p');
    let totalLikeBanner = parseInt(nbTotalLikes.textContent, 10);
    console.log(totalLikeBanner);
    
    if (isLiked) {
        media.likes -= 1;
        totalLikeBanner -= 1;
        icon.style.color = ''; // Réinitialiser à la couleur par défaut
        icon.setAttribute('data-liked', 'false');
    } else {
        media.likes += 1;
        totalLikeBanner += 1;
        icon.style.color = '#901C1C'; // Couleur indiquant que le média est liké
        icon.setAttribute('data-liked', 'true');
    }

    // Mettez à jour le texte de l'élément p avec le nouveau total de likes
    nbTotalLikes.textContent = totalLikeBanner;
    likesDisplay.textContent = `${media.likes} likes`;

    // Mise à jour de l'affichage total des likes
    updateTotalLikesDisplay();
}



function calculateTotalLikes(photographerMedia) {
    return photographerMedia.reduce((sum, media) => sum + media.likes, 0);
}

let totalLikesDisplay; // Référence globale pour l'affichage des likes

async function updateTotalLikesDisplay() {
    // Récupérer les médias du photographe
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    const photographerMedia = data.media.filter((media) => media.photographerId == photographerId);
    const totalLikes = calculateTotalLikes(photographerMedia);
    //totalLikesDisplay.textContent = `${totalLikes}`;
}

 

// Fonction pour récupérer le price depuis le tableau photographers
async function getPriceById() {
    try {
        const response = await fetch("data/photographers.json");
        const data = await response.json();

        const photographer = data.photographers.find(photographer => photographer.id == photographerId);

        if (!photographer) {
            console.error('Photographe non trouvé.');
            return null;
        }

        const price = photographer.price;
console.log(price);
        return price;
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération du prix:', error);
        return null;
    }
}
 

// Fonction pour récupérer les photographes et calculer le total des likes
async function getLikes(photographerId) {
    try {
        // Récupérer le fichier JSON contenant les photographes et les médias
        const response = await fetch('data/photographers.json');
        const data = await response.json();

        // Filtrer les médias par l'ID du photographe
        const photographerMedia = data.media.filter((media) => media.photographerId == photographerId);

        // Calculer la somme totale des likes
        const totalLikes = photographerMedia.reduce((sum, media) => sum + media.likes, 0);

        // console.log("Total des likes pour ce photographe :", totalLikes);
        // Retourner la somme totale des likes
        return totalLikes;
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des likes:', error);
    }
}

// Utilisation de la fonction
const photographerIdLikes = photographerId; // Remplacez par l'ID du photographe spécifique
const photographerLikes = getLikes(photographerIdLikes);
console.log(photographerLikes);
 

// Assurez-vous d'avoir l'ID du photographe
const currentPhotographer = photographerId; // Remplacez 123 par l'ID réel du photographe



 
async function displayLikesAndPrice() {
    // Appeler les fonctions pour obtenir les likes et le prix
    const photographerLikes = await getLikes(currentPhotographer);
    const photographerPrice = await getPriceById(currentPhotographer);

    // Créer un élément div pour afficher les likes et le prix
    const bannerLikes = document.createElement('div');
    bannerLikes.classList.add('div_likes')
    const bannerPrice = document.createElement('div');
    bannerPrice.classList.add('div_price')

    // Créer un élément p pour afficher le prix
    const prix = document.createElement('p');
    prix.textContent = `${photographerPrice}€ / jour`;

    // Créer un élément i pour afficher l'icône des likes
    const iconAvis = document.createElement('i');
    iconAvis.classList.add('fa-solid');
    iconAvis.classList.add('fa-heart');

    // Créer un élément p pour afficher le total des likes
    const nbTotalLikes = document.createElement('p');
    nbTotalLikes.textContent = `${photographerLikes}  `; ///////////////////////
    //nbTotalLikes.textContent = `${totalLikesDisplay}`;
    // Ajouter les éléments à la div
    bannerLikes.appendChild(nbTotalLikes);
    bannerLikes.appendChild(iconAvis);
    bannerPrice.appendChild(prix);

    // Ajouter la div au contenu principal (main)
    const sectionMain = document.querySelector(".photograph-header");

    const displayLikesAndPriceContainer = document.createElement('div');
    displayLikesAndPriceContainer.appendChild(bannerLikes);
    displayLikesAndPriceContainer.appendChild(bannerPrice);

    sectionMain.appendChild(displayLikesAndPriceContainer);
    displayLikesAndPriceContainer.classList.add('banner_likes_prix');
    //totalLikesDisplay = nbTotalLikes; // Stocker la référence à l'affichage des likes totaux
    console.log(nbTotalLikes);
}

// Appeler la fonction asynchrone
displayLikesAndPrice();

function trier() {
    mediaArray.sort((a, b) => a.likes - b.likes);

    // Supprimez les médias actuels du DOM
    const container = document.querySelector('.media-container'); // Utilisez le sélecteur approprié pour votre conteneur
    container.innerHTML = '';

    // Recréez les éléments du DOM pour chaque média trié et ajoutez-les au conteneur
    mediaArray.forEach(media => {
        const mediaElement = createMediaElement(media); // Vous devrez écrire cette fonction
        container.appendChild(mediaElement);
    });
}
