var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var TestModel = sequelize.import('../models/test');

/****************************************
 * Controller Method #1: Simple Response
****************************************/
router.post('/one', function(req, res){
    res.send("gottasnsd post reqqqqqq")
})
/****************************************
 * Controller Method #2: Persisting Data
****************************************/
router.post('/two', function(req, res) {
    let testData = "Test data for endpoint two"; 
    TestModel.create({
        testdata: testData
    })
    res.send("teswt 2 worked");
    console.log("Test two went through.");
});
/****************************************
 * Controller Method #3: req.body
****************************************/
router.post('/three', function(req, res){
    var testData = req.body.testdata.item; 
    TestModel
        .create({
            testdata: testData
        });
    res.send("teswt 3 worked");
    console.log("Test three workey-durkey.");
})
/****************************************
 * Controller Method #4
****************************************/
router.post('/four', function(req, res){
    var testData = req.body.testdata.item;
    TestModel.create({testdata: testData}).then(function message(){res.send("Step fourfs dv,m ")});
})
/*********************
 * Route 5: Return data in a Promise
 **********************/
router.post('/five', function(req, res){
    var testData = req.body.testdata.item;
                          // ^^^ this parameter can be anything
    TestModel
        .create({
            testdata: testData
        })
        .then(
            function message(testdata){
                res.send(testData)
            }
        );
})
/*********************
 * Route 6: Return response as JSON
 **********************/
router.post('/six', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel.create({testdata: testData})
        .then(
            function message(testdata) {
                res.json({
                    testdata: testdata
                });
            }
        );
});
/*********************
 * Route 7: Handle errors
 **********************/
router.post('/seven', function (req, res) {
    var testData = req.body.testdata.item;
    TestModel.create({testdata: testData})
        .then(
            function createSuccess(testdata) {
                res.json({
                    testdata: testdata
                });
            },
            function createError(err){
                res.send(500, err.message);
            }
        );
});

module.exports = router;


// // practice
// router.get('/', function(req, res){
//     res.send('HEYYEEHND TEST ROUTESies')
// });
// router.get('/about', function(req, res){
//     res.send('THis is an ABOtu Riuoe')
// });
// // object
// router.get('/contact', function(req, res){
//     res.send({
//         user:"me", 
//         email:"hoe" 
//     })
// })
// // array
// router.get('/projects', function(req, res){
//     res.send(["proj", "pojjeoj"])
// })
// // array of objects
// router.get('/mycontacts', function(req, res){
//     res.send([
//         {user:"me", email:"hoe"},
//         {user:"med", email:"hoed"},
//         {user:"medd", email:"hoedd"}
//     ])
// })