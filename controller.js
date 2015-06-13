var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var viewWS = require('./modules/view_ws'); 
var usersWS = require('./modules/users_ws'); 
var tripsWS = require('./modules/trips_ws'); 
var port = process.env.PORT || 1337;

app = express();

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'node_modules/bower_components')));

app.use(express.static(path.join(__dirname, 'datepicker')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'tripFunction')));
app.use(express.static(path.join(__dirname, 'style')));

app.use(bodyParser());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json 
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//get view data from db
app.get('/getTripData', viewWS.getTripData);
//get data from users collection
app.post('/registerUser', usersWS.registerUser);
app.post('/updateMySchedule', usersWS.updateMySchedule);
app.post('/updateScheduleParticipents', usersWS.updateScheduleParticipents);
app.post('/saveTimeSchedule', usersWS.saveTimeSchedule);
app.post('/updateFavoirte', usersWS.updateFavoirte);
app.post('/getUserSchedule', usersWS.getUserSchedule);
app.post('/getUserFavorites', usersWS.getUserFavorites);
app.post('/updateTripChangesToUserFavorites', usersWS.updateTripChangesToUserFavorites);
app.post('/removeFromSchedule', usersWS.removeFromSchedule);
app.post('/removeEmailFromTripPartners', usersWS.removeEmailFromTripPartners);
app.post('/addChatComment', usersWS.addChatComment);
//get data from trips collection
app.post('/add', tripsWS.addTrip);
app.post('/filterByChars', tripsWS.filterByChars);
app.post('/addComment', tripsWS.addComment);
app.post('/getTripById', tripsWS.getTripById);
app.get('/findTripByUser/:email?', tripsWS.findTripByUser);
app.post('/updateRate', tripsWS.updateRate);
app.post('/uploadImageToTrip', tripsWS.uploadImageToTrip);
app.post('/updateTrip', tripsWS.updateTrip);
app.post('/addTripWithoutImages', tripsWS.addTripWithoutImages);
app.post('/updateTripWithImage', tripsWS.updateTripWithImage);
app.post('/updateTripWithOutImages', tripsWS.updateTripWithOutImages);

app.get('/*', function(req, res) {

	res.send(404, "ERROR")
});

app.listen(port, function() {
console.log("port " + port);
});
