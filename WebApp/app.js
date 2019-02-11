var express = require('express');
var mysql = require('mysql');
var faker = require('faker');
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
// extract info from post request
app.use(bodyParser.urlencoded({extended: true}));
//take the contents in publiv dir
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'iris23',
    database : 'join_us'
});

 

app.get("/", function(req, res){
    // find the total number of users in db
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function(err,results){
        if(err) throw err;
        var count = results[0].count;
        // response with that number
        //res.send("We have " + count + " users in our database");
        //view/home.ejs
        res.render("home", {data: count});
        
    });
});

app.post("/register", function(req, res){
    var email = req.body.email;
    var person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function(err, results){
        if (err) throw err;
        // redirect to home page, updating the count
        res.redirect("/");
    });
});

app.get("/random_num", function(req, res){
    var num = Math.floor(Math.random() * 10) + 1;
    res.send("Your lucky number is " + num);
});

app.listen(8080, function(){
    console.log("Server running on 8080");
});


// INSERTING LOTS OF FAKE DATA INTO DATABASE--------
/*
var data = [];
for(var i = 0; i < 500 ; i++ ){
data.push([
    faker.internet.email(),
    faker.date.past()
]);
}
// Dynamic inserting 

var q = "INSERT INTO users (email, created_at) VALUES ?";

connection.query(q, [data], function(err,results){
    if(err) throw err;
    console.log(results);
});
// end the connectoin
connection.end();
*/