var express = require('express');

var router = express.Router();

var tripList=[
	{id:1,description:'foo'},
	{id:2,description:'bar'},
	{id:3,description:'baz'}
];

router.get('/',function(req,res){
	res.render('index.ejs',{
		titel:'Tripper',
		trips:tripList
	});
});

router.post('/add', function (req,res) {
	var newTrip = req.body.newTrip;
	tripList.push({
		id: tripList.length+1,
		description:newTrip
	});

	res.redirect('/');
});

module.express = router;