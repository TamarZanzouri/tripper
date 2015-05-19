var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var viewsSchema = new Schema( 
{
	trip_charachters : [{
		id : { type : Number,  unique: true },
		name : String
	}]
});

View = mongoose.model('tripper_views', viewsSchema);