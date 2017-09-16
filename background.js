blocked_sites = 'facebook|twitter'

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

//chrome.declarativeContent.onPageChanged.
///document.onload = function() {
///    console.log("Running script");
///    setTimeout(function() {
///        alert("WOW you've spent a lot of time on FB lately");
///    }, 3000);
///}


