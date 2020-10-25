"use strict";

Chart.defaults.global.defaultFontColor = "#ccc8c9";
var countrybtn = document.querySelector("#countrybtn");

function commaSeparateNumber(val) {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ' ' + '$2');
  }

  return val;
}

document.getElementById("show").style.display = "none";
countrybtn.addEventListener("click", function (e) {
  e.preventDefault();
  var c1 = document.querySelector('#country').value;

  if (c1) {
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
      var rand1, rand2, rand3;
      var gradient = [];

      for (var i = 0; i <= 5; i++) {
        rand1 = Math.floor(255 * Math.random());
        rand2 = Math.floor(255 * Math.random());
        rand3 = Math.floor(255 * Math.random());
        gradient[i] = myChart.createLinearGradient(0, 0, 0, 400);
        gradient[i].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));
        gradient[i].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0.3)"));
      }

      var chart = new Chart(myChart, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: "Potwierdzone przypadki",
            data: cases,
            backgroundColor: gradient[1],
            minBarLength: 100
          }, {
            label: "Aktywne przypadki",
            data: active,
            backgroundColor: gradient[2],
            minBarLength: 100
          }, {
            label: "Liczba zgonów",
            data: deaths,
            backgroundColor: gradient[3],
            minBarLength: 100
          }, {
            label: "Wyleczone przypadki",
            data: recovered,
            backgroundColor: gradient[4],
            minBarLength: 100
          }, {
            label: "Dzienna liczba przypadków",
            data: daily,
            backgroundColor: gradient[5],
            minBarLength: 100
          }]
        },
        options: {
          legend: {// onClick: null
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
    });
    fetch("https://covid19-api.org/api/prediction/".concat(country)).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (!data['error']) {
        var a = document.getElementsByClassName('pred');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = a[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;
            item.style.display = 'block';
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

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
        var gradient = [];

        for (var i = 0; i <= 2; i++) {
          rand1 = Math.floor(255 * Math.random());
          rand2 = Math.floor(255 * Math.random());
          rand3 = Math.floor(255 * Math.random());
          gradient[i] = predChart.createLinearGradient(0, 0, 0, 400);
          gradient[i].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));
          gradient[i].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));
        }

        var pchart = new Chart(predChart, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: "Potwierdzone przypadki",
              data: cases,
              backgroundColor: gradient[1],
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
        var dpredCh = new Chart(dailypredChart, {
          type: 'line',
          data: {
            labels: idkidk,
            datasets: [{
              label: "Dzienne przypadki",
              data: daily,
              backgroundColor: gradient[2],
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
      } else {
        var _a = document.getElementsByClassName('pred');

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _a[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _item = _step2.value;
            _item.style.display = 'none';
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    })["catch"](function (error) {
      return console.log(error);
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