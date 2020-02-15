<?php

class AjaxController
{
    public function genericAjaxReturn($functionName, $requiredParams = [])
    {
        try {
            if (!empty($requiredParams)) {
                $this->throwIfExceptionIfDoesntExist($requiredParams);
            }
            $mainController = "Controller";
            if (method_exists($mainController, $functionName)) {
                $result = call_user_func([new $mainController, $functionName]);
                if ($result === false) {
                    $this->returnError();
                }
                echo json_encode($result);
            } else {
                $this->returnError();
            }
        } catch (Throwable $th) {
            if (Config::$developmentMode) {
                $this->returnError($th->getMessage());
            } else {
                $this->returnError();
            }
        }
    }

    public function throwIfExceptionIfDoesntExist($elems)
    {
        foreach ($elems as $elem) {
            if (!isset($_REQUEST[$elem])) {
                throw new Error("$elem doesn't exist");
            }
        }
    }

    public function returnError($message = "")
    {
        $object = [
            "error" => true,
        ];
        if ($message != "") {
            $object["message"] = $message;
        }
        $json = json_encode($object);
        echo $json;
    }

    public function getEventsFromMonth()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["month", "year"]);
    }

    public function getTeachers()
    {
        $this->genericAjaxReturn(__FUNCTION__);
    }

    public function getClassrooms()
    {
        $this->genericAjaxReturn(__FUNCTION__);
    }

    public function getSchedules()
    {
        $this->genericAjaxReturn(__FUNCTION__);
    }

    public function createEvent()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["title", "startHour", "date"]);
    }

    public function updateEvent()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["title", "startHour", "date"]);
    }

    public function deleteEvent()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["startHour", "date"]);
    }

    public function getSchedule()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["selectedYear"]);
    }

    public function getEventsFromDay()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["selectedDay"]);
    }

    public function getEventsFromWeek()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["startingDate", "endingDate"]);
    }

    public function test()
    {
        $this->genericAjaxReturn(__FUNCTION__);
    }

    public function updateTeacher()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["inputTeacherUsername", "inputTeacherPassword", "inputTeacherName", "inputTeacherEmail"]);
    }

    public function deleteTeacher()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["inputTeacherEmail"]);
    }

    public function createClassroom()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["inputClassroomName", "inputClasroomDescription", "selectClasroomState"]);
    }

    public function updateClassroom()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["inputClassroomName", "inputClasroomDescription", "selectClasroomState"]);
    }

    public function deleteClassroom()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["inputClassroomName"]);
    }

    public function createSchedule()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["inputScheduleStartHour", "inputScheduleEndHour", "year"]);
    }

    public function updateSchedule()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["inputScheduleStartHour", "inputScheduleEndHour", "year"]);
    }

    public function deleteSchedule()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["inputScheduleStartHour", "year"]);
    }

    public function doesUsernameExist()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["username"]);
    }

    public function getNonSchoolDays()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["username"]);
    }

    public function getFormClassroom()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["username"]);
    }

    public function getFormEvent()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["username"]);
    }

    public function getFormTeacher()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["username"]);
    }

    public function getFormSchedule()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["username"]);
    }

    public function getMonthlyNonSchoolDays()
    {
        $this->genericAjaxReturn(__FUNCTION__, ["year", "month"]);
    }

    public function getNonWorkWeeklyDays()
    {
        $this->genericAjaxReturn(__FUNCTION__);
    }
}