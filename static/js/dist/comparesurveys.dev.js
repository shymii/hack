"use strict";

fetch('../sendjson').then(function (res) {
  return res.json();
}).then(function (out) {
  var weight = out.survey_results.weight;
  var height = out.survey_results.height;
  var chest = out.survey_results.chest;
  var bicep = out.survey_results.bicep;
  var thigh = out.survey_results.thigh;
  var waist = out.survey_results.waist;
  var hips = out.survey_results.hips;
  var arms = out.survey_results.arms;
  var stress = out.survey_results.stress;
  var date = out.survey_results.date;
  var myChartWeight = document.getElementById("chartWeight").getContext('2d');
  var myChartHeight = document.getElementById("chartHeight").getContext('2d');
  var myChartChest = document.getElementById("chartChest").getContext('2d');
  var myChartBicep = document.getElementById("chartBicep").getContext('2d');
  var myChartThigh = document.getElementById("chartThigh").getContext('2d');
  var myChartHips = document.getElementById("chartHips").getContext('2d');
  var myChartWaist = document.getElementById("chartWaist").getContext('2d');
  var myChartArms = document.getElementById("chartArms").getContext('2d');
  var myChartStress = document.getElementById("chartStress").getContext('2d');
  var stressTab = [0, 0, 0];
  var stressLabel = ['niski', 'zrównoważony', 'wysoki'];
  stress.forEach(function (el) {
    if (el == 'niski') {
      console.log(el);
      stressTab[0]++;
    } else if (el == 'zrównoważony') {
      stressTab[1]++;
      console.log(stressTab[1]);
    } else if (el == 'wysoki') {
      stressTab[2]++;
    }
  });
  var gradient = myChartWeight.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(250,174,50,1)');
  gradient.addColorStop(1, 'rgba(250,174,50,0)');
  var chartWeight = new Chart(myChartWeight, {
    type: 'line',
    data: {
      labels: date,
      datasets: [{
        label: "waga [kg]",
        data: weight,
        backgroundColor: gradient,
        minBarLength: 100,
        borderWidth: 5,
        borderColor: '#fff'
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          position: 'top',
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
  var chartHeight = new Chart(myChartHeight, {
    type: 'line',
    data: {
      labels: date,
      datasets: [{
        label: "wzrost [cm]",
        data: height,
        backgroundColor: '#696969',
        minBarLength: 100
      }]
    },
    options: {}
  });
  var chartChest = new Chart(myChartChest, {
    type: 'line',
    data: {
      labels: date,
      datasets: [{
        label: "klatka [cm]",
        data: chest,
        backgroundColor: '#32cd32',
        minBarLength: 100
      }]
    },
    options: {}
  });
  var chartBicep = new Chart(myChartBicep, {
    type: 'line',
    data: {
      labels: date,
      datasets: [{
        label: "biceps [cm]",
        data: bicep,
        backgroundColor: '#32cd32',
        minBarLength: 100
      }]
    },
    options: {}
  });
  var chartHips = new Chart(myChartHips, {
    type: 'line',
    data: {
      labels: date,
      datasets: [{
        label: "biodra [cm]",
        data: hips,
        backgroundColor: '#32cd32',
        minBarLength: 100
      }]
    },
    options: {}
  });
  var chartThigh = new Chart(myChartThigh, {
    type: 'line',
    data: {
      labels: date,
      datasets: [{
        label: "udo [cm]",
        data: thigh,
        backgroundColor: '#32cd32',
        minBarLength: 100
      }]
    },
    options: {}
  });
  var chartWaist = new Chart(myChartWaist, {
    type: 'line',
    data: {
      labels: date,
      datasets: [{
        label: "talia [cm]",
        data: waist,
        backgroundColor: '#32cd32',
        minBarLength: 100
      }]
    },
    options: {}
  });
  var chartArms = new Chart(myChartArms, {
    type: 'line',
    data: {
      labels: date,
      datasets: [{
        label: "barki [cm]",
        data: arms,
        backgroundColor: '#32cd32',
        minBarLength: 100
      }]
    },
    options: {}
  });
  var chartStress = new Chart(myChartStress, {
    type: 'doughnut',
    data: {
      labels: stressLabel,
      datasets: [{
        label: "stres",
        data: stressTab,
        backgroundColor: ['#fff', '#000', '#333'],
        minBarLength: 100
      }]
    },
    options: {}
  });
});