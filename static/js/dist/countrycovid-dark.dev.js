"use strict";

Chart.defaults.global.defaultFontColor = "#FFFBFC";
Chart.defaults.global.defaultFontFamily = "'Work Sans', sans-serif";
var countrybtn = document.querySelector("#countrybtn");

function commaSeparateNumber(val) {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
  }

  return val;
}

document.getElementById("show").style.display = "none";
countrybtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("show").style.display = "grid";
  var country = document.getElementById("country").value;
  fetch("https://covid19-api.org/api/timeline/".concat(country)).then(function (res) {
    return res.json();
  }).then(function (data) {
    var cases = [];
    var labels = [];
    var deaths = [];
    var recovered = [];
    var daily = [];
    var active = [];
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
    var k = n;
    k--;

    for (n; n > 0; n--) {
      var val = cases[n + 1] - cases[n];
      var wal = cases[n] - recovered[n];

      if (val < 0) {
        val = -val;
      }

      active.unshift(wal);
      daily.unshift(val);
    }

    daily.unshift(0);
    daily.unshift(0);
    document.getElementById("cipsko").innerHTML = '&nbsp;';
    document.getElementById("cipsko").innerHTML = '<canvas id="myChart"></canvas>';
    document.getElementById("allCases").innerHTML = "Liczba wszystkich przypadk\xF3w: ".concat(commaSeparateNumber(cases[k]));
    document.getElementById("todayCases").innerHTML = "Liczba dzisiejszych przypadk\xF3w: ".concat(commaSeparateNumber(daily[k]));
    document.getElementById("activeCases").innerHTML = "Liczba aktywnych przypadk\xF3w: ".concat(commaSeparateNumber(active[k - 1]));
    var myChart = document.getElementById("myChart").getContext('2d');
    var chart = new Chart(myChart, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "Potwierdzone przypadki",
          data: cases,
          backgroundColor: 'rgba(206, 2, 23, 0.6)',
          minBarLength: 100
        }, {
          label: "Aktywne przypadki",
          data: active,
          backgroundColor: 'rgba(255, 195, 77, 0.6)',
          minBarLength: 100
        }, {
          label: "Liczba zgonów",
          data: deaths,
          backgroundColor: 'rgba(105, 105, 105, 0.6)',
          minBarLength: 100
        }, {
          label: "Wyleczone przypadki",
          data: recovered,
          backgroundColor: 'rgba(50, 205, 50, 0.6)',
          minBarLength: 100
        }, {
          label: "Dzienna liczba przypadków",
          data: daily,
          backgroundColor: 'rgba(53, 133, 202, 0.6)',
          minBarLength: 100
        }]
      },
      options: {}
    });
  });
  fetch("https://covid19-api.org/api/prediction/".concat(country)).then(function (res) {
    return res.json();
  }).then(function (data) {
    var cases = [];
    var labels = [];
    var daily = [];
    var idkidk = [];
    var n = 0;
    data.forEach(function (element) {
      cases.push(data[n].cases);
      var masno = data[n].date;
      var update = "";

      for (var i = 5; i < 10; i++) {
        update += masno[i];
      }

      update = update.replace("-", ".");
      labels.push(update);
      idkidk.push(update);
      n++;
    });

    for (n; n > 0; n--) {
      var val = cases[n - 1] - cases[n];

      if (val < 0) {
        val = -val;
      }

      daily.push(val);
    }

    ;
    idkidk.shift();
    daily.shift();
    daily.reverse();
    document.getElementById("pred").innerHTML = '&nbsp;';
    document.getElementById("pred").innerHTML = '<canvas id="predChart"></canvas>';
    document.getElementById("dailypred").innerHTML = '&nbsp;';
    document.getElementById("dailypred").innerHTML = '<canvas id="dpredChart"></canvas>';
    var predChart = document.getElementById("predChart").getContext('2d');
    var dailypredChart = document.getElementById("dpredChart").getContext('2d');
    var pchart = new Chart(predChart, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "Potwierdzone przypadki",
          data: cases,
          backgroundColor: 'rgba(206, 2, 23, 0.6)',
          minBarLength: 100
        }]
      },
      options: {}
    });
    var dpredCh = new Chart(dailypredChart, {
      type: 'line',
      data: {
        labels: idkidk,
        datasets: [{
          label: "Dzienne przypadki",
          data: daily,
          backgroundColor: 'rgba(53, 133, 202, 0.6)',
          minBarLength: 100
        }]
      },
      options: {}
    });
  });
});