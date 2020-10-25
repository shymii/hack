"use strict";

Chart.defaults.global.defaultFontColor = "#ccc8c9";
document.querySelector('.sub').addEventListener('click', function (e) {
  e.preventDefault();
  var c1input = document.querySelector('#c1');
  var c2input = document.querySelector('#c2');
  var c1 = c1input.value;
  var c2 = c2input.value;

  if (c1 && c2) {
    document.querySelector('#chart-box').innerHTML = '';
    document.querySelector('#chart-box').innerHTML = "<section class=\"global-stats-section\" id=\"first-chart\"><div class=\"global-stats-chart\"><canvas id=\"myChart1\"></canvas></div><p class=\"global-stats-desc\">".concat(c1input.options[c1input.selectedIndex].text, "</p></section><section class=\"global-stats-section\" id=\"second-chart\"><div class=\"global-stats-chart\"><canvas id=\"myChart2\"></canvas></div><p class=\"global-stats-desc\">").concat(c2input.options[c2input.selectedIndex].text, "</p></section>");
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
      var myChart1 = document.getElementById("myChart1").getContext('2d');
      var rand1, rand2, rand3;
      var gradient = [];

      for (var i = 0; i <= 6; i++) {
        rand1 = Math.floor(255 * Math.random());
        rand2 = Math.floor(255 * Math.random());
        rand3 = Math.floor(255 * Math.random());
        gradient[i] = myChart1.createLinearGradient(0, 0, 0, 400);
        gradient[i].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));
        gradient[i].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));
      }

      var chart1 = new Chart(myChart1, {
        type: 'line',
        data: {
          labels: c1Whole.update,
          datasets: [{
            label: "Potwierdzone przypadki",
            data: c1Whole.cases,
            backgroundColor: gradient[1],
            minBarLength: 100
          }, {
            label: "Liczba zgonów",
            data: c1Whole.deaths,
            backgroundColor: gradient[2],
            minBarLength: 100
          }, {
            label: "Wyleczone przypadki",
            data: c1Whole.recovered,
            backgroundColor: gradient[3],
            minBarLength: 100
          }]
        },
        options: {
          legend: {
            onClick: null
          },
          scales: {
            xAxes: [{
              gridLines: {
                drawOnChartArea: false
              }
            }],
            yAxes: [{
              gridLines: {
                drawOnChartArea: false
              }
            }]
          }
        }
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

          for (var _i = 5; _i < 10; _i++) {
            c2Whole.update[0] += res.last_update[_i];
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
              backgroundColor: gradient[4],
              minBarLength: 100
            }, {
              label: "Liczba zgonów",
              data: c2Whole.deaths,
              backgroundColor: gradient[5],
              minBarLength: 100
            }, {
              label: "Wyleczone przypadki",
              data: c2Whole.recovered,
              backgroundColor: gradient[6],
              minBarLength: 100
            }]
          },
          options: {
            legend: {
              onClick: null
            },
            scales: {
              xAxes: [{
                gridLines: {
                  drawOnChartArea: false
                }
              }],
              yAxes: [{
                gridLines: {
                  drawOnChartArea: false
                }
              }]
            }
          }
        });
      })["catch"](function (error) {
        return console.log('error', error);
      });
    })["catch"](function (error) {
      return console.log('error', error);
    });
  } else {
    var y = document.querySelector('.huh');
    y.classList.remove('huh');
    y.classList.add('alert');
    y.classList.add('alert-error');
    setTimeout(function () {
      y.classList.add('alert-hide');
      setTimeout(function () {
        y.classList.remove('alert');
        y.classList.remove('alert-error');
        y.classList.remove('alert-hide');
        y.classList.add('huh');
      }, 1000);
    }, 3000);
  }
});