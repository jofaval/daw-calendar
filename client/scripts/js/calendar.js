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

var weekDate = new Date();

var newTimeTable = $("#timeTableWeek");
var testDate = new Date();
testDate.setDate(testDate.getDate() + 5);

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
    weekFormat: true
});