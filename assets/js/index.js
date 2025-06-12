Parse.initialize("myAppId","myJsKey");
Parse.serverURL = 'http://localhost:1337/parse';

document.addEventListener("DOMContentLoaded", async function () {
document.getElementById('login-btn').addEventListener('click', async (event) => {
  event.preventDefault();
  let loginErrorDiv = document.getElementById('loginError');
  loginErrorDiv.textContent = '';

  if (!document.getElementById('identifiant').value || !document.getElementById('motDePasse').value) {
    loginErrorDiv.textContent = 'Veuillez remplir tous les champs.';
    return;
  }

  try {
  const user = await Parse.User.logIn(document.getElementById('identifiant').value, document.getElementById('motDePasse').value);
  window.location.href = 'controls.html';
} catch (error) {
  loginErrorDiv.textContent = 'Identifiant ou mot de passe incorrect.';
}
});
});
