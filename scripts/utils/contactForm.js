function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    // Sélectionnez l'élément h2
     
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function successModal() {
  const modalContainer = document.getElementById("contact_modal");
  const modal = document.querySelector(".modal");  

  modal.style.display = "none"; 

  const successDiv = document.createElement("div");
  successDiv.classList.add("success_modal");

  const successMessage = document.createElement("p");
  successMessage.textContent = " Message envoyé! ";

  const closeSuccessModal = document.createElement('button');
  closeSuccessModal.classList.add("contact_button");
  closeSuccessModal.textContent = "Fermer";
  closeSuccessModal.addEventListener('click', function() {
    closeModal();
    location.reload();  
});

  successDiv.appendChild(successMessage);
  successDiv.appendChild(closeSuccessModal);

  modalContainer.appendChild(successDiv);
}



// Functions to validate first name, last name, email, birthdate, etc.

// HANDLING THE FORM

// Setting the form inputs  
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
 
// Function to validate first and last name
function validateFirstName(firstName, lastName) {
    const trimmFirstName = firstName.value.trim();
    const trimmLastName = lastName.value.trim();
    if (trimmFirstName.length < 2 || trimmFirstName === "") {
      console.log("Le champ 'Prénom' doit avoir minimum 2 caracteres.");
      return false;
    }
    if (trimmFirstName.length >= 2) {
 
      console.log("Le champ 'Prénom' est OK");
    }
    if (trimmLastName.length < 2 || trimmLastName === "") {
        console.log("Le champ 'nom' doit avoir minimum 2 caracteres.");
 
        return false;
      }
      if (trimmFirstName.length >= 2) {
 
        console.log("Le champ 'Nom' est OK");
      }
  
    return true;
  }


  // Function to validate e-mail
  function validateEmail(email) {
    const trimmedValue = email.value.trim();
    const regex = /(?=^.{5,255}$)^([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/g;
  
    if (trimmedValue === "") {
        console.log("Veuillez saisir une adresse e-mail.");
        return false;
    }

    if (!regex.test(trimmedValue)) {
        console.log("Veuillez saisir une adresse e-mail valide");
        return false;
    } else {
        console.log(`E-mail OK, l'e-mail de l'utilisateur est : ${email.value}`);
        return true;
    }
}

  
  // Function to validate message
function validateMessage(message) {
    const trimmMessage = message.value.trim();
 
    if (trimmMessage.length < 100 || trimmMessage === "") {
      window.alert("Le champ 'Message' doit avoir minimum 100 caracteres.");
      const missingMessage = document.createElement('p');
      missingMessage.textContent = "Le champ 'Message' doit avoir minimum 100 caracteres.";
      messageInput.appendChild(missingMessage);
      console.log("Le champ 'Message' doit avoir minimum 100 caracteres.");
      return false;
    }
    if (trimmMessage.length >= 100) {
 
      console.log("Le champ 'Message' est OK");
    }
    
    return true;
  }

  // Main validation function for the entire form
function validate() {
    // Calls validation function for First Name
    const isFirstAndLastNameValid = validateFirstName(firstNameInput,lastNameInput);
    //   Calls validation function for email
    const isEmailValid = validateEmail(emailInput);
     //  Calls validation function for email
     const isMessageValid = validateMessage(messageInput);
    
  
    if (
      isFirstAndLastNameValid &&
      isEmailValid &&
      isMessageValid
    ) {
      // Show the results on console
      function createUserInfo() {
        const userInfo = {
          Prenom: firstNameInput.value,
          Nom: lastNameInput.value,
          Email: emailInput.value,
          Message: messageInput.value,
        };
  
        return userInfo;
      }
  
      const formDataObject = createUserInfo();
      console.log(formDataObject);
  
      successModal();
    }
 
  }
  
 

    // Add a click event in the form submit button
    document.querySelector('.contact_button')
    .addEventListener('click',function (event){
    event.preventDefault();
        // Call form validation function
        validate();
    }) 

  

