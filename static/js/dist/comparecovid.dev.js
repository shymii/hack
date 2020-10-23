"use strict";

document.querySelector('.sub').addEventListener('click', function (e) {
  e.preventDefault();
  var c1 = document.querySelector('#c1').value;
  var c2 = document.querySelector('#c2').value;

  if (c1 && c2) {
    var p = document.querySelector('.msg');
    p.classList.remove('visible');
    document.querySelector('#chart-box').innerHTML = '';
    document.querySelector('#chart-box').innerHTML = '<section id="first-chart"><canvas id="myChart1"></canvas></section><section id="second-chart"><canvas id="myChart2"></canvas></section>';
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("https://covid19-api.org/api/timeline/".concat(c1), requestOptions).then(function (response) {
      return response.json();
    }).then(function (result) {
      var c1Whole = {
        cases: [],
        update: [],
        deaths: [],
        recovered: []
      };
      result.forEach(function (res) {
        c1Whole.cases.unshift(res.cases);
        c1Whole.deaths.unshift(res.deaths);
        c1Whole.recovered.unshift(res.recovered);
        c1Whole.update.unshift(res.last_update.replace("T", " "));
        c1Whole.update[0] = '';

        for (var i = 5; i < 10; i++) {
          c1Whole.update[0] += res.last_update[i];
        }
      });
      var myChart1 = document.getElementById("myChart1");
      var chart1 = new Chart(myChart1, {
        type: 'line',
        data: {
          labels: c1Whole.update,
          datasets: [{
            label: "Potwierdzone przypadki",
            data: c1Whole.cases,
            backgroundColor: '#8b0000',
            minBarLength: 100
          }, {
            label: "Liczba zgonów",
            data: c1Whole.deaths,
            backgroundColor: '#696969',
            minBarLength: 100
          }, {
            label: "Wyleczone przypadki",
            data: c1Whole.recovered,
            backgroundColor: '#32cd32',
            minBarLength: 100
          }]
        },
        options: {}
      });
      fetch("https://covid19-api.org/api/timeline/".concat(c2), requestOptions).then(function (response) {
        return response.json();
      }).then(function (result) {
        var c2Whole = {
          cases: [],
          update: [],
          deaths: [],
          recovered: []
        };
        result.forEach(function (res) {
          c2Whole.cases.unshift(res.cases);
          c2Whole.deaths.unshift(res.deaths);
          c2Whole.recovered.unshift(res.recovered);
          c2Whole.update.unshift(res.last_update.replace("T", " "));
          c2Whole.update[0] = '';

          for (var i = 5; i < 10; i++) {
            c2Whole.update[0] += res.last_update[i];
          }
        });
        var myChart2 = document.getElementById("myChart2");
        var chart2 = new Chart(myChart2, {
          type: 'line',
          data: {
            labels: c2Whole.update,
            datasets: [{
              label: "Potwierdzone przypadki",
              data: c2Whole.cases,
              backgroundColor: '#8b0000',
              minBarLength: 100
            }, {
              label: "Liczba zgonów",
              data: c2Whole.deaths,
              backgroundColor: '#696969',
              minBarLength: 100
            }, {
              label: "Wyleczone przypadki",
              data: c2Whole.recovered,
              backgroundColor: '#32cd32',
              minBarLength: 100
            }]
          },
          options: {}
        });
      })["catch"](function (error) {
        return console.log('error', error);
      });
    })["catch"](function (error) {
      return console.log('error', error);
    });
  } else {
    var _p = document.querySelector('.msg');

    _p.classList.add('alert');

    _p.classList.add('visible');

    setTimeout(function () {
      _p.classList.add('alert-hide');

      setTimeout(function () {
        _p.classList.remove('alert');

        _p.classList.remove('visible');
      }, 1000);
    }, 3000);
  }
});