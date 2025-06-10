Parse.initialize("myAppId","myJsKey");
Parse.serverURL = 'http://localhost:1337/parse';

try {
  const user = await Parse.User.logIn(document.getElementById('identifiant').value, document.getElementById('motDePasse').value);
  window.location.href = 'controls.html';
} catch (error) {
  loginErrorDiv.textContent = 'Identifiant ou mot de passe incorrect.';
}
