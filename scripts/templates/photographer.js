// eslint-disable-next-line no-unused-vars
function photographerTemplate(data) {
  const {
    id, city, country, name, tagline, price, portrait,
  } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    article.setAttribute('aria-label', name);
    const photographerOrigin = document.createElement('p');
    photographerOrigin.textContent = `${city}, ${country}`;
    // je donne une class pour changer la couleur du texte
    photographerOrigin.classList.add('photographer_location');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', name);
    const h2 = document.createElement('h2');
    h2.textContent = name;
    /* Lien autour de l'image et nom du photographe et la zone cliquable pour l'accessiblité */
    const avatar = document.createElement('a');
    avatar.appendChild(img);
    avatar.appendChild(h2);
    avatar.href = `photographer.html?id=${id}`;
    avatar.setAttribute('aria-label', name);

    const photographerTagline = document.createElement('p');
    photographerTagline.textContent = tagline;
    photographerTagline.classList.add('photographer_tagline');
    const photographerPrice = document.createElement('p');
    photographerPrice.textContent = `${price}€/jour`;
    // je donne une class pour changer la couleur du texte
    photographerPrice.classList.add('photographer_price');

    article.appendChild(avatar);
    article.appendChild(photographerOrigin);
    article.appendChild(photographerTagline);
    article.appendChild(photographerPrice);
    return (article);
  }
  return {
    id, name, tagline, price, picture, getUserCardDOM,
  };
}
