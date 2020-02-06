<?php

class DateUtils {
    public static function isDateInTime($firstDate, $secondDate = 'now') {
        return  !(strtotime($firstDate) > strtotime($secondDate));
    }
    
    public static function addDays($date, $days, $format = "Y-m-d") {
        return date($format, strtotime($date . ' + ' . $days . ' days'));
    }
}