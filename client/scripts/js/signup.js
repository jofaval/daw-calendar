var formValidator = new FormValidator();
$(window).on("load", function () {
    $("form").on("submit", function (event) {
        var event = event || window.event;
        if (!formValidator.validateForm("signup", $("form"))) {
            event.preventDefault();
            return false;
        }
    });

    whenUserDoneTypingInInput($("#inputUsername"), function () {
        AjaxController.doesUsernameExist($("#inputUsername").val(), function (data) {
            var jsonData = JSON.parse(data);
            if (jsonData === true) {
                $("#usernameHelp").html($messageContainer.clone().addClass("text-danger").html("✘ Isn't available."));
            } else {
                $("#usernameHelp").html($messageContainer.clone().addClass("text-success").html("✓ Is available."));
            }
        });
    });

    //signin
    addFilterToInputKey($("#inputName"), FILTER_REGEX_LETTERS);
    inputMaxLength($("#inputName"), 50);

    addFilterToInputKey($("#inputUsername"), FILTER_REGEX_USERNAME);
    inputMaxLength($("#inputUsername"));

    addFilterToInputKey($("#inputPassword"), FILTER_REGEX_PASSWORD);
    inputMaxLength($("#inputPassword"));

    addFilterToInputKey($("#inputEmail"), FILTER_REGEX_USERNAME);
    inputMaxLength($("#inputEmail"));

    genericLengthMessages($("#inputPassword, #inputName, #inputUsername, #inputEmail"));
    addErrorMessage($("#inputName"), /^[a-z\ ]$/i, "Carácteres no válidos");
    addErrorMessage($("#inputUsername"), /^[a-z0-9\_\-]$/i, "Carácteres no válidos");
    addErrorMessage($("#inputPassword"), /^[a-z@$!%*?&A-Za-z\d@$!%*?&]$/i, "Carácteres no válidos");
    addErrorMessage($("#inputEmail"), /^[a-z0-9\_\-\.]$/i, "Carácteres no válidos");
});