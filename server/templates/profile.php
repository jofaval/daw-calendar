<!--Page configuration-->
<?php $optionalCSS = ["floating-label.css"];?>
<?php $optionalScripts = [];?>
<?php $title = "Booking area";?>
<?php $mainClasses = "h-100 w-100 d-flex justify-content-center";?>
<?php $showFooter = true;?>
<?php $showHeader = true;?>
<?php $showBreadcrumb = false;?>
<?php $breadcrumb = [];?>

<?php ob_start()?>

<div class="container">
    <div class="flex-column row my-auto bg-dark">
        <div class="card h-50 bg-light">
            <div class="row no-gutters">
                <div class="col-md-4 p-3">
                    <img src="<?php $userimg = "";
echo $userimg?>" class="card-img h-100 w-100" alt="">
                    <div class="input-group position-relative" id="changeFile">
                        <label for="inputImage" class="w-100 btn-group">
                            <span class="btn btn-warning rounded-0 w-100">Upload image</span>
                        </label>
                        <input type="file" class="custom-file-input sr-only" id="inputImage"
                            aria-describedby="inputImageDescription"
                            accept="image/png, image/jpg, image/jpeg, image/gif" required>
                    </div>
                </div>
                <div class="col-md">
                    <div class="card-body">
                        <center>
                            <h3 class="card-title">Your details</h3>
                        </center>
                        <form method="POST" action="index.php?ctl=signup" class="form-signin pt-4 my-3 rounded"
                            enctype="multipart/form-data">
                            <div class="form-label-group">
                                <input type="text" class="form-control" id="inputName" aria-describedby="nameHelp"
                                    placeholder="Enter name" required autofocus="">
                                <label for="inputName">Full Name (*)</label>
                                <small id="nameHelp" class="form-text text-muted">Enter your full name, the one
                                    you are legally
                                    recognized with.</small>
                            </div>

                            <div class="form-label-group">
                                <input type="text" class="form-control" id="inputUsername"
                                    aria-describedby="usernameHelp" placeholder="Enter Username" required>
                                <label for="inputUsername">Username (*)</label>
                                <small id="usernameHelp" class="form-text text-muted">✓ Is available.</small>
                            </div>

                            <div class="input-group form-label-group" id="show_hide_password">
                                <input type="password"
                                    class="form-control border-top-0 border-left-0 border-3 border-bottom border-right-0 col-md-11"
                                    id="inputPassword" aria-describedby="passwordHelp" placeholder="Password" required>
                                <label for="inputPassword">Password (*)</label>
                                <a href="" tabindex="-1"
                                    class="trigger input-group-addon password-hide col-md-1 bg-warning d-flex justify-content-center align-items-center rounded">
                                    <i class="fa fa-eye-slash text-dark" aria-hidden="true"></i>
                                </a>
                                <br>
                                <small id="passwordHelp" class="form-text text-muted w-100">Alphanumeric
                                    combination, 8 to 24
                                    characters.</small>
                            </div>

                            <div class="input-group">
                                <input type="text" class="form-control w-100" id="inputEmail" placeholder="username"
                                    aria-describedby="emailHelp" required>
                                <span class="input-group-text w-auto" id="inputEmailDomain">@iesabastos.org</span>
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email
                                    with anyone
                                    else.</small>
                            </div>
                            <br>
                            <button class="btn btn-lg btn-warning btn-block" name="modify" type="submit">Modify
                                information</button>
                            <small class="form-text text-muted">Changes will not be complete until you press the
                                button, and confirm your email if changed.</small>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php $contenido = ob_get_clean();?>

<?php include_once 'layout.php'?>