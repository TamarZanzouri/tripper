
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
			db.model('users').findOneAndUpdate( { email : user.email }, user, { upsert : true },
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

	db.model('users').findOneAndUpdate({email:user}, { $push: {schedule:trip}}, function(err, docs) {
		if (err) {
			console.log("found error inserting");
			res.json({status:0})
			return console.error(err);
			}
				// console.log(check);
				res.json({status:1})
			});


	// 	}
	// 	else res.json({status:1})

	// });
});

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

router.post('/updateFavoirte', function(req, res) {
	try{
		var user = req.body.userId;
		var trip = req.body.trip;
	}
	catch(err){
		console.log("failed to get user and trip " + err);
	}
	console.log(" update trip",trip)
	var user_collection = db.model('users');

	db.model('users').findOneAndUpdate({email:user}, { $push: {favorites:trip}}, function(err, docs) {
					if (err) {
						console.log("found error inserting");
						res.json({status:0})
						return console.error(err);
					}
					res.json({status:1})
				});
});

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

		// console.log(JSON.stringify(req.body.trip))
		// var tripToDelete = JSON.stringify(req.body.trip);;
		// console.log("trip to delete: " + tripToDelete)
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

module.exports = router;