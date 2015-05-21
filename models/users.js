var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema( 
{
	email : {type : String, index: true,unique: true, required: true},
	name : String,
	image : String,
	favorites : [ { 
			trip_name : String,
	 		address : String
	 	} ],
	tripScheduleTime : { 
		checkInTime : {type : Date, default : ''},
		checkOutTime : {type : Date, default : ''}
	},
	tripPatners : { type : Array, default : [] },
	schedule : [ {
		_id : String,
	trip_name : { type : String, default : ''},
	trip_description : { type : String, default : ''},
	address : { type : String, default : ''},
	trip_charachters : { type : Array, default : [] },
	trip_isPrivate : { type : Boolean, default : false },
	area : { type : String, default : ''},
	email : { type : String, default : ''},
	comments : { type : Array, default : []},
	imageUrl : { type : String, default : ''},
	trip_filter : { type : Array, default : [] },
	shareEmail : { type : Array, default : [] },
	tripSites : [ {
					siteName : { type : String, default : ''},
					img : { type : String, default : ''}
				} ],
	mapPoint : {
		lat : {type : Number, default : 0},
		lng : {type : Number, default : 0}
	}
	} ],
});

User = mongoose.model('users', usersSchema);