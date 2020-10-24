"use strict";

fetch('../../sendjsoncompare').then(function (res) {
  return res.json();
}).then(function (out) {
  var result = out.survey_results;
  var users = [];
  var i = 0;

  for (var key in result) {
    users[i] = ['user', 'weight', 'height', 'chest', 'bicep', 'thigh', 'waist', 'hips', 'arms', 'stress', 'date'];
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
  var myChartArms = document.getElementById("chartArms").getContext('2d'); // var stressTab = [0,0,0];
  // var stressLabel = ['niski', 'zrównoważony', 'wysoki'];
  // stress.forEach(el =>{
  //     if(el == 'niski'){
  //         console.log(el);
  //         stressTab[0]++; 
  //     }else if(el == 'zrównoważony'){
  //         stressTab[1]++;
  //         console.log(stressTab[1]);
  //     }else if(el == 'wysoki'){
  //         stressTab[2]++;
  //     }
  // });

  var gradient1 = myChartWeight.createLinearGradient(0, 0, 0, 400);
  gradient1.addColorStop(0, 'rgba(250,174,50,1)');
  gradient1.addColorStop(1, 'rgba(250,174,50,0)');
  var gradient2 = myChartHeight.createLinearGradient(0, 0, 0, 400);
  gradient2.addColorStop(0, 'rgba(150,174,50,1)');
  gradient2.addColorStop(1, 'rgba(150,174,50,0)');
  var gradient3 = myChartChest.createLinearGradient(0, 0, 0, 400);
  gradient3.addColorStop(0, 'rgba(150,74,50,1)');
  gradient3.addColorStop(1, 'rgba(150,74,50,0)');
  var gradient4 = myChartBicep.createLinearGradient(0, 0, 0, 400);
  gradient4.addColorStop(0, 'rgba(10,204,10,1)');
  gradient4.addColorStop(1, 'rgba(10,204,10,0)');
  var gradient5 = myChartHips.createLinearGradient(0, 0, 0, 400);
  gradient5.addColorStop(0, 'rgba(50,174,150,1)');
  gradient5.addColorStop(1, 'rgba(50,174,150,0)');
  var gradient6 = myChartThigh.createLinearGradient(0, 0, 0, 400);
  gradient6.addColorStop(0, 'rgba(50,20,50,1)');
  gradient6.addColorStop(1, 'rgba(50,20,50,0)');
  var gradient7 = myChartWaist.createLinearGradient(0, 0, 0, 400);
  gradient7.addColorStop(0, 'rgba(110,174,60,1)');
  gradient7.addColorStop(1, 'rgba(110,174,60,0)');
  var gradient8 = myChartArms.createLinearGradient(0, 0, 0, 400);
  gradient8.addColorStop(0, 'rgba(120,74,10,1)');
  gradient8.addColorStop(1, 'rgba(120,74,10,0)');
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

  for (var _i2 = 0; _i2 < users.length; _i2++) {
    var temp = void 0;

    for (var _j = 0; _j < dates.length; _j++) {
      if (dates[_j] != users[_i2]['date'][_j] && users[_i2]['date'][_j] != undefined) {
        temp = users[_i2]['weight'][_j];
        users[_i2]['weight'][_j] = (users[_i2]['weight'][_j - 1] + users[_i2]['weight'][_j]) / 2;
        users[_i2]['weight'][_j + 1] = temp;
      }
    }

    chartWeight.data.datasets.push({
      label: users[_i2]['user'],
      data: users[_i2]['weight'],
      backgroundColor: gradient1,
      minBarLength: 100,
      borderWidth: 5,
      borderColor: '#fff'
    });
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
    var _temp = void 0;

    for (var _j2 = 0; _j2 < dates.length; _j2++) {
      if (dates[_j2] != users[_i3]['date'][_j2] && users[_i3]['date'][_j2] != undefined) {
        _temp = users[_i3]['height'][_j2];
        users[_i3]['height'][_j2] = (users[_i3]['height'][_j2 - 1] + users[_i3]['height'][_j2]) / 2;
        users[_i3]['height'][_j2 + 1] = _temp;
      }
    }

    chartHeight.data.datasets.push({
      label: users[_i3]['user'],
      data: users[_i3]['height'],
      backgroundColor: gradient2,
      minBarLength: 100,
      borderWidth: 5,
      borderColor: '#fff'
    });
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
    var _temp2 = void 0;

    for (var _j3 = 0; _j3 < dates.length; _j3++) {
      if (dates[_j3] != users[_i4]['date'][_j3] && users[_i4]['date'][_j3] != undefined) {
        _temp2 = users[_i4]['chest'][_j3];
        users[_i4]['chest'][_j3] = (users[_i4]['chest'][_j3 - 1] + users[_i4]['chest'][_j3]) / 2;
        users[_i4]['chest'][_j3 + 1] = _temp2;
      }
    }

    chartChest.data.datasets.push({
      label: users[_i4]['user'],
      data: users[_i4]['chest'],
      backgroundColor: gradient3,
      minBarLength: 100,
      borderWidth: 5,
      borderColor: '#fff'
    });
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
    var _temp3 = void 0;

    for (var _j4 = 0; _j4 < dates.length; _j4++) {
      if (dates[_j4] != users[_i5]['date'][_j4] && users[_i5]['date'][_j4] != undefined) {
        _temp3 = users[_i5]['bicep'][_j4];
        users[_i5]['bicep'][_j4] = (users[_i5]['bicep'][_j4 - 1] + users[_i5]['bicep'][_j4]) / 2;
        users[_i5]['bicep'][_j4 + 1] = _temp3;
      }
    }

    chartBicep.data.datasets.push({
      label: users[_i5]['user'],
      data: users[_i5]['bicep'],
      backgroundColor: gradient4,
      minBarLength: 100,
      borderWidth: 5,
      borderColor: '#fff'
    });
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
    var _temp4 = void 0;

    for (var _j5 = 0; _j5 < dates.length; _j5++) {
      if (dates[_j5] != users[_i6]['date'][_j5] && users[_i6]['date'][_j5] != undefined) {
        _temp4 = users[_i6]['hips'][_j5];
        users[_i6]['hips'][_j5] = (users[_i6]['hips'][_j5 - 1] + users[_i6]['hips'][_j5]) / 2;
        users[_i6]['hips'][_j5 + 1] = _temp4;
      }
    }

    chartHips.data.datasets.push({
      label: users[_i6]['user'],
      data: users[_i6]['hips'],
      backgroundColor: gradient5,
      minBarLength: 100,
      borderWidth: 5,
      borderColor: '#fff'
    });
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
    var _temp5 = void 0;

    for (var _j6 = 0; _j6 < dates.length; _j6++) {
      if (dates[_j6] != users[_i7]['date'][_j6] && users[_i7]['date'][_j6] != undefined) {
        _temp5 = users[_i7]['thigh'][_j6];
        users[_i7]['thigh'][_j6] = (users[_i7]['thigh'][_j6 - 1] + users[_i7]['thigh'][_j6]) / 2;
        users[_i7]['thigh'][_j6 + 1] = _temp5;
      }
    }

    chartThigh.data.datasets.push({
      label: users[_i7]['user'],
      data: users[_i7]['thigh'],
      backgroundColor: gradient6,
      minBarLength: 100,
      borderWidth: 5,
      borderColor: '#fff'
    });
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
    var _temp6 = void 0;

    for (var _j7 = 0; _j7 < dates.length; _j7++) {
      if (dates[_j7] != users[_i8]['date'][_j7] && users[_i8]['date'][_j7] != undefined) {
        _temp6 = users[_i8]['waist'][_j7];
        users[_i8]['waist'][_j7] = (users[_i8]['waist'][_j7 - 1] + users[_i8]['waist'][_j7]) / 2;
        users[_i8]['waist'][_j7 + 1] = _temp6;
      }
    }

    chartWaist.data.datasets.push({
      label: users[_i8]['user'],
      data: users[_i8]['waist'],
      backgroundColor: gradient7,
      minBarLength: 100,
      borderWidth: 5,
      borderColor: '#fff'
    });
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
    var _temp7 = void 0;

    for (var _j8 = 0; _j8 < dates.length; _j8++) {
      if (dates[_j8] != users[_i9]['date'][_j8] && users[_i9]['date'][_j8] != undefined) {
        _temp7 = users[_i9]['arms'][_j8];
        users[_i9]['arms'][_j8] = (users[_i9]['arms'][_j8 - 1] + users[_i9]['arms'][_j8]) / 2;
        users[_i9]['arms'][_j8 + 1] = _temp7;
      }
    }

    chartArms.data.datasets.push({
      label: users[_i9]['user'],
      data: users[_i9]['arms'],
      backgroundColor: gradient8,
      minBarLength: 100,
      borderWidth: 5,
      borderColor: '#fff'
    });
  }

  ;
  chartArms.update();
});