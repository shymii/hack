"use strict";

Chart.defaults.global.defaultFontColor = "#303030";

function renderComparision(usernameTemplate) {
  fetch('../../sendjsoncompare').then(function (res) {
    return res.json();
  }).then(function (out) {
    var result = out.survey_results;
    var users = [];
    var i = 0;

    for (var key in result) {
      users[i] = ['user', 'weight', 'height', 'chest', 'bicep', 'thigh', 'waist', 'hips', 'arms', 'stress', 'date', 'gradient'];
      users[i]['user'] = key;
      users[i]['weight'] = result[key]['weight'];
      users[i]['height'] = result[key]['height'];
      users[i]['chest'] = result[key]['chest'];
      users[i]['bicep'] = result[key]['bicep'];
      users[i]['thigh'] = result[key]['thigh'];
      users[i]['waist'] = result[key]['waist'];
      users[i]['hips'] = result[key]['hips'];
      users[i]['arms'] = result[key]['arms'];
      users[i]['stress'] = result[key]['stress'];
      users[i]['date'] = result[key]['date'];
      i++;
    }

    console.log(users[3]['date']);
    var dates = [];
    var j = 0;

    for (var _i = 0; _i < users.length; _i++) {
      for (var date in users[_i]['date']) {
        if (!dates.includes(users[_i]['date'][date])) {
          dates[j] = users[_i]['date'][date];
          j++;
        }
      }
    }

    dates.sort(function (a, b) {
      var da = new Date(a).getTime();
      var db = new Date(b).getTime();
      return da < db ? -1 : da > db ? 1 : 0;
    });
    var myChartWeight = document.getElementById("chartWeight").getContext('2d');
    var myChartHeight = document.getElementById("chartHeight").getContext('2d');
    var myChartChest = document.getElementById("chartChest").getContext('2d');
    var myChartBicep = document.getElementById("chartBicep").getContext('2d');
    var myChartThigh = document.getElementById("chartThigh").getContext('2d');
    var myChartHips = document.getElementById("chartHips").getContext('2d');
    var myChartWaist = document.getElementById("chartWaist").getContext('2d');
    var myChartArms = document.getElementById("chartArms").getContext('2d');
    var chartWeight = new Chart(myChartWeight, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
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
    chartWeight.data.labels = dates;
    var rand1, rand2, rand3;

    for (var _i2 = 0; _i2 < users.length; _i2++) {
      rand1 = Math.floor(255 * Math.random());
      rand2 = Math.floor(255 * Math.random());
      rand3 = Math.floor(255 * Math.random());
      users[_i2]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);

      users[_i2]['gradient'].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));

      users[_i2]['gradient'].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));

      var temp = void 0;

      var tempDates = users[_i2]['date'].map(function (i) {
        return i;
      });

      for (var _j = 0; _j < dates.length; _j++) {
        if (dates[_j] != tempDates[_j] && tempDates[_j] != undefined) {
          temp = users[_i2]['weight'][_j];
          users[_i2]['weight'][_j] = (users[_i2]['weight'][_j - 1] + users[_i2]['weight'][_j]) / 2;
          users[_i2]['weight'][_j + 1] = temp;

          if (tempDates[_j + 1] == undefined) {
            tempDates[_j + 1] = dates[_j];
          }
        } else {
          if (_j < dates.length - 1 && tempDates[_j + 1] == undefined) {
            tempDates[_j + 1] = dates[_j + 1];
            temp = users[_i2]['weight'][_j];
            users[_i2]['weight'][_j + 1] = temp;
          }
        }
      }

      if (users[_i2]['user'] == usernameTemplate) {
        chartWeight.data.datasets.push({
          label: users[_i2]['user'],
          data: users[_i2]['weight'],
          backgroundColor: users[_i2]['gradient'],
          minBarLength: 100,
          borderWidth: 5,
          borderColor: '#6573e0'
        });
      } else {
        chartWeight.data.datasets.push({
          label: users[_i2]['user'],
          data: users[_i2]['weight'],
          backgroundColor: users[_i2]['gradient'],
          minBarLength: 100,
          borderWidth: 2,
          borderColor: '#303030'
        });
      }
    }

    ;
    chartWeight.update();
    var chartHeight = new Chart(myChartHeight, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
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
    chartHeight.data.labels = dates;

    for (var _i3 = 0; _i3 < users.length; _i3++) {
      rand1 = Math.floor(255 * Math.random());
      rand2 = Math.floor(255 * Math.random());
      rand3 = Math.floor(255 * Math.random());
      users[_i3]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);

      users[_i3]['gradient'].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));

      users[_i3]['gradient'].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));

      var _temp = void 0;

      var _tempDates = users[_i3]['date'].map(function (i) {
        return i;
      });

      for (var _j2 = 0; _j2 < dates.length; _j2++) {
        if (dates[_j2] != _tempDates[_j2] && _tempDates[_j2] != undefined) {
          _temp = users[_i3]['height'][_j2];
          users[_i3]['height'][_j2] = (users[_i3]['height'][_j2 - 1] + users[_i3]['height'][_j2]) / 2;
          users[_i3]['height'][_j2 + 1] = _temp;

          if (_tempDates[_j2 + 1] == undefined) {
            _tempDates[_j2 + 1] = dates[_j2];
          }
        } else {
          if (_j2 < dates.length - 1 && _tempDates[_j2 + 1] == undefined) {
            _tempDates[_j2 + 1] = dates[_j2 + 1];
            _temp = users[_i3]['height'][_j2];
            users[_i3]['height'][_j2 + 1] = _temp;
          }
        }
      }

      if (users[_i3]['user'] == usernameTemplate) {
        chartHeight.data.datasets.push({
          label: users[_i3]['user'],
          data: users[_i3]['height'],
          backgroundColor: users[_i3]['gradient'],
          minBarLength: 100,
          borderWidth: 5,
          borderColor: '#6573e0'
        });
      } else {
        chartHeight.data.datasets.push({
          label: users[_i3]['user'],
          data: users[_i3]['height'],
          backgroundColor: users[_i3]['gradient'],
          minBarLength: 100,
          borderWidth: 2,
          borderColor: '#303030'
        });
      }
    }

    ;
    chartHeight.update();
    var chartChest = new Chart(myChartChest, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
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
    chartChest.data.labels = dates;

    for (var _i4 = 0; _i4 < users.length; _i4++) {
      rand1 = Math.floor(255 * Math.random());
      rand2 = Math.floor(255 * Math.random());
      rand3 = Math.floor(255 * Math.random());
      users[_i4]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);

      users[_i4]['gradient'].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));

      users[_i4]['gradient'].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));

      var _temp2 = void 0;

      var _tempDates2 = users[_i4]['date'].map(function (i) {
        return i;
      });

      for (var _j3 = 0; _j3 < dates.length; _j3++) {
        if (dates[_j3] != _tempDates2[_j3] && _tempDates2[_j3] != undefined) {
          _temp2 = users[_i4]['chest'][_j3];
          users[_i4]['chest'][_j3] = (users[_i4]['chest'][_j3 - 1] + users[_i4]['chest'][_j3]) / 2;
          users[_i4]['chest'][_j3 + 1] = _temp2;

          if (_tempDates2[_j3 + 1] == undefined) {
            _tempDates2[_j3 + 1] = dates[_j3];
          }
        } else {
          if (_j3 < dates.length - 1 && _tempDates2[_j3 + 1] == undefined) {
            _tempDates2[_j3 + 1] = dates[_j3 + 1];
            _temp2 = users[_i4]['chest'][_j3];
            users[_i4]['chest'][_j3 + 1] = _temp2;
          }
        }
      }

      if (users[_i4]['user'] == usernameTemplate) {
        chartChest.data.datasets.push({
          label: users[_i4]['user'],
          data: users[_i4]['chest'],
          backgroundColor: users[_i4]['gradient'],
          minBarLength: 100,
          borderWidth: 5,
          borderColor: '#6573e0'
        });
      } else {
        chartChest.data.datasets.push({
          label: users[_i4]['user'],
          data: users[_i4]['chest'],
          backgroundColor: users[_i4]['gradient'],
          minBarLength: 100,
          borderWidth: 2,
          borderColor: '#303030'
        });
      }
    }

    ;
    chartChest.update();
    var chartBicep = new Chart(myChartBicep, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
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
    chartBicep.data.labels = dates;

    for (var _i5 = 0; _i5 < users.length; _i5++) {
      rand1 = Math.floor(255 * Math.random());
      rand2 = Math.floor(255 * Math.random());
      rand3 = Math.floor(255 * Math.random());
      users[_i5]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);

      users[_i5]['gradient'].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));

      users[_i5]['gradient'].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));

      var _temp3 = void 0;

      var _tempDates3 = users[_i5]['date'].map(function (i) {
        return i;
      });

      for (var _j4 = 0; _j4 < dates.length; _j4++) {
        if (dates[_j4] != _tempDates3[_j4] && _tempDates3[_j4] != undefined) {
          _temp3 = users[_i5]['bicep'][_j4];
          users[_i5]['bicep'][_j4] = (users[_i5]['bicep'][_j4 - 1] + users[_i5]['bicep'][_j4]) / 2;
          users[_i5]['bicep'][_j4 + 1] = _temp3;

          if (_tempDates3[_j4 + 1] == undefined) {
            _tempDates3[_j4 + 1] = dates[_j4];
          }
        } else {
          if (_j4 < dates.length - 1 && _tempDates3[_j4 + 1] == undefined) {
            _tempDates3[_j4 + 1] = dates[_j4 + 1];
            _temp3 = users[_i5]['bicep'][_j4];
            users[_i5]['bicep'][_j4 + 1] = _temp3;
          }
        }
      }

      if (users[_i5]['user'] == usernameTemplate) {
        chartBicep.data.datasets.push({
          label: users[_i5]['user'],
          data: users[_i5]['bicep'],
          backgroundColor: users[_i5]['gradient'],
          minBarLength: 100,
          borderWidth: 5,
          borderColor: '#6573e0'
        });
      } else {
        chartBicep.data.datasets.push({
          label: users[_i5]['user'],
          data: users[_i5]['bicep'],
          backgroundColor: users[_i5]['gradient'],
          minBarLength: 100,
          borderWidth: 2,
          borderColor: '#303030'
        });
      }
    }

    ;
    chartBicep.update();
    var chartHips = new Chart(myChartHips, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
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
    chartHips.data.labels = dates;

    for (var _i6 = 0; _i6 < users.length; _i6++) {
      rand1 = Math.floor(255 * Math.random());
      rand2 = Math.floor(255 * Math.random());
      rand3 = Math.floor(255 * Math.random());
      users[_i6]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);

      users[_i6]['gradient'].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));

      users[_i6]['gradient'].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));

      var _temp4 = void 0;

      var _tempDates4 = users[_i6]['date'].map(function (i) {
        return i;
      });

      for (var _j5 = 0; _j5 < dates.length; _j5++) {
        if (dates[_j5] != _tempDates4[_j5] && _tempDates4[_j5] != undefined) {
          _temp4 = users[_i6]['hips'][_j5];
          users[_i6]['hips'][_j5] = (users[_i6]['hips'][_j5 - 1] + users[_i6]['hips'][_j5]) / 2;
          users[_i6]['hips'][_j5 + 1] = _temp4;

          if (_tempDates4[_j5 + 1] == undefined) {
            _tempDates4[_j5 + 1] = dates[_j5];
          }
        } else {
          if (_j5 < dates.length - 1 && _tempDates4[_j5 + 1] == undefined) {
            _tempDates4[_j5 + 1] = dates[_j5 + 1];
            _temp4 = users[_i6]['hips'][_j5];
            users[_i6]['hips'][_j5 + 1] = _temp4;
          }
        }
      }

      if (users[_i6]['user'] == usernameTemplate) {
        chartHips.data.datasets.push({
          label: users[_i6]['user'],
          data: users[_i6]['hips'],
          backgroundColor: users[_i6]['gradient'],
          minBarLength: 100,
          borderWidth: 5,
          borderColor: '#6573e0'
        });
      } else {
        chartHips.data.datasets.push({
          label: users[_i6]['user'],
          data: users[_i6]['hips'],
          backgroundColor: users[_i6]['gradient'],
          minBarLength: 100,
          borderWidth: 2,
          borderColor: '#303030'
        });
      }
    }

    ;
    chartHips.update();
    var chartThigh = new Chart(myChartThigh, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
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
    chartThigh.data.labels = dates;

    for (var _i7 = 0; _i7 < users.length; _i7++) {
      rand1 = Math.floor(255 * Math.random());
      rand2 = Math.floor(255 * Math.random());
      rand3 = Math.floor(255 * Math.random());
      users[_i7]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);

      users[_i7]['gradient'].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));

      users[_i7]['gradient'].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));

      var _temp5 = void 0;

      var _tempDates5 = users[_i7]['date'].map(function (i) {
        return i;
      });

      for (var _j6 = 0; _j6 < dates.length; _j6++) {
        if (dates[_j6] != _tempDates5[_j6] && _tempDates5[_j6] != undefined) {
          _temp5 = users[_i7]['thigh'][_j6];
          users[_i7]['thigh'][_j6] = (users[_i7]['thigh'][_j6 - 1] + users[_i7]['thigh'][_j6]) / 2;
          users[_i7]['thigh'][_j6 + 1] = _temp5;

          if (_tempDates5[_j6 + 1] == undefined) {
            _tempDates5[_j6 + 1] = dates[_j6];
          }
        } else {
          if (_j6 < dates.length - 1 && _tempDates5[_j6 + 1] == undefined) {
            _tempDates5[_j6 + 1] = dates[_j6 + 1];
            _temp5 = users[_i7]['thigh'][_j6];
            users[_i7]['thigh'][_j6 + 1] = _temp5;
          }
        }
      }

      if (users[_i7]['user'] == usernameTemplate) {
        chartThigh.data.datasets.push({
          label: users[_i7]['user'],
          data: users[_i7]['thigh'],
          backgroundColor: users[_i7]['gradient'],
          minBarLength: 100,
          borderWidth: 5,
          borderColor: '#6573e0'
        });
      } else {
        chartThigh.data.datasets.push({
          label: users[_i7]['user'],
          data: users[_i7]['thigh'],
          backgroundColor: users[_i7]['gradient'],
          minBarLength: 100,
          borderWidth: 2,
          borderColor: '#303030'
        });
      }
    }

    ;
    chartThigh.update();
    var chartWaist = new Chart(myChartWaist, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
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
    chartWaist.data.labels = dates;

    for (var _i8 = 0; _i8 < users.length; _i8++) {
      rand1 = Math.floor(255 * Math.random());
      rand2 = Math.floor(255 * Math.random());
      rand3 = Math.floor(255 * Math.random());
      users[_i8]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);

      users[_i8]['gradient'].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));

      users[_i8]['gradient'].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));

      var _temp6 = void 0;

      var _tempDates6 = users[_i8]['date'].map(function (i) {
        return i;
      });

      for (var _j7 = 0; _j7 < dates.length; _j7++) {
        if (dates[_j7] != _tempDates6[_j7] && _tempDates6[_j7] != undefined) {
          _temp6 = users[_i8]['waist'][_j7];
          users[_i8]['waist'][_j7] = (users[_i8]['waist'][_j7 - 1] + users[_i8]['waist'][_j7]) / 2;
          users[_i8]['waist'][_j7 + 1] = _temp6;

          if (_tempDates6[_j7 + 1] == undefined) {
            _tempDates6[_j7 + 1] = dates[_j7];
          }
        } else {
          if (_j7 < dates.length - 1 && _tempDates6[_j7 + 1] == undefined) {
            _tempDates6[_j7 + 1] = dates[_j7 + 1];
            _temp6 = users[_i8]['waist'][_j7];
            users[_i8]['waist'][_j7 + 1] = _temp6;
          }
        }
      }

      if (users[_i8]['user'] == usernameTemplate) {
        chartWaist.data.datasets.push({
          label: users[_i8]['user'],
          data: users[_i8]['waist'],
          backgroundColor: users[_i8]['gradient'],
          minBarLength: 100,
          borderWidth: 5,
          borderColor: '#6573e0'
        });
      } else {
        chartWaist.data.datasets.push({
          label: users[_i8]['user'],
          data: users[_i8]['waist'],
          backgroundColor: users[_i8]['gradient'],
          minBarLength: 100,
          borderWidth: 2,
          borderColor: '#303030'
        });
      }
    }

    ;
    chartWaist.update();
    var chartArms = new Chart(myChartArms, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
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
    chartArms.data.labels = dates;

    for (var _i9 = 0; _i9 < users.length; _i9++) {
      rand1 = Math.floor(255 * Math.random());
      rand2 = Math.floor(255 * Math.random());
      rand3 = Math.floor(255 * Math.random());
      users[_i9]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);

      users[_i9]['gradient'].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));

      users[_i9]['gradient'].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));

      var _temp7 = void 0;

      var _tempDates7 = users[_i9]['date'].map(function (i) {
        return i;
      });

      for (var _j8 = 0; _j8 < dates.length; _j8++) {
        if (dates[_j8] != _tempDates7[_j8] && _tempDates7[_j8] != undefined) {
          _temp7 = users[_i9]['arms'][_j8];
          users[_i9]['arms'][_j8] = (users[_i9]['arms'][_j8 - 1] + users[_i9]['arms'][_j8]) / 2;
          users[_i9]['arms'][_j8 + 1] = _temp7;

          if (_tempDates7[_j8 + 1] == undefined) {
            _tempDates7[_j8 + 1] = dates[_j8];
          }
        } else {
          if (_j8 < dates.length - 1 && _tempDates7[_j8 + 1] == undefined) {
            _tempDates7[_j8 + 1] = dates[_j8 + 1];
            _temp7 = users[_i9]['arms'][_j8];
            users[_i9]['arms'][_j8 + 1] = _temp7;
          }
        }
      }

      if (users[_i9]['user'] == usernameTemplate) {
        chartArms.data.datasets.push({
          label: users[_i9]['user'],
          data: users[_i9]['arms'],
          backgroundColor: users[_i9]['gradient'],
          minBarLength: 100,
          borderWidth: 5,
          borderColor: '#6573e0'
        });
      } else {
        chartArms.data.datasets.push({
          label: users[_i9]['user'],
          data: users[_i9]['arms'],
          backgroundColor: users[_i9]['gradient'],
          minBarLength: 100,
          borderWidth: 2,
          borderColor: '#303030'
        });
      }
    }

    ;
    chartArms.update();
  });
}

function renderComparisionSex(usernameTemplate) {
  fetch('../../sendjsoncompare2').then(function (res) {
    return res.json();
  }).then(function (out) {
    var result = out.survey_results;
    var users = [];
    var i = 0;

    for (var key in result) {
      users[i] = ['user', 'weight', 'height', 'chest', 'bicep', 'thigh', 'waist', 'hips', 'arms', 'stress', 'date', 'gradient'];
      users[i]['user'] = key;
      users[i]['weight'] = result[key]['weight'];
      users[i]['height'] = result[key]['height'];
      users[i]['chest'] = result[key]['chest'];
      users[i]['bicep'] = result[key]['bicep'];
      users[i]['thigh'] = result[key]['thigh'];
      users[i]['waist'] = result[key]['waist'];
      users[i]['hips'] = result[key]['hips'];
      users[i]['arms'] = result[key]['arms'];
      users[i]['stress'] = result[key]['stress'];
      users[i]['date'] = result[key]['date'];
      i++;
    }

    console.log(users[3]['date']);
    var dates = [];
    var j = 0;

    for (var _i10 = 0; _i10 < users.length; _i10++) {
      for (var date in users[_i10]['date']) {
        if (!dates.includes(users[_i10]['date'][date])) {
          dates[j] = users[_i10]['date'][date];
          j++;
        }
      }
    }

    dates.sort(function (a, b) {
      var da = new Date(a).getTime();
      var db = new Date(b).getTime();
      return da < db ? -1 : da > db ? 1 : 0;
    });
    var myChartWeight = document.getElementById("chartWeight2").getContext('2d');
    var myChartHeight = document.getElementById("chartHeight2").getContext('2d');
    var myChartChest = document.getElementById("chartChest2").getContext('2d');
    var myChartBicep = document.getElementById("chartBicep2").getContext('2d');
    var myChartThigh = document.getElementById("chartThigh2").getContext('2d');
    var myChartHips = document.getElementById("chartHips2").getContext('2d');
    var myChartWaist = document.getElementById("chartWaist2").getContext('2d');
    var myChartArms = document.getElementById("chartArms2").getContext('2d');
    var chartWeight2 = new Chart(myChartWeight, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
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
    chartWeight2.data.labels = dates;
    var rand1, rand2, rand3;

    for (var _i11 = 0; _i11 < users.length; _i11++) {
      rand1 = Math.floor(255 * Math.random());
      rand2 = Math.floor(255 * Math.random());
      rand3 = Math.floor(255 * Math.random());
      users[_i11]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);

      users[_i11]['gradient'].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));

      users[_i11]['gradient'].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));

      var temp = void 0;

      var tempDates = users[_i11]['date'].map(function (i) {
        return i;
      });

      for (var _j9 = 0; _j9 < dates.length; _j9++) {
        if (dates[_j9] != tempDates[_j9] && tempDates[_j9] != undefined) {
          temp = users[_i11]['weight'][_j9];
          users[_i11]['weight'][_j9] = (users[_i11]['weight'][_j9 - 1] + users[_i11]['weight'][_j9]) / 2;
          users[_i11]['weight'][_j9 + 1] = temp;

          if (tempDates[_j9 + 1] == undefined) {
            tempDates[_j9 + 1] = dates[_j9];
          }
        } else {
          if (_j9 < dates.length - 1 && tempDates[_j9 + 1] == undefined) {
            tempDates[_j9 + 1] = dates[_j9 + 1];
            temp = users[_i11]['weight'][_j9];
            users[_i11]['weight'][_j9 + 1] = temp;
          }
        }
      }

      if (users[_i11]['user'] == usernameTemplate) {
        chartWeight2.data.datasets.push({
          label: users[_i11]['user'],
          data: users[_i11]['weight'],
          backgroundColor: users[_i11]['gradient'],
          minBarLength: 50,
          borderWidth: 5,
          borderColor: '#6573e0'
        });
      } else {
        chartWeight2.data.datasets.push({
          label: users[_i11]['user'],
          data: users[_i11]['weight'],
          backgroundColor: users[_i11]['gradient'],
          minBarLength: 50,
          borderWidth: 2,
          borderColor: '#303030'
        });
      }
    }

    ;
    chartWeight2.update();
    var chartHeight2 = new Chart(myChartHeight, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
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
    chartHeight2.data.labels = dates;

    for (var _i12 = 0; _i12 < users.length; _i12++) {
      rand1 = Math.floor(255 * Math.random());
      rand2 = Math.floor(255 * Math.random());
      rand3 = Math.floor(255 * Math.random());
      users[_i12]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);

      users[_i12]['gradient'].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));

      users[_i12]['gradient'].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));

      var _temp8 = void 0;

      var _tempDates8 = users[_i12]['date'].map(function (i) {
        return i;
      });

      for (var _j10 = 0; _j10 < dates.length; _j10++) {
        if (dates[_j10] != _tempDates8[_j10] && _tempDates8[_j10] != undefined) {
          _temp8 = users[_i12]['height'][_j10];
          users[_i12]['height'][_j10] = (users[_i12]['height'][_j10 - 1] + users[_i12]['height'][_j10]) / 2;
          users[_i12]['height'][_j10 + 1] = _temp8;

          if (_tempDates8[_j10 + 1] == undefined) {
            _tempDates8[_j10 + 1] = dates[_j10];
          }
        } else {
          if (_j10 < dates.length - 1 && _tempDates8[_j10 + 1] == undefined) {
            _tempDates8[_j10 + 1] = dates[_j10 + 1];
            _temp8 = users[_i12]['height'][_j10];
            users[_i12]['height'][_j10 + 1] = _temp8;
          }
        }
      }

      if (users[_i12]['user'] == usernameTemplate) {
        chartHeight2.data.datasets.push({
          label: users[_i12]['user'],
          data: users[_i12]['height'],
          backgroundColor: users[_i12]['gradient'],
          minBarLength: 50,
          borderWidth: 5,
          borderColor: '#6573e0'
        });
      } else {
        chartHeight2.data.datasets.push({
          label: users[_i12]['user'],
          data: users[_i12]['height'],
          backgroundColor: users[_i12]['gradient'],
          minBarLength: 50,
          borderWidth: 2,
          borderColor: '#303030'
        });
      }
    }

    ;
    chartHeight2.update();
    var chartChest2 = new Chart(myChartChest, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
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
    chartChest2.data.labels = dates;

    for (var _i13 = 0; _i13 < users.length; _i13++) {
      rand1 = Math.floor(255 * Math.random());
      rand2 = Math.floor(255 * Math.random());
      rand3 = Math.floor(255 * Math.random());
      users[_i13]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);

      users[_i13]['gradient'].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));

      users[_i13]['gradient'].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));

      var _temp9 = void 0;

      var _tempDates9 = users[_i13]['date'].map(function (i) {
        return i;
      });

      for (var _j11 = 0; _j11 < dates.length; _j11++) {
        if (dates[_j11] != _tempDates9[_j11] && _tempDates9[_j11] != undefined) {
          _temp9 = users[_i13]['chest'][_j11];
          users[_i13]['chest'][_j11] = (users[_i13]['chest'][_j11 - 1] + users[_i13]['chest'][_j11]) / 2;
          users[_i13]['chest'][_j11 + 1] = _temp9;

          if (_tempDates9[_j11 + 1] == undefined) {
            _tempDates9[_j11 + 1] = dates[_j11];
          }
        } else {
          if (_j11 < dates.length - 1 && _tempDates9[_j11 + 1] == undefined) {
            _tempDates9[_j11 + 1] = dates[_j11 + 1];
            _temp9 = users[_i13]['chest'][_j11];
            users[_i13]['chest'][_j11 + 1] = _temp9;
          }
        }
      }

      if (users[_i13]['user'] == usernameTemplate) {
        chartChest2.data.datasets.push({
          label: users[_i13]['user'],
          data: users[_i13]['chest'],
          backgroundColor: users[_i13]['gradient'],
          minBarLength: 50,
          borderWidth: 5,
          borderColor: '#6573e0'
        });
      } else {
        chartChest2.data.datasets.push({
          label: users[_i13]['user'],
          data: users[_i13]['chest'],
          backgroundColor: users[_i13]['gradient'],
          minBarLength: 50,
          borderWidth: 2,
          borderColor: '#303030'
        });
      }
    }

    ;
    chartChest2.update();
    var chartBicep2 = new Chart(myChartBicep, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
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
    chartBicep2.data.labels = dates;

    for (var _i14 = 0; _i14 < users.length; _i14++) {
      rand1 = Math.floor(255 * Math.random());
      rand2 = Math.floor(255 * Math.random());
      rand3 = Math.floor(255 * Math.random());
      users[_i14]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);

      users[_i14]['gradient'].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));

      users[_i14]['gradient'].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));

      var _temp10 = void 0;

      var _tempDates10 = users[_i14]['date'].map(function (i) {
        return i;
      });

      for (var _j12 = 0; _j12 < dates.length; _j12++) {
        if (dates[_j12] != _tempDates10[_j12] && _tempDates10[_j12] != undefined) {
          _temp10 = users[_i14]['bicep'][_j12];
          users[_i14]['bicep'][_j12] = (users[_i14]['bicep'][_j12 - 1] + users[_i14]['bicep'][_j12]) / 2;
          users[_i14]['bicep'][_j12 + 1] = _temp10;

          if (_tempDates10[_j12 + 1] == undefined) {
            _tempDates10[_j12 + 1] = dates[_j12];
          }
        } else {
          if (_j12 < dates.length - 1 && _tempDates10[_j12 + 1] == undefined) {
            _tempDates10[_j12 + 1] = dates[_j12 + 1];
            _temp10 = users[_i14]['bicep'][_j12];
            users[_i14]['bicep'][_j12 + 1] = _temp10;
          }
        }
      }

      if (users[_i14]['user'] == usernameTemplate) {
        chartBicep2.data.datasets.push({
          label: users[_i14]['user'],
          data: users[_i14]['bicep'],
          backgroundColor: users[_i14]['gradient'],
          minBarLength: 50,
          borderWidth: 5,
          borderColor: '#6573e0'
        });
      } else {
        chartBicep2.data.datasets.push({
          label: users[_i14]['user'],
          data: users[_i14]['bicep'],
          backgroundColor: users[_i14]['gradient'],
          minBarLength: 50,
          borderWidth: 2,
          borderColor: '#303030'
        });
      }
    }

    ;
    chartBicep2.update();
    var chartHips2 = new Chart(myChartHips, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
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
    chartHips2.data.labels = dates;

    for (var _i15 = 0; _i15 < users.length; _i15++) {
      rand1 = Math.floor(255 * Math.random());
      rand2 = Math.floor(255 * Math.random());
      rand3 = Math.floor(255 * Math.random());
      users[_i15]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);

      users[_i15]['gradient'].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));

      users[_i15]['gradient'].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));

      var _temp11 = void 0;

      var _tempDates11 = users[_i15]['date'].map(function (i) {
        return i;
      });

      for (var _j13 = 0; _j13 < dates.length; _j13++) {
        if (dates[_j13] != _tempDates11[_j13] && _tempDates11[_j13] != undefined) {
          _temp11 = users[_i15]['hips'][_j13];
          users[_i15]['hips'][_j13] = (users[_i15]['hips'][_j13 - 1] + users[_i15]['hips'][_j13]) / 2;
          users[_i15]['hips'][_j13 + 1] = _temp11;

          if (_tempDates11[_j13 + 1] == undefined) {
            _tempDates11[_j13 + 1] = dates[_j13];
          }
        } else {
          if (_j13 < dates.length - 1 && _tempDates11[_j13 + 1] == undefined) {
            _tempDates11[_j13 + 1] = dates[_j13 + 1];
            _temp11 = users[_i15]['hips'][_j13];
            users[_i15]['hips'][_j13 + 1] = _temp11;
          }
        }
      }

      if (users[_i15]['user'] == usernameTemplate) {
        chartHips2.data.datasets.push({
          label: users[_i15]['user'],
          data: users[_i15]['hips'],
          backgroundColor: users[_i15]['gradient'],
          minBarLength: 50,
          borderWidth: 5,
          borderColor: '#6573e0'
        });
      } else {
        chartHips2.data.datasets.push({
          label: users[_i15]['user'],
          data: users[_i15]['hips'],
          backgroundColor: users[_i15]['gradient'],
          minBarLength: 50,
          borderWidth: 2,
          borderColor: '#303030'
        });
      }
    }

    ;
    chartHips2.update();
    var chartThigh2 = new Chart(myChartThigh, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
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
    chartThigh2.data.labels = dates;

    for (var _i16 = 0; _i16 < users.length; _i16++) {
      rand1 = Math.floor(255 * Math.random());
      rand2 = Math.floor(255 * Math.random());
      rand3 = Math.floor(255 * Math.random());
      users[_i16]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);

      users[_i16]['gradient'].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));

      users[_i16]['gradient'].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));

      var _temp12 = void 0;

      var _tempDates12 = users[_i16]['date'].map(function (i) {
        return i;
      });

      for (var _j14 = 0; _j14 < dates.length; _j14++) {
        if (dates[_j14] != _tempDates12[_j14] && _tempDates12[_j14] != undefined) {
          _temp12 = users[_i16]['thigh'][_j14];
          users[_i16]['thigh'][_j14] = (users[_i16]['thigh'][_j14 - 1] + users[_i16]['thigh'][_j14]) / 2;
          users[_i16]['thigh'][_j14 + 1] = _temp12;

          if (_tempDates12[_j14 + 1] == undefined) {
            _tempDates12[_j14 + 1] = dates[_j14];
          }
        } else {
          if (_j14 < dates.length - 1 && _tempDates12[_j14 + 1] == undefined) {
            _tempDates12[_j14 + 1] = dates[_j14 + 1];
            _temp12 = users[_i16]['thigh'][_j14];
            users[_i16]['thigh'][_j14 + 1] = _temp12;
          }
        }
      }

      if (users[_i16]['user'] == usernameTemplate) {
        chartThigh2.data.datasets.push({
          label: users[_i16]['user'],
          data: users[_i16]['thigh'],
          backgroundColor: users[_i16]['gradient'],
          minBarLength: 50,
          borderWidth: 5,
          borderColor: '#6573e0'
        });
      } else {
        chartThigh2.data.datasets.push({
          label: users[_i16]['user'],
          data: users[_i16]['thigh'],
          backgroundColor: users[_i16]['gradient'],
          minBarLength: 50,
          borderWidth: 2,
          borderColor: '#303030'
        });
      }
    }

    ;
    chartThigh2.update();
    var chartWaist2 = new Chart(myChartWaist, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
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
    chartWaist2.data.labels = dates;

    for (var _i17 = 0; _i17 < users.length; _i17++) {
      rand1 = Math.floor(255 * Math.random());
      rand2 = Math.floor(255 * Math.random());
      rand3 = Math.floor(255 * Math.random());
      users[_i17]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);

      users[_i17]['gradient'].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));

      users[_i17]['gradient'].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));

      var _temp13 = void 0;

      var _tempDates13 = users[_i17]['date'].map(function (i) {
        return i;
      });

      for (var _j15 = 0; _j15 < dates.length; _j15++) {
        if (dates[_j15] != _tempDates13[_j15] && _tempDates13[_j15] != undefined) {
          _temp13 = users[_i17]['waist'][_j15];
          users[_i17]['waist'][_j15] = (users[_i17]['waist'][_j15 - 1] + users[_i17]['waist'][_j15]) / 2;
          users[_i17]['waist'][_j15 + 1] = _temp13;

          if (_tempDates13[_j15 + 1] == undefined) {
            _tempDates13[_j15 + 1] = dates[_j15];
          }
        } else {
          if (_j15 < dates.length - 1 && _tempDates13[_j15 + 1] == undefined) {
            _tempDates13[_j15 + 1] = dates[_j15 + 1];
            _temp13 = users[_i17]['waist'][_j15];
            users[_i17]['waist'][_j15 + 1] = _temp13;
          }
        }
      }

      if (users[_i17]['user'] == usernameTemplate) {
        chartWaist2.data.datasets.push({
          label: users[_i17]['user'],
          data: users[_i17]['waist'],
          backgroundColor: users[_i17]['gradient'],
          minBarLength: 50,
          borderWidth: 5,
          borderColor: '#6573e0'
        });
      } else {
        chartWaist2.data.datasets.push({
          label: users[_i17]['user'],
          data: users[_i17]['waist'],
          backgroundColor: users[_i17]['gradient'],
          minBarLength: 50,
          borderWidth: 2,
          borderColor: '#303030'
        });
      }
    }

    ;
    chartWaist2.update();
    var chartArms2 = new Chart(myChartArms, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: 'YYYY-MM-DD',
              unit: 'day',
              displayFormats: {
                day: 'YYYY-MM-DD'
              }
            },
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
    chartArms2.data.labels = dates;

    for (var _i18 = 0; _i18 < users.length; _i18++) {
      rand1 = Math.floor(255 * Math.random());
      rand2 = Math.floor(255 * Math.random());
      rand3 = Math.floor(255 * Math.random());
      users[_i18]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);

      users[_i18]['gradient'].addColorStop(0, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",1)"));

      users[_i18]['gradient'].addColorStop(1, "rgba(".concat(rand1, ",").concat(rand2, ",").concat(rand3, ",0)"));

      var _temp14 = void 0;

      var _tempDates14 = users[_i18]['date'].map(function (i) {
        return i;
      });

      for (var _j16 = 0; _j16 < dates.length; _j16++) {
        if (dates[_j16] != _tempDates14[_j16] && _tempDates14[_j16] != undefined) {
          _temp14 = users[_i18]['arms'][_j16];
          users[_i18]['arms'][_j16] = (users[_i18]['arms'][_j16 - 1] + users[_i18]['arms'][_j16]) / 2;
          users[_i18]['arms'][_j16 + 1] = _temp14;

          if (_tempDates14[_j16 + 1] == undefined) {
            _tempDates14[_j16 + 1] = dates[_j16];
          }
        } else {
          if (_j16 < dates.length - 1 && _tempDates14[_j16 + 1] == undefined) {
            _tempDates14[_j16 + 1] = dates[_j16 + 1];
            _temp14 = users[_i18]['arms'][_j16];
            users[_i18]['arms'][_j16 + 1] = _temp14;
          }
        }
      }

      if (users[_i18]['user'] == usernameTemplate) {
        chartArms2.data.datasets.push({
          label: users[_i18]['user'],
          data: users[_i18]['arms'],
          backgroundColor: users[_i18]['gradient'],
          minBarLength: 50,
          borderWidth: 5,
          borderColor: '#6573e0'
        });
      } else {
        chartArms2.data.datasets.push({
          label: users[_i18]['user'],
          data: users[_i18]['arms'],
          backgroundColor: users[_i18]['gradient'],
          minBarLength: 50,
          borderWidth: 2,
          borderColor: '#303030'
        });
      }
    }

    ;
    chartArms2.update();
  });
}