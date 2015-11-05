var restify = require('restify');
var server = require('./server');
var port = 3000;
var dirPath = process.argv[2];
 
var client = restify.createJsonClient({
    url: 'http://localhost:3000'
});
 
// a static product to CREATE READ UPDATE DELETE
 
var testUser = {
    id: "1",
    name: "Srinivas",
    login: "srinivasmn",
    password: "sri123",
    city: "bangalore",
    profession: "IT"
   
};
 
client.post('/user', testUser, function (err, req, res, user) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('user saved >>>>>>>');
        console.log(user);
    }
});

client.get('/users', function (err, req, res, users) {
	if (err) {
	    console.log("An error ocurred >>>>>>");
	    console.log(err);
	} else {
	    console.log("Total users " + users.length);
	    console.log('All users >>>>>>>');
	    console.log(users);
	}
});



testUser.city = "Mumbai",
client.put('/user/' + testUser.id, testUser, function (err, req, res, status) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('User saved >>>>>>>');
        console.log(status);
    }
 
});



//client.del('/user/' + testUser.id, function (err, req, res, status) {
//    if (err) {
//        console.log("An error ocurred >>>>>>");
//        console.log(err);
//    } else {
//        console.log('User deleted >>>>>>>');
//        console.log(status);
//    }
//});

client.get('/user/' + testUser.id, function (err, req, res, user) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('User with id ' + testUser.id + '  >>>>>>>');
        console.log(user);
    }
});

client.get('/ListFiles/' + dirPath, function (err, req, res, user) {/**/
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('List of files in the Path: ' + dirPath + '  >>>>>>>');
        console.log(user);
    }
}); 

console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
client.post('/user', testUser, function (err, req, res, user) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('user saved >>>>>>>');
        console.log(user);
    }
});
//client.get('/users', function (err, req, res, users) {
//    if (err) console.log("Oops : ", err);
//    else console.log('Total users : ', users.length);
//    console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
//
//    client.post('/user', testUser, function (err, req, res, user) {
//        if (err) console.log("Oops : ", err);
//        else console.log('Inserted user : ', user);
//        console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
//
//        client.get('/user/' + testUser.id, function (err, req, res, user) {
//            if (err) console.log("Oops : ", err);
//            else console.log('User with ID :' + testUser.id + ' :: ', user);
//            console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
//
//            client.put('/user/' + testUser.id, {
//                city: "Mumbai"
//            }, function (err, req, res, status) {
//                if (err) console.log("Oops : ", err);
//                else console.log('User Updated status :', status);
//                console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
//
//                client.get('/user/' + testUser.id, function (err, req, res, user) {
//                    if (err) console.log("Oops : ", err);
//                    else console.log('User with ID :' + testUser.id + ' :: ', user);
//                    console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
//
//                    client.del('/user/' + testUser.id, function (err, req, res, status) {
//                        if (err) console.log("Oops : ", err);
//                        else console.log('User deleted status :', status);
//                        console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
//
//                        client.get('/pusers', function (err, req, res, users) {
//                            if (err) console.log("Oops : ", err);
//                            else console.log('Total users : ', users.length);
//                            console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
//                        });
//
//                    });
//                });
//            });
//        });
//    });
//});