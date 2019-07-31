'use strict'

const path = require('path')
const ExifImage = require('exif').ExifImage;
var ObjectId = require('mongodb').ObjectID;
const Media = require('../models/media.js').Media
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
var uuid = require('uuid')
const sharp = require('sharp')


const s3Bucket = process.env.DO_S3BUCKET
const endPoint = process.env.DO_ENDPOINT


const spacesEndpoint = new aws.Endpoint(endPoint);
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});






const fileFilter = function (req, uploadFile, cb) {
    console.log("Uploads.js. req.body", req.body)
    console.log("File to upload: ", uploadFile)
    if (!uploadFile.originalname.toLowerCase().match(/\.(tif|tiff|jpg|jpeg|png|gif|mp4|mpeg|mpg|wav|webm|mp3|txt|csv|tsv|pdf|stl|obj|mus)$/)) {
          return cb(new Error('Incorrect file type uploaded!'), false);
      }
      else{
        cb(null, true)
    }
};





exports.destination = "https://" + s3Bucket + "." + endPoint + "/"


exports.upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: s3Bucket,
    acl: 'public-read',
    cacheControl: 'max-age=3600',
    serverSideEncryption: 'SHA256',
    //metadata: function (req, file, cb) {
    //      cb(null, {fieldName: file.fieldname});
     //},
    key: function (req, file, cb) {
        console.log(req.body)
        if(req.body.file_folder){
          console.log('Saving file into folder')
          var key = req.body.file_folder + "/"+ file.originalname
        }
        else{
          var key = file.originalname
        }

       cb(null, key)
     },
    shouldTransform: function (req, file, cb) {
      cb(null, /^image/i.test(file.mimetype))
    },
    transforms: [{
      id: 'original',
      key: function (req, file, cb) {
          var filename = file.originalname.split('.')[0] + "-original." + file.originalname.split('.')[1]
          console.log("Original filename = " + filename)
          cb(null, filename )
      },
      transform: function (req, file, cb) {
        cb(null, sharp().jpeg())
      }
    }, {
      id: 'thumbnail',
      key: function (req, file, cb) {
        var filename = file.originalname.split('.')[0] + "-thumbnail." + file.originalname.split('.')[1]
        console.log("thumbnail filename = " + filename)
        cb(null, filename )
      },
      transform: function (req, file, cb) {
        console.log("Transformed thumbnail")
        cb(null, sharp().resize(200, 200).png())
      }
    }]
  }),
  fileFilter: fileFilter
});







module.exports = exports;
