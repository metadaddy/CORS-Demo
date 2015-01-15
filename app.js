var nforce         = require('nforce');
var express        = require('express');

var app = express();

var org = nforce.createConnection({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI
});

app.engine('.html', require('ejs').__express);

// Configuration
console.log(__dirname + '/public');

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.use(express.static(__dirname + '/public'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.cookieParser());
  app.use(express.session({ 
    secret: process.env.CLIENT_SECRET
  }));
  app.use(org.expressOAuth({onSuccess: '/', onError: '/oauth/error'}));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  if (req.session.oauth) {
    res.render('index', {
      oauth: req.session.oauth
    });
  } else {
    res.redirect(org.getAuthUri());
  }
});

var httpPort = Number(process.env.PORT || 3000);
app.listen(httpPort);
console.log("Express server listening on port %d in %s mode", httpPort, app.settings.env);
