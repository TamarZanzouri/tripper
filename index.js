var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var Character = ['char1', 'char2', 'char3', 'char4', 'char1', 'char2', 'char3', 'char4', 'char1', 'char2', 'char3', 'char4'];
var router = express.Router();


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
<<<<<<< HEAD

=======
}catch(err){
	console.log("mongodb connection failed")
}
	
>>>>>>> origin/master
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
			tripper_collection.find( { trip_charachters:  { $elemMatch : { "charachter": {"$in" : [charachters[0], charachters[1]]} }}}).toArray(function (err, docs)
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

router.post("/index/insertUser",function(req, res) 
{
    var userip = req.connection.remoteAddress.replace(/\./g , '');
    var uniqueid = parseInt( new Date().getTime()+userip,10);
    var data;
    var r = {};
    console.log(req)
    try
    {
        // try to parse the json data
        data = req.body;
    }
    catch(err)
    {
        console.log("failure while parsing the request, the error:", err);
        r.status = 0;
        r.desc = "failure while parsing the request";
        res.json(r);
        return;
    }
    console.log(JSON.stringify(data))

    
    if ( data && data != "" )   // if data property exists in the request is not empty
    {
        data.favorites=[];
        data.recipes=[];

        console.log("data is: " + JSON.stringify(data));

        db.model('users').find({ email:data.email }, { _id : false }, function (err, result)
        {
            if (err) 
            {
                console.log("--> Err <-- : " + err);
                r.status = 0;
                r.desc = "--> Err <-- : " + err;
                res.json(r);
            }
            
            if (result)
            {
                if (!result.length)
                new users(data).save(function (e) {
                    if (e) res.json({status:0});
                    res.json({status:1});
                    
                  });
            else  res.json({status:1});
            }
        });

          
       

    }
    else
    {
        console.log("data propery does not exist in the query or it is empty");
        r.status = 0;
        r.desc = "data propery does not exist in the query or it is empty";
        res.json(r);  
        return;     
    }   
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
