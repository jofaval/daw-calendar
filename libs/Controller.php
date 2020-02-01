<?php
include ('utils.php');
include ('bEmail.php');

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
        $result = false;
        if (isset($_REQUEST["signin"])) {
            $result = tryCatch("Controller", "signinFunctionality");
        }
          
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
        $validations = $validation->rules($regla, $_POST);

        $signin = $model->signin();
        if (blowfishCrypt($password, $username) == $signin[0]["password"]) {
            setSession("username", $username);
            setSession("access", $signin[0]["access"]);
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
        $validation = $validacion->rules($regla, $_POST);

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

    public function admin()
    {
        //Teacher
        if (isset($_REQUEST["createTeacher"])) {
            $result = tryCatch("Controller", "signupFunctionality");
        } else if (isset($_REQUEST["updateTeacher"])) {
            $result = tryCatch("Controller", "updateTeacherFunctionality");
        } else if (isset($_REQUEST["deleteTeacher"])) {
            $result = tryCatch("Controller", "deleteTeacherFunctionality");
        }
        
        //Classroom
        if (isset($_REQUEST["createClassroom"])) {
            $result = tryCatch("Controller", "createClassroomFunctionality");
        } else if (isset($_REQUEST["updateClassroom"])) {
            $result = tryCatch("Controller", "updateClassroomFunctionality");
        } else if (isset($_REQUEST["deleteClassroom"])) {
            $result = tryCatch("Controller", "deleteClassroomFunctionality");
        }

        //Schedule
        if (isset($_REQUEST["createSchedule"])) {
            $result = tryCatch("Controller", "createScheduleFunctionality");
        } else if (isset($_REQUEST["updateSchedule"])) {
            $result = tryCatch("Controller", "updateScheduleFunctionality");
        } else if (isset($_REQUEST["deleteSchedule"])) {
            $result = tryCatch("Controller", "deleteScheduleFunctionality");
        }

        require __DIR__ . '/templates/admin.php';
    }
}

?>
