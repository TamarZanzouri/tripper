var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectID;

app = express();
var mongoose = require('mongoose');

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
	/*
		MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
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
		});
*/
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
