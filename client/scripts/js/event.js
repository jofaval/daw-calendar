var formValidator = new FormValidator();
$("form").on("submit", function (event) {
    var event = event || window.event;
    if (!validateForm("events", $("form"))) {
        event.preventDefault();
        return false;
    }
});

addFilterToInputKey($("#inputEventTitle"), FILTER_REGEX_ALPHANUMERIC);
inputMaxLength($("#inputEventTitle"), 50);

addErrorMessage($("#inputEventTitle"), /^[a-z0-9\ \.\-\_]$/i, "Carácteres no válidos");