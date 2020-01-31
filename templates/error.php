<!--Page configuration-->
<?php $optionalCSS = ["login.css"]; ?>
<?php $optionalScripts = []; ?>
<?php $title = "Error"; ?>
<?php $mainClasses = ""; ?>
<?php $showFooter = true; ?>
<?php $showHeader = true; ?>

<?php ob_start() ?>

<h3> An error has occured. </h3>

<?php $contenido = ob_get_clean() ?>

<?php include 'layout.php' ?>
