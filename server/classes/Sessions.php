<?php

class Sessions
{

    public static $instance = null;

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new Sessions();
            self::$instance->initSession();
        }

        return self::$instance;
    }

    public function __construct()
    {

    }

    private function initSession()
    {
        session_start();
        $this->startingParams();
        $this->initializeValues();
        $this->regenerateSession();
    }

    private function startingParams()
    {

    }

    public function isUserAgentTheSame()
    {
        if ($this->doesSessionExist("userAgent")) {
            return $_SERVER["HTTP_USER_AGENT"] == $this->getSession("userAgent");
        }

        return true;
    }

    private function regenerateSession()
    {
        if ($this->doesSessionExist("clicks")) {
            $this->setSession("clicks", $this->getSession("clicks") - 1);
        } else {
            $this->setSession("clicks", 10);
        }

        if ($this->getSession("clicks") <= 0) {
            session_regenerate_id(true);
            $this->setSession("clicks", 10);
        }
    }

    public function initializeValues()
    {
        if (!$this->doesSessionExist("access")) {
            $this->setSession("access", 0);
        }

        if (!$this->doesSessionExist("clicks")) {
            $this->setSession("clicks", 10);
        }

        if (!$this->doesSessionExist("userImg")) {
            $this->setSession("userImg", "default.png");
        }

    }

    public function getSessionID()
    {
        return session_id();
    }

    public function getSession($session_name)
    {
        if ($this->doesSessionExist($session_name)) {
            return $_SESSION[$session_name];
        }

        return "";
    }

    public function setSession($session_name, $data)
    {
        $_SESSION[$session_name] = $data;
    }

    public function deleteSession($session_name = '')
    {
        if (!empty($session_name)) {
            unset($_SESSION[$session_name]);
        } else {
            unset($_SESSION);
            session_unset();
            session_destroy();
        }
    }

    public function doesSessionExist($session_name)
    {
        return isset($_SESSION[$session_name]);
    }

    public function insertData($session_name, array $data)
    {
        if (is_array($_SESSION[$session_name])) {
            array_push($_SESSION[$session_name], $data);
        } else {
            $this->setSession($session_name, $data);
        }
    }
}