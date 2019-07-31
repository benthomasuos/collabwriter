var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var Reference = require('./reference.js').Reference
var Figure = require('./figure.js').Figure
var User = require('./user.js').User

const DocSchema = new Schema({
      access: {type: String, default: "Private"},
      title: String,
      author: String,
      coauthors: [String],
      body: String,
      references: [{ type: Schema.Types.ObjectId , ref: "Reference"}],
      figures: [{ type: Schema.Types.ObjectId , ref: "Figure"}],
      createdBy: { type: Schema.Types.ObjectId , ref: "User"}, // User that created this record
      modifiedBy: { type: Schema.Types.ObjectId , ref: "User"} // User that last updated this record
}, {timestamps: true})




exports.Doc = mongoose.model('Doc', DocSchema);




module.exports = exports
