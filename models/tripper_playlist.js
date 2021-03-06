var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playlistSchema = new Schema( 
{
	trip_name : { type : String, default : ''},
	trip_description : { type : String, default : ''},
	address : { type : String, default : ''},
	trip_charachters : { type : Array, default : [] },
	trip_isPrivate : { type : Boolean, default : false },
	area : { type : String, default : ''},
	email : { type : String, default : ''},
	comments : [{ 
		userName : { type : String, default : ''},
		userImg : { type : String, default : ''},
		comment : { type : String, default : ''}
	}],
	imageUrl : { type : Array, default : []},
	trip_filter : { type : Array, default : [] },
	shareEmail : { type : Array, default : [] },
	tripSites : [ {
					siteName : { type : String, default : ''},
					img : { type : String, default : ''}
				} ],
	mapPoint : {
		lat : {type : Number, default : 0},
		lng : {type : Number, default : 0}
	},
	rate : {
		value : { type : Number, default : 0 },
		userEmail : { type : Array , default : [] }
	}
});

Playlist = mongoose.model('tripper_playlists', playlistSchema);