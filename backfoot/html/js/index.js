var axios = require('axios');
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
const { response } = require('express');
const { connect } = require('http2');

var url_db = "mongodb://localhost:27017/"

MongoClient.connect(url_db, function(err,db) {
    assert.equal(null,err);
    console.log("Connected to server");
    //const connect = db.db("footballTest")
    if(db.close())
    console.log("db fermée");
})

var config_leagues = {
  method: 'get',
  url: 'https://v3.football.api-sports.io/standings?league=61&season=2020',
  headers: {
    'x-apisports-key': 'a6f8e98240e4127937a2bfb28e38de11'
  }
};

setInterval( function() {


axios(config_leagues) 
.then(response => response.data.response).then(tab => 
    
    /*console.log(tab);
    var leagues = new Array();
    tab.forEach(element => {
       leagues.push(element); 
    });
    console.log(leagues);*/


 {
    MongoClient.connect(url_db, function(err,db) {
        console.log(tab);
        var dbo = db.db("football");
        dbo.dropDatabase();
        console.log("Connected to server");
        tab.forEach(element => {
            dbo.collection("standings").insertOne(element);    
        });
    })

})
},50000000)