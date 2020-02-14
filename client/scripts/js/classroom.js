var formValidator = new FormValidator();
$("form").on("submit", function(event) {
    var event = event || window.event;
    if (!formValidator.validateForm("classroom", $("form"))) {
        event.preventDefault();
        return false;
    }
});

//classroom
addFilterToInputKey($("#inputClassroomName, #inputClasroomDescription"), FILTER_REGEX_LETTERS);
inputMaxLength($("#inputClassroomName, #inputClasroomDescription"), 50);

addErrorMessage($("#inputClassroomName, #inputClasroomDescription"), /^[a-z0-9\ ]$/i, "Carácteres no válidos");