var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var app = express();
var userEmail;
var sites;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'node_modules/bower_components')));

app.use(express.static(path.join(__dirname, 'tripFunction')));
app.use(express.static(path.join(__dirname, 'style')));

app.use(bodyParser());


//view in data base
app.get('/', function(req, res) {
	// Connect to the db
	try{
		MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
			if (err) {
				return console.dir(err);
			} else {
				var tripper_collection = db.collection('tripper_playlist');
				tripper_collection.find( { trip_charachters:  { $elemMatch : { charachter: {$ne : ""} }}}, { trip_charachters: true, _id : false}).toArray(function (err, docs)
				{ 
				                // failure while connecting to sessions collection
				                if (err) 
				                {
				                	console.log( err);

				                	return;
				                }
				                
				                else
				                {
				                	var tripperCharachters =[]
				                	console.log( docs);
				                	(docs).forEach(function(t){
				                		(t.trip_charachters).forEach(function(tt){
				                			tripperCharachters.push(tt)
				                		})

				                	})
				                	console.log(docs);
				                	res.render('index.ejs', {
				                		title : 'Tripper',
				                		character : tripperCharachters,
				                		trips : docs
				                	});
				                	db.close();
				                }
				            });

			}
		});
}catch(err){
	console.log("mongodb connection failed")
}
});

app.get('/sendSites/:sites?', function(req, res) {
	sites = req.query.sites;
	console.log(sites);
});


app.post('/updateFavoirte', function(req, res) {
	var user = req.body.userId;
	var trip = req.body.trip;
	//console.log(trip)
	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
		if (err) {
			return console.dir(err);
		} else {
			var user_collection = db.collection('users');
			user_collection.findOne({mail:user}, function(err, docs) {
				if (err) {
					console.log("found error inserting");
					res.json({status:0})
					db.close();
					return console.error(err);
				}
				if (docs) {
					console.log(docs)
					var check=0;
					if (docs.favorites)
					(docs.favorites).forEach(function(val){
						if(val.id==trip.id)
							check=1;
						//console.log('haim',val)
					})
					else {
						docs.favorites=[];
					}
					if (check!=1 ) {
					docs.favorites.push(trip);

					user_collection.update({mail:user}, { $set: {favorites:docs.favorites}}, function(err, docs) {
						if (err) {
							console.log("found error inserting");
							res.json({status:0})
							db.close();
							return console.error(err);
						}
						res.json({status:1})
					});
					}
					else res.json({status:1});
				}
				else res.json({status:1})

			});
		}

	});

});

app.post('/registerUser', function(req, res) {
	var user = req.body;

	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
		if (err) {
			return console.dir(err);
		} else {
			var user_collection = db.collection('users');

			user_collection.update({email:user.email},{$set:user},{upsert:true}, function(err, docs) {
				if (err) {
					console.log("found error inserting");
					res.json({status:0})
					db.close();
					return console.error(err);
				}
				res.json({status:1})

			});
		}

	});
	
});


app.post('/getTripById', function(req, res) {
	var tripId = req.body.id;
	

	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
		if (err) {
			return console.dir(err);
		} else {
			var tripper_collection = db.collection('tripper_playlist');
			tripper_collection.findOne({ _id : new ObjectId(tripId) },function (err, docs)
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
                	res.json(docs);
                	db.close();
                }
            });

		}

	});
});

app.post('/getUserFavorites', function(req, res) {
	var userEmail = req.body.mail;
	console.log(userEmail);

	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
		if (err) {
			return console.dir(err);
		} else {
			var users_collection = db.collection('users');
			users_collection.findOne({ mail : userEmail },{_id:false,favorites:true},function (err, docs)
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
                	db.close();
                }
            });

		}

	});
});


app.get('/findTripByUser/:email?', function(req, res) {
	userEmail = req.query.email;
	console.log(userEmail);

	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
		if (err) {
			return console.dir(err);
		} else {
			var tripper_collection = db.collection('tripper_playlist');
			tripper_collection.find({ email : userEmail },{_id:true, trip_name:true, location:true }).toArray(function (err, docs)
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
                	db.close();
                }
            });

		}

	});
});

app.get('/filterByChars/:chars?', function(req, res) {
	var charachters = req.query.chars;
	// req.body.chars will get post request without chars 
	console.log(charachters)
	// Connect to the db
	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
		if (err) {
			return console.dir(err);
		} else {
			var tripper_collection = db.collection('tripper_playlist');
			tripper_collection.find( { $and: [ {trip_charachters:  { $elemMatch : { "charachter": {"$in" : [charachters[0], charachters[1]]} }}}, { "trip_isPrivate" : false }] }).toArray(function (err, docs)
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
                	tripsAfterCharachters = docs;
                	res.json(docs)
                	db.close();
                }
            });

		}

	});
	
});

app.post('/add', function(req, res) {
	console.log("haim" + req.body.newTrip + " " + req.body.des);
	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
		if (err) {
			return console.dir(err);
		} else {
			var tripper_collection = db.collection('tripper_playlist');
			var nameTrip = req.body.nameTrip;
			var des = req.body.des;
			var location = req.body.locationTrip;
			var char1 = req.body.char1;
			var char2 = req.body.char2;
			var privte = req.body.privte;
			var areaLocition = req.body.area;
			tripper_collection.insert({
				trip_name : nameTrip,
				trip_description : des,
				address : location,
				email : userEmail,
				trip_charachters : [{
					charachter : char1
				}, {
					charachter : char2
				}],
				trip_isPrivate : privte,
				tripSites : sites,
				area : areaLocition
			}, function(err, docs) {
				if (err) {
					console.log("found error inserting");
					db.close();
					return console.error(err);
				}
				console.log("inserted:");
				for (i in docs) {
					console.log(docs[i]);
				}

			});
		}

	});
	res.redirect('/');

});




//view in data base
app.get('/click', function(req, res) {

	res.render('click.ejs')
});
app.get('indexMobile', function(req, res) {

});

app.get('/*', function(req, res) {

	res.send(404, "aaaaaaaa")
});



var port = process.env.PORT || 1337;
app.listen(port, function() {
	console.log("port " + port);
});
