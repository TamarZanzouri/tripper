var express = require('express');
var router = express.Router();

router.get('/getTripData', function (req, res) {

	console.log("in first function")

	db.model('tripper_views').find({}, function (err, docs) {
		console.log("0", docs[0], "1\n", docs[1])
		res.json({tripCharachters : docs[0], tripData : docs[1]})
	});

})

module.exports = router;