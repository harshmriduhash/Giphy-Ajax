window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
//Variables for URL generation
var custom = 'cats typing'
var imagecount = 24;
var offset = 0;
var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+custom+'&api_key=dc6zaTOxFJmzC&MPAA=R&limit='+imagecount+'&offset='+offset+''
//Used to store the returned object from Giphy
var object;
//Variables to store the sound effects
var dioRoadroller = new Audio('media/dioroadroller.mp3');
var typing = new Audio('media/typing.mp3');
var typingslow = new Audio('media/typingslow.mp3');
var typewriter = new Audio('media/typewriter.mp3');
var thanksobama = new Audio('media/thanksobama.mp3');
var rubberduck = new Audio('media/rubberduck.mp3');
var meow = new Audio('media/meow.mp3');
var jake = new Audio('media/jake.mp3');
var mathematical = new Audio('media/mathematical.mp3');
var swoosh = new Audio('media/swoosh.mp3');
var dragonroar = new Audio('media/dragonroar.mp3');
var fail = new Audio('media/fail.mp3');
var explosion = new Audio('media/explosion.mp3');
var glassbreak = new Audio('media/glassbreak.mp3');
var glassbreak2 = new Audio('media/glassbreak.mp3');
var ding = new Audio('media/ding.mp3');
var boing = new Audio('media/boing.mp3');
var toasty = new Audio('media/toasty.mp3');
//Booleans for changing the background of the page
var gifbackground = false;
var geddanbackground = false;
var geddanbackground2 = false;
var georgebackground = false;

//Stops sound effects function
var stopsound = function(){
	typing.pause();
	typing.currentTime = 0;
	typingslow.pause();
	typingslow.currentTime = 0;
	typewriter.pause();
	typewriter.currentTime = 0;
	thanksobama.pause();
	thanksobama.currentTime = 0;
	rubberduck.pause();
	rubberduck.currentTime = 0;
	meow.pause();
	meow.currentTime = 0;
	jake.pause();
	jake.currentTime = 0;
	mathematical.pause();
	mathematical.currentTime = 0;
	swoosh.pause();
	swoosh.currentTime = 0;
	dragonroar.pause();
	dragonroar.currentTime = 0;
	fail.pause();
	fail.currentTime = 0;
	explosion.pause();
	explosion.currentTime = 0;
	glassbreak.pause();
	glassbreak.currentTime = 0;
	glassbreak2.pause();
	glassbreak2.currentTime = 0;
	ding.pause();
	ding.currentTime = 0;
	boing.pause();
	boing.currentTime = 0;
	toasty.pause();
	toasty.currentTime = 0;
}

//Resets background and audio
var reset = function(){
	//Empties the text box just for Geddan
	if(geddanbackground){
		// $('#gifs').empty();
	}
	//End Empty Geddan
	gifbackground = false;
	geddanbackground = false;
	geddanbackground2 = false;
	georgebackground = false;
	$('#songplayer').get(0).pause();
	// $('#songplayer').get(0).currentTime=0;
	$('#songplayer2').get(0).pause();
	// $('#songplayer2').get(0).currentTime=0;
	document.getElementById('geddanvideo').pause();
	document.getElementById('geddanvideo').currentTime=0;
	$('#geddanvideo').hide();
	$('body').css('background-image', '');
	$('body').css('background', '');
	$('.animatethis').removeClass("animated rubberBand flip rotate360 hinge infinite");
	$('#resetbackground').removeClass("animated hinge fadeInDown bounceInUpSlow");
	stopsound();
}

//Deletes user created buttons
$('#resetbuttons').click(function(){
	if(!geddanbackground){
		var parent = document.getElementById("buttons");
		var x = document.getElementById("buttons").childElementCount;
		var y = document.getElementById("buttons").childElementCount;
		console.log('#ofButtons '+x+'');

		if(x>12){
			stopsound();
			explosion.play();
			for (var i = 0; i < y-12; i++) {
				var child = $('#buttons').children().eq(12);
				child.detach();
				var x = document.getElementById("buttons").childElementCount;
				console.log('Removed a button');
			}
		}
		else{
			return;
		}
	}
	else{
		stopsound();
		return;
	}
});

//Resets the background only if the background has been changed from default
$('#resetbackground').click(function(){
	if(gifbackground || georgebackground || (document.getElementById('gifs').hasChildNodes() && !geddanbackground) || (geddanbackground2 && geddanbackground)){
		reset();
		ding.play();
		$('#gifs').empty();
	}
	else{
		return;
	}
});

//Turns gif background on and bounces everything
$('.logoclick').click(function(){
	if(!geddanbackground){
		reset();
		gifbackground = true;
		$('#songplayer2').get(0).play();
		//Checks to see if the AJAX request has any images in it
		if(object.data.length>0){
			boing.play();
			// $('.animatethis').addClass("animated pulse infinite");
			getgifs();
		}
		//Sends you to the NO RESULTS section
		else{
			boing.play();
			$('#songplayer2').get(0).play();
			$('body').css('background-image', 'url(images/marisaspin.gif)').css('background-color', 'pink');
			$('#gifs').empty();
			$('#gifs').append('<div class="row"><div class="col-xs-3"></div><div id="noresults" class="animatethis col-xs-6">NO RESULTS...</div><div class="col-xs-3"></div></div>');
			$('#gifs').append('<div class="row"><div class="col-xs-3"></div><div id="noresults" class="animatethis col-xs-6">TRY SOMETHING ELSE!</div><div class="col-xs-3"></div></div>');		
			$('.animatethis').addClass("animated rubberBand infinite");
		}
	}
	else{
		return;
	}
})

//Initializes George
$('#george').click(function(){
	if(!geddanbackground){
		reset();
		georgebackground = true;
		toasty.play();
		$('body').css('background-image', 'url(images/george.gif)').css('background-color', 'pink').css('background-attachment', 'fixed');
		$('#songplayer').get(0).play();
		// $('#gifs').empty();
		// $('#gifs').append('<div class="row"><div class="col-xs-3"></div><div id="noresults" class="animatethis col-xs-6">N0 R3SUL75...</div><div class="col-xs-3"></div></div>');
		// $('#gifs').append('<div class="row"><div class="col-xs-3"></div><div id="noresults" class="animatethis col-xs-6">1337 TA 7H0UGH!</div><div class="col-xs-3"></div></div>');
		$('.animatethis').addClass("animated flip infinite");
	}
	else{
		return;
	}
});

//Initializes Geddan
$('#geddan').click(function(){
	if(!geddanbackground){
		reset();
		geddanbackground=true;
		geddanbackground2=false;
		stopsound();
		glassbreak.play();
		$('#songplayer').get(0).pause();
		$('#songplayer2').get(0).pause();
		$('body').css('background-image', '');
		$('body').css('background', '');
		$('body').css('background-image', '').css('background-color', '#FF9C00');
		$('#videocontainer').show();
		document.getElementById('geddanvideo').play();
		$('#geddanvideo').show();
		$('.animatethis').removeClass("rubberBand flip infinite");
		$('.animatethis').addClass("animated hinge");
		$('#resetbackground').addClass("animated hinge");
		$('#gifs').append('<div class="row"><div class="col-xs-1"></div><div id="geddanstyle" class="animated shake infinite col-xs-10">Get Down yureru  mawaru  fureru  setsunai kimochi futari de issho ni nemuru  Winter Land anata dake mitsumete  watashi dake mitsumete asu woOOooOOooOOoo chikau gyutto  dakare  moeru koigokoro hageshiku  maichiru  yuki ni tsutsumarete eien ni aishiteru  kyou yori aishiteru zuttoOOooOOooOOoo ETERNAaaAAAL LOOOOOoooVE</div><div class="col-xs-1"></div></div>');
		setTimeout(geddanempty, 2000);
	}
	else{
		return;
	}
});

var geddanempty = function(){
	$('#gifs').empty();
	$('#gifs').append('<div class="row"><div class="col-xs-1"></div><div id="geddanstyle" class="animated shake infinite col-xs-10">Get Down yureru  mawaru  fureru  setsunai kimochi futari de issho ni nemuru  Winter Land anata dake mitsumete  watashi dake mitsumete asu woOOooOOooOOoo chikau gyutto  dakare  moeru koigokoro hageshiku  maichiru  yuki ni tsutsumarete eien ni aishiteru  kyou yori aishiteru zuttoOOooOOooOOoo ETERNAaaAAAL LOOOOOoooVE</div><div class="col-xs-1"></div></div>');
	setTimeout(geddanfix0, 1000);
}

var geddanfix0 = function(){
	$('#resetbackground').text("Uh Oh!!");
	$('#resetbackground').removeClass("hinge");
	$('#resetbackground').addClass("bounceInUpSlow");	
	setTimeout(geddanfix1, 2000);
}
var geddanfix1 = function(){
	$('#resetbackground').text("Wut Happened?!?");
	setTimeout(geddanfix2, 6000);	
}
var geddanfix2 = function(){
	$('#resetbackground').text("ITS OK! IM COMING!");
	setTimeout(geddanfix3, 7000);	
}
var geddanfix3 = function(){
	$('#resetbackground').text("I'LL SAVE YOU!!!");
	setTimeout(geddanfix4, 11000);
}
var geddanfix4 = function(){
	$('#resetbackground').text("ALMOST THERE!!");
	setTimeout(geddanfix, 7000);
}
var geddanfix = function(){
	geddanbackground2 = true;
	$('#resetbackground').text("STOP THE MADNESS!");
}
//End Geddan

//Counter Section
// $('#onePlus').click(function() {
// 	if(imagecount<100){
// 	imagecount+=4;
// 	$('#imgCounter').text(imagecount);
// 	queryURL = 'https://api.giphy.com/v1/gifs/search?q='+custom+'&api_key=dc6zaTOxFJmzC&MPAA=R&limit='+imagecount+'&offset='+offset+''
// 	}
// });

// $('#oneMinus').click(function() {
// 	if(imagecount>12){
// 	imagecount-=4;
// 	$('#imgCounter').text(imagecount);
// 	queryURL = 'https://api.giphy.com/v1/gifs/search?q='+custom+'&api_key=dc6zaTOxFJmzC&MPAA=R&limit='+imagecount+'&offset='+offset+''
// 	}
// });
//End Counter Section

//Form Section
//Allows the user to press Enter to submit the form without reloading the page
$('#form1').keypress(function(e){
	if(e.keyCode==13){
	e.preventDefault();
	$('#formButton').click();
  	}
});

//Creates a button if the button doesn't exist
$('#formButton').click(function(){
	if(!geddanbackground){
		custom = document.getElementById("userinput").value;
		console.log(custom);
		var customL = custom.toLowerCase();
		queryURL = 'https://api.giphy.com/v1/gifs/search?q='+custom+'&api_key=dc6zaTOxFJmzC&MPAA=R&limit='+imagecount+'&offset='+offset+''
		getgifs();
		//Checks to see if the user's input exists as a button already
		if(document.getElementById(customL)){
			stopsound();
			swoosh.play();
		}
		//If the button does not exist, create a button
		else{
			stopsound();
			swoosh.play();
			$('#buttons').append('<button id="'+customL+'" value="'+customL+'" class="animatethis buttonswoosh buttonclick btn btn-6 btn-6b">'+custom+'</button>');
		};
	}
	else{
		stopsound();
		return;
	}
});
//End Form

//Code for AJAX request and appending images
function getgifs(){
$('#gifs').empty();
offset = 0;
var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+custom+'&api_key=dc6zaTOxFJmzC&MPAA=R&limit='+imagecount+'&offset='+offset+''
$.ajax({
	    url: queryURL,
	    method: "GET"
    }).done(function(response) {
	    console.log(response);
	    object = response;
		//If no results, show no result screen
		if(response.data.length<1){
			reset();
			gifbackground = true;
			$('#songplayer2').get(0).play();
			$('body').css('background-image', 'url(images/marisaspin.gif)').css('background-color', 'pink');
			swoosh.pause();
			stopsound();
			fail.play();
			$('#gifs').empty();
			$('#gifs').append('<div class="row"><div class="col-xs-3"></div><div id="noresults" class="animatethis col-xs-6">NO RESULTS...</div><div class="col-xs-3"></div></div>');
			$('#gifs').append('<div class="row"><div class="col-xs-3"></div><div id="noresults" class="animatethis col-xs-6">TRY SOMETHING ELSE!</div><div class="col-xs-3"></div></div>');		
			$('.animatethis').addClass("animated rubberBand infinite");
		}
		//Append gifs to page
		else {
			//Creates 4 columns to store rows
		    for(var i = 0; i<4; i++){
		    	$('#gifs').append('<div class="col-xs-3" id="col'+i+'"></div>');
		    }
		    //Creates #gif div to append gifs to
		    for (var i = 0; i<response.data.length; i+=4){
		    	var i1=i+1;
		    	var i2=i+2;
		    	var i3=i+3;
		    	$('#col0').append('<div class="container-fluid"><div class="row" id="gif'+i+'"></div></div>');
		    	$('#col1').append('<div class="container-fluid"><div class="row" id="gif'+i1+'"></div></div>');
		    	$('#col2').append('<div class="container-fluid"><div class="row" id="gif'+i2+'"></div></div>');
		    	$('#col3').append('<div class="container-fluid"><div class="row" id="gif'+i3+'"></div></div>');
		    }
		    //Appends gifs to proper #gif div
		    for (var i = 0; i < response.data.length; i++) {
		    	var mystring = response.data[i].title;
		    	var newstring = mystring.replace(/\s/g, "").length;
		    	if(newstring>0){
		    		var temptitle = response.data[i].title
		    	}
		    	else {
		    		var temptitle = 'No Title'
		    	}
		    	$('#gif'+i+'').append('<div class="animatethis gifContainer fadeinout"><a href="'+response.data[i].url+'" target="_blank"><img numvalue="'+i+'" src="'+response.data[i].images.downsized.url+'" data-original="'+response.data[i].images.downsized.url+'" data-still="'+response.data[i].images.downsized_still.url+'"><p>'+temptitle+'</p></a></div>');
		    	$('#gif'+i+'').addClass('animated bounceIn');
		    }
		    	//Adds animation/background based on which background is active
			    if(gifbackground){
			    	var r = Math.floor(Math.random()*object.data.length);
					console.log(r);
					console.log(object.data[r].images.downsized.url);
					$('body').css('background-image', 'url('+object.data[r].images.downsized.url+')').css('background-attachment', 'fixed');
			    	$('.animatethis').addClass("animated rubberBand infinite");
			    	$('.animated').removeClass("bounceIn");
			    }
			    else if(georgebackground){
					$('.animatethis').addClass("animated rotate360 infinite");
				}
				else if(geddanbackground){
					$('.animatethis').addClass("animated hinge");
					stopsound();
					glassbreak2.play();
					$('#gifs').prepend('<div class="row"><div class="col-xs-1"></div><div id="noresults" class="animated shake infinite col-xs-10">Get Down yureru  mawaru  fureru  setsunai kimochi futari de issho ni nemuru  Winter Land anata dake mitsumete  watashi dake mitsumete asu woOOooOOooOOoo chikau gyutto  dakare  moeru koigokoro hageshiku  maichiru  yuki ni tsutsumarete eien ni aishiteru  kyou yori aishiteru zuttoOOooOOooOOoo  Eternal Love</div><div class="col-xs-1"></div></div>');
				}
			    else{
			    	return;
			    }
		}
		//End Append gifs to page
	});
}
//End AJAX and gif append

//Infinite Scrolling
function getgifspagination(){
offset += imagecount;
var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+custom+'&api_key=dc6zaTOxFJmzC&MPAA=R&limit='+imagecount+'&offset='+offset+''
$.ajax({
	    url: queryURL,
	    method: "GET"
    }).done(function(response) {
	    console.log(response);
	    object = response;
		//If no results, don't append anything
		if(response.data.length<1){
			return;
		}
		//Append gifs to page
		else {
		//Appends #gif div into the shortest vertical column
		    //Variables for checking column height
		    var col0H = document.getElementById('col0').clientHeight;
		    var col1H = document.getElementById('col1').clientHeight;
		    var col2H = document.getElementById('col2').clientHeight;
		    var col3H = document.getElementById('col3').clientHeight;
		    //Appends 2 extra gif divs to first column
		    if(col0H <= col1H && col0H <= col2H && col0H <= col3H){
		    	console.log('col0 shortest');
			    for (var i = offset; i<offset+response.data.length-4; i+=4){
			    	var i1=i+1;
			    	var i2=i+2;
			    	var i3=i+3;
			    	$('#col0').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i+'"></div></div>');
			    	$('#col1').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i1+'"></div></div>');
			    	$('#col2').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i2+'"></div></div>');
			    	$('#col3').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i3+'"></div></div>');
		    	}
			    for (var i = offset+response.data.length-4; i<offset+response.data.length; i+=4){
			    	var i1=i+1;
			    	var i2=i+2;
			    	var i3=i+3;
			    	$('#col0').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i+'"></div></div>');
			    	$('#col0').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i1+'"></div></div>');
			    	$('#col0').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i2+'"></div></div>');
			    	$('#col1').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i3+'"></div></div>');
		    	}		    	

		    }
		    //Appends 2 extra gif divs to second column
		    else if(col1H <= col0H && col1H <= col2H && col1H <= col3H){
		    	console.log('col1 shortest');
			    for (var i = offset; i<offset+response.data.length-4; i+=4){
			    	var i1=i+1;
			    	var i2=i+2;
			    	var i3=i+3;
			    	$('#col0').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i+'"></div></div>');
			    	$('#col1').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i1+'"></div></div>');
			    	$('#col2').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i2+'"></div></div>');
			    	$('#col3').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i3+'"></div></div>');
		    	}
			    for (var i = offset+response.data.length-4; i<offset+response.data.length; i+=4){
			    	var i1=i+1;
			    	var i2=i+2;
			    	var i3=i+3;
			    	$('#col1').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i+'"></div></div>');
			    	$('#col1').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i1+'"></div></div>');
			    	$('#col1').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i2+'"></div></div>');
			    	$('#col2').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i3+'"></div></div>');
		    	}		    	

		    }
		    //Appends 2 extra gif divs to third column
		    else if(col2H <= col0H && col2H <= col1H && col2H <= col3H){
		    	console.log('col2 shortest');
			    for (var i = offset; i<offset+response.data.length-4; i+=4){
			    	var i1=i+1;
			    	var i2=i+2;
			    	var i3=i+3;
			    	$('#col0').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i+'"></div></div>');
			    	$('#col1').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i1+'"></div></div>');
			    	$('#col2').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i2+'"></div></div>');
			    	$('#col3').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i3+'"></div></div>');
		    	}
			    for (var i = offset+response.data.length-4; i<offset+response.data.length; i+=4){
			    	var i1=i+1;
			    	var i2=i+2;
			    	var i3=i+3;
			    	$('#col2').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i+'"></div></div>');
			    	$('#col2').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i1+'"></div></div>');
			    	$('#col2').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i2+'"></div></div>');
			    	$('#col3').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i3+'"></div></div>');
		    	}		    	

		    }
		    //Appends 2 extra gif divs to fourth column
		    else if(col3H <= col0H && col3H <= col1H && col3H <= col2H){
		    	console.log('col3 shortest');
			    for (var i = offset; i<offset+response.data.length-4; i+=4){
			    	var i1=i+1;
			    	var i2=i+2;
			    	var i3=i+3;
			    	$('#col0').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i+'"></div></div>');
			    	$('#col1').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i1+'"></div></div>');
			    	$('#col2').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i2+'"></div></div>');
			    	$('#col3').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i3+'"></div></div>');
		    	}
			    for (var i = offset+response.data.length-4; i<offset+response.data.length; i+=4){
			    	var i1=i+1;
			    	var i2=i+2;
			    	var i3=i+3;
			    	$('#col3').append('<div class="container-fluid"><div class="row ajaxhide id="gif'+i+'"></div></div>');
			    	$('#col3').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i1+'"></div></div>');
			    	$('#col3').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i2+'"></div></div>');
			    	$('#col4').append('<div class="container-fluid"><div class="row ajaxhide" id="gif'+i3+'"></div></div>');
		    	}
		    }
		    //Appends gifs to proper #gif div
		    for (var i = offset; i<offset+response.data.length; i++) {
		    	var mystring = response.data[i-offset].title;
		    	var newstring = mystring.replace(/\s/g, "").length;
		    	if(newstring>0){
		    		var temptitle = response.data[i-offset].title
		    	}
		    	else {
		    		var temptitle = 'No Title'
		    	}
		    	$('#gif'+i+'').append('<div class="animatethis gifContainer fadeinout"><a href="'+response.data[i-offset].url+'" target="_blank"><img numvalue="'+i+'" src="'+response.data[i-offset].images.downsized.url+'" data-original="'+response.data[i-offset].images.downsized.url+'" data-still="'+response.data[i-offset].images.downsized_still.url+'"><p>'+temptitle+'</p></a></div>');
		    	$('#gif'+i+'').addClass('animated bounceIn');
		    }
	    	//Adds animation based on which background is active
		    if(gifbackground){
		    	var r = Math.floor(Math.random()*object.data.length);
				$('.animatethis').addClass("animated rubberBand infinite");
		    }
		    else if(georgebackground){
				console.log('george');			
				$('.animatethis').addClass("animated rotate360 infinite");
			}
			// else if(geddanbackground){
			// 	$('.animatethis').addClass("animated hinge");
			// 	stopsound();
			// 	glassbreak2.play();
			// 	$('#gifs').prepend('<div class="row"><div class="col-xs-1"></div><div id="noresults" class="animated shake infinite col-xs-10">Get Down yureru  mawaru  fureru  setsunai kimochi futari de issho ni nemuru  Winter Land anata dake mitsumete  watashi dake mitsumete asu woOOooOOooOOoo chikau gyutto  dakare  moeru koigokoro hageshiku  maichiru  yuki ni tsutsumarete eien ni aishiteru  kyou yori aishiteru zuttoOOooOOooOOoo  Eternal Love</div><div class="col-xs-1"></div></div>');
			// }
		    else{
		    	return;
		    }
		}
		//End Append gifs to page
	});
}
//end infinite scrolling

//Starts the document with the preset queryURL gifs
getgifs();
typing.play();

//Sound effects for clicking on buttons
$('.buttontyping').click(function(){
	stopsound();
	typing.play();
});

$('.buttontypingslow').click(function(){
	stopsound();
	typingslow.play();
});

$('.buttontypewriter').click(function(){
	stopsound();
	typewriter.play();
});

$('.buttonthanksobama').click(function(){
	stopsound();
	thanksobama.play();
});

$('.buttonrubberduck').click(function(){
	stopsound();
	rubberduck.play();
})

$('.buttonmeow').click(function(){
	stopsound();
	meow.play();
})

$('.buttonjake').click(function(){
	stopsound();
	jake.play();
})

$('.buttonmathematical').click(function(){
	stopsound();
	mathematical.play();
})

$('.buttondragonroar').click(function(){
	stopsound();
	dragonroar.play();
})

//functions and event listeners for the whole document
$('#uparrow').click(function(){
	$("html, body").animate({ scrollTop: 0 }, "slow");
})

var playswoosh = function(){
	stopsound();
	swoosh.play();
}

var buttonclickajax = function(){
	if(!geddanbackground){
		var value = this.value;
		custom = value;
		getgifs();
	}
	else{
		stopsound();
		return;
	}
}

var fadeout = function(){
	var changeImg = $(this).children().eq(0).children().eq(0);
	var stillimage = changeImg.attr('data-still');
	changeImg.attr("src",""+stillimage+"").css('filter', 'brightness(50%)');
}

var fadein = function(){
	
	var changeImg = $(this).children().eq(0).children().eq(0);
	var originalimage = changeImg.attr('data-original');
	changeImg.attr("src",""+originalimage+"").css('filter', 'brightness(100%)');
}

var stoplink = function(event){
	if(geddanbackground){
	event.preventDefault();
	}
}

$(document).on("click", "a", stoplink);
$(document).on("click", ".buttonswoosh", playswoosh);
$(document).on("click", ".buttonclick", buttonclickajax);
$(document).on("mouseover", ".fadeinout", fadeout);
$(document).on("mouseout", ".fadeinout", fadein);
//end event listeners for the whole document

//boolean for stopping the page from doing multiple paginations at once
var paginate = true;
var paginatetoggle = function(){
	paginate=true;
}

//infinite scroll flag based on scroll location
$(window).scroll(function () {
	if(!geddanbackground){
		if ($(window).scrollTop() >= $(document).height() - $(window).height() - 1500) {
			if(paginate){
				paginate=false;
				console.log('pagination');
				getgifspagination();
				setTimeout(paginatetoggle, 1000);
			}
			else{
				console.log('only one pagination plze');
				return;
			}
		}
	}
	else{
		return;
	}
});
//end infinite scroll flag