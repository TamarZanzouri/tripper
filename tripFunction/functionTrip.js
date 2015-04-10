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
	$('#addTrip').click(function(){
		$.each(listSection,function(index,value){
			$('#'+value).hide();
		});
		$('#addTripSec').show();
	});
	$('#showTrips').click(function(){
		$.each(listSection,function(index,value){
			console.log(value);
			$('#'+value).hide();
		});
		$('#showTripsSec').show();
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
	var count=0;
	var me;
	$('.btn').click(function(){
		me=this;
		if (count<2) {
			console.log("haim");
				count++;
				$(me).addClass('selectedChar');
			if(count==1)
			{
				$('#homeSec').append("<a class='continue' href='index.ejs#resultTrip'> המשך </a>");
			}
			if(count==2)
			{
				$('#groupButton').hide();
				$('#resultTrip').show();
				$('#resultTrip').prepend("<h3>תוצאות החיפוש</h3>");
					$.ajax({
						url : "http://imcook.herokuapp.com/icook/updateFavorite",
						type : 'post',
						data : {
							email : user.email,
							recipeId : recipeId
						},
						dataType : 'json',
						success : setFavoriteCallback,
						error : errorCallback
					});
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
});