
var mailer = require("nodemailer");

var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "tripperarrangeyourttip@gmail.com",
        pass: "tripper1234"
    }
});

var welcomeMailNotRegisterd = {
    from: "tripper support <tripperarrangeyourttip@gmail.com>",
    to: "",
    subject: "tripper תכנן את הטיול שלך",
    text: "שותף איתך טיול אך אתה לא רשום לשירות",
    html: "ברוך הבא למנוע חיפוש הטיולים tripper ותודה על הצטרפותך. <br> מערכת tripper מציע מנגנון לאיתור טיולים לכל מקום, לכל זמן, ועם כל אחד. <br> בהצטרפותך למאגר הרשומים תוכל לערוך טיול שהעלאת, לסמן ולצפות בטיולים שהתעניינת בהם.לערוך ולשתף טיולים ארוכים כקצרים עם חברים. <br> באופציית המסלול שלי תוכל לתכנן טיול קצר או של כמה ימים, להזמין חברים ולשתף אותם בתוכנית.חברייך ואתה תוכלו לערוך את המסלול ולהגיע לאופטימיזציה שלו. <br> באופציית המועדפים שלי תמצא טיולים שסימנת בעבר שמעניינים אותך, פה תוכל גם לערוך אותם מחדש. <br> באופציית החשבון שלי תוכל למצוא את טיולים שכתבת והעלאת, בנוסף, טיולים שהגדרת כפרטיים יוצגו כאן. <br> במקרה ותחליט לשתף את הטיול הפרטי עם חברייך טיול זה יוצג להם בתוצאות החיפוש.על מנת להיות שותף פעיל ולתרום למאגר תוכל באופצייתהוסף טיול לכתוב טיול משלך בצירוף תמונות. <br> מקווים שתהנה, צוות tripper  תודה <br>  נכתב בלשון זכר למען הנוחות אך מכוון לשני המינים"
   
}

var welcomeMail = {
    from: "tripper support <tripperarrangeyourttip@gmail.com>",
    to: "",
    subject: "tripper תכנן את הטיול שלך",
    text: "תודה שנרשמת לtripper אשר עוזר לך לתכנן את הטיול שלך",
    html: "ברוך הבא למנוע חיפוש הטיולים tripper ותודה על הצטרפותך. <br> מערכת tripper מציע מנגנון לאיתור טיולים לכל מקום, לכל זמן, ועם כל אחד. <br> בהצטרפותך למאגר הרשומים תוכל לערוך טיול שהעלאת, לסמן ולצפות בטיולים שהתעניינת בהם. <br> לערוך ולשתף טיולים ארוכים כקצרים עם חברים. <br> באופציית המסלול שלי תוכל לתכנן טיול קצר או של כמה ימים, להזמין חברים ולשתף אותם בתוכנית. <br> חברייך ואתה תוכלו לערוך את המסלול ולהגיע לאופטימיזציה שלו. <br> באופציית המועדפים שלי תמצא טיולים שסימנת בעבר שמעניינים אותך, פה תוכל גם לערוך אותם מחדש. <br> באופציית החשבון שלי תוכל למצוא את טיולים שכתבת והעלאת, בנוסף, טיולים שהגדרת כפרטיים יוצגו כאן. <br> במקרה ותחליט לשתף את הטיול הפרטי עם חברייך טיול זה יוצג להם בתוצאות החיפוש. <br> על מנת להיות שותף פעיל ולתרום למאגר תוכל באופציית הוסף טיול לכתוב טיול משלך בצירוף תמונות. <br> מקווים שתהנה, צוות tripper תודה  <br> נכתב בלשון זכר למען הנוחות אך מכוון לשני המינים"
}

var shareMail = {
    from: "tripper support <tripperarrangeyourttip@gmail.com>",
    to: "",
    subject: "tripper זיהה ששותף איתך טיול",
    text: "זיהינו שבוצעו שינויים במסלול שלך...",
    html: "חברך XXX הזמין אותך לצפות במסלול שעניין אותו. <br> לאחר שתכנס לקטגורית המסלול שלי תוכל לצפות במסלול, להוסיף עוד יעדים או להוריד יעדים. <br> בפעולה אינטרקטיבית תוכלו להגיע למסלול המותאם בשבילכם. <br> מקווים שתהנה, צוות tripper ,תודה  <br> נכתב בלשון זכר למען הנוחות אך מכוון לשני המינים"
}

// router.post('/registerUser', function(req, res) {
exports.registerUser = function(req, res){
	console.log("in register user")
	try{
		var user = req.body;
	}
	catch(err){
		console.log("failed to get body " + err);
	}
	console.log("try to update " , user);

	db.model('users').findOne({ email : user.email }, function(err, result){
		if(err){
			console.log("error finding user");
			res.json({status:0});
			return console.error(err);
		}
		else if(!result){
			console.log("adding new user")
			var newUser =  new User(user);
			newUser.save(function(err, result){
				if(err) {
					console.log("error inserting email: " + user.email);
					return console.error(err)
				}
				welcomeMail.to = "user.email";
				smtpTransport.sendMail(welcomeMail, function(error, response){
				    if(error){
				        console.log(error);
				    }else{
				        console.log("Message sent: " + response.message);
				    }
    			smtpTransport.close();
				});
				res.json({status:1,res:result})
			});
			
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
					res.json({status:1, res:result})
				})		
		}
	});
}

// router.post('/updateMySchedule', function(req, res) {
exports.updateMySchedule = function(req, res){
	try{
		var user = req.body.userId;
		var trip = req.body.trip;
		// var isInSchdule = req.body.isSchedule;
		console.log("getting detailes!!!!!!!", user, trip)
	}
	catch(err){
		console.log("failed to get user and trip " + err);
	}
	console.log("update the schedule",trip)
	db.model('users').findOneAndUpdate({email:user}, {$push : {schedule : trip}}).exec(function (err, docs){
		if(err){
			res.json({status:0})
			return console.error(err);
		}
		console.log("schedule : " + (docs.schedule).length)
		console.log("trip partners ", docs.tripPatners)
		tripPatnersArray = docs.tripPatners;
		// tripsInScheduleArray = docs.schedule;
		// console.log("partners ", tripPatnersArray, "trips ", tripsInScheduleArray)
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
			// docs.tripPatners.forEach(function(participent){
				// console.log(participent)
				// db.model('users').findOne({email : participent}, function(err, subdocs){
					// if((subdocs.schedule).length == 0){
						// console.log("%%%%%%%%%%%%%%%schedule is empty")
						// subdocs.schedule.push(trip);
						// subdocs.save(function(err, result){
						// 	if(err){
						// 		return console.error(err)
						// 	}	
						// 	console.log("enterd trip to participent", participent)
						// })
						// return
					
					// else{
					// 	console.log("###############trip is with data")
					// 	var addToSchedule = subdocs.schedule.every(function(tripsInSchedule){
					// 		console.log("in trip")
					// 		console.log("req trip id", trip._id, "trip in schedule", tripsInSchedule._id)
					// 		if(tripsInSchedule._id == trip._id){
					// 			console.log("trip allready in schedule")
					// 			return false
					// 		}
					// 		return true
					// 	});
					// 	if(addToSchedule){
					// 		console.log("trip not found")
					// 		subdocs.schedule.push(trip);
					// 		subdocs.save(function(err, result){
					// 			if(err) {
					// 				return console.error(err)
					// 			}
					// 			console.log("enterd trip to ", participent)
					// 		})
					// 		return
					// 	}
					// 	else{
					// 		console.log("trip found return")
					// 	}
					// }
		// 		})
		// 	})
		// 		res.json({status:1})
		// }
		// else{
			// db.model('users').findOneAndUpdate({email : {$in : docs.tripPatners}}, {$addToSet : {docs.schedule : trip}}, function(err, subdocs){
			// 	if(err){
			// 		console.error(err);
			// 		res.json({status:0})
			// 	}
			// 	res.json({status:1});
			// })
		// 	//if user dosent have partenrs is trip update only him
		// 	if((docs.schedule).length == 0){		//if the schedule is empty create a new schedule and save it
				// console.log("%%%%%%%%%%%%%%%schedule is empty")
				// docs.schedule.addToSet(trip);
				// docs.save(function(err, result){
				// 	if(err){
				// 		return console.error(err)
				// 	}	
				// 	console.log("enterd trip to ", user)
				// })

		// }										
			//if trip has trips in schedule check if trip is uniqe and insert it to array
		// 	else{									
		// 	console.log("###############trip is with data")
		// 	var addToSchedule = docs.schedule.every(function(tripsInSchedule){
		// 		console.log("in trip")
		// 		console.log("req trip id", trip._id, "trip in schedule", tripsInSchedule._id)
		// 		if(tripsInSchedule._id == trip._id){
		// 			console.log("trip allready in schedule")
		// 			return false
		// 		}
		// 		return true
		// 	});
		// 	if(addToSchedule){
		// 		console.log("trip not found")
		// 		docs.schedule.push(trip);
		// 		docs.save(function(err, result){
		// 			if(err) {
		// 				return console.error(err)
		// 			}
		// 			console.log("enterd trip to ", user)
		// 		})
		// 	}
		// 	else{
		// 		console.log("trip found return")
		// 		res.json({status:1})
		// 	}
		// }	
	// }

// router.post('/updateScheduleParticipents', function(req,res){
exports.updateScheduleParticipents = function(req, res){
	console.log("updating")
	var tripsInSchedule =[];
	// var foundParticipents = [];
	try{
		tripParticipents = req.body.sharedEmail;
		tripsInSchedule = req.body.trips;
		timeForTrip = req.body.dateOfTrip;
		checkIfUserExists = req.body.checkIfUserExists;
		console.log("trip participents " + tripParticipents + " trips " + tripsInSchedule + "check " + checkIfUserExists + "time" + timeForTrip)
		if(tripsInSchedule == null || typeof tripsInSchedule === undefined){
			tripsInSchedule = [];
			console.log("trip is null")
		}
		if(timeForTrip == null || typeof timeForTrip === undefined){
			timeForTrip = {
				checkInTime : '',
				checkOutTime : ''
			};
			console.log("trip time is null")
		}
		console.log(timeForTrip, " " ,tripsInScheduleArray)
	}
	catch(err){
		console.log("failed to get params")
	}
	console.log("partners, ", tripParticipents, "trips, ", tripsInSchedule, "time, " ,timeForTrip );
	db.model('users').findOne({email : checkIfUserExists}, function(err, docs){
		if(err){
			console.error(err);
		}
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
					smtpTransport.sendMail(shareMail, function(error, response){
			    	if(error){
			        	console.log(error);
			    	}else{
			        console.log("Message sent: " + response.message);
			    	}  
			    	smtpTransport.close();
					});
					});
					res.json({status:1})
		}
		else{
			welcomeMailNotRegisterd.to = checkIfUserExists;
			smtpTransport.sendMail(welcomeMailNotRegisterd, function(error, response){
	    	if(error){
	        	console.log(error);
	    	}else{
	        console.log("Message sent: " + response.message);
	    	}  
	    	smtpTransport.close();
			});
			return console.log("user " + checkIfUserExists	 + " not found");
			res.json({status:2});
		}
	})
}
	// tripParticipents.forEach(function(participent){
	// 	console.log(participent)
	// 	db.model('users').findOne({email : participent}, function(err, docs){
	// 		if(err){
	// 			console.log("found error inserting");
	// 			res.json({status:0})
	// 			return console.error(err);
	// 		}
	// 		if(docs){
	// 			console.log("found")
				// db.model('users').update({email:participent}, {schedule : tripsInSchedule, tripPatners : tripParticipents, tripScheduleTime : timeForTrip}, { upsert : true }, function(err, docs) {
				// if (err) {
				// 	console.log("found error inserting");
				// 	res.json({status:0})
				// 	return console.error(err);
				// 	}

				// });
		// docs.schedule = tripsInSchedule;
		// docs.tripPatners.addToSet(tripParticipents);
		// docs.tripScheduleTime = timeForTrip;
		// docs.save(function(err, result){
		// 	if(err){
		// 		console.error(err);
		// 	}
		// shareMail.to = participent;
		// // foundParticipents.push(participent);
		// // console.log(foundParticipents)
		// smtpTransport.sendMail(shareMail, function(error, response){
  //   	if(error){
  //       	console.log(error);
  //   	}else{
  //       console.log("Message sent: " + response.message);
  //   	}  
  //   	smtpTransport.close();
		// });
// 		})
// 	}
// 	else{
// 		welcomeMailNotRegisterd.to = participent;
// 		smtpTransport.sendMail(welcomeMailNotRegisterd, function(error, response){
//     	if(error){
//         	console.log(error);
//     	}else{
//         console.log("Message sent: " + response.message);
//     	}  
//     	smtpTransport.close();
// 		});
// 		return console.log("user " + participent + " not found");
// 	}
// })
// 	})
// 	res.json({status:1});	
// }

// router.post('/saveTimeSchedule', function(req, res){
exports.saveTimeSchedule = function(req, res){
	try{
		var user = req.body.userId;
		var tripDate = req.body.tripTime;
		console.log("trip date" + tripDate.checkOutTime + "user " + user)
	}
	catch(err){
		console.log("failed to get params " + err);
	}
	if(tripDate == null || typeof tripDate === undefined){
		tripDate = {
			checkInTime : '',
			checkOutTime : ''
		};
		console.log("trip time is null")
	}
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

// router.post('/updateFavoirte', function(req, res){
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
	if(isFavorite == 'true'){
		console.log("adding trip to favorites")
		console.log("update the favorites",trip)
		db.model('users').findOne({email:user}).exec(function (err, docs){
			if(err){
				res.json({status:0})
				return console.error(err);
			}
			console.log("favorites length: " + (docs.favorites).length)
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

// router.post('/getUserSchedule', function(req, res) {
exports.getUserSchedule = function(req, res){
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

}

// router.post('/getUserFavorites', function(req, res) {
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

// router.post('/updateTripChangesToUserFavorites', function(req, res){
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


// router.post('/removeFromSchedule', function(req, res){
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
	db.model('users').findOneAndUpdate({ email : userEmail}, {$pull : { schedule : {_id : new ObjectId(tripToDelete)}}}, function(err, docs){
		if (err) {
			console.log("error updating user favorites");
			res.json({status:0})
			return console.error(err);
		}
		else{
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

// router.post('/removeEmailFromTripPartners', function(req, res){
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
		console.log("in if ")
		// updatedTripPartners.forEach(function(participent){
			// console.log(participent)
			db.model('users').update({ email : {$in : updatedTripPartners}}, {$pull : {tripPatners : mailToRemove}},{multi : true}, function(err, docs){
				if(err){
					// console.log("found error inserting");
					res.json({status:0})
					return console.error(err);
				}
				if(docs){
					console.log("found")
					// docs.tripPatners = updatedTripPartners;
					// docs.save(function(err){
					// 	if(err){
					// 		console.error(err);
					// 	}
					// 	console.log("participent ", participent, "updated")
					// })
				}
				else{
					return console.log("user " + participent + " not found");
				}
			});
		// });
		db.model('users').findOneAndUpdate({email : mailToRemove}, {$set : {tripPatners : []}}, function(err, docs){
			if(err){
				console.error(err)
			}
			console.log("mail ", mailToRemove, "removed ", docs)
			res.json({status : 1})
		});
	}
	else{
		db.model('users').findOneAndUpdate({email : mailToRemove}, {$set : {tripPatners : []}}, function(err, docs){
			if(err){
				console.error(err)
			}
			res.json({status : 1})
		})	
	}


}

// router.post('/addChatComment', function(req, res){
exports.addChatComment = function(req, res){
	try{
		var user = req.body.user;
		var comment = req.body.chat;
		var objComment = {
			userName : user.name,
			userImg : user.image,
			comment : comment
		}
			// user.name + " : " +comment;
			console.log(" update comment",comment);
		}
		catch(err){
			console.log("cant add comment")
		}
		db.model('users').findOne({email : user.email}, function(err, docs){
			if(err){
				console.error(err)
				res.json({status:0});
			}
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
