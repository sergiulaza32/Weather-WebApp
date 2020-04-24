const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    const query = req.body.cityName;
    const appKey = "14b6616e03382e509d4ce679b4802921";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + units;

    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {

            const weatherData = JSON.parse(data);
            const description = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather will be " + description + "</p>");
            res.write("<h1>There are gonna be " + temp + " degrees Celsius in " + query + "</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();

        });

    });

});

app.listen(3000, function() {

    console.log("Server is working on port 3000");

});