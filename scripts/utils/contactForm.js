/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* ----------------------------------------------------------------
MANIPULATION OUVRIR/AFFICHER ET FERMER LE MODAL
----------------------------------------------------------------- */
// Fonction pour afficher la modale
function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
}

// Fonction pour fermer la modale
function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

// Écouteur d'événement pour fermer modal avec clavier (touche Esc/escape)
window.addEventListener('keydown', (event) => {
  if (event.code === 'Escape') {
    closeModal();
    window.location.reload();
  }
});

// Fonction pour afficher la modale de succès
function successModal() {
  const modalContainer = document.getElementById('contact_modal');
  const modal = document.querySelector('.modal');

  modal.style.display = 'none';

  const successDiv = document.createElement('div');
  successDiv.classList.add('success_modal');

  const successMessage = document.createElement('p');
  successMessage.textContent = ' Message envoyé! ';

  const closeSuccessModal = document.createElement('button');
  closeSuccessModal.classList.add('contact_button');
  closeSuccessModal.textContent = 'Fermer';
  closeSuccessModal.addEventListener('click', () => {
    closeModal();
    window.location.reload();
  });

  successDiv.appendChild(successMessage);
  successDiv.appendChild(closeSuccessModal);

  modalContainer.appendChild(successDiv);
}

/* ----------------------------------------------------------------
MANIPULATION DU FORMULAIRE
Fonctions pour valider Prénom, Nom, email, message
----------------------------------------------------------------- */

// Définition des entrées du formulaire
const firstNameInput = document.getElementById('first');
const lastNameInput = document.getElementById('last');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Fonction pour valider le prénom et le nom
function validateFirstName(firstName, lastName) {
  const trimmFirstName = firstName.value.trim();
  const trimmLastName = lastName.value.trim();
  if (trimmFirstName.length < 2 || trimmFirstName === '') {
    firstNameInput.classList.add('error_input');
    console.log("Le champ 'Prénom' doit avoir minimum 2 caracteres.");
    return false;
  }
  if (trimmFirstName.length >= 2) {
    firstNameInput.classList.remove('error_input');
    console.log("Le champ 'Prénom' est OK");
  }
  if (trimmLastName.length < 2 || trimmLastName === '') {
    console.log("Le champ 'nom' doit avoir minimum 2 caracteres.");

    return false;
  }
  if (trimmFirstName.length >= 2) {
    console.log("Le champ 'Nom' est OK");
  }

  return true;
}

// Fonction pour valider l'e-mail
function validateEmail(email) {
  const trimmedValue = email.value.trim();
  const regex = /(?=^.{5,255}$)^([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/g;

  if (trimmedValue === '') {
    console.log('Veuillez saisir une adresse e-mail.');
    return false;
  }

  if (!regex.test(trimmedValue)) {
    console.log('Veuillez saisir une adresse e-mail valide');
    return false;
  }
  console.log(`E-mail OK, l'e-mail de l'utilisateur est : ${email.value}`);
  return true;
}

// Fonction pour valider le message
function validateMessage(message) {
  const trimmMessage = message.value.trim();

  if (trimmMessage.length < 20 || trimmMessage === '') {
    // window.alert("Le champ 'Message' doit avoir minimum 100 caracteres.");
    console.log("Le champ 'Message' doit avoir minimum 20 caracteres.");
    return false;
  }
  if (trimmMessage.length >= 20) {
    console.log("Le champ 'Message' est OK");
  }

  return true;
}

// Afficher les résultats sur la console
function createUserInfo() {
  const userInfo = {
    Prenom: firstNameInput.value,
    Nom: lastNameInput.value,
    Email: emailInput.value,
    Message: messageInput.value,
  };
  return userInfo;
}

// Fonction de validation principale pour l'ensemble du formulaire
function validate() {
  const isFirstAndLastNameValid = validateFirstName(firstNameInput, lastNameInput);
  const isEmailValid = validateEmail(emailInput);
  const isMessageValid = validateMessage(messageInput);

  if (
    isFirstAndLastNameValid
      && isEmailValid
      && isMessageValid
  ) {
    const formDataObject = createUserInfo();
    console.log(formDataObject);

    successModal();
  }
}

// J'ajoute l'événement click pour valider le formulaire
document.querySelector('.contact_button')
  .addEventListener('click', (event) => {
    event.preventDefault();
    // Appel de la fonction validate
    validate();
  });
