const div = document.getElementById("fetch-demo");
let url = "https://api.iextrading.com/1.0/stock/aapl/quote";
var ctx = document.getElementById("myChart").getContext("2d");
var cities = [];
var totalCities = 6;
var recordDistance;
var bestEver;
fetchStock(url);
document.getElementById("tsButton").addEventListener("click", function (event) {
  event.preventDefault();
  submitButt();
});
document
  .getElementById("stockButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    stockButt();
  });

function stockButt() {
  var stockSelector = document.getElementById("stockSelector");
  let stockSym = stockSelector.value;
  let newUrl = `https://api.iextrading.com/1.0/stock/${stockSym}/quote`;
  fetchStock(newUrl);
};

function submitButt() {
  var pointSelect = document.getElementById("pointsSelector");
  var algoSelect = document.getElementById("algoSelector");

  totalCities = pointSelect.value;
  console.log(algoSelect.value);
  setup();
};
console.log(totalCities.value);

function createNode(element) {
  return document.createElement(element);
};

function appends(parent, el) {
  return parent.appendChild(el);
};
function fetchStock(url) {
  let location = url;
  fetch(location)
    .then(response => response.json())
    .then(function (data) {
      let repos = data;
      console.log(repos);
      creatList(repos);
    })
    .catch(function (error) {
      console.log(error);
    });
};
function creatList(repos) {
  var name = repos.companyName,
    symbol = repos.symbol,
    high = repos.week52High,
    low = repos.week52Low,
    close = repos.close;

  console.log(name, high, low, close);

  createChart(symbol, high, low, close);
  let p = document.getElementById("stock-info");
  p.innerHTML = `Company:<b> ${name}</b><br> SYM: <b>${symbol}</b> 52 Week High:<b><span id="high"> ${high}</span></b> 52 Week Low:<b><span id="low"> ${low}</span> </b>Close:<b> ${close}</b>`;
};

function createChart(symbol, high, low, close) {
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["52 Week High", "52 Week Low", "Close"],
      datasets: [
        {
          label: symbol,
          data: [high, low, close],
          radius: 5,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1
        }
      ]
    },
    options: {
      tooltips: {
        mode: "x"
      },
      legend: {
        display: true,
        labels: {
          fontColor: "#ffff"
        }
      },
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false
            }
          }
        ]
      }
    }
  });
};
function setup() {
  var myCanvas = createCanvas(600, 300);
  myCanvas.parent("traveling-salesman");
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height));
    cities[i] = v;
  };

  var d = calcDistance(cities);
  recordDistance = d;
  bestEver = cities.slice();
  var outPut = 0;
};

function draw() {
  background(0);
  fill(255);
  for (var i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8);
  };

  stroke(255);
  strokeWeight(2);
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
  };
};
function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
};
function calcDistance(points) {
  var sum = 0;
  let temp = sum;
  for (var i = 0; i < points.length - 1; i++) {
    var d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    sum += d;
  }
  return sum;
};
