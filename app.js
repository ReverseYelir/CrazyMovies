// imports
const express = require("express");
const app = express();
const request = require('request');
const path = require('path');

// tells express which directory contains static files
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine","ejs");
app.get("app.css");

//routes
app.get("/",function(req,res) {
    res.render("index.ejs");
});

// renders the search results
app.get("/results", function(req,res) {
    var searchMovieTitle = req.query.search;
    var requestURL = "http://www.omdbapi.com/?apikey=thewdb&s=" + searchMovieTitle;
    request(requestURL, function(error,resposne,body) {
        if (error) {
            console.log("There was an error: ");
            console.log(error);
        } else {
            var bodyData = JSON.parse(body);
            if(bodyData["Search"] == undefined) {
                bodyData.placeHolder = "Movie Not Found";
                res.render("index.ejs", { data:bodyData});
            } else {
                bodyData.placeHolder = "Movie Title";
                res.render("results.ejs", {data:bodyData});
            }

        }
    });
});

//server listener
app.listen(3000, function() {
    console.log("Server has started...");
});
