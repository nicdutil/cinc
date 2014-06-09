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
            "data-target": '#telCinc',
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
    "sidebar-top": ['#margin-top', '#margin-top'],
    "sidebar-services": ['#services-banner', '#screen-services'],
    "sidebar-method": ['#method-banner', '#screen-method'],
    "sidebar-team": ['#team-banner', '#screen-team'],
    "sidebar-project": ['#project-banner', '#screen-project'],
    "sidebar-footer": ['#social-ads', '#social-ads']
};

var nav_active = '#sidebar-top';
// accordeon collapse handler 
var buttonSelected = new Array();


//////////////////////////////////////////////////////////////////////
// Service Carousel
//////////////////////////////////////////////////////////////////////

function secToMillis(s) {
    return s * 1000
};

function minToMillis(m) {
    return m * secToMillis(60)
};

var carousels = new Array();
var CAROUSEL_WAIT = minToMillis(1);
var CAROUSEL_TIMEOUT = secToMillis(10);

var Carousel = function Carousel() {
    this.active = true;
    this.currIndex = 0;
    this.prevIndex = -1;
    this.items;
    this.timeout;
    this.timerId;
    this.id;
};

Carousel.prototype.pause = function() {
    var that = this;
    this.stop();
    this.timerId = setTimeout(function() {
        that.start();
    }, CAROUSEL_WAIT);
}

Carousel.prototype.stop = function() {
    this.active = false;
    var currButton = this.items.eq(this.prevIndex);
    $(currButton).removeClass('selected-button');
    clearTimeout(this.timerId);
}

Carousel.prototype.start = function() {
    var id = this.id;
    var currIndex = 0;
    this.active = true;
  
    $.each(this.items, function(key, value) {
        if (value === buttonSelected[id]) {
            currIndex = key+1;
            return false;
        }
    });
    this.prevIndex = currIndex - 1;
    if (currIndex == this.items.length) {
        currIndex = 0;
    }
    this.currIndex = currIndex;
       
    $(buttonSelected[this.id]).removeClass('selected-button');

    nextItem(this.id);
}


function initCarousel(id, timeout) {
    var c = new Carousel();
    timeout = typeof timeout !== 'undefined' ? timeout : CAROUSEL_TIMEOUT;
    c.timeout = timeout;
    c.items = $('#' + id + ' ' + 'button');
    c.id = id;
    carousels[id] = c;
    c.timerId = setTimeout(function() {
        nextItem(id)
    }, 200);
}


function nextItem(id) {
    var c = carousels[id];
    var currButton;

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

    c.timerId = setTimeout(function() {
        nextItem(id)
    }, c.timeout);
}

////////////////////////////////////////////////////////////////////////
// Bar Graph
////////////////////////////////////////////////////////////////////////

var graph, refreshIntervalId;


function initBarGraph(canvasId) {
    var w, h;
    var canvas = document.getElementById(canvasId);
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    var selector = '#' + canvasId;

    if (canvasId === 'screen-canvas') {
        w = 0.4 * $('#screen-services').width();
        h = 0.5 * $('#screen-services').height();
    } else {
        w = $(selector).css('width');
        h = $(selector).css('height');
    }

    $(selector).attr({
        width: w,
        height: h

    });

    barGraphCtx = canvas.getContext("2d");
}


function createBarGraph() {
    graph = new BarGraph(barGraphCtx);
    graph.margin = 5;

    graph.width = barGraphCtx.canvas.width;
    graph.height = barGraphCtx.canvas.height;

    graph.xAxisLabelArr = ["A", "B", "C", "D", "E", "F"];
    graph.update([Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10]);

    refreshIntervalId = setInterval(function() {
        graph.update([Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10]);
    }, 4000);
}

$(function() {
    $('#screen-canvas-wrapper').fadeOut(function() {
        // FIXME: fails for browser resizing.. 
        if ($('#excel-photo').css('display') === 'none') {
            initBarGraph('screen-canvas');
        } else {
            initBarGraph('excel-canvas');
        }
        createBarGraph();

        $(screenTriggers.join()).waypoint(navNoTextHandler, {
            offset: '-10%'
        });

        $(bannerTriggers.join()).waypoint(navNoTextHandler, {
            offset: '30%'
        });


        $('#services,#screen-method').waypoint(carouselHandler, {
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

    });

});

/////////////////////////////////////////////////////////////////////////////
// Screen Panel Display 
/////////////////////////////////////////////////////////////////////////////

function prefix(id) {
    return id.split('-')[0].trim()
};

function fadeHtml(obj, direction, complete) {
    if (direction === 'in') {
        $(obj['selector']).fadeIn('linear');
    } else {
        $(obj.selector).fadeOut('linear', function() {
            complete(obj);
        });
    }
}

function parse(sectionId, buttonId, suffix) {
    var pre = prefix(buttonId);
    var o = {};

    o['id'] = '#' + pre + '-' + suffix;
    o['html'] = $(o['id']).html().trim();
    o['selector'] = '#' + sectionId + '-' + suffix;

    if (prefix(sectionId) === sectionId) {
        o['selector'] = '#screen-' + sectionId + '-' + suffix;
    }
    return o;
}


function showPanel(sectionId, buttonId) {


    var o = parse(sectionId, buttonId, 'text');
    var p = parse(sectionId, buttonId, 'photo');
    var buttonPrefix = prefix(buttonId);

    var mycallback = function(ob) {
        $(ob['selector']).html(ob['html']);
    }

    var photoCallBack = function(ob) {
        if (buttonPrefix === 'excel') {
            $(ob['selector']).html(ob['html']);
            $('#screen-canvas-wrapper').fadeIn();
        } else {
            $(ob['selector']).html(ob['html']);
        }
    }

    fadeHtml(o, 'out', mycallback);
    canvasHide = 'none' !== $('#screen-canvas-wrapper').css('display');

    if (canvasHide) {
        $('#screen-canvas-wrapper').fadeOut(function() {
            fadeHtml(p, 'out', mycallback);
            fadeHtml(p, 'in');
        });
    } else {
        fadeHtml(p, 'out', photoCallBack);
        if (buttonPrefix !== 'excel') {
            fadeHtml(p, 'in');
        }
    }

    fadeHtml(o, 'in');
}

//////////////////////////////////////////////////////////////////////
// Waypoints handlers
//////////////////////////////////////////////////////////////////////

var bannerTriggers = [
    '#margin-top', '#services-banner',
    '#method-banner', '#project-banner',
    '#team-banner', '#social-ads'
];

var screenTriggers = [
    '#margin-top', '#screen-services',
    '#screen-method', '#screen-project',
    '#screen-team'
];



function navCommonHandler(id) {
    var selected;
    $.each(nav, function(key, value) {
        if (id === value[0] || id === value[1]) {
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
    var panelDisplay = $('#' + waypoint + ' .content-block').css('display');

    if (panelDisplay == 'none' && direction == "down" && carousels[waypoint] === undefined) {
        initCarousel(waypoint);
    }
}


function navBarResizeHandler(direction) {
    var fixedFlag = 'fixed' === $('#navbar').css('position');
    if (!fixedFlag)
        return;

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
    '#sidebar-team', '#sidebar-project', '#sidebar-footer', '#sidebar-top'
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
    offset: -20,
    easing: 'easeInCubic'
});

$(main_nav_slide_anchors.join()).scrollTo({
    speed: 2000,
    offset: 0,
    easing: 'easeInCubic'
});

$(main_nav_anchors.join()).scrollTo({
    speed: 2000,
    offset: -20,
    easing: 'easeInCubic'
});

$(hero_anchors.join()).scrollTo({
    speed: 2000,
    offset: -20,
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

function selectButton(sectionId, buttonId) {
    var c = carousels[sectionId];
    var b = buttonSelected[sectionId];

    if (c !== undefined) {
        c.pause();
    }

    if (b !== undefined) {
        $(b).removeClass('selected-button');
    }

    buttonSelected[sectionId] = buttonId;
    $(buttonId).addClass('selected-button');
}

enquire.register("screen and (min-width:768px)", {

    unmatch: function() {
        // add no pointer to buttons. 

        $('#services button').removeClass('selected-button');
        $('#screen-method button').removeClass('selected-button');
        $.each(carousels, function(key, value) {
            value.stop()
        });

        $('#screen-method button').unbind('click');
        $('#services button').unbind('click');
        $('#team button').unbind('click');
        $('.services-click,.method-click,.team-click').unbind('click');
    },

    match: function() {
        $('#screen-method button').on('click', function() {
            selectButton('screen-method', this);
        });

        $('#services button').on('click', function() {
            selectButton('services', this);
        });

        $('#team button').on('click', function() {
            selectButton('team', this);
        });

        $('.services-click,.method-click,.team-click').on('click', function(event) {
            var targetId = event.target.id;
            var sectionId = $(this).closest('.container-fluid').prop('id');
            //    changeBgColor(sectionId,targetId);
            showPanel(sectionId, targetId);
        });
    }
});


function clickHandlers() {

    function hashTag(id) {
        return '#' + id;
    }

    // FIXME: change function name

    function prefix(prefix, id) {
        return prefix + '-' + id;
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
// Bubbles 
////////////////////////////////////////////////////////////////////////


/***********************************************************************
 * bubbles.js
 * Written by Tara Mathers, 2010
 * ---------------------------------------------------------------------
 * Draws randomly generated bubbles floating up the screen to an HTML5
 * canvas. Clicking on the bubbles pops them.
 * Only runs on browsers which support the canvas element.
 * *********************************************************************/

/********************************
 * Bubble()
 * Creates a new bubble object
 ********************************/

function Bubble() {
    this.x = Math.floor(Math.random() * CANVAS_WIDTH);
    this.y = Math.floor(Math.random() * (CANVAS_HEIGHT));
    this.radius = 5 + Math.floor(Math.random() * 5);

    this.direction;
    if (Math.random() * 2 >= 1)
        this.direction = 0;
    else this.direction = 1;

    //this.amplitude = Math.round(this.radius / 9 * 5 + 2 * Math.random());
    this.velocity = (5 / (this.radius + 0.1));
    this.amplitude = 20 + Math.round(this.velocity * 20);

}


/******************************************
 * initialize()
 * Initial function called on page load
 *****************************************/
$(window).load(function() {
    var hideBubblesFlag = 'none' === $('#bubbles-wrapper').css('display');

    if (!hideBubblesFlag) {
        bubbleInit();
    }
})

function bubbleInit() {
    // Global variables: 

    REFRESH_RATE = 40;
    t = 1; // current time step
    MAX_BUBBLES = 90;
    // Array storing all bubble objects 

    background = new Image();
    if ($('#observe-text').css('display') === 'none') {
        background.src = "../img/rain_90dpi.png";
    } else {
        background.src = "../img/rainlong_90dpi.png";
    }

    // Create canvas and context objects
    canvas = document.getElementById('bubbles');

    var selector = '#bubbles';

    var w = $('#screen-method').css('width');
    var h = $('#screen-method').css('height');

    $(selector).attr({
        width: w,
        height: h
    });

    CANVAS_WIDTH = parseInt(w, 10);
    CANVAS_HEIGHT = parseInt(h, 10);
    context = canvas.getContext('2d');
    context.drawImage(background, 0, 0);

    // Call the draw() function at the specified refresh interval
    bubbles = new Array(MAX_BUBBLES);

    for (var i = 0; i < MAX_BUBBLES; i++) {
        bubbles[i] = new Bubble();
    }

    setInterval(draw, REFRESH_RATE);

}


function drawEllipse(centerX, centerY, width, height) {

    context.beginPath();

    context.moveTo(centerX, centerY - height / 2); // A1

    context.bezierCurveTo(
        centerX + width / 2, centerY - height / 2, // C1
        centerX + width / 2, centerY + height / 2, // C2
        centerX, centerY + height / 2); // A2

    context.bezierCurveTo(
        centerX - width / 2, centerY + height / 2, // C3
        centerX - width / 2, centerY - height / 2, // C4
        centerX, centerY - height / 2); // A1
}

/******************************************************
 * draw()
 * draws each bubble at every frame
 ******************************************************/


window.addEventListener('resize', resize, false);

function resize() {
    //    alert($('#method').width());

    // resize bubble canvas
    var w = $('#bubbles-wrapper').width();
    var h = $('#bubbles-wrapper').height();
    CANVAS_WIDTH = parseInt(w, 10);
    CANVAS_HEIGHT = parseInt(h, 10);
    context.canvas.width = CANVAS_WIDTH;
    context.canvas.height = CANVAS_HEIGHT;

    // resize bargraphcanvas 
    w = 0.4 * $('#screen-services').width();
    h = 0.5 * $('#screen-services').height();
    barGraphCtx.canvas.width = w;
    barGraphCtx.canvas.height = h;
    graph.width = barGraphCtx.canvas.width;
    graph.height = barGraphCtx.canvas.height;

    if ($('#observe-text').css('display') === 'none') {
        background.src = "../img/rain_90dpi.png";
    } else {
        background.src = "../img/rainlong_90dpi.png";
    }
}

function draw() {

    // refresh canvas size


    // Update the position of each bubble
    for (var i = 0; i < bubbles.length; i++) {

        // Create a new bubble if one has gone off the screen
        if (bubbles[i].y - bubbles[i].radius > CANVAS_HEIGHT) {
            bubbles[i].x = Math.floor(Math.random() * CANVAS_WIDTH);
            bubbles[i].y = -Math.floor(Math.random() * CANVAS_HEIGHT * 0.1);
            bubbles[i].radius = 5 + Math.floor(Math.random() * 5);
            bubbles[i].velocity = (5 / (bubbles[i].radius + 0.1));
            bubbles[i].amplitude = Math.round(bubbles[i].velocity * 10);
        }


        if (t % bubbles[i].amplitude == 0) {

            if (bubbles[i].direction == 0)
                bubbles[i].direction = 1;
            else
                bubbles[i].direction = 0;
        }

        if (bubbles[i].direction == 0)
            bubbles[i].x -= 0.01;

        else
            bubbles[i].x += 0.01;

        bubbles[i].y += bubbles[i].velocity;

    }

    // Clear the previous canvas state
    context.drawImage(background, 0, 0);

    // Draw bubbles
    for (var i = 0; i < bubbles.length; i++) {

        context.lineWidth = 1;

        gradObj = context.createRadialGradient(bubbles[i].x,
            bubbles[i].y + bubbles[i].radius / 2.5, bubbles[i].radius / 1.8,
            bubbles[i].x, bubbles[i].y,
            bubbles[i].radius);

        gradObj.addColorStop(0, "rgba(255, 255, 255, .7)");
        gradObj.addColorStop(1, "rgba(220, 225, 223, .7)");


        context.fillStyle = gradObj;

        context.beginPath();
        //        drawEllipse(bubbles[i].x,bubbles[i].y,bubbles[i].width,bubbles[i].width);

        context.arc(bubbles[i].x, bubbles[i].y, bubbles[i].radius, 0, Math.PI * 2, true);

        context.fill();
        context.strokeStyle = "rgba(200,205,203,.2)";
        context.stroke();

    }

    t++;

}
