/**
 * @class Model
 *
 * Manages the data of the application.
 */

let calendarController;

class Model {
    constructor() {

    }

    loadTeachers(model, whenFinished) {
        this.teachers = [];
        AjaxController.getTeachers(function(data) {
            model.teachers = data;
            whenFinished(model.teachers);
        });
    }

    loadClassrooms(model, whenFinished) {
        this.classrooms = [];
        AjaxController.getClassrooms(function(data) {
            model.classrooms = data;
            whenFinished(model.classrooms);
        });
    }

    loadSchedules(model, whenFinished) {
        this.schedules = [];
        AjaxController.getSchedules(function(data) {
            model.schedules = data;
            whenFinished(model.schedules);
        });
    }

    signup(name, username, password, email, success) {
        AjaxController.signup(name, username, password, email, function(data) {
            model.collection.action();
            success(data);
        });
    }

    updateTeacher(name, username, password, email, success) {
        AjaxController.updateTeacher(name, username, password, email, function(data) {
            model.collection.action();
            success(data);
        });
    }

    deleteTeacher(email, success) {
        AjaxController.deleteTeacher(email, function(data) {
            model.collection.action();
            success(data);
        });
    }

    createClassroom(name, description, state, success) {
        AjaxController.createClassroom(name, description, state, function(data) {
            model.collection.action();
            success(data);
        });
    }

    updateClassroom(name, description, state, success) {
        AjaxController.updateClassroom(name, description, state, function(data) {
            model.collection.action();
            success(data);
        });
    }

    deleteClassroom(name, success) {
        AjaxController.deleteClassroom(name, function(data) {
            model.collection.action();
            success(data);
        });
    }

    createSchedule(name, description, state, success) {
        AjaxController.createSchedule(name, description, state, function(data) {
            model.collection.action();
            success(data);
        });
    }

    updateSchedule(name, description, state, success) {
        AjaxController.updateSchedule(name, description, state, function(data) {
            model.collection.action();
            success(data);
        });
    }

    deleteSchedule(name, description, state, success) {
        AjaxController.deleteSchedule(name, description, state, function(data) {
            model.collection.action();
            success(data);
        });
    }

    instance = null;

    getInstance() {
        if (instance == null) {
            instance = new Model();
        }

        return instance;
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

        //Create tab
        createTab("Teachers", this.mainContainer);
        createTab("Classrooms", this.mainContainer);
        createTab("Schedules", this.mainContainer);

        //Teachers
        this.tableTeachers = $('<table class="table w-auto mx-auto table-striped table-light table-bordered table-sm dataTable" role="grid" aria-describedby="dtBasicExample_info" cellspacing="0">');
        this.tableTeachers.prop("id", "dtTeachers");
        createDataTable(this.tableTeachers);
        $("#tabContainerTeachers").append(this.tableTeachers);

        //Classrooms
        this.tableClassrooms = $('<table class="table w-auto mx-auto table-striped table-light table-bordered table-sm dataTable" role="grid" aria-describedby="dtBasicExample_info" cellspacing="0">');
        this.tableClassrooms.prop("id", "dtClassrooms");
        createDataTable(this.tableClassrooms);
        $("#tabContainerClassrooms").append(this.tableClassrooms);

        //Schedules
        this.tableSchedules = $('<table class="table w-auto mx-auto table-striped table-light table-bordered table-sm dataTable" role="grid" aria-describedby="dtBasicExample_info" cellspacing="0">');
        this.tableSchedules.prop("id", "dtSchedules");
        createDataTable(this.tableSchedules);
        $("#tabContainerSchedules").append(this.tableSchedules);
    }

    createTab(tabName, container) {
        if ($("#tab" + tabName).length) {
            return false;
        }

        this.createTabHeader(tabName, container);
        this.createTabContainer(tabName, container);
    }

    createTabHeader(tabName, container) {
        $tabHeader = $("<div id='tab" + tabName + "' class='col-xs'></div>");
        $tabHeader.prop("id", "tab" + tabName);
        $tabHeader.prop("tabContainer", "tabContainer" + tabName);
        $tabHeaderContainer = $("#tabHeaders");
        if ($tabHeaderContainer.length == 0) {
            $tabHeaderContainer = $("<div id='tabHeaders' class='col-xs'></div>");
            container.append($tabHeaderContainer);
        }
        $tabHeader.on("click", this.tabDispalyEvent);
        $tabHeaderContainer.append($tabHeader);
    }

    createTabContainer(tabName, container) {
        $tabContainer = $("<div id='tabContainer' class='tabContainer col-xs'></div>");
        $tabContainer.prop("id", "tabContainer" + tabName);
        $tabContainerContainer = $("#tabContainers");
        if ($tabContainerContainer.length == 0) {
            $tabContainerContainer = $("<div id='tabContainers' class='col-xs'></div>");
            container.append($tabContainerContainer);
        }
        $tabContainerContainer.append($tabContainer);
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

    tabDispalyEvent() {
        var current = $(this);
        $("#tabContainer" + current.prop("tabContainer"));
        $(".tabContainer").each(function() {
            fadeOutItem($(this));
        });
        fadeInItem(current);
    }

    createDataTable(table) {
        table.DataTable({
            "paging": true,
            "searching": true,
            "ordering": true,
        });
        table.find('.dataTables_length').addClass('bs-select');
        $('#dtBasicExample tr').on("click", function() {});
    }

    addRowToTable(dataArray, table) {
        var row = $("<tr></tr>");
        row.on("click", selectionEvent);
        dataArray.forEach(column => {
            row.append($("<td>" + column + "</td>"));
        });
        if (table.find("tbody").length) {
            table.find("tbody").append(row);
        } else {
            table.append(row);
        }
    }

    selectionEvent() {
        $('#dtBasicExample tr').removeClass("selected");
        $(this).addClass("selected");
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

        this.calendarControls.onDayClick = function() {
            controller.onDayClick($(this), controller);
        };

        this.calendarControls.setOnMonthChanged(function(month, year) {
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