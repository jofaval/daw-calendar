<?php
// web/index.php
// carga del modelo y los controladores
require_once __DIR__ . './libs/Config.php';
require_once __DIR__ . './libs/Sessions.php';
require_once __DIR__ . './libs/Validation.php';
require_once __DIR__ . './libs/exceptions.php';
require_once __DIR__ . './libs/Model.php';
require_once __DIR__ . './libs/Controller.php';

$sessions = Sessions::getInstance();

/*
* Access
* 0 - Guest
* 1 - Not activated account
* 2 - Teacher
* 3 - Admin
*/

// enrutamiento
$map = array(
    'signin' => array('controller' =>'Controller', 'action' =>'signin', 'access' => 0),
    'signup' => array('controller' =>'Controller', 'action' =>'signup', 'access' => 0),
    'calendar' => array('controller' =>'Controller', 'action' =>'calendar', 'access' => 2),
    'admin' => array('controller' =>'Controller', 'action' =>'admin', 'access' => 3),
    'access' => array('controller' =>'Controller', 'action' =>'access', 'access' => 0),
    'confirmEmail' => array('controller' =>'Controller', 'action' =>'confirmEmail', 'access' => 1),
    'error' => array('controller' =>'Controller', 'action' =>'error', 'access' => 0),
    'notsigned' => array('controller' =>'Controller', 'action' =>'notsigned', 'access' => 0),
);

// Parseo de la ruta
if (isset($_GET['ctl'])) {
    if (isset($map[$_GET['ctl']])) {
        $ruta = $_GET['ctl'];
    } else {
        header('Location: ./error/');
        exit;
    }
} else {
    header('Location: ./login/');
}

// Ejecución del controlador asociado a la ruta
$controlador = $map[$ruta];
if (method_exists($controlador['controller'],$controlador['action'])) {
    if ($sessions->getsession("access") >= $controlador['access']) {
        call_user_func(array(new $controlador['controller'], $controlador['action']));
    } else {
        header('Location: ./access/');
    }
} else {
    header('Location: ./error/');
    exit;
}
?>