var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var Media = require('./media.js').Media
var User = require('./user.js').User

const FigureSchema = new Schema({
      name: String,
      category: String, // Type of figure. Photo, drawing, vector graphics, etc.
      caption: String,
      refkey: String,
      media: [{ type: Schema.Types.ObjectId , ref: "Media"}],  // Reference from supplier for the batch of powder
      createdBy: { type: Schema.Types.ObjectId , ref: "User"}, // User that created this record
      modifiedBy: { type: Schema.Types.ObjectId , ref: "User"} // User that last updated this record
}, {timestamps: true})


exports.Figure = mongoose.model('Figure', FigureSchema);




module.exports = exports
