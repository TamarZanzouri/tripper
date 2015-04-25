User={
	name:"",
	mail:""
};

g_trip={
	id:"",
	trip_name :"nameTrip",
	trip_description : "des",
	address : "location",
	email : "userEmail",
	trip_charachters : [{
		charachter : "char1"
	}, {
		charachter : "char2"
	}],
	trip_isPrivate : "privte",
	tripSites : [],
	area : "areaLocition"
};

var clickedCharachters = [];
var tripsAfterCharachters;

$(document).ready(function(){

	//adding site!
	var max_fields = 20;
	//maximum input boxes allowed
	var outer_wrapper = $(".ingredients_wrap");
	var wrapper = $(".ingredients_i");
	var firstIngredient = $(".firstIngredient");
	
	var x = 1;
	$(firstIngredient).focus(function(e){ //on add input button click
		e.preventDefault();
		console.log("focus " + x);
		if (x < max_fields) { //max input box allowed
			x++;
			$(this).off('focus');
			$(outer_wrapper).append('<div style="text-align: center;margin: auto;position: relative;align-content: center;"><input id="newChild' + x + '" class="ingredients_i gapper ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset newChild" style="text-align:center;margin:auto;width:100%" type="text" placeholder="אתר" name="ingredients[]"><input type="text" name="amount[]" style="width:100%;padding:5px 0 5px 0" placeholder="מיקום" class="firstAmount amounts_i" id="firstAmount"><a href="#" class="remove_field"> X </a></div>');	
		}
	});
	
	$(outer_wrapper).on("focus", ".newChild", function(e) {//on add input button click
		wrapper = $(".ingredients_i");
		console.log(wrapper[wrapper.length-1]);
		console.log(wrapper[wrapper.length-1].id);
		if (this.id == wrapper[wrapper.length-1].id){				
			console.log("focus " + x);
			x++;

			$(outer_wrapper).append('<div style="text-align: center;margin: auto;position: relative;align-content: center;"><input id="newChild' + x + '" class="ingredients_i gapper ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset newChild" style="text-align:center;margin:auto;width:100%" type="text" placeholder="אתר" name="ingredients[]"><input type="text" name="amount[]" style="width:100%;padding:5px 0 5px 0" placeholder="מיקום" class="firstAmount amounts_i" id="firstAmount"><a href="#" class="remove_field"> X </a></div>');	
		}
	});		

	$(outer_wrapper).on("click", ".remove_field", function(e) {//on add input button click			
		e.preventDefault(); 
		$(this).parent('div').remove(); 
	});


	


	var count=1;
	var me;
	$('.btnChar').click(function(){

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
		
	});





});

$(document).on('click','.listResultTrip',function(){
	moveToTripPage();

	var result = $(this);
	$('.Trip').empty();
	$('.Trip').append("<h3>הטיול הנבחר </h3>");
	$('.Trip').append(result);
	console.log(result[0].hasClass);

});



function changedArea(){
	$('#resultTrip ul').empty();
	if($('#selectArea').val() === ""){
		for(i in tripsAfterCharachters){
       		if(tripsAfterCharachters[i].tripSites){
      			
       			var tripResult = '<li class="listResultTrip"><span class="titelName"> שם הטיול:' + tripsAfterCharachters[i].trip_name + '</span>' + ' תיאור-הטיול: ' + tripsAfterCharachters[i].trip_description + ' מיקום: ' + tripsAfterCharachters[i].address +
       			+ 'תכונות: ' + tripsAfterCharachters[i].trip_charachters[0].charachter + ' ' + tripsAfterCharachters[i].trip_charachters[1].charachter  + '<br>אתרי הטיול<br>' + tripsAfterCharachters[i].tripSites[0].siteName + ' ' + tripsAfterCharachters[i].tripSites[0].location + '<br>' + tripsAfterCharachters[i].tripSites[1].siteName + ' ' + tripsAfterCharachters[i].tripSites[0].location + '</li>';
       			$('#resultTrip ul').append(tripResult);
       		}
       		else{
       			var tripResult = '<li class="listResultTrip"><span class="titelName"> שם הטיול:' + tripsAfterCharachters[i].trip_name + '</span>' + ' תיאור-הטיול: ' + tripsAfterCharachters[i].trip_description + ' מיקום: ' + tripsAfterCharachters[i].address +
       			+ 'תכונות: ' + tripsAfterCharachters[i].trip_charachters[0].charachter + ' ' + tripsAfterCharachters[i].trip_charachters[1].charachter  +  '</li>';
       			$('#resultTrip ul').append(tripResult);
       		}
		}
		return
	}
	for(i in tripsAfterCharachters){
		if($('#selectArea').val() === tripsAfterCharachters[i].area){
       		if(tripsAfterCharachters[i].tripSites){
      			
       			var tripResult = '<li class="listResultTrip "><span class="titelName"> שם הטיול:' + tripsAfterCharachters[i].trip_name + '</span>' + ' תיאור-הטיול: ' + tripsAfterCharachters[i].trip_description + ' מיקום: ' + tripsAfterCharachters[i].address +
       			+ 'תכונות: ' + tripsAfterCharachters[i].trip_charachters[0].charachter + ' ' + tripsAfterCharachters[i].trip_charachters[1].charachter  + '<br>אתרי הטיול<br>' + tripsAfterCharachters[i].tripSites[0].siteName + ' ' + tripsAfterCharachters[i].tripSites[0].location + '<br>' + tripsAfterCharachters[i].tripSites[1].siteName + ' ' + tripsAfterCharachters[i].tripSites[0].location + '</li>';
       			$('#resultTrip ul').append(tripResult);
       		}
       		else{
       			var tripResult = '<li class="listResultTrip"><span class="titelName"> שם הטיול:' + tripsAfterCharachters[i].trip_name + '</span>' + ' תיאור-הטיול: ' + tripsAfterCharachters[i].trip_description + ' מיקום: ' + tripsAfterCharachters[i].address +
       			+ 'תכונות: ' + tripsAfterCharachters[i].trip_charachters[0].charachter + ' ' + tripsAfterCharachters[i].trip_charachters[1].charachter  +  '</li>';
       			$('#resultTrip ul').append(tripResult);
       		}
		}

		}
	}


function validateMyForm(obj){
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
	console.log(comms);
	sendSites(comms);

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
				User.name=resp.displayName;
				User.mail=resp.emails[0].value
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
			type: "get",
        url: "http://127.0.0.1:1337/filterByChars",// where you wanna post
        data:  {chars:tc},
        dataType: "json",
        contentType: "application/json",
        error: function(jqXHR, textStatus, errorMessage) {
        	console.log(errorMessage)


        },
        success: function(data) {
        	$('#resultTrip ul').empty();
        	trip=data;
        	tripsAfterCharachters = {};
        	tripsAfterCharachters = data;
       	for (i in data) {
       		if(data[i].tripSites){
      			
       			var tripResult = '<li class="listResultTrip"><span class="titelName"> שם הטיול:' + data[i].trip_name + '</span>' + ' תיאור-הטיול: ' + data[i].trip_description + ' מיקום: ' + data[i].address +
       			+ 'תכונות: ' + data[i].trip_charachters[0].charachter + ' ' + data[i].trip_charachters[1].charachter  + '<br>אתרי הטיול<br>' + data[i].tripSites[0].siteName + ' ' + data[i].tripSites[0].location + '<br>' + data[i].tripSites[1].siteName + ' ' + data[i].tripSites[0].location + '</li>';
       			$('#resultTrip ul').append(tripResult);
       		}
       		else{
       			var tripResult = '<li class="listResultTrip"><span class="titelName"> שם הטיול:' + data[i].trip_name + '</span>' + ' תיאור-הטיול: ' + data[i].trip_description + ' מיקום: ' + data[i].address +
       			+ 'תכונות: ' + data[i].trip_charachters[0].charachter + ' ' + data[i].trip_charachters[1].charachter  +  '</li>';
       			$('#resultTrip ul').append(tripResult);
       		}
       	};
        	moveTofilterPage();	      
        } 
    });
	}

	$(document).on( "click", "#signOut", function() {
		console.log("signOut")
		gapi.auth.signOut();
	});	
	function sendSites(data){
		$.ajax({
			type: "get",
        url: "http://127.0.0.1:1337/sendSites",// where you wanna post
        data:  {sites:data},
        dataType: "json",
        contentType: "application/json",
       // contentType: "application/json",
       success : function(data) {console.log(data); 
       },
       error : function(objRequest, errortype) {
       }
   });
	}
	function create_user(user){
		$.ajax({
			type : "get",
			url : "http://127.0.0.1:1337/insertUser?email="+user.mail,
       // contentType: "application/json",
       success : function(data) {
       	console.log(data);
       	trip=data;

       	for (i in data) {
       		if(data[i].tripSites){
       			var tripResult = '<li class="listResultTrip trip'+ i +'"><span class="titelName"> שם הטיול:' + data[i].trip_name + '</span>' + ' תיאור-הטיול: ' + data[i].trip_description + ' מיקום: ' + data[i].address +
       			+ 'תכונות: ' + data[i].trip_charachters[0].charachter + ' ' + data[i].trip_charachters[1].charachter  + '<br>אתרי הטיול<br>' + data[i].tripSites[0].siteName + ' ' + data[i].tripSites[0].location + '<br>' + data[i].tripSites[1].siteName + ' ' + data[i].tripSites[0].location + '</li>';
       			$('#showTripsSec .displayTrip').append(tripResult);
       		}
       		else{
       			var tripResult = '<li class="listResultTrip trip'+ i +' "><span class="titelName"> שם הטיול:' + data[i].trip_name + '</span>' + ' תיאור-הטיול: ' + data[i].trip_description + ' מיקום: ' + data[i].address +
       			+ 'תכונות: ' + data[i].trip_charachters[0].charachter + ' ' + data[i].trip_charachters[1].charachter  +  '</li>';
       			$('#showTripsSec .displayTrip').append(tripResult);
       		}

       	};
       },
       error : function(objRequest, errortype) {
       }
   });
}
