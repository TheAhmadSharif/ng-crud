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

appLisent.get('/api', MONGO_SELECT)
appLisent.post('/api', MONGO_INSERT)
appLisent.put('/api/:id', MONGO_UPDATE_ID)



/* Delete ID */
function MONGO_DELETE_ID(req, res){
    var id = req.params.id;  
    var obj_id = new ObjectID(id);  
    db.collection('crud', function(err, collection) {
        collection.remove({'_id': obj_id } ,function(err, i) {
            res.end(JSON.stringify({'message':'Delete Succesfull'}));   
        });
    });
}

/* Mongo Get */
function MONGO_SELECT(req, res) {
	db.collection('crud', function (err, collection){
		collection.find().toArray(function(err, result){
            res.send(JSON.stringify(result));

		})
	})
}

/* Insert Data */
function MONGO_INSERT(req, res) {
	   var data = req.body;
       console.log(req);
       db.collection('crud', function(err,collection) {
    		collection.insert(data, function(err, result) {
    			if (err) {
    				res.end(JSON.stringify(
    					{'error': 'An error has occured'}));     
    			}
                 res.end(JSON.stringify({'status':'Save Succesfull'}));  

                res.send(result);
                socket.emit('speak', 'One Date Inserted');
    		})
    	})
}


function connectionStatus(){
    console.log("Listening on port localhost:3300/api")
}
server.listen(3300,connectionStatus)
