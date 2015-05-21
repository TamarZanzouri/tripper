
var express = require('express');
var router = express.Router();

router.post('/registerUser', function(req, res) {
	console.log("in register user")
	try{
		var user = req.body;
	}
	catch(err){
		console.log("failed to get body " + err);
	}
	console.log("try to update " , user.name);

	db.model('users').findOne({ email : user.email }, function(err, result){
		if(err){
			console.log("error finding user");
			res.json({status:0});
			return console.error(err);
		}
		else if(!result){
			var newUser =  new User(user);
			newUser.save(function(err, result){
				if(err) {
					console.log("error inserting email: " + user.email);
					return console.error(err)
				}
				res.json({status:1})
				return;
			})
		}
		else{
			db.model('users').findOneAndUpdate( { email : user.email }, user, { upsert : false },
				function (err, result)
				{
					if (err) {
						console.log("found error inserting");
						res.json({status:0})
						return console.error(err);
					}
					res.json({status:1}, result)
					return;	
				})		
		}
	});
});

router.post('/updateMySchedule', function(req, res) {
	try{
		var user = req.body.userId;
		var trip = req.body.trip;
	}
	catch(err){
		console.log("failed to get user and trip " + err);
	}
	console.log("update the schedule",trip)
	db.model('users').findOne({email:user}).exec(function (err, docs){
		if(err){
			res.json({status:0})
			return console.error(err);
		}
		console.log("schedule : " + (docs.schedule).length)
		if((docs.schedule).length == 0){
			console.log("%%%%%%%%%%%%%%%schedule is empty")
			docs.schedule.push(trip);
			docs.save(function(err, result){
				if(err){
					return console.error(err)
				}
				res.json({status:1})	
			})

		}
		else{
			console.log("###############trip is with data")
			var addToSchedule = docs.schedule.every(function(tripsInSchedule){
			console.log("in trip")
			console.log("req trip id", trip._id, "trip in schedule", tripsInSchedule._id)
			if(tripsInSchedule._id == trip._id){
				console.log("trip allready in schedule")
				return false
			}
			return true
		});
			if(addToSchedule){
				console.log("trip not found")
				docs.schedule.push(trip);
				docs.save(function(err, result){
				if(err) {
					return console.error(err)
				}
				res.json({status:1})
			})
			}
			else{
				console.log("trip found return")
				res.json({status:1})
			}
		}
			})
		});

router.post('/updateScheduleParticipents', function(req,res){
	console.log("updating")
	try{
		tripParticipents = req.body.sharedEmail;
		tripsInSchedule = req.body.trips;
		timeForTrip = req.body.dateOfTrip;
		console.log("trip participents " + tripParticipents + " trips " + tripsInSchedule)
	}
	catch(err){
		console.log("failed to get params")
	}
	tripParticipents.forEach(function(participent){
		console.log(participent)
		db.model('users').findOne({email : participent}, function(err, docs){
			if(err){
				console.log("found error inserting");
				res.json({status:0})
				return console.error(err);
			}
			if(docs){
				console.log("found")
				db.model('users').update({email:participent}, {schedule : tripsInSchedule, tripPatners : tripParticipents, tripScheduleTime : timeForTrip}, { upsert : true }, function(err, docs) {
				if (err) {
					console.log("found error inserting");
					res.json({status:0})
					return console.error(err);
					}

				});
			}
			else{
				return console.log("user " + participent + " not found");
			}
		})
	})
	res.json({status:1})

})

router.post('/saveTimeSchedule', function(req, res){
	try{
		user = req.body.userId;
		tripDate = req.body.tripTime;
		console.log("trip date" + tripDate.checkOutTime)
	}
	catch(err){
		console.log("failed to get params " + err);
	}
	db.model('users').findOneAndUpdate({email:user}, {$set : {tripScheduleTime : tripDate}}, function(err, docs){
		if(err){
			console.log("error updating trip time schedule");
			res.json({status:0});
			return console.error(err);
		}
		console.log("updated date")
		res.json({status:1});
	});

});

router.post('/updateFavoirte', function(req, res){
	try{
		var trip = req.body.trip;
		var user = req.body.userId;
		var isFavorite = req.body.isFavorite;
		console.log(trip, user, isFavorite)
	}
	catch(err){
		return console.error(err)
	}
	if(isFavorite == 'true'){
		console.log("adding trip to favorites")
	db.model('users').findOneAndUpdate({email:user}, { $push: {favorites:trip}}, { upsert : true }, function(err, docs) {
					if (err) {
						console.log("found error inserting");
						res.json({status:0})
						return console.error(err);
					}
				res.json({status:1})
				});
	}
	else{
			console.log("removing trip from favorites ")
	db.model('users').findOneAndUpdate({ email : user}, {$pull : { favorites : {_id : new ObjectId(trip._id)}}}, function(err, docs){
	if (err) {
		console.log("error updating user favorites");
		res.json({status:0})
		return console.error(err);
	}		
	res.json({status:1})
	});
	}

})

router.post('/getUserSchedule', function(req, res) {
	try{
		var userEmail = req.body.email;
		console.log(userEmail);
	}
	catch(err){
		console.log("failed to get user " + err);	
	}
	// var user_collection = db.model('users');
	db.model('users').findOne({ email : userEmail },{_id:false, schedule:true},function (err, docs)
	{ 
                // failure while connecting to sessions collection
                if (err) 
                {
                	console.log( err);

                	return;
                }
                
                else
                {
                	console.log(docs);
                	res.json(docs)
                }
            });

});

router.post('/getUserFavorites', function(req, res) {
	try{
		var userEmail = req.body.email;
		console.log(userEmail);
	}
	catch(err){
		console.log("failed to get user " + err);	
	}
	// var user_collection = db.model('users');
	db.model('users').findOne({ email : userEmail },{_id:false,favorites:true},function (err, docs)
	{ 
                // failure while connecting to sessions collection
                if (err) 
                {
                	console.log( err);

                	return;
                }
                
                else
                {
                	console.log(docs);
                	res.json(docs)
                }
            });
});

router.post('/updateTripChangesToUserFavorites', function(req, res){
	console.log("updating trip");
	try{
		var userEmail = req.body.userId;
		var tripToDelete = req.body.tripId;

		console.log("user email: " + userEmail + "trip: " + tripToDelete);
	}
	catch(err) {
		console.log("error getting data " + err);
	}
	db.model('users').findOneAndUpdate({ email : userEmail}, {$pull : { favorites : {_id : new ObjectId(tripToDelete)}}}, function(err, docs){
		if (err) {
			console.log("error updating user favorites");
			res.json({status:0})
			return console.error(err);
		}
		else{
			res.json({status:1})
		}
	})

});


router.post('/removeFromSchedule', function(req, res){
		try{
		var userEmail = req.body.userEmail;
		var tripToDelete = req.body.tripId;

		console.log("user email: " + userEmail + "trip: " + tripToDelete);
	}
	catch(err) {
		console.log("error getting data " + err);
	}
	db.model('users').findOneAndUpdate({ email : userEmail}, {$pull : { schedule : {_id : new ObjectId(tripToDelete)}}}, function(err, docs){
		if (err) {
			console.log("error updating user favorites");
			res.json({status:0})
			return console.error(err);
		}
		else{
			res.json({status:1})
		}
	})
})

module.exports = router;