///this is where it all comes together!

'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var path = require('path');
var bodyParser = require('body-parser');
var models = require('./models');
var routes = require('./routes')

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
var env = nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests
app.use('/', routes);


///


models.db.sync({ force: true })
    .then(function() {
        app.listen(3000, function() {
            console.log('Server is listening on port 3000!');
        });
    })
    .catch(console.error);


app.get('/', function(req, res) {
    res.render('index')
})