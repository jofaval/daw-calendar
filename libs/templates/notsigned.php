<!--Page configuration-->
<?php $optionalCSS = ["login.css", "floating-label.css", "inputs.css"];?>
<?php $optionalScripts = ["js/inputs.js"];?>
<?php $title = "LogIn";?>
<?php $mainClasses = "";?>
<?php $showFooter = false;?>
<?php $showHeader = false;?>
<?php $showBreadcrumb = false;?>
<?php $breadcrumb = [];?>

<?php ob_start()?>

<h3> You're not signed in, <a href="index.php?ctl=signin">signin</a>. </h3>

<?php $contenido = ob_get_clean()?>

<?php include_once 'layout.php'?>