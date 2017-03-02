var express			= require('express'),
	bodyParser		= require('body-parser'),
	passport		= require('passport'),
	logger			= require('morgan'),
	helmet			= require('helmet'),
	handelbars		= require('express-handlebars'),
	session			= require('express-session'),
	mysqlStore		= require('express-mysql-session')(session),
	Auth0Strategy	= require('passport-auth0'),
	dbconfig        = require('./config/database'),
	app				= express();

//for MySQLStore
var options = {
    host: '104.196.130.39',
    port: 3306,
    user: 'cs2340',
    password: 'password',
    database: 'thirstygoat',
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};
var sessionStore = new mysqlStore(options);


app.engine('hbs', handelbars({
	defaultLayout: false, extname: '.hbs'
}));
app.set('view engine', 'hbs');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(helmet());
app.use(logger('dev'));


app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

require('./app/main.js')(app, passport);

app.listen(80, function() {
	console.log('we are live on 80');
});

module.exports = app;
