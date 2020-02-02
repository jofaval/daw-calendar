<?php

class AjaxController {
    private function genericAjaxReturn($functionName, $requiredParams = []) {
        try {
            if (!empty($requiredParams)) {
                throwIfExceptionIfDoesntExist($requiredParams);
            }
            if (method_exists("Controller", $functionName)) {
                $result = call_user_func("Controller", $functionName);
                if ($result === false) {
                    returnError();
                }
                echo json_encode($result);
            } else {
                returnError();
            }
        } catch (Throwable $th) {
            returnError();
        }
    }

    private function throwIfExceptionIfDoesntExist($elems) {
        foreach ($elems as $elem) {
            if (isset($_REQUEST[$elem])) {
                throw new Throwable("$elem doesn't exist");
            }
        }
    }
    
    private function returnError() {
        $json = json_encode((object) array("error" => true,));
        echo $json;
    }

    public function getEventsFromMonth() {
        genericAjaxReturn(__FUNCTION__, ["month", "year"]);
    }

    public function getTeachers() {
        genericAjaxReturn(__FUNCTION__);
    }

    public function getClassrooms() {
        genericAjaxReturn(__FUNCTION__);
    }

    public function getSchedules() {
        genericAjaxReturn(__FUNCTION__);
    }

    public function createEvent() {
        genericAjaxReturn(__FUNCTION__, ["title", "startHour", "date"]);
    }
    
    public function updateEvent() {
        genericAjaxReturn(__FUNCTION__, ["title", "startHour", "date"]);
    }
    
    public function deleteEvent() {
        genericAjaxReturn(__FUNCTION__, ["startHour", "date"]);
    }
}
