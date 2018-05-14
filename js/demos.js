

const div = document.getElementById("fetch-demo");
const url = "https://api.iextrading.com/1.0/stock/aapl/quote";

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
});

function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    })
        .then(response => response.json()) // parses response to JSON
}



function fetchDemo() {

}
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

    p.innerHTML = ` ${name} ${symbol} ${high} ${low} ${close}`; // Make the HTML of our span to be the first and last name of our author

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
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}