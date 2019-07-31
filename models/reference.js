var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var User = require('./user.js').User

const ReferenceSchema = new Schema({
      citekey: String,
      authors: [String],
      title: String,
      year: Number,
      month: Number,
      day: Number,
      publication: String,
      createdBy: { type: Schema.Types.ObjectId , ref: "User"}, // User that created this record
      modifiedBy: { type: Schema.Types.ObjectId , ref: "User"} // User that last updated this record
}, {timestamps: true})


exports.Reference = mongoose.model('Reference', ReferenceSchema);




module.exports = exports
