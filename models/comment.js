var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  
var commentSchema = Schema({
	author: { type: Schema.Types.ObjectId, ref: 'Person' },
	content: String,
	_story : { type: Schema.Types.ObjectId, ref: 'Story' },
});

module.exports = mongoose.model('Comment', commentSchema);