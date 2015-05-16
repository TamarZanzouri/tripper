var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var viewsSchema = new Schema( 
{
	trip_charachters : [{
		id : { type : Number,  unique: true },
		name : String
	}],
	who_are_you_going_with : [{
		filter : String,
		label : String
	}],
	trip_kind : [{
		filter : String,
		label : String
	}],
	difficulty : [{
		filter : String,
		label : String
	}],
	isTripPrivate : [{
		filter : String,
		label : String,
		value : Boolean
		}]
});

View = mongoose.model('tripper_views', viewsSchema);