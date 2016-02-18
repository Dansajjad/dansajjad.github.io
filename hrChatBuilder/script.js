//deleting the original methods of the Chat object
delete Chat.display;
delete Chat.fetch;
delete Chat.send;



//refresh chats every 3 seconds
setInterval(function() {
  fetchAjaxData(getUrl, chatDataHandler)
}, 3000);


var getUrl = "https://api.parse.com/1/classes/chats?order=createdAt";
var postUrl = "https://api.parse.com/1/classes/chats";

//event handler for submit button
var submitButton = document.getElementById("send");
submitButton.addEventListener("click", function() {
  var message = document.getElementById("message").value;
  sendAjaxData(postUrl, message);
  fetchAjaxData(getUrl, chatDataHandler)
});


/****************Helper Functions********************/

//format & append get request data
function chatDataHandler(data) {
  var html = "";
  data.results.forEach(function(el) {
    html +=
      '<li><div class="username"><span>' + el.username + '>></span></div>' +
      '<div class="message"><span>' + cleanMessage(el.text) + '</span></div>' +
      '<div class="time"><span>' + formatTime(el.updatedAt) + '</span></div></li>';
  });
  var list = document.getElementById('messages');
  list.innerHTML = html;
}
//remove username for the chat message
function cleanMessage(str) {
  if(str.indexOf(":") > -1) {
    return str.slice(str.indexOf(":") + 1);
  }
  else return str;
}
//format time
function formatTime(str) {
  var parsed = new Date(str);
  return zeroPad(parsed.getHours()) + ":" + zeroPad(parsed.getMinutes());
}
//append 0's to hours/ minutes if single digits
function zeroPad(num) {
  while(String(num).length < 2) { num = "0" + String(num); }
  return num;
}


//Get & Post functions
function fetchAjaxData(url, cb) {
  var xhr;

  if(window.XMLHttpRequest) { xhr = new XMLHttpRequest(); }
  else { xhr = new ActiveXObject("Microsoft.XMLHTTP"); }

  xhr.open("GET", url);
  xhr.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  xhr.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      if(cb) { cb(data); }
    }
    else { console.log("Could not complete request"); }
  };

  xhr.send();
}

function sendAjaxData(url, text){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  xhr.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
  xhr.onreadystatechange = function () {
    if (xhr.readyState != 4 || xhr.status != 200) return;
    console.log("Success: " + xhr.responseText);
  };
  xhr.send(JSON.stringify({username: Chat.username, "text": text}));
}
