var listSection=['homeSec','addTripSec','showTripsSec','myFavoritesSec']

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
		$('.btn').each(function(value){
			if (count<2) {
					count++;
					$(me).addClass('selectedChar');
			}
		});
	});
/*
	$('form').submit(function(e){
			e.preventDefault();
			console.log(this.newTrip, this.des)
			$.ajax({
			  url: "http://localhost:1337/add",
			  method: "POST",
			  data:{newTrip: this.newTrip, des:this.des}
			})
			  .done(function( data ) {
			    
			      console.log( data );
			  })
			  .fail(function(err){
 				console.log( err );
			  });
			  return false;
	});*/
});