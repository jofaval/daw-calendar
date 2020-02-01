<?php

class Email {
    public static function sendEmail($addressee, $message, $subject = "Calendar - SignUp email confirmation") {
        $headers = "From: " . Config::$emailSender;
        mail($addressee,$subject,$message,[$headers],[$parameters]);
    }
}
