var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  
const storySchema = Schema({
  _creator : { type: Schema.Types.ObjectId, ref: 'Person' },
  title    : {
  	type: String,
  	required:true,
  },
  description: {
  	type: String,
  	required: true,
  },
  comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});


module.exports = mongoose.model('Story', storySchema);

