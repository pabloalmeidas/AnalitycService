var moment       = require('moment');
var timespan     = require('timespan');
var env_ambiente = 'test';
if (process.argv[2]) {
    if (process.argv[2].indexOf('.js') == -1) {
        env_ambiente = process.argv[2];
    }
}
var config = require(__dirname + '/../../4-infra/config/config.json')[env_ambiente];

getDateTime = function() {
    return moment().format("YYYY-MM-DD HH:mm:ss");
}

getDateTimeFile = function() {
    return moment().format("YYYYMMDDHHmmss");
}

convertTimeSpanToString = function(minutes) {
    var tempo = new timespan.TimeSpan(0, 0, minutes);
    var string_retorno = " - ";

    if (tempo.days > 0) {
        string_retorno = tempo.days + " Dia(s) ";
        string_retorno += tempo.hours >= 10 ? tempo.hours : "0" + tempo.hours;
        string_retorno += tempo.minutes >= 10 ? ":" + tempo.minutes : ":0" + tempo.minutes;
        string_retorno += tempo.seconds >= 10 ? ":" + tempo.seconds : ":0" + tempo.seconds;
    } else {
        string_retorno = tempo.hours >= 10 ? tempo.hours : "0" + tempo.hours;
        string_retorno += tempo.minutes >= 10 ? ":" + tempo.minutes : ":0" + tempo.minutes;
        string_retorno += tempo.seconds >= 10 ? ":" + tempo.seconds : ":0" + tempo.seconds;
    }

    return string_retorno;
}