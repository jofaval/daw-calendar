<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
    <title><?php echo $title; ?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <?php foreach (Config::$mvc_vis_css as $css_link) : ?>
    <link rel="stylesheet" type="text/css" href="./styles/<?php echo $css_link ?>" />
    <?php endforeach; ?>
    <?php foreach ($optionalCSS as $css_link) : ?>
    <link rel="stylesheet" type="text/css" href="./styles/<?php echo $css_link ?>" />
    <?php endforeach; ?>

</head>

<body>

    <?php if ($showHeader) : ?>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="transition: all 0.2s ease-in-out 0s;">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08"
            aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation"
            style="transition: all 0.2s ease-in-out 0s;">
            <span class="navbar-toggler-icon" style="transition: all 0.2s ease-in-out 0s;"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08"
            style="transition: all 0.2s ease-in-out 0s;">
            <ul class="navbar-nav" style="transition: all 0.2s ease-in-out 0s;">
                <li class="nav-item active" style="transition: all 0.2s ease-in-out 0s;">
                    <a class="nav-link" href="./home" style="transition: all 0.2s ease-in-out 0s;">Schedules<span
                            class="sr-only" style="transition: all 0.2s ease-in-out 0s;">(current)</span></a>
                </li>
                <li class="nav-item" style="transition: all 0.2s ease-in-out 0s;">
                    <a class="nav-link selected" href="./calendar"
                        style="transition: all 0.2s ease-in-out 0s;">Calendar</a>
                </li>
                <li class="nav-item dropdown" style="transition: all 0.2s ease-in-out 0s;">
                    <a class="nav-link dropdown-toggle" href="./admin" id="dropdown08" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false" style="transition: all 0.2s ease-in-out 0s;">Admin
                        panel</a>
                    <div class="dropdown-menu" aria-labelledby="dropdown08"
                        style="transition: all 0.2s ease-in-out 0s;">
                        <a class="dropdown-item" href="#" style="transition: all 0.2s ease-in-out 0s;">Classroom</a>
                        <a class="dropdown-item" href="#" style="transition: all 0.2s ease-in-out 0s;">Teacher</a>
                        <a class="dropdown-item" href="#" style="transition: all 0.2s ease-in-out 0s;">Schedule</a>
                    </div>
                </li>
                <li class="nav-item" style="transition: all 0.2s ease-in-out 0s;">
                    <a class="nav-link" href="./logout" style="transition: all 0.2s ease-in-out 0s;">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
    <?php endif; ?>
    <?php if ($showBreadcrumb) : ?>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <?php foreach ($breadcrumb as $elem): ?>
            <li class="breadcrumb-item"><a href="<?php echo $value; ?>"><?php echo $key; ?></a></li>
            <?php endforeach; ?>
        </ol>
    </nav>
    <?php endif; ?>

    <main role="main" class="<?php echo $mainClasses; ?>">
        <?php echo $contenido ?>
    </main>

    <?php if ($showFooter) : ?>
    <div id="pie">
        <hr />
        <div align="center">- pie de página -</div>
    </div>
    <?php endif; ?>
</body>

<?php foreach (Config::$mvc_vis_scripts as $script_link) : ?>
<script src="./scripts/<?php echo $script_link ?>"></script>
<?php endforeach; ?>
<?php foreach ($optionalScripts as $script_link) : ?>
<script src="./scripts/<?php echo $script_link ?>"></script>
<?php endforeach; ?>

</html>