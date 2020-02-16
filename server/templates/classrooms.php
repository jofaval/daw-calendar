<!--Page configuration-->
<?php $optionalCSS = [];?>
<?php $optionalScripts = ["webcomponents/classroom.js"];?>
<?php $title = "Classroom selector";?>
<?php $mainClasses = "text-light h-100 d-flex justify-content-center text-dark";?>
<?php $showFooter = true;?>
<?php $showHeader = true;?>
<?php $showBreadcrumb = false;?>
<?php $breadcrumb = [];?>

<?php ob_start()?>

<div class="d-flex w-100 h-100 flex-row align-content-center justify-content-center col-md-12 my-auto flex-wrap">
    <?php $controller = new Controller();
$classrooms = $controller->getClassrooms();?>
    <?php foreach ($classrooms as $row): ?>
    <classroom-card classroom-name="<?php echo $row["name"]; ?>"
        classroom-description="<?php echo $row["description"]; ?>">
    </classroom-card>
    <?php endforeach;?>
</div>

<?php $contenido = ob_get_clean();?>

<?php include_once 'layout.php'?>