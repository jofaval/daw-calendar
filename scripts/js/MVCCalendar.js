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
        getEventsFromMonth(this.currentDate.getMonth(), this.currentDate.getFullYear(), function (data) {
            this.currentEvents = data;
        });
        this.instace = this;
    }

    addEvent(title, startHour, date, success) {
        var instance = this.instance;
        createEvent(title, startHour, date, function (data) {
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
        removeEvent(title, startHour, date, function (data) {
            instance.currentEvents = data;
            success(data);
        });
    }

    updateEvent(title, startHour, date, success) {
        var instance = this.instance;
        updateEvent(title, startHour, date, function (data) {
            instance.currentEvents = data;
            instance.currentEvents.forEach(element => {
                element.startHour
            });
            success(data);
        });
    }

    getEventsFromWeek(date, days) {
        var instance = this.instance;
        getEventsFromWeek(date, days, function (data) {
            instance.currentEvents = data;
            success(data);
        });
    }

    getEventsFromDay(date, days) {
        var instance = this.instance;
        getEventsFromDay(date, days, function (data) {
            instance.currentEvents = data;
            success(data);
        });
    }

    getSchedule(date, days) {
        var instance = this.instance;
        getSchedule(date, days, function (data) {
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
        this.monthCalendar = $('<div id="calendar" class="col-md-8"></div>');
        this.timeTableDay = $('<div id="timeTableWeek" class="col-md row"></div>');
        this.monthlyRow.append(this.monthCalendar, this.timeTableDay);
        this.monthlyCalendarContainer.append(monthlyRow);

        this.mainContainer.append(this.weeklyCalendar, this.monthlyCalendar);
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
            events: model.getEventsFromDay(mode.currentDate.getUTCDate()),
            schedule: model.schedule,
            day: model.currentDate,
            weekFormat: false
        });

        var calendarControls = new CalendarControls(view.monthCalendar, model.currentEvents);
    }
}

calendarController = new Controller(new Model(), new View());