<?php
include ('utils.php');
include ('bEmail.php');

class Controller
{
    public function error() {
        require __DIR__ . '/templates/error.php';
    }

    public function access() {
        require __DIR__ . '/templates/access.php';
    }

    public function confirmEmail() {
        $params = tryCatch("Controller", "confirmEmailFunctionality");

        require __DIR__ . '/templates/email.php';
    }

    public function confirmEmailFunctionality() {
        $tokenCode = recoge("token");
        $model = Model::getInstance();
        $sessions = Sessions::getInstance();
        $token = $model->isTokenValid($sessions->getSession("username"), $tokenCode);

        $params = [
            "isInTime" => $token,
            "tokenCode" => $token,
            "tokenDate" => $token,
        ];

        return $params;
    }
    
    public function signin() {
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
    
    public function signup() {
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

        $sessions->deleteSession("username");
        $sessions->setSession("access", 0);

        header("Location: /signin");
    }

    public function calendar() {
        require __DIR__ . '/templates/calendar.php';
    }

    public function admin() {
        //Teacher
        if (isset($_REQUEST["createTeacher"])) { //Create
            $result = tryCatch("Controller", "signupFunctionality");
        } else if (isset($_REQUEST["updateTeacher"])) { //Update
            $result = tryCatch("Controller", "updateTeacherFunctionality");
        } else if (isset($_REQUEST["deleteTeacher"])) { //Delete
            $result = tryCatch("Controller", "deleteTeacherFunctionality");
        }
        
        //Classroom
        if (isset($_REQUEST["createClassroom"])) { //Create
            $result = tryCatch("Controller", "createClassroomFunctionality");
        } else if (isset($_REQUEST["updateClassroom"])) { //Update
            $result = tryCatch("Controller", "updateClassroomFunctionality");
        } else if (isset($_REQUEST["deleteClassroom"])) { //Delete
            $result = tryCatch("Controller", "deleteClassroomFunctionality");
        }

        //Schedule
        if (isset($_REQUEST["createSchedule"])) { //Create
            $result = tryCatch("Controller", "createScheduleFunctionality");
        } else if (isset($_REQUEST["updateSchedule"])) { //Update
            $result = tryCatch("Controller", "updateScheduleFunctionality");
        } else if (isset($_REQUEST["deleteSchedule"])) { //Delete
            $result = tryCatch("Controller", "deleteScheduleFunctionality");
        }

        require __DIR__ . '/templates/admin.php';
    }

    public function updateTeacherFunctionality() {
        $model = Model::getInstance();
        $validation = Validation::getInstance();
        $sessions = Sessions::getInstance();
        
        $regla = array(
            array(
                'name' => 'inputTeacherUsername',
                'regla' => 'no-empty,name'
            ),
            array(
                'name' => 'inputTeacherPassword',
                'regla' => 'no-empty,username'
            ),
            array(
                'name' => 'inputTeacherName',
                'regla' => 'no-empty,password'
            ),
            array(
                'name' => 'inputTeacherEmail',
                'regla' => 'no-empty,email'
            )
        );
        $validation = $validacion->rules($regla, $_POST);

       return $model->updateTeacher();
    }

    public function deleteTeacherFunctionality() {
        $model = Model::getInstance();
        $validation = Validation::getInstance();
        $sessions = Sessions::getInstance();
        
        $regla = array(
            array(
                'name' => 'inputTeacherEmail',
                'regla' => 'no-empty,email'
            )
        );
        $validation = $validacion->rules($regla, $_POST);

       return $model->deleteTeacher();
    }

    public function createClassroomFunctionality() {
        $model = Model::getInstance();
        $validation = Validation::getInstance();
        $sessions = Sessions::getInstance();
        
        $regla = array(
            array(
                'name' => 'inputClassroomName',
                'regla' => 'no-empty,name'
            ),
            array(
                'name' => 'inputClasroomDescription',
                'regla' => 'no-empty,text'
            ),
            array(
                'name' => 'selectClasroomState',
                'regla' => 'no-empty,state'
            ),
        );
        $validation = $validacion->rules($regla, $_POST);

       return $model->createClassroom();
    }

    public function updateClassroomFunctionality() {
        $model = Model::getInstance();
        $validation = Validation::getInstance();
        $sessions = Sessions::getInstance();
        
        $regla = array(
            array(
                'name' => 'inputClassroomName',
                'regla' => 'no-empty,name'
            ),
            array(
                'name' => 'inputClasroomDescription',
                'regla' => 'no-empty,text'
            ),
            array(
                'name' => 'selectClasroomState',
                'regla' => 'no-empty,state'
            ),
        );
        $validation = $validacion->rules($regla, $_POST);

       return $model->updateClassroom();
    }

    public function deleteClassroomFunctionality() {
        $model = Model::getInstance();
        $validation = Validation::getInstance();
        $sessions = Sessions::getInstance();
        
        $regla = array(
            array(
                'name' => 'inputClassroomName',
                'regla' => 'no-empty,name'
            ),
        );
        $validation = $validacion->rules($regla, $_POST);

       return $model->deleteClassroom();
    }

    public function createScheduleFunctionality() {
        $model = Model::getInstance();
        $validation = Validation::getInstance();
        $sessions = Sessions::getInstance();
        
        $regla = array(
            array(
                'name' => 'inputScheduleStartHour',
                'regla' => 'no-empty,datetime'
            ),
            array(
                'name' => 'inputScheduleEndHour',
                'regla' => 'no-empty,datetime'
            ),
        );
        $validation = $validacion->rules($regla, $_POST);

       return $model->createSchedule();
    }

    public function updateScheduleFunctionality() {
        $model = Model::getInstance();
        $validation = Validation::getInstance();
        $sessions = Sessions::getInstance();
        
        $regla = array(
            array(
                'name' => 'inputScheduleStartHour',
                'regla' => 'no-empty,datetime'
            ),
            array(
                'name' => 'inputScheduleEndHour',
                'regla' => 'no-empty,datetime'
            ),
        );
        $validation = $validacion->rules($regla, $_POST);

       return $model->updateSchedule();
    }

    public function deleteScheduleFunctionality() {
        $model = Model::getInstance();
        $validation = Validation::getInstance();
        $sessions = Sessions::getInstance();
        
        $regla = array(
            array(
                'name' => 'inputScheduleStartHour',
                'regla' => 'no-empty,datetime'
            ),
            array(
                'name' => 'inputScheduleEndHour',
                'regla' => 'no-empty,datetime'
            ),
        );
        $validation = $validacion->rules($regla, $_POST);

       return $model->deleteSchedule();
    }

    public function getEventsFromMonth() {
        $model = Model::getInstance();
        $validation = Validation::getInstance();
        
        $regla = array(
            array(
                'name' => 'month',
                'regla' => 'no-empty,numeric'
            ),
            array(
                'name' => 'year',
                'regla' => 'no-empty,numeric'
            ),
        );
        $validation = $validacion->rules($regla, $_POST);

        return $model->getEventsFromMonth();
    }

    public function getTeachers() {
        $model = Model::getInstance();

        return $model->getTeachers();
    }

    public function getClassrooms() {
        $model = Model::getInstance();

        return $model->getClassrooms();
    }

    public function getSchedules() {
        $model = Model::getInstance();

        return $model->getSchedules();
    }

    public function createEvent() {
        $model = Model::getInstance();
        $validation = Validation::getInstance();
        
        $regla = array(
            array(
                'name' => 'title',
                'regla' => 'no-empty,name'
            ),
            array(
                'name' => 'startHour',
                'regla' => 'no-empty,datetime'
            ),
            array(
                'name' => 'date',
                'regla' => 'no-empty,date'
            ),
        );
        $validation = $validacion->rules($regla, $_POST);

       return $model->createEvent();
    }

    public function updateEvent() {
        $model = Model::getInstance();
        $validation = Validation::getInstance();
        
        $regla = array(
            array(
                'name' => 'title',
                'regla' => 'no-empty,name'
            ),
            array(
                'name' => 'startHour',
                'regla' => 'no-empty,datetime'
            ),
            array(
                'name' => 'date',
                'regla' => 'no-empty,date'
            ),
        );
        $validation = $validacion->rules($regla, $_POST);

       return $model->updateEvent();
    }

    public function deleteEvent() {
        $model = Model::getInstance();
        $validation = Validation::getInstance();
        
        $regla = array(
            array(
                'name' => 'startHour',
                'regla' => 'no-empty,datetime'
            ),
            array(
                'name' => 'date',
                'regla' => 'no-empty,date'
            ),
        );
        $validation = $validacion->rules($regla, $_POST);

       return $model->deleteEvent();
    }
}

?>
