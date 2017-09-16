function create_popup() {
    console.log("creating popup");
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.documentElement.style.width = '100%';
    document.body.style.width = '100%';

    var div = document.createElement( 'div' );
    var img = document.createElement('img');

    img.src = 'https://i.ytimg.com/vi/2qZHh_iN5Zs/hqdefault.jpg'

    //append all elements
    document.body.appendChild( div );
    div.appendChild(img);

    //set attributes for div
    div.id = 'blackout';
    div.style.zindex = '100000000';
    div.style.position = 'fixed';
    div.style.top = '0%';
    div.style.left = '0%';
    div.style.width = '100%';   
    div.style.height = '100%';
    div.style.backgroundColor = 'black';

    setTimeout(function() {
        document.body.removeChild(div);
    }, 2000)
}

$(document).ready(function() {
    chrome.runtime.sendMessage({"social_timeout": "social_visit"}, function() {});
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.social_timeout && request.social_timeout == "time_expired") {
        // create a popup
        create_popup();
    }
});
