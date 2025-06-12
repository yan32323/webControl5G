Parse.initialize("myAppId","myJsKey");
Parse.serverURL = 'http://localhost:1337/parse';

const user = new Parse.User();
user.set("username", "admin");
user.set("password", "cont5GV2X@&D");
user.set("email", "exemple@gmail.com");

try {
  user.signUp();
  console.log('User signed up:', user);
} catch (error) {
  console.error('Error during sign up:', error);
}
