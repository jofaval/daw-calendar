<!--Page configuration-->
<?php $optionalCSS = ["floating-label.css", "inputs.css"];?>
<?php $optionalScripts = ["js/signup.js"];?>
<?php $title = "SignUp";?>
<?php $mainClasses = "";?>
<?php $showFooter = false;?>
<?php $showHeader = false;?>
<?php $showBreadcrumb = false;?>
<?php $breadcrumb = [];?>

<?php ob_start()?>

<?php include_once __DIR__ . '/../templates/forms/formSignup.html'?>

<?php $contenido = ob_get_clean()?>

<?php include_once 'layout.php'?>