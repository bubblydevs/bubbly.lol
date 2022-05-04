if(document.addEventListener){
	document.addEventListener("DOMContentLoaded", function(){
		loaded();
	});
} else if(document.attachEvent){
	document.attachEvent("onreadystatechange", function(){
		loaded();
	});
}

function loaded(){

	setInterval(loop, 350);

}

var x = 0;var titleText = [ "bubbly.lol", "bubbly.lol", "bubbly.l", "bubbly.", "bubbly", "bubbl", "bubb", "bub", "bu", "b", "bu", "bub", "bubb", "bubbl", "bubbly", "bubbly." , "bubbly.l", "bubbly.lo" , "bubbly.lol" ];

function loop(){

	document.getElementsByTagName("title")[0].innerHTML = titleText[x++%titleText.length];

}
