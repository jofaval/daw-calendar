<?php
include_once 'utils.php';
include_once 'bEmail.php';
include_once 'bFile.php';
include_once 'Validation.php';
include_once 'Sessions.php';

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

    public function notsigned()
    {
        require __DIR__ . '/templates/notsigned.php';
    }

    public function confirmEmail()
    {
        $params = ExceptionUtils::tryCatch("Controller", "confirmEmailFunctionality");

        require __DIR__ . '/templates/email.php';
    }

    public function confirmEmailFunctionality()
    {
        $tokenCode = Utils::recoge("token");
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

    public function signin()
    {
        $result = false;
        if (isset($_REQUEST["signin"])) {
            $result = ExceptionUtils::tryCatch("Controller", "signinFunctionality");
        }

        if ($result) {
            header("Location: ./index.php?ctl=calendar/");
        } else {
            require __DIR__ . '/templates/signin.php';
        }
    }

    public function signinFunctionality()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();
        $sessions = Sessions::getInstance();

        $regla = array(
            array(
                'name' => 'username',
                'regla' => 'no-empty,username',
            ),
            array(
                'name' => 'password',
                'regla' => 'no-empty,password',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            $username = Utils::recoge("username");
            $password = Utils::recoge("password");
            $signin = $model->signin($username);
            if (Cryptography::blowfishCrypt($password, $username) == $signin[0]["password"]) {
                $sessions->setSession("username", $username);
                $sessions->setSession("access", $signin[0]["access"]);
                return true;
            }
        }

        return false;
    }

    public function signup()
    {
        $result = ExceptionUtils::tryCatch("Controller", "signupFunctionality");

        if ($result) {
            header("Location: ./index.php?ctl=signin/");
        } else {
            require __DIR__ . '/templates/signup.php';
        }
    }

    public function signupFunctionality()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();

        $file = FileUtils::validateFile("inputImage", "./img_usuarios/");
        if ($file === false) {
            return false;
        }

        $_POST["inputImage"] = $file;
        $regla = array(
            array(
                'name' => 'inputName',
                'regla' => 'no-empty,name',
            ),
            array(
                'name' => 'inputUsername',
                'regla' => 'no-empty,username',
            ),
            array(
                'name' => 'inputPassword',
                'regla' => 'no-empty,password',
            ),
            array(
                'name' => 'inputEmail',
                'regla' => 'no-empty,email',
            ),
            array(
                'name' => 'inputImage',
                'regla' => 'no-empty,image',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            $signup = $model->signup(Utils::recoge("inputName"), Utils::recoge("inputUsername"), Utils::recoge("inputPassword"), Utils::recoge("inputEmail"), $file);
            if ($signup !== false) {
                return true;
            }
        }
        return false;
    }

    public function signout()
    {
        $sessions = Sessions::getInstance();

        $sessions->deleteSession("username");
        $sessions->setSession("access", 0);

        header("Location: ./index.php?ctl=signin");
    }

    public function calendar()
    {
        require __DIR__ . '/templates/calendar.php';
    }

    public function admin()
    {
        //Teacher
        if (isset($_REQUEST["createTeacher"])) { //Create
            $_POST["inputName"] = $_POST["inputTeacherName"];
            unset($_POST["inputTeacherName"]);

            $_POST["inputUsername"] = $_POST["inputTeacherUsername"];
            unset($_POST["inputTeacherUsername"]);

            $_POST["inputPassword"] = $_POST["inputTeacherPassword"];
            unset($_POST["inputTeacherPassword"]);

            $_POST["inputEmail"] = $_POST["inputTeacherEmail"];
            unset($_POST["inputTeacherEmail"]);

            $result = ExceptionUtils::tryCatch("Controller", "signupFunctionality");
        } else if (isset($_REQUEST["updateTeacher"])) { //Update
            $result = ExceptionUtils::tryCatch("Controller", "updateTeacherFunctionality");
        } else if (isset($_REQUEST["deleteTeacher"])) { //Delete
            $result = ExceptionUtils::tryCatch("Controller", "deleteTeacherFunctionality");
        }

        //Classroom
        if (isset($_REQUEST["createClassroom"])) { //Create
            $result = ExceptionUtils::tryCatch("Controller", "createClassroomFunctionality");
        } else if (isset($_REQUEST["updateClassroom"])) { //Update
            $result = ExceptionUtils::tryCatch("Controller", "updateClassroomFunctionality");
        } else if (isset($_REQUEST["deleteClassroom"])) { //Delete
            $result = ExceptionUtils::tryCatch("Controller", "deleteClassroomFunctionality");
        }

        //Schedule
        if (isset($_REQUEST["createSchedule"])) { //Create
            $result = ExceptionUtils::tryCatch("Controller", "createScheduleFunctionality");
        } else if (isset($_REQUEST["updateSchedule"])) { //Update
            $result = ExceptionUtils::tryCatch("Controller", "updateScheduleFunctionality");
        } else if (isset($_REQUEST["deleteSchedule"])) { //Delete
            $result = ExceptionUtils::tryCatch("Controller", "deleteScheduleFunctionality");
        }

        require __DIR__ . '/templates/admin.php';
    }

    public function updateTeacherFunctionality()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();

        $regla = array(
            array(
                'name' => 'inputTeacherUsername',
                'regla' => 'no-empty,name',
            ),
            array(
                'name' => 'inputTeacherPassword',
                'regla' => 'no-empty,username',
            ),
            array(
                'name' => 'inputTeacherName',
                'regla' => 'no-empty,password',
            ),
            array(
                'name' => 'inputTeacherEmail',
                'regla' => 'no-empty,email',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            return $model->updateTeacher(Utils::recoge("inputTeacherUsername"), Utils::recoge("inputTeacherPassword"), Utils::recoge("inputTeacherName"), Utils::recoge("inputTeacherEmail"));
        }
        return false;
    }

    public function deleteTeacherFunctionality()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();

        $regla = array(
            array(
                'name' => 'inputTeacherEmail',
                'regla' => 'no-empty,email',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            return $model->deleteTeacher(Utils::recoge("inputTeacherEmail"));
        }

        return false;
    }

    public function createClassroomFunctionality()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();

        $regla = array(
            array(
                'name' => 'inputClassroomName',
                'regla' => 'no-empty,name',
            ),
            array(
                'name' => 'inputClasroomDescription',
                'regla' => 'no-empty,text',
            ),
            array(
                'name' => 'selectClasroomState',
                'regla' => 'no-empty,state',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            return $model->createClassroom(Utils::recoge("inputClassroomName"), Utils::recoge("inputClasroomDescription"), Utils::recoge("selectClasroomState"));
        }

        return false;
    }

    public function updateClassroomFunctionality()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();

        $regla = array(
            array(
                'name' => 'inputClassroomName',
                'regla' => 'no-empty,name',
            ),
            array(
                'name' => 'inputClasroomDescription',
                'regla' => 'no-empty,text',
            ),
            array(
                'name' => 'selectClasroomState',
                'regla' => 'no-empty,state',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            return $model->updateClassroom(Utils::recoge("inputClassroomName"), Utils::recoge("inputClasroomDescription"), Utils::recoge("selectClasroomState"));
        }

        return false;
    }

    public function deleteClassroomFunctionality()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();

        $regla = array(
            array(
                'name' => 'inputClassroomName',
                'regla' => 'no-empty,name',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            return $model->deleteClassroom(Utils::recoge("inputClassroomName"));
        }

        return false;
    }

    public function createScheduleFunctionality()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();

        $regla = array(
            array(
                'name' => 'inputScheduleStartHour',
                'regla' => 'no-empty,datetime',
            ),
            array(
                'name' => 'inputScheduleEndHour',
                'regla' => 'no-empty,datetime',
            ),
            array(
                'name' => 'year',
                'regla' => 'no-empty,datetime',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            return $model->createSchedule(Utils::recoge("inputScheduleStartHour"), Utils::recoge("inputScheduleEndHour"), Utils::recoge("year"));
        }

        return false;
    }

    public function updateScheduleFunctionality()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();

        $regla = array(
            array(
                'name' => 'inputScheduleStartHour',
                'regla' => 'no-empty,datetime',
            ),
            array(
                'name' => 'inputScheduleEndHour',
                'regla' => 'no-empty,datetime',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            return $model->updateSchedule(Utils::recoge("inputScheduleStartHour"), Utils::recoge("inputScheduleEndHour"));
        }

        return false;
    }

    public function deleteScheduleFunctionality()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();

        $regla = array(
            array(
                'name' => 'inputScheduleStartHour',
                'regla' => 'no-empty,datetime',
            ),
            array(
                'name' => 'inputScheduleEndHour',
                'regla' => 'no-empty,datetime',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            return $model->deleteSchedule(Utils::recoge("inputScheduleStartHour"), Utils::recoge("inputScheduleEndHour"));
        }

        return false;
    }

    public function getEventsFromMonth()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();

        $regla = array(
            array(
                'name' => 'month',
                'regla' => 'no-empty,numeric',
            ),
            array(
                'name' => 'year',
                'regla' => 'no-empty,numeric',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            return $model->getEventsFromMonth(Utils::recoge("month"), Utils::recoge("year"));
        }

        return false;
    }

    public function getTeachers()
    {
        $model = Model::getInstance();

        return $model->getTeachers();
    }

    public function getClassrooms()
    {
        $model = Model::getInstance();

        return $model->getClassrooms();
    }

    public function getSchedules()
    {
        $model = Model::getInstance();

        return $model->getSchedules();
    }

    public function createEvent()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();

        $regla = array(
            array(
                'name' => 'title',
                'regla' => 'no-empty,name',
            ),
            array(
                'name' => 'startHour',
                'regla' => 'no-empty,datetime',
            ),
            array(
                'name' => 'date',
                'regla' => 'no-empty,date',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            return $model->createEvent(Utils::recoge("title"), Utils::recoge("startHour"), Utils::recoge("date"));
        }

        return false;
    }

    public function updateEvent()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();

        $regla = array(
            array(
                'name' => 'title',
                'regla' => 'no-empty,name',
            ),
            array(
                'name' => 'startHour',
                'regla' => 'no-empty,datetime',
            ),
            array(
                'name' => 'date',
                'regla' => 'no-empty,date',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            return $model->updateEvent(Utils::recoge("title"), Utils::recoge("startHour"), Utils::recoge("date"));
        }

        return false;
    }

    public function deleteEvent()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();

        $regla = array(
            array(
                'name' => 'startHour',
                'regla' => 'no-empty,datetime',
            ),
            array(
                'name' => 'date',
                'regla' => 'no-empty,date',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            return $model->deleteEvent(Utils::recoge("startHour"), Utils::recoge("date"));
        }

        return false;
    }

    public function getSchedule()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();

        $regla = array(
            array(
                'name' => 'selectedYear',
                'regla' => 'no-empty,date',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            return $model->getSchedule(Utils::recoge("selectedYear"));
        }

        return false;
    }

    public function getEventsFromDay()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();

        $regla = array(
            array(
                'name' => 'selectedDay',
                'regla' => 'no-empty,date',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            return $model->getEventsFromDay(Utils::recoge("selectedDay"));
        }

        return false;
    }

    public function getEventsFromWeek()
    {
        $model = Model::getInstance();
        $validation = Validation::getInstance();

        $regla = array(
            array(
                'name' => 'startingDate',
                'regla' => 'no-empty,datetime',
            ),
            array(
                'name' => 'endingDate',
                'regla' => 'no-empty,date',
            ),
        );
        $validation = $validation->rules($regla, $_POST);

        if ($validation === true) {
            return $model->getEventsFromWeek(Utils::recoge("startingDate"), Utils::recoge("endingDate"));
        }

        return false;
    }
}