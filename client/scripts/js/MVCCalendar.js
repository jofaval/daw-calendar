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

    getEventsFromDay(date, days, classroom) {
        var instance = this.instance;
        AjaxController.getEventsFromDay(date, days, classroom, function (data) {
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
        this.weeklyCalendarContainer = $('<section class="w-75"></section>');
        var weeklyRow = $("<div class='row'></div");
        this.timeTableWeek = $('<div id="timeTableWeek" class="col-md mini-cal row"></div>');
        weeklyRow.append(this.timeTableWeek);
        this.weeklyCalendarContainer.append(weeklyRow);

        //Monthly calendar
        this.monthlyCalendarContainer = $('<section class="w-75"></section>');
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

            $("main section").toggle();
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

        controller.start(this);

        $("input[type=date]").val(printDateWithFormat(new Date(), "Y-m-d"));
        $("input[type=date]").on("change", function () {
            var value = $(this).val();

            $("input[type=date]").val(value);
            controller.model.currentDate = new Date(Date.parse(value));
            controller.start(controller);
        });
    }

    start(controller) {
        //console.log(controller.model);

        //getEventsFromWeek(date, days);

        controller.view.timeTableWeek.TT({
            events: controller.model.currentEvents,
            schedule: controller.model.schedule,
            day: controller.model.currentDate,
            weekFormat: true
        });

        controller.view.timeTableDay.TT({
            events: controller.model.getEventsFromDay(controller.model.currentDate.getUTCDate()),
            schedule: controller.model.schedule,
            day: controller.model.currentDate,
            weekFormat: false
        });

        controller.view.monthCalendar.html("");
        controller.calendarControls = new CalendarControls(controller.view.monthCalendar, controller.model.currentEvents, controller.model.currentDate);

        controller.calendarControls.onDayClick = function () {
            controller.onDayClick($(this), controller);
        };

        controller.calendarControls.setOnMonthChanged(function (month, year) {
            controller.onMonthChanged(month, year, controller);
            var newDate = new Date(year, month, 1);
            $("input[type=date]").val(printDateWithFormat(newDate, "Y-m-d"));
            controller.model.currentDate = new Date(newDate);
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

        var date = printDateWithFormat(newDate, "Y-m-d");
        $("input[type=date]").val(printDateWithFormat(newDate, "Y-m-d"));

        controller.view.timeTableDay.TT({
            events: controller.model.getEventsFromDay(newDate, 50),
            schedule: controller.model.getSchedule(),
            day: newDate
        });

        controller.model.currentDate.setDate(newDate.getDate());

        setTimeout(() => {
            $("event-card").each(function () {
                var shadowRoot = $(this.shadowRoot);

                shadowRoot.find("#pickEvent").on("click", function () {
                    var focused = $(".focused");

                    if (focused.length == 1) {
                        Modal.genericModalWithForm("Event", false, function () {
                            var form = $("form .form");
                            form.prepend("<input type='hidden' name='classroom' id='classroom' value='" + $("#classroomId").html() + "'>");
                            form.prepend("<input type='hidden' name='date' id='date' value='" + printDateWithFormat(controller.model.currentDate, "Y-m-d") + "'>");
                            form.prepend("<input type='hidden' name='startHour' id='startHour' value='" + shadowRoot.find("#eventStartHour").text() + "'>");
                            form.find(":submit").on("click", function (event) {
                                var event = event || window.event;
                                event.preventDefault();

                                AjaxController.createEvent(form.find("#title").val(), form.find("#startHour").val(), form.find("#date").val(), form.find("#classroom").val(), function success(data) {
                                    var parsedData = JSON.parse(data);

                                    if (data === true) {

                                    } else {

                                    }
                                });
                            })
                        });
                    }
                });
            });
        }, 100);
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