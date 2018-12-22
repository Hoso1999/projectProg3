var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
function genMatrix(w, h) {
    matrix = [];
    for (y = 0; y < h; y++) {
        matrix[y] = [];
        for (x = 0; x < w; x++) {
            r = Math.random() * 100;
            if (r < 20) r = 0;
            else if (r < 65) r = 1;
            else if (r < 90) r = 2;
            else if (r < 100) r = 3;
            matrix[y][x] = r;
        }
    }
    return matrix;
}
matrix = [];
w = 25;
h = 25;
grassArr = [], grassEaterArr = [], predatorArr = [];
grassCount = 0;
grassEaterCount = 0;
predatorCount = 0;
grassEaterDie = 0;
predatorDie = 0;
grassEaterEat = 0;
predatorEat = 0;
matrix = genMatrix(w, h);
var Grass = require("./grass");
var GrassEater = require("./grassEater");
var Predator = require("./predator");

for (var y in matrix) {
    for (var x in matrix[y]) {
        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x * 1, y * 1, 1));
            grassCount++;
        }
        else if (matrix[y][x] == 2) {
            grassEaterArr.push(new GrassEater(x * 1, y * 1, 2));
            grassEaterCount++;
        }
        else if (matrix[y][x] == 3) {
            predatorArr.push(new Predator(x * 1, y * 1, 3));
            predatorCount++;
        }
    }
}

weather = "spring";
function changeWeather() {
    if (weather == "spring") {
        weather = "summer";
    }
    else if (weather == "summer") {
        weather = "autumn";
    }
    else if (weather == "autumn") {
        weather = "winter";
    }
    else if (weather == "winter") {
        weather = "spring";
    }
}

weatherDef = ["rain", "sunny", "lightning"];
defday = "morning";
defWeather = "sunny";
function weaterChange() {
    defWeather = weatherDef[Math.floor(Math.random() * weatherDef.length)];
    console.log("define: " + defWeather);
}
function changeDay() {
    if(defday == "morning") defday = "night";
    else if (defday == "night" ) defday = "morning";
}

statistics = {"objarr":[]};

setInterval(function(){
    statistics.objarr.push({
        "GrassCreateCount": grassCount,
        "GrassEaterCreateCount": grassEaterCount,
        "PredatorCreateCount": predatorCount,
        "GrassEaterDie": grassEaterDie,
        "PredatorDie": predatorDie,
        "GrassEaterEat": grassEaterEat,
        "PredatorEat": predatorEat,
        "GrassArrayLength": grassArr.length,
        "GrassEaterArrayLength": grassEaterArr.length,
        "PredatorArrayLength": predatorArr.length,
    })
    fs.writeFile("statistics.json",JSON.stringify(statistics, null, 3),function(err) {
        if(err) throw err;
    })
},13000);
function drawServer() {
    for (var i in grassArr) {
        multiply = grassArr[i].multiply;
        speed = grassArr[i].speed;
        if (weather == "winter") grassArr[i].multiply = 0;
        else {
            grassArr[i].multiply = multiply;
        }
        if (defWeather == "rain") grassArr[i].speed = speed / 2;
        else {
            grassArr[i].speed = speed;
            grassArr[i].mul();
        }
        grassArr[i].mul();
    }

    for (var i in grassEaterArr) {
        multiply = grassEaterArr[i].multiply;
        if (defWeather == "lightning") {
            grassEaterArr[i].multiply = 0;
        }
        else {
            grassEaterArr[i].multiply = multiply;
        }
        grassEaterArr[i].mul();
        grassEaterArr[i].eat();
        grassEaterArr[i].die();

    }

    for (var i in predatorArr) {
            predatorArr[i].mul();
            predatorArr[i].eat();
            predatorArr[i].die();
        
    }
    io.sockets.emit("weather", { "weather": weather, "matrix": matrix,"day": defday });
}
setInterval(changeDay,2500);
setInterval(weaterChange, 1500)
setInterval(changeWeather, 7500);
setInterval(drawServer, 200);
server.listen(3000);
