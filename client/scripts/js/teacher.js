var formValidator = new FormValidator();
validateForm("signup", $("form"));

//signin
addFilterToInputKey($("#inputTeacherName"), FILTER_REGEX_LETTERS);
inputMaxLength($("#inputTeacherName"), 50);

addFilterToInputKey($("#inputTeacherUsername"), FILTER_REGEX_USERNAME);
inputMaxLength($("#inputTeacherUsername"));

addFilterToInputKey($("#inputTeacherPassword"), FILTER_REGEX_PASSWORD);
inputMaxLength($("#inputTeacherPassword"));

addFilterToInputKey($("#inputTeacherEmail"), FILTER_REGEX_USERNAME);
inputMaxLength($("#inputTeacherEmail"));