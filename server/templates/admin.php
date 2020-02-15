<!--Page configuration-->
<?php $optionalCSS = [
    "mdb.min.css",
    "datatables.min.css",
    "datatables-select.min.css",
    "mini-event-calendar.min.css",
];?>

<?php $optionalScripts = [
    "libs/popper.min.js",
    "libs/mdb.min.js",
    "libs/datatables.min.js",
    "libs/datatables-select.min.js",
    "libs/mini-event-calendar.js",
    "js/calendar-controls.js",
    "js/MVCAdmin.js",
];?>
<?php $title = "Admin";?>
<?php $mainClasses = "flex-column container col-md-10 px-md-0";?>
<?php $showFooter = true;?>
<?php $showHeader = true;?>
<?php $showBreadcrumb = false;?>
<?php $breadcrumb = [];?>

<?php ob_start()?>

<?php $contenido = ob_get_clean()?>

<?php include_once 'layout.php'?>