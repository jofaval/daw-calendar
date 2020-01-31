<!--Page configuration-->
<?php $optionalCSS = ["style.css"]; ?>
<?php $optionalScripts = ["js/script.js"]; ?>
<?php $title = "Example"; ?>
<?php $showFooter = true; ?>
<?php $showHeader = true; ?>

<?php ob_start() ?>

<h3> Hello world! </h3>

<?php $contenido = ob_get_clean() ?>

<?php include 'layout.php' ?>