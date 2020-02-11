var formValidator = new FormValidator();
$("form").on("submit", function (event) {
    var event = event || window.event;
    if (!validateForm("classroom", $("form"))) {
        event.preventDefault();
        return false;
    }
});

//classroom
addFilterToInputKey($("#inputClassroomName, #inputClasroomDescription"), FILTER_REGEX_LETTERS);
inputMaxLength($("#inputClassroomName, #inputClasroomDescription"), 50);