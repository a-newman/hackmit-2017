blocked_sites = 'facebook|twitter'

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

// Listens for messages indicating the user has visited a social page, and sets
// or refreshes an alarm
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (! (request.social_timeout && request.social_timeout == "social_visit")) {
        return;
    }
    // TODO: if an alarm is already set, do not create a new one
    chrome.alarms.create("social_timeout", {"delayInMinutes": .1});
});


// Listens for alarms indicating a user has exceeded their social timeout
chrome.alarms.onAlarm.addListener(function(alarm) {
    if (! alarm.name == "social_timeout") {
        return;
    }
    alert("You've been on social media too long!");
    // send a message back to the active tab creating the popup
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        tabUrl = tabs[0].url;
        console.log("tabUrl", tabUrl);
        if (tabUrl.indexOf("facebook") !== -1) {
            // Send a message back to that tab
            chrome.tabs.sendMessage(tabs[0].id, {"social_timeout": "time_expired"});
        }
    });
});
