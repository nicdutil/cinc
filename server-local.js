var express = require('express'),
    app = express();

app.use(express.logger());

app.set('title', 'CINC Conception Sites Webs | Minage | Visualisation ');

var oneDay = 86400000;

app.use(express.compress());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendfile('index.html');
});

var server = app.listen(process.env.PORT, '192.168.1.6', function() { 
 console.log(__dirname);
 console.log('Express server started on port %s', process.env.PORT);
});



