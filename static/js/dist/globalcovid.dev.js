"use strict";

function commaSeparateNumber(val) {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ' ' + '$2');
  }

  return val;
}

fetch("https://covid19-api.org/api/timeline").then(function (res) {
  return res.json();
}).then(function (data) {
  var cases = [];
  var labels = [];
  var deaths = [];
  var recovered = [];
  var daily = [];
  var active = [];
  var n = 0;
  data.forEach(function (element) {
    cases.unshift(data[n].total_cases);
    var masno = data[n].last_update;
    var update = "";

    for (var i = 5; i < 10; i++) {
      update += masno[i];
    }

    update = update.replace("-", ".");
    labels.unshift(update);
    deaths.unshift(data[n].total_deaths);
    recovered.unshift(data[n].total_recovered);
    n++;
  });
  n--;
  var k = n;
  document.getElementById("dailyRes").innerHTML = "Dzisiejsza liczba przypadk\xF3w: ".concat(commaSeparateNumber(cases[n] - cases[n - 1]));
  document.getElementById("casesRes").innerHTML = "\u0141\u0105czna liczba przypadk\xF3w: ".concat(commaSeparateNumber(cases[n]));
  document.getElementById("deathRes").innerHTML = "\u015Amierci \u0142\u0105cznie: ".concat(commaSeparateNumber(deaths[n]));
  document.getElementById("recoveredRes").innerHTML = "Wyzdrowia\u0142ych \u0142\u0105cznie: ".concat(commaSeparateNumber(recovered[n]));

  for (n; n > 0; n--) {
    var val = cases[n + 1] - cases[n];
    var wal = cases[n] - recovered[n];

    if (val < 0) {
      val = -val;
    }

    daily.unshift(val);
    active.unshift(wal);
  }

  document.getElementById("activeRes").innerHTML = "Liczba aktywnych przypadk\xF3w: ".concat(commaSeparateNumber(active[k - 1]));
  var myChart = document.getElementById("myChart").getContext('2d');
  var dailyChart = document.getElementById("dailyChart").getContext('2d');
  var deathChart = document.getElementById("deathChart").getContext('2d');
  var activeChart = document.getElementById("activeChart").getContext('2d');
  var chart = new Chart(myChart, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: "Potwierdzone przypadki",
        data: cases,
        backgroundColor: '#CE0217',
        minBarLength: 100
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false
    }
  });
  var dailyCh = new Chart(dailyChart, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: "Dzienne przypadki",
        data: daily,
        backgroundColor: '#3585CA',
        minBarLength: 100
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false
    }
  });
  var deathCh = new Chart(deathChart, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: "Ozdrowione przypadki",
        data: recovered,
        backgroundColor: '#32cd32',
        minBarLength: 100
      }, {
        label: "Śmierci",
        data: deaths,
        backgroundColor: '#696969',
        minBarLength: 100
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false
    }
  });
  var activeCh = new Chart(activeChart, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: "Aktywne przypadki",
        data: active,
        backgroundColor: '#FFC34D',
        minBarLength: 100
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false
    }
  });
});