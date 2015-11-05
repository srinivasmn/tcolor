var restify = require('restify');
var server = require('./server');
var port = 3000;
var dirPath = process.argv[2];
 
var client = restify.createJsonClient({
    url: 'http://localhost:3000'
});
 
// a static user to CREATE READ UPDATE DELETE
 
var testUser = {
    id: "1",
    name: "Srinivas",
    login: "srinivasmn",
    password: "sri123",
    email: "srinivasmnath@gmail.com",
    city: "bangalore",
    profession: "IT"
   
};


// to see the output when you the run the client, A nested async callback system to do the above steps
console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
client.get('/users', function (err, req, res, users) {
    if (err) console.log("Oops : ", err);
    else console.log('Total users : ', users.length);
    console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
 
    client.post('/user', testUser, function (err, req, res, user) {
        if (err) console.log("Oops : ", err);
        else console.log('Inserted user : ', user);
        console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
 
        client.get('/user/' + testUser.id, function (err, req, res, user) {
            if (err) console.log("Oops : ", err);
            else console.log('User with ID :' + testUser.id + ' :: ', user);
            console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
 
            client.put('/user/' + testUser.id, {
                price: "999 USD"
            }, function (err, req, res, status) {
                if (err) console.log("Oops : ", err);
                else console.log('User Updated status :', status);
                console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
 
                client.get('/user/' + testUser.id, function (err, req, res, user) {
                    if (err) console.log("Oops : ", err);
                    else console.log('User with ID :' + testUser.id + ' :: ', user);
                    console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
 
                    client.del('/user/' + testUser.id, function (err, req, res, status) {
                        if (err) console.log("Oops : ", err);
                        else console.log('User deleted status :', status);
                        console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");
                        client.get('/users', function (err, req, res, users) {
                            if (err) console.log("Oops : ", err);
                            else console.log('Total users : ', users.length);
                            console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> \n");  
                        });
 
                    });
                });
            });
        });
    });
});