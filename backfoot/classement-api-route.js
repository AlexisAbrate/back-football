var express = require('express');
const apiRouter = express.Router();

var myGenericMongoClient = require('./my_generic_mongo_client');
var classement_dao_mongo = require('./classement_dao_mongo');

var myMongoDbUrl = "mongodb://127.0.0.1:27017/football"
console.log("myMongoDbUrl="+myMongoDbUrl)
myGenericMongoClient.setMongoDbUrl(myMongoDbUrl);

/*apiRouter.route('/classement/:season/:league')
.get( function(req,res,next) {
    var season = req.params.season;
    console.log(season);
    var league = req.params.league;
    console.log(league);

    myGenericMongoClient.genericFindList('standings',
    {'league.season' : season , 'league.id' : league},
    function(err,standing){
        if(standing==null)
            res.status(404).send({ err : 'noleague found'})
        else
            res.send(standing);
    })
}

);*/


apiRouter.route('/classement/:season/:league')
.get( function(req,res,next) {
    var season = Number(req.params.season);
    console.log(season);
    var league = Number(req.params.league);
    console.log(league);

    myGenericMongoClient.genericFindOne('standings',
    {'league.season' : season , 'league.id' : league},
    function(err,standings){
            console.log(standings)
            res.send(standings);
    })
}

);


exports.apiRouter = apiRouter;