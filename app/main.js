module.exports = function(app, passport) {


  var mysql      = require('mysql'),
      dbconfig   = require('../config/database'),
      connection = mysql.createConnection(dbconfig.connection),
      ensureLog  = require('connect-ensure-login').ensureLoggedIn(),
      env        = require('node-env-file');

	env('./config/variables.env');
	connection.query('USE ' + dbconfig.database);


	app.get('/callback',
	  passport.authenticate('auth0Strategy', { 
	    failureRedirect: '/login',
	    successRedirect: '/index',
	  }),
	 function(req, res) {
	    if (req.body.remember) {
	        req.session.cookie.maxAge = 1000 * 60 * 20; //20 minutes
	    } else {
	        req.session.cookie.expires = false;
	    }
	    res.redirect(req.session.returnTo || '/index');
	  });
	  
	  app.get('/login', function(req, res){
	    res.render('login', {callback: process.env.callbackURL});
	  });

	  
	  //End of New Code


	  app.get('/', function(req, res) {
		    res.render('login', {callback: process.env.callbackURL});
	  });

	  //login, logout, and sign up routes
	  app.get('/logout', function(req, res) {
	    req.logout();
	    res.redirect('/');
	  });



	app.get('/profile', ensureLog, function(req, res) {
		res.render('profile');
	});


	app.get('/index', ensureLog, function(req, res) {
		res.render('index');
	});

	app.get('/water_reports', ensureLog, function(req, res) {
		res.render('water_reports');
	});

	app.get('/historical_reports', ensureLog, function(req, res) {
		res.render('historical_reports');
	});

	app.get('/admin', ensureLog, function(req, res) {
		res.render('admin');
	});

};
