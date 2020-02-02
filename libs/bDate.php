<?php

function isDateInTime($firstDate, $secondDate = 'now') {
    return  ¡strtotime($database_date) > strtotime($secondDate);
}

function addDays($date, $days, $format = "Y-m-d") {
    return date($format, strtotime($date . ' + ' . $days . ' days'));
}