 "use strict";
//================================================================
// Require modules
//================================================================
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const express = require('express');
const mongo = require('express-mongo-db');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const favicon = require('express-favicon');
const app = express();
const mongo_url = "mongodb://127.0.0.1:27017/writer"
//console.log("MONGO_URL: " + mongo_url)
// TODO differentiate between development and production options
mongoose.connect(mongo_url , { useNewUrlParser: true } )
var db = mongoose.connection


app.use(mongo( mongo_url ));

const port = process.env.PORT || 8000;
const router = require('express').Router();
const cookieParser = require('cookie-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected now start the server
   app.listen(port, function(){
       console.log("Server started and listening on port " + port )
   })

});



app.use(cookieParser())
app.use(session({
    name: 'writer',
    secret: process.env.MONGO_SESSION_SECRET,
    store: new MongoStore({url:  mongo_url }),
    ttl: (24 * 60 * 60) // 24hrs validity

}));

//================================================================
//  Express server setup code
//================================================================
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended: true} ) );
app.use(express.static("static"));
app.use(favicon( __dirname + '/static/images/star_icon.png'));
app.set('view engine', 'ejs');


app.use( '/', require('./routes') )
app.use( '/account', require('./routes/user') )
app.use( '/docs', require('./routes/docs') )

app.use(helmet())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if (req.method === 'Options') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
    return res.status(200).json({});
  }
});


//================================================================
// Error routing area
//================================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(req, res, next) {
  next(createError(401));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  console.log(err)
  res.status(401).render('errors/401');
});

app.use(function(err, req, res, next) {
  // render the error page
  console.log(err)
  res.status(404).render('errors/404');
});

//================================================================
// START the server
//================================================================
/*
app.listen(port, function(){
  console.log("Server started and listening on port " + port )
})
*/
