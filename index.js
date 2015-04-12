var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var Character = ['char1', 'char2', 'char3', 'char4', 'char1', 'char2', 'char3', 'char4', 'char1', 'char2', 'char3', 'char4'];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'node_modules/bower_components')));

app.use(express.static(path.join(__dirname, 'tripFunction')));
app.use(express.static(path.join(__dirname, 'style')));

app.use(bodyParser());

//view in data base
app.get('/', function(req, res) {
	// Connect to the db
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
			tripper_collection.insert({
				trip_name : nameTrip,
				trip_description : des,
				address : location,
				trip_charachters : [{
					charachter : char1
				}, {
					charachter : char2
				}],
				trip_isPrivate : privte
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

				console.log("inserted " + docs.length + documents);

				tripper_collection.findOne({
					_id : new ObjectId()
				}, function(err, doc) {
					if (err)
						return console.error(err);
					console.log("read 1 item" + doc);
				});
			});
		}
		// var doc1 = {'hello':'doc1'};
		// var doc2 = {'hello':'doc2'};
		// var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];

		// collection.insert(doc1);

		// collection.insert(doc2, {w:1}, function(err, result) {});

		// collection.insert(lotsOfDocs, {w:1}, function(err, result) {});
	});
	res.redirect('/');
	/*
	 res.render('add.ejs',{
	 titel:'Tripper',
	 trips:docs
	 });
	 });*/
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
port = app.get('port') || 1337
app.listen(port, function() {
	console.log("port " + port);
});
