var typingTimer;
var usernameInputDoneTypingInterval = 5000;
var $input = $("#myInput");

$input.on("keyup", function() {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(
        usernameInputDoneTyping,
        usernameInputDoneTypingInterval
    );
});

$input.on("keydown", function() {
    clearTimeout(typingTimer);
});

function usernameInputDoneTyping() {
    //do something
}

/*var removeText = $("<div class='removeContent'>X</div>");

$("input").on("keypress", function () {
  var current = $(this);
  if (current.parent().find(".removeContent").length == 0) {
    var clone = removeText.clone();
    clone.on("click", function () {
      var current = $(this);
      current.prev().val("");
      current.remove();
    });
    current.after(clone);
  }
});*/

$("#show_hide_password .trigger").on("click", function(event) {
    var event = event || window.event;
    event.preventDefault();
    if ($("#show_hide_password input").attr("type") == "text") {
        $("#show_hide_password input").attr("type", "password");
        $("#show_hide_password i").addClass("fa-eye-slash");
        $("#show_hide_password i").removeClass("fa-eye");
    } else if ($("#show_hide_password input").attr("type") == "password") {
        $("#show_hide_password input").attr("type", "text");
        $("#show_hide_password i").removeClass("fa-eye-slash");
        $("#show_hide_password i").addClass("fa-eye");
    }

    return false;
});

var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
var mediumRegex = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

$("#inputPassword").on("keyup", function() {
    var current = $(this);

    current.removeClass("border-success");
    current.removeClass("border-warning");
    current.removeClass("border-danger");

    var value = current.val();
    if (strongRegex.test(value)) {
        current.addClass("border-success");
    } else if (mediumRegex.test(value)) {
        current.addClass("border-warning");
    } else {
        current.addClass("border-danger");
    }
});

$("input:file").change(function() {
    var fullPath = $(this).val();

    var filename = "Choose file";

    if (fullPath.length > 0) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf(
            '/'));
        filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
    }

    $(this).next().html(filename);
});

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