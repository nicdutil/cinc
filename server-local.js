var express = require('express'),
    app = express();

app.use(express.logger());

app.set('title', 'CINC Conception Sites Webs Adaptatifs | Minage | Visualisation ');

var oneDay = 86400000;

app.use(express.compress());
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

app.get('/', function(req, res){
    res.sendfile('index.html');
});

var server = app.listen(3000,  function() { 
 console.log(__dirname);
 console.log('Express server started on port %s', process.env.PORT);
});



