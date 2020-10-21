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
  var chartWeight = new Chart(myChartWeight, {
    type: 'line',
    data: {
      labels: date,
      datasets: [{
        label: "waga [kg]",
        data: weight,
        backgroundColor: '#8b0000',
        minBarLength: 100
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false
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
    options: {
      responsive: false,
      maintainAspectRatio: false
    }
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
    options: {
      responsive: false,
      maintainAspectRatio: false // animation: {
      //     duration: 600
      // },

    }
  });
});