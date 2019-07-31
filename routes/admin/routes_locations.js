'use strict'

const express = require('express')
const router = express.Router({ mergeParams: true });
var auth = require('../auth/middleware.js')

var Location = require('../../models/location.js').Location

//================================================================
// Locations routing area
//================================================================

router.get('/',auth.requiresLogin, function(req, res){
  Location.find({})
    .sort({ name : 1})
    .exec(function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
          res.json( { message:"OK", status:"success", data: data} )
      }

  })

})

router.post('/create', auth.requiresLogin, auth.requiresAdmin, function(req, res){
    var location = req.body
    var locationToSave = new Location(location)

    locationToSave.save(function(err, result){
        if(err){
            res.json( { message:"ERR", status:"warning"})
        }
        else{
            res.json( { message:"OK", status:"success"} )
        }
    })



})

router.get('/:id', auth.requiresLogin, auth.requiresAdmin, function(req, res){
  var id = req.params.id
  Location.findById( id ,function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
          res.json( { message:"OK", status:"success", data: data} )
      }
  })

})

router.post('/:id/update', auth.requiresLogin, auth.requiresAdmin, function(req, res){
  var location = req.body
  var id = req.params.id
  var locationToUpdate = new Location(location)

  Location.findByIdAndUpdate( id ,function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
          res.json( { message:"OK", status:"success"} )
      }
  })



})


router.post('/:id/copy', auth.requiresLogin, auth.requiresAdmin, function(req, res){

  var id = req.body.id
  Location.findById( id ,function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
        var toCopy = new Location(data)
        toCopy.save( function(err, data){
            if(err){
                res.json( { message:"ERR", status:"warning"})
            }
            else{
                res.json( { message:"OK", status:"success"} )
            }
        })
      }
  })

})


router.post('/:id/delete', auth.requiresLogin, auth.requiresAdmin, function(req, res){
  var id = req.params.id
  Location.findByIdAndDelete( id ,function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
          res.json( { message:"OK", status:"success"} )
      }
  })



})




module.exports = router;
