var bodyParser = require('body-parser');
var express = require('express');
var http = require('http');
var cors = require('cors');


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
var ObjectID = require('mongodb').ObjectId;
var db = new mongo.Db("crud", new mongo.Server(host, port, {}));
db.open();

/* JSON API */
appLisent.get('/api', MongoFind);
appLisent.post('/api', MongoInsert);
appLisent.delete('/api/:id', MongoRemove);
appLisent.put('/api/:id', MongoUpdate);



/* Mongo Get */
function MongoFind(httpRequest, httpResponse) {
	db.collection('Student', function (error, collection){
		collection.find().limit(1).toArray(function(error, result){
            httpResponse.send(JSON.stringify(result));
		});
	})
}


/* Mongo Update */ 
function MongoUpdate (httpRequest, httpResponse) {
    console.log(httpRequest.params);
    db.collection('Student', function (error, collection) {
         collection.update({_id: httpRequest.params.id}, { "id": ObjectId(httpRequest.params.id), 
            "firstname": "Mr. New Update", "lastname": "Mr. new Updatee"}, { upsert: true,'new': true });
         console.log(httpRequest.params.id);
    
    })

    console.log('MongoUpdate 54');
}

/* Mongo Insert */
function MongoInsert (httpRequest, httpResponse) {
    var data = [{firstname:'Mr.', lastname: 'node' }];
    db.collection('Student', function (error, collection) {
        collection.insert(data, function (error, result) {
            if (error) {
                httpResponse.end(JSON.stringify({'error': 'Error occured'}))
            }
           
            httpResponse.send(result);
            socket.emit('speak', 'One Data Inserted');
        })
    })
}

/* Mongo Remove */
function MongoRemove (httpRequest, httpResponse) {
    var id = new ObjectID(httpRequest.params.id);  
    db.collection('Student', function (error, collection ) {

        collection.remove({ '_id': id }, function (bug, success) {
                if (bug) {
                    httpResponse.end(json.stringify({'error': 'Error Occured'}))
                }

                if (success) {
                    console.log('remove success');
                    httpResponse.send(success);
                }
                
            });
    })    
}


function connectionStatus(){
    console.log("Listening on port localhost:3300/api")
}
server.listen(3300,connectionStatus)