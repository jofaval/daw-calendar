<!--Page configuration-->
<?php $optionalCSS = [];?>
<?php $optionalScripts = ["webcomponents/classroom.js"];?>
<?php $title = "Classroom selector";?>
<?php $mainClasses = "";?>
<?php $showFooter = true;?>
<?php $showHeader = true;?>
<?php $showBreadcrumb = false;?>
<?php $breadcrumb = [];?>

<?php ob_start()?>

<?php $classrooms = Model::getInstance()->query("SELECT * FROM classrooms WHERE enabled!=0");?>
<?php foreach ($classrooms as $row): ?>
<classroom-card classroom-name="<?php echo $row["name"]; ?>" classroom-description="<?php echo $row["description"]; ?>">
</classroom-card>
<?php endforeach;?>

<?php $contenido = ob_get_clean();?>

<?php include_once 'layout.php'?>