class CalendarControls {
  constructor(calendarHTML, events = [], from_monday = true) {
    this.from_monday = from_monday;
    this.calendarHTML = calendarHTML;
    this.events = events;
    this.updateCalendar();
  }

  setOnDayClick(onDayClick) {
    $(".a-date").click(function () {
      onDayClick(scope);
    });
  }

  updateCalendar() {
    this.calendarHTML.MEC({
      events: this.events,
      from_monday: this.from_monday,
      onMonthChanged: this.onMonthChanged
    });
  }

  setOnMonthChanged(onMonthChanged) {
    this.onMonthChanged = onMonthChanged;
    this.updateCalendar();
  }
}