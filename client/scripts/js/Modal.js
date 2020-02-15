class Modal {
    static genericModalWithForm(formName, readonly = false, whenLoaded = null) {


        $("<div id='test'></div>").load("../server/templates/forms/form" + formName + ".html", {}, function () {
            var content = $(this);

            var modalContent = $.sweetModal({
                title: formName,
                content: content.html(),
                theme: $.sweetModal.THEME_DARK
            }).params.content;

            whenLoaded();

            if (readonly) {
                modalContent.find("form *[type=submit]").remove();
                modalContent.find("form input").attr("readonly", true);
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