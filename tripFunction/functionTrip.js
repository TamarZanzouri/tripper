User={};
g_domain="http://127.0.0.1:1337/";//"http://shenkartripper.herokuapp.com/";
mapPoint={};
g_trip={};
g_ListTrip=[];
var webView = {};
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
	});

$(document).ready(function(){
	
 var mapOptions = {
        center: new google.maps.LatLng(	 32.03952466510527, 34.83763210941106),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var infoWindow = new google.maps.InfoWindow();
    var latlngbounds = new google.maps.LatLngBounds();
    var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
    google.maps.event.addListener(map, 'click', function (e) {
        alert("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng());
    	console.log("Latitude: " + e.latLng.lat() + "\r\nLongitude: " + e.latLng.lng())
    	mapPoint.lat=e.latLng.lat();
    	mapPoint.lng=e.latLng.lng();
    });
    initDatepicker();
     
    
			//Use HTML5 Geolocation API To Get Current Position
	

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


   //   var distKM = 500;
	  // var formula = distance(point1.lat,point1.lng,point2.lat,point2.lng);
	  // console.log(formula);
	 // var t = navigator.geolocation;
	 // if (t ) {        //Use HTML5 Geolocation API To Get Current Position      
		// 	navigator.geolocation.getCurrentPosition(function(position){   
		//      //Get Latitude From Geolocation API    
		//         point1.lat = position.coords.latitude;       
		//       //Get Longitude From Geolocation API   
		//           point1.lng = position.coords.longitude; 
		//          })
		// } 
		// console,log
		// myLocation();
	//   $('#us3').locationpicker({
		
	//     location: {latitude: point1.lat, longitude: point1.lng},
	//     radius: 1000,
	//     inputBinding: {
	//         // latitudeInput: $('#us3-lat'),
	//         // longitudeInput: $('#us3-lon'),
	//         radiusInput: $('#us3-radius'),
	//         locationNameInput: $('#us3-address')
	//     },
	//     enableAutocomplete: true
	// });
	// $('#us6-dialog').on('shown.bs.modal', function() {
	//     $('#us3').locationpicker('autosize');
	// });
                   
	$('#home').click(function(){
		var tripCharacters = [];
		$('#groupButton').empty();
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
        	webView = data;
        	console.log(webView)
        	$.each(data, function(i, val){
        		$.each(val.trip_charachters, function(i, val){
        			tripCharacters.push(val.name);
        			// console.log(val.name)

        		})
        	});
        	appendTripCharachters(tripCharacters);
        }
	})
	})

	$('#addTripPage').click(function(){
		// webView = {}
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
        	webView = data;
        	console.log(webView);
        	appendFilters();
        }
	})
				})

	var max_fields = 20;
	// debugger;

	//maximum input boxes allowed
	var outer_wrapper = $(".ingredients_wrap");
	var wrapper = $(".ingredients_i");
	var firstIngredient = $(".firstIngredient");
	
	var x = 1;
	//$(firstIngredient).focus(function(e){ //on add input button click
	$(outer_wrapper).on("focus", ".firstIngredient", function(e) {//on add input button click
		e.preventDefault();
		console.log("focus " + x);
		if (x < max_fields) { //max input box allowed
			x++;
			$(this).off('focus');
			$(outer_wrapper).append('<div style="text-align: center;margin: auto;position: relative;align-content: center;"><input id="newChild' + x + '" class="ingredients_i gapper ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset newChild" style="text-align:center;margin:auto;width:100%" type="text" placeholder="אתר" name="ingredients[]"><input type="text" name="amount[]" style="width:100%;padding:5px 0 5px 0" placeholder="מיקום" class="firstAmount amounts_i amount'+x+'" id="firstAmount"><a href="#" class="remove_field"> X </a></div>');	
		}
	});
	
	$(outer_wrapper).on("focus", ".newChild", function(e) {//on add input button click
		wrapper = $(".ingredients_i");
		console.log(wrapper[wrapper.length-1]);
		console.log(wrapper[wrapper.length-1].id);
		if (this.id == wrapper[wrapper.length-1].id){				
			console.log("focus " + x);
			x++;

			$(outer_wrapper).append('<div style="text-align: center;margin: auto;position: relative;align-content: center;"><input id="newChild' + x + '" class="ingredients_i gapper ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset newChild" style="text-align:center;margin:auto;width:100%" type="text" placeholder="אתר" name="ingredients[]"><input type="text" name="amount[]" style="width:100%;padding:5px 0 5px 0" placeholder="מיקום" class="firstAmount amounts_i amount'+x+'" id="firstAmount"><a href="#" class="remove_field"> X </a></div>');	
		}
	});		

	$(outer_wrapper).on("click", ".remove_field", function(e) {//on add input button click			
		e.preventDefault(); 
		$(this).parent('div').remove(); 
	});

	$('#filter').click(function(){
		// debugger;
		if ($("#filteroptions").hasClass('hidden')) {
			console.log("has class");
			$("#filteroptions").removeClass('hidden');
			setTimeout(function () {
			}, 20);

		} else {
			$("#filteroptions").addClass('hidden');
			filter = [];
				$('input[type="checkbox"]').each(function(value) {
					if($(this).is(':checked')){
						console.log($(this).attr('id'));
						filter.push($(this).attr('id'));
					}
					else return;
				});
				console.log(filter);
				updateResultByFilterBeforeArea();
		}
	});

	$("#private_trip").click(function(){
		console.log("privateTrip")
		$('#isPrivate').append('<label id="addUsers">הוסף משתמשים אליהם יפורסם הטיול:<br><textarea placeholder="לדוגמא : haimyyy@gmail.com,\nzanzuoritamar@gmail.com" type="text" id="shareEmail" name="shareEmail" >');
		
	})
	$('#public_trip').click(function(){
		$('#addUsers').hide();
	})

});

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
	  date.checkInTime=checkin.viewDate;
	  date.checkOutTime=checkout.viewDate;
	  console.log(date);
	}).data('datepicker');


}
function showMyImage(fileInput) {
	var files = fileInput.files;
	for (var i = 0; i < files.length; i++) {           
		var file = files[i];
		var imageType = /image.*/;     
		if (!file.type.match(imageType)) {
			continue;
		}           
		var img=document.getElementById("thumbnil");            
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
/*
$(document).on('click','.saveSchedule',function(){

});*/
$(document).on('click','.listResultTrip',function(){
	

	var result = $(this).attr('id');
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
function displayFullTrip(data){
	console.log(data)
	$('.Trip').empty();
	$('.Trip').append("<h3>הטיול הנבחר </h3>");
	$('.Trip').append($("<img>").attr('src', 'images/smalLike.png').addClass('topImg').css({
			"opacity" : "0.4"
		}));
	$('.Trip').append("<span class='countLike'>" + g_trip.rate.value + "</span>");
	$('.Trip').append("<a id='favorite'>הוסף למועדפים</a> </br>");
	$('.Trip').append("<a id='updateSchedule'>בחר כמסלול ראשי</a>");
	
	$('.Trip').append("<h2>"+g_trip.trip_name+"</h2>");
	$('.Trip').append("<ul><li>"+g_trip.trip_charachters[0]+"</li><li>"+g_trip.trip_charachters[1] +"</li></ul>");

	$('.Trip').append("<img id='tripImg' src="+g_trip.imageUrl+">");
	var div=('<div>');
	div+=("<h4>תאור הטיול</h4>");
	div+=(g_trip.trip_description);
	$('.Trip').append(div);
	var strSites="<ul class=sitesUl>";
	strSites+="<h4>אתרים בטיול</h4>";
	$.each(g_trip.tripSites , function(index,val){
		strSites+="<li>";
		strSites+=" שם האתר :"+val.siteName+", מיקום האתר : \n"+val.location;

	});
	$('.Trip').append(strSites);
	$('.Trip').append("<label>הוסף תגובה<br><textarea type='text' name='comment' id='comment'></textarea></label>");	
	$('.Trip').append("<a id='submitComment'>שלח תגובה</a> </br>");


}

$(document).on("click", '.topImg', function() {
	// if (!g_user.email) {
	// 	alert("אנא התחבר למערכת")
	// 	return;
	// }
	if ($(this).hasClass("selectedImg")) {
		$(this).removeClass("selectedImg").css({
			"opacity" : "0.4"
		});
		currentValue = $(".countLike").html();
		newValue = parseInt(currentValue, 10);
		newValue = parseInt(newValue, 10) - 1;
		$(".countLike").html(newValue);
		updateRate(0);
		
	} else {
		temp_rate=updateRate(1);
		console.log(temp_rate)
		$(this).addClass("selectedImg").css({
			"opacity" : "1.0"
		});
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
	$('#comment').html("");
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
        	console.log(data)
        }
    });

});


$(document).on('click' ,'#favorite',function(){
	
	$.ajax({
		type: "post",
        url: g_domain+"updateFavoirte",// where you wanna post
        data:  {trip:{
        	_id:g_trip._id,
        	trip_name:g_trip.trip_name,
        	address:g_trip.address        	
        }
        ,userId:User.email},
        dataType: "json",
        error: function(jqXHR, textStatus, errorMessage) {
        	console.log(errorMessage)


        },
        success: function(data) {
        	console.log("update success");
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

$(document).on('click' ,'#updateSchedule',function(){

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
        		console.log("update schedule success");
        	}
        });

});


$(document).on('click','#mySchedule',function(){
	

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
});

function displayListScheduleTrip(data){
	console.log(data)
	$('#resultTrip ul').empty();
	g_list=data;
	for (i in data) {
		var tripResult = '<li id='+data[i]._id+' class="listScheduleTrip trip" ><span class="titelName"> שם הטיול:' + data[i].trip_name + '</span>' + ' מיקום: ' + data[i].address +'</li>';
		$('#resultTrip .displayTrip').append(tripResult);
	};
}
$(document).on('click','.listScheduleTrip',function(){
	

	var result = $(this).attr('id');
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
        	displayScheduleTrip(data);
        	
        }
    });
	moveToTripPage();
});
function displayScheduleTrip(data){
	$('.Trip').empty();
	$('.Trip').append("<h3>הטיול הנבחר </h3>");
	$('.Trip').append($("<img>").attr('src', 'images/smalLike.png').addClass('topImg').css({
			"opacity" : "0.4"
		}));
	$('.Trip').append("<span class='countLike'>" + g_trip.rate.value + "</span>");
	$('.Trip').append("<a id='favorite'>הוסף למועדפים</a> </br>");
	$('.Trip').append("<a id='removeFromSchedule'>הסר מהמסול ראשי</a>");
	
	$('.Trip').append("<h2>"+g_trip.trip_name+"</h2>");
	$('.Trip').append("<ul><li>"+g_trip.trip_charachters[0]+"</li><li>"+g_trip.trip_charachters[1] +"</li></ul>");

	$('.Trip').append("<img id='tripImg' src="+g_trip.imageUrl+">");
	var div=('<div>');
	div+=("<h4>תאור הטיול</h4>");
	div+=(g_trip.trip_description);
	$('.Trip').append(div);
	var strSites="<ul class=sitesUl>";
	strSites+="<h4>אתרים בטיול</h4>";
	$.each(g_trip.tripSites , function(index,val){
		strSites+="<li>";
		strSites+=" שם האתר :"+val.siteName+", מיקום האתר : \n"+val.location;

	});
	$('.Trip').append(strSites);
	$('.Trip').append("<label>הוסף תגובה<br><textarea type='text' name='comment' id='comment'></textarea></label>");	
	$('.Trip').append("<a id='submitComment'>שלח תגובה</a> </br>");

}
$(document).on('click','#removeFromSchedule',function(){
		console.log("start to removing")
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
	    	// g_trip=data;
	    	// displayFullTrip(data);
	    	moveToSchedule();
	    }
	});
});

$(document).on('click','#moveToFavorite',function(){
	

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
        	favoriteDisplayListTrip(data.favorites);
        }
    });
	moveToFavorite();
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
		$(this).addClass('selectedChar');
		if(count==1)
		{
			count++;
			clickedCharachters[0] = $(this).text();
			$('.continue').css('display','block');
		}
		else if(count==2)
		{
			clickedCharachters[1] = $(this).text();
			console.log(clickedCharachters[0] + " " + clickedCharachters[1]);
			count=1;
			updateTripFromCharchters(clickedCharachters);
		}

		$('.continue').click(function(){
			updateTripFromCharchters(clickedCharachters);
		});

});

$(document).on('submit','#addform',function(e){
	e.preventDefault();
	var form = new FormData(this); 
	var tempFilter = [];

	var wrapper = $(".ingredients_i");
	var amounts = $(".amounts_i");
	var comms = new Array();
	for (var i = 0; i < wrapper.length; i++){
		console.log(i);

		var comm = {};
		if (wrapper[i].value.trim() != ''){
			comm['siteName'] = wrapper[i].value;
			comm["location"] = amounts[i].value;
			comms.push(comm);
		}
	}
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
        	console.log(data)
        	if(edit==true){
        		addToFavoFromEdit(data);
        	}
        	edit=false;

        	moveToHomePage();	      
      } 
  });
})
function addToFavoFromEdit(data){
	$.ajax({
		type: "post",
        url: g_domain+"updateFavoirte",// where you wanna post
        data:  {trip:{
        	_id:data._id,
        	trip_name:data.trip_name,
        	address:data.address        	
        }
        ,userId:User.email},
        dataType: "json",
        error: function(jqXHR, textStatus, errorMessage) {
        	console.log(errorMessage)


        },
        success: function(data) {
        	console.log("update success to add to the favorite");
        }
    });
}
// function validateMyForm(obj){
// 	var wrapper = $(".ingredients_i");
// 	var amounts = $(".amounts_i");
// 	var comms = new Array();
// 	for (var i = 0; i < wrapper.length; i++){
// 		console.log(i);

// 		var comm = {};
// 		if (wrapper[i].value.trim() != ''){
// 			comm['siteName'] = wrapper[i].value;
// 			comm["location"] = amounts[i].value;
// 			comms.push(comm);
// 		}
// 	}
// 	console.log(comms);
// 	if (comms != 0)
// 		sendSites(comms);

// 	$.ajax({
// 		type: "post",
//         url: g_domain+"add",// where you wanna post
//         data:  obj,
//         dataType: "json",
//         //contentType: false,
//         //processData:false,
//         error: function(jqXHR, textStatus, errorMessage) {
//         	console.log(errorMessage)
//         },
//         success: function(data) {
//         	console.log(data)	

//       } 
//   });
// 	return false;
// }

function moveToAddPage() {
	$.mobile.changePage("#addTripPage", {
		transition : "none",
		changeHash : true
	});
	appendFilters();
}
function moveTofilterPage() {	
	$.mobile.changePage("#resultTripPqge", {
		transition : "none",
		changeHash : true
	});
	appendFilters();
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
	$.mobile.changePage("#homePage", {
		transition : "none",
		changeHash : true
	});
}

function appendTripCharachters(tripCharacters){
	$('#groupButton').append("<h2>חפשו לי מסלול...</h2>");
	$.each(tripCharacters, function(i, val){
		var buttonAppendCharachters = '<button class="btnChar">' + val + '</button>';
		var selectAppendCharachters = '<option value=' + val + '>' + val + '</option>';
		$("#groupButton").append(buttonAppendCharachters);
		$("#firstcharachter").append(selectAppendCharachters);
		$("#secondcharachter").append(selectAppendCharachters);		
	});
}

function appendFilters(){
	// debugger;
		$('.who_are_you_going_with').empty();
		$('.trip_kind').empty();
		$('.difficulty').empty();
		$('#isTripPrivate').empty();
	$.each(webView, function(i, parent){
		// console.log("paraent" + JSON.stringify(parent))
		$.each(parent.who_are_you_going_with, function(i, val){
			$('.who_are_you_going_with').append("<label for='" + val.filter + "' id=" + val.filter + "'>" + val.label + "</label>");
			$('.who_are_you_going_with').append("<input type='checkbox' name='who_are_you_going_with[]' value='" + val.filter + "' id='" + val.filter + "' class='custom'/>");
			console.log(val)
	})
});

	$.each(webView, function(i, parent){
		$.each(parent.trip_kind, function(i, val){
			$('.trip_kind').append("<label for='" + val.filter + "' id=" + val.filter + "'>" + val.label + "</label>");
			$('.trip_kind').append("<input type='checkbox' name='trip_kind[]' value='" + val.filter + "' id='" + val.filter + "' class='custom'/>");
			console.log(val)
})
});

	$.each(webView, function(i, parent){
	$.each(parent.difficulty, function(i, val){
		$('.difficulty').append("<label for='" + val.filter + "' id=" + val.filter + "'>" + val.label + "</label>");
		$('.difficulty').append("<input type='checkbox' name='difficulty' value='" + val.filter + "' id='" + val.filter + "' class='custom'/>");
		console.log(val)
})
});

	$.each(webView, function(i, parent){
	$.each(parent.isTripPrivate, function(i, val){
		$('#isTripPrivate').append("<label for='" + val.filter + "' id=" + val.filter + "'>" + val.label + "</label>");
		$('#isTripPrivate').append("<input type='radio' name='isTripPrivate' value='" + val.value + "' id='" + val.filter + "' class='custom'/>");
		console.log(val)
})
});
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
		$('#resultTrip ul').empty();
		trip=data;
		for (i in data) {
			var tripResult = '<li id='+data[i]._id+' class="listResultTrip trip" ><span class="titelName"> שם הטיול:' + data[i].trip_name + '</span>' + ' מיקום: ' + data[i].address +'</li>';
			$('#resultTrip .displayTrip').append(tripResult);
		};


}
$(document).on( "click", "#signOut", function() {
	console.log("signOut")
	gapi.auth.signOut();
});	
// function sendSites(data){
// 	$.ajax({
// 		type: "get",
//         url:g_domain+"sendSites",// where you wanna post
//         data:  {sites:data},
//         dataType: "json",
//         contentType: "application/json",
//        success : function(data) {console.log(data); 
//        },
//        error : function(objRequest, errortype) {
//        }
//    });
// }
$(document).on('click','#showTrips',function(){
	moveToAccountPage();
	getUserTrip();
});

	function create_user(user){
		$.ajax({
			type : "POST",
			url : g_domain+"registerUser",
			data : user,
			dataType:"json",
       // contentType: "application/json",
       success : function(data) {
       	console.log(data);
       	User = data;
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
$(document).on('click','.favoriteListResultTrip',function(){
	

	var result = $(this).attr('id');
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
        	favoriteDisplayFullTrip(data);
        	
        }
    });
	moveToTripPage();
});

function favoriteDisplayListTrip(data){
	console.log(data)
	$('#resultTrip ul').empty();
	trip=data;
	for (i in data) {
		var tripResult = '<li id='+data[i]._id+' class="favoriteListResultTrip trip" ><span class="titelName"> שם הטיול:' + data[i].trip_name + '</span>' + ' מיקום: ' + data[i].address +'</li>';
		$('#resultTrip .displayTrip').append(tripResult);
	};
}
function favoriteDisplayFullTrip(data){
	g_trip=data;
	console.log(data)
	$('.Trip').empty();
	$('.Trip').append("<h3>הטיול הנבחר </h3>");
	$('.Trip').append("<h2>"+data.trip_name+"</h2>");
	$('.Trip').append("<a id='editFavorite'>ערוך טיול כרצונך</a> </br>");
	$('.Trip').append("<a id='updateSchedule'>בחר כמסלול ראשי</a>");
	$('.Trip').append("<label>הוסף תגובה<br><textarea type='text' name='comment' id='comment'></textarea></label>");	
	$('.Trip').append("<a id='submitComment'>שלח תגובה</a> </br>");

}
$(document).on('click','#editFavorite',function(){
	

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
	    	// g_trip=data;
	    	// displayFullTrip(data);
	    }
	});



	edit=true;
	moveToAddPage();
	$('#trip_name').val(g_trip.trip_name);
	$('#description').val(g_trip.trip_description);
	$('#trip_address').val(g_trip.address);
	switch(g_trip.area) {
	    case 'tel-aviv':
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
