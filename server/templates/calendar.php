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
    "webcomponents/event.js",
    "webcomponents/eventWeek.js",
    "js/MVCCalendar.js",
];?>
<?php $title = "Booking area";?>
<?php $mainClasses = "col-12 col-md-10 offset-md-1 h-0 h-75";?>
<?php $showFooter = true;?>
<?php $showHeader = true;?>
<?php $showBreadcrumb = false;?>
<?php $breadcrumb = [];?>

<?php ob_start()?>

<h2><?php echo "Classroom: <span id='classroomId'>" . $params["classroom"]; ?></span></h2>

<?php $contenido = ob_get_clean();?>

<?php include_once 'layout.php'?>