var express = require('express'),
    app = express();

app.use(express.logger());


app.set('title', 'Docteur Quantum - Votre specialiste des sciences et technologies');


app.get('/', function(req, res){
    res.sendfile('503.html');
});

app.use(express.static(__dirname + '/public'));


var server = app.listen(process.env.PORT, function() { 
 console.log(__dirname);
 console.log('Express server started on port %s', process.env.PORT);
});



