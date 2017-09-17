var QUIZLET_BASE_URL = "https://quizlet.com/2.0/sets/";
var STUDY_DECK = null;

function create_popup() {
    console.log("creating popup");
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.documentElement.style.width = '100%';
    document.body.style.width = '100%';

    var div = document.createElement( 'div' );

    //set attributes for div
    div.id = 'blackout';
    div.style.zindex = Number.MAX_VALUE;
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.left = '0';
    div.style.width = '100%';   
    div.style.height = '100%';
    div.style.backgroundColor = 'black';

    div = $(div);
    
    $(document.body).children().hide();

    //append element
    $(document.body).append( div );
    // Get the html for the popup
    $.get(chrome.extension.getURL('blocking_popup.html'), function(data) {
        $(data).appendTo(div);
    })

    //Get the question info 
    getStudyDeck();
   
}

function getStudyDeck() {
    if (STUDY_DECK) {
        showCard(STUDY_DECK)
        return;
    }

    var studyUrl = "https://quizlet.com/1321499/essential-french-vocabulary-flash-cards/"; 
    // remove the trailing slash
    if (studyUrl.charAt(studyUrl.length -1) != "/") {studyUrl = studyUrl + "/"}
    var setId = studyUrl.split("/")[3];
    console.log("setID", setId);
    $.ajax({
        url: QUIZLET_BASE_URL + setId + "/?client_id=NAWWEXa7m&whitespace=1",
        method: 'GET',
        dataType: 'json',
        //data: {"client_id": "NAWWEXa7Jm"},
        success: function(data) {
            STUDY_DECK = data;
            showCard(STUDY_DECK);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("There was an error", errorThrown);
        }
    });
}

function showCard(setData) {
    var terms = setData.terms;
    var randomTerm = terms[Math.floor(Math.random() * terms.length)];

    //fill in the data in the popup
    console.log("card", card);
    console.log("definition", $("#definition"));
    //TODO: show image
    $('#definition').text(randomTerm.definition);
    $('#study_set').text("Pulling from the study set " + setData.title);
}

$(document).ready(function() {
    chrome.runtime.sendMessage({"social_timeout": "social_visit"}, function() {});
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log("Received an alarm in the active tab");
        if (request.social_timeout && request.social_timeout == "time_expired") {
            // create a popup
            console.log("too much time on social media");
            create_popup();
        }
    });
})
