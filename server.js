var express = require('express'),
    app = express();

app.use(express.logger());

app.set('title', 'InfoCINC | Conception Sites Webs Adaptatifs | Minage | Visualisation ');

var halfHour = 1800000;  // cache control for shared and private caches

app.use(express.compress());
app.all('/welcome_en.html', function(req,res) {
    res.redirect(301, '/welcome.html');
});

app.use(express.static(__dirname + '/public', { maxAge: halfHour }));


app.all('/', function(req, res){
	res.setHeader('Cache-Control','public, max-age=' + (halfHour / 1000));	
    res.sendfile('index.html');
});



app.use(function(req,res) {
    res.status(404);
    res.render('404.jade', {title_en: 'File Not Found', title_fr: 'Page non trouvée '});
});
app.use(function(error,req,res,next) {
    res.status(500);
    res.render('500.jade', {title:'500: Internal Server Error', error: error});
});


var server = app.listen(process.env.PORT, function() { 
 console.log(__dirname);
 console.log('Express server started on port %s', process.env.PORT);
});



