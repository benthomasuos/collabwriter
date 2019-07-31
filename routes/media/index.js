'use strict'

const express = require('express')
const path = require('path')
const ExifImage = require('exif').ExifImage;
var ObjectId = require('mongodb').ObjectID;
const auth = require('../auth/middleware.js')
const async = require('async')
const Media = require('../../models/media.js').Media
var uuid = require('uuid')




var upload = require('../uploads.js').upload




const router = express.Router({ mergeParams: true });
const fs = require('fs')
var gm = require('gm')



//===============================================================
// Uploads routing area
//================================================================

router.get('/home', auth.requiresLogin, function(req, res){
    res.render('media/media')
})



router.get('/', auth.requiresLogin, function(req, res){
  console.log(req.body, req.query)
  console.log("Media query:", req.query)
  var query = {}
  if(req.query.id){
      query._id = { $in : req.query.id }
  }
  if(req.query.category ){
      query.category = { $in : req.query.category }
  }
  if(req.query.type){
      query.type = { $in : req.query.type }
  }

  if(Object.keys(query).length > 0 ){
          Media.find( query ,function(err, media){
            if(err){
              res.json(err)
            }
            else{
              console.log("Found : " + media.length)
              res.json({message:'Found ' + media.length + ' items of media', data: media})
            }
          })

    }
    else{
        res.json({message:'Empty query is invalid', data: ""})
    }
})


// TODO combine all uploads into one function and split them up based on the file type.
// TODO make a check to see if the uploader is a logged in user and reject the upload if not

router.post('/', auth.requiresLogin,  function(req, res){
    console.log('Upload initiated')

    upload.array('upload')(req, res, function (error) {
          if (error) {
            console.log(error);
            return res.json({message:'Upload failed! ' + error, status: 'error'});

          }
            console.log('Files uploaded successfully.');
            var uploadStatus = [] // Store statuses on the file uploads
            var savedFiles = [] // Store statuses on the file uploads
            console.log('Files now saving to DB');

            async.each(req.files, function(thisFile, callback){

              console.log("Saving file " + thisFile.originalname)

              Media.findOneAndUpdate({originalname: thisFile.originalname}, thisFile, { upsert: true, new: true } , function(err, file){
                if(err){
                  console.log("Error when trying to find existing file")
                  uploadStatus.push = thisFile.originalname + " saved failed"
                  cb(new Error('File cannot be found in the database!'), false);
                }
                else {
                  console.log(file)
                  console.log( file.originalname + ' saved to DB successfully.')
                  uploadStatus.push(thisFile.originalname + " saved successfully")
                  savedFiles.push({ id: file._id, filename: file.originalname, status: "Overwritten previous file" })
                  callback()


                }

              })

            }, function(err){
              if(err){
                return res.json({message:'Upload failed! ' + error, status: 'error'});
              }
              else{
                console.log(uploadStatus, savedFiles)
                return res.json({message: uploadStatus , status: 'success', data: savedFiles});;
              }
            })


        })

});


module.exports = router;
