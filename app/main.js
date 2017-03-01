module.exports = function(app) {


	app.get('/logout', function(req, res) {
		res.send("logout called");
	});

	app.get('/profile', function(req, res) {
		res.send('Editting Profile...');
	});

	app.get('/', function(req, res) {
		res.render('index');
	});

	app.get('/index', function(req, res) {
		res.render('index');
	});

	app.get('/water_reports', function(req, res) {
		res.render('water_reports');
	});

	app.get('/historical_reports', function(req, res) {
		res.render('historical_reports');
	});

	app.get('/admin', function(req, res) {
		res.render('admin');
	});

};