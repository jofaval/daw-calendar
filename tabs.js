$(document).ready(function() {
  hideTabContent(1);
  $(".tab-nav").each(function() {
    $(this).on("click", function() {
      onTabNavClick($(this));
    });
  });
  $(".tab-nav")
    .first()
    .trigger("click");
});

function onTabNavClick(current) {
  var id = current.prop("id");
  hideTabContent();
  var content = $("#content-" + id);
  content.show();
}

function hideTabContent(duration = 200) {
  $(".tab-content").each(function() {
    var current = $(this);
    current.hide();
  });
}
