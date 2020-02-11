class Modal {
    static genericModalWithForm(formName) {
        $.ajax({
            url: "../index.php?ctl=getForm" + formName,
            type: "POST",
            succes: function (data) {
                $.sweetModal({
                    title: 'HTML Content',
                    content: data,
                    theme: $.sweetModal.THEME_DARK
                });
            },
            error: function () {
                Modal.modalError("An error occured, couldn't load form");
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