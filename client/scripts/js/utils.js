//format number with certain number of 0
function minNumberOfDigits(number, numberOfDigits = 2) {
    return number.toLocaleString("es", {
        minimumIntegerDigits: numberOfDigits,
    });
}

//get all dates from a week given a date
function getWeekFromDate(dayDate) {
    var weekDates = [];
    var dayInNumber = dayDate.getDay();
    var startingNumber = 1;
    if (dayInNumber >= 1) {
        startingNumber = 0 - dayInNumber;
    }

    var currentDateInFor = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate());

    currentDateInFor.setDate(currentDateInFor.getDate() + (startingNumber));
    for (var index = 0; index < 7; index++) {
        currentDateInFor.setDate(currentDateInFor.getDate() + 1);
        weekDates.push(new Date(currentDateInFor.getTime()));
        startingNumber++;
    }

    return weekDates;
}

//function to send notificcation
function sendNotification(message = "An error occurred", error = false) {
    setTimeout(() => {
        modalError(message);
    }, 250);
    //alert(message);
}

var schedule = [
    ["7:55", "8:50"],
    ["8:50", "9:45"],
    ["9:45", "10:40"],
    ["11:00", "11:55"],
    ["11:55", "12:50"],
    ["12:50", "13:45"],
    ["14:05", "15:00"],
    ["15:00", "15:55"],
    ["15:55", "16:50"],
    ["16:50", "17:45"],
    ["18:05", "19:00"],
    ["19:00", "19:55"],
    ["19:55", "20:50"],
    ["20:50", "21:10"],
    ["21:10", "22:05"]
];

//print date with certain fromat
function printDateWithFormat(givenDate, format = "d/m/Y") {
    format = format.replace("y", givenDate.getYear());
    format = format.replace("Y", givenDate.getFullYear());

    format = format = format.toLowerCase();

    format = format.replace("d", minNumberOfDigits(givenDate.getDate()));

    format = format.replace("m", minNumberOfDigits(givenDate.getMonth() + 1));

    return format;
}

//get academic year given a date
function getAcademicYear(date) {
    month = date.getMonth() + 1;

    year = date.getFullYear();

    switch (month) {
        case '01':
        case '02':
        case '03':
        case '04':
        case '05':
        case '06':
            year--;
            break;
    }

    return year;
}