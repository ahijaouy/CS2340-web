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
		connection.query('SELECT * from source_reports;', function(err, rows){
			res.render('water_reports', {reports: rows});
		});
		
	});

	app.post('/newSourceReport', ensureLog, function(req, res) {
		res.redirect('/water_reports');
		console.log(req.body.location);
	    stmt = 'INSERT INTO source_reports (location,water_type,water_condition,date_modified, user_modified) VALUES (?,?,?,?,?);';
	    connection.query(stmt,[req.body.location,req.body.watertype,req.body.watercondition, new Date(),'Username'], function(err, rows){ 
	    	//console.log(err);
	    });
	});

	app.get('/historical_reports', ensureLog, function(req, res) {
		res.render('historical_reports');
	});

	app.get('/admin', ensureLog, function(req, res) {
		res.render('admin');
	});

};
