"use strict";

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
          borderColor: '#fff'
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
          borderColor: '#fff'
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
          borderColor: '#fff'
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
          borderColor: '#fff'
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
          borderColor: '#fff'
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
          borderColor: '#fff'
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
          borderColor: '#fff'
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
          borderColor: '#fff'
        });
      }
    }

    ;
    chartArms.update();
  });
}