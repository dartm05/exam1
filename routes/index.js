var express = require('express');
var router = express.Router();
const mongo= require("../database/MongoUtils.js");

/* GET home page. */
router.get('/', function(req, res, next) {
 mongo.getDatabases().then(databases=>{
   res.render("index", {databases})
 });
});

module.exports = router;
