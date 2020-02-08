<!--Page configuration-->
<?php $optionalCSS = [];?>
<?php $optionalScripts = [];?>
<?php $title = "Error";?>
<?php $mainClasses = "";?>
<?php $showFooter = true;?>
<?php $showHeader = true;?>
<?php $showBreadcrumb = false;?>
<?php $breadcrumb = [];?>

<?php ob_start()?>

<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="access-template text-center text-light">
                <?php if ($params["isInTime"]): ?>
                <form action="" method="POST">
                    <button class="btn btn-primary btn-lg">Confirmar email</button>
                </form>
                <?php else: ?>
                <h3>The validation token already expired, we're sorry.</h3>
                <?php endif;?>
            </div>
        </div>
    </div>
</div>

<?php $contenido = ob_get_clean()?>

<?php include_once 'layout.php'?>