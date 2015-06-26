$(document).ready(function(){
		$("#shareSchedule").emailautocomplete({
		suggClass: "custom-classname", //default: "eac-sugg". your custom classname (optional)
		domains: ["example.com"] //additional domains (optional)
	});

	$('#shareEmail').emailautocomplete({
			suggClass: "custom-classname", //default: "eac-sugg". your custom classname (optional)
			domains: ["example.com"] //additional domains (optional)
	});




	$('#updateFriendsWithChanges').click(function(){
		console.log(g_ListTrip)
		if(!(_.contains(shareScheduleWithFriends, User.email ))){
			shareScheduleWithFriends.push(User.email)
		}	

		if(shareScheduleWithFriends.length>0)
		{
			console.log("sending email")
			$.ajax({
				type: "post",
		        url: g_domain+"updateScheduleParticipents",// where you wanna post
		        data:  {trips:g_ListTrip, sharedEmail:shareScheduleWithFriends, dateOfTrip : date},
		        dataType: 'json',
		        error: function(jqXHR, textStatus, errorMessage) {
		        	console.log(errorMessage)
		        },
		        success: function(data) {
		        	console.log("update success");
		        }
		    });
		}
	});
});
$(document).on('click','#addFriendToSchedule',function(){
	if($('#shareSchedule').val())
	{
		var checkMail = $('#shareSchedule').val();
		console.log(checkMail)
		if(!checkIfUserIsInPartners(checkMail)){
			if(!(_.contains(shareScheduleWithFriends, User.email))){
				console.log(shareScheduleWithFriends)
				shareScheduleWithFriends.push(User.email)
		}
		console.log("sending email",shareScheduleWithFriends)
		$.ajax({
			type: "post",
        url: g_domain+"updateScheduleParticipents",// where you wanna post
        data:  {trips:g_ListTrip, sharedEmail:shareScheduleWithFriends, dateOfTrip : date, checkIfUserExists : checkMail},
        dataType: 'json',
        error: function(jqXHR, textStatus, errorMessage) {
        	console.log(errorMessage)
        },
        success: function(data) {
        	if(data.status === 1){
        		console.log("1 return")
        		console.log("###",shareScheduleWithFriends);
        		shareScheduleWithFriends.push(checkMail);
        		// User.tripPatners.push(checkMail);
        		console.log(shareScheduleWithFriends,User.tripPatners);
        	}
        	console.log("update success");
        	$('#shareSchedule').val("");
        	updateSharedTrip();
        }

	    });
	}
	else{
		console.log("user in participents")
	}
}	
return
});

function displayListScheduleTrip(data){
	console.log("data " + data)
	$('#resultTrip ul').empty();
	$('#friendsemail').empty()
	g_ListTrip=data;
	shareScheduleWithFriends = User.tripPatners;
	if (User.tripScheduleTime.checkInTime && User.tripScheduleTime.checkOutTime) {
	$('#dpd1').val(User.tripScheduleTime.checkInTime.substring(0, User.tripScheduleTime.checkInTime.length-14));
	$('#dpd2').val(User.tripScheduleTime.checkOutTime.substring(0, User.tripScheduleTime.checkOutTime.length-14));
	}
	// for (i in data) {
	// 	var tripResult = '<li id='+data[i]._id+' class="listScheduleTrip trip" ><span class="titelName">' + data[i].trip_name + '</span>' + ' מיקום: ' + data[i].address +'</li>';
	// 	$('#resultTrip .displayTrip').append(tripResult);
	// };
	$.each(User.tripPatners, function(i, val){
		console.log(val)
		$('#friendsemail').append("<div id='emailNum" + i + "'>" + val + "</div>");
		$('#emailNum' + i).append("<button id='deleteMailFromSchedule'> &#10006 </button>");
	})
	$('.titelNameSchedule').html(TRIPPER_DATA.titelNameSchedule);
	// var divUser = $('<div>').addClass('userDetailes');
	$('.divShareSchedule label').html(TRIPPER_DATA.divShareSchedule);

	$('label[for="dpd1"]').text(TRIPPER_DATA.dpd1);
	$('label[for="dpd2"]').text(TRIPPER_DATA.dpd2);
	// $('.userDetailes').empty();
	// if (User) {
	// 	// var divUser = $('<div>').addClass('userDetailes');
	// 	var spanUser = $('<span>').html(User.name).addClass('nameUser');
	// 	var imgUser = $('<img>').attr("src",User.image).addClass('imgUser');
	// 	$('.userDetailes').append(imgUser)
	// 	$('.userDetailes').append(spanUser)
	// }
	if (g_ListTrip.length > 0) {
		$('#scheduleTimeLline').css("display","block");
	
	var ul = $('#ulTimeLineSchedule');
	ul.empty();
	$.each(g_ListTrip, function (index,val){
		var li = $('<li>').addClass('liImeLine').attr("id",val._id);
		var num =$('<p>').html(index+1).addClass('numberTrip');
		var span = $('<span>').addClass('moveToTrip');
		var img = $('<img>').addClass('moveToTrip');
		
		span.html(val.trip_name).css('display','none');
		img.attr({"src":val.tripSites[0].img, "width":50, "height":50})


		li.append(num);
		li.append(img);
		li.append(span);
		var h5 =$('<h5>').html( hashtable[val.area]).addClass('locH5Schedule').css("display","none").addClass('moveToTrip');;
		li.append(h5);
		var ulSmall =$('<dl>').addClass("smallULSchedule").css("display","none");
		$.each(val.trip_filter,function(i,v){
			var liSmall = $('<dt>')
			var imgVi= $('<img>').attr({"src":"images/vi.png"}).addClass("viSchedule");
			liSmall.append(imgVi);
			liSmall.append( hashtable[v])
			ulSmall.append(liSmall)
		});
		li.append(ulSmall);
		var aTrip =$('<a>').attr({"id":"remove_track","href":"#"}).addClass('remove_track').html(TRIPPER_DATA.remove_track);
		li.append(aTrip);
		ul.append(li);
	});
	var meImg="";
	var meSpan="";
	var meArea="";
	var meUl="";
	var meA = "";
	$('.remove_track').click(function(){
		console.log($(this).parent().attr('id'))
		updateScheduleFromList(false,$(this).parent().attr('id'));
	});
	$('#ulTimeLineSchedule li').hover(function(){
		console.log("hover");
		$(this).css({"top":"-50px","border":"1px solid #000000","padding":"12px","background-color":"#ffffff","border-radius":"30px"});
		meSpan = $(this).children('span');
		meSpan.css({"display":"block","font-size":"22px","padding": "0px 10px 0 2px"});
		meNum = $(this).children('p');
		meNum.hide();
		
		meImg = $(this).children('img');
		meImg.attr({"width":125,"height":125}).css({"border-radius":"0px","float":"right"});
		//$(this).attr({"width":100,"height":100})
		meArea = $(this).children('h5');
		meArea.css("display","table-cell");
		meUl = $(this).children('dl');
		meUl.css("display","inline-block");
		meA = $(this).children('a');
		meA.css({"display":"inline-block","float": "left"})
	}
	, function(){
		$(this).css({"top":"68px","border":"none","background-color":"transparent","padding":"0px"});
		meSpan = $(this).children('span');
		meSpan.css({"display":"none","font-size":"20px","float":"none","padding": "0"});
		meNum = $(this).children('p');
		meNum.show();
		//me=$(this).attr({"width":50,"height":50});
		//div.append(me)
		meImg = $(this).children('img');
		meImg.attr({"width":50,"height":50}).css({"border-radius":"50px","float":"none"});
		//$(this).attr({"width":50,"height":50});
		meArea = $(this).children('h5');
		meArea.css("display","none");
		meUl = $(this).children('dl');
		meUl.css("display","none");
		meA = $(this).children('a');
		meA.css("display","none")
	});
};
num = 0

	// var schedulePage= $('#myPageSchedule #content')
	
	var commentSection = $('#sectionChat').empty();
	var ul = $('<ul>').addClass("commentList");
	$.each(User.scheduleChat, function(index,val){
		var li = $('<li>');
		var img = $('<img>');
		var p = $('<h5>');
		img.attr({"src":val.userImg});
		p.html((index+1)+". "+val.comment);
		li.append(img);
		li.append(p);
		ul.append(li);
		num++;
	});
	


	var h3= $('<h3>').html(TRIPPER_DATA.chatWithFriend);
	var img = $('<img>').attr({"src":User.image,"id":"myImg"});
	var h4 = $('<h4>').html(TRIPPER_DATA.addNewComment).attr("id","titleComment");

	
	var textarea = $('<textarea>').attr({"type":"text","name":"chat","id":"chat"}).css({"display":"none"})
	// $('.Trip').append("<textarea type='text' name='comment' id='comment style'display:none'></textarea>");
	var aSend= $('<a>').attr({"id":"chatComment"}).css({"display":"none"}).html("שלח")
	// $('.Trip').append("<a id='submitComment' style'display:none'>שלח תגובה</a> </br>");




	commentSection.append(h3);
	commentSection.append(img);
	commentSection.append(h4);
	commentSection.append(textarea);
	commentSection.append(aSend);
	commentSection.append(ul)


	// schedulePage.append(commentSection);
	$('#titleComment').click(function(){
		$('#chat').show();
		$('#chatComment').show();
	});

 }
 $(document).on('click','#chatComment', function(){
	var chat = $('#chat').val();
	console.log()
//	g_trip.comments.push(User.name + " : " + comment)
	$('#chat').val("");
	console.log(chat, User, g_trip);

	$.ajax({
		type: "post",
        url: g_domain+"addChatComment",// where you wanna post
        data:  {user:User,
        	chat:chat
        },
        dataType: "json",
        error: function(jqXHR, textStatus, errorMessage) {
        	console.log(errorMessage)
        },
        success: function(data) {
        	console.log("add comment success");
        	var ul = $('.commentList');
        	var li = $('<li>');
        	var img = $('<img>');
        	var h5 = $('<h5>');
        	img.attr({"src" : User.image});
        	h5.html((num+1)+". "+chat);
        	li.append(img);
        	li.append(h5);
        	ul.append(li);        	
		// $('#tripComments').append(User.name + " : " + comment);
		console.log(data)
		}
	});

});

function checkIfUserIsInPartners(checkMail){
	return (_.contains(shareScheduleWithFriends, checkMail));
} 

function removeImmSchedule(){
	if(window.location.hash=='#myPageSchedule')
	{
		console.log(User.schedule)
		displayListScheduleTrip(User.schedule)
	}
}
$(document).on('click','#mySchedule',function(){
	if(!User.email)
	{
		$('.notRegister').html(TRIPPER_DATA.alert).show();
		//.css("display","block");

	}else{
		$('.notRegister').hide();
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
	}

});

/***** delete mail from the schedule group  *****/
$(document).on('click', '#deleteMailFromSchedule', function(){
	console.log("clicked on " + $(this).parent().text());
	// var mail  = $(this).parent().text();
	var mailToRemove = $(this).parent().text().slice(0, -3);
	console.log(mailToRemove)
	console.log(shareScheduleWithFriends.indexOf(mailToRemove));
	shareScheduleWithFriends.splice(shareScheduleWithFriends.indexOf(mailToRemove), 1);
	User.tripPatners = shareScheduleWithFriends;
	console.log(shareScheduleWithFriends)
	$.ajax({
		type : "post",
		url : g_domain + "removeEmailFromTripPartners",
		data : {trippartners : shareScheduleWithFriends,
			triptoremove : mailToRemove},
			dataType : "json",
			error: function(jqXHR, textStatus, errorMessage) {
				console.log(errorMessage)
			},
			success: function(data) {
				console.log("removed mail from schedule")
				updateSharedTrip();
			}
		})
})

function updateSharedTrip(){
	console.log("if update shared trip ", User.tripPatners.length)
	$('#friendsemail').empty();
	if(User.tripPatners.length > 0){
		console.log("in if")
		$.each(User.tripPatners, function(i, val){
			debugger
			console.log(val)
			$('#friendsemail').append("<div id='emailNum" + i + "'>" + val + "</div>");
			$('#emailNum' + i).append("<button id='deleteMailFromSchedule'> &#10006 </button>");
		});
	}
}