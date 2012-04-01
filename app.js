
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , models = require('./models/models')
  , auth = require('./controllers/auth');

var app = module.exports = express.createServer();

auth.init(models.UserModel);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


routes.init(auth,models);


// Routes

app.get('/', routes.index);
app.get('/game/:gid', routes.queryGame)

app.post('/register', routes.register);
app.post('/login', routes.login);
app.post('/game/random', routes.randomGame)


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
