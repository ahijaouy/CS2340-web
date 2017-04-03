var express 	= require('express'),
	router 		= express.Router(),
	mysql       = require('mysql'),
	dbconfig	= require('../config/database'),
	connection = mysql.createConnection(dbconfig.connection);

	connection.query('USE ' + dbconfig.database);


// router.param('user_id', function(req, res, next, id) {
//   // sample user, would actually fetch from DB, etc...
//   req.user = {
//     id: id,
//     name: 'TJ'
//   };
//   next();
// });

// router.route('/source_reports')
// 	.all(function(req, res, next) {
// 	  // runs for all HTTP verbs first
// 	  // think of it as route specific middleware!
// 	  next();
// 	})
// 	.get(function(req, res, next) {
// 		connection.query('SELECT * from source_reports;', function(err, rows){
// 			res.send(rows);
// 		});
// 	})
// 	.put(function(req, res, next) {
// 	  // just an example of maybe updating the user
// 	  res.send('put requested');
// 	})
// 	.post(function(req, res, next) {
// 	  res.send('post requested');
// 	})
// 	.delete(function(req, res, next) {
// 	  res.send('delete requested');
// });

//Source Reports
router.route('/source_reports')
	.get(function(req, res, next) {
		connection.query('SELECT * from source_reports;', function(err, rows){
			res.send(rows);
		});
	})
	.post(function(req, res, next) {
		stmt = 'INSERT INTO source_reports (longitude, latitude,water_type,water_condition,date_modified, user_modified) VALUES (?,?,?,?,?,?);';
	    connection.query(stmt,[req.body.longitude, req.body.latitude,req.body.water_type,req.body.water_condition, req.body.date_modified,req.body.user_modified], function(err, rows){ 
	    	res.send(rows);
	    });
	});

//purity reports
router.route('/purity_reports')
	.get(function(req, res, next) {
		connection.query('SELECT * from purity_reports;', function(err, rows){
			res.send(rows);
		});
	})
	.post(function(req, res, next) {
		stmt = 'INSERT INTO purity_reports (source_id, overall_condition, virus_ppm, contaminant_ppm, date_modified, user_modified) VALUES (?,?,?,?,?,?);';
	    connection.query(stmt,[req.body.source_id,req.body.overall_condition,req.body.virus_ppm, req.body.contaminant_ppm, req.body.date_modified,req.body.user_modified], function(err, rows){ 
	    	//console.log(err);
	    });
	});

//specific purity reports
router.route('/purity_reports/:id')
	.get(function(req, res, next) {
		connection.query('SELECT * from purity_reports where purity_report_id=' + req.params.id + ";", function(err, rows){
			res.send(rows);
		});
	})
	.delete(function(req, res, next) {
		connection.query('DELETE from purity_reports where purity_report_id=' + req.params.id + ';', function(err, rows) {
			res.send(rows);
		});
		
	});

//specific source reports
router.route('/source_reports/:id')
	.get(function(req, res, next) {
		connection.query('SELECT * from source_reports where source_report_id=' + req.params.id + ";", function(err, rows){
			res.send(rows);
		});
	})
	.delete(function(req, res, next) {
		connection.query('DELETE from purity_reports where source_id=' + req.params.id + ';', function(err, rows) {
			connection.query('DELETE from source_reports where source_report_id=' + req.params.id + ";", function(err, rows){
			res.send(rows);
			});
		});
		
	});


module.exports = router;