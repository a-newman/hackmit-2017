// document.addEventListener("DOMContentLoaded", function() {
//     setTimeout(function() {
//         chrome.tabs.executeScript({
// 			file: 'content.js'
// 		});
//     }, 3000);
// });

var blocked_sites = ['facebook'];
var activity;
var quizlet;

document.addEventListener('DOMContentLoaded', function() {
  // setup list with proper labels
  updateList();

  // get active domain
  chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var firstDot = url.indexOf('.');
    var secondDot = url.indexOf('.', firstDot+1);
    var activeDomain = url.substring(firstDot+1, secondDot);
    if (!blocked_sites.includes(activeDomain)){
      document.getElementById('text').value = activeDomain;
    }
    else{
      document.getElementById('text').value = "";
    }
  });

  // get current activity
  updateDropdown();



  // addSite button
  var addSiteButton = document.getElementById('addSite');
  addSiteButton.addEventListener('click', function() {
    // add site to blocked list
    blocked_sites.push(document.getElementById('text').value);
    document.getElementById('text').value = "";
    updateList();
  }, false);

  // removeSite button
  var removeSiteButton = document.getElementById('removeSite');
  removeSiteButton.addEventListener('click', function() {
    // remove selected sites from blocked list
    ind = document.getElementById('list').selectedIndex;
    blocked_sites.splice(ind,1);
    document.getElementById('list').options[ind].remove();
  }, false);

  var dropdown = document.getElementById('dropdown');
  dropdown.addEventListener('change', updateDropdown());


  link.addEventListener('change', function(){
    alert("quizlet")
    quizlet = document.getElementById('link').value;
  });

}, false);

function updateList(){
  // update list with proper labels
  for (var i=0; i < blocked_sites.length; i++){
    if (!document.getElementById('list').options[i]){
      document.getElementById('list').options[i] = new Option(blocked_sites[i])
    }
    else{
      document.getElementById('list').options[i].label= blocked_sites[i];
    }
  }
}

function updateDropdown(){
  // update dropdown with proper labels
  if (!activity){
    e = document.getElementById('dropdown');
    activity = e.options[e.selectedIndex].value;
  }
  text_link = document.getElementById('link');
  if (activity == "Quizlet"){
    // initialize quizlet link
    text_link.value = "paste Quizlet link here";
    text_link.disable = false;
  }
  else{
    text_link.value = "none";
    text_link.disable;
  }
}
