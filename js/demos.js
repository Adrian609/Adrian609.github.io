

const div = document.getElementById("fetch-demo");
const url = "https://api.iextrading.com/1.0/stock/aapl/quote";
const url2 = "https://stats.nba.com/stats/commonallplayers";
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

fetch(url).then(response => response.json()).then(function (data) {
    //console.log(data);
    let repos = data; // Get the results
    //console.log(repos);

    creatList(repos);
}).catch(function (error) {
    console.log(error);
    alert('There was a problem getting info! *If you are using IE or Edge this demo will not work')
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

    append(div, p);

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
