'use strict'

const jwt = require('jsonwebtoken')
const express = require('express')
var ObjectId = require('mongodb').ObjectID;
const router = express.Router({ mergeParams: true });
var auth = require('../auth/middleware.js')

var Template = require("../../models/template.js").Template
var User = require("../../models/user.js").User


//================================================================
// Templates routing area
//================================================================


router.get('/', function(req, res){

   console.log(query)

    Template.find(query)
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
    console.log("Adding new doc " + req.body.title)
    var doc = req.body

    //doc.createdBy = res.locals.user._id
    //doc.modifiedBy = res.locals.user._id

    var docToSave = new Doc(doc)

  Doc.findOne({tile: doc.title}, function(err, result){
      console.log(err, result)
      if(err){
          console.log(err)
          console.log("Couldn't create a new document ")
          res.json({message: "A document with this title already exists", status:"warning"})
        }

        if(!result) {
            console.log("I have not found a document with this same title so I can add a new one")
            docToSave.save( function(err, result){
                if(err){
                    console.log(err)
                    console.log("Couldn't create a new document")
                    res.json({message: err, status:"warning"})
                  } else {
                    console.log("Result:" + result)
                    res.redirect('/docs/'+result._id+'/edit')
                  }
                })


        }
        else{


          console.log("I found a prexisting test with this batch so this one cannot be added to the database", result)
          res.json({message: "A FAST run with this batch number already exists. Please edit the existing test or create a new one with a different Batch ID", status:"warning"})
      }
    })



})



router.get('/:id', function(req, res){

        Doc.findOne({ _id: req.params.id })
            .populate('references')
            .populate('figures')
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






router.get('/:id/edit', function(req, res){
    console.log(req.params)
    res.render('docs/edit',{id: req.params.id})
})




module.exports = router;
