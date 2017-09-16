document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        chrome.tabs.executeScript({
			file: 'content.js'
		});
    }, 3000);
});
