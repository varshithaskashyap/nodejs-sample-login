const express = require('express');
var router = express.Router()

router.get("/homepage", isLoggedIn,(req, res) => {
    sess = req.session;
    res.render('posts/homepage', {
        user:sess.username,
        status:true
    });
});



function isLoggedIn(req, res, next) {
    sess = req.session;
    if (sess.username) {
       return next();
    }
    res.redirect('/');
}


module.exports = router