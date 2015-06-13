var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;
var controller = require('./controller');

var mongopath = 'mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd';

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
fs.readdirSync(__dirname + '/models').forEach( function( fileName)
{
	if (~fileName.indexOf('.js')) require(__dirname + '/models/' + fileName);
});

process.on('uncaughtException', function(err) {
	console.log('Caught exception: ' + err);
});