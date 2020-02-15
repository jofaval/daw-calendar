<?php

require_once "./server/classes/Config.php";
require_once "./server/libs/utils.php";
require_once "./server/libs/bCrypt.php";

$conexion = new PDO('mysql:host=' . Config::$mvc_bd_hostname . ';dbname=' . Config::$mvc_bd_nombre . '', Config::$mvc_bd_usuario, Config::$mvc_bd_clave);
// Realiza el enlace con la BD en utf-8
$conexion->exec("set names utf8");
$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$string = "SELECT * FROM users";
//$string = "INSERT INTO users (username, password, fullname, email, type, image) VALUES (:username, :password, :fullname, :email, 1, :image)";
$string = "UPDATE users SET type=3 WHERE 1=1";
$queryVar = $conexion->prepare($string);
$queryVar->execute();

$params = [
    /* "username" => "teste",
"password" => Cryptography::blowfishCrypt("test", "teste"),
"fullname" => "Pepe Fabra",
"email" => "teste@iesabastos.org",
"image" => "test.jph", */
];

$queryVar->execute($params);
var_dump($queryVar->fetchAll(PDO::FETCH_ASSOC));