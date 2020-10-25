"use strict";

Chart.defaults.global.defaultFontColor = "#ccc8c9";
var labels = ["1990", "1995", "2000", "2005", "2010", "2015"];
var africaOb = [64.59, 70.22, 87.21, 85.58, 82.71, 79.38];
var asiaOb = [47.86, 58.32, 62.24, 67.53, 69.47, 72.52];
var australiaOb = [61.74, 60.00, 55.16, 49.23, 46.20, 43.57];
var southamericaOb = [73.57, 76.44, 74.83, 75.87, 76.70, 75.50];
var northamericaOb = [75.57, 77.00, 77.33, 74.47, 68.72, 68.22];
var europeOb = [97.42, 111.49, 107.35, 109.10, 96.87, 88.61];
var africaCal = 2624;
var asiaCal = 2779;
var australiaCal = 3276;
var southamericaCal = 3027;
var northamericaCal = 3663;
var europeCal = 3367;
var myPsychChart = document.getElementById("myPsychChart").getContext('2d');
var barChart = document.getElementById("myBarChart").getContext('2d');
var Pchart = new Chart(myPsychChart, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: "Afryka,",
      data: africaOb,
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      minBarLength: 100
    }, {
      label: "Azja",
      data: asiaOb,
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      minBarLength: 100
    }, {
      label: "Australia",
      data: australiaOb,
      backgroundColor: 'rgba(255, 206, 86, 0.6)',
      minBarLength: 100
    }, {
      label: "Ameryka Południowa",
      data: southamericaOb,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      minBarLength: 100
    }, {
      label: "Ameryka Północna",
      data: northamericaOb,
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      minBarLength: 100
    }, {
      label: "Europa",
      data: europeOb,
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
      minBarLength: 100
    }]
  },
  options: {
    legend: {
      onClick: null
    }
  }
});
var myBarChart = new Chart(barChart, {
  type: 'bar',
  data: {
    labels: ['Afryka', 'Azja', 'Ameryka Południowa', 'Ameryka Północna', 'Australia', 'Europa'],
    datasets: [{
      label: 'liczba kcal',
      data: [africaCal, asiaCal, southamericaCal, northamericaCal, australiaCal, europeCal],
      backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
      borderWidth: 1
    }]
  },
  options: {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});