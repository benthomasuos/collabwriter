'use strict'

const jwt = require('jsonwebtoken')
const express = require('express')
var ObjectId = require('mongodb').ObjectID;
const router = express.Router({ mergeParams: true });
var auth = require('../auth/middleware.js')

var Doc = require("../../models/doc.js").Doc
var Reference = require("../../models/reference.js").Reference
var Figure = require("../../models/figure.js").Figure
var User = require("../../models/user.js").User

var upload = require('../uploads.js').upload

//================================================================
// FAST routing area
//================================================================


router.get('/', function(req, res){

  var query = req.query
  console.log(req.query)

  var page = +req.query.page || 1
  var limit = +req.query.limit || 1000

  delete(query.page)
  delete(query.limit)
  delete(query.sortby)
  delete(query.sortdir)


  if(req.query.ids){
      query._idc = {$in:req.query.ids}
  }

  var sort = {}

  sort[req.query.sortby || 'createdAt'] = +req.query.sortdir || -1



   console.log(query)

    Doc.find(query)
    .skip(( page - 1 ) * limit)
    .limit(limit)
    .populate('references')
    .populate('figures')
    .sort( sort )
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
