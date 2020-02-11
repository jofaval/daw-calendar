var formValidator = new FormValidator();
$("form").on("submit", function (event) {
    var event = event || window.event;
    if (!validateForm("signup", $("form"))) {
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