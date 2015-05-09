
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
			var user_collection = db.model('users', new Schema({ url: String, text: String, id: Number}), 'users');
			console.log("try to update " , user.name);
				user_collection.update({email:user.email},{$set:user},{upsert:true}, function(err, docs){
				if (err) {
					console.log("found error inserting");
					res.json({status:0})
					return console.error(err);
				}
				res.json({status:1})
				return;	
				})
	
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
			var user_collection = db.model('users');
			user_collection.findOne({email:user}, function(err, docs) {
				if (err) {
					console.log("found error inserting");
					res.json({status:0})
					return console.error(err);
				}
				if (docs) {
					console.log(docs)
					if (docs.schedule){
						var check=1
					}
					else {
						docs.schedule={};
					}
					
					docs.schedule=trip;

					user_collection.update({email:user}, { $set: {schedule:docs.schedule}}, function(err, docs) {
						if (err) {
							console.log("found error inserting");
							res.json({status:0})
							return console.error(err);
						}
						console.log(check);
						res.json({status:1})
					});
					

				}
				else res.json({status:1})

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
			user_collection.findOne({email:user}, function(err, docs) {
				if (err) {
					console.log("found error inserting");
					res.json({status:0})
					return console.error(err);
				}
				if (docs) {
					console.log(docs)
					var check=0;
					if (docs.favorites)
						(docs.favorites).forEach(function(val){
							if(val._id==trip._id)
								check=1;
						//console.log('haim',val)
					})
					else {
						docs.favorites=[];
					}
					if (check!=1 ) {
						docs.favorites.push(trip);

						user_collection.update({email:user}, { $set: {favorites:docs.favorites}}, function(err, docs) {
							if (err) {
								console.log("found error inserting");
								res.json({status:0})
								return console.error(err);
							}
							res.json({status:1})
						});
					}
					else res.json({status:1});
				}
				else res.json({status:1})

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
			var user_collection = db.model('users');
			user_collection.findOne({ email : userEmail },{_id:false, schedule:true},function (err, docs)
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
			var user_collection = db.model('users');
			user_collection.findOne({ email : userEmail },{_id:false,favorites:true},function (err, docs)
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

module.exports = router;