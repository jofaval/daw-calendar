function request(requestLocation, requestType = "POST", params = {}, success = defaultAjaxSuccessAction, error = defaultAjaxErrorAction, async = false) {
    $.ajax({
        url: requestLocation,
        data: params,
        type: requestType,
        async: async,
        success: success,
        error: error,
    });
}

function defaultAjaxSuccessAction(data) {
}

function defaultAjaxErrorAction(data) {
    sendNotification("Ha surgido un error al realizar la operación", true);
}

function printDateWithFormat(givenDate, format = "d/m/Y") {
    format = format.replace("y", givenDate.getYear());
    format = format.replace("Y", givenDate.getFullYear());

    format = format = format.toLowerCase();

    format = format.replace("d", minNumberOfDigits(givenDate.getUTCDate()));

    format = format.replace("m", minNumberOfDigits(givenDate.getMonth() + 1));

    return format;
}

function queryDatabase(requestLocation, success, message = "Ha surgido un error al realizar la operación") {
    request(requestLocation, "POST", {
            select: "",
            from: "table",
            where: "condition",
            params: [
                ["key", "value"],
                ["key", "value"],
                ["key", "value"],
            ],
        }, success,
        function() {
            sendNotification(message, true);
        });
}