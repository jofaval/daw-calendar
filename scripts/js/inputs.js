var typingTimer;
var usernameInputDoneTypingInterval = 5000;
var $input = $('#myInput');

$input.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(usernameInputDoneTyping, usernameInputDoneTypingInterval);
});

$input.on('keydown', function () {
  clearTimeout(typingTimer);
});

function usernameInputDoneTyping () {
  //do something
}