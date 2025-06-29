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

            // Vérifier si les données sont valides
        if ($client_data === null) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Invalid JSON data']);
        exit();
        }

        // Vérifier si les données nécessaires sont présentes

        if (!isset($client_data['1']) || !isset($client_data['2'])) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Missing required data']);
        exit();
        }

            // determiner les lignes de commande a exécuter
        $command = '';
        
        if ($client_data['1'] == "1") {
        $command = 'sudo mz br-65790546e4ca -c 0 -A 10.45.1.3-10.45.1.13 -B 10.53.1.2 -t tcp "dp=38412,sp=2100-3000, flags=syn"';
        } elseif ($client_data['1'] == "2") {
        $command = 'sudo mz br-65790546e4ca -c 0 -A 10.45.1.3-10.45.1.13 -B 10.53.1.2 -t udp "dp=38412,sp=2100-3000"';
        }
    
        $result = shell_exec("ls /"); // Exécuter la commande shell (exemple)
    
        echo json_encode($result ." ** ".$client_data['1']." ** ". $client_data['2']); // Retourner le résultat au format JSON
        exit();

});

// Acheminer la requête
$router->dispatch($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
?>
