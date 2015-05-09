var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectID;

var multiparty = require('multiparty');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var formidable = require('formidable');

app = express();
var userEmail;
var cloudinary = require('cloudinary');
var mongoose = require('mongoose');
Schema = mongoose.Schema;

cloudinary.config({ 
  cloud_name: 'dxgyixsmg', 
  api_key: '862129673261382', 
  api_secret: 'g-0pnDM6ZVHf_noES9RWrudPr64' 
  //cdn_subdomain: true
});

var sites;
var mongopath = 'mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd';
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

var usersWS = require('./users_ws'); 
app.use(usersWS); 
var tripsWS = require('./trips_ws'); 
app.use(tripsWS); 

//connection to mongo
mongoose.connect(mongopath);

db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
  console.log("connected through mongoose");
});

db.on('disconnected', function()
{
  	console.log("you are disconnected, reconnecting");
	mongoose.connect(mongopath);
});

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
//view in data base
app.get('/', function(req, res) {
	console.log("in my function");
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
				                	console.log(docs);
				                	(docs).forEach(function(t){
				                		(t.trip_charachters).forEach(function(tt){
				                			tripperCharachters.push(tt)
				                		})

				                	})
				                	console.log(docs);
				                	// res.render('index.ejs', {
				                	// 	title : 'Tripper',
				                	// 	character : tripperCharachters,
				                	// 	trips : docs
				                	// });
				                	// db.close();
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
	        console.log("11",this.uplaodDir)
	        console.log( files.upload.path, "/tmp/" + files.upload.name )
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
	console.log("22",this.uplaodDir)
	form.on('end', function(error, fields, files) {
		//console.log("end", this.openedFiles[0].path);
		console.log( files.upload.path, "/tmp/" + files.upload.name )
		console.log(this.uplaodDir)
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


		cloudinary.uploader.upload(file_name,function(result) { console.log(result) });
		// var file_reader = fs.createReadStream('file_name').pipe(stream)


		/*

		  MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
		  	if (err) {
		  		res.json({status:0})
		  		return ;
		  	} else {
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


		  	});*/
});

	console.log(req.body)
	//console.log("haim" + req.body.newTrip + " " + req.body.des);
	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
		if (err) {
			return console.dir(err);
		} else {
			var tripper_collection = db.collection('tripper_playlist');
			var nameTrip = req.body.nameTrip;
			var des = req.body.des;
			var location = req.body.locationTrip;
			var tripCharachters = [];
			tripCharachters.push(req.body.firstcharachter);
			tripCharachters.push(req.body.secondcharachter);
			var privte = req.body.isTripPrivate;
			var areaLocition = req.body.area;
			var tripFilter =[];
			(req.body.who_are_you_going_with).forEach(function(val){
				tripFilter.push(val);
			});
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
				trip_filter : tripFilter
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
	// res.redirect('/');


});




//view in data base
app.get('/click', function(req, res) {

	res.render('click.ejs')
});

app.get('indexMobile', function(req, res) {

});

// app.get('/', function(req,res){
// 	res.sendFile(__dirname+ '/index.html');
// });
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
