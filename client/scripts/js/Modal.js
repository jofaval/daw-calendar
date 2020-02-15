class Modal {
    static genericModalWithForm(formName, readonly = false) {

        var test = $.sweetModal({
            title: formName,
            content: "<div id='modalContent'></div>",
            theme: $.sweetModal.THEME_DARK
        }).params.content;

        $(".sweet-modal-content").load("../server/templates/forms/form" + formName + ".html", {}, function () {
            var content = $(this);
            console.log(content.html());
            if (readonly) {
                test.find("form *[type=submit]").remove();
                test.find("form input").attr("readonly", true);
            }
        });
    }

    static modalError(message) {
        $.sweetModal({
            content: message,
            icon: $.sweetModal.ICON_ERROR
        });
    }
}