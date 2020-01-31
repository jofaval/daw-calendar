<?php

require_once("utils.php");
require_once("exceptions.php");

if (isset($_REQUEST["operationType"])) {
    $operationType = recoge("operationType");
    try {
        switch ($operationType) {
            case 'query':
                $select = recoge("select");
                $from = recoge("from");
                $where = recoge("where");
                $params = json_encode(recoge("params"));
                break;

            default:
                errorAction(-1);
                break;
        }
    } catch (\Throwable $th) {
        //throw $th;
    }
} else {
    errorAction(-1);
}