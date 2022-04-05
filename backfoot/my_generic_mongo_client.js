//myGenericMongoClient module (with MongoDB/MongoClient)
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var assert = require('assert');

var mongoDbUrl = 'mongodb://127.0.0.1:27017/football'; //by default
var dbName = "football" //by default
var currentDb=null; //current MongoDB connection


var setMongoDbUrl = function(dbUrl){
	mongoDbUrl = dbUrl;
}

var setMongoDbName = function(mongoDbName){
	dbName = mongoDbName;
}

var closeCurrentMongoDBConnection = function(){
	currentDb.close();
	currentDb=null;
}

var executeInMongoDbConnection = function(callback_with_db) {
    if(currentDb==null){
      MongoClient.connect(mongoDbUrl, function(err, db) {
      if(err!=null) {
          console.log("mongoDb connection error = " + err + " for dbUrl=" + mongoDbUrl );
      }
      assert.equal(null, err);
      console.log("Connected correctly to mongodb database" );
      //currentDb = db; //with mongodb client v2.x
      currentDb = db.db(dbName);//with mongodb client >= v3.x
      callback_with_db(currentDb);
      });
    }else{
      callback_with_db(currentDb);  
    }
  }


  var genericFindList = function(collectionName,query,callback_with_err_and_array) {
	executeInMongoDbConnection( function(db) {
		var cursor = db.collection(collectionName).find(query);
		cursor.toArray(function(err, arr) {
			callback_with_err_and_array(err,arr);
		});
   });
};

var genericFindOne = function(collectionName,query, callback_with_err_and_item) {
	executeInMongoDbConnection( function(db) {
		db.collection(collectionName).findOne(query , function(err, item) {
			if(err!=null) {
				console.log("genericFindById error = " + err);
		}
		//assert.equal(null, err);
		callback_with_err_and_item(err,item);
		});
    });
};

exports.genericFindList = genericFindList;
exports.genericFindOne = genericFindOne;
exports.setMongoDbName = setMongoDbName;
exports.executeInMongoDbConnection = executeInMongoDbConnection;
exports.setMongoDbUrl = setMongoDbUrl;
exports.closeCurrentMongoDBConnection = closeCurrentMongoDBConnection;
