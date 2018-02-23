/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

//Form Input Lables & Default values
$('#text-label1').text('Add Data URL');
$('#text-label2').text('Latitude Key Label');
$('#text-label3').text('Longitude Key Label');
$('#color-label').text('Marker Color');

$('#text-input1').val();
$('#text-input2').val();
$('#text-input3').val();
$('#color-input').val('#C0C0C0');

$('#text-input1').prop('disabled',false);
$('#text-input2').prop('disabled',false);
$('#text-input3').prop('disabled',false);

// Use the data source URL from lab 1 in this 'ajax' function:
var downloadData = $.ajax('https://raw.githubusercontent.com/CPLN-692-401/datasets/master/json/world-country-capitals.json');

// Write a function to prepare your data (clean it up, organize it as you like, create fields, etc)
var parseData = function(parseResult){ return JSON.parse(parseResult) };
// Write a function to use your parsed data to create a bunch of marker objects (don't plot them!)
var makeMarkers = function(parseObject, ycoord, xcoord) {
  return _.map(parseObject, function(parseObject)
    {return L.circleMarker([parseObject[ycoord],parseObject[xcoord]],{fillColor: $('#color-input').val()})})
};

// Now we need a function that takes this collection of markers and puts them on the map
var plotMarkers = function(list) {
  _.each(list, function (marker){marker.addTo(map)})
};

// Look to the bottom of this file and try to reason about what this function should look like
var removeMarkers = function(list) {_.each(list, function (marker){map.removeLayer(marker)})
};


/* =====================
 Leaflet setup - feel free to ignore this
===================== */

var map = L.map('map', {
  center: [39.9483069, -75.1953933],
  zoom: 7
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

$( "button").click(function() {
//values used
//https://raw.githubusercontent.com/CPLN-692-401/datasets/master/json/world-country-capitals.json
//CapitalLatitude
//CapitalLongitude
$(document).ready(function() {
    downloadData.done(function(data) {
      var parsed = parseData(data);
      var yKey = $('#text-input2').val();
      var xKey = $('#text-input3').val();
      var markers = makeMarkers(parsed, yKey, xKey);
      plotMarkers(markers);
  //  removeMarkers(markers);
    });
  });
});
