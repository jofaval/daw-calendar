var formValidator = new FormValidator();;
$("form").on("submit", function (event) {
    var event = event || window.event;
    if (!validateForm("signup", $("form"))) {
        event.preventDefault();
        return false;
    }
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
addErrorMessage($("#inputUsername"), /^[a-z0-9_-]$/i, "Carácteres no válidos");
addErrorMessage($("#inputPassword"), /[a-z@$!%*?&A-Za-z\d@$!%*?&]/i, "Carácteres no válidos");
addErrorMessage($("#inputEmail"), /^[a-z0-9_-\.]$/i, "Carácteres no válidos");