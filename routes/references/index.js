'use strict'

const jwt = require('jsonwebtoken')
const express = require('express')
var ObjectId = require('mongodb').ObjectID;
const router = express.Router({ mergeParams: true });
var auth = require('../auth/middleware.js')

var Reference = require("../../models/reference.js").Reference
var User = require("../../models/user.js").User

var upload = require('../uploads.js').upload

//================================================================
// References routing area
//================================================================


router.get('/', function(req, res){

    Figures.find(query)
    .exec(function(err, docs){
        if(err){
            res.json( { message: err , status:"warning"})
        }
        else{
            console.log("Got " + docs.length )
            res.json( { message:"Found " + docs.length + " documents in the database", status:"success", data: docs})
        }
    })


}).post('/', function(req, res){

    //doc.createdBy = res.locals.user._id
    //doc.modifiedBy = res.locals.user._id

    var refToSave = new Reference(ref)

            refToSave.save( function(err, ref){
                if(err){
                    console.log(err)
                    console.log("Couldn't create a new refernce")
                    res.json({message: err, status:"warning"})
                  } else {
                    console.log("Result:" + ref)
                    res.json({data:ref})
                  }
                })


})



router.get('/:id', function(req, res){

        Figure.findOne({ _id: req.params.id })
            .exec(function(err, doc){
                if(err){
                    console.log(err)
                    res.json( { message:"ERR", status:"warning"})
                }
                else{
                    console.log("Found doc: ", doc.title)
                    res.json( { message:"Found document in the database", status:"success", data: doc})

                }

        })
}).put('/:id', function(req, res){

    var doc = req.body

    //test.modifiedBy = res.locals.user._id

    console.log("Document to save: " , doc)

    Doc.updateOne({_id: req.params.id }, { $set: doc } ,function (err, result) {
          if (err) {
            console.log("Error: " + err)
            console.log("Couldn't update documents due to an error")
            res.json({message: err, status:"warning"})
          }
          else {
                  console.log("Result of successful update", result)
                  console.log("Updated test successfully!")
                  res.json({message:"Updated document successfully", status:"success"})
          }
        })


})



module.exports = router;
