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
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json 
app.use(bodyParser.json());



var options = {
	db: { native_parser : true }
  }

//connection to mongo
mongoose.connect(mongopath,options);

db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.on('open', function () {
  console.log("connected through mongoose");
});

db.on('disconnected', function()
{
  	console.log("you are disconnected, reconnecting");
	mongoose.connect(mongopath,options);
});

//load all files in models dir
//load all files in models dir
fs.readdirSync(__dirname + '/models').forEach( function( fileName)
{
	if (~fileName.indexOf('.js')) require(__dirname + '/models/' + fileName);
});

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
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
	
		/*MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
			if (err) {
				return console.dir(err);
			} else {
				var tripper_collection = db.collection('tripper_playlists');
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
		});*/
	
});

app.get('/sendSites/:sites?', function(req, res) {
	sites = req.query.sites;
	console.log(sites);
});

app.post('/add', function(req, res) {
	//console.log(req.files,req.body)
	//console.log("haim" + req.body.newTrip + " " + req.body.des);

	var urlImg="";
	var dataForm={};
	var playlistToAdd = {};
	var form = new formidable.IncomingForm();

	form.parse(req, function(error, fields, files) 
	{
		console.log('-->PARSE<--');
        //logs the file information 
        console.log("files", JSON.stringify(files));
        console.log("fields", JSON.stringify(fields));
        dataForm=fields;
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
	
		console.log(this)
		console.log(files)
		 var temp_path = this.openedFiles[0].path;
      console.log("temp_path: " + temp_path);
          
      /* The file name of the uploaded file */
      var file_name = this.openedFiles[0].name;
      console.log("file_name: " + file_name);

		
		var stream = cloudinary.uploader.upload_stream(function(result) {
		 console.log("result from cloudinary " + result) 
		 urlImg=result.url;
		});
		var file_reader = fs.createReadStream(temp_path).pipe(stream)


		// cloudinary.uploader.upload(file_name,function(result) { console.log(result) });
		// var file_reader = fs.createReadStream('file_name').pipe(stream)
	
		  		playlistToAdd.trip_name = dataForm.nameTrip;
		  		playlistToAdd.trip_description = dataForm.des;
		  		playlistToAdd.address = dataForm.locationTrip;
		  		var tripCharachters = [];
		  		tripCharachters.push(dataForm.firstcharachter);
		  		tripCharachters.push(dataForm.secondcharachter);
		  		playlistToAdd.trip_charachters = tripCharachters;
		  		var sitesName = dataForm.ingredients;
		  		var loc= dataForm.amount;
		  		var sites=JSON.parse(dataForm.sites);
		  		playlistToAdd.mapPoint=(dataForm.mapPoint)?JSON.parse(dataForm.mapPoint):'';
		  		if(sitesName)
		  			for (val in sitesName){
		  				sites.push({sitesName:sitesName[val],loc:loc[val]});
		  			}
		  			playlistToAdd.trip_isPrivate = dataForm.isTripPrivate;
		  			playlistToAdd.area = dataForm.area;
		  			var tripFilter =[];
		  			playlistToAdd.email =dataForm.email;
		  			if(dataForm.who_are_you_going_with)
		  				(dataForm.who_are_you_going_with).forEach(function(val){
		  					tripFilter.push(val);
		  				});

		  			if(dataForm.trip_kind)
		  				(dataForm.trip_kind).forEach(function(val){
		  					tripFilter.push(val);
		  				});

		  			tripFilter.push(dataForm.difficulty);
		  			console.log("filters enterd " + tripFilter)
		  			playlistToAdd.trip_filter = tripFilter;
		  			playlistToAdd.tripSites = sites;
		  			playlistToAdd.imageUrl = urlImg;
		  			console.log("inage url on cloudinary " + urlImg)
		  			var newTrip = new Playlist(playlistToAdd);
		  			console.log("new trip before insert " + newTrip)
		  			newTrip.save(function(err, docs) {
		  				if (err) {
		  					console.log("found error inserting");
		  					res.json({status:0,err:err})
		  					return;
		  				}
		  				if(docs){
		  					console.log('insert seccessfuly')
		  					res.json({status:1})
		  					return ;
		  				}
		  			});


		  	});
	
}); 

var usersWS = require('./users_ws'); 
app.use(usersWS); 
var tripsWS = require('./trips_ws'); 
app.use(tripsWS); 



//view in data base
app.get('/click', function(req, res) {

	res.render('click.ejs')
});

app.get('indexMobile', function(req, res) {

});

app.get('/*', function(req, res) {

	res.send(404, "ERROR")
});



var port = process.env.PORT || 1337;
app.listen(port, function() {
	// new Playlist().save(function(err,result){
	// 	console.log(err,result)
	// })
	console.log("port " + port);
});
