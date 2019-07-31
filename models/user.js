var mongoose = require('mongoose')
var Schema = mongoose.Schema;


const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const email = require(process.cwd() + '/email.js')


const UserSchema = new Schema({
  firstname: String,
  surname: String,
  username: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  phonenumber: String,
  email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  password: String,
  confirmed_password: Boolean,
  institution: String,
  photo: String, // URL of photo location
  email_confirmed: Boolean,
  email_confirm_token: String,
  reset_password_token: String,
  last_login: Date,
  registered_date: Date,
  modified_date: {type: Date, default: Date.now},
  roles: [String],
  api_token: String

}, {timestamps: true});



UserSchema.methods.setPassword = function(password){
    var hash = bcrypt.hashSync(user.password, 8);
    this.password = hash

};



UserSchema.methods.validPassword = function(password) {
    var logged_in = false;
    bcrypt.compare(req.body.password, user.password, function(err, resp) {
      if(resp) {
          // Password matches that stored in the user's database entry
          console.log(resp)
      }
  })

};



UserSchema.methods.genJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

UserSchema.methods.genAPIToken = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  var token = jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);

  this.api_token = token
};

UserSchema.methods.basicInfo = function() {
    var info = {
            firstname: this.firstname,
            lastname: this.lastname,
            photo: this.photo,
            instituion: this.institution
    }
    return info
};



UserSchema.methods.sendConfirmEmail = function(password) {

  return ;
};

UserSchema.methods.sendForgotPwdEmail = function(password) {

  return ;
};


exports.User = mongoose.model('User', UserSchema);

module.exports = exports
