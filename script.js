
var socket = io();
var side = 24;
var w = 25;
var h = 25;
function setup() {
    createCanvas(side * w, side * h);
    background("#acacac");
    frameRate(5);
}

function drawWeather(obj) {
    console.log(obj.weather);
    switch(obj.weather){
        case "spring" :
        for (var y in obj.matrix) {
            for (var x in obj.matrix[y]) {
            if(obj.day == "night"){
                if (obj.matrix[y][x] == 0) {
                    fill("OliveDrab");
                }
            }
            else{
                if (obj.matrix[y][x] == 0) {
                    fill("GreenYellow");
                }  
            }
                if (obj.matrix[y][x] == 1) {
                    fill("green");
                }
                else if (obj.matrix[y][x] == 2) {
                    fill("yellow");
                }
                else if (obj.matrix[y][x] == 3) {
                    fill("red");
                }
                rect(x * side, y * side, side, side);
            }
        }
        break;
        case "summer" :
        for (var y in obj.matrix) {
            for (var x in obj.matrix[y]) {
                if (obj.matrix[y][x] == 0) {
                    fill("#e7f66c");
                }
                else if (obj.matrix[y][x] == 1) {
                    fill("GreenYellow");
                }
                else if (obj.matrix[y][x] == 2) {
                    fill("orange");
                }
                else if (obj.matrix[y][x] == 3) {
                    fill("Maroon");
                }
                rect(x * side, y * side, side, side);
            }
        }
        break;
        case "autumn" :
        for (var y in obj.matrix) {
            for (var x in obj.matrix[y]) {
                if(obj.day == "night"){
                    if (obj.matrix[y][x] == 0) {
                        fill("DarkKhaki");
                    }
                }
                else{
                    if (obj.matrix[y][x] == 0) {
                        fill("Khaki");
                    }  
                }
                if (obj.matrix[y][x] == 1) {
                    fill("Brown");
                }
                else if (obj.matrix[y][x] == 2) {
                    fill("Tomato");
                }
                else if (obj.matrix[y][x] == 3) {
                    fill("Purple");
                }
                rect(x * side, y * side, side, side);
            }
        }
        break;
        case "winter" :
        for (var y in obj.matrix) {
            for (var x in obj.matrix[y]) {
                if(obj.day == "night"){
                    if (obj.matrix[y][x] == 0) {
                        fill("#6981d4");
                    }
                }
                else{
                    if (obj.matrix[y][x] == 0) {
                        fill("#96a7e1");
                    }  
                }
                if (obj.matrix[y][x] == 1) {
                    fill("SlateBlue");
                }
                else if (obj.matrix[y][x] == 2) {
                    fill("IndianRed");
                }
                else if (obj.matrix[y][x] == 3) {
                    fill("Indigo");
                }
                rect(x * side, y * side, side, side);
            }
        }
        break;
    }



}
socket.on("weather", drawWeather);
