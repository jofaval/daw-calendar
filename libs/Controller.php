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
    
    public function signin()
    {
        $result = tryCatch("Controller", "signinFunctionality");
          
        if ($result) {
            header("Location: calendar/");
        } else {
            require __DIR__ . '/templates/signin.php';
        }
        
    }

    public function signinFunctionality() {
        $model = Model::getInstance();
        $validation = Validation::getInstance();
        $sessions = Sessions::getInstance();
        
        $datos = $_POST;
        $validacion = new Validacion();
        $regla = array(
            array(
                'name' => 'username',
                'regla' => 'no-empty,username'
            ),
            array(
                'name' => 'password',
                'regla' => 'no-empty,password'
            )
        );
        $validaciones = $validacion->rules($regla, $datos);

        $signin = $model->signin();
        if ($signin !== false) {
            setSession("username", $signin["username"]);
            setSession("access", $signin["access"]);
            return true;
        } else {
            return false;
        }
    }
    
    public function signup()
    {
        $result = tryCatch("Controller", "signupFunctionality");
          
        if ($result) {
            header("Location: signin/");
        } else {
            require __DIR__ . '/templates/signup.php';
        }
        
    }

    public function signupFunctionality() {
        $model = Model::getInstance();
        $validation = Validation::getInstance();
        $sessions = Sessions::getInstance();
        
        $datos = $_POST;
        $validacion = new Validacion();
        $regla = array(
            array(
                'name' => 'inputName',
                'regla' => 'no-empty,name'
            ),
            array(
                'name' => 'inputUsername',
                'regla' => 'no-empty,username'
            ),
            array(
                'name' => 'inputPassword',
                'regla' => 'no-empty,password'
            ),
            array(
                'name' => 'inputEmail',
                'regla' => 'no-empty,email'
            )
        );
        $validaciones = $validacion->rules($regla, $datos);

        $signup = $model->signup();
        if ($signup !== false) {
            return true;
        } else {
            return false;
        }
    }

    public function signout() {
        $sessions = Sessions::getInstance();

        $sessions->removeSession("username");
        $sessions->setSession("access", 0);
    }

    public function calendar()
    {
        require __DIR__ . '/templates/calendar.php';
    }
}

?>
