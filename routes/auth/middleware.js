
var ObjectId = require('mongodb').ObjectId

var User = require('../../models/user.js').User

var exports = module.exports = {};


exports.checkEmail = function(email){
    console.log('Validating email')
    var email = email.split('@')[1]
    var email_is_valid = false;

    if(email == 'sheffield.ac.uk' ||
       email == 'manchester.ac.uk' ||
       email == 'ox.ac.uk' ||
       email == 'imperial.ac.uk' ||
       email == 'leeds.ac.uk' ||
       email == 'ucl.ac.uk'
    ){
           email_is_valid = true
       }
       console.log(email_is_valid)
       return email_is_valid
}




exports.requiresLogin = function(req, res, next){

  if(req.session.user || res.locals){
     console.log("User is already logged in")
     //console.log(req.session.user , res.locals.user)
     if(req.session.user) var user_id = req.session.user._id
     if(res.locals.user) var user_id = res.locals.user._id

      User.findById( user_id ,{ _id: 1, firstname:1, surname:1, roles: 1} , function(err, user){
            if(err){
                res.redirect('/')
            }
            if(!user){
              // If the user cannot be verified, redirect to login. Once the login route has been solved,
              // log the user in and then redirect to the page that the client originally requested.
                console.log("Can't find this user...are you a real person?")
                req.session.redirectTo = req.originalUrl
                res.redirect('/auth/login')
            }
            else{
                console.log('User found: '+ user.firstname)
                res.locals.user = user
                next()
            }

        })
    }
  else{
    //console.log(req.baseUrl)
    req.session.redirectTo = req.originalUrl
    console.log(" Please log in to access: "+ req.session.redirectTo)
    res.redirect('/auth/login')
  }

}


exports.requiresAPIKey = function(req, res, next){
  var api_token = req.body.api_token || req.query.api_token || req.headers['x-access-api_token'];


  if(api_token){

          delete req.query.api_token

          console.log("API key supplied by the requester")

          User.findOne( {api_token: api_token} ,{ _id: 1, firstname:1, surname:1, roles: 1} , function(err, user){
                if(err){
                    res.json({message:"The API key you provided was not found. Please check it and try again.", status:"error"})
                }
                if(!user){
                  // If the user cannot be verified, redirect to login. Once the login route has been solved,
                  // log the user in and then redirect to the page that the client originally requested.
                    console.log("Can't find this user...are you a real person?")
                    res.json({message:"You didn't supply a valid API key to access the API endpoint: " + req.originalUrl, status:"error"})
                }
                else{
                    console.log('User found for this API_key: ' + user.username + '. Allowing access to the API endpoint: ' + req.originalUrl)
                    res.locals.user = user
                    next()
                }

            })
  }
  else{
    //res.json({message:"You didn't supply a valid API key for this action.", status:"error"})
        next()
  }


}

exports.requiresAdmin = function(req, res, next){
    var user = res.session.user
    if(user.roles.includes('admin')){
      console.log('Logged in user is an Admin')
      next()
    }
    else{
      console.log('User is not Admin')
      res.status('401').render('401')
    }

}



module.export = exports
