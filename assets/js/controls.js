Parse.initialize("myAppId","myJsKey");
Parse.serverURL = 'http://localhost:1337/parse';

const currentUser = Parse.User.current();
if (currentUser.getUsername=="admin") {

    const divErreurs = document.createElement('div');
    divErreurs.id = 'erreurs';

    const divSelect1 = document.createElement('div');
    divSelect1.className = "form-control";

    const divSelect2 = document.createElement('div');
    divSelect2.className = "form-control";

    const div = document.createElement('div');
    div.className = 'form-controls';

    const divResult = document.createElement('div');
    divResult.id = 'result';

    const button = document.createElement('button');
    button.textContent = "Lancer l'attaque";


    const form = document.createElement('form');

    const select1 = document.createElement('select');
    select1.class="form-control";
    select1.id="select1";

    const option0 = document.createElement('option');
    option0.selected = true;
    option0.value = "0";
    option0.textContent = "Sélectionner un type d'attaque";

    const option1 = document.createElement('option');
    option1.value = "1";
    option1.textContent = "DDoS";

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

    select2.appendChild(s2option0);
    select2.appendChild(s2option1);
    select2.appendChild(s2option2);

    divSelect1.appendChild(select1);
    divSelect2.appendChild(select2);

    form.appendChild(divSelect1);
    form.appendChild(divSelect2);
    form.appendChild(button);

    div.appendChild(form);

    document.body.main.appendChild(divErreurs);
    document.body.main.appendChild(div);
    document.body.main.appendChild(divResult);

    button.addEventListener('click', async function(event) {
        
        event.preventDefault();

        const selectedValue1 = select1.value;
        const selectedValue2 = select2.value;

        if (selectedValue1 != "0" && selectedValue2 != "0") {
            const reponseJSON = await fetch(
                "./api/cs.php/controls/",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ 1 : selectedValue1, 2 : selectedValue2 }), 
                }
              );
              const reponse = await reponseJSON.json();
              const resultDiv = document.getElementById('result');
              resultDiv.textContent = "Retour serveur : " + reponse.resultat;
        } else {
            const erreursDiv = document.getElementById('erreurs');
            erreursDiv.textContent = "Sélectionnez un type d'attaque et de détection valides.";
        }
    });
} else {
    window.location.href = 'index.html';
}