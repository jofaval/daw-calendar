class CalendarControls {
  constructor(calendarHTML, events = [], from_monday = true) {
    this.from_monday = from_monday;
    this.calendarHTML = calendarHTML;
    this.events = events;
    this.updateCalendar();
  }

  setOnDayClick(onDayClick = null) {
    if (onDayClick != null) {
      this.onDayClick = onDayClick;
      $(".a-date").click(onDayClick);
    } else {
      $(".a-date").click(this.onDayClick);
    }
  }

  updateCalendar() {
    this.calendarHTML.MEC({
      events: this.events,
      from_monday: this.from_monday,
      onMonthChanged: this.onMonthChanged
    });
    //this.setOnDayClick(this.onDayClick);
  }

  setOnMonthChanged(onMonthChanged) {
    this.onMonthChanged = onMonthChanged;
    this.updateCalendar();
    this.setOnDayClick();
  }
}