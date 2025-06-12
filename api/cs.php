<?php
require_once 'Router.php';

// Instancier le routeur
$router = new Router();

// Route pour l'inscription
$router->post('/cs.php/controls/', function() {

    header('Content-Type: application/json'); // Définir l'en-tête de réponse en JSON

            // Extraire les éléments de l'objet JSON
            $client_data_json = file_get_contents("php://input");
            $client_data = json_decode($client_data_json, true);

       $result = shell_exec("ls"); // Exécuter la commande shell
        echo json_encode($result ." ** ".$client_data['1']." ** ". $client_data['2']); // Retourner le résultat au format JSON
        exit();

});

// Acheminer la requête
$router->dispatch($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
?>
