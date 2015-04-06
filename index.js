
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app=express();
var Character = ['char1','char2','char3','char4','char1','char2','char3','char4','char1','char2','char3','char4'];

app.set('view engine' ,'ejs');
app.set('views',path.join(__dirname , 'views'));
app.use(express.static(path.join(__dirname,'node_modules/bower_components')));

app.use(express.static(path.join(__dirname,'tripFunction')));
app.use(express.static(path.join(__dirname,'style')));

app.use(bodyParser());



//view in data base
app.get('/',function(req,res){
	// Connect to the db
	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
	  if(err) { 
	  	return console.dir(err);
	 }
	 else{
		var collection = db.collection('TDB');
		collection.find({ }).toArray(function (err, docs) {
		    res.render('index.ejs',{
				titel:'Tripper',
				character:Character,
				trips:docs
			});
		 });	
		}
	});
	
});

app.post('/add', function (req,res) {
	console.log("haim"+req.body.newTrip+" "+req.body.des);
	MongoClient.connect("mongodb://TripperDB:shenkar6196@ds041177.mongolab.com:41177/tripperbd", function(err, db) {
	  if(err) { return console.dir(err);}
	 else{
		var collection = db.collection('TDB');
		var nameTrip = req.body.nameTrip;
		var des = req.body.des;
		var location = req.body.locationTrip;
		var char1 = req.body.char1;
		var char2 = req.body.char2;
		var privte =req.body.privte;
		var temp = {
			id: new Date().getTime(),
			name:nameTrip,
			description:des,
			location:location,
			character1:char1,
			character2:char2,
			ifPrivte:privte
		};
		//console.log(temp);
		collection.insert(temp,function(){
			
		})
		 
		//console.log(collection);
		
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
app.get('/click',function(req,res){

	res.render('click.ejs')
});

app.get('/*',function(req,res){

	res.send(404,"aaaaaaaa")
});
port = app.get('port') || 1337
app.listen(port,function(){
	console.log("port "+port);
});


/*
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
*/