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

function capitalizeText($string, $everyWord = false) {
    if ($everyWord) {
        $explodedString = preg_split("/\s/", $string);
        foreach ($explodedString as $key => $value) {
            $explodedString[$key][0] = strtoupper($value[0]);
        }
        $string = implode(" ", $explodedString);
    } else {
        $string[0] = strtoupper($string[0]);
    }
    
    return $string;
}

function recoge($var)
{
    if (isset($_REQUEST[$var]))
        $tmp=strip_tags(sinEspacios($_REQUEST[$var]));
        else
            $tmp= "";
            
            return $tmp;
}

function sinEspacios($frase) {
    $texto = trim(preg_replace('/ +/', ' ', $frase));
    return $texto;
}