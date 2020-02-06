<!--Page configuration-->
<?php $optionalCSS = ["login.css", "floating-label.css", "inputs.css"];?>
<?php $optionalScripts = ["js/inputs.js"];?>
<?php $title = "SignUp";?>
<?php $mainClasses = "";?>
<?php $showFooter = false;?>
<?php $showHeader = false;?>
<?php $showBreadcrumb = false;?>
<?php $breadcrumb = [];?>

<?php ob_start()?>

<form method="POST" action="index.php?ctl=signup" class="form-signin p-4 bg-light rounded"
    enctype="multipart/form-data">
    <div class="text-center mb-4 text-dark">
        <h3>Calendar SignUp</h3>
    </div>

    <div class="form-label-group">
        <input type="text" class="form-control" id="inputName" aria-describedby="nameHelp" placeholder="Enter name"
            required autofocus="">
        <label for="inputName">Full Name (*)</label>
        <small id="nameHelp" class="form-text text-muted">Enter your full name, the one you are legally
            recognized with.</small>
    </div>

    <div class="form-label-group">
        <input type="text" class="form-control" id="inputUsername" aria-describedby="usernameHelp"
            placeholder="Enter Username" required>
        <label for="inputUsername">Username (*)</label>
        <small id="usernameHelp" class="form-text text-muted">✓ Is available.</small>
    </div>

    <div class="input-group form-label-group" id="show_hide_password">
        <input type="password"
            class="form-control border-top-0 border-left-0 border-3 border-bottom border-right-0 col-md-11"
            id="inputPassword" aria-describedby="passwordHelp" placeholder="Password" required>
        <label for="inputPassword">Password (*)</label>
        <a href=""
            class="trigger input-group-addon password-hide col-md-1 bg-warning d-flex justify-content-center align-items-center rounded">
            <i class="fa fa-eye-slash text-dark" aria-hidden="true"></i>
        </a>
        <br>
        <small id="passwordHelp" class="form-text text-muted w-100">Alphanumeric combination, 8 to 24
            characters.</small>
    </div>

    <div class="input-group">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputImageDescription">Image</span>
        </div>
        <div class="custom-file">
            <input type="file" class="custom-file-input" id="inputImage" aria-describedby="inputImageDescription"
                accept="image/png, image/jpg, image/jpeg, image/gif" required>
            <label class="custom-file-label" for="inputImage">Choose file</label>
        </div>
    </div>
    <small id="emailHelp" class="form-text text-muted">Only <b>PNG</b>, <b>JPG</b>, <b>JPEG</b> or
        <b>GIF</b>.</small>
    <br>

    <div class="input-group">
        <input type="text" class="form-control w-100" id="inputEmail" placeholder="username"
            aria-describedby="emailHelp" required>
        <span class="input-group-text w-auto" id="inputEmailDomain">@iesabastos.org</span>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
            else.</small>
    </div>
    <br>

    <div class="checkbox mb-3 text-white text-center">
        <a href="">
            Already signed up? Go to login
        </a>
    </div>
    <button class="btn btn-lg btn-warning btn-block" type="submit">Sign up</button>
</form>

<?php $contenido = ob_get_clean()?>

<?php include_once 'layout.php'?>