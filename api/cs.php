<?php
require_once 'Router.php';

// Instancier le routeur
$router = new Router();



// Route pour l'inscription
$router->post('/cs.php/controls/', function() {

$OUTPUTPATH = '/home/yan/Documents/ETS/E2025/stage recheche 5G/Test/output/';

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

        if (!isset($client_data['0']) || !isset($client_data['1']) || !isset($client_data['2'])) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Missing required data']);
        exit();
        }

        $curent_files = scandir($OUTPUTPATH);
        
        $PIDTR = null; // Initialiser le PID à null
        
        if ($client_data['0'] == 1) { // si le trafic regulier est demandé
            $PIDTR = shell_exec('normal_trafic > while true; do sudo ip netns exec ue1 curl http://10.53.1.2/ > /dev/null; sleep 1.0 ; done');
        }

        $PIDTA = null; // Initialiser le PID à null pour le trafic d'attaque


        if ($client_data['1'] == "2") {
            $PIDTA = shell_exec('normal_trafic > while true; do sudo mz br-65790546e4ca -c 1 -A 10.45.1.3-10.45.1.13 -B 10.53.1.2 -t tcp "dp=38412,sp=2100-3000, flags=syn" > /dev/null; sleep 1.0 ; done');
        } elseif ($client_data['1'] == "3") {
           $PIDTA = shell_exec('normal_trafic > while true; do sudo mz br-65790546e4ca -c 1 -A 10.45.1.3-10.45.1.13 -B 10.53.1.2 -t udp "dp=38412,sp=2100-3000" > /dev/null; sleep 1.0 ; done');
        }
            

        // lancer la detection d'attaque si demandé

        if ($client_data['2'] == "1") {
            shell_exec('sudo '.$OUTPUTPATH.'monitoring.sh &');
        }


        

        if ($client_data['1'] != "1") {
            shell_exec("kill $PIDTA");
        }

        $result = shell_exec("ls /"); // Exécuter la commande shell (exemple)
    
        echo json_encode($result ." ** ".$client_data['1']." ** ". $client_data['2']); // Retourner le résultat au format JSON
        
        if ($client_data['0'] == 1) { // arreter le trafic regulier si present
                shell_exec("kill $PIDTR");
        }
        exit();

});

// Acheminer la requête
$router->dispatch($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
?>
