var express = require('express'),
    app = express();

app.use(express.logger());


app.set('title', 'Docteur Quantum - Votre specialiste des sciences et technologies');


app.get('/', function(req, res){
    res.sendfile('index.html');
});

app.use(express.static(__dirname + '/public'));


var server = app.listen(process.env.PORT, '192.168.1.6', function() { 
 console.log(__dirname);
 console.log('Express server started on port %s', process.env.PORT);
});



