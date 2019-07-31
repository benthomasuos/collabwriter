'use strict'

const express = require('express')
const router = express.Router({ mergeParams: true });
const bcrypt = require('bcrypt')
var auth = require('./auth/middleware.js')


var Doc = require("../models/doc.js").Doc

        //================================================================
        // Generic routing area
        //================================================================

  router.get('/', function(req, res){ // Home page

    res.render('home')

  })








module.exports =  router
