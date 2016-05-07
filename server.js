// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var app = express();

// CONNECT TO DB \\
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/skeleton')

// CONTROLLERS \\
var passportConfig = require('./config/passport');
var authenticationController = require('./controllers/authController');
var apiController = require('./controllers/apiController'); 

// SESSION SETUP \\
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// AUTHENTICATION ROUTES \\
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.get('/auth/login', authenticationController.login);
app.post('/auth/login', authenticationController.processLogin);
app.post('/auth/signup', authenticationController.processSignup);
app.get('/auth/logout', authenticationController.logout);
app.use(passportConfig.ensureAuthenticated);

// ROUTES \\
app.get('/api/me', function(req, res){
	res.send(req.user)
})
app.get('/', function(req, res){
  res.sendFile('/html/home.html', {root : './public'})
});

// SERVER \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);
});