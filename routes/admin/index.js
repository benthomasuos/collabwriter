const express = require('express')
const router = express.Router({ mergeParams: true });

var auth = require('../auth/middleware.js')

//================================================================
// Generic routing area
//================================================================

router.get('/', auth.requiresLogin, auth.requiresAdmin, function(req, res){ // Home page
            res.render('admin/admin')
})

router.get('/*', auth.requiresLogin, auth.requiresAdmin, function(req, res){

    res.render('admin/template',{data:data})

})






module.exports =  router
