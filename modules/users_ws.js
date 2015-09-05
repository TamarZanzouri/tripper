	var mailSender = require('./mailSender');

	/*Recives the users email, image and name and checks if it exists at the DB.
	if user exists we update the user detials, if not creates a new user*/
		exports.registerUser = function(req, res){
			console.log("in register user")
			try{
			var user = req.body;	//get user info from client
		}
		catch(err){
			console.log("failed to get body " + err);
		}
		console.log("try to update " , user);

		db.model('users').findOne({ email : user.email }, function(err, result){	//check if user exists
			if(err){
				console.log("error finding user");
				res.json({status:0});
				return console.error(err);
			}
			else if(!result){			//if we didnt get a result create a new user
				console.log("adding new user")
				var newUser =  new User(user);
				newUser.save(function(err, result){
					if(err) {
						console.log("error inserting email: " + user.email);
						return console.error(err)
					}
					welcomeMail.to = "user.email";
					mailSender.smtpTransport.sendMail(welcomeMail, function(error, response){
						if(error){
							console.log(error);
						}else{
							console.log("Message sent: " + response.message);
						}
						mailSender.smtpTransport.close();
					});
					res.json({status:1,res:result})
				});
				
			}
			else{						//if we got a result update the user
				db.model('users').findOneAndUpdate( { email : user.email }, user, { upsert : false },
					function (err, result)
					{
						if (err) {
							console.log("found error inserting");
							res.json({status:0})
							return console.error(err);
						}
						res.json({status:1, res:result})
					})		
			}
		});
}

/*Recives trips added to user scheduale and update all partners in new schedule*/
exports.updateMySchedule = function(req, res){
	try{
		var user = req.body.userId;
		var trip = req.body.trip;
		console.log("getting detailes!!!!!!!", user, trip)
	}
	catch(err){
		console.log("failed to get user and trip " + err);
	}
	console.log("update the schedule",trip)
		//finds the user and add's a trip to his schedule
		db.model('users').findOneAndUpdate({email:user}, {$push : {schedule : trip}}).exec(function (err, docs){
			if(err){
				res.json({status:0})
				return console.error(err);
			}
			console.log("schedule : " + (docs.schedule).length)
			console.log("trip partners ", docs.tripPatners)
			tripPatnersArray = docs.tripPatners;
			//if the user has partners we update all partners without the user that added the trip to the schedule
			if( docs.tripPatners.length > 0 ){
				tripPatnersArray.splice(tripParticipents.indexOf(user), 1)
				console.log(tripPatnersArray)
				console.log("in if")
				tripPatnersArray.forEach(function(participent){
					db.model('users').findOneAndUpdate({email : participent}, {$push : {schedule : trip}}, function(err, subdocs){
						if(err){
							console.error(err);
							res.json({status:0})
						}
						console.log("trip enterd successfuly ", subdocs)
					})		
				});
				res.json({status:1});

			}
		})
	}
	/*Recives a new partner to add to the schedule and checks if there are any more changes in the schedule*/
	exports.updateScheduleParticipents = function(req, res){
		console.log("updating")
		var tripsInSchedule =[];
		try{
			tripParticipents = req.body.sharedEmail;
			tripsInSchedule = req.body.trips;
			timeForTrip = req.body.dateOfTrip;
			checkIfUserExists = req.body.checkIfUserExists;
			console.log("trip participents " + tripParticipents + " trips " + tripsInSchedule + "check " + checkIfUserExists + "time" + timeForTrip)
			//check if trips recived from client is empty
			if(tripsInSchedule == null || typeof tripsInSchedule === undefined){
				tripsInSchedule = [];
				console.log("trip is null")
			}
			//checks if trip time recived from client is empty
			if(timeForTrip == null || typeof timeForTrip === undefined){
				timeForTrip = {
					checkInTime : '',
					checkOutTime : ''
				};
				console.log("trip time is null")
			}
			console.log(timeForTrip, " ");
		}
		catch(err){
			console.log("failed to get params" + err)
		}
		console.log("partners, ", tripParticipents, "trips, ", tripsInSchedule, "time, " ,timeForTrip );
		//checks if the new partner in the schedule exists in the user repository
		db.model('users').findOne({email : checkIfUserExists}, function(err, docs){
			if(err){
				console.error(err);
			}
			//if the user exists add the user to the trip partners and update all users with the change
			if(docs){		
				tripParticipents.push(checkIfUserExists);
				console.log(tripParticipents)
				db.model('users').update({email : { $in : tripParticipents}},
				{
					$set : {tripPatners : tripParticipents,
						schedule : tripsInSchedule,
						tripScheduleTime : timeForTrip}
					},
					{multi : true}, 
					function(err, subdocs){
						if(err){
							console.error(err);
						}
						console.log(subdocs, " updated")
						shareMail.bcc = tripParticipents;
						mailSender.smtpTransport.sendMail(shareMail, function(error, response){
							if(error){
								console.log(error);
							}else{
								console.log("Message sent: " + response.message);
							}  
							mailSender.smtpTransport.close();
						});
					});
				res.json({status:1})
			}
			//if user added dosnt exist we send an inventation to join out system
			else{
				welcomeMailNotRegisterd.to = checkIfUserExists;
				mailSender.smtpTransport.sendMail(welcomeMailNotRegisterd, function(error, response){
					if(error){
						console.log(error);
					}else{
						console.log("Message sent: " + response.message);
					}  
					mailSender.smtpTransport.close();
				});
				return console.log("user " + checkIfUserExists	 + " not found");
				res.json({status:2});
			}
		})
}
/*when user changes the schedule time update schedule and update all partners */
exports.saveTimeSchedule = function(req, res){
	try{
		var user = req.body.userId;
		var tripDate = req.body.tripTime;
		console.log("trip date" + tripDate.checkOutTime + "user " + user)
	}
	catch(err){
		console.log("failed to get params " + err);
	}
		//check if date recived is empty
		if(tripDate == null || typeof tripDate === undefined){
			tripDate = {
				checkInTime : '',
				checkOutTime : ''
			};
			console.log("trip time is null")
		}
		//find the user that updated the time of trip and update his schedule, if user has trip partners update there schedule as weel
		db.model('users').findOneAndUpdate({email:user}, {tripScheduleTime : tripDate}, function(err, docs){
			if(err){
				console.log("error updating trip time schedule");
				res.json({status:0});
				return console.error(err);
			}
			if(docs.tripPatners.length > 0){
				tripParticipents = docs.tripPatners;
				console.log("partners, " ,tripParticipents)
				tripParticipents.splice(tripParticipents.indexOf(user), 1)
				console.log("partners after splice, " ,tripParticipents)
				db.model('users').update({email : { $in : tripParticipents}},
				{
					tripScheduleTime : tripDate
				},
				{multi : true}, 
				function(err, subdocs){
					if(err){
						console.error(err);
					}
					console.log(subdocs, " updated")
				});
			}
			console.log("updated date", docs)
			res.json({status:1});
		});
	}

	/*recives a trip id that the user wants to add or remove from favorites and updates user favorites*/
	exports.updateFavoirte = function(req, res){
		try{
			var trip = req.body.trip;
			var user = req.body.userId;
			var isFavorite = req.body.isFavorite;
			console.log("trip ", trip, user, isFavorite)
		}
		catch(err){
			return console.error(err)
		}
		//if the user wants to add a trip to his favorites
		if(isFavorite == 'true'){
			console.log("adding trip to favorites")
			console.log("update the favorites",trip)
			//find the user account
			db.model('users').findOne({email:user}).exec(function (err, docs){
				if(err){
					res.json({status:0})
					return console.error(err);
				}
				console.log("favorites length: " + (docs.favorites).length)
				//if there are no trips in the users favorites we add the trip to the array
				if((docs.favorites).length == 0){
					console.log("%%%%%%%%%%%%%%%schedule is empty")
					docs.favorites.push(trip);
					docs.save(function(err, result){
						if(err){
							return console.error(err)
						}
						res.json({status:1})	
					})

				}
				//if the user allready has trips in his favorites we check if the user has the trip he wants to add allready in his favorites
				else{
					console.log("###############trip is with data")
					var addToFavorites = docs.favorites.every(function(tripsInFavorites){
						console.log("in trip")
						console.log("req trip id", trip._id, "trip in schedule", tripsInFavorites._id)
						if(tripsInFavorites._id == trip._id){
							console.log("trip allready in fav")
							return false
						}
						return true
					});
					if(addToFavorites){
						console.log("trip not found")
						docs.favorites.push(trip);
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
}
	//if user wants to remove trip from favorites
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

}

	//get user schedule from DB
	exports.getUserSchedule = function(req, res){
		try{
			var userEmail = req.body.email;
			console.log(userEmail);
		}
		catch(err){
			console.log("failed to get user " + err);	
		}
		db.model('users').findOne({ email : userEmail },{_id:false, schedule:true},function (err, docs)
		{ 
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

	}

	// gets user favorites from DB
	exports.getUserFavorites = function(req, res){
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
	}

	//when a user edits a trip from his favorites we create a new instance of the trip and update the new instance in the user favorites
	exports.updateTripChangesToUserFavorites = function(req, res){
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

	}


	// removes trip from schedule
	exports.removeFromSchedule = function(req, res){
		try{
			var userEmail = req.body.userEmail;
			var tripToDelete = req.body.tripId;

			console.log("user email: " + userEmail + "trip: " + tripToDelete);
		}
		catch(err) {
			console.log("error getting data " + err);
		}
		console.log("removing from schedule")
		//removes trip from user schedule
		db.model('users').findOneAndUpdate({ email : userEmail}, {$pull : { schedule : {_id : new ObjectId(tripToDelete)}}}, function(err, docs){
			if (err) {
				console.log("error updating user favorites");
				res.json({status:0})
				return console.error(err);
			}
			else{
				//if there are partners in the user schedule
				if(docs.tripPatners.length > 0){
					console.log("has trip participents", docs.tripPatners)
					docs.tripPatners.forEach(function(participent){
						if(participent != userEmail)
							db.model('users').findOneAndUpdate({ email : participent}, {$pull : { schedule : {_id : new ObjectId(tripToDelete)}}}, function(err, docs){
								if(err){
									console.error(err);
									res.json({status : 0})
								}
								console.log("removed trip from ", participent)
							});
					})
					res.json({status:1})
				}
				else{
					console.log("only one participent in trip")
					res.json({status:1})
				}
			}
		});
	}

	// removes partens from schedule
	exports.removeEmailFromTripPartners = function(req, res){
		console.log("in remove email")
		try{
			var updatedTripPartners = req.body.trippartners;
			var mailToRemove = req.body.triptoremove;
			console.log("trip partners " + updatedTripPartners + " mail to remove" + mailToRemove)
		}
		catch(err){
			console.error(err);
		}
		console.log(typeof updatedTripPartners)
		if(typeof updatedTripPartners !== 'undefined'){
				//remove the email from the partenrs list from all partners
				db.model('users').update({ email : {$in : updatedTripPartners}}, {$pull : {tripPatners : mailToRemove}},{multi : true}, function(err, docs){
					if(err){
						res.json({status:0})
						return console.error(err);
					}
					if(docs){
						console.log("found")

					}
					else{
						return console.log("user " + participent + " not found");
					}
				});
				//set the partens list to an empty array at the deleted users account
				db.model('users').findOneAndUpdate({email : mailToRemove}, {$set : {tripPatners : []}}, function(err, docs){
					if(err){
						console.error(err)
					}
					console.log("mail ", mailToRemove, "removed ", docs)
					res.json({status : 1})
				});
			}
		//if we recived a empty list of emails set the array to be empty
		else{
			db.model('users').findOneAndUpdate({email : mailToRemove}, {$set : {tripPatners : []}}, function(err, docs){
				if(err){
					console.error(err)
				}
				res.json({status : 1})
			})	
		}
	}

	// add comment in schedule
	exports.addChatComment = function(req, res){
		try{
			var user = req.body.user;
			var comment = req.body.chat;
			var objComment = {
				userName : user.name,
				userImg : user.image,
				comment : comment
			}
			console.log(" update comment",comment);
		}
		catch(err){
			console.log("cant add comment")
		}
			//find the user that added the comment
			db.model('users').findOne({email : user.email}, function(err, docs){
				if(err){
					console.error(err)
					res.json({status:0});
				}
				//update the comment in all users of the schedule
				else
					docs.tripPatners.forEach(function(participent){
						console.log(participent)
						db.model('users').findOne({email : participent}, function(err, docs){
							if(err){
								console.log("found error inserting");
								res.json({status:0})
								return console.error(err);
							}
							if(docs){
								console.log("found")
								docs.scheduleChat.push(objComment);
								docs.save(function(err){
									if(err){
										console.error(err);
									}
									res.json({status:1});
								})
							}
							else{
								return console.log("user " + participent + " not found");
							}
						})
					})
			})
		}
