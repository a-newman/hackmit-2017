blocked_sites = 'facebook|twitter'
var lastTabsUrl = "BeginningDefault";


function makeAlarm(name, delayMinutes) {
    // TODO: if an alarm is already set, do not create a new one
    chrome.alarms.create(name, {"delayInMinutes": delayMinutes});
}

function isSocial(url){
  return url.indexOf("facebook") !== -1;
}


// This code handles lighting up the icon on monitored pages
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains anything in blocked_sites ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: blocked_sites+'|google'},
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

// Listens for events indicating the user switched to a social page, and sets
// or refreshes an alarm
chrome.tabs.onActivated.addListener(  

  function(activeInfo) {

   var thisTabsUrl;
   chrome.tabs.get(activeInfo.tabId, function(tab){
        thisTabsUrl = tab.url;

        //check if switch was from non-social to social media
        if (isSocial(thisTabsUrl) && !isSocial(lastTabsUrl)) {
           //if so, then start an alarm 
           makeAlarm("social_timeout", .1);
        }  else if (!isSocial(thisTabsUrl) && isSocial(lastTabsUrl)) { 
           //if switch away from social media to non social, clear all alarms
           chrome.alarms.clear("social_timeout");
        }

        lastTabsUrl = thisTabsUrl;

    })
}



)



// Listens for messages indicating the user has visited a social page, and sets
// or refreshes an alarm
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (! (request.social_timeout && request.social_timeout == "social_visit")) {
        return;
    }
    makeAlarm("social_timeout", .1);
});


// Listens for alarms indicating a user has exceeded their social timeout
chrome.alarms.onAlarm.addListener(function(alarm) {
    if (! alarm.name == "social_timeout") {
        return;
    }

    //alert("You've been on social media too long!");
    // send a message back to the active tab creating the popup
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        tabUrl = tabs[0].url;
        if (isSocial(tabUrl)) {
            // Send a message back to that tab
            chrome.tabs.sendMessage(tabs[0].id, {"social_timeout": "time_expired"});
        }
    });
});

