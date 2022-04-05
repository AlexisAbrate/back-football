var myGenericMongoClient = require('./my_generic_mongo_client');





function returnClassement(standing) {
    return standing;
}



function findClassementBySeasonAndYear(season,year) {

    return new Promise((resolve,reject)=>{
        myGenericMongoClient.genericFindOne('standings',
            {'league.season' : 2020 , 'name' : "Ligue 1"},
            function(err,season,year){
                if(err || standing==null)
                    reject('not found')
                else
                    resolve(returnClassement(standing));
            })
    })
}

module.exports.findClassementBySeasonAndYear = findClassementBySeasonAndYear;