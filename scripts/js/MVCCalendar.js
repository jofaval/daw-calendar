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
        var model = this;
        AjaxController.getEventsFromMonth(this.currentDate.getMonth(), this.currentDate.getFullYear(), function (data) {
            model.currentEvents = data;
        });
        this.instace = this;
        model.schedule = schedule;
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

        this.weekFormat = $(`<div id="toolbar"
                class="w-50 rounded d-flex justify-content-around py-3 text-white mb-5 bg-dark align-items-center">

                <div class="form-group form-inline m-0">
                    <label for="monthDatePicker">Month</label>
                    <input type="date" name="monthDatePicker" id="monthDatePicker" class="form-control ml-4">
                </div>
                <div class="form-group form-inline m-0">
                    <label for="weekDatePicker">Week</label>
                    <input type="date" name="weekDatePicker" id="weekDatePicker" class="form-control ml-4">
                </div>
                <div class="form-group form-inline m-0">
                    <label for="weekFormat">Change Week/Month calendar format:</label>
                    <button type="button" id="weekFormat" class="btn ml-4 btn-primary">Week</button>
                </div>
            </div>`);
        this.mainContainer.append(this.weekFormat);

        //Weekly calendar
        this.weeklyCalendarContainer = $('<section class="container col-md-10"></section>');
        var weeklyRow = $("<div class='row'></div");
        this.timeTableWeek = $('<div id="timeTableWeek" class="col-md mini-cal row"></div>');
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

        //Week format
        this.weekFormat.find("#weekFormat").on("click", function () {
            var current = $(this);
            current.toggleClass("btn-primary");
            current.toggleClass("btn-warning");

            if (current.hasClass("btn-warning")) {
                current.text("Month");
            } else {
                current.text("Week");
            }

            $("section.container").toggle();
        });
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
        var controller = this;

        controller.calendarControls = new CalendarControls(view.monthCalendar, model.currentEvents);
        controller.start(model, view, controller);

        $("input[type=date]").on("change", function (event) {
            var value = $(this).val();
            $("input[type=date]").val(value);
            model.currentDate = new Date(Date.parse(value));

            controller.start(model, view, controller);
        });
    }

    start(model, view, controller) {
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

        controller.calendarControls.onDayClick = function () {
            controller.onDayClick($(this), controller);
        };

        controller.calendarControls.setOnMonthChanged(function (month, year) {
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