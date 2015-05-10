var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema( 
{
	email : String,
	name : String,
	image : String,
	favorites : [ { 
			trip_name : String,
	 		address : String ,  default : [] 
	 	} ],
	schedule : [ { trip_name : String, 
				trip_description : String , 
				address : String , 
				address : String , 
				trip_charachters : {type : Array, default : []}, 
				trip_isPrivate : Boolean, 
				tripSites : [ {
					siteName : String, 
					location : String , default : [] } ], default : [] } ],
	area : String
	});

User = mongoose.model('users', usersSchema);