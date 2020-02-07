<?php

class AjaxController {
    public function genericAjaxReturn($functionName, $requiredParams = []) {
        try {
            if (!empty($requiredParams)) {
                $this->throwIfExceptionIfDoesntExist($requiredParams);
            }
            if (method_exists("Controller", $functionName)) {
                $result = call_user_func("Controller", $functionName);
                if ($result === false) {
                    $this->returnError();
                }
                echo json_encode($result);
            } else {
                $this->returnError();
            }
        } catch (Throwable $th) {
            $this->returnError();
        }
    }

    public function throwIfExceptionIfDoesntExist($elems) {
        foreach ($elems as $elem) {
            if (isset($_REQUEST[$elem])) {
                throw new Throwable("$elem doesn't exist");
            }
        }
    }
    
    public function returnError() {
        $json = json_encode((object) array("error" => true,));
        echo $json;
    }

    public function getEventsFromMonth() {
        $this->genericAjaxReturn(__FUNCTION__, ["month", "year"]);
    }

    public function getTeachers() {
        $this->genericAjaxReturn(__FUNCTION__);
    }

    public function getClassrooms() {
        $this->genericAjaxReturn(__FUNCTION__);
    }

    public function getSchedules() {
        $this->genericAjaxReturn(__FUNCTION__);
    }

    public function createEvent() {
        $this->genericAjaxReturn(__FUNCTION__, ["title", "startHour", "date"]);
    }
    
    public function updateEvent() {
        $this->genericAjaxReturn(__FUNCTION__, ["title", "startHour", "date"]);
    }
    
    public function deleteEvent() {
        $this->genericAjaxReturn(__FUNCTION__, ["startHour", "date"]);
    }
    
    public function getSchedule() {
        $this->genericAjaxReturn(__FUNCTION__, ["selectedYear"]);
    }
    
    public function getEventsFromDay() {
        $this->genericAjaxReturn(__FUNCTION__, ["selectedDay"]);
    }

    public function getEventsFromWeek() {
        $this->genericAjaxReturn(__FUNCTION__, ["startingDate", "endingDate"]);
    }

    public function test() {
        $this->genericAjaxReturn(__FUNCTION__);
    }
}
