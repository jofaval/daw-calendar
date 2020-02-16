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
        var addButton = $("<span class='w-100 btn btn-warning mb-2'>Add <i class='fa fa-plus'></i></span>");

        //Create tab
        this.createTab("Teachers", this.mainContainer);
        this.createTab("Classrooms", this.mainContainer);
        this.createTab("Schedules", this.mainContainer);
        this.createTab("NonSchoolDays", this.mainContainer);

        //Teachers
        this.tableTeachers = $(`<table class="text-center table mx-auto w-100 table-striped table-light table-bordered table-sm dataTable" role="grid" aria-describedby="dtBasicExample_info" cellspacing="0">
            <thead class="text-center">
                <tr>
                    <th>Username</th>
                    <th>Full name</th>
                    <th>Type</th>
                    <th>Email</th>
                    <th>Activate</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`);
        this.tableTeachers.prop("id", "dtTeachers");
        $("#tabContainerTeachers").append(addButton.clone().attr("id", "addTeachers"));
        $("#tabContainerTeachers").append(this.tableTeachers);

        //Classrooms
        this.tableClassrooms = $(`<table class="text-center table mx-auto w-100 table-striped table-light table-bordered table-sm dataTable" role="grid" aria-describedby="dtBasicExample_info" cellspacing="0">
            <thead class="text-center">
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>State</th>
                    <th>Active</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`);
        this.tableClassrooms.prop("id", "dtClassrooms");
        $("#tabContainerClassrooms").append(addButton.clone().attr("id", "addClassrooms"));
        $("#tabContainerClassrooms").append(this.tableClassrooms);

        //Schedules
        this.tableSchedules = $(`<table class="text-center table mx-auto w-100 table-striped table-light table-bordered table-sm dataTable" role="grid" aria-describedby="dtBasicExample_info" cellspacing="0">
            <thead class="text-center">
                <tr>
                    <th>Order Id</th>
                    <th>Start Hour</th>
                    <th>End Hour</th>
                    <th>Year</th>
                    <th>Active</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>`);
        this.tableSchedules.prop("id", "dtSchedules");
        $("#tabContainerSchedules").append(addButton.clone().attr("id", "addSchedules"));
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
                                    class="btn btn-danger">Disable</button>
                                <button type="button" name="removeNonSchoolDay" id="removeNonSchoolDay"
                                    class="btn btn-warning">Enable</button>
                            </div>
                        </div>
                    </form>
                </div>
                <form action="" id="nonWorkWeeklyDays" method="POST" class="mb-3">
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
                                        <input type="checkbox" class="custom-control-input  rounded-circle" id="sunday"
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

        var dayIntToId = {
            1: "monday",
            2: "tuesday",
            3: "wednesday",
            4: "thursday",
            5: "friday",
            6: "saturday",
            0: "sunday",
        };

        for (const key in dayIntToId) {
            if (dayIntToId.hasOwnProperty(key)) {
                const element = dayIntToId[key];
                $("#" + element).attr("checked", true);
            }
        }

        AjaxController.getNonWorkWeeklyDays(function (data) {
            var jsonParsed = JSON.parse(data);
            for (const key in jsonParsed) {
                if (jsonParsed.hasOwnProperty(key)) {
                    const row = jsonParsed[key];
                    if (condition) {
                        $("#" + dayIntToId[row.nonWorkDay]).attr("checked", false);
                    }
                }
            }
        });

        var calendar = $nonSchoolDays.find("#calendar");
        this.loadEventsFromMonth(new Date(), calendar);
        var calendarControls = new CalendarControls(calendar, [], new Date()); //For testing
    }

    loadEventsFromMonth(date, calendar) {
        var view = this;
        var sampleEvents = [];
        AjaxController.getMonthlyNonSchoolDays(date.getFullYear(), date.getMonth(), function (data) {
            var jsonParsed = JSON.parse(data);
            for (const key in jsonParsed) {
                var currentEvent = {};
                if (jsonParsed.hasOwnProperty(key)) {
                    const element = jsonParsed[key];
                    sampleEvents.push({
                        title: "Not bookeable",
                        date: new Date(Date.parse(element.specialDay)), // next month
                        link: "#"
                    });
                }
            }
            var calendarControls = new CalendarControls(calendar, sampleEvents, date);
            calendarControls.setOnMonthChanged(function name(month, year) {
                //view.loadEventsFromMonth(new Date(year, month, 1), calendar, sampleEvents);
            });
        });
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
            $tabHeaderContainer = $("<div id='tabHeaders' class='btn-group rounded col-xs w-100 text-center text-white d-flex justify-content-center'></div>");
            container.append($tabHeaderContainer);
        }

        $tabHeaderContainer.append($tabHeader);
    }

    createTabContainer(tabName, container) {
        var $tabContainer = $("<div id='tabContainer' class='tabContainer py-2 col-md-12 mx-0 rounded bg-dark col-xs'></div>");
        $tabContainer.prop("id", "tabContainer" + tabName);
        $tabContainerContainer = $("#tabContainers");
        if ($tabContainerContainer.length == 0) {
            var $tabContainerContainer = $("<div id='tabContainers' class='w-100 text-white'></div>");
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
        var select = $(".dataTables_length select");
        select.html("").append("<option value='5'>5</option><option value='10'>10</option>");
        var children = select.children();
        children.last().attr("selected", "selected");
        children.last().attr("selected", false);
        children.first().attr("selected", "selected");

        table.find('.dataTables_length').addClass('bs-select');
    }

    addRowToTable(dataArray, table) {
        var row = $("<tr></tr>");

        var disableState = dataArray["enabled"];
        delete dataArray["enabled"];

        row.on("click", this.selectionEvent);
        for (const key in dataArray) {
            if (dataArray.hasOwnProperty(key)) {
                const element = dataArray[key];

                row.append($("<td class='align-middle'>" + element + "</td>"));
            }
        }

        var $checkDisable = $(`<td class='align-middle'>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input  rounded-circle" id="disable"
                    name="disable">
                <label class="custom-control-label rounded-circle" for="monday"></label>
            </div>
        </td>`);

        $checkDisable.on("click", function () {

        });

        if (disableState != 0) {
            $checkDisable.find("input").attr("checked", true);
        }
        row.append($checkDisable);

        var $btnRemove = $("<td><button class='btnRemove btn btn-danger'>Remove</button></td>");
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
        /* var toggle = !$(this).hasClass("selected");
        $('.selected').removeClass("selected");
        if (toggle) {
            $(this).addClass("selected");
        } */
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
            if (!current.hasClass("active")) {
                $("#tabHeaders .btn.active").removeClass("active");
                current.addClass("active");
                $(".tabContainer").each(function () {
                    //view.fadeOutItem($(this));
                    $(this).hide();
                });
                var tabContainer = $("#" + current.attr("tabContainer"));
                view.fadeInItem(tabContainer);
                //tabContainer.show();
            }
        });

        $("#tabTeachers").trigger("click");
        model.loadTeachers(model, function (data) {
            var table = $("#dtTeachers");
            view.addRowsToTable(model.teachers, table);
            view.createDataTable(table);
        });

        model.loadClassrooms(model, function (data) {
            var table = $("#dtClassrooms");
            view.addRowsToTable(model.classrooms, table);
            view.createDataTable(table);

            $(".btnRemove").on("click", function name(params) {
                var btn = $(this);

                var row = btn.parent().parent();
                var columns = row.children();
                AjaxController.deleteClassroom(columns.eq(0).text(), function (data) {
                    row.remove();
                });
            });
        });

        $("#addTeachers").on("click", function () {
            Modal.genericModalWithForm("Teacher", false, function (modalContent) {
                $("*[type=submit]").on("click", function (event) {
                    var event = event || window.event
                    event.preventDefault();
                    modalContent.close();
                    return false;
                });
                var form = $("form .form");
                form.find(":submit").on("click", function (event) {
                    var event = event || window.event;
                    event.preventDefault();

                    AjaxController.createEvent(form.find("#title").val(), form.find("#startHour").val(), form.find("#date").val(), form.find("#classroom").val(), function success(data) {
                        focused.prev().trigger("click");
                        focused.trigger("click");
                    });
                })
            });
        });

        $("#addClassrooms").on("click", function () {
            Modal.genericModalWithForm("Classroom", false, function (modalContent) {
                $("*[type=submit]").on("click", function (event) {
                    var event = event || window.event
                    event.preventDefault();
                    modalContent.close();
                    return false;
                });
                var form = $("form .form");
                form.find(":submit").on("click", function (event) {
                    var event = event || window.event;
                    event.preventDefault();

                    AjaxController.createEvent(form.find("#title").val(), form.find("#startHour").val(), form.find("#date").val(), form.find("#classroom").val(), function success(data) {
                        focused.prev().trigger("click");
                        focused.trigger("click");
                    });
                })
            });
        });

        $("#addSchedules").on("click", function () {
            Modal.genericModalWithForm("Schedule", false, function (modalContent) {
                $("*[type=submit]").on("click", function (event) {
                    var event = event || window.event
                    event.preventDefault();
                    modalContent.close();
                    return false;
                });
                var form = $("form .form");
                form.find(":submit").on("click", function (event) {
                    var event = event || window.event;
                    event.preventDefault();

                    AjaxController.createEvent(form.find("#title").val(), form.find("#startHour").val(), form.find("#date").val(), form.find("#classroom").val(), function success(data) {
                        focused.prev().trigger("click");
                        focused.trigger("click");
                    });
                })
            });
        });

        model.loadSchedules(model, function (data) {
            console.log(data);

            view.addRowsToTable(model.schedules, view.tableSchedules);
            view.createDataTable(view.tableSchedules);
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