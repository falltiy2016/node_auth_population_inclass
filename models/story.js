var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  
const storySchema = Schema({
  _creator : { type: Number, ref: 'Person' },
  title    : {
  	type: String,
  	required:true,
  },
  description: {
  	type: String,
  	required: true,
  },
});


module.exports = mongoose.model('Story', storySchema);

