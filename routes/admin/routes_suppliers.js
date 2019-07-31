'use strict'

const express = require('express')
const router = express.Router({ mergeParams: true });
var auth = require('../auth/middleware.js')

var Supplier = require('../../models/supplier.js').Supplier

//================================================================
// Suppliers routing area
//================================================================

router.get('/',auth.requiresLogin, function(req, res){
  Supplier.find({})
    .sort({ name : 1})
    .exec( function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
          res.json( { message:"OK", status:"success", data: data} )
      }

  })

})

router.post('/create', auth.requiresLogin, auth.requiresAdmin, function(req, res){
    var supplier = req.body
    console.log(supplier)
    var supplierToSave = new Supplier(supplier)

    supplierToSave.save(function(err, result){
        if(err){
            res.json( { message:"ERR", status:"warning"})
        }
        else{
            res.redirect( "/admin" )
        }
    })



})

router.get('/:id', auth.requiresLogin, auth.requiresAdmin, function(req, res){
  var id = req.params.id
  Supplier.findById( id ,function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
          res.json( { message:"OK", status:"success", data: data} )
      }
  })

})

router.post('/:id/update', auth.requiresLogin, auth.requiresAdmin, function(req, res){
  var supplier = req.body
  var id = req.params.id
  var supplierToUpdate = new Supplier(supplier)

  Supplier.findByIdAndUpdate( id ,function(err, data){
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
  Supplier.findById( id ,function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
        var toCopy = new Supplier(data)
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
  Supplier.findByIdAndDelete( id ,function(err, data){
      if(err){
          res.json( { message:"ERR", status:"warning"})
      }
      else{
          res.json( { message:"OK", status:"success"} )
      }
  })



})




module.exports = router;
