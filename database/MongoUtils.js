const MongoClient = require("mongodb").MongoClient;

// Modulo utilizado para la base de datos
function MongoUtils() {
  const mu = {};
  let user=process.env.user,
 password=process.env.password,
 dbName= process.env.dbName;

  mu.getDatabases= ()=>{
    const url = `mongodb+srv://daniella:tacetmars@cluster0-bmsve.mongodb.net/test?retryWrites=true&w=majority`;
    const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning

// Connectgit remote add origin https://github.com/dartm05/exam1.git
 return client.connect()
  .then(client =>
   {   return client
      .db()
      .admin()
      .listDatabases() // Returns a promise that will resolve to the list of databases
      .finally(() => client.close()); 
  });
  };



  mu.getCollections= (dbNam)=>{
    const url = `mongodb+srv://daniella:tacetmars@cluster0-bmsve.mongodb.net/test?retryWrites=true&w=majority`;
    const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning
    
    return client.connect()
      .then(
        client =>{
          return client
            .db(dbNam)
            .listCollections()
            .toArray() // Returns a promise that will resolve to the list of the collections
            .finally(() => client.close());
   });};


  mu.getColdocs= (dbNam,col)=>{
    const url = `mongodb+srv://daniella:tacetmars@cluster0-bmsve.mongodb.net/test?retryWrites=true&w=majority`;
    const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning
    
    return client.connect()
      .then(
        client =>{
          return client
            .db(dbNam)
            .collection(col)
            .find({ })
            .sort({_id:-1})
            .toArray() // Returns a promise that will resolve to the list of the collections
            .finally(() => client.close());
   });
};

   mu.insert= (dbNam, collect,query)=>{
    const url = `mongodb+srv://daniella:tacetmars@cluster0-bmsve.mongodb.net/test?retryWrites=true&w=majority`;
    const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning
    
  client.connect()
      .then(
        client =>{
            return client
            .db(dbNam)
            .collection(collect)
            .insertOne({name: query})
      .finally(() => client.close());
   }); 

};


mu.deleteinfo= (dbName, colName, info) =>
mu.connect().then(client => {
 client.db(dbName).collection(colName).deleteOne({ name: info }).finally(() => client.close());
});

mu.updateinfo = (dbName, collectionName, named, newname) =>
mu.connect().then(client => {
  client.db(dbName).collection(collectionName)
    .updateOne({ name: named }, { $set: { name: newname } })
    .finally(() => client.close());
});



mu.update= (dbNam, collect,query)=>{
    const url = `mongodb+srv://daniella:tacetmars@cluster0-bmsve.mongodb.net/test?retryWrites=true&w=majority`;
    const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning
    
  client.connect()
      .then(
        client =>{
            return client
            .db(dbNam)
            .collection(collect)
            .update(query)
      .finally(() => client.close());
   }); 

};



mu.delete= (dbNam, collect,query)=>{
    const url = `mongodb+srv://daniella:tacetmars@cluster0-bmsve.mongodb.net/test?retryWrites=true&w=majority`;
    const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning
    
  client.connect()
      .then(
        client =>{
            return client
            .db(dbNam)
            .collection(collect)
            .deleteOne(query)
      .finally(() => client.close());
   }); 

};
  return mu;
};


module.exports= MongoUtils();