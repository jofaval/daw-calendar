$(document).ready(function() {
  console.log("hola");
  $(".tab-nav").each(function() {
    $(this).on("click", function() {
      var current = $(this);
      var id = current.prop("id");
      $(".tab-content").each(function () {
          console.log($(this).fadeOut);
          
        $(this).hide();
      });
      var content = $("#content-" + id);
      content.fadeIn(300);
    });
  });
});
