User={};

g_domain="http://localhost:1337/";//"http://shenkartripper.herokuapp.com/";//



//hashtable for variables in english
hashtable = {};
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
var accountFlag=0;
var favoriteFlagList=0;
var accountFlagList=0;
mapPoint={};
g_trip={};
g_ListTrip=[];
var filter = [];
var tempFilter=[];
var clickedCharachters = [];
var janers = [];
var tripsAfterCharachters = [];
var date={};
var point1={},point2={} ;
point2.lng = 34;
point2.lat = 32;
var w1="";
var w2="";
var r=0;
var isInDdistance;
var t1 =  32.03952466510527;
var t2 = 34.83763210941106;
edit=false;
editFromAccount=false;
var count=1;
var tripCharacters = [];
shareScheduleWithFriends = [];
var num =0;
TRIPPER_DATA=[];

//******** find user location *********

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
	
	/******** get data ********/
	$('#groupButton').hide();
	$.ajax({
		type: "get",
    	url: g_domain+"getTripData",// where you wanna post
    	dataType: "json",
    	error: function(jqXHR, textStatus, errorMessage) {
    		console.log(errorMessage)
    	},
    	success: function(data) {
    	// console.log("update success to add to the favorite");
	    	//console.log(data)
    		console.log(data.tripData)
    		console.log(data.tripCharachters)
    		TRIPPER_DATA=data.tripData;

			var h1 = $('<h1>').html(TRIPPER_DATA.welcome_h1);
			var p = $('<p>').html(TRIPPER_DATA.welcome_p);
			var div = $('<div>');
			var img = $('<img>').attr("src","images/welcome_errow.png");
			var span = $('<span>').html(TRIPPER_DATA.welcome_span);
			$('#welcome').append(h1);
			$('#welcome').append(p);
			div.append(span);
			div.append(img);		
			$('#welcome').append(div);

	    	$.each(data.tripCharachters.trip_charachters, function(i, val){
	    			console.log(val.name)
	    			tripCharacters.push(val.name);
	    			 var selectAppendCharachters = '<li><label for="' + val.id + '">' + val.name + '</label><input type="checkbox" id="' + val.id + '" name="trip_charachters[]" value="' + val.id + '"></li>';
					// '<option value=' + val.name + '>' + val.name + '</option>';
	    			 $("#pickJanerul").append(selectAppendCharachters);
					// $("#secondcharachter").append(selectAppendCharachters);	
	    		// })
	    	});
	    	appendTripCharachters();
    	}
	}); 
	
	/******* end get data *******/

	//******** check if desktop or mobile to initialize parameters *********//

	if ($(window).width() < 767) {
		console.log("in mobile")
		$('#nav-panel').css("display" , "block");
		// $(".ui-listview>li>a").removeClass("ui-btn-icon-right")
		// $('.ui-listview>li>a').removeClass("ui-btn ui-btn-icon-right ui-icon-carat-r");
		$('.nav').css("display" , "none");
		$('#menubtn').css("display", "inline-block");
		$('#filtermenu').css("display", "none !important");
		$('#buttonRadius').css("display", "block")
	}
	//******** initialize the map after choosing *********//
    var locations={}
    $('input:radio[name=area]').click(function(){
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
    	initMap(locations[0],locations[1]);
    });
    initMap(32.020593632526015,34.83983516693115);
    initDatepicker();
    //******** initialize radius for searching in mobile *********
	$('#us3').locationpicker({
		location: {latitude: 32.08973379436282,longitude: 34.80341009795666 },
		radius: 3000,
		inputBinding: {
	        radiusInput: $('#us3-radius'),
	    },
	    enableAutocomplete: true
		    
	});

	$('#us6-dialog').on('shown.bs.modal', function() {
		$('#us3').locationpicker('autosize');
	});

	//******** recognition click on the filters in desktop *********
	$('.option1 li').click(function(){
		var i = $(this).parents('.select').attr('id');
		var v = $(this).children().text();
		var o = $(this).attr('id');
		$('#'+i+' .selected').attr('id',o);
		 w1 = $('#'+i+' .selected').attr('id',o);
		$('#'+i+' .selected').text(v);
		w1=w1.attr('id');
		checkTheList();
	});

	$('.option2 li').click(function(){
		console.log("inside click")
		var i = $(this).parents('.select').attr('id');
		var v = $(this).children().text();
		var o = $(this).attr('id');
		$('#'+i+' .selected').attr('id',o);
		 w2 = $('#'+i+' .selected').attr('id',o);
		$('#'+i+' .selected').text(v);
		console.log(w2.attr('id'))
		w2= w2.attr('id');
		checkTheList();
	});

	$('#filtermenu li').change(function(){
		console.log($(this).attr('id'))
		filter=[];
		console.log("in filter");
		$('input[type="checkbox"]').each(function(value) {
			if($(this).is(':checked')){
				checkIfInArray($(this).attr('id'));
			}
		});

		var area = w2;
		checkTheList();

	})
});

//******** check if there is ohter filters *********
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

function checkTheList(){
	var tempList= [];
	var tempFil=1;
	console.log(w1);
	console.log(w2);
	if (filter.length === 0) {
		console.log(filter," empty ")
		tempList = tripsAfterCharachters;
	}else{
		$.each(tripsAfterCharachters,function(index,value){
			$.each(filter,function(i,val){
				if (value.trip_filter.indexOf(val)==-1) {
					tempFil=0;
				};
			})
			if (tempFil==1) {
				tempList.push(value);
				
			}
			tempFil=1;
		});
	}
	if(w1 ==""){
		console.log("no dificullty tempList :",tempList);
	}else{
		var tempListDif=[]
		$.each(tempList,function(index,val){
			 if(val.trip_filter.indexOf(w1)>-1) {
				 tempListDif.push(val)
			};

		})
		tempList=tempListDif;
		console.log("tempList : After w1 ",tempList);
	}


	if (w2=="") {
		console.log("no area tempList :",tempList);
	}else{
		var tempListDif=[]
		$.each(tempList,function(index,val){
			 if(val.area==w2) {
				 tempListDif.push(val)
			};

		})
		tempList=tempListDif;
		console.log("tempList : After w1 ",tempList);
	}
	g_ListTrip=tempList;	
	displayListTrip(g_ListTrip);
}

//******** initialize map *********

function initMap(l1,l2){
	var mapOptions = {
		center: new google.maps.LatLng(	l1, l2),
		zoom: 9,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var infoWindow = new google.maps.InfoWindow();
	var latlngbounds = new google.maps.LatLngBounds();
	var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
	var alert = $('<div>').attr("id","div_alert");
	google.maps.event.addListener(map, 'click', function (e) {
		alert.html(TRIPPER_DATA.alertLocation);
		$('#dvMap').append(alert);
		console.log(TRIPPER_DATA.alertLocation)
		if(alert.hasClass('visible')){
			alert.removeClass('visible');
		}else{
			alert.addClass('visible');
		}
		$('#dvMap').append(alert)
		console.log("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
		mapPoint.lat=e.latLng.lat();
		mapPoint.lng=e.latLng.lng();
	});
	$('#div_alert button').click(function(){
		alert.removeClass('visible');
	});
}

//******** present the filter that the user choice *********

$(document).on('change', 'ul.dropdown-menu li input[type=checkbox]', function() {
    	console.log("changed")
        // $(this).change(function() {
            var line_trip_kind = "";
            var line_trip_with_who = "";
            var line_janers = "";

            // var parentOfThisFilters =$(this).parents("li");
            // var parentOfThisJarenrs = parentOfThisFilters.parent("ul");
           	// parentOfThisFilters=parentOfThisJarenrs.children("li");
            // var appendTextToParentLabel = parentOfThisFilters.children().first("div").children();
            // parentOfThisJarenrs = parentOfThisJarenrs.attr('id');
            // parentOfThisFilters = parentOfThisFilters.attr("id");

            var parentOfThisFilters = $(this).parent().parent().parent().parent().parent().attr('id');
            var parentOfThisJarenrs = $(this).parent().parent().parent().parent().parent().parent().attr('id');
            var appendTextToParentLabel = $(this).parent().parent().parent().parent().children();
            // debugger
            // console.log($(this))
            console.log("jkhdsfkjsdhgs", $(this).parent().parent().parent().parent().parent().attr('id'));
            // console.log($("ul.dropdown-menu").parent().parent().attr("id"));
            if(parentOfThisFilters === "who_are_you_going_with"){
            	console.log("who");
            	$('#who_are_you_going_with input:checked').each(function() {
            	// var line = "";
            		console.log("checkbox")
                // if($(this).is(":checked")) {
                    line_trip_with_who += $(this).prev('label').text() + "; ";
                // }
                	console.log(line_trip_with_who)
            	});
     	     	appendTextToParentLabel.first('span.nameF').text(line_trip_with_who);
            }
            else if(parentOfThisFilters === "trip_kind"){
            	console.log("else")
            	$('#trip_kind input:checked').each(function() {
            	// var line = "";
                // if($(this).is(":checked")) {
                    line_trip_kind += $(this).prev('label').text() + "; ";
                // }
                console.log(line_trip_kind)
            });
          	appendTextToParentLabel.first('span.nameF').text(line_trip_kind);

            }
            else if(parentOfThisJarenrs === "pickJaner"){
            	console.log("pickJaner");
            	$('#pickJaner input:checked').each(function() {
            	// var line = "";
                // if($(this).is(":checked")) {
                line_janers += $(this).prev('label').text() + "; ";
                // }
                console.log(line_janers)
            });
          	appendTextToParentLabel.first('span').text(line_janers);
            }

});

//******** moving from the welcome to chose button *********//

$(document).on('click', '#welcome > div', function(){
		$('#welcome').hide();
		$('#groupButton').show();
});

$(document).on('click','#addUser',function(){
	console.log(tempEmailUser)
	var tempEmailUser = $('#shareEmail').val();
	$('#shareEmail').val("");
	console.log(tempEmailUser)
	$('#usersList').append(tempEmailUser+" ");
});

$(document).on('change', '#pickJanerul > li', function  () {
    var max = 2;
    var checkboxes = $('#pickJanerul > li > input[type=checkbox]');
    // console.log(checkboxes)            
    checkboxes.change(function(){
        var current = checkboxes.filter(':checked').length;
        checkboxes.filter(':not(:checked)').prop('disabled', current >= max);
    });
});

//******** menu li hover *********

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
$(document).on('mouseenter',"#logoImg", function(){
	$("#logoImg").attr("src", "images/logo_hover.png");
});
$(document).on('mouseleave',"#logoImg", function(){
	$("#logoImg").attr("src", "images/logo.png");
});



$(document).on('click','.btn-primary',function(){
	r = $('#us3-radius').val();
	r = r;
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
//******** check if the trip iz in the raduis *********

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
//********** pick date *************
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
//******** present the img that choose by the user *********
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
		console.log(data.imageUrl);
		g_trip.imageUrl.push(data.imageUrl);
		var imgFotorama = $("<li>").css("background-image","url("+data.imageUrl+")")
		$('#menu').append(imgFotorama);
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

(function($) {
	$.fn.hasScrollBar = function() {
		return this.get(0).scrollHeight > this.height();
	};
})(jQuery);

$(document).on('click', '#nav li', function(){
	$('menubtn').click();
});

$(document).on('click', "#previous , #next", function(e) {
	e.preventDefault();
	console.log($('#menu').hasScrollBar());
	// if($("#menu").scrollLeft() == ($("#menu").width())){
	// alert('end!');
	// }
	if ($('#menu').hasScrollBar()) {
		var leftPos = $('#menu').scrollLeft();
		// $(".next").css({"backgroundImage" : "url('images/nextH.png')"});
		if ($(this).attr('id') == "next")
			$('#menu').animate({
				scrollLeft : leftPos - $(window).width()*(41/100)
			}, 600);
		else if ($(this).attr('id') == "previous")
			$('#menu').animate({
				scrollLeft : leftPos + $(window).width()*(41/100)
			}, 600);
	}
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
$(document).on('mouseenter',"#editTripFromAccount", function(){
	$("#editTripFromAccount img").attr("src", "images/edit_hover.png");
});
$(document).on('mouseleave',"#editTripFromAccount", function(){
	$("#editTripFromAccount img").attr("src", "images/edit.png");
});
$(document).on('mouseenter',"#editFavorite", function(){
	$("#editFavorite img").attr("src", "images/edit_hover.png");
});
$(document).on('mouseleave',"#editFavorite", function(){
	$("#editFavorite img").attr("src", "images/edit.png");
});



// $(document).on('mouseenter',"#uploadImgForm input", function(){
// 	$('#imgUploadMobile').css({"background-image":"images/add_pic_hover.png"});
// });
// $(document).on('mouseleave',"#uploadImgForm input", function(){
// 	$('#imgUploadMobile').css({"background-image":"images/add_pic.png"});
// });
function displayFullTrip(data){
	console.log(data)
	console.log("id: ", data._id)
	$('.Trip').empty();
	var divHead = $('<div>').addClass('divHead');
	var form =$('<form>').attr({"id":"uploadImgForm","method":"post","action":"#"}).append('<input id="imgUploadMobile"  type="file" accept="image/*" onchange="uploadImgFromTrip(this)" name="file" class="image_i"></div><input type="submit" value="submit" style="visibility : hidden"/>');
	// divHead.append('<form action="#" method="post" id="uploadImgForm" ><input id="imgUploadMobile"  type="file" accept="image/*" onchange="uploadImgFromTrip(this)" name="file" class="image_i"></div><input type="submit" value="submit" style="visibility : hidden"/>  </form>');
	// $('.Trip').append('<input id="imgUpload" type="file" accept="image/*" onchange="uploadImgFromTrip(this)" name="file" class="image_i"><img id="showImage" style="width:20%; margin-top:10px;"  src="" alt="image"/></div></form>');
	// $('.Trip').append('</form>')
	divHead.append(form);
	if(favoriteFlag==1){
		divHead.append("<a id='editFavorite'><img src='images/edit.png'></a> </br>");
		favoriteFlag=0;

	}
	if(accountFlag==1){
		// debugger;
		divHead.append("<a id='editTripFromAccount'><img src='images/edit.png'></a> </br>");
		form.addClass('inAccount');
		console.log("come from account page")
		accountFlag=0;
	}else{
		// debugger;
		form.removeClass('inAccount');
		console.log("come not from account page")
	}
	divHead.append("<h1>"+g_trip.trip_name+"</h1>");
	if(g_trip.trip_charachters[1]=="")
	{
		divHead.append("<ul><li>"+g_trip.trip_charachters[0]+"</li></ul>");
	}else{
		divHead.append("<ul><li>"+g_trip.trip_charachters[0]+"</li><li class='plus'> + </li><li>"+g_trip.trip_charachters[1] +"</li></ul>");
	}
	$('.Trip').append(divHead);
	var divImages = $('<div>').addClass('divTripImg')
	var aPrev = $('<a>').attr("id","previous").html("הקודם");
	var aNext = $('<a>').attr("id","next").html("הבא");
	var ulDivImg = $('<ul>').attr('id','menu');
	$.each(g_trip.tripSites, function(index,val){
		var imgFotorama = $("<li>").css("background-image","url("+val.img+")")
		// append($('<img>').attr("src",val.img));
		ulDivImg.append(imgFotorama);
		// console.log(ulDivImg)
	})
	$.each(g_trip.imageUrl, function(index,val){
		var imgFotorama = $("<li>").css("background-image","url("+val+")")
		// append($('<img>').attr("src",val.img));
		ulDivImg.append(imgFotorama);
		// console.log(ulDivImg)
	})
	// divImg.append(aPrev);
	// divImg.append(aNext);

	divImages.append(ulDivImg);
	divImages.append(aPrev);
	divImages.append(aNext)
	$('.Trip').append(divImages);

	var divArt =$('<div>').addClass('divArt');
	var articleDes=$('<article>');
	articleDes.append("<h4>"+TRIPPER_DATA.tripDescrition+"</h4>");
	articleDes.append("<p>" + g_trip.trip_description + "</p>");
	articleDes.append("<a href='#'>קרא עוד</a>")
	var ulTags = $('<ul>').addClass('asideFilter')
	var count=g_trip.trip_filter.length;
	$.each(g_trip.trip_filter, function(i,v){
		var liTag=$('<li>');
		liTag.append(hashtable[v]);
		ulTags.append(liTag);
	});

	divArt.append(articleDes);
	divArt.append(ulTags);
	$('.Trip').append(divArt)

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

	if(g_trip.tripSites.length>0){
		var timeline = $('<div>');
		var h2 = $('<h2>').html(TRIPPER_DATA.playlistSite).addClass('sitesTitle');
		 // timeline.append(h2)
		 timeline.attr({"id":"timeline"})
		 var ulSites = $('<ul>');
		 ulSites.attr({"id":"ulTimeLine"})
		 $.each(g_trip.tripSites , function(index,val){
		 	var li = $('<li>');
		 	var img = $('<img>');
		 	var span = $('<span>');
		 	var h4 = $('<h4>');
		 	span.html(index+1);
		 	h4.html(val.siteName);
		 	img.attr({"src":val.img, "width":50, "height":50});
		 	li.append(h4)
		 	li.append(span)
		 	li.append(img)

		 	ulSites.append(li);
		 });
		 timeline.append(ulSites);
		 $('.Trip').append(h2)
		 $('.Trip').append(timeline)
		 var meImg="";
		 var meSpan="";
		 var meH4="";
		 $('#ulTimeLine li').hover(function(){
		 	console.log("hover");
		 	$(this).css({"top":"0px","border":"1px solid #000000","padding":"12px","background-color":"#ffffff","border-radius":"30px","max-width":"250px"});
		 	meSpan = $(this).children('span');
		 	meSpan.css({"font-size":"20px","display":"none"});
		 	meH4 = $(this).children('h4');
		 	meH4.css({"display":"block"});
		 	meImg = $(this).children('img');
		 	meImg.attr({"width":125,"height":125}).css({"border-radius":"0px","width":"auto"});
		 }
		 , function(){
		 	$(this).css({"top":"75px","border":"none","background-color":"transparent","padding":"0px"});
		 	meSpan = $(this).children('span');
		 	meSpan.css({"font-size":"20px","display":"block"});
		 	meH4 = $(this).children('h4');
		 	meH4.css({"display":"none"});
		 	meImg = $(this).children('img');
		 	meImg.attr({"width":50,"height":50}).css({"border-radius":"50px",  "width": "50px"});
		 });
	}
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



	 var h3= $('<h3>').html(TRIPPER_DATA.toThisPlaylist+num+TRIPPER_DATA.comments);
	 var img = $('<img>').attr({"src":User.image,"id":"myImg"});
	 var h4 = $('<h4>').html(TRIPPER_DATA.addNewComment).attr("id","titleComment");


	 var textarea = $('<textarea>').attr({"type":"text","name":"comment","id":"comment"}).css({"display":"none"})
	var aSend= $('<a>').attr({"id":"submitComment"}).css({"display":"none"}).html(TRIPPER_DATA.send)




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

}

$(document).on("click", '.topImgScheduleList', function() {

	if ($(this).hasClass("selectedImgSchedule")) {
		$(this).removeClass("selectedImgSchedule").attr({'src':'images/add_track.png'});
		updateScheduleFromList(false, $(this).parent().attr('id'));

	} else {
		$(this).addClass("selectedImgSchedule").attr({'src':'images/remove_track.png'});
		updateScheduleFromList(true, $(this).parent().attr('id'));
	}
});
$(document).on("click", '.topImgStarList', function() {

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
    	var tempTrip=data;
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
        	if(isFavorite==true){
        		User.favorites.push(tempTrip)
        	}else{
        		var index = User.favorites.map(function(val){
        			return val['_id']
        		}).indexOf(tempTrip._id);
        		User.favorites.splice(index,1)
        		
        	}
        	removeImmediately();
        }
    });
    	
    }
});
}
function removeImmediately (){
	if(window.location.hash=='#viewFavorite')
		{
			console.log(User.favorites)
			displayListTrip(User.favorites);
		}
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
				alert(TRIPPER_DATA.didLike)
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
				    	,userId:User.email
				    },
		    	dataType: "json",
		    	error: function(jqXHR, textStatus, errorMessage) {
		    		console.log(errorMessage)


		    	},
		    	success: function(data) {
		    		console.log("update success");
		    		User.schedule.push(g_trip)
		    	}
		    });
   		  }
		});
	}
	else{
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
        		var index = User.schedule.map(function(val){
        			return val['_id']
        		}).indexOf(tripId);
        		User.schedule.splice(index,1);
        		
        	
		    removeImmSchedule();

    	}
    });
	}

};


  $( window ).hashchange(function() {
    var hash = location.hash;
    if (hash=="") {
    	appendTripCharachters();
    };
});

  $(document).on('click', '.divArt > article > a', function(){
	if($('.divArt > article > p').hasClass("open-desc")){
		$('.divArt > article > p').css("max-height", "6em").hide().slideUp("slow", function(){
			$(this).removeClass("open-desc");
			$('.divArt > article > p').css({
			"display" : "block",
			'max-height' : '6em',
			'position' : 'relative'
			});
		});

	}
	else{
		$('.divArt > article > p').slideDown("slow", function(){
		$(this).addClass("open-desc");
			$('.divArt > article > p').css({
			"display" : "block",
			'max-height' : '100%',
			'position' : 'relative'
			});
	});
	}


});

$(document).on('click','.btnChar', function(e){

	$(this).addClass('selectedChar');

	if(count==1)
	{
		$('#genres').html($(this).text())
		count++;
		clickedCharachters[0] = $(this).text();
		var div = $('<div>')
		
		var img = $('<img>').attr("src","images/arrow_2.png");
		var span = $('<span>').html("המשך  ")
		div.append(span);
		div.append(img);
		div.attr("id","continue").css({"display": "-webkit-inline-box","width":"auto","height":"auto"});
		
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

	$('#continue').click(function(){
		updateTripFromCharchters(clickedCharachters);
	});
	$('#continue').hover(function(){
		$(this).css({"background-color":"#22AF87","color":"#EED53D"});
		$(this).children('img').attr("src","images/arrow_2_hover.png");
	},function(){
		$(this).css({"color":"#ffffff"});
		$(this).children('img').attr("src","images/arrow_2.png");
	})
});

function addToFavoFromEdit(tripToUpdate){

	console.log("deleting trip " + g_trip);
	console.log("trip id: " +g_trip._id)
	console.log("trip to update", tripToUpdate)
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
    		console.log("adding trip to favorite")
    		$.ajax({
    			type: "post",
		        url: g_domain+"updateFavoirte",// where you wanna post
		        data:  {trip:{
		        	_id:tripToUpdate._id,
		        	trip_name:tripToUpdate.trip_name,
		        	area:tripToUpdate.area,
		        	tripSites : tripToUpdate.tripSites           	
		        }
		        ,userId:User.email, isFavorite:true},
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
	}
	if (e.originalEvent.newURL.indexOf("#addTripPage") != -1) {
		console.log("add")
		addDataToAddPage();
	}
});

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
	$("#addform")[0].reset();
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
	var h2Road=$("<h2>").html(TRIPPER_DATA.homePage);
	$("#groupButton").append(h2Road)
	var h2 = $('<h2>').attr("id","genres");
	$("#groupButton").append(h2);
	var div = $('<div>').addClass('buttons');
	$.each(tripCharacters, function(i, val){
		var buttonAppendCharachters = '<button class="btnChar">' + val + '</button>';
		div.append(buttonAppendCharachters);
	});
	$("#groupButton").append(div);
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
				User.email= (resp.emails) ?resp.emails[0].value : resp.id
				User.image = resp.image.url;
				//Gemail = plus.profile.emails.read
				// (resp.emails)? resp.emails[0].value : "zanzouritamar@gmail.com";
				//console.log("email!!!", Gemail)
				console.log(User);
				create_user(User);
				 $('.nameUser').html(User.name);
				 $('.imgUser').attr("src",User.image).show();
				 $('.loogOut').show();
				 $('.loogIn').hide();
				 $('.loogInMonbile').hide();
				 moveToHomePage();
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
	console.log("charachtrs length ", clickedCharachters.length)
	$.ajax({
		type: "post",
	    url: g_domain+"filterByChars",// where you wanna post
	    data:  {chars:tc, userId:User.email, numOfCharachters : clickedCharachters.length},
	    dataType: "json",
	    //contentType: "application/json",
	    error: function(jqXHR, textStatus, errorMessage) {
	    	console.log(errorMessage)


	    },
	    success: function(data) {
	    	count=1;
	    	janers = clickedCharachters;
	    	clickedCharachters=[];
	    	tripsAfterCharachters = data;
	    	g_ListTrip = data;
	    	displayListTrip(data);
	    	console.log(data)
	    	console.log("listResultTrip")
	    	moveTofilterPage();	      
	    } 
	});
}
/********  display trip on The Trip Page *********/
function displayListTrip(data){
	console.log(data)

	/**** data to result page *****/

	addDataFilters();

	/****end data to result page *****/
	if(window.location.hash=='#viewFavorite')
	{
		favoriteFlagList=1;
		$('#resultTitleFavorite').html(TRIPPER_DATA.resultTitleFavorite)
	}
	if(window.location.hash=='#accountPage')
	{
		accountFlagList=1;
	}
	console.log(accountCounter)
	if (accountCounter==0){
		$('#resultTitle').html(TRIPPER_DATA.resultTitle);
		if(janers.length==1){
			$('#chars').html(janers[0]);
		}else{
			$('#chars').html(janers[0]+" + "+janers[1])
		}
	};
	$('.displayTripRight').empty();
	$('.displayTripLeft').empty();
	$('#filtermenu').show();
	var ulR = $('.displayTripRight');
	var ulL = $('.displayTripLeft')
	trip=data;
	if (data.length==0){
		console.log("haimaajn");
		$('#resultTitle').html(TRIPPER_DATA.noResult);
		$('#filtermenu').hide();
	}else{
		$.each(data,function(index,val){
			var li = $('<li>');
			li.attr({"id":val._id}).addClass('listResultTrip trip');
			var imgTrip=$('<img>').attr({"src":val.tripSites[0].img,"width":"190px","height":"190px"})
			if(favoriteFlagList==1){
				imgTrip.addClass('TripImgFavorite ImgT').html(val.trip_name)
			}else if (accountFlagList==1){
				imgTrip.addClass('TripImgAccount ImgT').html(val.trip_name)
			}else{
				imgTrip.addClass('TripImg ImgT').html(val.trip_name)
			}
			
			li.append(imgTrip);
			

			var span = $('<span>');
			if(favoriteFlagList==1){
				span.addClass('titelNameFavorite').html(val.trip_name)
			}else if (accountFlagList==1){
				span.addClass('titelNameAccount').html(val.trip_name)
			}else{
				span.addClass('titelName').html(val.trip_name)
			}
			li.append(span);
			var h5 =$('<h5>').html( hashtable[val.area]).addClass('locH5');
			li.append(h5);
			if(accountFlagList==0 && favoriteFlagList==0){
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
					imgF.attr({"id":"img"+index+"Id",'src':'images/remove_favorites.png'}).addClass('topImgStarList selectedImgStar imgInList'); 
				}else{
					imgF = $('<img>')
					imgF.attr({"id":"img"+index+"Id",'src':'images/add_favorites.png'}).addClass('topImgStarList imgInList'); 
				}
				var schedules= []
				$.each(User.schedule, function(i,value){
					schedules.push(value._id)
				})
				if (schedules.indexOf(val._id) > -1) {
					imgS = $('<img>')
					imgS.attr({"id":"imgS"+index+"Id",'src':'images/remove_track.png'}).addClass('topImgScheduleList selectedImgSchedule imgInList'); 
				}else{
					imgS = $('<img>')
					imgS.attr({"id":"imgS"+index+"Id",'src':'images/add_track.png'}).addClass('topImgScheduleList imgInList'); 
				}
				li.append(imgF);
				li.append(imgS);
			}
			if(index % 2 ==0){
				ulR.append(li);
			}else{
				ulL.append(li);
			}
		});
	}
favoriteFlagList=0;
accountFlagList=0;
console.log("after display list",accountCounter)
}
$(document).on( "click", "#signOut", function() {
	console.log("signOut")
	gapi.auth.signOut();
});	

$(document).on('click','#showTrips',function(){
	// accountFlag=1;
	moveToAccountPage();
	if(!User.email)
	{
		$('.notRegister').html(TRIPPER_DATA.alert).show();
		$('.displayTripRight').empty();
		$('.displayTripLeft').empty();
	}else{
		$('.notRegister').hide();
		$('#userName').html(User.name);
		$('#userImg').attr({"src":User.image,"width":100,"height":100});

		getUserTrip();
	}
});
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
       	$('.')
       },
       error : function(objRequest, errortype) {
       }
   });
}

$(document).on('click','.titelNameFavorite',function(){
	
	favoriteFlag=1;
	accountFlag=0;
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
$(document).on('click','.TripImgFavorite',function(){
	
	favoriteFlag=1;
	accountFlag=0;
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
$(document).on('click','.titelNameAccount',function(){
	
	favoriteFlag=0;
	accountFlag=1;
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
$(document).on('click','.TripImgAccount',function(){
	
	favoriteFlag=0;
	accountFlag=1;
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
$(document).on('click','.TripImg',function(){
	
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

