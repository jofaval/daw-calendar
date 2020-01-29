var globalDate = new Date();

class CalendarControls {
  constructor(calendarHTML, events = [], from_monday = true) {
    this.from_monday = from_monday;
    this.calendarHTML = calendarHTML;
    this.events = events;
    this.currentDate = new Date();
    this.updateCalendar();

    this.updateOnDayClick(this);
    var scope = this;
    $(".month-mover").on("click", function() {
      scope.updateOnDayClick(scope);
    });
  }

  addEvent(date, title) {
    this.events.push = {
      title: "Soulful sundays bay area",
      date: new Date().setDate(new Date().getDate() - 7), // last week
      link: "#"
    };
    this.updateCalendar();
  }

  removeEvent(date, title) {
    this.updateCalendar();
  }

  modifyEvent(date, title) {
    this.updateCalendar();
  }

  updateCalendar() {
    this.calendarHTML.MEC({
      events: this.events,
      from_monday: this.from_monday,
      onMonthChanged: this.onMonthChanged
    });
  }

  onMonthChanged(month, year) {
    //console.log(globalDate);
    globalDate = new Date(year, month, 2);
    //console.log(month);
    //console.log(globalDate);
  }

  updateOnDayClick(scope) {
    $(".a-date").on("click", function() {
      var current = $(this);
      scope.onDayClick(current);
    });
  }

  onDayClick(current) {
    var dayInNumber = parseInt(current.text());
    var newDate = new Date(
      globalDate.getFullYear(),
      globalDate.getMonth(),
      dayInNumber
    );
    //console.log(newDate);
    var timeTable = $("#timeTable");
    timeTable.TT({
      events: this.events,
      schedule: schedule,
      day: newDate
    });
  }
}
