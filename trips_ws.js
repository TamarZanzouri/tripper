var express = require('express');
var router = express.Router();

router.post('/filterByChars', function(req, res) {
	try{
		var charachters = req.body.chars;
		console.log("trip charachters " + charachters)
	}
	catch(err){
		console.log("cant get charachters")
	}
 	
	// db.model('tripper_playlist').findOne({ email : user.email }, function(err, result){
	db.model('tripper_playlists').find( {$and: [ {trip_charachters: { $in : [charachters[0], charachters[1] ] } }, { trip_isPrivate : false } ] },
		function (err, docs)
	{ 
                // failure while connecting to sessions collection
                if (err) 
                {
                	console.log("cant get results " + err);

                	return;
                }
                
                else
                {
                	console.log(docs);
                	res.json(docs)
                }
            });
	
});

//addComment

router.post('/addComment', function(req, res) {
	try{
		var user = req.body.user;
		var trip_id = req.body.trip_id;
		var comment = req.body.comment;
		var objComment = user.name+":"+comment;
		console.log(" update comment",comment);
	}
	catch(err){
		console.log("cant add comment")
	}
	// var tripper_collection = db.model('tripper_playlist')
	db.model('tripper_playlists').findByIdAndUpdate(trip_id, { $push: {comments:objComment}}, function(err, docs) {
		if (err) {
			console.log("found error inserting");
			res.json({status:0})
			db.close();
			return console.error(err);
		}
		console.log("updated comment")
		console.log(docs)
		res.json({status:1})
		return;
	});

});

app.post('/getTripById', function(req, res) {
	try{
		var tripId = req.body.id;
		console.log(tripId);		
	}
	catch(err){
		console.log("error getting trip id " + err)
	}
			// var tripper_collection = db.collection('tripper_playlist');
	db.model('tripper_playlists').findOne({ _id : new ObjectId(tripId) },function (err, docs)
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
                }
            });
});


app.get('/findTripByUser/:email?', function(req, res) {
	try{
		userEmail = req.query.email;
		console.log(userEmail);
	}
	catch(err){
		console.log("couldent get user " + err);
	}
	// var tripper_collection = db.model('tripper_playlist', new Schema({ url: String, text: String, id: Number}), 'tripper_playlist');
	db.model('tripper_playlists').find({ email : userEmail },{_id:true, trip_name:true, address:true }, function (err, docs)
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
});

module.exports = router;