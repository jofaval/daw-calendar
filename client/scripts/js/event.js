var formValidator = new FormValidator();
validateForm("events", $("form"));

addFilterToInputKey($("#inputEventTitle"), FILTER_REGEX_ALPHANUMERIC);
inputMaxLength($("#inputEventTitle"), 50);