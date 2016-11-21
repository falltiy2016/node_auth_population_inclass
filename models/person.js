const mongoose = require('mongoose')
const Schema = mongoose.Schema
const findOrCreate = require('mongoose-findorcreate')
  
var personSchema = Schema({
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }],
  facebookID: String,
  admin: Boolean,
});

personSchema.plugin(findOrCreate);

module.exports = mongoose.model('Person', personSchema);