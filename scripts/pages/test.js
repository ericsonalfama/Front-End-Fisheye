//Mettre le code JavaScript lié à la page photographer.html

// Ma nouvelle fonction pour recuperer les photographes
async function getPhotographers() {

    //requête sur le fichier JSON en utilisant "fetch".

   const photographers = await fetch("data/photographers.json").then(photographers => photographers.json());
   
    // et bien retourner le tableau photographers seulement une fois récupéré
    console.log(photographers);
    return (photographers)

}
 //////////////////
 // Fonction pour obtenir l'ID du photographe à partir de l'URL
function getPhotographerIdFromUrl() {
    // Récupérer l'URL de la page
    const url = new URL(window.location.href);

    // Récupérer le paramètre 'id' de l'URL
    const photographerId = url.searchParams.get('id');

    return photographerId;
}

// Fonction pour récupérer les données du photographe spécifique
async function getPhotographerData(photographerId) {
    try {
        // Remplacez l'URL par le chemin approprié vers votre fichier JSON ou API
        const response = await fetch('data/photographers.json');

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }

        const data = await response.json();

        // Recherche du photographe par ID dans les données
        const photographer = data.photographers.find(photographer => photographer.id == photographerId);

        return photographer;
    } catch (error) {
        console.error('Erreur lors de la récupération des données du photographe :', error);
    }
}


// Fonction pour récupérer les données du photographe spécifique
async function getPhotographerMedia(mediaId) {
    try {
        // Remplacez l'URL par le chemin approprié vers votre fichier JSON ou API
        const response = await fetch('data/photographers.json');

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut : ${response.status}`);
        }

        const data = await response.json();

        // Recherche du media du photographe par ID dans les données
        const media = data.medias.find(media => photographer.id == mediaId);

        return media;
    } catch (error) {
        console.error('Erreur lors de la récupération des données du photographe :', error);
    }
}



// Fonction pour afficher les données du photographe sur la page
function displayPhotographerData(photographer, media) {
    // Vous pouvez personnaliser cette fonction pour afficher les données du photographe comme vous le souhaitez
    console.log('Données du photographe :', photographer);
    console.log('Media du photographe :', media);
}

// Fonction principale d'initialisation de la page du photographe
async function initPhotographerPage() {
    // Récupérer l'ID du photographe depuis l'URL
    const photographerId = getPhotographerIdFromUrl();
        // Récupérer le media selon l'ID du photographe depuis l'URL
        const mediaId = getPhotographerIdFromUrl();

    // Récupérer les données du photographe spécifique
    const media = await getPhotographerMedia(photographerId);

    // Afficher les données du photographe sur la page
    displayPhotographerData(media);
}



function photographerTemplate(data) {



    const { id, city, country, name, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const photographerOrigin = document.createElement ('p');
        photographerOrigin.textContent = city + ', ' + country;
        // je donne une class pour changer la couleur du texte
 photographerOrigin.classList.add('photographer_location');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        // je Crée un lien autour de l'image et du nom du photographe et sera aussi je crée la zone cliquable img + H2 pour utliser dans accessiblité
        const avatar = document.createElement('a');
        avatar.appendChild(img);  // Ajoutez l'élément img à l'élément 'a'
        avatar.appendChild(h2);   // Ajoutez l'élément h2 à l'élément 'a'
        avatar.href = `photographer.html?id=${id}`  // Ajoutez le lien approprié ici
        avatar.setAttribute("aria-label", name);  // Ajoutez le nom du photographe comme texte alternatif

        const photographerTagline = document.createElement( 'p' );
        photographerTagline.textContent = tagline;
        photographerTagline.classList.add('photographer_tagline');
        const photographerPrice = document.createElement( 'p' );
        photographerPrice.textContent = price+'€/jour';
        // je donne une class pour changer la couleur du texte
        photographerPrice.classList.add('photographer_price');
        // je Crée un lien autour de l'image et du nom du photographe
          
        //article.appendChild(img);
        //article.appendChild(h2);
        article.appendChild(avatar);
        article.appendChild(photographerOrigin);
        article.appendChild(photographerTagline);
        article.appendChild(photographerPrice);
        console.log(article)
        return (article);
    }
    return { id, name, tagline, price, picture, getUserCardDOM }
}
// Appeler la fonction d'initialisation lorsque la page est chargée
document.addEventListener('DOMContentLoaded', initPhotographerPage,photographerTemplate);
