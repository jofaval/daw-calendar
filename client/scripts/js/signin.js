var formValidator = new FormValidator();
validateForm("signin", $("form"));

//signin
addFilterToInputKey($("#inputEmail"), FILTER_REGEX_USERNAME);
inputMaxLength($("#inputEmail, #inputPassword"));

addFilterToInputKey($("#inputPassword"), FILTER_REGEX_PASSWORD);