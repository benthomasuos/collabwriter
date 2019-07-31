var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var User = require('./user.js').User

const ProjectSchema = new Schema({
  name: String,
  number: String,
  category: String,
  description: String,
  start_date: Date,
  end_date: Date,
  value: Number, // Value of the project in GBP (for now)
  status: {type:String, default: "Active"},
  client: String,
  members: [{ type: Schema.Types.ObjectId , ref: "User"}],
  created_by: { type: Schema.Types.ObjectId , ref: "User"},
  modified_by: { type: Schema.Types.ObjectId , ref: "User"},
  created_date: Date,
  modified_date: {type: Date, default: Date.now}


}, {timestamps: true});


exports.Project = mongoose.model('Project', ProjectSchema);



module.exports = exports
