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
                        cb(false,result);
                    } else {
                        cb("Error in Retriving Data");
                    }
                });
            }
    });
}

function addPerson(req,cb) {
    var data = {
        "name": req.body.name,
        "gender": req.body.gender,
        "age": req.body.age,
        "mobile": req.body.mobile
    };
    connection.mongoConnection(function(err,db) {
        if (err) {
            console.log("error in connecting mongo", +err);
        } else {
            var db = db.db('userdetails');
            db.collection("persons").insertOne(data, function(err,result) {
                if (result) {
                    cb(false,result);
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
        "name": req.body.name,
        "gender": req.body.gender,
        "age": req.body.age,
        "mobile": req.body.mobile
    };

    var db = db.db('userdetails');
    db.collection("persons").updateOne({_id:req.body.id},data,{upsert: true}, function(err,result) {
        if (result) {
            cb(false,result);
        } else {
            cb("error in updating data");
        }
    });

    });

}


function deletePerson(req,cb) {
    connection.mongoConnection(function(err,db) {
        var db = db.db('userdetails');
        db.collection("persons").findAndDeleteOne({_id:req.params.id}).toArray( function(err,result) {
            if (result) {
                cb(false,result);
            } else {
                cb("error in deleting data");
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