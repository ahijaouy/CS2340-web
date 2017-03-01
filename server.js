var express			= require('express'),
	bodyParser		= require('body-parser'),
	passport		= require('passport'),
	logger			= require('morgan'),
	helmet			= require('helmet'),
	handelbars		= require('express-handlebars'),
	session			= require('express-session'),
	mysqlStore		= require('express-mysql-session')(session),
	Auth0Strategy	= require('passport-auth0'),
	app				= express();

app.engine('hbs', handelbars({defaultLayout: false, extname: '.hbs'}));
app.set('view engine', 'hbs');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(helmet());
app.use(logger('dev'));

require('./app/main.js')(app);

app.listen(80, function() {
	console.log('we are live on 80');
});

module.exports = app;
