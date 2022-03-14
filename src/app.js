const express = require('express');
const app = express();


var publicDir = require('path').join(__dirname, '../public');
console.log(publicDir)
app.use(express.static(publicDir));

app.set("view engine", "ejs");


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))

const session = require('express-session');
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));


const accounts = require('./accounts/accounts')
app.use('/',accounts)

const posts = require('./posts/posts')
app.use('/',posts)


app.listen(process.env.PORT || 3000, function () {
    console.log("\napp listening at port %d in %s mode", this.address().port, app.settings.env);
    console.log("\nStarting development server at http://127.0.0.1:3000/");
    console.log("Quit the serer with CONTROL-C.\n");
  }); 