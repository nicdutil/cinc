var express = require('express'),
    app = express(),
    mailer = require('express-mailer'),
    compressor = require('node-minify');

var oneDay = 86400000;

/////////////////////////////////////////////////////////////////////////////////////////
// CONFIG
/////////////////////////////////////////////////////////////////////////////////////////

app.set('title', 'Infocinc | Création Sites Webs | Minage | Visualisation ');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


app.configure(function() {
    app.use(express.logger());
    app.use(express.compress());
    app.use(express.bodyParser());
    mailer.extend(app, {
        from: 'ndutil79@gmail.com',
        host: 'smtp.gmail.com',
        secureConnection: true,
        port: 465,
        transportMethod: 'SMTP',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    });
});

//////////////////////////////////////////////////////////////////////////////////////////
// UTILITIES
//////////////////////////////////////////////////////////////////////////////////////////
function formProcessor(req, res, formName, file) {
    app.mailer.send('email', {
            from: 'ndutil79@gmail.com',
            to: 'info@infocinc.com',
            subject: "FW: Site Web : " + formName + ' : ' + req.body.user.fullname,
            user: req.body.user
        },
        function(err,message) {

            if (err) {
                console.log('Sending Mail Failed!');
                console.log(err);
                return;
            };
         res.sendfile(__dirname + '/public/' + file);
        }
    );
}


var server = app.listen(process.env.PORT, function() { 
 console.log(__dirname);
 console.log('Express server started on port %s', process.env.PORT);
});


app.all('/welcome_en.html', function(req,res) {
    res.redirect(301, '/welcome.html');
});

app.use(express.static(__dirname + '/public', { maxAge: halfHour }));


app.all('/', function(req, res){
	res.setHeader('Cache-Control','public, max-age=' + (halfHour / 1000));	
    res.sendfile('index.html');
});


app.post('/contact.html', function(req,res) {
    formProcessor(req,res, "formulaire de contact","contact_success.html");
});

app.use(function(req,res) {
    res.status(404);
    res.render('404.jade', {title_en: 'File Not Found', title_fr: 'Page non trouvée '});
});
app.use(function(error,req,res,next) {
    res.status(500);
    res.render('500.jade', {title:'500: Internal Server Error', error: error});
});





