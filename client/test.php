<?php

require_once __DIR__ . '/../server/classes/Config.php';
require_once __DIR__ . '/../server/libs/bExceptions.php';
require_once __DIR__ . '/../server/libs/bConecta.php';
require_once __DIR__ . '/../server/libs/bFile.php';
require_once __DIR__ . '/../server/libs/bDate.php';
require_once __DIR__ . '/../server/libs/bCrypt.php';
require_once __DIR__ . '/../server/libs/bEmail.php';
require_once __DIR__ . '/../server/libs/utils.php';
require_once __DIR__ . '/../server/classes/Sessions.php';
require_once __DIR__ . '/../server/classes/Validation.php';
require_once __DIR__ . '/../server/classes/Model.php';
require_once __DIR__ . '/../server/classes/Controller.php';
require_once __DIR__ . '/../server/classes/AjaxController.php';

var_dump(method_exists("AjaxController", "getNonWorkWeeklyDays"));
var_dump(call_user_func(["AjaxController", "getNonWorkWeeklyDays"]));

/* $conexion = new PDO('mysql:host=' . Config::$mvc_bd_hostname . ';dbname=' . Config::$mvc_bd_nombre . '', Config::$mvc_bd_usuario, Config::$mvc_bd_clave);
// Realiza el enlace con la BD en utf-8
$conexion->exec("set names utf8");
$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$string = "SELECT * FROM users";
//$string = "INSERT INTO users (username, password, fullname, email, type, image) VALUES (:username, :password, :fullname, :email, 1, :image)";
$string = "UPDATE users SET type=3 WHERE 1=1";
$string = "SELECT `nonWorkDay` FROM `nonWorkWeeklyDays`";
$queryVar = $conexion->prepare($string);

$params = [
//"username" => "teste",
//"password" => Cryptography::blowfishCrypt("test", "teste"),
//"fullname" => "Pepe Fabra",
//"email" => "teste@iesabastos.org",
//"image" => "test.jph",
];

$queryVar->execute($params);
var_dump($queryVar->fetchAll(PDO::FETCH_ASSOC)); */