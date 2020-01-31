<?php
include ('utils.php');

class Controller
{
    public function error()
    {
        require __DIR__ . '/templates/error.php';
    }

    public function access()
    {
        require __DIR__ . '/templates/access.php';
    }

    public function confirmEmail()
    {
        $params = tryCatch("Controller", "confirmEmailFunctionality");

        require __DIR__ . '/templates/email.php';
    }

    public function confirmEmailFunctionality() {
        $tokenCode = recoge("token");
        $model = Model::getInstance();
        $token = $model->isTokenValid($tokenCode);

        $params = [
            "isInTime" => $token,
            "tokenCode" => $token,
            "tokenDate" => $token,
        ];

        return $params;
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
