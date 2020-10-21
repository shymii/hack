"use strict";

function masno() {
  var country = document.getElementById("country").value;
  fetch("https://covid19-api.org/api/timeline/".concat(country)).then(function (res) {
    return res.json();
  }).then(function (data) {
    var cases = [];
    var labels = [];
    var deaths = [];
    var recovered = [];
    var daily = [];
    var n = 0;
    console.log(data);
    data.forEach(function (element) {
      cases.unshift(data[n].cases);
      var masno = data[n].last_update;
      var update = "";

      for (var i = 5; i < 10; i++) {
        update += masno[i];
      }

      update = update.replace("-", ".");
      labels.unshift(update);
      deaths.unshift(data[n].deaths);
      recovered.unshift(data[n].recovered);
      n++;
    });

    for (n; n > 0; n--) {
      var val = cases[n + 1] - cases[n];

      if (val < 0) {
        val = -val;
      }

      daily.unshift(val);
    }

    daily.unshift(0);
    daily.unshift(0);
    document.getElementById("cipsko").innerHTML = '&nbsp;';
    document.getElementById("cipsko").innerHTML = '<canvas id="myChart"></canvas>';
    var myChart = document.getElementById("myChart").getContext('2d');
    var chart = new Chart(myChart, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "Potwierdzone przypadki",
          data: cases,
          backgroundColor: '#8b0000',
          minBarLength: 100
        }, {
          label: "Liczba zgonów",
          data: deaths,
          backgroundColor: '#696969',
          minBarLength: 100
        }, {
          label: "Wyleczone przypadki",
          data: recovered,
          backgroundColor: '#32cd32',
          minBarLength: 100
        }, {
          label: "Dzienna liczba przypadków",
          data: daily,
          backgroundColor: '#7188e6',
          minBarLength: 100
        }]
      },
      options: {}
    });
  });
}