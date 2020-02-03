<?php
// web/index.php
// carga del modelo y los controladores
require_once __DIR__ . './libs/Config.php';
require_once __DIR__ . './libs/Sessions.php';
require_once __DIR__ . './libs/Validation.php';
require_once __DIR__ . './libs/bExceptions.php';
require_once __DIR__ . './libs/Model.php';
require_once __DIR__ . './libs/Controller.php';
require_once __DIR__ . './libs/AjaxController.php';

$sessions = Sessions::getInstance();

/*
* Access
* 0 - Guest - ACCESS_LEVEL_GUEST
* 1 - Not activated account - ACCESS_LEVEL_NOT_ACTIVATED
* 2 - Teacher - ACCESS_LEVEL_TEACHER
* 3 - Admin - ACCESS_LEVEL_ADMIN
*/

// enrutamiento
$map = array(
    'signin' => array('controller' =>'Controller', 'action' =>'signin', 'access' => Config::$ACCESS_LEVEL_GUEST),
    'signout' => array('controller' =>'Controller', 'action' =>'signout', 'access' => Config::$ACCESS_LEVEL_TEACHER),
    'signup' => array('controller' =>'Controller', 'action' =>'signup', 'access' => Config::$ACCESS_LEVEL_GUEST),
    'calendar' => array('controller' =>'Controller', 'action' =>'calendar', 'access' => Config::$ACCESS_LEVEL_TEACHER),
    'admin' => array('controller' =>'Controller', 'action' =>'admin', 'access' => Config::$ACCESS_LEVEL_ADMIN),
    'access' => array('controller' =>'Controller', 'action' =>'access', 'access' => Config::$ACCESS_LEVEL_GUEST),
    'confirmEmail' => array('controller' =>'Controller', 'action' =>'confirmEmail', 'access' => Config::$ACCESS_LEVEL_NOT_ACTIVATED),
    'error' => array('controller' =>'Controller', 'action' =>'error', 'access' => Config::$ACCESS_LEVEL_GUEST),
    'notsigned' => array('controller' =>'Controller', 'action' =>'notsigned', 'access' => Config::$ACCESS_LEVEL_GUEST),
    'getMonthFromEvents' => array('controller' =>'AjaxController', 'action' =>'getMonthFromEvents', 'access' => Config::$ACCESS_LEVEL_TEACHER),
    'getTeachers' => array('controller' =>'AjaxController', 'action' =>'getTeachers', 'access' => Config::$ACCESS_LEVEL_ADMIN),
    'getClassrooms' => array('controller' =>'AjaxController', 'action' =>'getClassrooms', 'access' => Config::$ACCESS_LEVEL_ADMIN),
    'getSchedules' => array('controller' =>'AjaxController', 'action' =>'getSchedules', 'access' => Config::$ACCESS_LEVEL_ADMIN),
);

$ctl = $_GET['ctl'];
// Parseo de la ruta
if (isset($ctl)) {
    if (isset($map[$ctl])) {
        $ruta = $ctl;
    } else {
        header('Location: ./error/');
        exit;
    }
} else {
    header('Location: ./calendar/');
}

/*if (!$sessions->doesSessionExists("username") && ($ctl!="singin")) {
    header('Location: ./notsigned/');
}*/

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