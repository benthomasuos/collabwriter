'use strict'

const express = require('express')
const email = require(process.cwd() + '/email.js')
const router = express.Router({ mergeParams: true });
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

var User = require('../../models/user.js').User

var auth = require('./middleware.js')

var ObjectId = require('mongodb').ObjectID;

//================================================================
// Auth routing area
//================================================================




router.get('/register', function(req, res){
    res.render('admin/register')
})



router.get('/login', function(req, res){
    res.render('admin/login')
})

router.post('/register', function(req, res){

    console.log('Received registration request')

    var checkEmail = auth.checkEmail( req.body.email )

    //==================
    // HACK - TO REMOVE
    //==================
    //  checkEmail = true;
    //==================
    // HACK - TO REMOVE
    //==================



    if( checkEmail === false ){
        console.log("Email not valid")
        res.send('Email is not valid for a MAPP partner institution')
    }
    else{
        var newUser = new User(req.body)
        var hashedPassword = bcrypt.hashSync(newUser.password, 8);
        newUser.password = hashedPassword;
        newUser.email_confirmed = false;
        newUser.active = false;
        var institution = newUser.email.split('@')[1].split('.')[0];
        newUser.roles = ["user", "mapp", institution ];
        console.log('Validated user:' , newUser);



User.findOne({email: newUser.email}, function(err, result){
    if(err){
        console.log(err)
    }
    if( result ){
        console.log(result.username)
        console.log("User already exists")
        res.status(500).render('admin/login', {status: 'failed', message: 'User with this email already exists'})
    }
    else{
        var token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
                     expiresIn: 86400 // expires in 24 hours
                   });


        newUser.save( function(err, user){
            console.log('Inserting user to the database')
           if(err){
             console.log(err)
           }
            else{
                console.log(user)
                user.email_confirm_token = token

                //==================
                // HACK - TO REMOVE
                //==================
                  user.email_confirmed = true;
                //==================
                // HACK - TO REMOVE
                //==================

                user.save(function(err, user){
                    console.log('Inserting user to the database')
                   if(err){
                     console.log(err)
                     res.redirect('/auth/login');
                   }
                   else{
                       console.log("User created successfully", user)
                       //email.sendConfirmEmail(newUser.email, token)
                       res.redirect('/home');
                   }
               })



            }
        })


        }

    })

 }


})




router.post('/login', function(req, res){


    //console.log(req.body)

    User.findOne({ username: req.body.username }, function(err, user){

        if(err || !user) {
         // User doesn't exist OR we can't get the user and it caused an error
            res.status(401).send("Can't find registered user with username " + req.body.username)
        }
        else {
         // User exists, lets see if the password matches the bcrypt salt stored in the database
            console.log('Found user in the database')
            console.log(user)
            if(!user.email_confirmed){
                console.log('Email not yet confirmed')
                res.status(401)
                res.json({ message: 'Your email has not yet been confirmed. Please check your email and follow the link provided.', status:'warning' })
            }
            else{
                // Check the password is correct and if not return the user to the login page

                 bcrypt.compare(req.body.password, user.password, function(err, resp) {
                   if(resp) {

                    // Password matches that stored in the user's database entry
                    console.log(resp)
                    // Change the authorised session ID so that it is different to the unauthorised ID
                    if(req.session.redirectTo){
                        var redirect = req.session.redirectTo
                    }
                    var userToSave = new User(user)

                    req.session.regenerate(function(err){
                          req.session.success = true
                          userToSave.save( function(err, user){
                                  if(err){
                                      console.log('Error in updating user login stats')
                                  }
                                  else{
                                      console.log('User updated for this login session. Sending them to another page, ' + redirect)
                                      req.session.user = user

                                    res.redirect( redirect || '/home')
                                    delete req.session.redirectTo;
                                  }
                                })

                            })

                   } else {


                    // Obvious backdoor to gain access to a users account REMOVE BEFORE DEPLOYMENT
                    //var userToSave = new User(user)
                    //var hashedPassword = bcrypt.hashSync(req.body.password, 8);
                    //userToSave.password = hashedPassword
                    // userToSave.save( function(err, result){console.log("Hacked password")})

                    // Passwords don't match
                    req.session.success = false
                    res.status(401).send("Password is incorrect for user: " + req.body.username)


                   }
                 });

         }


        }







    } )







})




router.get('/logout', function(req, res){
  req.session.destroy(function(){
        console.log("user logged out.")
     });
     res.redirect('/');
})













router.get('/confirm/:token', function(req, res){
    console.log(req.query)

    // convert token to json


    var decoded = jwt.verify(req.params.token, process.env.JWT_SECRET )
    console.log(decoded)

    User.findOne({email_confirm_token: req.query.token}, function(err, result){
        if(err){console.log(err)}
        else{
            console.log('Found email confirm token OK')
            //Found the token
            // get user from token json
            // find user in database and update confirmed_email to TRUE
            console.log('User id to confirm: ' + decoded.id)

            User.findByIdAndUpdate(decoded.id ,{email_confirmed:true, active:true}, function(err, result){
                if(err){
                    console.log(err)
                    res.redirect('/')
                }
                else{
                    console.log(result)
                    console.log('Email has now been confirmed')
                    req.session.regenerate(function(err){
                          req.session.success = true
                          req.session.user = user._id
                          res.redirect('/dashboard')

                            })
                }

            })
        }
    })
})





router.get('/reset_password', function(req, res){
    res.render('admin/reset_password',{message:""})
})

router.get('/change_password/:token', function(req, res){
    res.render('admin/change_password',{token:req.params.token,message:""})
})


router.post('/reset_password', function(req, res){

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log(err)}
        else{
            console.log('Found user who forgot their password OK, now sending email')

            // create new token
            var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                         expiresIn: 86400 // expires in 24 hours
                       });

            console.log(token)
            var userToUpdate = new User(user)
            userToUpdate.reset_password_token = token

            userToUpdate.save(function(err, result){
                if(err){

                }
                else{
                    // send email to the user's email address
                    email.sendResetEmail(user.email, token)
                    res.render('/admin/login')
                }

            })
            // set token to the User and save to db

        }
    })

})


router.post('/reset_password/:token', function(req, res){
    console.log("POST reset password")
    var decoded = jwt.verify(req.params.token, process.env.JWT_SECRET )
    console.log(decoded)
    var newPassword = req.body.new_password


    User.findById(decoded.id, function(err, user){
        if(err){console.log(err)}
        else{
            if(user) {


                bcrypt.compare(req.body.password, user.password, function(err, resp) {
                    if(resp) {
                        res.render('/admin/change_password',{message:"New password cannot be the same as a previous one. Please try a different password."})

                    }
                    else{
                        if(req.params.token == user.reset_password_token){

                              console.log('Found user who forgot their password OK')
                              var hashedPassword = bcrypt.hashSync(newPassword, 8);
                              user.password = hashedPassword;
                              user.reset_password_token = null
                              user.save(function(err, result){
                                  console.log('User password updated OK')
                                  res.render('/admin/login')
                              })
                          } else{
                              console.log('Token not valid for or has expired for this user. Not updating password.')
                              res.render('/admin/login',{message:'Token not valid for or has expired for this user. Not updating password.'})

                          }

                      }
                  })
                  }
                  else{
                      console.log('User not found. Not updating password.')
                      res.render('/admin/login',{message:'User not found. Not updating password.'})

                   }
           }




    })


})




module.exports = router;
