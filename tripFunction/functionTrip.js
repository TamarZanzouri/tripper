var listSection=['homeSec','addTripSec','showTripsSec','myFavoritesSec'];
user={
	name:"",
	mail:""
};
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
var count=0;
var me;
var clickedCharachters = [];
$('.btnChar').click(function(){
	me=this;
	if (count<2) {
		count++;
		$(me).addClass('selectedChar');
		if(count==1)
		{
			clickedCharachters.push($(this).text());
			$('#homePage #content').append("<a class='continue' href='index.ejs#resultTripPqge'> המשך </a>");
		}
		if(count==2)
		{
			clickedCharachters.push($(this).text());
			console.log(clickedCharachters[0] + " " + clickedCharachters[1]);
			moveTofilterPage();
		}
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
				user.name=resp.displayName;
				user.mail=resp.emails[0].value;
				console.log(user);
				create_user(user);
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
$(document).on( "click", "#signOut", function() {
  console.log("signOut")
  gapi.auth.signOut();
});	

function create_user(user){
	$.ajax({
		type : "post",
		url : "https://shenkartripper.herokuapp.com/index/insertUser",
		data : user,
		//contentType : "applecation/json",
		dataType : 'json',
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


