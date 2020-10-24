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
    options: {}
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
    type: 'line',
    data: {
      labels: date,
      datasets: [{
        label: "stres",
        data: stress,
        backgroundColor: '#32cd32',
        minBarLength: 100
      }]
    },
    options: {}
  });
});