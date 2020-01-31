<?php
set_error_handler("errorAction");
set_exception_handler("errorAction");

function errorAction($errno, $errstr = "", $errfile = "", $errline = 0)
{
    header("Location: ./error");
}

function tryCatch($class, $function)
{
    try {
        if (method_exists($class, $function)) {
            call_user_func([new $class, $function]);
        } else {
        header("Location: ./error");
    }
    } catch (Exception $e) {
        error_log($e->getMessage() . microtime() . PHP_EOL, 3, "logException.txt");
        header("Location: ./error");
    } catch (Error $e) {
        error_log($e->getMessage() . microtime() . PHP_EOL, 3, "logError.txt");
        header("Location: ./error");
    }
}
