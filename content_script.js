$(document).ready(function() {
    chrome.runtime.sendMessage({"social_timeout": "social_visit"}, function() {});
})
