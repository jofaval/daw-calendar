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

error_reporting(-1);
/*var_dump(method_exists("AjaxController", "getNonWorkWeeklyDays"));
var_dump(call_user_func(["AjaxController", "getNonWorkWeeklyDays"]));*/

/* $inserts = [
'INSERT INTO schedules (orderId, startHour, endHour, year) VALUES (1, "7:55", "8:50", "2019-02-02")',
'INSERT INTO schedules (orderId, startHour, endHour, year) VALUES (2, "8:50", "9:45", "2019-02-02")',
'INSERT INTO schedules (orderId, startHour, endHour, year) VALUES (3, "9:45", "10:40", "2019-02-02")',
'INSERT INTO schedules (orderId, startHour, endHour, year) VALUES (4, "11:00", "11:55", "2019-02-02")',
'INSERT INTO schedules (orderId, startHour, endHour, year) VALUES (5, "11:55", "12:50", "2019-02-02")',
'INSERT INTO schedules (orderId, startHour, endHour, year) VALUES (6, "12:50", "13:45", "2019-02-02")',
'INSERT INTO schedules (orderId, startHour, endHour, year) VALUES (7, "14:05", "15:00", "2019-02-02")',
'INSERT INTO schedules (orderId, startHour, endHour, year) VALUES (8, "15:00", "15:55", "2019-02-02")',
'INSERT INTO schedules (orderId, startHour, endHour, year) VALUES (9, "15:55", "16:50", "2019-02-02")',
'INSERT INTO schedules (orderId, startHour, endHour, year) VALUES (10, "16:50", "17:45", "2019-02-02")',
'INSERT INTO schedules (orderId, startHour, endHour, year) VALUES (11, "18:05", "19:00", "2019-02-02")',
'INSERT INTO schedules (orderId, startHour, endHour, year) VALUES (12, "19:00", "19:55", "2019-02-02")',
'INSERT INTO schedules (orderId, startHour, endHour, year) VALUES (13, "19:55", "20:50", "2019-02-02")',
'INSERT INTO schedules (orderId, startHour, endHour, year) VALUES (14, "20:50", "21:10", "2019-02-02")',
'INSERT INTO schedules (orderId, startHour, endHour, year) VALUES (15, "21:10", "22:05", "2019-02-02")',
'INSERT INTO specialDays (specialDay, type) VALUES("2020-02-23", 0)',
'INSERT INTO specialDays (specialDay, type) VALUES ("2020-12-29", 2)',
'INSERT INTO specialDays (specialDay, type) VALUES ("2020-10-09", 1)',
]; */

/* $inserts = [
'INSERT INTO classrooms (name, description, state) VALUES ("201", "desc", "perfect")',
'INSERT INTO classrooms (name, description, state) VALUES ("202", "desc", "perfect")',
'INSERT INTO classrooms (name, description, state) VALUES ("203", "desc", "perfect")',
'INSERT INTO classrooms (name, description, state) VALUES ("204", "desc", "perfect")',
'INSERT INTO classrooms (name, description, state) VALUES ("205", "desc", "perfect")',
'INSERT INTO classrooms (name, description, state) VALUES ("206", "desc", "perfect")',
'INSERT INTO classrooms (name, description, state) VALUES ("207", "desc", "perfect")',
'INSERT INTO classrooms (name, description, state) VALUES ("208", "desc", "perfect")',
'INSERT INTO classrooms (name, description, state) VALUES ("209", "desc", "perfect")',
]; */

$conexion = new PDO('mysql:host=' . Config::$mvc_bd_hostname . ';dbname=' . Config::$mvc_bd_nombre . '', Config::$mvc_bd_usuario, Config::$mvc_bd_clave);
// Realiza el enlace con la BD en utf-8
$conexion->exec("set names utf8");
$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

/* foreach ($inserts as $insert) {
$queryVar = $conexion->prepare($insert);
$queryVar->execute();
} */

//$string = "SELECT * FROM users";
//$string = "INSERT INTO users (username, password, fullname, email, type, image) VALUES (:username, :password, :fullname, :email, 1, :image)";
//$string = "UPDATE users SET type=3 WHERE 1=1";
//$string = "SELECT * FROM `schedules`";
//$string = "SELECT * FROM `specialDays` WHERE YEAR(specialDay)=2020 and MONTH(specialDay)=1";
//$string = "DELETE FROM classrooms WHERE name='203'";

var_dump(Model::getInstance()->createEvent("test", "7:55", "2020-02-13", "205"));
//$queryVar = $conexion->prepare($string);

$params = [
//"username" => "teste",
    //"password" => Cryptography::blowfishCrypt("test", "teste"),
    //"fullname" => "Pepe Fabra",
    //"email" => "teste@iesabastos.org",
    //"image" => "test.jph",
];

echo "<br><br>";
$queryVar->execute($params);
var_dump($queryVar->fetchAll(PDO::FETCH_ASSOC));