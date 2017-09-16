document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.width = '100%';
document.body.style.width = '100%';

var div = document.createElement( 'div' );
var btnForm = document.createElement( 'form' );
var btn = document.createElement( 'input' );

//append all elements
document.body.appendChild( div );
div.appendChild( btnForm );
btnForm.appendChild( btn );
//set attributes for div
div.id = 'myDivId';
div.style.zindex = '100000000';
div.style.position = 'fixed';
div.style.top = '0%';
div.style.left = '0%';
div.style.width = '100%';   
div.style.height = '100%';
div.style.backgroundColor = 'black';

setTimeout(function() {
	document.body.removeChild(div);
}, 1000)

