/*! Copyright 2014 CINC (www.infocinc.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
*/


//////////////////////////////////////////////////////////////////////
// Globals
//////////////////////////////////////////////////////////////////////
var navMiniMode = false;

//////////////////////////////////////////////////////////////////////
// Waypoints handlers
//////////////////////////////////////////////////////////////////////

function sizeIcons(format) {
    var imgs = $('#social-icons img');
    var tkn;
    var modifier;

    if (format === 'mini') {
        tkn = '.';
        modifier = 'mini';
    } else {
        tkn = 'mini';
        modifier = '';
    }

    $.each(imgs, function(k, v) {
        src = $('#' + v.id).attr('src').split(tkn);
        src = src[0] + modifier + '.png';
        $('#' + v.id).attr('src', src);
    });
}

function navBarResizeHandler(direction) {
    var src;
    var fixedFlag = 'fixed' === $('#navbar').css('position');
    if (!fixedFlag)
        return;

    if (direction === "down") {
        $('#navbar').addClass('navbar-mini');
        navMiniMode = true;
        $('#main-title h2:last-child').css('display', 'none');
        $('#navbar .container').css('border', 'none');
        sizeIcons('mini');
    } else {
        $('#navbar').removeClass('navbar-mini');
        navMiniMode = false;
        $('#main-title h2:last-child').css('display', 'block');
        sizeIcons('full');
        $('#navbar .container').css({
            'border-top': '1px solid #ddd',
            'border-bottom': '1px solid #ddd'
        });
    }
}


+function initNavWaypoints() {
  "use strict";

    $('#services-banner').waypoint(navBarResizeHandler, {
        offset: '50%'
    });

    $('#services-banner').waypoint(function(direction) {
        if (direction === "down") {
            $('#fixed-icons').children().removeClass('invisible');
        } else {
            $('#fixed-icons').children().addClass('invisible');
        }
    });
}();
