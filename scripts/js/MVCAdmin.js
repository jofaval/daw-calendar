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
        this.createTab("Teachers", this.mainContainer);
        this.createTab("Classrooms", this.mainContainer);
        this.createTab("Schedules", this.mainContainer);

        //Teachers
        this.tableTeachers = $('<table class="table w-auto mx-auto table-striped table-light table-bordered table-sm dataTable" role="grid" aria-describedby="dtBasicExample_info" cellspacing="0">');
        this.tableTeachers.prop("id", "dtTeachers");
        this.createDataTable(this.tableTeachers);
        $("#tabContainerTeachers").append(this.tableTeachers);

        //Classrooms
        this.tableClassrooms = $('<table class="table w-auto mx-auto table-striped table-light table-bordered table-sm dataTable" role="grid" aria-describedby="dtBasicExample_info" cellspacing="0">');
        this.tableClassrooms.prop("id", "dtClassrooms");
        this.createDataTable(this.tableClassrooms);
        $("#tabContainerClassrooms").append(this.tableClassrooms);

        //Schedules
        this.tableSchedules = $('<table class="table w-auto mx-auto table-striped table-light table-bordered table-sm dataTable" role="grid" aria-describedby="dtBasicExample_info" cellspacing="0">');
        this.tableSchedules.prop("id", "dtSchedules");
        this.createDataTable(this.tableSchedules);
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
        var $tabHeader = $("<div id='tab" + tabName + "' class='btn btn-warning text-dark p-4 col-xs'></div>");
        $tabHeader.html(tabName);
        $tabHeader.prop("id", "tab" + tabName);
        $tabHeader.prop("tabContainer", "tabContainer" + tabName);
        var $tabHeaderContainer = $("#tabHeaders");
        if ($tabHeaderContainer.length == 0) {
            $tabHeaderContainer = $("<div id='tabHeaders' class='btn-group rounded col-xs text-center text-white d-flex justify-content-center'></div>");
            container.append($tabHeaderContainer);
        }
        $tabHeader.on("click", this.tabDispalyEvent);
        $tabHeaderContainer.append($tabHeader);
    }

    createTabContainer(tabName, container) {
        var $tabContainer = $("<div id='tabContainer' class='tabContainer col-xs'></div>");
        $tabContainer.prop("id", "tabContainer" + tabName);
        $tabContainerContainer = $("#tabContainers");
        if ($tabContainerContainer.length == 0) {
            var $tabContainerContainer = $("<div id='tabContainers' class='col-xs'></div>");
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
        /*table.DataTable({
            "paging": true,
            "searching": true,
            "ordering": true,
        });
        table.find('.dataTables_length').addClass('bs-select');*/
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
class AdminController {
    instance = null;

    constructor(model, view) {
        this.model = model;
        this.view = view;

        model.loadTeachers(function(data) {
            data.each(function() {
                view.addRowToTable($(this));
            })
        });
    }

    static getInstance() {
        if (!Controller.instance) {
            Controller.instance = new AdminController(new Model(), new View());
        }

        return Controller.instance;
    }
}

calendarController = new AdminController(new Model(), new View());
//controller = Controller.getInstance();