var express = require('express');
var router = express.Router();
var person = require('../../src/userdetails/persons');

router.get('/', function(req, res) {
    person.getPerson(function(typeError, typeResult) {
        if (typeError) {
            res.send({status: false, error: "No Data Found"});
        } else {
            res.send({status: false, result: typeResult});
        }
    });
});

router.post('/', function (req, res, next) {
    person.addPerson(req, function (typeError, typeResult) {
        if (typeError) {
            res.send({
                status: false,
                error: "No data found"
            });
        } else {
            res.send({
                status: false,
                result: typeResult
            });
        }
    });
});


/* GET home page. */
router.put('/', function (req, res, next) {
    person.updatePerson(req, function (typeError, typeResult) {
        if (typeError) {
            res.send({
                status: false,
                error: "No data found"
            });
        } else {
            res.send({
                status: false,
                result: typeResult
            });
        }
    });
});


router.delete('/', function (req, res, next) {
    person.deletePerson(req, function (typeError, typeResult) {
        if (typeError) {
            res.send({
                status: false,
                error: "No data found"
            });
        } else {
            res.send({
                status: false,
                result: typeResult
            });
        }
    });
});

module.exports = router;