/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-undef */
// Ma nouvelle fonction pour recuperer les photographes
async function getPhotographers() {
  // requête sur le fichier JSON en utilisant "fetch".
  const photographers = await fetch('data/photographers.json').then((photographers) => photographers.json());
  // et bien retourner le tableau photographers seulement une fois récupéré
  return (photographers);
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');
  await photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupèrer les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
