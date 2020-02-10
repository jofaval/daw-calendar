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
        AjaxController.getTeachers(function (data) {
            model.teachers = data;
            whenFinished(model.teachers);
        });
    }

    loadClassrooms(model, whenFinished) {
        model.classrooms = [];
        AjaxController.getClassrooms(function (data) {
            model.classrooms = data;
            whenFinished(model.classrooms);
        });
    }

    loadSchedules(model, whenFinished) {
        model.schedules = [];
        AjaxController.getSchedules(function (data) {
            model.schedules = data;
            whenFinished(model.schedules);
        });
    }

    signup(name, username, password, email, success) {
        AjaxController.signup(name, username, password, email, function (data) {
            model.collection.action();
            success(data);
        });
    }

    updateTeacher(name, username, password, email, success) {
        AjaxController.updateTeacher(name, username, password, email, function (data) {
            model.collection.action();
            success(data);
        });
    }

    deleteTeacher(email, success) {
        AjaxController.deleteTeacher(email, function (data) {
            model.collection.action();
            success(data);
        });
    }

    createClassroom(name, description, state, success) {
        AjaxController.createClassroom(name, description, state, function (data) {
            model.collection.action();
            success(data);
        });
    }

    updateClassroom(name, description, state, success) {
        AjaxController.updateClassroom(name, description, state, function (data) {
            model.collection.action();
            success(data);
        });
    }

    deleteClassroom(name, success) {
        AjaxController.deleteClassroom(name, function (data) {
            model.collection.action();
            success(data);
        });
    }

    createSchedule(name, description, state, success) {
        AjaxController.createSchedule(name, description, state, function (data) {
            model.collection.action();
            success(data);
        });
    }

    updateSchedule(name, description, state, success) {
        AjaxController.updateSchedule(name, description, state, function (data) {
            model.collection.action();
            success(data);
        });
    }

    deleteSchedule(name, description, state, success) {
        AjaxController.deleteSchedule(name, description, state, function (data) {
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
        this.createTab("NonSchoolDays", this.mainContainer);

        //Teachers
        this.tableTeachers = $(`<table class="table mx-auto w-100 table-striped table-light table-bordered table-sm dataTable" role="grid" aria-describedby="dtBasicExample_info" cellspacing="0">
            <thead class="text-center">
                <tr>
                    <td>Username</td>
                    <td>Full name</td>
                    <td>Type</td>
                    <td>Email</td>
                    <td>Activate</td>
                    <td>Remove</td>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`);
        this.tableTeachers.prop("id", "dtTeachers");
        $("#tabContainerTeachers").append(this.tableTeachers);

        //Classrooms
        this.tableClassrooms = $(`<table class="table mx-auto w-100 table-striped table-light table-bordered table-sm dataTable" role="grid" aria-describedby="dtBasicExample_info" cellspacing="0">
            <thead class="text-center">
                <tr>
                    <td>Name</td>
                    <td>Description</td>
                    <td>State</td>
                    <td>Active</td>
                    <td>Remove</td>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`);
        this.tableClassrooms.prop("id", "dtClassrooms");
        $("#tabContainerClassrooms").append(this.tableClassrooms);

        //Schedules
        this.tableSchedules = $(`<table class="table mx-auto w-100 table-striped table-light table-bordered table-sm dataTable" role="grid" aria-describedby="dtBasicExample_info" cellspacing="0">
            <thead class="text-center">
                <tr>
                    <td>Order Id</td>
                    <td>Start Hour</td>
                    <td>End Hour</td>
                    <td>Year</td>
                    <td>Active</td>
                    <td>Remove</td>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`);
        this.tableSchedules.prop("id", "dtSchedules");
        $("#tabContainerSchedules").append(this.tableSchedules);

        var $nonSchoolDays = $(`
            <div class="flex-column row my-auto text-light rounded">
                <div id="nonSchoolDaysToolbar" class="w-100 rounded py-3 text-white mb-3 bg-dark">
                    <!--(.form-group>label{Week}+input:date.form-control)*2-->

                    <form action="" method="POST" class="form-inline m-0 d-flex justify-content-center">
                        <div class="form-group mx-3">
                            <label for="datePicker">Day</label>
                            <input type="date" name="datePicker" id="datePicker" class="form-control ml-4">
                        </div>
                        <div class="form-group mx-3">
                            <label for="weekFormat">Non-school day actions:</label>
                            <div class="btn-group ml-4">
                                <button type="button" name="addNonSchoolDay" id="addNonSchoolDay"
                                    class="btn btn-warning">Add</button>
                                <button type="button" name="removeNonSchoolDay" id="removeNonSchoolDay"
                                    class="btn btn-danger">Remove</button>
                            </div>
                        </div>
                    </form>
                </div>
                <form action="" method="POST" class="mb-3">
                    <table class="col text-center table table-bordered table-striped m-0 table-dark">
                        <thead>
                            <tr>
                                <td>
                                    <p>M<span class="d-none d-sm-none d-md-inline-block">onday</span></p>
                                </td>
                                <td>
                                    <p>T<span class="d-none d-sm-none d-md-inline-block">uesday</span></p>
                                </td>
                                <td>
                                    <p>W<span class="d-none d-sm-none d-md-inline-block">ednesday</span></p>
                                </td>
                                <td>
                                    <p>T<span class="d-none d-sm-none d-md-inline-block">hursday</span></p>
                                </td>
                                <td>
                                    <p>F<span class="d-none d-sm-none d-md-inline-block">riday</span></p>
                                </td>
                                <td>
                                    <p>S<span class="d-none d-sm-none d-md-inline-block">aturday</span></p>
                                </td>
                                <td>
                                    <p>S<span class="d-none d-sm-none d-md-inline-block">unday</span></p>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input  rounded-circle" id="monday"
                                            name="monday">
                                        <label class="custom-control-label rounded-circle" for="monday"></label>
                                    </div>
                                </td>
                                <td>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input  rounded-circle" id="tuesday"
                                            name="tuesday">
                                        <label class="custom-control-label rounded-circle" for="tuesday"></label>
                                    </div>
                                </td>
                                <td>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input  rounded-circle"
                                            id="wednesday" name="wednesday">
                                        <label class="custom-control-label rounded-circle" for="wednesday"></label>
                                    </div>
                                </td>
                                <td>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input  rounded-circle"
                                            id="thursday" name="thursday">
                                        <label class="custom-control-label rounded-circle" for="thursday"></label>
                                    </div>
                                </td>
                                <td>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input  rounded-circle" id="friday"
                                            name="friday">
                                        <label class="custom-control-label rounded-circle" for="friday"></label>
                                    </div>
                                </td>
                                <td>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input  rounded-circle"
                                            id="saturday" name="saturday">
                                        <label class="custom-control-label rounded-circle" for="saturday"></label>
                                    </div>
                                </td>
                                <td>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input  rounded-circle" id="sundays"
                                            name="sundays">
                                        <label class="custom-control-label rounded-circle" for="sundays"></label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span class="btn btn-warning m-0 w-100 rounded-0">Change weekly non-school days</span>
                </form>
                <div id="calendar"></div>
                <!--table>(thead>tr>td*7)+(tbody>tr>td*7)-->

            </div>`);
        $("#tabContainerNonSchoolDays").append($nonSchoolDays);
        var calendar = $nonSchoolDays.find("#calendar");
        var sampleEvents = [{
            title: "Soulful sundays bay area",
            date: new Date().setDate(new Date().getDate() - 7), // last week
            link: "#"
        }, {
            title: "London Comicon",
            date: new Date().getTime(), // today
            link: "#"
        }, {
            title: "Youth Athletic Camp",
            date: new Date().setDate(new Date().getDate() + 31), // next month
            link: "#"
        }];
        var calendarControls = new CalendarControls(calendar, sampleEvents);
    }

    createTab(tabName, container) {
        if ($("#tab" + tabName).length) {
            return false;
        }

        this.createTabHeader(tabName, container);
        this.createTabContainer(tabName, container);
    }

    createTabHeader(tabName, container) {
        var $tabHeader = $("<span id='tab" + tabName + "' class='btn btn-warning w-25 text-dark p-4 col-xs col-md-10'></span>");
        $tabHeader.html(tabName);
        $tabHeader.prop("id", "tab" + tabName);
        $tabHeader.attr("tabContainer", "tabContainer" + tabName);
        var $tabHeaderContainer = $("#tabHeaders");
        if ($tabHeaderContainer.length == 0) {
            $tabHeaderContainer = $("<div id='tabHeaders' class='btn-group rounded col-xs w-75 text-center text-white d-flex justify-content-center'></div>");
            container.append($tabHeaderContainer);
        }

        $tabHeaderContainer.append($tabHeader);
    }

    createTabContainer(tabName, container) {
        var $tabContainer = $("<div id='tabContainer' class='tabContainer p-2 col-md-10 mx-auto rounded bg-dark col-xs'></div>");
        $tabContainer.prop("id", "tabContainer" + tabName);
        $tabContainerContainer = $("#tabContainers");
        if ($tabContainerContainer.length == 0) {
            var $tabContainerContainer = $("<div id='tabContainers' class='w-75 text-white'></div>");
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
        $(".tabContainer").each(function () {
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
        var $btnRemove = $("<td><button class='btn btn-danger'>Remove</button></td>");
        row.append($btnRemove);
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
        $("#tabHeaders .btn").on("click", function () {
            var current = $(this);
            $("#tabHeaders .btn.active").removeClass("active");
            current.addClass("active");
            $(".tabContainer").each(function () {
                //view.fadeOutItem($(this));
                $(this).hide();
            });
            var tabContainer = $("#" + current.attr("tabContainer"));
            //view.fadeInItem(tabContainer);
            tabContainer.show();
        });

        $("#tabTeachers").trigger("click");
        model.loadTeachers(model, function (data) {
            view.addRowsToTable(model.teachers, view.tableTeachers);
            view.createDataTable(view.tableTeachers);
        });

        model.loadClassrooms(model, function (data) {
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