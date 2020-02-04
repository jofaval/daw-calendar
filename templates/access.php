<!--Page configuration-->
<?php $optionalCSS = []; ?>
<?php $optionalScripts = []; ?>
<?php $title = "Access"; ?>
<?php $mainClasses = ""; ?>
<?php $showFooter = true; ?>
<?php $showHeader = true; ?>

<?php ob_start() ?>

<h3> You don't have enough permissions to do this operation. </h3>

<?php $contenido = ob_get_clean() ?>

<?php include_once'layout.php' ?>