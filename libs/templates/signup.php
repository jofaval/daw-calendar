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

<form method="POST" action="index.php?ctl=signup" class="form-signin">
    <div class="text-center mb-4 text-white">
        <h3>Calendar SignIn</h3>
    </div>

    <div class="form-label-group">
        <input type="text" class="form-control" id="inputName" aria-describedby="nameHelp" placeholder="Enter name"
            required>
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

    <div class="form-label-group d-flex justify-content-center align-items-center flex-wrap" id="show_hide_password">
        <input type="password" class="form-control col-md-11" id="inputPassword" aria-describedby="passwordHelp"
            placeholder="Password">
        <label for="inputPassword">Password (*)</label>
        <a href=""
            class="input-group-addon password-hide col-md-1 bg-primary d-flex justify-content-center align-items-center rounded">
            <i class="fa fa-eye-slash text-white" aria-hidden="true"></i>
        </a>
        <small id="passwordHelp" class="form-text text-muted w-100">Alphanumeric combination, 8 to 24
            characters.</small>
    </div>

    <div class="input-group">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroupFileAddon01">Image</span>
        </div>
        <div class="custom-file">
            <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
            <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
        </div>
    </div>
    <br>

    <div class="form-label-group">
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address"
            aria-describedby="emailHelp" required="" autofocus="">
        <label for="inputEmail">Email address</label>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
            else.</small>
    </div>

    <div class="checkbox mb-3 text-white text-center">
        <a href="">
            Already signed in? Go to login
        </a>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
</form>

<?php $contenido = ob_get_clean()?>

<?php include_once 'layout.php'?>