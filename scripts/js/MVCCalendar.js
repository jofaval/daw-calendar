/**
 * @class Model
 *
 * Manages the data of the application.
 */

let calendarController;

class Model {
    constructor() {
        this.currentEvents = [];
        this.currentDate = new Date();
        AjaxController.getEventsFromMonth(this.currentDate.getMonth(), this.currentDate.getFullYear(), function (data) {
            this.currentEvents = data;
        });
        this.instace = this;
    }

    instance = null;

    getInstance() {
        if (instance == null) {
            instance = new Model();
        }

        return instance;
    }

    /* Event
    {
        title: "Soulful sundays bay area",
        date: new Date().setDate(new Date().getDate() - 7), // last week
        link: "#"
    }*/

    addEvent(title, startHour, date, success) {
        var instance = this.instance;
        AjaxController.createEvent(title, startHour, date, function (data) {
            instance.currentEvents.push({
                "title": title,
                "startHour": startHour,
                "date": date,
            });
            success(data);
        });
    }

    removeEvent(startHour, date, success) {
        var instance = this.instance;
        AjaxController.removeEvent(title, startHour, date, function (data) {
            instance.currentEvents = data;
            success(data);
        });
    }

    updateEvent(title, startHour, date, success) {
        var instance = this.instance;
        AjaxController.updateEvent(title, startHour, date, function (data) {
            instance.currentEvents = data;
            instance.currentEvents.forEach(element => {
                element.startHour
            });
            success(data);
        });
    }

    getEventsFromWeek(date, days) {
        var instance = this.instance;
        AjaxController.getEventsFromWeek(date, days, function (data) {
            instance.currentEvents = data;
            success(data);
        });
    }

    getEventsFromDay(date, days) {
        var instance = this.instance;
        AjaxController.getEventsFromDay(date, days, function (data) {
            instance.currentEvents = data;
            success(data);
        });
    }

    getSchedule(date, days) {
        var instance = this.instance;
        AjaxController.getSchedule(date, days, function (data) {
            instance.currentEvents = data;
            success(data);
        });
    }
}

/**
 * @class View
 *
 * Visual representation of the model.
 */
class View {
    constructor() {
        this.mainContainer = $('main');

        //Weekly calendar
        this.weeklyCalendarContainer = $('<section class="container col-md-10"></section>');
        var weeklyRow = $("<div class='row'></div");
        this.timeTableWeek = $('<div id="timeTableWeek" class="col-md row"></div>');
        weeklyRow.append(this.timeTableWeek);
        this.weeklyCalendarContainer.append(weeklyRow);

        //Monthly calendar
        this.monthlyCalendarContainer = $('<section class="container col-md-10"></section>');
        var monthlyRow = $("<div class='row'></div");
        this.monthCalendar = $('<div id="calendar" class="col-md-8 px-0"></div>');
        this.timeTableDay = $('<div id="timeTable" class="col-md ml-md-5 px-0"></div>');
        monthlyRow.append(this.monthCalendar, this.timeTableDay);
        this.monthlyCalendarContainer.append(monthlyRow);

        this.mainContainer.append(this.weeklyCalendarContainer, this.monthlyCalendarContainer);
        this.weeklyCalendarContainer.hide();
    }

    fadeOutItem(item, miliseconds = 250) {
        item.fadeOut(250);
        setTimeout(() => {
            item.hide();
        }, miliseconds);
    }

    fadeInItem(item) {
        item.show();
        item.fadeIn(250);
    }

    instance = null;

    getInstance() {
        if (instance == null) {
            instance = new View();
        }

        return instance;
    }
}

/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class Controller {
    instance = null;

    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.timeTableWeek.TT({
            events: model.currentEvents,
            schedule: model.schedule,
            day: model.currentDate,
            weekFormat: true
        });

        view.timeTableDay.TT({
            events: model.getEventsFromDay(model.currentDate.getUTCDate()),
            schedule: model.schedule,
            day: model.currentDate,
            weekFormat: false
        });

        this.calendarControls = new CalendarControls(view.monthCalendar, model.currentEvents);
        var controller = this;

        this.calendarControls.onDayClick = function () {
            controller.onDayClick($(this), controller);
        };

        this.calendarControls.setOnMonthChanged(function (month, year) {
            controller.onMonthChanged(month, year, controller);
        });
    }

    onDayClick(current, controller) {
        var dayInNumber = parseInt(current.text());

        var newDate = new Date(
            controller.model.currentDate.getFullYear(),
            controller.model.currentDate.getMonth(),
            dayInNumber
        );

        //console.log("Day  - " + newDate.toString());
        //console.log("Day  - " + dayInNumber);

        controller.view.timeTableDay.TT({
            events: controller.model.getEventsFromDay(newDate),
            schedule: controller.model.getSchedule(),
            day: newDate
        });
    }

    onMonthChanged(month, year, controller) {
        controller.model.currentDate = new Date(year, month, 2);
        controller.calendarControls.setOnDayClick();
    }

    static getInstance() {
        if (!Controller.instance) {
            Controller.instance = new Controller(new Model(), new View());
        }

        return Controller.instance;
    }
}

//calendarController = new Controller(new Model(), new View());
calendarController = Controller.getInstance();