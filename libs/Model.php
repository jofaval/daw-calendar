<?php
include_once ('Config.php');

class Model extends PDO
{
    protected $conexion;
    public static $instance = null;

    public function __construct()
    {
        
    }

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Model();
            self::$instance->conexion = new PDO('mysql:host=' . Config::$mvc_bd_hostname . ';dbname=' . Config::$mvc_bd_nombre . '', Config::$mvc_bd_usuario, Config::$mvc_bd_clave);
            // Realiza el enlace con la BD en utf-8
            self::$instance->conexion->exec("set names utf8");
            self::$instance->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        return self::$instance;
    }

    public function dameAlimentos()
    {
        $consulta = "select * from alimentos order by energia desc";
        $result = $this->conexion->query($consulta);
        return $result->fetchAll();
    }
    
    
    public function insertarAlimento($n, $e, $p, $hc, $f, $g)
    {
        $consulta = "insert into alimentos (nombre, energia, proteina, hidratocarbono, fibra, grasatotal) values (?, ?, ?, ?, ?, ?)";
        $result = $this->conexion->prepare($consulta);
        $result->bindParam(1, $n);
        $result->bindParam(2, $e);
        $result->bindParam(3, $p);
        $result->bindParam(4, $hc);
        $result->bindParam(5, $f);
        $result->bindParam(6, $g);
        $result->execute();
                
        return $result;
    }
}
