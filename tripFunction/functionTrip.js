var listSection=['homeSec','addTripSec','showTripsSec','myFavoritesSec'];

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
var count=1;
var me;
var clickedCharachters = [];
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


