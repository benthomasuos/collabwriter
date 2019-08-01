var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var Reference = require('./reference.js').Reference
var Figure = require('./figure.js').Figure
var User = require('./user.js').User

const TemplateSchema = new Schema({
      access: {type: String, default: "Public"},
      name: String,
      title: String,
      body: String,
      createdBy: { type: Schema.Types.ObjectId , ref: "User"}, // User that created this record
      modifiedBy: { type: Schema.Types.ObjectId , ref: "User"} // User that last updated this record
}, {timestamps: true})




exports.Template = mongoose.model('Template', TemplateSchema);




module.exports = exports
