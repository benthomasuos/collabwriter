'use strict'

const express = require('express')
const router = express.Router({ mergeParams: true });
var ObjectId = require('mongodb').ObjectID;
var auth = require('../auth/middleware.js')

var User = require('../../models/user.js').User

var upload = require('../uploads.js').upload

//================================================================
// User routing area
//================================================================


// TODO protect these end points by only allowing authorised accounts to access user lists
// TODO OR create this request as a middleware and then all user data awill only be handled server-side(?)

router.get('/', auth.requiresLogin, function(req, res){

    console.log("User : " , res.locals.user)

    User.findOne({ _id: res.locals.user._id },
            { _id: 0,
              username:1,
              firstname: 1,
              surname: 1,
              phonenumber: 1,
              email: 1,
              photo: 1,
              location: 1,
              last_login: 1,
              api_token: 1,
              roles: 1
          },function(err, user){
        if(err){
            console.log(err)
            res.json({message: 'Error when trying to find user info' , status: 'warning'})
          } else {
            console.log("Found user info", user)
            res.render("admin/account", {user: user})
          }
        })
})



router.get('/find', auth.requiresLogin, function(req, res){

    console.log("User query ", req.query)

    if(req.query){

            var query = {}

            if(req.query.roles){
                query.roles = { $in: req.query.roles }
            }


            User.find( query ,
                    { _id: 1,
                      firstname: 1,
                      surname: 1,
                      email: 1,
                      photo: 1,
                      location: 1
                  },function(err, users){
                if(err){
                    console.log(err)
                    res.json({message: 'Error when trying to find user info' , status: 'warning'})
                  } else {
                    console.log("Found "+ users.length +" users")
                    res.json({message: 'Found users' , status: 'success', data: users})
                  }
                })


    }
    else{
        res.json({message: 'No query sent to find user info' , status: 'warning'})
    }
})

router.put('/', auth.requiresLogin, upload.single('profile_img'), function(req, res){

    console.log("Updating user info")
    if(req.file){
        console.log("File in req.file: " + JSON.stringify(req.file))
        req.body.photo = req.file.location
    }
    console.log("Request to update user by " , res.locals.user)
    console.log(req.body)

            User.updateOne({ _id: res.locals.user._id },{$set: req.body},function(err, user){
                if(err){
                    console.log(err)
                    res.json({message: 'Error when trying updating user info' , status: 'warning'})
                  } else {

                      console.log("Updated user info", user)
                      res.json({message: 'Updated' , status: 'success'})

                  }
                })

})

module.exports = router;
