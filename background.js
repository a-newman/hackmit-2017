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
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

// This handles to listening to "alarm" events

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
            chrome.tabs.sendMessage(tabs[0].id, {"social_timeout": "You've been on too long!"});
        }
    });
});
