User={};

g_domain="http://127.0.0.1:1337/";//"http://shenkartripper.herokuapp.com/";


//hashtable for variables in english
var hashtable = {};
hashtable.trip_with_animals = "טיול עם בע\"ח";
hashtable.trip_with_road = "מסלול סלול";
hashtable.trip_for_children = "מותאם לילדים";
hashtable.trip_with_watter = "טיול עם מקורות מים";
hashtable.trip_for_night = "טיול ליילי";
hashtable.trip_for_day = "טיול יומי";
hashtable.trip_with_bicycle = "טיול עם אופניים";
hashtable.trip_with_jeep = "טיול ג'יפים";
hashtable.light_trip = "קל";
hashtable.medium_trip = "בינוני";
hashtable.hard_trip = "קשה";
hashtable.tel_aviv = "איזור מרכז וגוש דן";
hashtable.south = "איזור דרום";
hashtable.north = "איזור צפון";
var accountCounter=0;
var favoriteFlag=0;
var favoriteFlagList=0;
mapPoint={};
g_trip={};
g_ListTrip=[];
var filter = [];
var clickedCharachters = [];
var tripsAfterCharachters = [];
var date={};
var point1={},point2={} ;
point2.lng = 34;
point2.lat = 32;
var r=0;
var isInDdistance;
var t1 =  32.03952466510527;
var t2 = 34.83763210941106;
edit=false;
var count=1;
var tripCharacters = [];
var shareScheduleWithFriends = [];
var num =0;

navigator.geolocation.getCurrentPosition(function(position) {
		//Get Latitude From Geolocation API
		point1.lat = position.coords.latitude;
		//Get Longitude From Geolocation API
		t1 = parseFloat(point1.lat);
		console.log(point1.lat);
		point1.lng= position.coords.longitude;
		console.log(point1.lng);
		t2 = parseFloat(point1.lng)
		//Define New Google Map With Lat / Lon
		mapPoint.lat=point1.lat;
		mapPoint.lng=point1.lng;
	});

$(document).ready(function(){
	

	$.ajax({
		type: "get",
    	url: g_domain+"getTripCharachters",// where you wanna post
    	dataType: "json",
    	error: function(jqXHR, textStatus, errorMessage) {
    		console.log(errorMessage)
    	},
    	success: function(data) {
    	// console.log("update success to add to the favorite");
    	console.log(data)
    	$.each(data, function(i, val){
    		$.each(val.trip_charachters, function(i, val){
    			tripCharacters.push(val.name);
    			// console.log(val.name)

    		})
    	});
    	appendTripCharachters();
    }
});  
    //  1.tel_aviv 2. north 3. south 
    var locations={}


    $('input:radio[name=area]').click(function(){
    	console.log($(this).val());	
    	var tempLocation = $(this).val();
    	if(tempLocation=="tel_aviv"){
    		var tel_aviv=[32.020593632526015,34.83983516693115];
    		locations=tel_aviv;
    	}else if(tempLocation=="north"){
    		var north = [32.86430452355366,35.42211055755615];
    		locations=north;
    	}else{
    		var south=[31.195769601269923,34.957380294799805];
    		locations=south;			
    	}
    	console.log(locations[0])
    	initMap(locations[0],locations[1]);
    });
    initMap(32.020593632526015,34.83983516693115);


    initDatepicker();


        $('#info').readmore({
      moreLink: '<a href="#">Usage, examples, and options</a>',
      collapsedHeight: 384,
      afterToggle: function(trigger, element, expanded) {
        if(! expanded) { // The "Close" link was clicked
          $('html, body').animate({scrollTop: $(element).offset().top}, {duration: 100});
        }
      }
    });

   


	// border-bottom: 5px solid #EED53D;
			//Use HTML5 Geolocation API To Get Current Position


			/********TimeLine*********/
	// $(function(){
	// 	$().timelinr({
	// 		arrowKeys: 'true'
	// 	})
	// });

$('#us3').locationpicker({
	location: {latitude: t1, longitude: t2 },
	radius: 3000,
	inputBinding: {
	        // latitudeInput: $('#us3-lat'),
	        // longitudeInput: $('#us3-lon'),
	        radiusInput: $('#us3-radius'),
	        //locationNameInput: $('#us3-address')
	    },
	    enableAutocomplete: true,
	    
	});
console.log(t1 + t2)
$('#us6-dialog').on('shown.bs.modal', function() {
	$('#us3').locationpicker('autosize');
});

if ($(window).width() < 767) {
	console.log("in mobile")
	$('#nav-panel').css("display" , "block");
	$('.nav').css("display" , "none");
	$('#menubtn').css("display", "inline-block");
	$('#filter').css("display", "none");
	$('#buttonRadius').css("display", "block")
}

$("#shareSchedule").emailautocomplete({
		suggClass: "custom-classname", //default: "eac-sugg". your custom classname (optional)
		// domains: ["example.com"] //additional domains (optional)
	});

$('#shareEmail').emailautocomplete({
		suggClass: "custom-classname", //default: "eac-sugg". your custom classname (optional)
		// domains: ["example.com"] //additional domains (optional)
	});
var max_fields = 20;
	// debugger;

	//maximum input boxes allowed
	var outer_wrapper = $(".ingredients_wrap");
	var wrapper = $(".ingredients_i");
	var firstIngredient = $(".firstIngredient");
	wrapper.geocomplete();
	var x = 1;
	//$(firstIngredient).focus(function(e){ //on add input button click
	$(outer_wrapper).on("focus", ".firstIngredient", function(e) {//on add input button click
		e.preventDefault();
		console.log("focus " + x);
		if (x < max_fields) { //max input box allowed
			x++;
			$(this).off('focus');
			$(outer_wrapper).append('<div style="text-align: center;margin: auto;position: relative;align-content: center;"><input id="newChild' + x + '" class="ingredients_i gapper ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset newChild" style="text-align:center;margin:auto;width:100%" type="text" placeholder="אתר" name="ingredients[]"><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="imgUpload'+x+'" type="file" accept="image/*" onchange="showMyImage(this,'+x+')" name="file" class="image_i"><img id="thumbnil'+x+'" style="width:20%; margin-top:10px;"  src="" alt="image"/></div><a href="#" class="remove_field"> X </a></div>');	

		}
	});

	$(outer_wrapper).on("focus", ".newChild", function(e) {//on add input button click
		wrapper = $(".ingredients_i");
		wrapper.geocomplete();
		console.log(wrapper[wrapper.length-1]);
		console.log(wrapper[wrapper.length-1].id);
		if (this.id == wrapper[wrapper.length-1].id){				
			console.log("focus " + x);
			x++;

			$(outer_wrapper).append('<div style="text-align: center;margin: auto;position: relative;align-content: center;"><input id="newChild' + x + '" class="ingredients_i gapper ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset newChild" style="text-align:center;margin:auto;width:100%" type="text" placeholder="אתר" name="ingredients[]"><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="imgUpload'+x+'" type="file" accept="image/*" onchange="showMyImage(this,'+x+')" name="file" class="image_i"><img id="thumbnil'+x+'" style="width:20%; margin-top:10px;"  src="" alt="image"/><a href="#" class="remove_field"> X </a></div>');	
		}
	});		

	$(outer_wrapper).on("click", ".remove_field", function(e) {//on add input button click			
		e.preventDefault(); 
		$(this).parent('div').remove(); 
	});

	// $('.filter').click(function(){
	// 	// debugger;
	// 	console.log("in filter");
	// 	filter = [];
	// 	$('input[type="checkbox"]').each(function(value) {
	// 		if($(this).is(':checked')){
	// 			console.log($(this).attr('id'));
	// 			filter.push($(this).attr('id'));
	// 		}
	// 		else return;
	// 	});
	// 	console.log(filter);
	// 	updateResultByFilterBeforeArea();
	// });
$('#addFriendToSchedule').click(function(){
	if($('#shareSchedule').val()){
			// debugger
			shareScheduleWithFriends.push($('#shareSchedule').val());
			$('#shareSchedule').val("");
			console.log(shareScheduleWithFriends)
			console.log(User.tripPatners)
			console.log(g_ListTrip)
			if(!(_.contains(shareScheduleWithFriends, User.email))){
				console.log(shareScheduleWithFriends)
				shareScheduleWithFriends.push(User.email)
			}	
			console.log("sending email")
			$.ajax({
				type: "post",
	        url: g_domain+"updateScheduleParticipents",// where you wanna post
	        data:  {trips:g_ListTrip, sharedEmail:shareScheduleWithFriends, dateOfTrip : date},
	        dataType: 'json',
	        error: function(jqXHR, textStatus, errorMessage) {
	        	console.log(errorMessage)
	        },
	        success: function(data) {
	        	console.log("update success");
	        	updateSharedTrip();
	        }

	    })
		}	
		return
	})

$('.option li').click(function(){
	console.log("inside click")
	var i = $(this).parents('.select').attr('id');
	var v = $(this).children().text();
	var o = $(this).attr('id');
	$('#'+i+' .selected').attr('id',o);
	$('#'+i+' .selected').text(v);
});

$('#updateFriendsWithChanges').click(function(){
	console.log(g_ListTrip)
	if(!(_.contains(shareScheduleWithFriends, User.email))){
		console.log(shareScheduleWithFriends)
		shareScheduleWithFriends.push(User.email)
	}	

	if(shareScheduleWithFriends.length>0){
		console.log("sending email")
		$.ajax({
			type: "post",
	        url: g_domain+"updateScheduleParticipents",// where you wanna post
	        data:  {trips:g_ListTrip, sharedEmail:shareScheduleWithFriends, dateOfTrip : date},
	        dataType: 'json',
	        error: function(jqXHR, textStatus, errorMessage) {
	        	console.log(errorMessage)


	        },
	        success: function(data) {
	        	console.log("update success");
	        }

	    })
	}
})

$('#who_are_you_going_with').change(function(){
	console.log("in filter");
	$('input[type="checkbox"]').each(function(value) {
		if($(this).is(':checked')){
			checkIfInArray($(this).attr('id'));
		}
		});
	checkIfHasTripKind();
	checkIfHasDificullty();
	checkIfHasArea();
		// var dificullty = $('#dificullty').attr('id');
		// console.log(dificullty)
		console.log(filter);
	// 	updateResultByFilterBeforeArea();
})

$("#private_trip").click(function(){
	console.log("privateTrip")
		// $('#isPrivate').append('<label id="addUsers">הוסף משתמשים אליהם יפורסם הטיול:<br><textarea placeholder="example@gmail.com" type="text" id="shareEmail" name="shareEmail" >');
		
		$('#isPrivate').append('<label id="addUsers" style=" float:right";>שתף את פנינת הטבע עם חברייך:<br><input id="shareEmail"  name="email" type="email" required>');
		$('#isPrivate').append('<a id="addUser" href="#"> הוסף עוד חבר<a>')
		$('#isPrivate').append('<p id="usersList"><p>')
	})

$('#public_trip').click(function(){
	$('#addUsers').hide();
})

});
function initMap(l1,l2){
	var mapOptions = {
		center: new google.maps.LatLng(	l1, l2),
		zoom: 9,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var infoWindow = new google.maps.InfoWindow();
	var latlngbounds = new google.maps.LatLngBounds();
	var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);

	google.maps.event.addListener(map, 'click', function (e) {
		alert("המיקום נשמר");
		console.log("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng())
		mapPoint.lat=e.latLng.lat();
		mapPoint.lng=e.latLng.lng();
	});
}
$(document).on('click','#addUser',function(){
	console.log(tempEmailUser)
	var tempEmailUser = $('#shareEmail').val();
	$('#shareEmail').val("");
	console.log(tempEmailUser)
	$('#usersList').append(tempEmailUser+" ");
});

$("#home").on({
	mouseenter: function () {
		console.log("hover LI")
        //stuff to do on mouse enter
    },
    mouseleave: function () {
        //stuff to do on mouse leave
    }
});

function checkIfHasTripKind(){
	$('#trip_kind li').each(function(value) {
		if($(this).is(':checked')){
			checkIfInArray($(this).attr('id'));
		}
	});
	console.log(filter)
}

function checkIfHasDificullty(){
	
var dificullty = $("#dificullty").children().hasClass('selected');
	if(dificullty){
		checkIfInArray(dificullty)
	}
	return
	// console.log(dificullty)
}

function checkIfHasArea(){
	var area = $("#area").children().hasClass('selected');
	if(area){
		console.log("area ", area)	
	}
	return
}


$(document).on('mouseenter',"#home", function(){
	$("#home a img").attr("src", "images/search_hover.png");
});
$(document).on('mouseleave',"#home", function(){
	$("#home a img").attr("src", "images/search.png");
});
$(document).on('mouseenter',"#showTrips", function(){
	$("#showTrips a img").attr("src", "images/account_hover.png");
});
$(document).on('mouseleave',"#showTrips", function(){
	$("#showTrips a img").attr("src", "images/account.png");
});
$(document).on('mouseenter',"#moveToFavorite", function(){
	$("#moveToFavorite a img").attr("src", "images/favorites_hover.png");
});
$(document).on('mouseleave',"#moveToFavorite", function(){
	$("#moveToFavorite a img").attr("src", "images/favorites.png");
});
$(document).on('mouseenter',"#mySchedule", function(){
	$("#mySchedule a img").attr("src", "images/my_track_hover.png");
});
$(document).on('mouseleave',"#mySchedule", function(){
	$("#mySchedule a img").attr("src", "images/my_track.png");
});
$(document).on('mouseenter',"#addTrip", function(){
	$("#addTrip a img").attr("src", "images/add_hover.png");
});
$(document).on('mouseleave',"#addTrip", function(){
	$("#addTrip a img").attr("src", "images/add.png");
});
function checkIfInArray(filterToCheck){
	console.log(filterToCheck, filter)
	var found = jQuery.inArray(filterToCheck, filter);
	if (found >= 0) {
    // Element was found, remove it.
    return
} else {
    // Element was not found, add it.
    filter.push(filterToCheck);
}
}
// var arr=["#addTrip","#mySchedule","#moveToFavorite","#showTrips","#home"];
// $(document).on('click','.nav li',function(){
// 	console.log("li clicked")
// 	var me = $(this);

// 	$.each(arr, function(index,val){
// 		console.log(val)
// 		if($(val).hasClass('ui-btn-active'))
// 			console.log(val)
// 			$(val).removeClass('ui-btn-active');
// 	});
// 	$(me).addClass('ui-btn-active');
// })
	// $('.nav li').click(function(){
		
	// });
// function myLocation() {
// 	//If HTML5 Geolocation Is Supported In This Browser
// 	if (navigator.geolocation) {
// 		//Use HTML5 Geolocation API To Get Current Position
// 		navigator.geolocation.getCurrentPosition(function(position) {
// 			//Get Latitude From Geolocation API
// 			 point1.lat = position.coords.latitude;
// 			//Get Longitude From Geolocation API
// 			console.log(point1.lat);
// 			 point1.lng= position.coords.longitude;
// 			console.log(point1.lng);
// 			//Define New Google Map With Lat / Lon
// 		});
// 	} else {
// 		//Otherwise - Gracefully Fall Back If Not Supported... Probably Best Not To Use A JS Alert Though :)
// 		alert("Geolocation API is not supported in your browser.");
// 	}
// }

function distance(lat1,lon1,lat2,lon2) {
	var R = 6371; // km (change this constant to get miles)
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
	Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	if (d>1) return Math.round(d);
	else if (d<=1) return Math.round(d*1000);
	return d;
}
//********** date *************
function initDatepicker(){
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

	var checkin = $('#dpd1').datepicker({
		onRender: function(date) {
			return date.valueOf() < now.valueOf() ? 'disabled' : '';

		}
	}).on('changeDate', function(ev) {
		if (ev.date.valueOf() > checkout.date.valueOf()) {
			var newDate = new Date(ev.date)
			newDate.setDate(newDate.getDate() + 1);
			checkout.setValue(newDate);
		}
		checkin.hide();
		$('#dpd2')[0].focus();
	}).data('datepicker');
	var checkout = $('#dpd2').datepicker({
		onRender: function(date) {
			return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function(ev) {
		checkout.hide();
		date.checkInTime=formatDate(checkin.viewDate, "MM d, y");
		date.checkOutTime=formatDate(checkout.viewDate,"MM d, y");
		console.log(date);
	}).data('datepicker');


}
var MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var DAY_NAMES=new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat');
function LZ(x) {return(x<0||x>9?"":"0")+x}
// ------------------------------------------------------------------
// formatDate (date_object, format)
// Returns a date in the output format specified.
// The format string uses the same abbreviations as in getDateFromFormat()
// ------------------------------------------------------------------
function formatDate(date,format) {
	format=format+"";
	var result="";
	var i_format=0;
	var c="";
	var token="";
	var y=date.getYear()+"";
	var M=date.getMonth()+1;
	var d=date.getDate();
	var E=date.getDay();
	var H=date.getHours();
	var m=date.getMinutes();
	var s=date.getSeconds();
	var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
	// Convert real date parts into formatted versions
	var value=new Object();
	if (y.length < 4) {y=""+(y-0+1900);}
	value["y"]=""+y;
	value["yyyy"]=y;
	value["yy"]=y.substring(2,4);
	value["M"]=M;
	value["MM"]=LZ(M);
	value["MMM"]=MONTH_NAMES[M-1];
	value["NNN"]=MONTH_NAMES[M+11];
	value["d"]=d;
	value["dd"]=LZ(d);
	value["E"]=DAY_NAMES[E+7];
	value["EE"]=DAY_NAMES[E];
	value["H"]=H;
	value["HH"]=LZ(H);
	if (H==0){value["h"]=12;}
	else if (H>12){value["h"]=H-12;}
	else {value["h"]=H;}
	value["hh"]=LZ(value["h"]);
	if (H>11){value["K"]=H-12;} else {value["K"]=H;}
	value["k"]=H+1;
	value["KK"]=LZ(value["K"]);
	value["kk"]=LZ(value["k"]);
	if (H > 11) { value["a"]="PM"; }
	else { value["a"]="AM"; }
	value["m"]=m;
	value["mm"]=LZ(m);
	value["s"]=s;
	value["ss"]=LZ(s);
	while (i_format < format.length) {
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
		}
		if (value[token] != null) { result=result + value[token]; }
		else { result=result + token; }
	}
	return result;
}

function showMyImage(fileInput,x) {
	var files = fileInput.files;
	for (var i = 0; i < files.length; i++) {           
		var file = files[i];
		var imageType = /image.*/;     
		if (!file.type.match(imageType)) {
			continue;
		}           
		var img=document.getElementById("thumbnil"+x);            
		img.file = file;    
		var reader = new FileReader();
		reader.onload = (function(aImg) { 
			return function(e) { 
				aImg.src = e.target.result; 
			}; 
		})(img);
		reader.readAsDataURL(file);
	}    
}

$(document).on("submit", '#uploadImgForm', function(e){
	e.preventDefault();
	console.log("bla bla", this)
	var form = new FormData(this);
	form.append("tripId", g_trip._id);
// debugger
$.ajax({
	type : "post",
	url: g_domain+"uploadImageToTrip",
	data : form,
			// dataType : "json",
			contentType: false,
			processData:false,
			error: function(jqXHR, textStatus, errorMessage) {
				console.log(errorMessage)


			},
			success: function(data) {
				console.log("img uploaded")      	
			}
		});
});

function uploadImgFromTrip(fileInput) {
	console.log("ins")
	console.log("file", fileInput)
	$('#uploadImgForm').submit();
}

//panel
$(document).on("click", '#nav ', function(e) {
	$("[data-role=panel]").panel("open")
});

$(function() {
	$("[data-role=panel]").enhanceWithin().panel();
});

$(document).on("pageinit", "[data-role='page']", function(event) {
	$("[data-role='panel']").on("panelopen", function(event, ui) {
		$('body').css("overflow", "hidden").on("touchmove", false);
	});

	$("[data-role='panel']").on("panelclose", function(event, ui) {
		$('body').css("overflow", "auto").off("touchmove");
	});
	
	function stopScroll() {
		return false;
	}
});

// $(document).on('click','.listResultTrip',function(){
	

// 	var result = $(this).attr('id');
// 	$.ajax({
// 		type: "post",
//         url: g_domain+"getTripById",// where you wanna post
//         data:  {id:result},
//         dataType: "json",
//         error: function(jqXHR, textStatus, errorMessage) {
//         	console.log(errorMessage)


//         },
//         success: function(data) {
//         	g_trip=data;
//         	displayFullTrip(data);

//         }
//     });
// 	moveToTripPage();
// });



function displayFullTrip(data){
	console.log(data)
	console.log("id: ", data._id)
	$('.Trip').empty();
	$('.Trip').append('<form action="#" method="post" id="uploadImgForm"><input id="imgUpload" type="file" accept="image/*" onchange="uploadImgFromTrip(this)"' +
		'name="file" class="image_i"></div><input type="submit" value="submit" style="visibility : hidden"/>  </form>')
	// $('.Trip').append('<input id="imgUpload" type="file" accept="image/*" onchange="uploadImgFromTrip(this)" name="file" class="image_i"><img id="showImage" style="width:20%; margin-top:10px;"  src="" alt="image"/></div></form>');
	// $('.Trip').append('</form>')
	if(favoriteFlag==1){
		$('.Trip').append("<a id='editFavorite'>ערוך טיול כרצונך</a> </br>");
		favoriteFlag=0;
	}
	$('.Trip').append("<h1>"+g_trip.trip_name+"</h1>");
	$('.Trip').append("<ul><li>"+g_trip.trip_charachters[0]+"</li><li class='plus'> + </li><li>"+g_trip.trip_charachters[1] +"</li></ul>");
	var divImg = $('<div>');
	divImg.attr("id","tripImg").css("background-image","url("+g_trip.tripSites[0].img+")")
	$('.Trip').append(divImg);

	var articleDes=$('<article>');
	articleDes.append("<h4>תאור הטיול</h4>");
	articleDes.append(g_trip.trip_description);
	var aside = $('<aside>').addClass('asideFilter')
	$.each(g_trip.trip_filter, function(i,v){
		aside.append(hashtable[v])
		aside.append(' | ')
	});

	$('.Trip').append(articleDes);
	$('.Trip').append(aside);

	var ulImg =$ ('<ul>').addClass('ulImages');
	var liImgF= $('<li>')
	var liImgS= $('<li>')
	var liImgL= $('<li>')
	var imgL="";
	if(g_trip.rate.userEmail.indexOf(User.email) >-1)
	{
		console.log(User.email,g_trip.rate.userEmail)
		imgL= $('<img>')
		imgL.attr('src', 'images/dislike.png').addClass("topImg selectedImg");
	}
	else{
		imgL= $('<img>')
		imgL.attr('src', 'images/like.png').addClass('topImg');
	}
	var spanLike = $('<span>').addClass('countLike').html(g_trip.rate.value)
	// $('.Trip').append("<span class='countLike'>" + g_trip.rate.value + "</span>");

	var imgF="";
	var imgS="";
	var favorites= []
	$.each(User.favorites, function(i,value){
		favorites.push(value._id)
	})
	if (favorites.indexOf(g_trip._id) > -1)
	{
		imgF = $('<img>')
		imgF.attr({'src':'images/remove_favorites.png'}).addClass('topImgStar selectedImgStar'); 
	}else{
		imgF = $('<img>')
		imgF.attr({'src':'images/add_favorites.png'}).addClass('topImgStar'); 
	}
	var schedules= []
	$.each(User.schedule, function(i,value){
		schedules.push(value._id)
	})
	if (schedules.indexOf(g_trip._id) > -1) {
		imgS = $('<img>')
		imgS.attr({'src':'images/remove_track.png'}).addClass('topImgSchedule selectedImgSchedule'); 
	}else{
		imgS = $('<img>')
		imgS.attr({'src':'images/add_track.png'}).addClass('topImgSchedule'); 
	}
	liImgF.append(imgF);
	liImgS.append(imgS);		
	liImgL.append(imgL);
	liImgL.append(spanLike);
	ulImg.append(liImgF);
	ulImg.append(liImgS);
	ulImg.append(liImgL);
	$('.Trip').append(ulImg);

	var timeline = $('<div>');
	var h2 = $('<h2>').html('אתרי הפלייליסט').addClass('sitesTitle');
	 // timeline.append(h2)
	 timeline.attr({"id":"timeline"})
	 var ulSites = $('<ul>');
	 ulSites.attr({"id":"ulTimeLine"})
	 $.each(g_trip.tripSites , function(index,val){
	 	var li = $('<li>');
	 	var img = $('<img>');
	 	var span = $('<span>');
	 	span.html(val.siteName);
	 	img.attr({"src":val.img, "width":50, "height":50});
	 	li.append(span)
	 	li.append(img)

	 	ulSites.append(li);
	 });
	 timeline.append(ulSites);
	 $('.Trip').append(h2)
	 $('.Trip').append(timeline)
	 var meImg="";
	 var meSpan="";

	 $('#ulTimeLine li').hover(function(){
	 	console.log("hover");
	 	$(this).css({"top":"0px","border":"1px solid #000000","padding":"12px","background-color":"#ffffff","border-radius":"30px"});
	 	meSpan = $(this).children('span');
	 	meSpan.css({"font-size":"35px"});
	 	meImg = $(this).children('img');
	 	meImg.attr({"width":125,"height":125}).css({"border-radius":"0px","width":"auto"});
	 }
	 , function(){
	 	$(this).css({"top":"68px","border":"none","background-color":"transparent","padding":"0px"});
	 	meSpan = $(this).children('span');
	 	meSpan.css("font-size","20px");
	 	meImg = $(this).children('img');
	 	meImg.attr({"width":50,"height":50}).css({"border-radius":"50px",  "width": "50px"});
	 });
	 num = 0;
	 var commentSection = $( '<section>').attr("id","sectionComment")
	 var ul = $('<ul>').addClass("commentList");
	 $.each(g_trip.comments, function(index,val){
	 	var li = $('<li>');
	 	var img = $('<img>');
	 	var p = $('<h5>');
	 	img.attr({"src":val.userImg});
	 	p.html((index+1)+". "+val.comment);
	 	li.append(img);
	 	li.append(p);
	 	ul.append(li);
	 	num++;
	 });



	 var h3= $('<h3>').html("לפלייליסט זה התפרסמו "+num+" תגובות");
	 var img = $('<img>').attr({"src":User.image,"id":"myImg"});
	 var h4 = $('<h4>').html("הוסף תגובה חדשה").attr("id","titleComment");


	 var textarea = $('textarea').attr({"type":"text","name":"comment","id":"comment"}).css({"display":"none"})
	// $('.Trip').append("<textarea type='text' name='comment' id='comment style'display:none'></textarea>");
	var aSend= $('<a>').attr({"id":"submitComment"}).css({"display":"none"}).html("שלח")
	// $('.Trip').append("<a id='submitComment' style'display:none'>שלח תגובה</a> </br>");




	commentSection.append(h3);
	commentSection.append(img);
	commentSection.append(h4);
	commentSection.append(textarea);
	commentSection.append(aSend);
	commentSection.append(ul)


	$('.Trip').append(commentSection);
	$('#titleComment').click(function(){
		$('#comment').show();
		$('#submitComment').show();
	});
	// var article = "<h3>תגובות המטיילים</h3><article id='tripComments'>";
	// $.each(g_trip.comments,function(i,val){
	// 	console.log("comment");
	// 	article+=val;
	// 	article+="</br>";
	// });
	// article+="</article>"
	// $('.Trip').append(article);
}


$(document).on("click", '.topImgScheduleList', function() {
	// if (!User.email) {
	// 	alert("אנא התחבר למערכת")
	// 	return;
	// }
	if ($(this).hasClass("selectedImgSchedule")) {
		$(this).removeClass("selectedImgSchedule").attr({'src':'images/add_track.png'});
		updateScheduleFromList(false, $(this).parent().attr('id'));

	} else {
		$(this).addClass("selectedImgSchedule").attr({'src':'images/remove_track.png'});
		updateScheduleFromList(true, $(this).parent().attr('id'));
	}
});
$(document).on("click", '.topImgStarList', function() {
	// if (!User.email) {
	// 	alert("אנא התחבר למערכת")
	// 	return;
	// }
	if ($(this).hasClass("selectedImgStar")) {
		$(this).removeClass("selectedImgStar").attr({'src':'images/add_favorites.png'});
		updateFavoritesFromFavoritesList(false, $(this).parent().attr('id'));

	} else {
		$(this).addClass("selectedImgStar").attr({'src':'images/remove_favorites.png'});
		updateFavoritesFromFavoritesList(true, $(this).parent().attr('id'));
	}
});
$(document).on("click", '.topImgSchedule', function() {
	// if (!User.email) {
	// 	alert("אנא התחבר למערכת")
	// 	return;
	// }
	if ($(this).hasClass("selectedImgSchedule")) {
		$(this).removeClass("selectedImgSchedule").attr({'src':'images/add_track.png'});
		updateSchedule(false);

	} else {
		$(this).addClass("selectedImgSchedule").attr({'src':'images/remove_track.png'});
		updateSchedule(true);
	}
});
$(document).on("click", '.topImgStar', function() {
	// if (!User.email) {
	// 	alert("אנא התחבר למערכת")
	// 	return;
	// }
	if ($(this).hasClass("selectedImgStar")) {
		$(this).removeClass("selectedImgStar").attr({'src':'images/add_favorites.png'});
		updateFavorites(false);

	} else {
		$(this).addClass("selectedImgStar").attr({'src':'images/remove_favorites.png'});
		updateFavorites(true);
	}
});
function updateFavoritesFromFavoritesList(isFavorite, tripId){
	// var result = $(this).parent().attr('id');
	console.log(isFavorite, tripId)
	$.ajax({
		type: "post",
    url: g_domain+"getTripById",// where you wanna post
    data:  {id:tripId},
    dataType: "json",
    error: function(jqXHR, textStatus, errorMessage) {
    	console.log(errorMessage)
    },
    success: function(data) {
    	g_trip=data;
    	console.log(g_trip.tripSites)
    	$.ajax({
    		type: "post",
        url: g_domain+"updateFavoirte",// where you wanna post
        data:  {trip:{
        	_id:g_trip._id,
        	trip_name:g_trip.trip_name,
        	area: g_trip.area,
        	tripSites : g_trip.tripSites        	
        }
        ,userId:User.email,
        isFavorite:isFavorite},
        dataType: "json",
        error: function(jqXHR, textStatus, errorMessage) {
        	console.log(errorMessage)


        },
        success: function(data) {
        	$( "#addingToSchedule" ).popup( "close" );
        }
    });
    	
    }
});
}

function updateFavorites (bool){
	console.log(bool)
	$.ajax({
		type: "post",
        url: g_domain+"updateFavoirte",// where you wanna post
        data:  {trip:{
        	_id:g_trip._id,
        	trip_name:g_trip.trip_name,
        	area:g_trip.area,
        	tripSites : g_trip.tripSites          	
        }
        ,userId:User.email,
        isFavorite:bool},
        dataType: "json",
        error: function(jqXHR, textStatus, errorMessage) {
        	console.log(errorMessage)


        },
        success: function(data) {
        	console.log("update success");
        }
    });
};
$(document).on("click", '.topImg', function() {
	// if (!g_user.email) {
	// 	alert("אנא התחבר למערכת")
	// 	return;
	// }
	if ($(this).hasClass("selectedImg")) {
		temp_rate=updateRate(0);
		console.log(temp_rate)
		$(this).removeClass("selectedImg").attr("src","images/like.png");
		currentValue = $(".countLike").html();
		newValue = parseInt(currentValue, 10);
		newValue = parseInt(newValue, 10) - 1;
		$(".countLike").html(newValue);
		// updateRate(0);
		
	} else {
		temp_rate=updateRate(1);
		console.log(temp_rate)
		$(this).addClass("selectedImg").attr("src","images/dislike.png");
		currentValue = $(".countLike").html();
		newValue = parseInt(currentValue, 10);
		newValue = parseInt(newValue, 10) + 1;
		$(".countLike").html(newValue);
		
	}
});
function updateRate(value){
	$.ajax({
		type : "post",
		url : g_domain+"updateRate",
		data : {
			value : value,
			tripId : g_trip._id,
			userEmail :User.email
		},
		dataType : 'json',
		success : function(data) {
			console.log("update success",data.status);
			if (data.status==2) {
				alert("כבר עשית לייק")
			}
			
		},
		error : function(objRequest, errortype) {
			console.log(errortype);
			console.log("change to error func");
		}
	});
}

$(document).on('click','#submitComment', function(){
	var comment = $('#comment').val();
	g_trip.comments.push(User.name + " : " + comment)
	$('#comment').val("");
	console.log(comment, User, g_trip);

	$.ajax({
		type: "post",
        url: g_domain+"addComment",// where you wanna post
        data:  {user:User,
        	trip_id:g_trip._id,
        	comment:comment
        },
        dataType: "json",
        error: function(jqXHR, textStatus, errorMessage) {
        	console.log(errorMessage)


        },
        success: function(data) {
        	console.log("add comment success");
        	var ul = $('.commentList');
        	var li = $('<li>');
        	var img = $('<img>');
        	var h5 = $('<h5>');
        	img.attr({"src" : User.image});
        	h5.html((num+1)+". "+comment);
        	li.append(img);
        	li.append(h5);
        	ul.append(li);        	
		// $('#tripComments').append(User.name + " : " + comment);
		console.log(data)
	}
});

});
$(document).on('click','#chatComment', function(){
	var chat = $('#chat').val();
	console.log()
//	g_trip.comments.push(User.name + " : " + comment)
$('#chat').val("");
console.log(chat, User, g_trip);

$.ajax({
	type: "post",
        url: g_domain+"addChatComment",// where you wanna post
        data:  {user:User,
        	chat:chat
        },
        dataType: "json",
        error: function(jqXHR, textStatus, errorMessage) {
        	console.log(errorMessage)


        },
        success: function(data) {
        	console.log("add comment success");
        	var ul = $('.commentList');
        	var li = $('<li>');
        	var img = $('<img>');
        	var h5 = $('<h5>');
        	img.attr({"src" : User.image});
        	h5.html((num+1)+". "+chat);
        	li.append(img);
        	li.append(h5);
        	ul.append(li);        	
		// $('#tripComments').append(User.name + " : " + comment);
		console.log(data)
	}
});

});

$(document).on('click' ,'.saveSchedule',function(){


	$.ajax({
		type: "post",
        url: g_domain+"saveTimeSchedule",// where you wanna post
        data:  {userId:User.email,
        	tripTime:date},
        	ContentType: 'application/json', 

        	error: function(jqXHR, textStatus, errorMessage) {
        		console.log(errorMessage)


        	},
        	success: function(data) {
        		console.log("update schedule success");
        	}
        });

});

function updateSchedule (bool){
	if(bool){
		$.ajax({
			type: "post",
	    url: g_domain+"updateMySchedule",// where you wanna post
	    data:  {trip:g_trip
	    	,userId:User.email},
	    	dataType: "json",
	    	error: function(jqXHR, textStatus, errorMessage) {
	    		console.log(errorMessage)


	    	},
	    	success: function(data) {
	    		console.log("update success");
	    	}
	    });
	}
	else{
		$.ajax({
			type: "post",
    	url: g_domain+"removeFromSchedule",// where you wanna post
    	data:  {tripId:g_trip._id, userEmail:User.email},
    	// ContentType: 'application/json',
    	dataType : "json",
    	error: function(jqXHR, textStatus, errorMessage) {
    		console.log(errorMessage)


    	},
    	success: function(data) {
    		console.log("removed from schedule")
    	}
    });
	}
}

function updateScheduleFromList (bool, tripId){
	console.log(bool, tripId)
	if(bool){
		$.ajax({
			type: "post",
    url: g_domain+"getTripById",// where you wanna post
    data:  {id:tripId},
    dataType: "json",
    error: function(jqXHR, textStatus, errorMessage) {
    	console.log(errorMessage)
    },
    success : function(data){
    	g_trip=data; 
    	console.log(g_trip)
    	$.ajax({
    		type: "post",
    url: g_domain+"updateMySchedule",// where you wanna post
    data:  {trip:g_trip
    	,userId:User.email},
    	dataType: "json",
    	error: function(jqXHR, textStatus, errorMessage) {
    		console.log(errorMessage)


    	},
    	success: function(data) {
    		console.log("update success");
    	}
    });
    }
});
	}
	else{
		console.log("global trip id ", g_trip._id)
		$.ajax({
			type: "post",
    	url: g_domain+"removeFromSchedule",// where you wanna post
    	data:  {tripId:tripId, userEmail:User.email},
    	// ContentType: 'application/json',
    	dataType : "json",
    	error: function(jqXHR, textStatus, errorMessage) {
    		console.log(errorMessage)


    	},
    	success: function(data) {
    		console.log("removed from schedule")
    	}
    });
	}

};

$(document).on('click','#mySchedule',function(){
	if(!User.email)
	{
		alert("רק משתמשים רשומים יכולים לצפות בעמוד זה")
	}else{

		$.ajax({
			type: "post",
	        url: g_domain+"getUserSchedule",// where you wanna post
	        data:  {email:User.email},
	        dataType: "json",
	        error: function(jqXHR, textStatus, errorMessage) {
	        	console.log(errorMessage)


	        },
	        success: function(data) {
	        	console.log(data.schedule)
	        	displayListScheduleTrip(data.schedule);
	        }
	    });

		moveToSchedule();
	}
});

function displayListScheduleTrip(data){
	console.log("data " + data)
	$('#resultTrip ul').empty();
	$('#friendsemail').empty()
	g_ListTrip=data;
	shareScheduleWithFriends = User.tripPatners;
	$('#dpd1').val(User.tripScheduleTime.checkInTime.substring(0, User.tripScheduleTime.checkInTime.length-14));
	$('#dpd2').val(User.tripScheduleTime.checkOutTime.substring(0, User.tripScheduleTime.checkOutTime.length-14));
	// for (i in data) {
	// 	var tripResult = '<li id='+data[i]._id+' class="listScheduleTrip trip" ><span class="titelName">' + data[i].trip_name + '</span>' + ' מיקום: ' + data[i].address +'</li>';
	// 	$('#resultTrip .displayTrip').append(tripResult);
	// };
	$.each(User.tripPatners, function(i, val){
		console.log(val)
		$('#friendsemail').append("<div id='emailNum" + i + "'>" + val + "</div>");
		$('#emailNum' + i).append("<button id='deleteMailFromSchedule'> &#10006 </button>");
	})
	$('.titelNameAccount').html('המסלול שלי')	
	// var divUser = $('<div>').addClass('userDetailes');
	$('.userDetailes').empty();
	if (User) {
		// var divUser = $('<div>').addClass('userDetailes');
		var spanUser = $('<span>').html(User.name).addClass('nameUser');
		var imgUser = $('<img>').attr("src",User.image).addClass('imgUser');
		$('.userDetailes').append(imgUser)
		$('.userDetailes').append(spanUser)
	}

	var ul = $('#ulTimeLineSchedule');
	ul.empty();
	$.each(g_ListTrip, function (index,val){
		var li = $('<li>').addClass('liImeLine').attr("id",val._id);
		var span = $('<span>').addClass('moveToTrip');
		var img = $('<img>').addClass('moveToTrip');
		
		span.html(val.trip_name);
		img.attr({"src":val.tripSites[0].img, "width":50, "height":50})


		li.append(span);
		li.append(img);
		var h5 =$('<h5>').html( hashtable[val.area]).addClass('locH5Schedule').css("display","none");
		li.append(h5);
		var ulSmall =$('<dl>').addClass("smallULSchedule").css("display","none");
		$.each(val.trip_filter,function(i,v){
			var liSmall = $('<dt>')
			var imgVi= $('<img>').attr({"src":"images/vi.png"}).addClass("viSchedule");
			liSmall.append(imgVi);
			liSmall.append( hashtable[v])
			ulSmall.append(liSmall)
		});
		li.append(ulSmall);
		var aTrip =$('<a>').attr({"id":"remove_track","href":"#"}).addClass('remove_track').html("הסר מהמסלול שלי");
		li.append(aTrip);
		ul.append(li);
	});
	var meImg="";
	var meSpan="";
	var meArea="";
	var meUl="";
	var meA = "";
	$('.remove_track').click(function(){
		console.log($(this).parent().attr('id'))
		updateScheduleFromList(false,$(this).parent().attr('id'));
	});
	$('#ulTimeLineSchedule li').hover(function(){
		console.log("hover");
		$(this).css({"top":"0","border":"1px solid #000000","padding":"12px","background-color":"#ffffff","border-radius":"30px"});
		meSpan = $(this).children('span');
		meSpan.css({"font-size":"35px","float":"left","padding": "0px 10px 0 2px"});
		meImg = $(this).children('img');
		meImg.attr({"width":125,"height":125}).css({"border-radius":"0px","float":"right"});
		//$(this).attr({"width":100,"height":100})
		meArea = $(this).children('h5');
		meArea.css("display","block");
		meUl = $(this).children('dl');
		meUl.css("display","inline-block");
		meA = $(this).children('a');
		meA.css("display","inline-block")
	}
	, function(){
		$(this).css({"top":"68px","border":"none","background-color":"transparent","padding":"0px"});
		meSpan = $(this).children('span');
		meSpan.css({"font-size":"20px","float":"none","padding": "0"});
		
		//me=$(this).attr({"width":50,"height":50});
		//div.append(me)
		meImg = $(this).children('img');
		meImg.attr({"width":50,"height":50}).css({"border-radius":"50px","float":"none"});
		//$(this).attr({"width":50,"height":50});
		meArea = $(this).children('h5');
		meArea.css("display","none");
		meUl = $(this).children('dl');
		meUl.css("display","none");
		meA = $(this).children('a');
		meA.css("display","none")
	});

num = 0

	// var schedulePage= $('#myPageSchedule #content')
	
	var commentSection = $('#sectionComment').empty();
	var ul = $('<ul>').addClass("commentList");
	$.each(User.scheduleChat, function(index,val){
		var li = $('<li>');
		var img = $('<img>');
		var p = $('<h5>');
		img.attr({"src":val.userImg});
		p.html((index+1)+". "+val.comment);
		li.append(img);
		li.append(p);
		ul.append(li);
		num++;
	});
	


	var h3= $('<h3>').html("שוחח עם חבריך לפלייליסט ");
	var img = $('<img>').attr({"src":User.image,"id":"myImg"});
	var h4 = $('<h4>').html("הוסף תגובה חדשה").attr("id","titleComment");

	
	var textarea = $('textarea').attr({"type":"text","name":"chat","id":"chat"}).css({"display":"none"})
	// $('.Trip').append("<textarea type='text' name='comment' id='comment style'display:none'></textarea>");
	var aSend= $('<a>').attr({"id":"chatComment"}).css({"display":"none"}).html("שלח")
	// $('.Trip').append("<a id='submitComment' style'display:none'>שלח תגובה</a> </br>");




	commentSection.append(h3);
	commentSection.append(img);
	commentSection.append(h4);
	commentSection.append(textarea);
	commentSection.append(aSend);
	commentSection.append(ul)


	// schedulePage.append(commentSection);
	$('#titleComment').click(function(){
		$('#chat').show();
		$('#chatComment').show();
	});
    $('article').readmore({
	  speed: 75,
	  lessLink: '<a href="#">Read less</a>'
	});
// 	    $('article').readmore({
// 	  afterToggle: function(trigger, element, expanded) {
// 	    if(! expanded) { // The "Close" link was clicked
// 	      $('html, body').animate( { scrollTop: element.offset().top }, {duration: 100 } );
// 	    }
// 	  }
// 	});
 }

$(document).on('click', '#deleteMailFromSchedule', function(){
	console.log("clicked on " + $(this).parent().text());
	// var mail  = $(this).parent().text();
	var mailToRemove = $(this).parent().text().slice(0, -3);
	console.log(mailToRemove)
	console.log(shareScheduleWithFriends.indexOf(mailToRemove));
	shareScheduleWithFriends.splice(shareScheduleWithFriends.indexOf(mailToRemove), 1);
	User.tripPatners = shareScheduleWithFriends;
	console.log(shareScheduleWithFriends)
	$.ajax({
		type : "post",
		url : g_domain + "removeEmailFromTripPartners",
		data : {trippartners : shareScheduleWithFriends,
			triptoremove : mailToRemove},
			dataType : "json",
			error: function(jqXHR, textStatus, errorMessage) {
				console.log(errorMessage)
			},
			success: function(data) {
				console.log("removed mail from schedule")
				updateSharedTrip();
			}
		})
})

function updateSharedTrip(){
	console.log("if update shared trip ", User.tripPatners.length)
	$('#friendsemail').empty();
	if(User.tripPatners.length > 0){
		console.log("in if")
		$.each(User.tripPatners, function(i, val){
			console.log(val)
			$('#friendsemail').append("<div id='emailNum" + i + "'>" + val + "</div>");
			$('#emailNum' + i).append("<button id='deleteMailFromSchedule'> &#10006 </button>");
		});
	}
}
// $(document).on('click','.listScheduleTrip',function(){
	

// 	var result = $(this).attr('id');
// 	$.ajax({
// 		type: "post",
//         url: g_domain+"getTripById",// where you wanna post
//         data:  {id:result},
//         dataType: "json",
//         error: function(jqXHR, textStatus, errorMessage) {
//         	console.log(errorMessage)


//         },
//         success: function(data) {
//         	g_trip=data;
//         	displayFullTrip(data);

//         }
//     });
// 	moveToTripPage();
// });

// function displayScheduleTrip(data){
// 	$('.Trip').empty();
// 	$('.Trip').append("<h3>הטיול הנבחר </h3>");
// 	$('.Trip').append($("<img>").attr('src', 'images/smalLike.png').addClass('topImg').css({
// 			"opacity" : "0.4"
// 		}));
// 	$('.Trip').append("<span class='countLike'>" + g_trip.rate.value + "</span>");
// 	$('.Trip').append($("<img>").attr('src', 'images/star.png').addClass('topImgStar'));
// 	$.each(User.favorites, function(index,val){
// 		if (val._id==g_trip._id) {
// 			$('.topImgStar').attr('src', 'images/yellohStar.png');
// 		}
// 	});

// 	$('.Trip').append("<h2>"+g_trip.trip_name+"</h2>");
// 	$('.Trip').append("<ul><li>"+g_trip.trip_charachters[0]+"</li><li>"+g_trip.trip_charachters[1] +"</li></ul>");

// 	$('.Trip').append("<img id='tripImg' src="+g_trip.imageUrl+">");
// 	var div=('<div>');
// 	div+=("<h4>תאור הטיול</h4>");
// 	div+=(g_trip.trip_description);
// 	$('.Trip').append(div);

// 	var strSites="<ul class=sitesUl>";
// 	strSites+="<h4>אתרים בטיול</h4>";
// 	$.each(g_trip.tripSites , function(index,val){
// 		strSites+="<li>";
// 		strSites+=" שם האתר :"+val.siteName+", מיקום האתר : \n"+val.location;

// 	});

// 	$('.Trip').append(strSites);
// 	$('.Trip').append("<label>הוסף תגובה<br><textarea type='text' name='comment' id='comment'></textarea></label>");	
// 	$('.Trip').append("<a id='submitComment'>שלח תגובה</a> </br>");
// 	$('.Trip').append("<h3>תגובות המטיילים</h3>");
// 	var article = "<h3>תגובות המטיילים</h3><article>";

// 	$.each(g_trip.comments,function(i,val){
// 		console.log("comment");
// 		article+=val;
// 		article+="</br>";
// 	});
// 	article+="</article>"
// 	$('.Trip').append(article);
// }

// $(document).on('click','#removeFromSchedule',function(){
// 		console.log("start to removing")
// 		$.ajax({
// 		type: "post",
//     	url: g_domain+"removeFromSchedule",// where you wanna post
//     	data:  {tripId:g_trip._id, userEmail:User.email},
//     	// ContentType: 'application/json',
//     	dataType : "json",
// 	    error: function(jqXHR, textStatus, errorMessage) {
// 	    	console.log(errorMessage)


// 	    },
// 	    success: function(data) {
// 	    	// g_trip=data;
// 	    	// displayFullTrip(data);
// 	    	moveToSchedule();
// 	    }
// 	});
// });

$(document).on('click','#moveToFavorite',function(){
	if(!User.email)
	{
		alert("רק משתמשים רשומים יכולים לצפות בעמוד זה")
	}else{

		$.ajax({
			type: "post",
        url: g_domain+"getUserFavorites",// where you wanna post
        data:  {email:User.email},
        dataType: "json",
        error: function(jqXHR, textStatus, errorMessage) {
        	console.log(errorMessage)


        },
        success: function(data) {
        	console.log(data.favorites);
        	g_ListTrip=data.favorites;
        	displayListTrip(data.favorites);
        }
    });
		moveToFavorite();
	}
});


function updateAreaAfterFilter(){
	// debugger;
	var tripsAfterArea = [];
	if($('#selectArea').val() === ""){
		displayListTrip(g_ListTrip);	
	}
	else{
		$('#resultTrip ul').empty();
		for(i in g_ListTrip){
			// debugger;
			if($('#selectArea').val() === g_ListTrip[i].area){
				tripsAfterArea.push(g_ListTrip[i]);	
			}
		}
		g_ListTrip = tripsAfterArea;
		displayListTrip(g_ListTrip);	
	}
}


function updateAreaBeforeFilter(){
	// debugger;
	var tripsAfterArea = [];
	if($('#selectArea').val() === ""){
		displayListTrip(tripsAfterCharachters);	
	}
	else{
		$('#resultTrip ul').empty();
		for(i in tripsAfterCharachters){
			// debugger;
			if($('#selectArea').val() === tripsAfterCharachters[i].area){
				tripsAfterArea.push(tripsAfterCharachters[i]);	
			}
		}
		g_ListTrip = tripsAfterArea;
		updateResultByFilterAfterArea()
		// displayListTrip(g_ListTrip);	
	}
}

function updateResultByFilterBeforeArea(){

	var tripsAfterFilter = [];
	var donsentContainFlag = false;

	$.each(tripsAfterCharachters, function(index,trip){
		$.each(filter, function(index,val){

			if(!(_.contains(trip.trip_filter, val))){								
				donsentContainFlag = true;
				return;
			}

		})

		if(!donsentContainFlag)
		{
			tripsAfterFilter.push(trip);
		}
		donsentContainFlag = false;
	})
	console.log(tripsAfterFilter);
	g_ListTrip = tripsAfterFilter;
	updateAreaAfterFilter();
	// displayListTrip(g_ListTrip);

}

function updateResultByFilterAfterArea(){

	var tripsAfterFilter = [];
	var donsentContainFlag = false;
	if(filter.length>0){
		$.each(g_trip, function(index,trip){
			$.each(filter, function(index,val){

				if(!(_.contains(trip.trip_filter, val))){								
					donsentContainFlag = true;
					return;
				}

			})

			if(!donsentContainFlag)
			{
				tripsAfterFilter.push(trip);
			}
			donsentContainFlag = false;
		})
		console.log(tripsAfterFilter);
		g_ListTrip = tripsAfterFilter;
	// updateAreaBeforeFilter();
}
displayListTrip(g_ListTrip);
}

$(document).on('click','.btnChar', function(e){

	console.log("picked char")
	$('.continue').css({'display':'block'});	
	$(this).addClass('selectedChar');

	if(count==1)
	{
		$('#genres').html($(this).text())
		count++;
		clickedCharachters[0] = $(this).text();
		var div = $('<div>')
		div.addClass('continue');
		var img = $('<img>').attr("src","images/arrow_2.png");
		var span = $('<span>').html("המשך  ")
		div.append(span);
		div.append(img);
		$('#groupButton').append(div)
		console.log("continue")
	}
	else if(count==2)
	{
		$('#genres').append(" + " + $(this).text())
		clickedCharachters[1] = $(this).text();
		console.log(clickedCharachters[0] + " " + clickedCharachters[1]);
		count=1;
		updateTripFromCharchters(clickedCharachters);
	}

	$('.continue').click(function(){
		updateTripFromCharchters(clickedCharachters);
	});
	$('.continue').hover(function(){
		$(this).css({"background-color":"#22AF87","color":"#EED53D"});
		$(this).children('img').attr("src","images/arrow_2_hover.png");
	},function(){
		$(this).css({"background":"transparent","color":"#ffffff"});
		$(this).children('img').attr("src","images/arrow_2.png");
	})
});

$(document).on('submit','#addform',function(e){
	e.preventDefault();

	var form = new FormData(this); 


	var tempFilter = [];

	var wrapper = $(".ingredients_i");
	// var images = $("image_i");
	var comms = new Array();
	for (var i = 0; i < wrapper.length; i++){
		console.log(i);

		var comm = {};
		if (wrapper[i].value.trim() != ''){
			comm['siteName'] = wrapper[i].value;
			// comm["image"] = images[i].value;
			comms.push(comm);
		}
	}
	console.log(comms)
	if (comms != 0)
		form.append("sites", JSON.stringify(comms));	
	else form.append("sites", JSON.stringify([]));	
//console.log($(this))
form.append("email",User.email);
form.append("mapPoint",JSON.stringify(mapPoint));
$('input[type="checkbox"]').each(function(value) {
	if($(this).is(':checked')){
		tempFilter.push($(this).attr('id'));
	}
});
form.append("trip_filter", JSON.stringify(tempFilter));
var temp_arr =[]
var temp= $('#usersList').text();
if(temp==""){
	form.append("shareEmail",temp_arr)	
	console.log(temp);
}else{ 

	temp_arr = temp.split(" ");
	console.log(temp_arr);
	form.append("shareEmail",temp_arr);
}
console.log(form)
moveToHomePage();	
$.ajax({
	type: "post",
        url: g_domain+"add",// where you wanna post
        data:  form,
        //dataType: "json",
        contentType: false,
        processData:false,
        error: function(jqXHR, textStatus, errorMessage) {
        	console.log(errorMessage)
        },
        success: function(data) {
        	console.log(data.res)
        	if(edit==true){
        		addToFavoFromEdit(data);
        	}
        	edit=false;
        } 
    });
return true;
})

// $(document).on('click','#submitForm', function(){
// 	location.reload();	
// })

function addToFavoFromEdit(tripToUpdate){

	console.log("deleting trip " + g_trip);
	console.log("trip id: " +g_trip._id)
	$.ajax({
		type: "post",
    	url: g_domain+"updateTripChangesToUserFavorites",// where you wanna post
    	data:  {tripId:g_trip._id, userId:User.email},
    	// ContentType: 'application/json',
    	dataType : "json",
    	error: function(jqXHR, textStatus, errorMessage) {
    		console.log(errorMessage)
    	},
    	success: function(data) {
    		$.ajax({
    			type: "post",
		        url: g_domain+"updateFavoirte",// where you wanna post
		        data:  {trip:{
		        	_id:tripToUpdate._id,
		        	trip_name:tripToUpdate.trip_name,
		        	area:tripToUpdate.area,
		        	tripSites : tripToUpdate.tripSites           	
		        }
		        ,userId:User.email},
		        dataType: "json",
		        error: function(jqXHR, textStatus, errorMessage) {
		        	console.log(errorMessage)


		        },
		        success: function(data) {
		        	console.log("update success to add to the favorite");
		        	moveToFavorite();
		        }
		    });
    	}
    });
}
$(window).on('hashchange', function(e) {
	if (e.originalEvent.newURL.indexOf("#myPageSchedule") != -1) {
		console.log("home")
	}
	
});
// $(document).on('click','#accountPage',function(){
// 	accountCounter=1;
// 	console.log("click to move the account page")
// })
// $(document).on('click','#accountPage img',function(){
// 	accountCounter=1;
// 	console.log("click to move the account page")
// })

// $(document).on('click','#accountPage span',function(){
// 	accountCounter=1;
// 	console.log("click to move the account page")
// })
function moveToAddPage() {
	$.mobile.changePage("#addTripPage", {
		transition : "none",
		changeHash : true
	});
}
function moveTofilterPage() {	
	$.mobile.changePage("#resultTripPqge", {
		transition : "none",
		changeHash : true
	});
}
function moveToAccountPage() {
	$.mobile.changePage("#accountPage", {
		transition : "none",
		changeHash : true
	});
}
function moveToTripPage() {
	$.mobile.changePage("#theTrip", {
		transition : "none",
		changeHash : true
	});
}
function moveToFavorite() {
	$.mobile.changePage("#viewFavorite", {
		transition : "none",
		changeHash : true
	});
}
function moveToSchedule() {
	$.mobile.changePage("#myPageSchedule", {
		transition : "none",
		changeHash : true
	});
}
function moveToHomePage() {
	appendTripCharachters()
	$.mobile.changePage("#homePage", {
		transition : "none",
		changeHash : true
	});

}
$(document).on('click','#home',function(){
	console.log("homeP")
	moveToHomePage();
});
function appendTripCharachters(){
	$("#groupButton").empty();
	$("#groupButton").append('<h2>חפש לי מסלול...</h2>')
	var h2 = $('<h2>').attr("id","genres");
	$("#groupButton").append(h2);
	$.each(tripCharacters, function(i, val){
		var buttonAppendCharachters = '<button class="btnChar">' + val + '</button>';
		var selectAppendCharachters = '<option value=' + val + '>' + val + '</option>';
		$("#groupButton").append(buttonAppendCharachters);
		$("#firstcharachter").append(selectAppendCharachters);
		$("#secondcharachter").append(selectAppendCharachters);		
	});
	$('.btnChar').hover(function(){
		$(this).css({"background":"#EED53D"})
	},function(){
		$(this).css("background","transparent")
	})
}

function signinCallback(authResult) {
	if (authResult['status']['signed_in']) {
		// Update the app to reflect a signed in user
		//Hide the sign-in button now that the user is authorized, for example:
		document.getElementById('signinButton').setAttribute('style', 'display: none');

		gapi.client.load('plus', 'v1', function() {

			var request = gapi.client.plus.people.get({
				'userId' : 'me'
			});
			request.execute(function(resp) {

				console.log(resp);
				User.name=decodeURI(resp.displayName);
				User.email=resp.emails[0].value
				User.image = resp.image.url;

				// (resp.emails)? resp.emails[0].value : "zanzouritamar@gmail.com";
				console.log(User);
				create_user(User);

			});
		});
	} else {
		/*	Update the app to reflect a signed out user
		 Possible error values:
		 "user_signed_out" - User is signed-out
		 "access_denied" - User denied access to your app
		 "immediate_failed" - Could not automatically log in the user */
		 console.log('Sign-in state: ' + authResult['error']);

		}
	}

	function updateTripFromCharchters(tc){

		$.ajax({
			type: "post",
        url: g_domain+"filterByChars",// where you wanna post
        data:  {chars:tc, userId:User.email},
        dataType: "json",
        //contentType: "application/json",
        error: function(jqXHR, textStatus, errorMessage) {
        	console.log(errorMessage)


        },
        success: function(data) {
        	tripsAfterCharachters = data;
        	g_ListTrip = data;
        	displayListTrip(data);
        	console.log("listResultTrip")
        	moveTofilterPage();	      
        } 
    });
	}
	function displayListTrip(data){
		console.log(data)
		// if (e.originalEvent.newURL.indexOf("#myPageSchedule") != -1) {
		// 	console.log("home")
		// }
		$('.userDetailes').empty();
		if (User) {
			// var divUser = $('<div>').addClass('userDetailes');
			var spanUser = $('<span>').html(User.name).addClass('nameUser');
			var imgUser = $('<img>').attr("src",User.image).addClass('imgUser');
			$('.userDetailes').append(imgUser)
			$('.userDetailes').append(spanUser)
		}
		if(window.location.hash=='#viewFavorite')
		{
			console.log('accountPage');
			favoriteFlagList=1;
		}
		if(window.location.hash=='#accountPage')
		{
			console.log('accountPage');
			accountCounter=1;
		}
		console.log(accountCounter)
		if (accountCounter==0){
			$('#resultTitle').html('תוצאות חיפוש');
			$('#chars').html(clickedCharachters[0]+" + "+clickedCharachters[1]);
		};
		$('#resultTrip ul').empty();
		var ul = $('.displayTrip');
		trip=data;
		$.each(data,function(index,val){
			var li = $('<li>');
			li.attr({"id":val._id}).addClass('listResultTrip trip');
			var imgTrip=$('<img>').attr({"src":val.tripSites[0].img,"width":"190px","height":"190px"}).addClass('TripImg');
			li.append(imgTrip);
			

			var span = $('<span>');
			if(favoriteFlagList==1){
				span.addClass('titelNameFavorite').html(val.trip_name)
			}else{
				span.addClass('titelName').html(val.trip_name)
			}
			li.append(span);
			var h5 =$('<h5>').html( hashtable[val.area]).addClass('locH5');
			li.append(h5);
			if(accountCounter==0 && favoriteFlagList==0){
				var ulSmall =$('<ul>').addClass("smallUL")
				if(val.trip_filter.length>0){
					$.each(val.trip_filter,function(i,v){
						var liSmall = $('<li>')
						var imgVi= $('<img>').attr({"src":"images/vi.png"}).addClass("vi");
						liSmall.append(imgVi);
						liSmall.append( hashtable[v])
						ulSmall.append(liSmall)
					});
				} 
				li.append(ulSmall);
			}else {

				var imgF="";
				var imgS="";
				var favorites= []
				$.each(User.favorites, function(i,value){
					favorites.push(value._id)
				})
				if (favorites.indexOf(val._id) > -1)
				{
					imgF = $('<img>')
					imgF.attr({"id":"img"+index+"Id",'src':'images/remove_favorites.png'}).addClass('topImgStarList selectedImgStar'); 
				}else{
					imgF = $('<img>')
					imgF.attr({"id":"img"+index+"Id",'src':'images/add_favorites.png'}).addClass('topImgStarList'); 
				}
				var schedules= []
				$.each(User.schedule, function(i,value){
					schedules.push(value._id)
				})
				if (schedules.indexOf(val._id) > -1) {
					imgS = $('<img>')
					imgS.attr({"id":"imgS"+index+"Id",'src':'images/remove_track.png'}).addClass('topImgScheduleList selectedImgSchedule'); 
				}else{
					imgS = $('<img>')
					imgS.attr({"id":"imgS"+index+"Id",'src':'images/add_track.png'}).addClass('topImgScheduleList'); 
				}
				li.append(imgF);
				li.append(imgS);
			}
			ul.append(li);
		});
favoriteFlagList=0;
accountCounter=0;
console.log("after display list",accountCounter)
}
$(document).on( "click", "#signOut", function() {
	console.log("signOut")
	gapi.auth.signOut();
});	

$(document).on('click','#showTrips',function(){
	moveToAccountPage();
	if(!User.email)
	{
		alert("רק משתמשים רשומים יכולים לצפות בעמוד זה")
	}else{
		$('#userName').html(User.name);
		$('#userImg').attr({"src":User.image,"width":100,"height":100});

		getUserTrip();
	}
});

function create_user(user){
	$.ajax({
		type : "POST",
		url : g_domain+"registerUser",
		data : user,
		dataType:"json",
       // contentType: "application/json",
       success : function(data) {
       	console.log(data.res);
       	User = data.res;
       	// console.log(User.email + " " + User.favorites)

       },
       error : function(objRequest, errortype) {
       }
   });
}
function getUserTrip(){
	$.ajax({
		type : "get",
		url : g_domain+"findTripByUser?email="+User.email,
       // contentType: "application/json",
       success : function(data) {
       	console.log(data);
       	g_ListTrip=data;
       	displayListTrip(data);
       	
       },
       error : function(objRequest, errortype) {
       }
   });
}
$(document).on('click','.titelNameFavorite',function(){
	
	favoriteFlag=1;
	var result = $(this).parent().attr('id');
	$.ajax({
		type: "post",
        url: g_domain+"getTripById",// where you wanna post
        data:  {id:result},
        dataType: "json",
        error: function(jqXHR, textStatus, errorMessage) {
        	console.log(errorMessage)


        },
        success: function(data) {
        	g_trip=data;
        	displayFullTrip(data);
        	
        }
    });
	moveToTripPage();
});
$(document).on('click','.titelName',function(){
	
	var result = $(this).parent().attr('id');
	$.ajax({
		type: "post",
        url: g_domain+"getTripById",// where you wanna post
        data:  {id:result},
        dataType: "json",
        error: function(jqXHR, textStatus, errorMessage) {
        	console.log(errorMessage)


        },
        success: function(data) {
        	g_trip=data;
        	displayFullTrip(data);
        	
        }
    });
	moveToTripPage();
});

$(document).on('click','.moveToTrip',function(){
	
	var result = $(this).parent().attr('id');
	$.ajax({
		type: "post",
        url: g_domain+"getTripById",// where you wanna post
        data:  {id:result},
        dataType: "json",
        error: function(jqXHR, textStatus, errorMessage) {
        	console.log(errorMessage)


        },
        success: function(data) {
        	g_trip=data;
        	displayFullTrip(data);
        	
        }
    });
	moveToTripPage();
});
// function favoriteDisplayListTrip(data){
// 	// console.log(data)
// 	// $('#resultTrip ul').empty();
// 	// trip=data;
// 	// for (i in data) {
// 	// 		var tripResult = '<li id='+data[i]._id+' class="favoriteListResultTrip trip" ><a href="#addingSchedule" class="topImgSchedule" data-transition="flip" data-rel="popup">הוסף למסלול שלי</a><span class="titelName"> שם הטיול:' + data[i].trip_name + '</span>' + ' מיקום: ' + data[i].address +'</li>';
// 	// 	$('#resultTrip .displayTrip').append(tripResult);
// 	// };


// 	console.log(data)
// 		$('#resultTrip ul').empty();
// 		var ul = $('.displayTrip');
// 		trip=data;
// 		$.each(data,function(index,val){
// 			var li = $('<li>');
// 			li.attr({"id":val._id}).addClass('favoriteListResultTrip trip');
// 			var imgTrip=$('<img>').attr({"src":val.tripSites[0].img,"width":"50px","height":"50px"}).addClass('TripImg');
// 			li.append(imgTrip);
// 			var imgF="";
// 			var imgS="";
// 			var favorites= []
// 			$.each(User.favorites, function(i,value){
// 				favorites.push(value._id)
// 			})
// 			if (favorites.indexOf(val._id) > -1)
// 			{
// 				imgF = $('<img>')
// 				imgF.attr({"id":"img"+index+"Id",'src':'images/remove_favorites.png'}).addClass('topImgStarList selectedImgStar'); 
// 			}else{
// 				imgF = $('<img>')
// 				imgF.attr({"id":"img"+index+"Id",'src':'images/add_favorites.png'}).addClass('topImgStarList'); 
// 			}
// 			var schedules= []
// 			$.each(User.schedule, function(i,value){
// 				schedules.push(value._id)
// 			})
// 			if (schedules.indexOf(val._id) > -1) {
// 				imgS = $('<img>')
// 				imgS.attr({"id":"imgS"+index+"Id",'src':'images/remove_track.png'}).addClass('topImgScheduleList selectedImgSchedule'); 
// 			}else{
// 				imgS = $('<img>')
// 				imgS.attr({"id":"imgS"+index+"Id",'src':'images/add_track.png'}).addClass('topImgScheduleList'); 
// 			}
// 			li.append(imgF);
// 			li.append(imgS);

// 			var span = $('<span>');
// 			span.addClass('titelNameFavorite').html(val.trip_name)
// 			li.append(span);
// 			var p =$('<p>').html(' מיקום: ' + hashtable[val.area]);
// 			li.append(p);
// 			// var tripResult = '<li id='+data[i]._id+' class="listResultTrip trip" ><span class="titelName"> שם הטיול:' + data[i].trip_name + '</span>' + ' מיקום: ' + data[i].address +'</li>';
// 			ul.append(li);
// 		});

// }
// function favoriteDisplayFullTrip(data){
// 	g_trip=data;

// 	console.log(data)
// 	$('.Trip').empty();
// 	// $('.Trip').append("	<div id='addingSchedule' data-role='popup'><p>הטיול נוסף למסלול שלך</p></div>");
// 	if(g_trip.rate.userEmail.indexOf(User.email) >-1)
// 	{
// 		console.log(User.email,g_trip.rate.userEmail)
// 		$('.Trip').append($("<img>").attr('src', 'images/smalLike.png').addClass("topImg selectedImg").css({
// 			"opacity" : "1.0"
// 		}));
// 	}
// 	else{
// 		$('.Trip').append($("<img>").attr('src', 'images/smalLike.png').addClass('topImg').css({
// 				"opacity" : "0.4"
// 		}));	
// 	}

// 	$('.Trip').append("<span class='countLike'>" + g_trip.rate.value + "</span>");
// 		var imgF="";
// 	var imgS="";
// 	var favorites= []
// 	$.each(User.favorites, function(i,value){
// 		favorites.push(value._id)
// 	})
// 	if (favorites.indexOf(g_trip._id) > -1)
// 	{
// 		imgF = $('<img>')
// 		imgF.attr({'src':'images/favorites_hover.png'}).addClass('topImgStar selectedImgStar'); 
// 	}else{
// 		imgF = $('<img>')
// 		imgF.attr({'src':'images/favorites.png'}).addClass('topImgStar'); 
// 	}
// 	var schedules= []
// 	$.each(User.schedule, function(i,value){
// 		schedules.push(value._id)
// 	})
// 	if (schedules.indexOf(g_trip._id) > -1) {
// 		imgS = $('<img>')
// 		imgS.attr({'src':'images/my_track_hover.png'}).addClass('topImgSchedule selectedImgSchedule'); 
// 	}else{
// 		imgS = $('<img>')
// 		imgS.attr({'src':'images/my_track.png'}).addClass('topImgSchedule'); 
// 	}
// 	$('.Trip').append(imgF)
// 	$('.Trip').append(imgS)
// 	$('.Trip').append("<a id='editFavorite'>ערוך טיול כרצונך</a> </br>");
// 	$('.Trip').append("<h2>"+g_trip.trip_name+"</h2>");
// 	$('.Trip').append("<ul><li>"+g_trip.trip_charachters[0]+"</li><li>"+g_trip.trip_charachters[1] +"</li></ul>");
// 	var divImg = $('<div>');
// 	divImg.attr("id","tripImg").css("background-image","url("+g_trip.tripSites[0].img+")")
// 	$('.Trip').append(divImg);

// 	var articleDes=('<article>');
// 	articleDes+=("<h4>תאור הטיול</h4>");
// 	articleDes+=(g_trip.trip_description);
// 	$('.Trip').append(articleDes);
// 	 var timeline = $('<div>');
// 	 timeline.attr({"id":"timeline"})
// 	 var ulSites = $('<ul>');
// 	 ulSites.attr({"id":"ulTimeLine"})
// 	$.each(g_trip.tripSites , function(index,val){
// 		var li = $('<li>');
// 		var img = $('<img>');
// 		var span = $('<span>');
// 		span.html(val.siteName);
// 		img.attr({"src":val.img, "width":50, "height":50});
// 		li.append(span)
// 		li.append(img)
// 		ulSites.append(li);
// 	});
// 	timeline.append(ulSites);
// 	$('.Trip').append(timeline)
// 	var meImg="";
// 	var meSpan="";


// 	$('#ulTimeLine li').hover(function(){
// 		console.log("hover");
// 		$(this).css({"top":"0px","border":"1px solid #000000","padding":"12px","background-color":"#ffffff","border-radius":"30px"});
// 		meSpan = $(this).children('span');
// 		meSpan.css({"font-size":"35px"});
// 		meImg = $(this).children('img');
// 		meImg.attr({"width":125,"height":125}).css("border-radius","0px");
// 	}
// 	, function(){
// 		$(this).css({"top":"68px","border":"none","background-color":"transparent","padding":"0px"});
// 		meSpan = $(this).children('span');
// 		meSpan.css("font-size","20px");
// 	    meImg = $(this).children('img');
// 		meImg.attr({"width":50,"height":50}).css("border-radius","50px");
// 	});
// 	$('.Trip').append("<label>הוסף תגובה<br><textarea type='text' name='comment' id='comment'></textarea></label>");	
// 	$('.Trip').append("<a id='submitComment'>שלח תגובה</a> </br>");
// 	var article = "<h3>תגובות המטיילים</h3><article>";
// 	$.each(g_trip.comments,function(i,val){
// 		console.log("comment");
// 		article+=val;
// 		article+="</br>";
// 	});
// 	article+="</article>"
// 	$('.Trip').append(article);


// }

$(document).on('click', '.addToSchedule', function(){
	var result = $(this).parent().attr('id');
	$.ajax({
		type: "post",
        url: g_domain+"getTripById",// where you wanna post
        data:  {id:result},
        dataType: "json",
        error: function(jqXHR, textStatus, errorMessage) {
        	console.log(errorMessage)
        },
        success: function(data) {
        	console.log(data)
        	g_trip=data;
        	$.ajax({
        		type: "post",
	        url: g_domain+"updateMySchedule",// where you wanna post
	        data:  {trip: g_trip
	        	,userId:User.email},
	        	dataType: "json",
	        	error: function(jqXHR, textStatus, errorMessage) {
	        		console.log(errorMessage)


	        	},
	        	success: function(data) {
	        		// $( "#addingToSchedule" ).popup( "close" );
	        	}
	        });
        	
        }
    });

})

// $(document).on("pagehide","#myPageSchedule",function(){ // When leaving pagetwo
//   alert("pagetwo is about to be hidden");
// });

$(document).on('click','#editFavorite',function(){
	console.log(g_trip)
	edit=true;
	moveToAddPage();
	$('#trip_name').val(g_trip.trip_name);
	$('#description').val(g_trip.trip_description);
	$('#trip_address').val(g_trip.address);
	switch(g_trip.area) {
		case 'tel_aviv':
		$('#radio-choice-1L').click();
		break;
		case 'south':
		$('#radio-choice-2L').click();
		break;
		case 'north':
		$('#radio-choice-3L').click();
		break;
	}
	$('#firstcharachter').val(g_trip.trip_charachters[0]).change();
	$('#secondcharachter').val(g_trip.trip_charachters[1]).change();

	$.each(g_trip.trip_filter, function (index,val){
		$("label[for='"+val+"']").addClass("ui-btn-active ui-checkbox-on");
		console.log(val);	
		switch(val) {
			case 'medium_trip':
			$("label[for='"+val+"']").click();
			break;
			case 'light_trip':
			$("label[for='"+val+"']").click();
			break;
			case 'hard_trip':
			$("label[for='"+val+"']").click();
			break;
		}
	});
	$("label[for='public_trip']").click();
	if(g_trip.trip_isPrivate){
		$("label[for='private_trip']").click();
		$("#shareEmail").val(g_trip.shareEmail);

	}else{
		$("label[for='public_trip']").click();
	}
	var len = g_trip.tripSites.length;
	
	if(len){
		$.each(g_trip.tripSites,function(i,val){
			if ((i+1)==1 ) {
				firstSites()
			};
			if ((i+1)>1) {
				console.log(i);
				console.log(val.location,val.siteName);
				$('#newChild'+(i+1)).val(val.siteName);
				$('.amount'+(i+1)).val(val.location);
			};
		});
	}
	$('#imgUpload').focus();
	$('#thumbnil').attr("src",g_trip.imageUrl);
	$('#dvMap').click(function (){

	});
	if(g_trip.mapPoint){
		mapPoint.lat=g_trip.mapPoint.lat;
		mapPoint.lng=g_trip.mapPoint.lng;
	}
		 // $('.firstIngredient').val(g_trip.tripSites[0].siteName)
	 //  $('.firstAmount').val(g_trip.tripSites[0].location)
	// $.each(g_trip.sites,function(index,val){

	// });
});

function firstSites(){
	$('.firstIngredient').trigger('focus').val(g_trip.tripSites[0].siteName);
	$('.amount1').val(g_trip.tripSites[0].location);
}

$(document).on('click','.btn-primary',function(){
	r = $('#us3-radius').val();
	r = r;
	// console.log(r,t1,t2,point2.lat,point2.lng);
	// isInDdistance = distance(t1,t2,point2.lat,point2.lng);
	// console.log(isInDdistance);
	// if(r>isInDdistance){
	// 	console.log("trip is in the redius")
	// }
	// else{
	// 	console.log("trip is in the redius")	
	// }
	console.log(g_ListTrip)
	var tempList=[];
	$.each(g_ListTrip,function(index,val){
		isInDdistance = distance(t1,t2,val.mapPoint.lat,val.mapPoint.lng);
		console.log(isInDdistance);
		isInDdistance=isInDdistance*100;
		console.log(isInDdistance);
		if( r > isInDdistance ){
			console.log("trip is in the redius",val)
			tempList.push(val);
		}
		else{
			console.log("trip is'not in the redius",val)	
		}	
	});
	console.log(g_ListTrip)
	displayListTrip(tempList);
	console.log(tempList);
});




