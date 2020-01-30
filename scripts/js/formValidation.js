const FILTER_REGEX_NUMBERS = 0;
const FILTER_REGEX_LETTERS = 1;
const FILTER_REGEX_ALPHANUMERIC = 2;
const FILTER_REGEX_ALPHANUMERIC_MIXED = 3;
const FILTER_REGEX_EMAIL = 4;

function addFilterToInputKey(input, filter) {
    var regExFilter = /.*/i;
    switch (filter) {
        case FILTER_REGEX_NUMBERS:
            regExFilter = /[0-9]+/;
            break;
        case FILTER_REGEX_LETTERS:
            regExFilter = /[a-zñ]+/iu;
            break;
        case FILTER_REGEX_ALPHANUMERIC:
            regExFilter = /[a-zñ0-9]+/iu;
            break;
        case FILTER_REGEX_ALPHANUMERIC_MIXED:
            regExFilter = /[a-zñ0-9\*\_\-]+/iu;
            break;
        case FILTER_REGEX_EMAIL:
            regExFilter = /[a-z0-9\.\-\_\@]+/i;
            break;
    }

    input.on("keypress", function(event) {
        var event = event || window.event;

        if (!regExFilter.test(event.key)) {
            event.preventDefault();
            return false;
        }
    });
}

function inputMaxLength(input, maxLength) {
    input.on("keypress", function(event) {
        var event = event || window.event;


        if (input.val().length > (maxLength - 1)) {
            event.preventDefault();
            return false;
        }
    });
}