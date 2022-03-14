const express = require('express');
var router = express.Router()

const mysqlConnection = require('../../database/db_auth.js')

const bcrypt = require('bcrypt');
const saltRounds = 10;


router.get("/", function (req, res) {
    sess = req.session;
    if(sess.username) {
        res.redirect('/homepage');
    }
    else{
        res.render('accounts/index',{
            status:false
        });
    }
});


router.get("/login", function (req, res) {
    sess = req.session;
    if(sess.username) {
        res.redirect('/homepage');
    }
    else{
        res.render('accounts/login',{
            status:false,
            message: ""
        });
    }
});


router.post("/login", function (req, res) {
    sess = req.session;

    var user = {
        username: req.body.username,
        password: req.body.password,
    }

    mysqlConnection.query('SELECT * FROM users WHERE username = ?', user.username, function (error, results, fields) {
        if (results.length > 0) {
            bcrypt.compare(user.password, results[0].password, function (err, result) {
                if (result == true) {
                    sess.username = req.body.username;
                    res.redirect('/homepage');
                } else {
                    res.render('accounts/login',{
                        status:false,
                        message: "Username and password does not match"
                    });
                }

            });
        }
        else {
            res.render('accounts/login',{
                status:false,
                message: "Username does not exists"
            });
        }
    });
});



router.get("/signup", function (req, res) {
    sess = req.session;
    if(sess.username) {
        // res.send("u have logged in")
        res.redirect('/homepage');
    }
    else{
        res.render('accounts/signup',{
            status:false,
            message :""
        });
    }

});

router.get("/api/checkusername", function (req, res) {
   let name = req.query.username;
   mysqlConnection.query('SELECT * FROM users WHERE username = ?', name, function (error, results, fields) {
    if (results.length > 0) {
        res.send(false);
    }
    else{
        res.send(true);
    }
    });
});



router.post('/signup', formValidate, (req, res) => {
    sess = req.session;

    var user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }

    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        user.password = hash
        mysqlConnection.query('INSERT INTO users SET ?', user, function (error, results, fields) {
            if (error) throw error;
            sess.username = req.body.username;
            res.redirect('/homepage');
        });
    });
});


function checkUsername(name,callBack){
    mysqlConnection.query('SELECT * FROM users WHERE username = ?', name, function (error, results, fields) {
        if (results.length > 0) {
            callBack(true);
        }
        else{
            callBack(false);
        }
    });
}


function formValidate(req,res,next){

    if(req.body.password !== req.body.repassword ){
        res.render('accounts/signup',{
            status: false,
            message: "Passwords do not match"
        });
        return
    }

    checkUsername(req.body.username, function(userExists) {
        if(userExists == true){
            res.render('accounts/signup',{
                status: false,
                message: "Username already exists"
            });
            return
        }else{
            return next()
        }
    });
}

router.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router