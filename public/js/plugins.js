
/*
function updateTS() {
    var now = new Date(); // current date

    var parts = {
        "seconds": now.getSeconds(),
        "minutes": now.getMinutes(),
        "hours": now.getHours(),
        "date": now.getDate(),
        "month": 1 + now.getMonth(),
        "year": now.getFullYear()
    };

    for (part in parts) {
        var val = parts[part];
        if (val < 10)
            parts[part] = '0' + String(val);
    };



    time = parts['hours'] + ':' + parts['minutes'] + ':' + parts['seconds'];


    date = [parts['year'], parts['month'], parts['date']].join(' ');

    document.getElementById('timestamp').innerHTML = [date, time].join(' ');

    // call this function again in 1000ms
    setTimeout(updateTS, 1000);
}
*/

//updateTS(); // get timestamp

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


$("#webticker").css("display","default");

$("#webticker").webTicker({
    speed: 100
});

/*
jQuery(function() {
    jQuery("#webticker").webTicker();
});
*/
