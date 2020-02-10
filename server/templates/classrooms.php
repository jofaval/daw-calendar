<!--Page configuration-->
<?php $optionalCSS = []; ?>
<?php $optionalScripts = []; ?>
<?php $title = "Classroom selector"; ?>
<?php $mainClasses = ""; ?>
<?php $showFooter = true; ?>
<?php $showHeader = true; ?>
<?php $showBreadcrumb = false; ?>
<?php $breadcrumb = []; ?>

<?php ob_start() ?>

<?php $classrooms = Model::getInstance()->query("SELECT * FROM classrooms WHERE enabled!=0"); ?>
<?php foreach ($classrooms as $row) : ?>
<div class="card m-3">
    <div class="card-body">
        <h5 class="card-title text-center"><?php echo $row["name"]; ?></h5>
        <p class="card-text"><?php echo $row["description"]; ?></p>
        <a href="index.php?ctl=calendar&classroom=<?php echo $row["name"]; ?>" class="btn btn-primary w-100">Go to calendar</a>
    </div>
</div>
<?php endforeach; ?>

<?php $contenido = ob_get_clean(); ?>

<?php include_once 'layout.php' ?>