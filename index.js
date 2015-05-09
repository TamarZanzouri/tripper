var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var multiparty = require('multiparty');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var formidable = require('formidable');

var app = express();
var userEmail;
var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'dxgyixsmg', 
  api_key: '862129673261382', 
  api_secret: 'g-0pnDM6ZVHf_noES9RWrudPr64' 
  //cdn_subdomain: true
});

//app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'node_modules/bower_components')));

app.use(express.static(path.join(__dirname, 'datepicker')));

app.use(express.static(path.join(__dirname, 'tripFunction')));
app.use(express.static(path.join(__dirname, 'style')));


app.use(bodyParser());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json 
app.use(bodyParser.json());


app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// //view in data base
// app.get('/', function(req, res) {
// 	// Connect to the db
// 	try{
// 		MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
// 			if (err) {
// 				return console.dir(err);
// 			} else {
// 				var tripper_collection = db.collection('tripper_playlist');
// 				tripper_collection.find( { trip_charachters:  { $elemMatch : { charachter: {$ne : ""} }}}, { trip_charachters: true, _id : false}).toArray(function (err, docs)
// 				{ 
// 				                // failure while connecting to sessions collection
// 				                if (err) 
// 				                {
// 				                	console.log( err);

// 				                	return;
// 				                }

// 				                else
// 				                {
// 				                	var tripperCharachters =[]
// 				                	console.log( docs);
// 				                	(docs).forEach(function(t){
// 				                		(t.trip_charachters).forEach(function(tt){
// 				                			tripperCharachters.push(tt)
// 				                		})

// 				                	})
// 				                	console.log(docs);
// 				                	res.render('index.ejs', {
// 				                		title : 'Tripper',
// 				                		character : tripperCharachters,
// 				                		trips : docs
// 				                	});
// 				                	db.close();
// 				                }
// 				            });

// 			}
// 		});
// }catch(err){
// 	console.log("mongodb connection failed")
// }
// });

// app.get('/sendSites/:sites?', function(req, res) {
// 	sites = req.body.sites;
// 	console.log(sites);
// });


app.post('/updateMySchedule', function(req, res) {
	var user = req.body.userId;
	var trip = req.body.trip;
	console.log("update the schedule",trip)
	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
		if (err) {
			return console.dir(err);
		} else {
			var user_collection = db.collection('users');
			user_collection.findOne({email:user}, function(err, docs) {
				if (err) {
					console.log("found error inserting");
					res.json({status:0})
					db.close();
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
							db.close();
							return console.error(err);
						}
						console.log(check);
						res.json({status:1})
					});
					

				}
				else res.json({status:1})

			});
		}

	});

});

//addComment

app.post('/addComment', function(req, res) {
	var user = req.body.user;
	var trip_id = req.body.trip_id;
	var comment = req.body.comment;
	var objComment = user.name+":"+comment;
	console.log(" update comment",comment);
	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
		if (err) {
			return console.dir(err);
		} else {
			var trip_collection = db.collection('tripper_playlist');
			trip_collection.findOne({ _id : new ObjectId(trip_id)},function (err, docs){
				if (err) {
					console.log("found error inserting");
					res.json({status:0})
					db.close();
					return console.error(err);
				}
				if (docs) {
					console.log(docs)
					var check=0;
					if (docs.comments)
						{console.log(check);}
					else {
						docs.comments=[];
					}
					console.log(" update comment 2",objComment);
					docs.comments.push(objComment);
					console.log(docs.comments)
					trip_collection.update({_id : new ObjectId(trip_id)}, { $set: {comments:docs.comments}}, function(err, docs) {
						if (err) {
							console.log("found error inserting");
							res.json({status:0})
							db.close();
							return console.error(err);
						}
						console.log(docs)
						res.json({status:1})
					});
				}
				else res.json({status:1});
				

			});
		}

	});

});


app.post('/updateFavoirte', function(req, res) {
	var user = req.body.userId;
	var trip = req.body.trip;
	console.log(" update trip",trip)
	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
		if (err) {
			return console.dir(err);
		} else {
			var user_collection = db.collection('users');
			user_collection.findOne({email:user}, function(err, docs) {
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

	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd",{native_parser:true}, function(err, db) {
		if (err) {
			return console.dir(err);
		} else {
			var user_collection = db.collection('users');
			console.log("try to update " , user.name);
			user_collection.update({email:user.email},{$set:user},{upsert:true}, function(err, docs) {
				if (err) {
					console.log("found error inserting");
					res.json({status:0})
					db.close();
					return console.error(err);
				}
				res.json({status:1})
				db.close();
				return;
			});
		}

	});
	
});


app.post('/getTripById', function(req, res) {
	var tripId = req.body.id;
	console.log(tripId);

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

app.post('/getUseSchedule', function(req, res) {
	var userEmail = req.body.email;
	console.log(userEmail);

	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
		if (err) {
			return console.dir(err);
		} else {
			var users_collection = db.collection('users');
			users_collection.findOne({ email : userEmail },{_id:false, schedule:true},function (err, docs)
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


app.post('/getUserFavorites', function(req, res) {
	var userEmail = req.body.email;
	console.log(userEmail);

	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
		if (err) {
			return console.dir(err);
		} else {
			var users_collection = db.collection('users');
			users_collection.findOne({ email : userEmail },{_id:false,favorites:true},function (err, docs)
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
			tripper_collection.find({ email : userEmail },{_id:true, trip_name:true, address:true }).toArray(function (err, docs)
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
			tripper_collection.find( { $and: [ {trip_charachters:  { $elemMatch : {"$in" : [charachters[0], charachters[1]]} }}, { "trip_isPrivate" : false }] }).toArray(function (err, docs)
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
	//console.log(req.files,req.body)
	//console.log("haim" + req.body.newTrip + " " + req.body.des);
	var form = new formidable.IncomingForm();

	form.parse(req, function(error, fields, files) 
	{
		console.log('-->PARSE<--');
        //logs the file information 
        console.log("files", JSON.stringify(files));
        console.log("fields", JSON.stringify(fields));
      //  console.log("11",this.uplaodDir)
  //       console.log( files.upload.path, "/tmp/" + files.upload.name )
  //       fs.readFile(files.upload.path + '.' + fields.format, function (err, data) {
	 //    if (err) {
	 //        res.end('Error: ' + err);
	 //    } else {
	 //        res.end(data);
	 //    }
		// });
    });

	form.on('progress', function(bytesReceived, bytesExpected) 
	{
		var percent_complete = (bytesReceived / bytesExpected) * 100;
		console.log(percent_complete.toFixed(2));
	});

	form.on('error', function(err) 
	{
		console.log("-->ERROR<--");
		console.error(err);
	});
	form.on('end', function(error, fields, files) {
		//console.log("end", this.openedFiles[0].path);
		// console.log( files.upload.path, "/tmp/" + files.upload.name )
		// console.log(this.uplaodDir)
		console.log(fields)
		console.log(files)
		 var temp_path = this.openedFiles[0].path;
      console.log("temp_path: " + temp_path);
          
      /* The file name of the uploaded file */
      var file_name = this.openedFiles[0].name;
      console.log("file_name: " + file_name);
		/*
		  // This line opens the file as a readable stream
		var readStream = fs.createReadStream(filename);
		var data='';
		  // This will wait until we know the readable stream is actually valid before piping
		readStream.on('open', function (d) {
		    // This just pipes the read stream to the response object (which goes to the client)

		});
		readStream.on('data', function(chunk) {
			//console.log(chunk)
			data+= chunk;
		});
		  // This catches any errors that happen while creating the readable stream (usually invalid names)
		readStream.on('error', function(err) {
		  	console.log("error creating chuncks");
		  	res.json({status:0,err:err})
		  	return;
		  });
		readStream.on('end', function() {
		  	console.log('end',data);

		});*/
		var urlImg="";
		var stream = cloudinary.uploader.upload_stream(function(result) {
		 console.log(result) 
		 urlImg=result.url;
		});
		var file_reader = fs.createReadStream(temp_path).pipe(stream)


		// cloudinary.uploader.upload(file_name,function(result) { console.log(result) });
		// var file_reader = fs.createReadStream('file_name').pipe(stream)


		

		  MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
		  	if (err) {
		  		res.json({status:0})
		  		return ;
		  	} else {
		  		console.log("######",req.body)
		  		var tripper_collection = db.collection('tripper_playlist');
		  		var nameTrip = req.body.nameTrip;
		  		var des = req.body.des;
		  		var location = req.body.locationTrip;
		  		var tripCharachters = [];
		  		tripCharachters.push(req.body.firstcharachter);
		  		tripCharachters.push(req.body.secondcharachter);
		  		var sitesName = req.body.ingredients;
		  		var loc= req.body.amount;
		  		var sites=[];
		  		if(sitesName)
		  			for (val in sitesName){
		  				sites.push({sitesName:sitesName[val],loc:loc[val]});
		  			}
		  			var privte = req.body.isTripPrivate;
		  			var areaLocition = req.body.area;
		  			var tripFilter =[];
		  			userEmail =req.body.email;
		  			if(req.body.who_are_you_going_with)
		  				(req.body.who_are_you_going_with).forEach(function(val){
		  					tripFilter.push(val);
		  				});

		  			if(req.body.trip_kind)
		  				(req.body.trip_kind).forEach(function(val){
		  					tripFilter.push(val);
		  				});

		  			tripFilter.push(req.body.difficulty);
		  			tripper_collection.insert({
		  				trip_name : nameTrip,
		  				trip_description : des,
		  				address : location,
		  				email : userEmail,
		  				trip_charachters : tripCharachters,
		  				trip_isPrivate : privte,
		  				tripSites : sites,
		  				area : areaLocition,
		  				imageUrl:urlImg,
		  				trip_filter : tripFilter
		  			}, function(err, docs) {
		  				if (err) {
		  					console.log("found error inserting");
		  					res.json({status:0,err:err})
		  					db.close();
		  					return;
		  				}
		  				if(docs){
		  					console.log('insert seccessfuly')
		  					res.json({status:1})
		  					db.close();
		  					return ;
		  				}
		  			});
		  		}


		  	});
});

});




//view in data base
app.get('/click', function(req, res) {

	res.render('click.ejs')
});

app.get('indexMobile', function(req, res) {

});

app.get('/', function(req,res){
	res.sendFile(__dirname+ '/index.html');
});
/*
app.post('/getImage', function(req,res){

	trip_id='554c635a3232b6c01a0d4cde';
	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
		if (err) {
			res.json({status:0})
			return ;
		} else 
		{
			var tripper_collection = db.collection('tripper_playlist');
			tripper_collection.findOne({ _id : new ObjectId(trip_id) },function (err, doc)
			{ 
	                // failure while connecting to sessions collection
	                if (err) 
	                {
	                	console.log( err);
	                	res.json({status:0,err:err})
	                	db.close();
	                	return;
	                }
	                
	                else
	                {
	                	res.json({status:1,doc:doc})
	                	console.log(doc)
	                	db.close();
	                	return ;
	                }
	            });
	        };


	    });
});
*/
app.get('/*', function(req, res) {

	res.send(404, "aaaaaaaa")
});



var port = process.env.PORT || 1337;
app.listen(port, function() {
	console.log("port " + port);
});
