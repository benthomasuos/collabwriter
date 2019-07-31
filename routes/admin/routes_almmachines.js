'use strict'

const express = require('express')
const router = express.Router({ mergeParams: true });
var auth = require('../auth/middleware.js')

var ALMMachine = require('../../models/alm_machine.js').ALMMachine




//================================================================
// PBFMachines routing area
//================================================================

router.get('/',auth.requiresLogin, auth.requiresAdmin, function(req, res){
  ALMMachine.find({}, function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
          res.json( { message:"OK", status:"success", data: data} )
      }

  })

})

router.post('/create', auth.requiresLogin, auth.requiresAdmin, function(req, res){
    var machine = req.body
    var machineToSave = new ALMMachine(machine)

    machineToSave.save(function(err, result){
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
  ALMMachine.findById( id ,function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
          res.json( { message:"OK", status:"success", data: data} )
      }
  })

})

/*
router.post('/:id/update', auth.requiresLogin, auth.requiresAdmin, function(req, res){
  var machine = req.body
  var id = req.params.id
  var machineToUpdate = new ALMMachine(machine)

  ALMMachine.findByIdAndUpdate( id ,function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
          res.json( { message:"OK", status:"success"} )
      }
  })



})
*/





module.exports = router;
