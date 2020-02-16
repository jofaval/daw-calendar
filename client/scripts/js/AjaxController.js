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
    static request(requestLocation, requestType = "POST", params = {}, success = AjaxController.defaultAjaxSuccessAction, error = AjaxController.defaultAjaxErrorAction, async = true) {
        $.ajax({
            url: 'index.php?ctl=' + requestLocation,
            data: params,
            type: requestType,
            async: async,
            success: success,
            error: error,
        });
    }

    static defaultAjaxSuccessAction(data) {
        //var jsonData = JSON.parse(data);
    }

    static defaultAjaxErrorAction(data) {
        sendNotification("Ha surgido un error al realizar la operación", true);
    }

    static genericAjaxRequest(requestName, params, success, error = null) {
        if (error == null) {
            error = function (data) {
                sendNotification("Couldn't execute operation succesfully", true);
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

    static createEvent(title, startHour, date, classroom, success) {
        AjaxController.genericAjaxRequest("createEvent", {
            "title": title,
            "startHour": startHour,
            "date": date,
            "classroom": classroom,
        }, success);
    }

    static updateEvent(title, startHour, date, success) {
        AjaxController.genericAjaxRequest("updateEvent", {
            "title": title,
            "startHour": startHour,
            "date": date,
        }, success);
    }

    static deleteEvent(startHour, date, classroom, success) {
        AjaxController.genericAjaxRequest("deleteEvent", {
            "startHour": startHour,
            "date": date,
            "classroom": classroom
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

    static getSchedule(year, success) {
        AjaxController.genericAjaxRequest("getSchedule", {
            "year": year,
        }, success);
    }

    static getEventsFromWeek(startingDay, endingDay, classroom, success) {
        AjaxController.genericAjaxRequest("getEventsFromWeek", {
            "startingDate": startingDay,
            "endingDate": endingDay,
            "classroom": classroom,
        }, success);
    }

    static getEventsFromDay(selectedDay, classroom, success) {
        AjaxController.genericAjaxRequest("getEventsFromDay", {
            "selectedDay": selectedDay,
            "classroom": classroom,
        }, success);
    }

    //Teacher
    static signup(name, username, password, email, image, success) {
        AjaxController.genericAjaxRequest("admin", {
            "createTeacher": 1,
            "inputName": name,
            "inputUsername": username,
            "inputPassword": password,
            "inputEmail": email,
            "inputImage": image,
        }, success);
    }

    static updateTeacher(name, username, password, email, success) {
        AjaxController.genericAjaxRequest("admin", {
            "updateTeacher": 1,
            "inputTeacherName": name,
            "inputTeacherUsername": username,
            "inputTeacherPassword": password,
            "inputTeacherEmail": email,
            "inputTeacherImage": image,
        }, success);
    }

    static deleteTeacher(email, success) {
        AjaxController.genericAjaxRequest("admin", {
            "deleteTeacher": 1,
            "inputTeacherEmail": email,
        }, success);
    }

    //Classroom
    static createClassroom(name, description, state, success) {
        AjaxController.genericAjaxRequest("admin", {
            "createClassroom": 1,
            "inputClassroomName": name,
            "inputClassroomDescription": description,
            "selectClassroomState": state,
        }, success);
    }

    static updateClassroom(name, description, state, success) {
        AjaxController.genericAjaxRequest("admin", {
            "updateClassroom": 1,
            "inputClassroomName": name,
            "inputClassroomDescription": description,
            "selectClassroomState": state,
        }, success);
    }

    static deleteClassroom(name, success) {
        AjaxController.genericAjaxRequest("admin", {
            "deleteClassroom": 1,
            "inputClassroomName": name,
        }, success);
    }

    //Schedule
    static createSchedule(name, description, state, success) {
        AjaxController.genericAjaxRequest("admin", {
            "createSchedule": 1,
            "inputClassroomName": name,
            "inputClassroomDescription": description,
            "selectClassroomState": state,
        }, success);
    }

    static updateSchedule(name, description, state, success) {
        AjaxController.genericAjaxRequest("admin", {
            "updateSchedule": 1,
            "inputClassroomName": name,
            "inputClassroomDescription": description,
            "selectClassroomState": state,
        }, success);
    }

    static deleteSchedule(name, description, state, success) {
        AjaxController.genericAjaxRequest("admin", {
            "deleteSchedule": 1,
            "inputClassroomName": name,
            "inputClassroomDescription": description,
            "selectClassroomState": state,
        }, success);
    }

    static doesUsernameExist(username, success) {
        AjaxController.genericAjaxRequest("doesUsernameExist", {
            "username": username,
        }, success);
    }

    static getNonWorkWeeklyDays(success) {
        AjaxController.genericAjaxRequest("getNonWorkWeeklyDays", {}, success);
    }

    static getMonthlyNonSchoolDays(year, month, success) {
        AjaxController.genericAjaxRequest("getMonthlyNonSchoolDays", {
            "year": year,
            "month": month,
        }, success);
    }
}