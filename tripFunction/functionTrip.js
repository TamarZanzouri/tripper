var listSection=['homeSec','addTripSec','showTripsSec','myFavoritesSec'];
User={
	name:"",
	mail:""
};
var clickedCharachters = [];

$(document).ready(function(){



	$('#displayTrip li').click(function(){
		$('#displayTrip li').each(function(index,value){
			if ($(value).hasClass('selected')) {
				$(value).removeClass('selected');
			};
		})
		$(this).addClass('selected');
	});

	$('.nav-pills li').click(function(){
		$('.nav-pills li').each(function(index,value){
			if ($(value).hasClass('active')) {
				$(value).removeClass('active');
			};
		})
		$(this).addClass('active');
	});
	/*$('#addTrip').click(function(){
		$.each(listSection,function(index,value){
			$('#'+value).hide();
		});
		$('#addTripSec').show();
	});*/
	/*$('#showTrips').click(function(){
		moveToAccountPage();
	});*/
	

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
					$(outer_wrapper).append('<div style="text-align: center;margin: auto;position: relative;align-content: center;"><input id="newChild' + x + '" class="ingredients_i gapper ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset newChild" style="text-align:center;margin:auto;width:80%" type="text" placeholder="אתר" name="ingredients[]"><input type="text" name="amount[]" style="width:75%;padding:5px 0 5px 0" placeholder="מיקום" class="firstAmount amounts_i" id="firstAmount"><a href="#" class="remove_field"> X </a></div>');	
		}
	});
	
	$(outer_wrapper).on("focus", ".newChild", function(e) {//on add input button click
		wrapper = $(".ingredients_i");
		console.log(wrapper[wrapper.length-1]);
		console.log(wrapper[wrapper.length-1].id);
		if (this.id == wrapper[wrapper.length-1].id){				
			 console.log("focus " + x);
			 x++;
			 
			$(outer_wrapper).append('<div style="text-align: center;margin: auto;position: relative;align-content: center;"><input id="newChild' + x + '" class="ingredients_i gapper ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset newChild" style="text-align:center;margin:auto;width:80%" type="text" placeholder="אתר" name="ingredients[]"><input type="text" name="amount[]" style="width:75%;padding:5px 0 5px 0" placeholder="מיקום" class="firstAmount amounts_i" id="firstAmount"><a href="#" class="remove_field"> X </a></div>');	
		}
	});		

	$(outer_wrapper).on("click", ".remove_field", function(e) {//on add input button click			
		e.preventDefault(); 
		$(this).parent('div').remove(); 
	});



$('#home').click(function(){
	$.each(listSection,function(index,value){
		console.log(value);
		$('#'+value).hide();
	});
	$('#homeSec').show();
});
	/*$('.btn').click(function(){
		noMore2();
		$(this).addClass('selectedChar');
	});*/
var count=1;
var me;
$('.btnChar').click(function(){
	//me=this;

		
		$(this).addClass('selectedChar');
		if(count==1)
		{
			count++;
			clickedCharachters.push($(this).text());
			$('.continue').css('display','block');
		}
		else if(count==2)
		{
			clickedCharachters.push($(this).text());
			console.log(clickedCharachters[0] + " " + clickedCharachters[1]);
			updateTripFromCharchters(clickedCharachters);
		}
	
});
$('.listResultTrip').click(function(){
	$('#myChoose').empty();
	$('#resultTrip').hide();
	$('#myChoose').show();
	$('#myChoose').append(this);
	$('#myChoose').prepend("<h3>הטיול הנבחר</h3>");
});
});

function changedArea(){
	clickedCharachters.push($('#selectArea').val());
	console.log(clickedCharachters);
		$.ajax({
        type: "get",
        url: "http://127.0.0.1:1337/filterByCharsAndLocation",// where you wanna post
        data:  {chars:clickedCharachters},
        dataType: "json",
        contentType: "application/json",
        error: function(jqXHR, textStatus, errorMessage) {
          console.log(errorMessage)

				  
        },
        success: function(data) {
        	console.log(data);
        	$('#resultTrip ul').empty();
        	for (i in data) {
        		var tripResult = '<li class="listResultTrip"><span class="titelName"> שם הטיול:' + data[i].trip_name + '</span>' + ' תיאור-הטיול: ' + data[i].trip_description + ' מיקום: ' + data[i].address +
        							+ 'תכונות: ' + data[i].trip_charachters[0].charachter + ' ' + data[i].trip_charachters[1].charachter  +  '</li>';
        		$('#resultTrip ul').append(tripResult);
        		console.log(data[i].trip_name)
        	};
			// moveTofilterPage();	      
		} 
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
				User.mail=resp.emails[0].value;
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
        	console.log(data);
        	for (i in data) {
        		var tripResult = '<li class="listResultTrip"><span class="titelName"> שם הטיול:' + data[i].trip_name + '</span>' + ' תיאור-הטיול: ' + data[i].trip_description + ' מיקום: ' + data[i].address +
        							+ 'תכונות: ' + data[i].trip_charachters[0].charachter + ' ' + data[i].trip_charachters[1].charachter  +  '</li>';
        		$('#resultTrip ul').append(tripResult);
        		console.log(data[i].trip_name)
        	};
			moveTofilterPage();	      
		} 
    });
}


$(document).on( "click", "#signOut", function() {
  console.log("signOut")
  gapi.auth.signOut();
});	

function create_user(user){
	$.ajax({
		type : "get",
		url : "http://127.0.0.1:1337/insertUser?email="+user.mail,
       // contentType: "application/json",
		success : function(data) {console.log(data); 
		},
		error : function(objRequest, errortype) {
		}
	});
}


	// $('form').submit(function(e){
	// 		e.preventDefault();
	// 		console.log(this.newTrip, this.des)
	// 		$.ajax({
	// 		  url: "http://localhost:1337/add",
	// 		  method: "POST",
	// 		  data:{newTrip: this.newTrip, des:this.des}
	// 		})
	// 		  .done(function( data ) {

	// 		      console.log( data );
	// 		  })
	// 		  .fail(function(err){
 // 				console.log( err );
	// 		  });
	// 		  return false;
	// });


