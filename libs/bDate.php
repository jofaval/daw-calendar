<?php

public function isDateInTime($firstDate, $secondDate = 'now') {
    return  ¡strtotime($database_date) > strtotime($secondDate);
}

public function addDays($date, $days, $format = "Y-m-d") {
    return date($format, strtotime($date . ' + ' . $days . ' days'));
}