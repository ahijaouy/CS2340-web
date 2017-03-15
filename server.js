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
    api             = require('./app/api'),
	app				= express();

//for MySQLStore
var options = {
    host: dbconfig.connection.host,
    port: dbconfig.connection.port,
    user: dbconfig.connection.user,
    password: dbconfig.connection.password,
    database: dbconfig.database,
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

app.use('/api',  api);

require('./config/passport')(passport);

require('./app/main.js')(app, passport);

app.all('*', ensureSecure);
function ensureSecure(req, res, next){
    console.log('here');
    console.log(req.secure);
  if(req.secure){
    // OK, continue
    return next();
  };
  // handle port numbers if you need non defaults
  res.redirect('https://' + req.hostname + req.url); // express 4.x
};

app.listen(443, function() {
	console.log('we are live on 443');
});

module.exports = app;
