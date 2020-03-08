var express = require('express');
var router = express.Router();
var mongo= require("../database/MongoUtils.js");

/* GET home page. */
router.get('/databases', function(req, res, next) {
  console.log("aqui", mongo);
  
 mongo.getDatabases().then(dbs => {
   res.render("index", {databases: dbs.databases});
 });
});

router.get('/collections/:dbname', function(req, res, next) {
  console.log(req.params);
  
  const dbname= req.params.dbname;
  console.log(dbname);
  
  mongo.getCollections(dbname).then(collections=>{
    console.log("colecciones", collections);
    
    res.json(collections);
  });
 });

 router.post("/databases/addCollection", function(req, res) {
  console.log(req.body);
  const dbname= req.body.dbname;
  const colname= req.body.collection;
  mongo.insert(dbname, colname, req.body.name);
  res.redirect("/databases");
});

router.post("/databases/deleteCollection", (req, res) => {
  const dbName = req.body.dbName;
  const colName = req.body.colName;
  mongo.deleteCollectionData(dbName, colName, req.body.name).then(res.redirect("/"));
});

router.put("/databases/updateCollection", (req, res) => {
  const dbName = req.body.dbName;
  const colName = req.body.colName;
  mongo.updateinfo(dbName,colName,req.body.oldName,req.body.newName)
  .then(res.redirect("/"));
});

 router.get('/docs/:dbname/:collection', function(req, res, next) {
  
  const dbname= req.params.dbname;
  const col= req.params.collection;
  console.log(req.params.dbname);
  
  mongo.getColdocs(dbname,col).then(docs =>
    {
      res.json(docs);
    });
 });

 router.post('/:database/:collection/addDocument', function(req, res, next) {
  const db= req.body.dbname;
  const collection= req.body.collection;
  var item={
   id:req.body.id,
   name: req.body.name
  }
  mongo.add(db,collection,item);
 });

 router.get('/remove/:id', function(req, res, next) {
  const db= req.body.dbname;
  const collection= req.body.collection;
  const id= req.body._id;
  const query = { _id: mongo.ObjectId(id.id) };
  console.log(query);
  console.log(db);
  console.log(collection);
  console.log(id);
  
  
  mongo.delete(db,collection,query);
 });
module.exports = router;
