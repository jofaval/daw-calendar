(function($) {
    var timeTableTpl = $(`
  <div class="col timeTable">
    <div id="calTitle" class="text-center">
      <div id="monthYear" class="text-center"></div>
    </div>
    <div>
      <div id="timeTbody"></div>
    </div>
  </div>
	`);
    var daysOfWeek = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Saty"
    ];

    $.fn.timeTable = $.fn.TT = function(options) {
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
        //if (settings.weekFormat) {
        getWeekFromDate(settings.day);
        //}

        var timeTable = this;

        populateTimeTable(settings, weekDates, timeTable, timeTableTpl, daysOfWeek);

        //console.log($("tr"));

        /*$("tr").hover(function () {
            $(this).addClass("focused");
        }, function () {
            $(this).removeClass("focused");
        });*/

        return timeTable;
    };
})(jQuery);

function populateTimeTable(settings, weekDates, timeTable, timeTableTpl, daysOfWeek) {
    //console.log(weekDates);
    console.log(settings);

    timeTable.html("");
    if (settings.weekFormat) {

        if (weekDates.length == 0) {
            weekDates = getWeekFromDate(settings.day);
        }
        console.log(weekDates);

        var weekTitle = $("<div id='calTitle' class='weekTitle col-12 font-big text-center'></div>");
        var weekString = "Semana del " +
            printDateWithFormat(weekDates[0], "d/m/Y") +
            " - " +
            printDateWithFormat(weekDates[weekDates.length - 1], "d/m/Y");
        weekTitle.append($("<div id='monthYear'>" + weekString + "</div>"));
        timeTable.prepend(weekTitle);

        var weekMovePrev = $(`<button type="button" class="month-mover prev" style="transition: all 0.2s ease-in-out 0s;">
				<svg fill="#FFFFFF" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg" style="transition: all 0.2s ease-in-out 0s;"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" style="transition: all 0.2s ease-in-out 0s;"></path></svg>
			</button>`);
        weekMovePrev.click(function name() {
            var tempDate = weekDates[0];
            tempDate.setDate(tempDate.getDate() - 2);
            populateTimeTable(settings, getWeekFromDate(tempDate), timeTable, timeTableTpl, daysOfWeek)
        });
        weekTitle.prepend(weekMovePrev);

        var weekMoveNext = $(`<button type="button" class="month-mover next" style="transition: all 0.2s ease-in-out 0s;">
    <svg fill="#FFFFFF" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg" style="transition: all 0.2s ease-in-out 0s;"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" style="transition: all 0.2s ease-in-out 0s;"></path></svg>
  </button>`);
        weekMoveNext.click(function name() {
            var tempDate = weekDates[weekDates.length - 1];
            tempDate.setDate(tempDate.getDate() + 1);
            populateTimeTable(settings, getWeekFromDate(tempDate), timeTable, timeTableTpl, daysOfWeek)
        });
        weekTitle.append(weekMoveNext);

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
        generateTimeTable(timeTable, timeTableTpl, daysOfWeek, settings, settings.day);
    }
}

function generateTimeTable(
    timeTable,
    timeTableTpl,
    daysOfWeek,
    settings,
    workingDate,
    hasEvents = true
) {
    var clone = timeTableTpl.clone();
    timeTable.addClass("mini-cal").append(clone);
    if (hasEvents) {
        var thead = clone.find("#monthYear");
        var titleString = daysOfWeek[workingDate.getDay()];
        if (settings.showDate) {
            titleString += ", " + workingDate.getDate();
        }
        thead.text(titleString);
    }
    var tbody = clone.find("#timeTbody");
    var $table = $("<table></table>");
    tbody.append($table);
    schedule.forEach(scheduleHours => {
        var $row = $("<tr></tr>");
        $table.append($row);
        if (settings.showSchedule) {
            var $time = $("<td></td>");
            $time.html(scheduleHours[0] + " <br /> " + scheduleHours[1]);
            $row.append($time);
        }
        if (hasEvents) {
            $eventTitle = $("<td></td>");
            $row.append($eventTitle);
            settings.events.forEach(event => {
                //console.log(scheduleHours[0] + " - " + event.startHour + ": " + (scheduleHours[0] == event.startHour));
                if (scheduleHours[0] == event.startHour) {
                    $eventTitle.html(event.eventTitle);
                }
            });
            var $buttons = $("<td></td>");
            $buttons.append();
            $row.append($buttons);
        }
    });
}