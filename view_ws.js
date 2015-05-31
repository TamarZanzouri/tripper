var express = require('express');
var router = express.Router();

router.get('/getTripCharachters', function (req, res) {

	console.log("in first function")

	db.model('tripper_views').find({ _id : new ObjectId('554cd2d4e4b0e50ebd74101b')}, function (err, docs) {
		console.log(docs)
		res.json(docs)
	});

	})
router.get('/getTripData', function (req, res) {

	console.log("in first function")

	db.model('tripper_views').find({ _id : new ObjectId('556b7d36e4b03d041b59acfe')}, function (err, docs) {
		console.log(docs[0])
		res.json(docs[0])
	});

	})

module.exports = router;