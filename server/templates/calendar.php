<!--Page configuration-->
<?php $optionalCSS = [
    "mini-event-calendar.min.css",
    "timetable.css",
    "events.css",
];?>
<?php $optionalScripts = [
    "libs/time-table.js",
    "libs/mini-event-calendar.js",
    "js/calendar-controls.js",
    "js/MVCCalendar.js",
    "webcomponents/event.js",
    "webcomponents/eventWeek.js",
];?>
<?php $title = "Booking area";?>
<?php $mainClasses = "";?>
<?php $showFooter = true;?>
<?php $showHeader = true;?>
<?php $showBreadcrumb = false;?>
<?php $breadcrumb = [];?>

<?php ob_start()?>

<?php $contenido = ob_get_clean();?>

<?php include_once 'layout.php'?>