<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>Información Alimentos</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<?php foreach (Config::$mvc_vis_css as $css_link) : ?>
    <link rel="stylesheet" type="text/css" href="./styles/<?php echo $css_link ?>" />
<?php endforeach; ?>

</head>
<body>
<div id="cabecera">
<h1>Información de alimentos</h1>
</div>

<div id="menu">
<hr/>
<a href="./admin">Admin panel</a> |
<a href="./signin">Sign in</a> |
<a href="./signup">Sign up</a> |
<a href="./calendar">Calendar</a>
<hr/>
</div>

<div id="contenido">
<?php echo $contenido ?>
</div>

<div id="pie">
<hr/>
<div align="center">- pie de página -</div>
</div>
</body>

<?php foreach (Config::$mvc_vis_scripts as $script_link) : ?>
    <script src="./scripts/<?php echo $script_link ?>"></script>
<?php endforeach; ?>
</html>
