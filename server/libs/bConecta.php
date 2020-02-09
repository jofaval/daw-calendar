<?php

try {
    $db = new PDO('mysql:host='. Config::$mvc_bd_hostname . ';dbname=' . Config::$mvc_bd_nombre . '', Config::$mvc_bd_usuario, Config::$mvc_bd_clave);
    // Realiza el enlace con la BD en utf-8
    $db->exec("set names utf8");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
} catch (PDOException $e) {
    echo "<div class='p-3 m-5 btn btn-danger rounded position-absolute fixed-bottom float-right' onclick='this.remove();'>";
        echo "<p>Error: No puede conectarse con la base de datos.</p>\n";
        echo "<p class='m-0'>Error: " . $e->getMessage() . "</p>";
    echo "</div>";
}

?>