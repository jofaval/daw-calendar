/*function queryDatabase(requestLocation, success, message = "Ha surgido un error al realizar la operación") {
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
}*/

class AjaxController {
    static request(requestLocation, requestType = "POST", params = {}, success = defaultAjaxSuccessAction, error = defaultAjaxErrorAction, async = true) {
        $.ajax({
            url: 'index.php?ctl=requestLocation',
            data: params,
            type: requestType,
            async: async,
            success: success,
            error: error,
        });
    }
    
    static defaultAjaxSuccessAction(data) {}
    
    static defaultAjaxErrorAction(data) {
        sendNotification("Ha surgido un error al realizar la operación", true);
    }

    static genericAjaxRequest(requestName, params, success, error = null) {
        if (error == null) {
            error = function(data) {
                sendNotification(message, true);
            };
        }
    
        AjaxController.request(requestName, "POST", params, success, error);
    }
    
    static getEventsFromMonth(month, year, success) {
        AjaxController.genericAjaxRequest("getEventsFromMonth", {
            "month": month,
            "year": year,
        }, success);
    }
    
    static createEvent(title, startHour, date, success) {
        AjaxController.genericAjaxRequest("createEvent", {
            "title": title,
            "startHour": startHour,
            "date": date,
        }, success);
    }
    
    static updateEvent(title, startHour, date, success) {
        AjaxController.genericAjaxRequest("updateEvent", {
            "title": title,
            "startHour": startHour,
            "date": date,
        }, success);
    }
    
    static deleteEvent(startHour, date, success) {
        AjaxController.genericAjaxRequest("deleteEvent", {
            "startHour": startHour,
            "date": date,
        }, success);
    }
    
    static getTeachers(success) {
        AjaxController.genericAjaxRequest("getTeachers", {}, success);
    }
    
    static getClassrooms(success) {
        AjaxController.genericAjaxRequest("getClassrooms", {}, success);
    }
    
    static getSchedules(success) {
        AjaxController.genericAjaxRequest("getSchedules", {}, success);
    }
    
    static getEventsFromWeek(date, days) {
    
    }
    
    static getEventsFromDay(date, days) {
    
    }
}