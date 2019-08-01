'use strict'

const jwt = require('jsonwebtoken')
const express = require('express')
var ObjectId = require('mongodb').ObjectID;
const router = express.Router({ mergeParams: true });
var auth = require('../auth/middleware.js')

//================================================================
// Viewer routing area
//================================================================



router.get('/:id', function(req, res){
    res.render('viewer/index',{id:req.params.id})
})




module.exports = router;
