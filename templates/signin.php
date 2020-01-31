<!--Page configuration-->
<?php $optionalCSS = ["login.css", "floating-label.css", "inputs.css"]; ?>
<?php $optionalScripts = ["js/inputs.js"]; ?>
<?php $title = "LogIn"; ?>
<?php $mainClasses = ""; ?>
<?php $showFooter = false; ?>
<?php $showHeader = false; ?>

<?php ob_start() ?>

<form class="form-signin">
    <div class="text-center mb-4 text-white">
        <h3>LogIn</h3>
    </div>

    <div class="form-label-group">
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" aria-describedby="emailHelp" required="" autofocus="">
        <label for="inputEmail">Email address</label>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
            else.</small>
    </div>

    <br>

    <div class="form-label-group d-flex justify-content-center align-items-center" id="show_hide_password">
        <input type="password" class="form-control col-md" id="inputPassword" placeholder="Password">
        <label for="inputPassword">Password</label>
        <a href="" class="input-group-addon password-hide col-md-1 bg-primary d-flex justify-content-center align-items-center rounded">
            <i class="fa fa-eye-slash text-white" aria-hidden="true"></i>
        </a>
    </div>

    <div class="checkbox mb-3 text-white text-center">
        <label>
            <input type="checkbox" value="remember-me"> Remember me
        </label> &nbsp;|&nbsp;
        <a href="">
            Forgot password?
        </a> &nbsp;|&nbsp;
        <a href="">
            You registered but can't login?
        </a>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
</form>

<?php $contenido = ob_get_clean() ?>

<?php include 'layout.php' ?>