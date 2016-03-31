var $update = $('#update');

$('#search').keyup(function() { //binding using keyup event

  var searchField = $('#search').val(); //getting what user is typing
  //console.log(searchField);

  var myExp = new RegExp(searchField, "i"); //this is our search expression
  //i = case-insensitive search
  //it has to be wrapped around our list items in an if statement


  $.getJSON('json/bios.json', function(data) { //get JSON
    // console.log(data); //our test

    var output = '<ul class="searchresults">';
    $.each(data, function(key, value) {

      if((value.name.search(myExp) != -1) || //wrapping our search around our list items; != -1 means it found that text
         (value.bio.search(myExp) != -1)) { 
        output += '<li>';
        output += '<h2>' + value.name + '</h2>';
        output += '<img src="' + value.pic_url + '" alt="' +
          value.shortname + '">';
        output += '<p>' + value.bio + '</p>';
        output += '</li>';
      }

    });

    output += '</ul>';
    $update.html(output);
  });

});
















// console.log("Reading app.js");
// var $body = $("body");
//
//
// $body.append("<p>jQuery loaded</p>");
// //$body.load("json/test.txt");
//
// // $.getJSON( "json/test.json", function( data ) {
// //   console.log(data);
// //   var items = [];
// //   $.each( data, function( key, val ) {
// //     items.push( "<li id='" + key + "'>" + val + "</li>" );
// //   });
// //
// //   $( "<ul/>", {
// //     "class": "my-new-list",
// //     html: items.join( "" )
// //   }).appendTo( "body" );
// // });
//
//
//
//
//
// $.getJSON("json/bios.json", function(data) {  //"data" is the data that gets passed when we load the json file
//   console.log("loading json file");
//   var output = "<ul>";
//
//   $.each(data, function name(key, val) {
//     output += "<li>" + val.name + "</li>";
//   });
//   output += "</ul>";
//
//   // $("#update").html(output);
//   $("#update").append(output);  //prepend puts item before content
// }); //loading our json file
