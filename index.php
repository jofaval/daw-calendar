<?php
// web/index.php
// carga del modelo y los controladores
require_once __DIR__ . './libs/Config.php';
require_once __DIR__ . './libs/exceptions.php';
require_once __DIR__ . './libs/Model.php';
require_once __DIR__ . './libs/Controller.php';

// enrutamiento
$map = array(
    'signin' => array('controller' =>'Controller', 'action' =>'signin'),
    'calendar' => array('controller' =>'Controller', 'action' =>'calendar'),
    'signup' => array('controller' =>'Controller', 'action' =>'signup'),
    'admin' => array('controller' =>'Controller', 'action' =>'admin'),
    'notsigned' => array('controller' =>'Controller', 'action' =>'notsigned'),
    'error' => array('controller' =>'Controller', 'action' =>'error'),
    'access' => array('controller' =>'Controller', 'action' =>'access')
);
// Parseo de la ruta
if (isset($_GET['ctl'])) {
    if (isset($map[$_GET['ctl']])) {
        $ruta = $_GET['ctl'];
    } else {
        header('Status: 404 Not Found');
        echo '<html><body><h1>Error 404: No existe la ruta <i>' .
            $_GET['ctl'] .'</p></body></html>';
            exit;
    }
} else {
    $ruta = 'inicio';
}
$controlador = $map[$ruta];
// Ejecución del controlador asociado a la ruta
if (method_exists($controlador['controller'],$controlador['action'])) {
    call_user_func(array(new $controlador['controller'],
        $controlador['action']));
} else {
    header('Status: 404 Not Found');
    echo '<html><body><h1>Error 404: El controlador <i>' .
        $controlador['controller'] .
        '->' .
        $controlador['action'] .
        '</i> no existe</h1></body></html>';
}
?>