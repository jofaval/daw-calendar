<?php
class ExceptionUtils
{
    public static function tryCatch($class, $function)
    {
        try {
            if (method_exists($class, $function)) {
                return call_user_func([new $class, $function]);
            } else {
                header("Location: ./index.php?ctl=error");
            }
        } catch (Exception $e) {
            error_log($e->getMessage() . microtime() . PHP_EOL, 3, __DIR__ . "/../server/logs/logException.txt");
            header("Location: ./index.php?ctl=error");
        } catch (Error $e) {
            error_log($e->getMessage() . microtime() . PHP_EOL, 3, __DIR__ . "/../server/logs/logError.txt");
            header("Location: ./index.php?ctl=error");
        }

        return null;
    }
}

if (!Config::$developmentMode) {
    set_error_handler("errorAction");
    set_exception_handler("expcetionHandler");
}

function expcetionHandler($exception)
{
    error_log("Exception happend at " . microtime() . " with message (" . $exception->getMessage() . ")." . PHP_EOL, 3, __DIR__ . "/../server/logs/logError.txt");
    header("Location: ./index.php?ctl=error");
}

function errorAction($errno = -1, $errstr = "", $errfile = "", $errline = 0)
{
    //error_log("Error with number " . ($e->$errno) . " happend at " . microtime() . " with message (" . ($e->$errstr) . ") inside \"" . ($e->$errfile) . "\" file at line " . ($e . $errline) . "." . PHP_EOL, 3, "./logs/logError.txt");
    error_log("Error with number $errno happend at " . microtime() . " with message ($errstr) inside \"$errfile\" file at line $errline." . PHP_EOL, 3, __DIR__ . "/../server/logs/logError.txt");
    header("Location: ./index.php?ctl=error");
}