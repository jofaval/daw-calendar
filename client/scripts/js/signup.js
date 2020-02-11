var formValidator = new FormValidator();
validateForm("signup", $("form"));

//signin
addFilterToInputKey($("#inputName"), FILTER_REGEX_LETTERS);
inputMaxLength($("#inputName"), 50);

addFilterToInputKey($("#inputUsername"), FILTER_REGEX_USERNAME);
inputMaxLength($("#inputUsername"));

addFilterToInputKey($("#inputPassword"), FILTER_REGEX_PASSWORD);
inputMaxLength($("#inputPassword"));

addFilterToInputKey($("#inputEmail"), FILTER_REGEX_USERNAME);
inputMaxLength($("#inputEmail"));