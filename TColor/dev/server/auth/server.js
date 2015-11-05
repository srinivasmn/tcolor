var restify     =   require('restify');
var mongojs     =   require('mongojs');
var morgan  	=   require('morgan');
var db          =   mongojs('bucketlistapp', ['appUsers','bucketLists']);
var server      =   restify.createServer();
var manageLists =   require('../list/manageList')(server, db);
var manageUsers = require('./manageUser')(server, db);
// var db = mongojs('mongodb://srinivasmn:sri123@ds049094.mongolab.com:49094/tcolor', ['users']);
var db = mongojs('usersdb', ['users']);
//var db = require('mongojs').connect('usersdb', ['users']);
var fs = require('fs'); // To list the files in a folder
var path = require('path');
var files = [];

 
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(morgan('dev')); // LOGGER
 
// CORS
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
 
server.listen(process.env.PORT || 3000, function () {
    console.log("Server started @ ",process.env.PORT || 3000);
});

server.get("/users", function (req, res, next) {
    db.users.find(function (err, users) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(users));
    });
    return next();
});

server.post('/user', function (req, res, next) {
    var user = req.params;
    db.users.save(user,
        function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    return next();
});


server.put('/user/:id', function (req, res, next) {
    // get the existing product
    db.users.findOne({
        id: req.params.id
    }, function (err, data) {
        // merge req.params/user with the server/user
 
        var updUser = {}; // updated users 
        // logic similar to jQuery.extend(); to merge 2 objects.
        for (var n in data) {
            updUser[n] = data[n];
        }
        for (var n in req.params) {
            updUser[n] = req.params[n];
        }
        db.users.update({
            id: req.params.id
        }, updUser, {
            multi: false
        }, function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    });
    return next();
});

server.del('/user/:id', function (req, res, next) {
    db.users.remove({
        id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(true));
    });
    return next();
});

server.get('/user/:id', function (req, res, next) {
    db.users.findOne({
        id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
    });
    return next();
});

server.get('/ListFiles', function (req, res, next) {
    fs.readdir(dirPath,  function (err, list) {
	    for(var i=0; i<list.length; i++)
    {
            files.push(list[i]); //store the file name into the array files
    }
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(list));
    });
    return next();
});

module.exports = server;