/* 
 * main.js
 *
 * CS50 Final Project
 *
 * Main JavaScript
 *
 **/

// global variable
var MAP;



/* 
 * Image Gallery 
 **/
 
$(document).ready(function(){
    // add tool tips
    $( document ).tooltip({
        show: {
            effect: "fadeIn",
            delay: 1050
        },
        position: {
        my: "center bottom-10",
        at: "center top",
        using: function( position, feedback ) {
            $( this ).css( position );
            $( "<div>" )
                .addClass( feedback.vertical )
                .addClass( feedback.horizontal )
                .appendTo( this );
            }
        }  
    });
    // load gallery's html
    writeGallery();    
    // Sara Soueidan's gallery plug-in
    $('#gallery-container').sGallery({
        fullScreenEnabled: true //click changed to scroll down
    });
    
});



/*
 * Sticky Menu Transformation 
 **/
 
$(function(){

    
        // check current distance from top div
        var menuOffset = $('#gallery')[0].offsetTop;
        // bind transformation with scroll after doc is ready
        $(document).bind('ready scroll', function() {
            // get current position
            var docScroll = $(document).scrollTop();
            // do magic only for browsers
            if (document.documentElement.clientWidth > 1024)
              {
                if (docScroll >= menuOffset) {
                    $('#menu').addClass('fixed');
                    // side nav bar
                    if (!$('#menu img').length)
                    {
                        menu(0);   
                    }
                }  
                else {
                    $('#menu').removeClass('fixed');
                    // top nav bar
                    menu(1);
                    
                }
              }
            
        
        
        // provide a smooth scroll
        $('a[href*=#]:not([href=#])').click(function(event) {
            // for links within the page only
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
                || location.hostname == this.hostname) {
                
                var target = $(this.hash);
                //target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    // stop all future bound events
                    if ($('#menu img').length)
                    {
                        event.stopImmediatePropagation();
                    }
                }
            }
        });
        
    });    
});



/*
 * Binary Switch for Menu Transformation
 **/

function menu(option) {
    switch(option)
    {
    case 0:
        // side nav bar
        // about gallery address  
        var html = "";  
        for (var icon in ICONS)
        {
            html += "<a href='#" + icon + "' class='jui-" + icon + "' title='" + icon + "'>" +
                    "<img alt='" + icon + "' src='img/" + ICONS[icon] + "'>" +
                    "</a>";
        }
        // output html
        $('#menu').html(html);
        
        break;
        
    case 1:
        // top nav bar
        var html = "<a href='#gallery' class='scroll'>Selected Work</a>" +
                   "<span class='round'>•</span>" +
                   "<a href='' data-toggle='modal' data-target='#myModal'>Resume</a>" +
                   "<span class='round'>•</span>" +
                   "<a href='mailto:chiang.c@wustl.edu' target='_top'>Contact</a>";
        // output html
        $('#menu').html(html);
    }
}



/*
 * Create a World Map
 **/
 
function map() {

    // initialize map and set view to desired coordinates
    MAP = L.map('map').setView([38.6272, -90.1978], 11);

    L.tileLayer('http://api.tiles.mapbox.com/v3/chiangchendah.i6g41epm/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">MapBox</a>',
        maxZoom: 18,
        zoomControl: false
    }).addTo(MAP);
    
    // listen to pop-ups
    MAP.on('popupopen', function(e) {
        // pan to pop-up
        MAP.setView(e.popup._latlng, 16);
        MAP.invalidateSize();
    });
    
    // add projects
    mark(MAP); 
}



/*
 * Add Markers for All Projects
 **/
 
function mark(map) {
    var i = 0;
    for (var project in PROJECTS)
    {
        var lat = PROJECTS[project].lat;
        var lng = PROJECTS[project].lng;
        var marker = L.marker([lat, lng]).addTo(map);
        // bind popup message
        var message = "<b>" + project + "</b>";
        marker.bindPopup(message);
        // associate marker
        IMAGES[i].marker = marker;
        i++;
    }
}



/*
 * Image Gallery's HTML
 **/

function writeGallery() {
    
    // small img
    var html = "<ul id='items--small'>";
    for (var i = 0; i < IMAGES.length; i++)
    {
        html += "<li class='item'><a href='#'> <img src='img/" + IMAGES[i].small + "' alt=''></a></li>";
    }    
    html += "</ul>";
    
    // big img + caption
    html += "<ul id='items--big'>";
    for (var i = 0; i < IMAGES.length; i++)
    {
        html += "<li class='item--big'><a href='#' onclick='return false'><figure><img src='img/" +
                                                             IMAGES[i].big +
                                      "'><figcaption class='img-caption'>" +
                                                         IMAGES[i].caption +
                                          "</figcaption></figure></a></li>";
    }
    html += "</ul>";
    
    // control panel
    html += "<div class='controls'>" +
                   "<span class='control icon-arrow-left' data-direction='previous' title='previous'></span>" +
                   "<span class='control icon-arrow-right' data-direction='next' title='next'></span>" +
                   "<span class='grid icon-grid' title='all'></span>" +
                   "<span class='fs-toggle icon-fullscreen' title='details'></span>" +
            "</div>";
    
    // output html
    $('#gallery-container').html(html);
}



/*
 * Function to Remove Slides and Map 
 **/
function deleteDetails() {
    if ($('#slides').length) {
        $('#slideshow').html("");
        MAP.remove();
        $('#map').html("");
        $('#map').css("box-shadow", "");
        $('#footer').html("");
    }
}



/*
 * Function to Scroll to Specific Element with Time
 **/
function scrollToHere(location, time) {
    $('html, body').animate({
        scrollTop: $(location).offset().top
    }, time);
}
