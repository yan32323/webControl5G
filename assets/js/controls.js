Parse.initialize("myAppId","myJsKey");
Parse.serverURL = 'http://localhost:1337/parse';
document.addEventListener("DOMContentLoaded", async function () {
const currentUser = Parse.User.current();
if (currentUser != null) {

  if (currentUser.getUsername()=="admin"){
  // Création des éléments HTML pour l'interface de contrôle une fois que l'utilisateur est identifié

    const divErreurs = document.createElement('div');
    divErreurs.className = 'erreurs';

    const divSelect1 = document.createElement('div');
    divSelect1.className = "form-control grow5";

    const divSelect2 = document.createElement('div');
    divSelect2.className = "form-control grow5";

    const divResult = document.createElement('div');
    divResult.className = 'retour';

    const button = document.createElement('button');
    button.textContent = "Lancer l'attaque";
    button.className = "grow1";


    const form = document.createElement('form');
    form.className = 'layout'

    const select1 = document.createElement('select');
    select1.class="form-control";
    select1.id="select1";

    const option0 = document.createElement('option');
    option0.selected = true;
    option0.value = "0";
    option0.textContent = "Sélectionner un type d'attaque";

    const option1 = document.createElement('option');
    option1.value = "1";
    option1.textContent = "DDoS TCP";

    const option2 = document.createElement('option');
    option1.value = "2";
    option1.textContent = "DDoS UDP";

    const select2 = document.createElement('select');
    select2.class="form-control";
    select2.id="select2";

    const s2option0 = document.createElement('option');
    s2option0.selected = true;
    s2option0.value = "0";
    s2option0.textContent = "Sélectionner un type de détection";

    const s2option1 = document.createElement('option');
    s2option1.value = "1";
    s2option1.textContent = "Aucune";

    const s2option2 = document.createElement('option');
    s2option2.value = "2";
    s2option2.textContent = "Machine Learning";

    select1.appendChild(option0);
    select1.appendChild(option1);
    select1.appendChild(option2);

    select2.appendChild(s2option0);
    select2.appendChild(s2option1);
    select2.appendChild(s2option2);

    divSelect1.appendChild(select1);
    divSelect2.appendChild(select2);

    form.appendChild(divSelect1);
    form.appendChild(divSelect2);
    form.appendChild(button);

    document.getElementById('zoneContenu').appendChild(divErreurs);
    document.getElementById('zoneContenu').appendChild(form);
    document.getElementById('zoneContenu').appendChild(divResult);

    button.addEventListener('click', async function(event) {
      
        event.preventDefault();

        const selectedValue1 = select1.value; // Récupération des valeurs sélectionnées dans les menus déroulants
        const selectedValue2 = select2.value;

        if (selectedValue1 != "0" && selectedValue2 != "0") {
          try {

            // Envoi de la requête POST avec les valeurs sélectionnées

            const reponseJSON = await fetch(
                "./api/cs.php/controls/",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ "1" : selectedValue1, "2" : selectedValue2 }), 
                }
              );
              const reponse = await reponseJSON.json();
              const resultDiv = document.getElementsByClassName('retour')[0];
              resultDiv.textContent = "Retour serveur : " + reponse;
              const erreursDiv = document.getElementsByClassName('erreurs')[0];
              erreursDiv.textContent = " ";
            } catch (error) {
              const erreursDiv = document.getElementsByClassName('erreurs')[0];
              erreursDiv.textContent = "Erreur lors de la requête : " + error.message;
              return;
            }
        } else {
            const erreursDiv = document.getElementsByClassName('erreurs')[0];
            erreursDiv.textContent = "Sélectionnez un type d'attaque et de détection valides.";
        }
    });
  }
 } else {
  alert("Vous n'avez pas les droits pour accéder à cette page. Veuillez vous connecter en tant qu'administrateur.");
     window.location.href = 'index.html';
 }

 window.addEventListener("beforeunload", () => { // déconnexion de l'utilisateur avant de quitter la page
  Parse.User.logOut();
});

document.getElementById('deconnexion').addEventListener('click', async function() {
  try {
    await Parse.User.logOut();
    window.location.href = 'index.html';
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
});

});