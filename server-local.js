var express = require('express'),
    app = express();
var compressor = require('node-minify');


/*new compressor.minify({
	type: 'yui-js',
	fileIn: ['public/js/vendor/scrollTo.min.js','public/js/vendor/waypoints.min.js',
			 'public/js/vendor/imagesloaded.pkgd.min.js','public/js/vendor/jquery.scrolldepth.min.js'],
	fileOut: 'public/js-dist/base-min-yui.js',
	callback: function(err,min) {
		console.log(err);
	}
});
*/
new compressor.minify({
	type: 'gcc',
	fileIn: ['public/js/vendor/jquery.easing.1.3.js','public/js/vendor/bootstrap.js',
			 'public/js/common.js','public/js/vendor/scrollTo.js','public/js/vendor/waypoints.js',
			 'public/js/vendor/imagesloaded.pkgd.js','public/js/vendor/jquery.scrolldepth.js',
			 'public/js/drops.js', 'public/js/tablet.js','public/js/init.js'],
	fileOut: 'public/js-dist/base-min.js',
	callback: function(err,min) {
		console.log(err);
	}
});
new compressor.minify({
	type: 'clean-css',
	fileIn: ['public/css/bootstrap.css','public/css/main.css'],
	fileOut: 'public/css/base-min.css',
	callback: function(err,min) {
		console.log(err);
	}
});

app.use(express.logger());

app.set('title', 'Infocinc | Création Sites Webs | Minage | Visualisation ');

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



