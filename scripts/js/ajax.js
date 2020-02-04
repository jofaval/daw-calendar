function request(requestLocation, requestType = "POST", params = {}, success = defaultAjaxSuccessAction, error = defaultAjaxErrorAction, async = true) {
    $.ajax({
        url: requestLocation,
        data: params,
        type: requestType,
        async: async,
        success: success,
        error: error,
    });
}

function defaultAjaxSuccessAction(data) {}

function defaultAjaxErrorAction(data) {
    sendNotification("Ha surgido un error al realizar la operación", true);
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

function genericAjaxRequest(requestName, params, success, error = null) {
    if (error == null) {
        error = function(data) {
            sendNotification(message, true);
        };
    }
    var requestParams = {};

    $.extend(requestParams, {
        "ctl": requestName
    }, params);

    request(requestLocation, "POST", requestParams, success, error);
}

function getEventsFromMonth(month, year, success) {
    genericAjaxRequest(getEventsFromMonth.name, {
        "month": month,
        "year": year,
    }, success);
}

function createEvent(title, startHour, date, success) {
    genericAjaxReturn(createEvent.name, {
        "title": title,
        "startHour": startHour,
        "date": date,
    }, success);
}

function updateEvent(title, startHour, date, success) {
    genericAjaxReturn(updateEvent.name, {
        "title": title,
        "startHour": startHour,
        "date": date,
    }, success);
}

function deleteEvent(startHour, date, success) {
    genericAjaxReturn(deleteEvent.name, {
        "startHour": startHour,
        "date": date,
    }, success);
}

function getTeachers(success) {
    genericAjaxReturn(getTeachers.name, {}, success);
}

function getClassrooms(success) {
    genericAjaxReturn(getClassrooms.name, {}, success);
}

function getSchedules(success) {
    genericAjaxReturn(getSchedules.name, {}, success);
}

function getEventsFromWeek(date, days) {

}

function getEventsFromDay(date, days) {

}