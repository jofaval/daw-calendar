<!--Page configuration-->
<?php $optionalCSS = ["login.css", "floating-label.css", "inputs.css"];?>
<?php $optionalScripts = ["js/inputs.js"];?>
<?php $title = "SignUp";?>
<?php $mainClasses = "";?>
<?php $showFooter = false;?>
<?php $showHeader = false;?>
<?php $showBreadcrumb = false;?>
<?php $breadcrumb = [];?>

<?php ob_start()?>

<?php include_once './libs/templates/forms/formSignup.html'?>

<?php $contenido = ob_get_clean()?>

<?php include_once 'layout.php'?>