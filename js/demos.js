

const div = document.getElementById("fetch-demo");
const url = "https://api.iextrading.com/1.0/stock/aapl/quote";
const url2 = "https://stats.nba.com/stats/commonallplayers";
function createNode(element) {
    return document.createElement(element);
}

function appends(parent, el) {
    return parent.appendChild(el);
}

fetch(url).then(response => response.json()).then(function (data) {
    //console.log(data);
    let repos = data; // Get the results
    //console.log(repos);

    creatList(repos);
}).catch(function (error) {
    console.log(error);
    //alert('There was a problem getting info! *If you are using IE or Edge this demo will not work')
});

function creatList(repos) {

    var name = repos.companyName,
        symbol = repos.symbol,
        high = repos.high,
        low = repos.low,
        close = repos.close;

    createChart(symbol, high, low, close);

    console.log(repos);

    let p = createNode('p'),
        a = createNode('a');

    p.innerHTML = `<b>Company:</b> ${name} <b>SYM:</b> ${symbol} <b>High:</b><span id="high"> ${high}</span> <b>Low:</b><span id="low"> ${low}</span> <b>Close:</b> ${close}`; // Make the HTML of our span to be the first and last name of our author

    appends(div, p);

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
var cities = [];
var totalCities = 6;

var recordDistance;
var bestEver;

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




