(function ($) {
    var timeTableTpl = $(`<div class="col-md timeTable"><div id="calTitle" class="text-center"><div id="monthYear" class="text-center"></div></div><div><div id="timeTbody" class="mt-3"></div></div></div>`);
    var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Saty"];
    var onWeekChange;

    $.fn.timeTable = $.fn.TT = function (options) {
        var settings = $.extend({
                events: [],
                schedule: [],
                day: new Date(),
                showDate: true,
                weekFormat: false,
                showSchedule: true,
                onWeekChange: null,
            },
            options
        );

        var weekDates = [];
        weekDates = getWeekFromDate(settings.day);

        var timeTable = this;
        timeTable.addClass('rounded');

        populateTimeTable(settings, weekDates, timeTable, timeTableTpl, daysOfWeek);

        return timeTable;
    };

    function populateTimeTable(settings, weekDates, timeTable, timeTableTpl, daysOfWeek) {
        timeTable.html("");
        if (settings.weekFormat) {
            /*var weekTitle = addWeekTitle(weekDates, timeTable);
            addMovePrevWeek(weekDates, settings, timeTable, timeTableTpl, daysOfWeek, weekTitle);
            addMoveNextWeek(weekDates, settings, timeTable, timeTableTpl, daysOfWeek, weekTitle);

            settings.showSchedule = true;

            timeTableTpl.toggleClass("col");
            timeTableTpl.toggleClass("col-1");

            generateTimeTable(timeTable, timeTableTpl, daysOfWeek, settings, weekDates[0], false);

            timeTableTpl.toggleClass("col");
            timeTableTpl.toggleClass("col-1");

            settings.showSchedule = false;

            generateTimeTable(timeTable, timeTableTpl, daysOfWeek, settings, weekDates[0]);

            for (var index = 1; index < 7; index++) {
                generateTimeTable(timeTable, timeTableTpl, daysOfWeek, settings, weekDates[index]);
            }*/
            timeTableWeek(settings, weekDates, timeTable, timeTableTpl, daysOfWeek);
        } else {
            //console.log("bien");
            generateTimeTable(timeTable, timeTableTpl, daysOfWeek, settings, settings.day);
        }
    }

    function addMoveNextWeek(weekDates, settings, timeTable, timeTableTpl, daysOfWeek, weekTitle) {
        var weekMoveNext = $(`<button type="button" class="month-mover week-mover next" style="transition: all 0.2s ease-in-out 0s;">
    <svg fill="#FFFFFF" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg" style="transition: all 0.2s ease-in-out 0s;"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" style="transition: all 0.2s ease-in-out 0s;"></path></svg>
  </button>`);
        weekMoveNext.click(function name() {
            var tempDate = weekDates[weekDates.length - 1];
            tempDate.setDate(tempDate.getDate() + 1);
            var newWeekDates = getWeekFromDate(tempDate);
            populateTimeTable(settings, getWeekFromDate(tempDate), timeTable, timeTableTpl, daysOfWeek);
            if (settings.onWeekChange != null) {
                settings.onWeekChange(newWeekDates[0], newWeekDates[newWeekDates.length - 1]);
            }
        });
        weekTitle.append(weekMoveNext);
    }

    function addMovePrevWeek(weekDates, settings, timeTable, timeTableTpl, daysOfWeek, weekTitle) {
        var weekMovePrev = $(`<button type="button" class="month-mover week-mover prev" style="transition: all 0.2s ease-in-out 0s;">
				<svg fill="#FFFFFF" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg" style="transition: all 0.2s ease-in-out 0s;"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" style="transition: all 0.2s ease-in-out 0s;"></path></svg>
            </button>`);

        weekMovePrev.click(function name() {
            var tempDate = weekDates[0];
            tempDate.setDate(tempDate.getDate() - 2);
            var newWeekDates = getWeekFromDate(tempDate);
            populateTimeTable(settings, getWeekFromDate(tempDate), timeTable, timeTableTpl, daysOfWeek);
            if (settings.onWeekChange != null) {
                settings.onWeekChange(newWeekDates[0], newWeekDates[newWeekDates.length - 1]);
            }
        });
        weekTitle.prepend(weekMovePrev);
    }

    function addWeekTitle(weekDates, timeTable) {
        var weekTitle = $("<div id='calTitle' class='weekTitle col-12 font-big text-center'></div>");
        var weekString = "Week of " + printDateWithFormat(weekDates[0], "d/m/Y") + " - " + printDateWithFormat(weekDates[weekDates.length - 1], "d/m/Y");
        weekTitle.append($("<div id='monthYear'>" + weekString + "</div>"));
        timeTable.prepend(weekTitle);
        return weekTitle;
    }

    function generateTimeTable(timeTable, timeTableTpl, daysOfWeek, settings, workingDate, hasEvents = true) {
        var clone = timeTableTpl.clone();
        timeTable.addClass("mini-cal").append(clone);
        var thead = clone.find("#monthYear");
        addTitleToTimeTable(hasEvents, daysOfWeek, workingDate, settings, thead);

        var tbody = clone.find("#timeTbody");
        var $table = $("<table></table>");
        tbody.append($table);
        schedule.forEach(scheduleHours => {
            addScheduleHourToTimeTable($table, settings, scheduleHours, hasEvents);
        });
    }

    function addScheduleHourToTimeTable($table, settings, scheduleHours, hasEvents) {
        var $row = $("<tr></tr>");
        $table.append($row);
        if (settings.weekFormat) {
            if (settings.showSchedule) {
                var $time = $("<td></td>");
                $time.html(scheduleHours[0] + " <br /> " + scheduleHours[1]);
                $row.append($time);
            }
            if (hasEvents) {
                $eventTitle = $("<td></td>");
                $row.append($eventTitle);
                settings.events.forEach(event => {
                    if (scheduleHours[0] == event.startHour) {
                        $eventTitle.html(event.eventTitle);
                    }
                });
                var $buttons = $("<td></td>");
                $buttons.append();
                $row.append($buttons);
            }
        } else {
            var events = settings.events;

            var eventsLen = events.length;
            var eventTitle = "Untitled";
            var teacherEmail = "contact@iesabastos.org";
            var teacherName = "not picked";
            var eventType = "free";

            //console.log("events: ", events);
            for (let eventIndex = 0; eventIndex < eventsLen; eventIndex++) {
                const event = events[eventIndex];
                //console.log(event["event-start-hour"], scheduleHours[0], scheduleHours[0] == event["event-start-hour"]);
                if (scheduleHours[0] == event["event-start-hour"]) {
                    eventTitle = event["event-title"];
                    teacherName = event["teacher-name"];
                    teacherEmail = event["teacher-email"];
                    eventType = (event["event-type"] != 0) ? "yours" : "picked";
                    break;
                }
            }


            $row.append($(`<td class="col">
                <event-card event-title="${eventTitle}" event-start-hour="${scheduleHours[0]}" event-end-hour="${scheduleHours[1]}" show-schedule="${settings.showSchedule ? "1" : "0"}"
                teacher-email="${teacherEmail}" teacher-name="${teacherName}"
                event-type="${eventType}"></event-card></td>
            `));
        }
    }

    function addTitleToTimeTable(hasEvents, daysOfWeek, workingDate, settings, thead) {
        var titleString = "";

        if (hasEvents) {
            titleString = daysOfWeek[workingDate.getDay()];
            if (settings.showDate) {
                titleString += ", " + workingDate.getDate();
            }
            if (!settings.weekFormat) {
                addFiltering(thead.parent())
            }
        } else {
            titleString = "Hours";
            thead.parent().toggleClass("text-center");
        }

        thead.append(titleString);
    }

    function addFiltering(container) {
        container.append(`
                <div id="actions" class="d-flex ml-sm-2 justify-content-around btn-group flex-wrap">
                    <span class="btn align-middle btn-sm btn-dark" id="picked">Picked</span>
                    <span class="btn align-middle btn-sm btn-primary" id="free">Free</span>
                    <span class="btn align-middle btn-sm btn-warning" id="yours">Yours</span>
                </div>`);

        container.find("#picked").on("click", function () {
            toggle($(this), "picked");
        });

        container.find("#free").on("click", function () {
            toggle($(this), "free");
        });

        container.find("#yours").on("click", function () {
            toggle($(this), "yours");
        });

        function toggle(current, classString) {
            var eventsContainer = current.parent().parent().parent().parent().find("#timeTbody");

            eventsContainer.find(`event-card[event-type="${classString}"]`).toggle();

            current.toggleClass("active");
        }
    }

    function timeTableWeek(settings, weekDates, timeTable, timeTableTpl, daysOfWeek) {
        var schedule = settings.schedule;
        var events = settings.events;
        var scheduleLength = schedule.length;

        var weekTitle = `Week of <span id="startingDate">${printDateWithFormat(weekDates[0], "Y-m-d")}</span> - <span id="endingDate">${printDateWithFormat(weekDates[weekDates.length - 1], "Y-m-d")}</span>`;
        timeTable.append(`
        <div id="calTitle" class="weekTitle col-12 font-big text-center">
            <div id="monthYear">${weekTitle}</div>
        </div>
        `);
        var $weekTitle = timeTable.find(".weekTitle");
        addMovePrevWeek(weekDates, settings, timeTable, timeTableTpl, daysOfWeek, $weekTitle);
        addMoveNextWeek(weekDates, settings, timeTable, timeTableTpl, daysOfWeek, $weekTitle);

        var $calBody = $(`<div id="calBody" class="col-12 mb-3"></div>`);
        var $table = $(`<table class="col text-center bg-dark text-white rounded"></table>`);
        $calBody.append($table);
        timeTable.append($calBody);
        $table.append($(`<thead class="my-3">
                <tr>
                    <th class="col-md">Hours</th>
                    <th class="col-md">M </th>
                    <th class="col-md">T </th>
                    <th class="col-md">W </th>
                    <th class="col-md">T </th>
                    <th class="col-md">F </th>
                    <th class="col-md">S </th>
                    <th class="col-md">S </th>
                </tr>
            </thead>`));
        var $tbody = $(`<tbody class="bg-dark"></tbody>`);
        $table.append($tbody);

        //pasar a formato los eventos de la semana

        for (let scheduleIndex = 0; scheduleIndex < scheduleLength; scheduleIndex++) {
            var $tr = $(`<tr class="my-3"></tr>`);
            var $td = $(`<td>${schedule[scheduleIndex][0]} <br> ${schedule[scheduleIndex][1]}</td>`);
            $tr.append($td);
            for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
                var $td = $(`<td></td>`);
                var eventTitle = "Unreserved";
                var teacherEmail = "contact@iesabastos.org";
                var teacherName = "not picked";
                var eventType = "free";
                var currentEvent = events[dayIndex];
                if (currentEvent != undefined) {
                    var currentEventList = currentEvent["events"];
                    var eventsLen = currentEventList.length;
                    for (let eventIndex = 0; eventIndex < eventsLen; eventIndex++) {
                        const selectedEvent = currentEventList[eventIndex];
                        if (schedule[scheduleIndex][0] == selectedEvent["event-start-hour"]) {
                            eventTitle = selectedEvent["event-title"];
                            teacherName = selectedEvent["teacher-name"];
                            teacherEmail = selectedEvent["teacher-email"];
                            eventType = (selectedEvent["event-type"] != 0) ? "yours" : "picked";
                            eventIndex = eventsLen;
                        }
                    }
                }
                $event = $(`<event-week event-title="${eventTitle}" event-start-hour="${schedule[scheduleIndex][0]}" event-end-hour="${schedule[scheduleIndex][1]}" show-schedule="${settings.showSchedule ? "1" : "0"}"
                teacher-email="${teacherEmail}" teacher-name="${teacherName}"
                event-type="${eventType}"></event-week>`);
                $td.append($event);
                $tr.append($td);
            }
            $tbody.append($tr);
        }
    }
})(jQuery);