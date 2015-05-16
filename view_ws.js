var express = require('express');
var router = express.Router();

router.get('/getTripCharachters', function (req, res) {

	console.log("in first function")

	db.model('tripper_views').find({}, function (err, docs) {
		console.log(docs)
		res.json(docs)
	});

	})

module.exports = router;