var formValidator = new FormValidator();
validateForm("signup", $("form"));

//classroom
addFilterToInputKey($("#inputClassroomName, #inputClasroomDescription"), FILTER_REGEX_LETTERS);
inputMaxLength($("#inputClassroomName, #inputClasroomDescription"), 50);