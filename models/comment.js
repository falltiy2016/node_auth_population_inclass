var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  
var commentSchema = Schema({
	author: { type: Number, ref: 'Person' },
	content: String,
	story: { type: Schema.Types.ObjectId, ref: 'Story' }
});

module.exports = mongoose.model('Comment', commentSchema);