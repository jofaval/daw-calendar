<?php
include ('utils.php');

class Controller
{
    public function error()
    {
        require __DIR__ . '/templates/error.php';
    }
    
    public function login()
    {
        $result = tryCatch("Controller", "loginFunctionality");
          
        require __DIR__ . '/templates/login.php';
    }

    public function loginFunctionality() {

    }
}

?>
