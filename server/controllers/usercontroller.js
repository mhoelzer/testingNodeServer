var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user'); 
var jwt = require('jsonwebtoken');

// /*************************
// ** Create User Endpoint: Starter***
// **************************/
// router.post('/createuser', function (req, res) {
//   var username = "h0tFuzz";
//   var pass = "NickAngle";
//   User.create({
//     username: username,
//     passwordhash: pass
//   }).then(
//     function message(){
//       res.send("You ain't seen Bad Boyz 2?");
//     }
//   );
// })

router.post('/createuser', function (req, res) {
    var username = req.body.user.username;
    var pass = req.body.user.password;
    User.create({
        username: username,
        passwordhash: pass
    }).then(
        function createSuccess(user) {
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});  

module.exports = router;
