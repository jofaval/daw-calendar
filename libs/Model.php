<?php
include_once ('Config.php');
include_once ('bCrypt.php');

class Model extends PDO
{
    protected $conexion;
    public static $instance = null;

    public function __construct() {
        $this->conexion = new PDO('mysql:host=' . Config::$mvc_bd_hostname . ';dbname=' . Config::$mvc_bd_nombre . '', Config::$mvc_bd_usuario, Config::$mvc_bd_clave);
        // Realiza el enlace con la BD en utf-8
        $this->conexion->exec("set names utf8");
        $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     }

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Model();
        }
        return self::$instance;
    }

    private function query($queryString, $params = [])
    {
        $result = $this->conexion->query($queryString);

        if (!empty($params)) {
            foreach ($params as $key => $value) {
                $result->bindParam(":$key", $value);
            }
        }

        return $result->fetchAll();
    }

    private function cudOperation($insertString, $params = [])
    {
        $result = $this->conexion->query($insertString);

        if (!empty($params)) {
            foreach ($params as $key => $value) {
                $result->bindParam(":$key", $value);
            }
        }

        return $result->execute();
    }

    private function disable($entityType, $params, $enabled)
    {
        $params["enabled"] = $enabled;
        $identification = array_keys()[0];
        return cudOperation("UPDATE FROM $entityType SET enabled=:enabled WHERE $identification=:$identification", $params);
    }

    private function login($username, $password)
    {
        $params["username"] = $username;
        return query("SELECT access, password FROM users WHERE username=:username", $params);
    }

    function generateToken($username) {
        $token = "";
        
        do {
            $token = generateRandomKey();
        }while(count(query("SELECT token FROM tokens WHERE token=:token"), ["token"=>$token]) !== 0);

        $params = [
            "token" => $token,
            "username" => $username,
            "expirationDate" => date('Y-m-d', strtotime(date() . ' + 2 days')),
            "isTraded" => false,
        ];

        cudOperation("INSERT INTO tokens VALUES(:token, :username, :expirationDate)", $params);

        return $token;
    }

    public function isTokenValid($token) {
        return true;
    }
}
