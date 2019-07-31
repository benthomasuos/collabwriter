var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var User = require('./user.js').User


const MediaSchema = new Schema({
      name: String,
      originalname: String,
      type: String,
      category: String,
      description: String,
      mimetype: String,
      location: String,
      exif: Schema.Types.Mixed,
      transforms: Schema.Types.Mixed,
      access: String,
      createdBy: { type: Schema.Types.ObjectId , ref: "User"},
      modifiedBy: { type: Schema.Types.ObjectId , ref: "User"},
      isDeleted: { type: Boolean , default: false}

}, {timestamps: true})


exports.Media = mongoose.model('Media', MediaSchema);




module.exports = exports
