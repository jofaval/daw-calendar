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
        model.teachers = [];
        AjaxController.getTeachers(function(data) {
            model.teachers = data;
            whenFinished(model.teachers);
        });
    }

    loadClassrooms(model, whenFinished) {
        model.classrooms = [];
        AjaxController.getClassrooms(function(data) {
            model.classrooms = data;
            whenFinished(model.classrooms);
        });
    }

    loadSchedules(model, whenFinished) {
        model.schedules = [];
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
        this.tableTeachers = $(`<table class="table mx-auto w-100 table-striped table-light table-bordered table-sm dataTable" role="grid" aria-describedby="dtBasicExample_info" cellspacing="0">
            <thead>
                <tr>
                    <td>Username</td>
                    <td>Full name</td>
                    <td>Type</td>
                    <td>Email</td>
                    <td>Activate</td>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`);
        this.tableTeachers.prop("id", "dtTeachers");
        $("#tabContainerTeachers").append(this.tableTeachers);

        //Classrooms
        this.tableClassrooms = $(`<table class="table mx-auto w-100 table-striped table-light table-bordered table-sm dataTable" role="grid" aria-describedby="dtBasicExample_info" cellspacing="0">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Description</td>
                    <td>State</td>
                    <td>Active</td>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`);
        this.tableClassrooms.prop("id", "dtClassrooms");
        $("#tabContainerClassrooms").append(this.tableClassrooms);

        //Schedules
        this.tableSchedules = $(`<table class="table mx-auto w-100 table-striped table-light table-bordered table-sm dataTable" role="grid" aria-describedby="dtBasicExample_info" cellspacing="0">
            <thead>
                <tr>
                    <td>Order Id</td>
                    <td>Start Hour</td>
                    <td>End Hour</td>
                    <td>Year</td>
                    <td>Active</td>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`);
        this.tableSchedules.prop("id", "dtSchedules");
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
        $tabHeader.attr("tabContainer", "tabContainer" + tabName);
        var $tabHeaderContainer = $("#tabHeaders");
        if ($tabHeaderContainer.length == 0) {
            $tabHeaderContainer = $("<div id='tabHeaders' class='btn-group rounded col-xs text-center text-white d-flex justify-content-center'></div>");
            container.append($tabHeaderContainer);
        }

        $tabHeaderContainer.append($tabHeader);
    }

    createTabContainer(tabName, container) {
        var $tabContainer = $("<div id='tabContainer' class='tabContainer p-5 rounded bg-dark col-xs'></div>");
        $tabContainer.prop("id", "tabContainer" + tabName);
        $tabContainerContainer = $("#tabContainers");
        if ($tabContainerContainer.length == 0) {
            var $tabContainerContainer = $("<div id='tabContainers' class='col-xs text-white'></div>");
            container.append($tabContainerContainer);
        }
        $tabContainerContainer.append($tabContainer);
    }

    fadeOutItem(item, miliseconds = 250) {
        item.fadeOut(250);
        setTimeout(() => {
            //item.hide();
        }, miliseconds);
    }

    fadeInItem(item) {
        //item.show();
        item.fadeIn(250);
    }

    tabDispalyEvent(controller) {
        var current = $(this);
        console.log(current.attr("tabContainer"));
        $("#tabContainer" + current.attr("tabContainer"));
        $(".tabContainer").each(function() {
            controller.fadeOutItem($(this));
        });
        controller.fadeInItem(current);
    }

    createDataTable(table) {
        table.DataTable({
            "paging": true,
            "searching": true,
            "ordering": true,
        });
        table.find('.dataTables_length').addClass('bs-select');
    }

    addRowToTable(dataArray, table) {
        var row = $("<tr></tr>");
        row.on("click", this.selectionEvent);
        for (const key in dataArray) {
            if (dataArray.hasOwnProperty(key)) {
                const element = dataArray[key];

                row.append($("<td>" + element + "</td>"));
            }
        }
        if (table.find("tbody").length) {
            table.find("tbody").append(row);
        } else {
            table.find("tbody").append(row);
        }
    }

    addRowsToTable(dataArray, table) {
        var parsedArray = JSON.parse(dataArray);

        if (parsedArray.length > 0) {
            parsedArray.forEach(rowElement => {
                this.addRowToTable(rowElement, table);
            });
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

        var controller = this;
        $("#tabHeaders .btn").on("click", function() {
            var current = $(this);
            $("#tabHeaders .btn.active").removeClass("active");
            current.addClass("active");
            $(".tabContainer").each(function() {
                //view.fadeOutItem($(this));
                $(this).hide();
            });
            var tabContainer = $("#" + current.attr("tabContainer"));
            //view.fadeInItem(tabContainer);
            tabContainer.show();
        });

        $("#tabTeachers").trigger("click");
        model.loadTeachers(model, function(data) {
            view.addRowsToTable(model.teachers, view.tableTeachers);
            view.createDataTable(view.tableTeachers);
        });

        model.loadClassrooms(model, function(data) {
            view.addRowsToTable(model.classrooms, view.tableClassrooms);
            view.createDataTable(view.tableClassrooms);
        });

        /*model.loadSchedules(model, function(data) {
            view.addRowsToTable(model.schedules, view.tableSchedules);
            view.createDataTable(view.tableSchedules);
        });*/
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