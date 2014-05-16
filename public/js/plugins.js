///////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////
// Variables
/////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////
// Utilities
////////////////////////////////////////////////////////////////////////////////


var modifyBgColor = function(elem, color1, stop1, color2, stop2) {
    var iconBg = $(elem).find('.service-thumbnail');
    if (typeof iconBg.prop('class') === "undefined") {
        $('#video-bar div').css('background-color', color1);
    } else {
        var propVal = color1 + ' ' + stop1 + ',' + color2 + ' ' + stop2;
        iconBg.css('background-image', 'linear-gradient(to right bottom,' + propVal);
    }
}


///////////////////////////////////////////////////////////////////////
// Video 
///////////////////////////////////////////////////////////////////////

var intro_video = "https://www.youtube.com/embed/qa66zO8JrdQ?feature=player_detailpage";

var showVideo = function() {
    $('#video-page').fadeIn(function() {
        var url = intro_video + "&autoplay=1";
        $('#video-iframe').attr('src', url)
    });

}

var hideVideo = function() {
    $('#video-page').fadeOut();

}

//////////////////////////////////////////////////////////////////////////////
// Ticker
//////////////////////////////////////////////////////////////////////////////

$("#webticker").css("display", "default");

$("#webticker").webTicker({
    speed: 100
});

///////////////////////////////////////////////////////////////////////////////
// Google Map
///////////////////////////////////////////////////////////////////////////////

function initGoogleMap() {
    var myLatlng = new google.maps.LatLng(45.7145890, -73.6796590);

    var map_canvas = document.getElementById('map_canvas');
    var map_options = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(map_canvas, map_options);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Docteur Quantum - Bureau',
        animation: google.maps.Animation.DROP,
        draggable: false
    });
    google.maps.event.addListener(marker, 'click', toggleBounce);
    google.maps.event.trigger(map, 'resize');
}

function toggleBounce() {

    if (marker.getAnimation() != null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

$('#contactMe').on('shown.bs.modal', function(event) {
    initGoogleMap();
});


////////////////////////////////////////////////////////////////////
// Responsive Buttons
////////////////////////////////////////////////////////////////////

// The telephone icon has two different meanings depending on device type:
//   desktop (992px and larger) : bring up a modal box with contact info
//   tablet and mobile : launches a phone call

enquire.register("screen and (min-width:992px)", {

    match: function() {
        $("#phone_anchor").prop('href', '#');

        $("#phone_anchor").attr({
            "data-target": '#contactMe',
            "data-toggle": 'modal'
        });
    },

    unmatch: function() {
        $("#phone_anchor").prop('href', 'tel:+14384966886');

        $("#phone_anchor").removeAttr('data-target');
        $("#phone_anchor").removeAttr('data-toggle');

    }
});


///////////////////////////////////////////////////////////////////////
// Globals
///////////////////////////////////////////////////////////////////////

var nav = {
    sidebar_top: ['Accueil', '#top', '#services'],
    sidebar_services: ['Services', '#services', '#method'],
    sidebar_method: ['À propos', '#method', '#apropos'],
    sidebar_apropos: ['Équipe', '#apropos', '#footer'],
    sidebar_footer: ['Contact', '#footer', '#footer']
};

var nav_active = '#sidebar_top';


//////////////////////////////////////////////////////////////////////
// Waypoints handlers
//////////////////////////////////////////////////////////////////////

var waypointTriggers = ['#services', '#method', '#apropos', '#footer'];


function setNavActive(waypointid, i, textFlag) {
    var selected;
    $.each(nav, function(key, value) {
        if (waypointid === value[i]) {
            selected = key;
            return false;
        }
    });

    $(nav_active).removeClass('nav-active');
    nav_active = '#' + selected;
    $(nav_active).addClass('nav-active');
    if (textFlag === true) {
        $('#sidebar h6').text(nav[selected][0]);
    }
};

function navCommonHandler(id, direction, textFlag) {
    if (direction === "down") {
        setNavActive(id, 1, textFlag);
    } else
        setNavActive(id, 2, textFlag);
}

function navNoTextHandler(direction) {
    var waypointid = '#' + this.id;
    navCommonHandler(waypointid, direction, false);
}

function navWithTextHandler(direction) {
    var waypointid = '#' + this.id;
    navCommonHandler(waypointid, direction, true);
}

function showSideBar(direction) {
    if (direction === "down") {
        $('#sidebar').removeClass('hidebar');
    } else
        $('#sidebar').addClass('hidebar');
}

$(waypointTriggers.join()).waypoint(navWithTextHandler);

$(waypointTriggers[0]).waypoint(showSideBar);


///////////////////////////////////////////////////////////////////////////
// Scroll Tos registering
///////////////////////////////////////////////////////////////////////////

var nav_anchors = ['#sidebar_services', '#sidebar_method',
    '#sidebar_apropos', '#sidebar_footer', '#sidebar_top'
];

var hero_anchors = [
    '#services_hero_anchor', '#method_hero_anchor',
    '#apropos_hero_anchor', '#footer_hero_anchor'
];

var footer_anchors = [
    '#hero_footer_anchor', '#services_footer_anchor',
    '#apropos_footer_anchor', '#method_footer_anchor',
    '#top_footer_anchor', '#quirk_anchor'
];



$(nav_anchors.join()).scrollTo({
    speed: 2000,
    offset: -20,
    easing: 'easeInCubic',
    callback: function() {
        $(waypointTriggers.join()).waypoint('destroy');
        $(waypointTriggers.join()).waypoint(navWithTextHandler);
        $(waypointTriggers[0]).waypoint(showSideBar);
    }
});

$(hero_anchors.join()).scrollTo({
    speed: 2000,
    offset: -20,
    easing: 'easeInCubic'
});

$(footer_anchors.join()).scrollTo({
    speed: 1000,
    offset: -10,
    easing: 'easeOutCubic'
});



/////////////////////////////////////////////////////////////////////////////
// Mouser event registering
/////////////////////////////////////////////////////////////////////////////

function clickHandlers() {




    $('#sidebar a').on('click', function(event) {
        var id = event.target.id;
        $(waypointTriggers.join()).waypoint('destroy');

        $('#sidebar h6').animate({
            opacity: 0,
            left: '50%'
        }, 500, function() {
            $(waypointTriggers[0]).waypoint(showSideBar);
            $(waypointTriggers.join()).waypoint(navNoTextHandler);
            $('#sidebar h6').text(nav[id][0]);
        });

        $('#sidebar h6').animate({
            opacity: 1,
            left: '0px'
        }, 500);
    })

    $('.service-click').on('click', function() {
        $('html,body').animate({
            scrollTop: $(this).offset().top - 10
        }, 800);
    });

    $('#video-page button').on('click', function() {
        $('#top').removeClass("hide");
        $('#top').animate({
            opacity: 1
        }, 1000, 'swing');
        hideVideo();

        $('body').animate({
            'background-color': '#fff'
        }, 1000, 'swing', function() {
            $('#top').css('opacity', '');
            $('#top').removeAttr('style');
            $('body > div:not(#video-page)').removeClass("hide");
            var url = $('#video-iframe').attr('src');
            $('#video-iframe').attr('src', '');
        });
    });

    $('#video-anchor').on('click', function(event) {
        event.preventDefault();
        $('#top').animate({

            opacity: 0
        }, 1000, 'swing');

        $('body').animate({
            'background-color': '#000'
        }, 1000, 'swing', function() {
            $('body > div:not(#video-page)').addClass("hide");
            showVideo();
        });
    });
}

function mouseOverHandlers() {

    $('#video-bar a, #services_top a').on('mouseover', function() {
        modifyBgColor(this, '#8D0700', '0%', '#8D0700', '100%');
    });


    $('#video-bar a, #services_top a').on('mouseout', function() {
        modifyBgColor(this, '#8D0700', '0%', '#C03A2B', '47%');
    });
}

// technically not necessary since scripts are at bottom of page 
$(document).ready(function() {
    clickHandlers();
    mouseOverHandlers();
});


// accordeon collapse handler 
$(document).on("hide.bs.collapse", function(event) {
    $("#quirk_anchor").click();
});



//////////////////////////////////////////////////////////////////////
// Window resize events
//////////////////////////////////////////////////////////////////////

$(window).resize(function() {});

//////////////////////////////////////////////////////////////////////
// Bootstrap Jquery overrides
//////////////////////////////////////////////////////////////////////

$('.carousel').carousel({interval:false});
