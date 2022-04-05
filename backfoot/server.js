var express = require('express');
var app = express();
var classApiRoute = require('./classement-api-route');
//support parsing of JSON post data
var jsonParser = express.json({  extended: true}); 
app.use(jsonParser);

// CORS enabled with express/node-js :

app.use(classApiRoute.apiRouter);
//les routes en /html/... seront gérées par express par
//de simples renvois des fichiers statiques
//du répertoire "./html"
app.use('/html', express.static(__dirname+"/html"));
app.get('/', function(req , res ) {
  res.redirect('/html/index.html');
});


let backendPort = process.env.PORT || 8282; 
app.listen(backendPort , function () {
  console.log("http://localhost:"+backendPort);
});