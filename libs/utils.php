<?php

function getAcademicYear($date) {
    $time=strtotime($dateValue);

    $month=date("F",$time);

    $year=date("Y",$time);

    switch ($month) {
        case '01':
        case '02':
        case '03':
        case '04':
        case '05':
        case '06':
            $year--;
            break;
    }

    return $year;
}