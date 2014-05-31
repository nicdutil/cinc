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
        $('#video-bar div').css('background-color', color2);
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

function initGoogleMap(mapId) {
    var myLatlng = new google.maps.LatLng(45.7145890, -73.6796590);

    var map_canvas = document.getElementById(mapId);

    var map_options = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(map_canvas, map_options);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'CINC - Bureau',
        animation: google.maps.Animation.DROP,
        draggable: false
    });


    google.maps.event.addListener(marker, 'click', toggleBounce);
    //    google.maps.event.trigger(map, 'resize');
}

//initGoogleMap('map_canvas');

function toggleBounce() {

    if (marker.getAnimation() != null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

$('#contactMe').on('shown.bs.modal', function(event) {
    initGoogleMap('map_canvas_2');
});

//initGoogleMap('map_canvas');

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
    "sidebar-top": '#margin-top',
    "sidebar-services": '#services',
    "sidebar-method": '#method',
    "sidebar-team": '#team',
    "sidebar-footer": '#page-footer'
};

var nav_active = '#sidebar-top';
// accordeon collapse handler 
var buttonSelected = new Array();


//////////////////////////////////////////////////////////////////////
// Service Carousel
//////////////////////////////////////////////////////////////////////

var Carousel = function Carousel() {
    this.active = true;
    this.currIndex = 0;
    this.prevIndex = -1;
    this.items;
    this.timeout;
    this.id;
};

Carousel.prototype.disable = function() {
    this.active = false;
    var currButton = this.items.eq(this.prevIndex);
    $(currButton).removeClass('selected-button');
}
Carousel.prototype.enable = function() {
    this.active = true;
    this.currIndex = 0;
    this.prevIndex = -1;
    $(buttonSelected[this.id]).removeClass('selected-button');
}

var carousels = new Array();

function initCarousel(id, timeout) {

    var c = new Carousel();
    timeout = typeof timeout !== 'undefined' ? timeout : 10000;
    c.timeout = timeout;
    c.items = $('#' + id + ' ' + 'button');
    c.id = id;
    carousels[id] = c;

    setTimeout(function() {
        nextItem(id)
    }, 200);
}


function nextItem(id) {
    var c = carousels[id];
    var currButton;

    if (carousels[id].active == false) {
        setTimeout(function() {
            carousels[id].enable();
            nextItem(id);
        }, 10 * c.timeout);
        return
    }

    if (c.prevIndex > -1) {
        currButton = c.items.eq(c.prevIndex);
        $(currButton).removeClass('selected-button');
    }

    currButton = c.items.eq(c.currIndex);
    $(currButton).addClass('selected-button');

    showPanel(id, currButton.prop('id'));

    c.prevIndex = c.currIndex;
    c.currIndex++;

    if (c.currIndex == c.items.length) {
        c.currIndex = 0;
    }

    setTimeout(function() {
        nextItem(id)
    }, c.timeout);
}

/////////////////////////////////////////////////////////////////////////////
// Screen Panel Display 
/////////////////////////////////////////////////////////////////////////////

/*function hidePanel(id, complete) {
    var panelBodyId = id.split('-')[0] + '-body';
    var screenPanelBodyId = 'screen-' + panelBodyId;
    var screenSelector = '#' + screenPanelBodyId;
    //    alert(screenSelector);
    $(screenSelector).fadeOut(2000, function() {
        $(screenSelector).addClass('desktop-hide');
        //complete();
    });
}
*/

function showPanel(sectionId, buttonId) {
    var prefix = buttonId.split('-')[0];
    var panelBodyId = prefix + '-body';
    var photoDivId = prefix + '-photo-div';

    var panelBodyHtml = $('#' + panelBodyId).wrap('<div/>').parent().html();
    var photoDivHtml = $('#' + photoDivId).html();

    var screenPanelBodyId = 'screen-' + panelBodyId;
    var screenTextSelector = '#screen-' + sectionId + '-text';
    var screenPhotoSelector = '#screen-' + sectionId + '-photo';

    panelBodyHtml = panelBodyHtml.replace(panelBodyId, screenPanelBodyId);
    panelBodyHtml = panelBodyHtml.replace('desktop-hide', '');
    photoDivHtml = photoDivHtml.replace('desktop-hide', '');

    $(screenTextSelector).fadeOut(function() {
        $(screenTextSelector).html(panelBodyHtml);
    });

    $(screenPhotoSelector).fadeOut(function() {
        $(screenPhotoSelector).html(photoDivHtml);
    });
    $(screenPhotoSelector).fadeIn();


    $(screenTextSelector).fadeIn();
}

//////////////////////////////////////////////////////////////////////
// Waypoints handlers
//////////////////////////////////////////////////////////////////////

var waypointTriggers = ['#margin-top', '#services', '#method', '#team', '#page-footer'];



function navCommonHandler(id) {
    var selected;
    $.each(nav, function(key, value) {
        if (id === value) {
            selected = key;
            return false;
        }
    });

    $(nav_active).removeClass('nav-active');
    nav_active = '#' + selected;
    $(nav_active).addClass('nav-active');
}

function navNoTextHandler(direction) {
    var waypointid = '#' + this.id;
    navCommonHandler(waypointid);
}


function carouselHandler(direction) {
    var waypoint = this.id;
    var timeout = 10000;
    //    var timeout = (waypoint === '#team') ? 200 : 10000;

    var panelDisplay = $('#' + waypoint + ' .row  > div:first-child .panel-body').css('display');

    if (panelDisplay == 'none' && direction == "down" && carousels[waypoint] === undefined) {
        initCarousel(waypoint, timeout);
    }
}


function navBarResizeHandler(direction) {
    if (direction === "down") {
        $('#navbar').addClass('navbar-mini');
        $('#main-title h2').css('display', 'none');
        $('#navbar .container').css('border', 'none');
    } else {
        $('#navbar').removeClass('navbar-mini');
        $('#main-title h2').css('display', 'block');
        $('#navbar .container').css({
            'border-top': '1px solid #ddd',
            'border-bottom': '1px solid #ddd'
        });
    }
}

$(waypointTriggers.join()).waypoint(navNoTextHandler, {
    offset: '-5%'
});
$(waypointTriggers.join()).waypoint(navNoTextHandler, {
    offset: '50%'
});

//$(waypointTriggers[0]).waypoint(showSideBar);

$('#services,#method').waypoint(carouselHandler, {
    offset: '50%'
});


$('#team').waypoint(function(direction) {
    var length = $('#screen-team-photo').html().trim().length;

    if (direction === "down" && length === 0) {
        showPanel('team', 'nic-button');
    }
}, {
    offset: '50%'
});

$('#services-banner').waypoint(navBarResizeHandler, {
    offset: '50%'
});



////////////////////////////////////////////////////////////////////////////
// img fader
////////////////////////////////////////////////////////////////////////////

var rollodex_curr = 1;
var rollodex_length;

$(document).ready(function() {
    rollodex_length = $('.slider .slide').length;
    setTimeout(nextSlide, 5000);
});


function getSlideSelector(n) {
    var selector = '.slider  .slide:nth-child(' + n + ')';
    return selector;
}

function hideSlide(n) {
    var selector = getSlideSelector(n);

    if ((n + 1) > rollodex_length) {
        rollodex_curr = n = 0;
    }

    showSlide(n + 1);
    setTimeout(function() {
        $(selector).animate({
            'opacity': '0'
        }, 1000, function() {
            $(selector).addClass('hide');
        });
    }, 20);
}

function showSlide(n) {

    var selector = getSlideSelector(n);
    $(selector).css('opacity', '0');
    $(selector).removeClass('hide');
    $(selector).animate({
        'opacity': '1'
    }, 1000);
    //    $(selector).fadeIn();
}

function nextSlide() {
    hideSlide(rollodex_curr);
    rollodex_curr = rollodex_curr + 1;
    setTimeout(nextSlide, 5000);
}


///////////////////////////////////////////////////////////////////////////
// Scroll Tos registering
///////////////////////////////////////////////////////////////////////////

var nav_anchors = ['#sidebar-services', '#sidebar-method',
    '#sidebar-team', '#sidebar-footer', '#sidebar-top'
];

var hero_anchors = [
    '#services-hero-anchor', '#method-hero-anchor',
    '#team-hero-anchor', '#footer-hero-anchor'
];

var footer_anchors = [
    '#hero-footer-anchor', '#services-footer-anchor',
    '#team-footer-anchor', '#method-footer-anchor',
    '#top-footer-anchor', '#quirk-anchor'
];

var main_nav_anchors = ['#service-nav-anchor', '#method-nav-anchor', '#team-nav-anchor'];
var main_nav_slide_anchors = ['#service-nav-slide-anchor', '#method-nav-slide-anchor', '#team-nav-slide-anchor'];


$(nav_anchors.join()).scrollTo({
    speed: 2000,
    offset: 0,
    easing: 'easeInCubic'
});

$(main_nav_slide_anchors.join()).scrollTo({
    speed: 2000,
    offset: 0,
    easing: 'easeInCubic'
});

$(main_nav_anchors.join()).scrollTo({
    speed: 2000,
    offset: 0,
    easing: 'easeInCubic'
});

$(hero_anchors.join()).scrollTo({
    speed: 2000,
    offset: 0,
    easing: 'easeInCubic'
});

$(footer_anchors.join()).scrollTo({
    speed: 1000,
    offset: 0,
    easing: 'easeOutCubic'
});



/////////////////////////////////////////////////////////////////////////////
// Mouser event registering
/////////////////////////////////////////////////////////////////////////////

function clickHandlers() {

    function selectButton(sectionId, eventId) {
        var c = carousels[sectionId];
        var b = buttonSelected[sectionId];

        if (c !== undefined) {
            c.disable();
        }

        if (b !== undefined) {
            $(b).removeClass('selected-button');
        }

        buttonSelected[sectionId] = eventId;
        $(eventId).addClass('selected-button');
    }


    $('#sidebar a').on('click', function(event) {
        var id = event.target.id;
        $('#sidebar h6').animate({
            opacity: 0,
            left: '50%'
        }, 500);

        $('#sidebar h6').animate({
            opacity: 1,
            left: '0px'
        }, 500);
    });


    $('#method button').on('click', function() {
        selectButton('method', this);
    });

    $('#services button').on('click', function() {
        selectButton('services', this);
    });
    $('#team button').on('click', function() {
        selectButton('team', this);
    })

    function hashTag(id) {
        return '#' + id;
    }

    function prefix(prefix, id) {
        return prefix + '-' + id;
    }

    var bgColorMap = {
        'website-button': '#354774',
        'scrape-button': '#f39c12',
        'excel-button': '#65c6bb'
    }

        function changeBgColor(sectionId, targetId) {
            var buttonId = $(hashTag(targetId)).closest('button').prop('id');
            var bg = bgColorMap[buttonId];
            var screenSelector = hashTag(prefix('screen', sectionId));
            $(screenSelector).css('background-color', bg);

            /*      screenId = '#screen-' + sectionId;
      $(screenId).css('background-color',bgColorMap[buttonId]);
*/
        }

    $('.services-click').on('click', function(event) {
        var targetId = event.target.id;
        var sectionId = $(this).closest('.container').prop('id');
        //    changeBgColor(sectionId,targetId);
        showPanel(sectionId, targetId);
    });

    $('.method-click,.team-click').on('click', function(event) {
        var targetId = event.target.id;
        var sectionId = $(this).closest('.container-fluid').prop('id');
        //    changeBgColor(sectionId,targetId);
        showPanel(sectionId, targetId);
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

    $('#services_top a').on('mouseover', function() {
        modifyBgColor(this, '#aaa', '0%', '#aaa', '100%');
    });


    $('#services_top a').on('mouseout', function() {
        modifyBgColor(this, '#fff', '0%', '#fff', '47%');
    });
}

// technically not necessary since scripts are at bottom of page 
$(document).ready(function() {
    clickHandlers();
    mouseOverHandlers();

});




////////////////////////////////////////////////////////////////////////
// Collapse Event Handlers 
///////////////////////////////////////////////////////////////////////


/*$(document).on("hide.bs.collapse", function(event) {
    $("#quirk_anchor").click();
});


$(document).on("show.bs.collapse", function(event) {
    var target = '#' + event.target.id;

    if (selected !== undefined) {
        alert('hi');
        $(selected).animate({
            opacity: 0
        }, function() {
            //            $(target).css('opacity', '0');
            $(target).addClass('in');
            //            $(target).animate({'opacity' : 1});
        });
        event.preventDefault();
    };
    selected = target;
});
*/
