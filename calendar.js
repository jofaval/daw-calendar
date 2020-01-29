
    localStorage.setItem("theme", "light");
    $(document).ready(function name(params) {
        $("*").css("transition", "all 0.2s ease-in-out");
    });

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

    var calendar = $("#calendar");
    var calendarControls = new CalendarControls(calendar, sampleEvents);

    var sampleEventsTimeTable = [{
        eventTitle: "Are you sure about that?",
        startHour: "8:50"
    }, {
        eventTitle: "Are you sure about that?",
        startHour: "15:00"
    }];

    var timeTable = $("#timeTable");
    this.timeTable.TT({
        events: sampleEventsTimeTable,
        schedule: schedule
    });

    //weekly calendar;

    var weekDate = new Date();

    var newTimeTable = $("#timeTableWeek");

    /*newTimeTable.TT({
      events: sampleEventsTimeTable,
      schedule: schedule,
      day: weekDate,
      showDay: false,
      showSchedule: true
    });

    for (let index = 1; index < 7; index++) {
      weekDate.setDate(weekDate.getDate() + 1);
      newTimeTable = $("#timeTable" + (index + 1));

      newTimeTable.TT({
        events: sampleEventsTimeTable,
        schedule: schedule,
        day: weekDate,
        showDay: false,
        showSchedule: false
      });
    }*/
    var testDate = new Date( /*2020, 11,28*/ );
    testDate.setDate(testDate.getDate() + 5);
    //console.log(testDate);

    var weekEvents = {
        "29/01/2020": [{
            eventTitle: "Are you sure about that?",
            startHour: "8:50"
        }, {
            eventTitle: "Are you sure about that?",
            startHour: "15:00"
        }],
        "30/02/2020": [{
            eventTitle: "Are you sure about that?",
            startHour: "8:50"
        }, {
            eventTitle: "Are you sure about that?",
            startHour: "15:00"
        }],
    };

    newTimeTable.TT({
        events: sampleEventsTimeTable,
        schedule: schedule,
        day: testDate,
        showDay: false,
        showSchedule: false,
        weekFormat: true
    });