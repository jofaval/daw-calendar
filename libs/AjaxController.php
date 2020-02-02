<?php

class AjaxController {
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
        try {
            $requiredParams = [
                "month", "year"
            ];
            throwIfExceptionIfDoesntExist($requiredParams);
            if (method_exists()) {
                echo call_user_func("Controller", __FUNCTION__);
            } else {
                returnError();
            }
        } catch (Throwable $th) {
            returnError();
        }
    }

    public function getTeachers() {
        try {
            if (method_exists()) {
                echo call_user_func("Controller", __FUNCTION__);
            } else {
                returnError();
            }
        } catch (Throwable $th) {
            returnError();
        }
    }
}
