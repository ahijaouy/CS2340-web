module.exports = function(app, passport) {


  var mysql      = require('mysql'),
      dbconfig   = require('../config/database'),
      connection = mysql.createConnection(dbconfig.connection),
      ensureLog  = require('connect-ensure-login').ensureLoggedIn(),
      env        = require('node-env-file'),
      request    = require('request');

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
    connection.query('SELECT * from source_reports;', function(err, rows) {
      console.log(err);
      res.render('index', {reports: rows});
    });
    
  });

  app.get('/water_reports', ensureLog, function(req, res) {
    connection.query('SELECT * from source_reports;', function(err, rows){
      connection.query('SELECT * from purity_reports INNER JOIN source_reports on purity_reports.source_id=source_reports.source_report_id;', function(err, purity) {
        res.render('water_reports', {reports: rows, purityreports:purity});
      })
      
    });
    
  });

  app.post('/newSourceReport', ensureLog, function(req, res) {
    res.redirect('/water_reports');
      stmt = 'INSERT INTO source_reports (longitude, latitude, water_type,water_condition,date_modified, user_modified) VALUES (?,?,?,?,?,?);';
      connection.query(stmt,[req.body.longitude, req.body.latitude,req.body.water_type,req.body.water_condition, new Date(),'Username'], function(err, rows){ 
        console.log(err);
      });
  });

  app.get('/source_reports/:id/edit', ensureLog, function(req, res) {
    var stmt = 'SELECT * from source_reports WHERE source_report_id=' + req.params.id;
    connection.query(stmt, function(err, rows) {
      if (err) {console.log(err)};
      res.render('edit_source_report', {report: rows[0]});
    });
  });

  app.get('/source_reports/:id/delete', ensureLog, function(req, res) {
    var stmt = 'DELETE from source_reports WHERE source_report_id=' + req.params.id;
    var stmt2 = 'DELETE from purity_reports WHERE source_id=' + req.params.id;
    connection.query(stmt2, function(err2, rows2) {
      if (err2) {console.log(err2)};
      connection.query(stmt, function(err, rows) {
        if (err) {console.log(err)};
        res.redirect('/water_reports');
      });
    });
    
  });

  app.post('/source_reports/:id/edit', ensureLog, function(req, res) {
    res.redirect('/water_reports');
    var stmt = 'UPDATE source_reports SET longitude=?, latitude=?, water_type=?, water_condition=?, date_modified=?, user_modified=? WHERE source_report_id=' + req.params.id + ';';
    connection.query(stmt, [req.body.longitude, req.body.latitude,req.body.water_type,req.body.water_condition, new Date(),'Username'], function(err, rows) {
      if (err) {console.log(err)};
      
    });
  });

    app.get('/purity_reports/:id/edit', ensureLog, function(req, res) {
    var stmt = 'SELECT * from purity_reports WHERE purity_report_id=' + req.params.id;
    var stmt2 = 'SELECT source_report_id FROM source_reports;';
    connection.query(stmt2, function(err2, rows2) {
      if (err2) {console.log(err2)};
      connection.query(stmt, function(err, rows) {
        if (err) {console.log(err)};
        res.render('edit_purity_report', {report: rows[0], reports: rows2});
      });
    });
    
  });

  app.get('/purity_reports/:id/delete', ensureLog, function(req, res) {
    var stmt = 'DELETE from purity_reports WHERE purity_report_id=' + req.params.id;
    connection.query(stmt, function(err, rows) {
      if (err) {console.log(err)};
      res.redirect('/water_reports');
    });
  });

  app.post('/purity_reports/:id/edit', ensureLog, function(req, res) {
    res.redirect('/water_reports');
    var stmt = 'UPDATE purity_reports SET source_id=?, overall_condition=?, virus_ppm=?, contaminant_ppm=?, date_modified=?, user_modified=? WHERE purity_report_id=' + req.params.id + ';';
    connection.query(stmt, [req.body.source_id, req.body.overall_condition,req.body.virus_ppm,req.body.contaminant_ppm, new Date(),'Username'], function(err, rows) {
      if (err) {console.log(err)};
      
    });
  });

  app.post('/newPurityReport', ensureLog, function(req, res) {
    res.redirect('/water_reports');
    stmt = 'INSERT INTO purity_reports (source_id, overall_condition, virus_ppm, contaminant_ppm, date_modified, user_modified) VALUES (?,?,?,?,?,?);';
      connection.query(stmt,[req.body.source_id,req.body.overall_condition,req.body.virus_ppm, req.body.contaminant_ppm, new Date(),'Username'], function(err, rows){ 
        console.log(err);
      });
  });

  app.get('/historical_reports', ensureLog, function(req, res) {

    res.render('historical_reports');
  });

  app.get('/admin', ensureLog, function(req, res) {
    // callAuth0("get", "users", function(response) {
    //   console.log(response);
    // });
   
    res.render('admin');
  });

  var generateToken = function(callback) {
    //Auth0 API Access Code
    var options = { method: 'Post',
      url: 'https://ngmatl.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: 
       { grant_type: 'client_credentials',
         client_id: 'T4zfzFLTpefPOzcusSDe5pNckdtqs33D',
         client_secret: 'Tvdhw9Icvz-fEyMYq7z2yKOU3SmFDnv1W1YKUDwUomrj3vhCOL6xLaiGHbBhGQGt',
         audience: 'https://ngmatl.auth0.com/api/v2/' },
      json: true };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      callback(body.access_token);
    });
  };
  var callAuth0 = function(requestMethod, requestUrl, callback) {
    var url = "https://ngmatl.auth0.com/api/v2/";
    
    generateToken(function(token) {
      var options = { 
        method: requestMethod,
        url: url + requestUrl,
            headers: 
           { authorization: 'Bearer ' + token,
             'content-type': 'application/json' } };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        callback(body);
      });
    });
  };

};
