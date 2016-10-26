var bodyParser = require("body-parser");
var express = require("express");
var http = require("http");
var cors = require("cors");


var appLisent = express();
var server = http.createServer(appLisent); 

var socket = require("socket.io")(server);

appLisent.use(bodyParser.json());
appLisent.use(bodyParser.urlencoded({ extended: true }));


appLisent.use(cors());

/* Mongo Parameters */
var mongo = require("mongodb")
var host = "127.0.0.1"
var port = "27017"
var ObjectID = require('mongodb').ObjectID
var db = new mongo.Db("crud", new mongo.Server(host, port, {}));
db.open();
/* JSON API */

appLisent.get('/api', MongoFind);
appLisent.post('/api', MongoInsert);
appLisent.delete('/api/:id', MongoRemove);



 
/* Mongo Get */
function MongoFind(httpRequest, httpResponse) {
	db.collection('Student', function (error, collection){
		collection.find().toArray(function(error, result){
            httpResponse.send(JSON.stringify(result));
		})
	})
}


/* Insert */
function MongoInsert (httpRequest, httpResponse) {
    console.log("Insert data");
    var data = httpRequest.body;
    db.collection('Student', function (error, collection) {
        collection.insert(data, function (error, result) {
            console.log(result, 'error');
            if (error) {
                httpResponse.end(JSON.stringify({'error': 'Error occured'}))
            }
           
            httpResponse.send(result);
            socket.emit('speak', 'One Data Inserted');
        })
    })
}
function MongoRemove (httpRequest, httpResponse) {
    console.log(httpResponse);
    db.collection('Student', function (error, collection ) {
        collection.remove({ '_id': ObjectID, function (error, result) {
                if (error) {
                    httpResponse.end(json.stringify({'error': 'Error Occured'}))
                }
                httpResponse.send(JSON.stringify(result));
            } 
        })
    })    
}


function connectionStatus(){
    console.log("Listening on port localhost:3300/api")
}
server.listen(3300,connectionStatus)
