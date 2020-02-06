var typingTimer;
var usernameInputDoneTypingInterval = 5000;
var $input = $("#myInput");

$input.on("keyup", function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(
    usernameInputDoneTyping,
    usernameInputDoneTypingInterval
  );
});

$input.on("keydown", function () {
  clearTimeout(typingTimer);
});

function usernameInputDoneTyping() {
  //do something
}

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