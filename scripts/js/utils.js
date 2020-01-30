function request(requestLocation, requestType = "POST", params = {}, success = defaultAjaxSuccessAction, error = defaultAjaxErrorAction, async = false) {
    $.ajax({
        url: requestLocation,
        data: params,
        type: requestType,
        async: async,
        success: success,
        error: error,
    });
}

function defaultAjaxSuccessAction(data) {
    console.log("La petición ha tenido éxito");
    console.log("Resultado :");
    console.log(data);
}

function defaultAjaxErrorAction(data) {
    console.log("La petición ha fallado");
    console.log("Resultado :");
    console.log(data);
    sendNotification("Ha surgido un error al realizar la operación", true);
}

function printDateWithFormat(givenDate, format = "d/m/Y") {
    format = format.replace("y", givenDate.getYear());
    format = format.replace("Y", givenDate.getFullYear());

    format = format = format.toLowerCase();

    format = format.replace("d", minNumberOfDigits(givenDate.getUTCDate()));

    format = format.replace("m", minNumberOfDigits(givenDate.getMonth() + 1));

    return format;
}

function minNumberOfDigits(number, numberOfDigits = 2) {
    return number.toLocaleString("es", {
        minimumIntegerDigits: numberOfDigits,
    });
}

function getWeekFromDate(dayDate) {
    var weekDates = [];
    var workDate = dayDate;
    var dayInNumber = dayDate.getDay();
    var startingNumber = 1;
    if (dayInNumber >= 1) {
        startingNumber = 0 - dayInNumber;
    }
    //console.log("Day in number: " + dayInNumber);

    //var timestamp = workDate.getDate();
    //console.log("Timestamp: " + timestamp);
    //var base = 60 * 60 * 24;
    var currentDateInFor = workDate;
    currentDateInFor.setDate(currentDateInFor.getDate() + (startingNumber));
    for (var index = 0; index < 7; index++) {
        //currentDateInFor.setDate(timestamp + (startingNumber));
        currentDateInFor.setDate(currentDateInFor.getDate() + 1);
        weekDates.push(new Date(currentDateInFor.getTime()));
        //timestamp++;
        //currentDateInFor.setDate(timestamp);
        //weekDates.push(new Date(workDate.getTime() + (base * startingNumber)));
        //console.log("Number: " + startingNumber);
        //console.log("Timestampt: " + (timestamp + (startingNumber)));
        //console.log("Date: " + workDate);
        startingNumber++;
    }

    /*console.log(weekDates);
    console.log(
        "Semana del " +
        printDateWithFormat(weekDates[0], "d/m/Y") +
        " - " +
        printDateWithFormat(weekDates[weekDates.length - 1], "d/m/Y")
    );*/

    console.log(weekDates);

    return weekDates;
}

function sendNotification(message, error = false) {

    setTimeout(() => {

    }, timeout);
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