var address = "";

//load google maps script
var googleUrl = "https://maps.googleapis.com/maps/api/js";
loadScript(googleUrl);


//Data validation to check for city
function loadOnSubmit() {
  if(document.querySelector("#city").value === "" || document.querySelector("#city").value === null) {
    alert("Please enter a city name to populate data!");
  }
  else {
    loadData();
  }
}


//load API data
function loadData() {

//display content after on submit
  var content = document.querySelector(".flex-container");
  content.setAttribute("class", "dataEntered flex-container");

//form data
  var street = (document.querySelector("#street").value).trim();
  var city = (document.querySelector("#city").value).trim();
  console.log(city.length);
  var state = (document.querySelector("#state").value).trim();

  if (street === "") {
    address = city + " " + state;
  } else {
    address = street + ", " + city + " " + state;
  }

//updating the page greeting after form submission
  var greeting = document.querySelector("#greeting");
  greeting.innerHTML = "Information about " + address;
  //remove h2
  if(document.getElementsByTagName('h2').length !== 0) {
    var h2 = document.getElementsByTagName('h2')[0];
    var header = document.querySelector(".header");
    header.removeChild(h2);
  }

//Google streetview background image

  //parameters required: size=600x400; location: city, street, state
  var stringMain = "http://maps.googleapis.com/maps/api/streetview?";
  //var streetViewKey = "AIzaSyCyFj-UksBAb1zD4TuosKqun9XaZZakxgo"; //key not needed
  var streetViewUrl = stringMain + "size=600x400&location=" + address;

  var bkgimg = document.getElementById("mainContent");
  var imgString= "url('" + streetViewUrl + "')";
  bkgimg.style.backgroundImage = imgString;


//NY TIMES API
  var nytBaseUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.";
  var nytKey = "3136f9972bccd4c4b9d44a097076c8ec:10:73707263";
  var nytUrl = nytBaseUrl + "json?q=" + city + "&sort=newest&api-key=" + nytKey;

  fetchAjaxData(nytUrl, nytDataHandler);

//Google maps API; display map using user inputs
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
  });

  var geocoder = new google.maps.Geocoder();

  geocodeAddress(geocoder, map);

  function geocodeAddress(geocoder, resultsMap) {
    // var address = document.getElementById('street').value +", "+document.getElementById('city').value + document.getElementById('state').value;
    geocoder.geocode({
      'address': address
    }, function(results, status) { //picks up address from form inputs
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Could not load data: ' + status + ". Please check your inputs.");
      }
    });
  }

//Open Weather API
  var weatherKey = "cd4e967341807b3b328f26d3247e06ca";
  var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + address + "&appid=cd4e967341807b3b328f26d3247e06ca" + "&units=imperial" + "&format=json";

  fetchAjaxData(weatherUrl, weatherDataHandler);

//Wikipedia API
  var wikiBaseUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=";
  var wikiUrl = "";

  if (city) {
    wikiUrl = wikiBaseUrl + city + "&callback=wikiDataHandler";
  } else if (!city && state) {
    wikiUrl = wikiBaseUrl + state + "&callback=wikiDataHandler";
  }

  loadScript(wikiUrl);


  return false;

} //loadData

var submitButton = document.getElementById("submit-btn");
console.log(submitButton);
submitButton.addEventListener("click", loadOnSubmit);

//Toggle display of NYT & Wiki flex boxes
  // grab div
  var nytimesHeader = document.getElementById('nytimes-header');
  nytimesHeader.addEventListener("click", toggleDisplayNyt);

  //function to toggle display & resize box
  function toggleDisplayNyt() {
    var nytimesArticlesDiv = document.getElementById('nytimes-articles');
    var nytimesContainer = document.getElementById('nytimes-container');
    if (nytimesArticlesDiv.style.display != "none") {
      nytimesArticlesDiv.style.display = "none";
      nytimesContainer.style.height = "40px";
    } else {
      nytimesArticlesDiv.style.display = "block";
      nytimesContainer.style.height = "500px";
    }
  }

  var wikiHeader = document.getElementById('wikipedia-header');
  wikiHeader.addEventListener("click", toggleDisplayWiki);


  function toggleDisplayWiki() {
    var wikiLinks = document.querySelector('.ul-container');
    var wikiContainer = document.getElementById('wikipedia-container');
    var flex3 = document.querySelector('.flex3');
    if (wikiLinks.style.display != "none") {
      wikiLinks.style.display = "none";
      wikiContainer.style.height = "20px";
      flex3.style.height = "250px";
    } else {
      wikiLinks.style.display = "block";
      wikiContainer.style.height = "290px";
      flex3.style.height = "500px";
    }
  }


//Data Handlers
  function nytDataHandler(info) {
    document.querySelector("#nytimes-articles").innerHTML = ""; //clearing out the message;
    var articles = info.response.docs;

    forEach(articles, function(articleObj) {
      var item = document.createElement("li");
      item.setAttribute("class", "article");

      var link = document.createElement("a");
      link.setAttribute("href", articleObj.web_url);
      link.innerHTML = articleObj.headline.main;

      var snippet = document.createElement("p");
      snippet.innerHTML = articleObj.snippet;

      item.appendChild(link);
      item.appendChild(snippet);

      document.querySelector("#nytimes-articles").appendChild(item);
    }); //forEach Element
  } //New York Times DataHandler

  function weatherDataHandler(info) {
    console.log(info);
    // var longitude = info.coord.lon;  //not used
    // var latitude = info.coord.lat;  //not used
      document.querySelector("#current").innerHTML = ""; //clearing out the message;
    var wind = (info.wind.speed).toFixed(1);
    var temperature = (info.main.temp).toFixed(1);
    var conditions = info.weather[0].description;
    var weatherImage = info.weather[0].icon;
    document.getElementById("current").innerHTML = "";

    function createElAndAppend(elType, appendToId, elName, elValue, elUnits) {
      var element = document.createElement(elType);

      if (elType === "p") {
        element.setAttribute("id", elName.toLowerCase());
        element.innerHTML = "<em>" + elName + "</em> :  " + "<strong>" + elValue + elUnits + "</strong>";
      } //para
      else if (elType === "img") {
        var imageSource = "http://openweathermap.org/img/w/" + weatherImage + ".png";
        element.setAttribute("src", imageSource);
        element.setAttribute("id", "weatherImage");
      } //else of img

      document.getElementById(appendToId).appendChild(element);
    } //create element & append for Open Weather

    createElAndAppend("p", "current", "Temperature", temperature, " &#8457;");
    createElAndAppend("p", "current", "Wind", wind, " mph");
    createElAndAppend("p", "current", "Conditions", conditions, "");
    createElAndAppend("img", "current", "", weatherImage, "");

    //Convert F to C
    var currentUnit = "f";

    function toggleTemp() {
      if (currentUnit == "f") {
        var celsius = (temperature - 32) / 1.8;

        el.innerHTML = "<em> Temperature </em> :  <strong>" + celsius.toFixed(1) + "</strong> &#8451;";
        currentUnit = "c";
      } else {
        el.innerHTML = "<em> Temperature </em> :  <strong>" + temperature + "</strong> &#8457;";
        currentUnit = "f";
      }
    } //toggleTemp F to C

    var el = document.getElementById("temperature");
    el.addEventListener("click", toggleTemp);

  } //weather data handler

  function wikiDataHandler(info) {

    document.querySelector("#wikipedia-links").innerHTML = ""; //clearing out the message;

    var articlesArray = info.query.search;
    forEach(articlesArray, function(articleObj) {

      var wikiItem = document.createElement("li");
      wikiItem.setAttribute("class", "wikiLinks");
      var wikilink = document.createElement("a");

      wikilink.setAttribute("href", "https://en.wikipedia.org/wiki/" + articleObj.title);
      wikilink.innerHTML = articleObj.title;

      wikiItem.appendChild(wikilink);

      document.querySelector("#wikipedia-links").appendChild(wikiItem);

    }); //looping over each article result
  } //wiki dataHandler


//Helper Functions
  function forEach(array, action) {
    for (var i = 0; i < array.length; i++) {
      action(array[i]);
    }
  } //forEach

  function fetchAjaxData(url, cb) {
    var xhr;
    if (window.XMLHttpRequest) { //if browser supports XMLHttpRequest
      xhr = new XMLHttpRequest();
    } else { //to support IE < 7
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.open("GET", url);
    console.log(url);

    xhr.onreadystatechange = function() { //action to take upon success || failure
      if (xhr.readyState === 4 && xhr.status === 200) { //check readyState & status
        var data = JSON.parse(xhr.responseText); //NB: responseText !requestText
        //console.log(data);
        if (cb) {
          cb(data);
        } //load callback if successfull after parsing data
      } else {
        console.log("Could not complete request!");
      } //log error if something goes wrong
    }; //onreadystatechange

    xhr.send();
  } //fetchAjaxData

  function loadScript(url) {
    var script = document.createElement("script");
    script.setAttribute("src", url);
    document.body.appendChild(script);

    // remove script after execution
    script.onload = function () {
        this.remove();
    };
  } //load script & remove script after load
