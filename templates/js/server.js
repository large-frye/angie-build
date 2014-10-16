/* this is an express server which is usefull for local dev, run as such for auto refresh 
supervisor -e 'html,js,css' node server.js
*/

var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    http = require('http'),
    path = require('path'),
    reload = require('reload');

var request = require('request');

var app = express();


app.set('port', process.env.PORT || 8000);
app.use(bodyParser()); //parses json, multi-part (file), url-encoded
app.use(methodOverride());

var env = process.env.NODE_ENV || 'development';
if ('development' === env) {
    app.use(morgan('dev'));
    app.use('/', express.static(__dirname + '/public'));
    app.use('/admin', express.static(__dirname + '/admin'));
} else if ('stage' === env) {
    app.use('/', express.static(__dirname + '/deploy/public'));
    app.use('/admin', express.static(__dirname + '/deploy/admin'));
} else if ('production' === env) {
    app.use('/', express.static(__dirname + '/deploy/public'));
    app.use('/admin', express.static(__dirname + '/deploy/admin'));
}
var url;


/* 
Use this part as an example to figure out what your resources needed to be.

app.use('/quiz', function(req, res) {
    if ('production' === env) {
        url = 'http://www.quiz.washingtonpost.com/quiz' + req.url;
    } else {
        url = 'https://quiz-stage.washingtonpost.com/quiz' + req.url;
    }

    if (req.method == 'POST') {
        if (req.headers['content-type'].indexOf('application/json') > -1) {
            req.pipe(request.post(url, {
                json: req.body
            })).pipe(res);
        } else {
            req.pipe(request.post(url, {
                form: req.body
            })).pipe(res);
        }
    } else {
        req.pipe(request(url)).pipe(res); // Get's the request from the client, pipes to our request url (prod api), then pipes the resp from prod. 
    }
});

app.use('/leaderboards', function(req, res) {

    url = 'https://leaderboards-dev.washingtonpost.com/leaderboards';

    if (req.method == 'POST') {
        if (req.headers['content-type'].indexOf('application/json') > -1) {
            req.pipe(request.post(url + req.url, {
                json: req.body
            })).pipe(res);
        } else {
            req.pipe(request.post(url + req.url, {
                form: req.body
            })).pipe(res);
        }
    } else {
        console.log(url + req.url);
        req.pipe(request(url + req.url)).pipe(res);
    }
}) */


var server = http.createServer(app);

//reload code here
reload(server, app);

server.listen(app.get('port'), function() {
    console.log('---------------------------------------------');
    console.log('running as ' + env);
    console.log('Magic happens on port:' + app.get('port'));
    console.log('---------------------------------------------');
    console.log('::projectName:: - PUBLIC :: http://localhost:' + app.get('port'));
    console.log('::projectName:: - ADMIN :: http://localhost:' + app.get('port') + '/admin');
});
