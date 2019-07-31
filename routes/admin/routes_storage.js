'use strict'

const express = require('express')
const router = express.Router({ mergeParams: true });
var auth = require('../auth/middleware.js')

var Storage = require('../../models/storage.js').Storage

//================================================================
// Storages routing area
//================================================================

router.get('/',auth.requiresLogin, auth.requiresAdmin, function(req, res){
  Storage.find({}, function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
          res.json( { message:"OK", status:"success", data: data} )
      }

  })

})

router.post('/create', auth.requiresLogin, auth.requiresAdmin, function(req, res){
    var storage = req.body
    var storageToSave = new Storage(storage)

    storageToSave.save(function(err, result){
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
  Storage.findById( id ,function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
          res.json( { message:"OK", status:"success", data: data} )
      }
  })

})

router.put('/:id', auth.requiresLogin, auth.requiresAdmin, function(req, res){
  var storage = req.body
  var id = req.params.id
  var storageToUpdate = new Storage(storage)

  Storage.findByIdAndUpdate( id ,function(err, data){
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
  Storage.findById( id ,function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
        var toCopy = new Storage(data)
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


router.delete('/:id', auth.requiresLogin, auth.requiresAdmin, function(req, res){
  var id = req.params.id
  Storage.findByIdAndDelete( id ,function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
          res.json( { message:"OK", status:"success"} )
      }
  })



})




module.exports = router;
