(function ($) {
    var timeTableTpl = $(`<div class="col-md timeTable"><div id="calTitle" class="text-center"><div id="monthYear" class="text-center"></div></div><div><div id="timeTbody" class="mt-3"></div></div></div>`);
    var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Saty"];

    $.fn.timeTable = $.fn.TT = function (options) {
        var settings = $.extend({
                events: [],
                schedule: [],
                day: new Date(),
                showDate: true,
                weekFormat: false,
                showSchedule: true
            },
            options
        );

        var weekDates = [];
        weekDates = getWeekFromDate(settings.day);

        var timeTable = this;

        populateTimeTable(settings, weekDates, timeTable, timeTableTpl, daysOfWeek);

        return timeTable;
    };

    function populateTimeTable(settings, weekDates, timeTable, timeTableTpl, daysOfWeek) {
        timeTable.html("");
        if (settings.weekFormat) {
            var weekTitle = addWeekTitle(weekDates, timeTable);
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
            }
        } else {
            //console.log("bien");
            generateTimeTable(timeTable, timeTableTpl, daysOfWeek, settings, settings.day);
        }
    }

    function addMoveNextWeek(weekDates, settings, timeTable, timeTableTpl, daysOfWeek, weekTitle) {
        var weekMoveNext = $(`<button type="button" class="month-mover next" style="transition: all 0.2s ease-in-out 0s;">
    <svg fill="#FFFFFF" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg" style="transition: all 0.2s ease-in-out 0s;"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" style="transition: all 0.2s ease-in-out 0s;"></path></svg>
  </button>`);
        weekMoveNext.click(function name() {
            var tempDate = weekDates[weekDates.length - 1];
            tempDate.setDate(tempDate.getDate() + 1);
            populateTimeTable(settings, getWeekFromDate(tempDate), timeTable, timeTableTpl, daysOfWeek);
        });
        weekTitle.append(weekMoveNext);
    }

    function addMovePrevWeek(weekDates, settings, timeTable, timeTableTpl, daysOfWeek, weekTitle) {
        var weekMovePrev = $(`<button type="button" class="month-mover prev" style="transition: all 0.2s ease-in-out 0s;">
				<svg fill="#FFFFFF" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg" style="transition: all 0.2s ease-in-out 0s;"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" style="transition: all 0.2s ease-in-out 0s;"></path></svg>
			</button>`);
        weekMovePrev.click(function name() {
            var tempDate = weekDates[0];
            tempDate.setDate(tempDate.getDate() - 2);
            populateTimeTable(settings, getWeekFromDate(tempDate), timeTable, timeTableTpl, daysOfWeek);
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
            var eventTitle = "Untitled";
            for (const key in Object.keys) {
                if (object.hasOwnProperty(key)) {
                    const event = object[key];
                    if (scheduleHours[0] == event.startHour) {
                        eventTitle = event.eventTitle;
                        break;
                    }
                }
            }
            $row.append($(`<td class="col">
        <event-card event-title="${eventTitle}" event-start-hour="${scheduleHours[0]}" event-end-hour="${scheduleHours[1]}" show-schedule="${settings.showSchedule ? "1" : "0"}"
        teacher-email="email@test.com" teacher-name="parakquieressaberesojajasalu2"
        event-type="free"></event-card></td>
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
        } else {
            titleString = "Hours";
            thead.parent().toggleClass("text-center");
        }

        thead.text(titleString);
    }
})(jQuery);