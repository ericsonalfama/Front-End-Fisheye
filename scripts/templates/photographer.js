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
        return (article);
    }
    return { id, name, tagline, price, picture, getUserCardDOM }
}