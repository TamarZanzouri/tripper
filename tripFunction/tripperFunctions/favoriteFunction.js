$(document).on('click','#moveToFavorite',function(){
	if(!User.email)
	{
		$('.notRegister').html(TRIPPER_DATA.alert).show();
		$('.displayTripRight').empty();
		$('.displayTripLeft').empty();
	}else{
		$('.notRegister').hide();
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