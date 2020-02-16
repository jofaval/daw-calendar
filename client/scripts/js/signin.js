var formValidator = new FormValidator();
$(window).on("load", function () {
    $("form").on("submit", function (event) {
        var event = event || window.event;
        if (!formValidator.validateForm("signin", $("form"))) {
            event.preventDefault();
            return false;
        }
    });

    //signin
    addFilterToInputKey($("#inputEmail"), FILTER_REGEX_USERNAME);
    inputMaxLength($("#inputEmail, #inputPassword"));

    addFilterToInputKey($("#inputPassword"), FILTER_REGEX_PASSWORD);
});