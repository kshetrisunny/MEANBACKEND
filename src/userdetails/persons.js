/*jshint esversion: 6 */

var connection = require("../database/connect");
function getPerson(cb) {
    connection.mongoConnection(function(err,db) {
        if (err) {
            console.log("error in connecting mongo", +err);
        } else {
                var db = db.db('userdetails');
                db.collection("persons").find({}).toArray(function(err,result) {
                    if (result) {
                        cb(null,result);
                    } else {
                        cb("Error in Retriving Data");
                    }
                });
            }
    });
}

function addPerson(req,cb) {
    var data = {
        Name: req.body.Name,
        Gender: req.body.Gender,
        Age: req.body.Age,
        Mobile: req.body.Mobile
    };
    connection.mongoConnection(function(err,db) {
        if (err) {
            console.log("error in connecting mongo", +err);
        } else {
            var db = db.db('userdetails');
            db.collection("persons").insertOne(data, function(err,result) {
                if (result) {
                    cb(null,result);
                } else {
                    cb("error in inserting data");
                }
            });
        }
    });
}

function updatePerson(req,cb) {  
    connection.mongoConnection(function(err,db) {
    var data = {
        Name: req.body.Name,
        Gender: req.body.Gender,
        Age: req.body.Age,
        Mobile: req.body.Mobile
    };

    var db = db.db('userdetails');
    db.collection("persons").updateOne({_id:req.body.id},{ $set: data },{upsert: true}, function(err,result) {
        if (result) {
            cb(null,result);
            console.log(result);
        } else {
            cb("error in updating data" +err);
            console.log(err);
        }
    });

    });

}


function deletePerson(req,cb) {
    connection.mongoConnection(function(err,db) {
        var db = db.db('userdetails');
        db.collection("persons").deleteOne({_id:req.query.id} , function(err,result) {
            if (result) {
                cb(null,result);
            } else {
                cb("error in deleting data" +err);
            }
        });
    });
}


module.exports = {
    getPerson,
    addPerson,
    updatePerson,
    deletePerson
};