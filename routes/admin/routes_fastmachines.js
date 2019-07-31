'use strict'

const express = require('express')
const router = express.Router({ mergeParams: true });
var auth = require('../auth/middleware.js')

var FASTMachine = require('../../models/fast_machine.js').FASTMachine

//================================================================
// FASTMachines routing area
//================================================================

router.get('/',auth.requiresLogin, function(req, res){
  FASTMachine.find({}, function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
          res.json( { message:"OK", status:"success", data: data} )
      }

  })

})

router.post('/create', auth.requiresLogin, auth.requiresAdmin, function(req, res){
    var fast_machine = req.body
    var fast_machineToSave = new FASTMachine(fast_machine)

    fast_machineToSave.save(function(err, result){
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
  FASTMachine.findById( id ,function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
          res.json( { message:"OK", status:"success", data: data} )
      }
  })

})

router.post('/:id/update', auth.requiresLogin, auth.requiresAdmin, function(req, res){
  var fast_machine = req.body
  var id = req.params.id
  var fast_machineToUpdate = new FASTMachine(fast_machine)

  FASTMachine.findByIdAndUpdate( id ,function(err, data){
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
  FASTMachine.findById( id ,function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
        var toCopy = new FASTMachine(data)
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
  FASTMachine.findByIdAndDelete( id ,function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
          res.json( { message:"OK", status:"success"} )
      }
  })



})




module.exports = router;
