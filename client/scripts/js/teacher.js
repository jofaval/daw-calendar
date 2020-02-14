var formValidator = new FormValidator();
$("form").on("submit", function(event) {
    var event = event || window.event;
    if (!formValidator.validateForm("signup", $("form"))) {
        event.preventDefault();
        return false;
    }
});

//signin
addFilterToInputKey($("#inputTeacherName"), FILTER_REGEX_LETTERS);
inputMaxLength($("#inputTeacherName"), 50);

addFilterToInputKey($("#inputTeacherUsername"), FILTER_REGEX_USERNAME);
inputMaxLength($("#inputTeacherUsername"));

addFilterToInputKey($("#inputTeacherPassword"), FILTER_REGEX_PASSWORD);
inputMaxLength($("#inputTeacherPassword"));

addFilterToInputKey($("#inputTeacherEmail"), FILTER_REGEX_USERNAME);
inputMaxLength($("#inputTeacherEmail"));

addErrorMessage($("#inputTeacherName"), /^[a-z\ ]$/i, "Carácteres no válidos");
addErrorMessage($("#inputTeacherUsername"), /^[a-z0-9\_\-]$/i, "Carácteres no válidos");
addErrorMessage($("#inputTeacherPassword"), /[a-z@$!%*?&A-Za-z\d@$!%*?&]/i, "Carácteres no válidos");
addErrorMessage($("#inputTeacherEmail"), /^[a-z0-9\_\-\.]$/i, "Carácteres no válidos");