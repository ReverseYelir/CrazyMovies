const express = require("express");
const app = express();
const request = require('request');

app.set("view engine","ejs");
var movieInfo = [];
app.get("app.css");
//routes
app.get("/",function(req,res) {
    res.render("partials/searchForm.ejs");
});

app.get("/results", function(req,res) {
    var searchMovieTitle = req.query.search;
    var requestURL = "http://www.omdbapi.com/?apikey=thewdb&s=" + searchMovieTitle;
    request(requestURL, function(error,resposne,body) {
        if (error) {
            console.log("There was an error: ");
            console.log(error);
        } else {
            var bodyData = JSON.parse(body);
            res.render("results", {data:bodyData});
        }
    });
});

//server listener
app.listen(3000, function() {
    console.log("Server has started...");
});
