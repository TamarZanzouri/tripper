$(document).on('submit','#addform',function(e){
	e.preventDefault();
	var form = new FormData(this); 

	var tempFilter = [];
	var tempJaners = [];
	var wrapper = $(".siteName");
	// var images = $("image_i");
	var comms = new Array();
	for (var i = 0; i < wrapper.length; i++){
		console.log(i);
		// debugger;
		var comm = {};
		if (wrapper[i].value){
			comm['siteName'] = wrapper[i].value;
			// comm["image"] = images[i].value;
			comms.push(comm);
		}
	}
	console.log(comms)
	if (comms.length > 0)
		form.append("sites", JSON.stringify(comms));	
	else form.append("sites", JSON.stringify([]));	
	//console.log($(this))
	form.append("email",User.email);
	form.append("mapPoint",JSON.stringify(mapPoint));
	// debugger;
	$('.who_are_you_going_with input:checked').each(function(value) {
			tempFilter.push($(this).attr('id'));
	});
	$('.trip_kind input:checked').each(function(value) {
			tempFilter.push($(this).attr('id'));
	});
	console.log(tempFilter)
	form.append("trip_filter", JSON.stringify(tempFilter));
	$('#pickJanerul input:checked').each(function(){
		tempJaners.push($(this).prev('label').text());
	});
	console.log(tempJaners)
	form.append("trip_charachters", JSON.stringify(tempJaners));
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
	console.log(form);
	console.log("janers", tempJaners, "filter",tempFilter)
	return
	if(($(this).find('#imgUpload')[0].files.length) > 0){
		console.log("uploading images")
		if(editFromAccount){
		form.append("tripId" , g_trip._id);
		form.append("flag" , "account");
		$.ajax({
			type: "post",
		        url: g_domain+"updateTripWithImage",// where you wanna post
		        data:  form,
		        //dataType: "json",
		        contentType: false,
		        processData:false,
		        error: function(jqXHR, textStatus, errorMessage) {
		        	console.log(errorMessage)
		        },
		        success: function(data) {
		        	$("#addform")[0].reset();
		        	console.log(data.res)
		        	editFromAccount=false;
		        } 
		    });
		moveToAccountPage();
	}
	else if(edit){
		form.append("flag", "favorites");
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
		        	console.log(data.res)
		        	if(edit==true){
		        		addToFavoFromEdit(data.res);
		        	}
		        	edit=false;
		        } 
		    });
		moveToHomePage();
	}
	else{
		form.append("flag", "addNewTrip");
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
		        	console.log(data.res)
		        } 
		    });
		moveToHomePage();
	}
	}
	else{
		if(editFromAccount){
		form.append("tripId" , g_trip._id);
		form.append("flag" , "account");
		$.ajax({
			type: "post",
		        url: g_domain+"updateTripWithOutImages",// where you wanna post
		        data:  form,
		        //dataType: "json",
		        contentType: false,
		        processData:false,
		        error: function(jqXHR, textStatus, errorMessage) {
		        	console.log(errorMessage)
		        },
		        success: function(data) {
		        	$("#addform")[0].reset();		        	
		        	console.log(data.res)
		        	editFromAccount=false;
		        } 
		    });
		moveToAccountPage();
	}
	else if(edit){
		form.append("tripId", g_trip._id)
		form.append("flag", "favorites");
		$.ajax({
			type: "post",
		        url: g_domain+"addTripWithoutImages",// where you wanna post
		        data:  form,
		        //dataType: "json",
		        contentType: false,
		        processData:false,
		        error: function(jqXHR, textStatus, errorMessage) {
		        	console.log(errorMessage)
		        },
		        success: function(data) {
		        	console.log(data.res)
		        	if(edit==true){
		        		addToFavoFromEdit(data.res);
		        	}
		        	edit=false;
		        } 
		    });
		moveToHomePage();
	}
	else{
		form.append("flag", "addNewTrip");
		$.ajax({
			type: "post",
		        url: g_domain+"addTripWithoutImages",// where you wanna post
		        data:  form,
		        //dataType: "json",
		        contentType: false,
		        processData:false,
		        error: function(jqXHR, textStatus, errorMessage) {
		        	console.log(errorMessage)
		        },
		        success: function(data) {
		        	console.log(data.res)
		        } 
		    });
		moveToHomePage();
	}
	}
return true;
})

$(document).on("click","addTrip",function(){
	moveToAddPage()
	addDataToAddPage();
});
function addDataFilters(){
		$('#who_are_you_going_with div button .nameF').html(TRIPPER_DATA.who_are_you_going_with);
		$('label[for="trip_with_animals"]').text(TRIPPER_DATA.trip_with_animals);
		$('label[for="trip_with_road"]').text(TRIPPER_DATA.trip_with_road);
		$('label[for="trip_for_children"]').text(TRIPPER_DATA.trip_for_children);
		
		$('#trip_kind div button .nameF').html(TRIPPER_DATA.trip_kind);
		$('label[for="trip_with_watter"]').text(TRIPPER_DATA.trip_with_watter);
		$('label[for="trip_with_bicycle"]').text(TRIPPER_DATA.trip_with_bicycle);
		$('label[for="trip_with_jeep"]').text(TRIPPER_DATA.trip_with_jeep);
		$('label[for="trip_for_day"]').text(TRIPPER_DATA.trip_for_day);
		$('label[for="trip_for_night"]').text(TRIPPER_DATA.trip_for_night);
};
var numOfSite=0;
function addDataToAddPage(){
	$('#preivateT').hide();
	addDataFilters();
	$('#addTripTitle').html(TRIPPER_DATA.addTripTitle);

	numOfSite++;
	var div = $('<div>').addClass('site');
	var p = $('<p>').html(numOfSite+'.');
	var inputName =$('<input>').attr({"id":"siteName"+numOfSite,"type":"text","name":"site","placeholder":"אתר","class":"siteName"});
	var inputFile =$('<input>').attr({"id":"imgUpload","type":"file","class":"file","accept":"image/*","value":"העלת תמונה","onchange":"showMyImage(this,'')","name":"file","class":"image_i"});
	var img = $('<img>').attr({'id':'thumbnil'}).addClass('thumbnil');
	div.append(p);
	div.append(inputName);
	div.append(inputFile);
	div.append(img);
	$('.sites').append(div);
	$('.addNewSite').click(function(){
		numOfSite++;
		var div = $('<div>').addClass('site');
		var p = $('<p>').html(numOfSite+'.');
		var inputName =$('<input>').attr({"id":"siteName"+numOfSite,"type":"text","name":"site","placeholder":"אתר","class":"siteName"});
		var inputFile =$('<input>').attr({"id":"imgUpload"+numOfSite,"type":"file","class":"file","accept":"image/*","value":"העלת תמונה","onchange":"showMyImage(this,"+numOfSite+")","name":"file","class":"image_i"});
		var img = $('<img>').attr({'id':'thumbnil'+numOfSite}).addClass('thumbnil');
		div.append(p);
		div.append(inputName);
		div.append(inputFile);
		div.append(img);
		$('.sites').append(div);
	})
	$("#private_trip").click(function(){
		$('#preivateT').show();
	})

	$('#public_trip').click(function(){
		$('#preivateT').hide();
	})
}

$(document).on('click','#editFavorite',function(){
	console.log(g_trip)
	edit=true;
	moveToAddPage();
	$('#trip_name').val(g_trip.trip_name);
	$('#description').val(g_trip.trip_description);
	$('#trip_address').val(g_trip.address);
	switch(g_trip.area) {
		case 'tel_aviv':
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
		$("label[for='"+val+"']").prev('input').attr("data-cacheval","false");
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
				$('#newChild'+(i+1)).val(val.siteName);
				$('#thumbnil'+(i+1)).attr("src",val.img);
			};
		});
	}
	// $('#imgUpload').focus();
	// $('#thumbnil').attr("src",g_trip.imageUrl);
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

$(document).on('click','#editTripFromAccount',function(){

	console.log(g_trip)
	editFromAccount=true;
	moveToAddPage();
	$('#trip_name').val(g_trip.trip_name);
	$('#description').val(g_trip.trip_description);
	$('#trip_address').val(g_trip.address);
	switch(g_trip.area) {
		case 'tel_aviv':
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
		$("label[for='"+val+"']").prev('input').attr("data-cacheval","false");
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
				$('#newChild'+(i+1)).val(val.siteName);
				$('#thumbnil'+(i+1)).attr("src",val.img);
			};
		});
	}

	if(g_trip.mapPoint){
		mapPoint.lat=g_trip.mapPoint.lat;
		mapPoint.lng=g_trip.mapPoint.lng;
	}

});
function firstSites(){
	$('.firstIngredient').trigger('focus').val(g_trip.tripSites[0].siteName);
	$('#thumbnil').attr("src",g_trip.tripSites[0].img);
	$('#imgUpload').val(g_trip.tripSites[0].img);
}