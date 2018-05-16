const div = document.getElementById("fetch-demo");
let url = "https://api.iextrading.com/1.0/stock/aapl/quote";
var cities = [];
var totalCities = 6;
var recordDistance;
var bestEver;

fetchStock(url);

document.getElementById("tsButton").addEventListener("click", function (event) {
    event.preventDefault();
    submitButt();
});
document.getElementById("stockButton").addEventListener("click", function (event) {
    event.preventDefault();
    stockButt()
});

function stockButt() {
    var stockSelector = document.getElementById("stockSelector");
    let stockSym = stockSelector.value;
    let newUrl = `https://api.iextrading.com/1.0/stock/${stockSym}/quote`;

    fetchStock(newUrl);
}

function submitButt() {
    var pointSelect = document.getElementById("pointsSelector");
    var algoSelect = document.getElementById("algoSelector");

    totalCities = pointSelect.value;
    console.log(algoSelect.value);
    setup();
}
console.log(totalCities.value);

function createNode(element) {
    return document.createElement(element);
}

function appends(parent, el) {
    return parent.appendChild(el);
}
function fetchStock(url) {
    let location = url;
    fetch(location).then(response => response.json()).then(function (data) {
        let repos = data;
        creatList(repos);
    }).catch(function (error) {
        console.log(error);
    });
}

function creatList(repos) {
    var name = repos.companyName,
        symbol = repos.symbol,
        high = repos.high,
        low = repos.low,
        close = repos.close;

    createChart(symbol, high, low, close);
    console.log(repos);
    let p = document.getElementById("stock-info");
    p.innerHTML = `<b>Company:</b> ${name} <b>SYM:</b> ${symbol} <b>High:</b><span id="high"> ${high}</span> <b>Low:</b><span id="low"> ${low}</span> <b>Close:</b> ${close}`;
}

var ctx = document.getElementById("myChart").getContext('2d');
function createChart(symbol, high, low, close) {
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["High", "Low", "Close"],
            datasets: [{
                label: symbol,
                data: [high, low, close],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
}

function setup() {
    var myCanvas = createCanvas(600, 300);
    myCanvas.parent('traveling-salesman');
    for (var i = 0; i < totalCities; i++) {
        var v = createVector(random(width), random(height));
        cities[i] = v;
    }

    var d = calcDistance(cities);
    recordDistance = d;
    bestEver = cities.slice();

}

function draw() {
    background(0);
    fill(255);
    for (var i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, 8, 8);
    }

    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < cities.length; i++) {
        vertex(cities[i].x, cities[i].y);
    }
    endShape();

    stroke(255, 0, 255);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i = 0; i < cities.length; i++) {
        vertex(bestEver[i].x, bestEver[i].y);
    }
    endShape();

    var i = floor(random(cities.length));
    var j = floor(random(cities.length));
    swap(cities, i, j);

    var d = calcDistance(cities);
    if (d < recordDistance) {
        recordDistance = d;
        bestEver = cities.slice();
    }
}

function swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}


function calcDistance(points) {
    var sum = 0;
    for (var i = 0; i < points.length - 1; i++) {
        var d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
        sum += d;
    }
    return sum;
}





