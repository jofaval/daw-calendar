$messageContainer = $("<span class='font-weight-class'></span>");

whenUserDoneTypingInInput($("#inputUsername"), function () {
    AjaxController.doesUsernameExist($input.val(), function (data) {
        var jsonData = JSON.parse(data);
        if (jsonData === true) {
            $("#usernameHelp").html($messageContainer.clone().addClass("text-danger").html("✘ Isn't available."));
        } else {
            $("#usernameHelp").html($messageContainer.clone().addClass("text-success").html("✓ Is available."));
        }
    });
});

function whenUserDoneTypingInInput(input, action, interval = 250) {
    var typingTimeID = 0;
    input.on("keyup", function () {
        clearTimeout(typingTimeID);
        typingTimeID = setTimeout(
            action,
            interval
        );
    });

    input.on("keydown", function () {
        clearTimeout(typingTimeID);
    });
}

/*var inputsWithRemoveOption = ["input[type=email]", "input[type=text]", "input[type=password]"];

var removeContent = $("<span class='removeContent w-100 text-dark'><i class='fa fa-times'></i></span>");
$(inputsWithRemoveOption.join(", ")).after(removeContent.clone().click(function () {
    $(this).prev().val("");
}));*/

$("#show_hide_password .trigger").on("click", function (event) {
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

$("#inputPassword").on("keyup", function () {
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

$("input:file").change(function () {
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
const FILTER_REGEX_PASSWORD = 5;
const FILTER_REGEX_USERNAME = 6;
const FILTER_REGEX_NONE = 0;

function addFilterToInputKey(input, filter) {
    if (input.length == 0) {
        return false;
    }
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
            regExFilter = /[a-zñ0-9*_-]+/iu;
            break;
        case FILTER_REGEX_EMAIL:
            regExFilter = /[a-z0-9\.\-\_\@]+/i;
            break;
        case FILTER_REGEX_PASSWORD:
            regExFilter = /[a-z@$!%*?&A-Za-z\d@$!%*?&]/i;
            break;
        case FILTER_REGEX_USERNAME:
            regExFilter = /^[a-z0-9_-]$/i;
            break;
    }

    input.on("keypress", function (event) {
        var event = event || window.event;

        if (!regExFilter.test(event.key)) {
            event.preventDefault();
            return false;
        }
    });
}

function inputMaxLength(input, maxLength = 24) {
    if (input.length == 0) {
        return false;
    }
    input.prop("maxlength", maxLength);
    input.on("keypress", function (event) {
        var event = event || window.event;

        if (input.val().length > (maxLength - 1)) {
            event.preventDefault();
            return false;
        }
    });
}

function addErrorMessage(input, regex, messageId, message) {
    whenUserDoneTypingInInput(input, function () {
        var value = input.val();

        if (regex.test(value)) {
            addMessageToInput(input, messageId, message);
        } else {
            removeMessageToInput(input, messageId);
        }
    });
}

function genericLengthMessages(input) {
    whenUserDoneTypingInInput(input, function () {
        var value = input.val();

        if (value.length < input.attr("min")) {
            addMessageToInput(input, "short", "Too short!");
        } else if (value.length > input.attr("max")) {
            addMessageToInput(input, "long", "Too long!");
        } else {
            removeMessageToInput(input, "short");
            removeMessageToInput(input, "long");
        }
    });
}

function addMessageToInput(input, messageId, message) {
    var smallHTML = input.siblings("small");

    var messageHolder = smallHTML.find("#" + messageId);
    if (messageHolder.length == 0) {
        smallHTML.append($messageContainer.clone().attr("id", messageId).html(message));
    }
}

function removeMessageToInput(input, messageId) {
    input.siblings("small").find("#" + messageId).remove();
}
genericLengthMessages($("#inputPassword"));
addErrorMessage($("#inputPassword"), /[a-z@$!%*?&A-Za-z\d@$!%*?&]/i, "Incorrecto")
//FormValidations


//Fix floating label bug
$("input").on("focus", function () {
    $(this).attr("data-placeholder", $(this).attr("placeholder"));
    $(this).attr("placeholder", "");
});
$("input").on("blur", function () {
    $(this).attr("placeholder", $(this).attr("data-placeholder"));
    $(this).removeAttr("data-placeholder");
});