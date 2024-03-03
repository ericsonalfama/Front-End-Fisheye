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

        console.log("Total des likes pour ce photographe :", totalLikes);

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


 
// AFFICHAGE BANNER AVEC NOMBRE TOTAL DES LIKES ET TARIF DU PHOTOGRAPHER
// Récuperer l'ID du photographe
const currentPhotographer = photographerId;  

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
    nbTotalLikes.textContent = `${photographerLikes}  `;

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
}

// Appeler la fonction asynchrone
displayLikesAndPrice();

async function updateLike(photographerId) {
    try {
        // Récupérer le fichier JSON contenant les photographes et les médias
        const response = await fetch('data/photographers.json');
        const data = await response.json();

        // Sélectionnez l'icône et l'élément pour le nombre de likes
        const iconAvis = document.querySelector('i');
        const numberOfSingleImageOrVideoLikes = document.querySelector('.media_description_avis p');

        // Filtrer les médias par l'ID du photographe
        const photographerMedia = data.media.filter((media) => media.photographerId == photographerId);

        // Ajouter une classe CSS au clic sur l'icône
        iconAvis.addEventListener('click', () => {
            // Obtenez l'identifiant unique du média à partir de l'élément DOM de l'icône cliquée
            const mediaId = iconAvis.closest('[data-media-likes]').getAttribute('data-media-likes');
            
            // Trouvez le média spécifique par son identifiant
            const clickedMedia = photographerMedia.find(media => media.likes == mediaId);

            if (!clickedMedia) {
                console.error('Média non trouvé');
                return;
            }

            if (iconAvis.classList.contains('liked')) {
                // Si l'icône a déjà été cliquée, enlevez la classe 'liked' et décrémentez le nombre de likes
                iconAvis.classList.remove('liked');
                clickedMedia.likes -= 1;
            } else {
                // Si l'icône n'a pas été cliquée, ajoutez la classe 'liked' et incrémente le nombre de likes
                iconAvis.classList.add('liked');
                clickedMedia.likes += 1;
            }

            // Mettez à jour le texte avec le nombre total de likes
            numberOfSingleImageOrVideoLikes.textContent = `${clickedMedia.likes} likes`;

            console.log("La somme totale des likes a été mise à jour");

            // Vous pouvez également effectuer une mise à jour côté serveur à ce stade si nécessaire
        });

    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des likes:', error);
    }
}

// Appel de la fonction avec un exemple de photographerId
 