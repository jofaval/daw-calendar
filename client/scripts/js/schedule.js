var formValidator = new FormValidator();
$("form").on("submit", function(event) {
    var event = event || window.event;
    if (!formValidator.validateForm("schedule", $("form"))) {
        event.preventDefault();
        return false;
    }
});