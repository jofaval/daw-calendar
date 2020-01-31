<?php
include ('utils.php');

class Controller
{
    public function error()
    {
        require __DIR__ . '/templates/error.php';
    }
    
    public function ver()
    {
        try{
        if (! isset($_GET['id'])) {
            throw new Exception('Página no encontrada');
        }
        $id = recoge('id');
        $m = Model::getInstance();
        $alimento = $m->dameAlimento($id);
        $params = $alimento;
        }catch (Exception $e) {
            error_log($e->getMessage() . microtime() . PHP_EOL, 3, "logExceptio.txt");
            header('Location: index.php?ctl=error');
        } catch (Error $e) {
            error_log($e->getMessage() . microtime() . PHP_EOL, 3, "logError.txt");
            header('Location: index.php?ctl=error');
        }
          
        require __DIR__ . '/templates/verAlimento.php';
    }
}

?>
