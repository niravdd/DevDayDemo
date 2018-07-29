var idtoken = localStorage.getItem('token');
console.log("idtoken:",idtoken);

function logout() {
  localStorage.setItem('token','');

  window.location = "./index.html";  //proceed to sign-in page
}

function dataread() {
  var wholelist = []
  var dataonly = document.getElementById("myUL").getElementsByTagName("li");
  for (i = 0; i < dataonly.length; i++) {
    wholelist.push(dataonly[i].textContent)
  };
  //console.log('wholelist:',wholelist);
  return wholelist;
}

function loaddata (ddbdata) {
  var li = document.createElement("li");
  var t = document.createTextNode(ddbdata);

  li.appendChild(t);
  document.getElementById("myUL").appendChild(li);
}

function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
//  saythis(inputValue);
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {alert("Add something to the list...");}
                          else {document.getElementById("myUL").appendChild(li);}
  document.getElementById("myInput").value = "";
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  createclose();
  save();
  dataread();
}

function createclose() {
  var theList = document.getElementsByTagName("LI");
  var i;
  for (i = 0; i < theList.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    pre_loaded = theList[i].textContent
    //console.log('pre_loaded',pre_loaded);
    if (pre_loaded.indexOf("\u00D7") === -1) {theList[i].appendChild(span);}
  }
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
      div.remove();
      dataread();
      save();
    }
  }
}

function searchKeyPress(e) {
    e = e || window.event;
    if (e.keyCode == 13)
    {
        newElement();
        return false;
    }
    return true;
}


function getcontent(idtoken){
  if (idtoken === null) {console.log("no idtoken found in localstorage ",idtoken);
                         window.location = "./index.html"};
  $.get({
    url: 'https://jznmhv5sk4.execute-api.ap-southeast-2.amazonaws.com/prod/read',
    headers: { 'Authorization': idtoken,'Content-Type': 'application/json' },
    success: function(data) {
      mylist=data.workitem
      todoid=data.todoid
      for (i = 0; i < mylist.length; i++) { loaddata(mylist[i]); }
      createclose();
      console.log("data from ddb:", mylist)
      return data;
      },
    error: function(data) {console.log(data);return data;}
  });
};

function save() {
  var wholelist = []
  var dataonly = document.getElementById("myUL").getElementsByTagName("li");
  for (i = 0; i < dataonly.length; i++) {
    wholelist.push(dataonly[i].textContent)
  };
  //console.log('wholelist:',wholelist);



  for (i = 0; i < wholelist.length; i++) { wholelist[i] = wholelist[i].replace(/\u00D7/g, "");}
  console.log("about to save:",wholelist)
  var payload = {"todoid" : "notusedyet","workitem" : wholelist}
  var payload = JSON.stringify(payload)
  console.log("saving payload:"+payload)

  $.post({
    url: 'https://jznmhv5sk4.execute-api.ap-southeast-2.amazonaws.com/prod/create',
    headers: { 'Authorization': idtoken,'Content-Type': 'application/json' },
    data: payload,
    success: function(data) { console.log(data); return data;},
    error: function(data) { console.log(data); return data;}
  });
}

//voice start
var synth = window.speechSynthesis;
voices = synth.getVoices();
var msg = new SpeechSynthesisUtterance();
function loadVoices() {
  // Fetch the available voices.
	var voices = speechSynthesis.getVoices();
  voices.forEach(function(voice, i) {
    //console.log(voice.name);
});

}

   function saythis(sample) {
     msg.text = sample
     msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Karen'; })[0];
     window.speechSynthesis.speak(msg);

   }

   // Execute loadVoices.
   loadVoices();

   // Chrome loads voices asynchronously.
   window.speechSynthesis.onvoiceschanged = function(e) {
     loadVoices();
   };

console.log(voices);


//voice end



getcontent(idtoken);
//test = ["one","two","three","four","five"]
//for (i = 0; i < test.length; i++) { loaddata(test[i]); }
dataread();
createclose();



// Click close - hide and remove current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
    div.remove();
    dataread();
    save();
  }
}

// Add a "check" symbol.
//var list = document.querySelector('ul');
//list.addEventListener('click', function(ev) {

//  if (ev.target.tagName === 'LI') {
//    ev.target.classList.toggle('checked');
//  }
// }, false);
