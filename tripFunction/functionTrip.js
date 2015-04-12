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
	var count=0;
	var me;
	$('.btnChar').click(function(){
		me=this;
		if (count<2) {
			console.log("haim");
				count++;
				$(me).addClass('selectedChar');
			if(count==1)
			{
				$('#homePage #content').append("<a class='continue' href='index.ejs#resultTripPqge'> המשך </a>");
			}
			if(count==2)
			{

				moveTofilterPage();
				/*$('#groupButton').hide();
				$('#resultTrip').show();
				$('#resultTrip').prepend("<h3>תוצאות החיפוש</h3>");
				*/	
			}
		}
		else{
			console.log("no more then 2");
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


