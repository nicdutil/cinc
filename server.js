var express = require('express'),
    app = express();

app.use(express.logger());

app.set('title', 'InfoCINC | Conception Sites Webs Adaptatifs | Minage | Visualisation ');

var halfHour = 1800000;

app.use(express.compress());
app.use(express.static(__dirname + '/public', { maxAge: halfHour }));

app.get('/', function(req, res){
    res.sendfile('index.html');
});

var server = app.listen(process.env.PORT, function() { 
 console.log(__dirname);
 console.log('Express server started on port %s', process.env.PORT);
});



