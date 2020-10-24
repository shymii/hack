let labels = ["1990", "1995","2000", "2005", "2010", "2015"];

let africaOb = [64.59, 70.22, 87.21, 85.58, 82.71, 79.38];
let asiaOb = [47.86, 58.32, 62.24, 67.53, 69.47, 72.52];
let australiaOb = [61.74, 60.00, 55.16, 49.23, 46.20, 43.57];
let southamericaOb = [73.57, 76.44, 74.83, 75.87, 76.70, 75.50];
let northamericaOb = [75.57, 77.00, 77.33, 74.47, 68.72, 68.22];
let europeOb = [97.42, 111.49, 107.35, 109.10, 96.87, 88.61];

var myPsychChart = document.getElementById("myPsychChart").getContext('2d');

var Pchart = new Chart(myPsychChart, {
    type:'line',
    data:{
        labels: labels,
        datasets: [
            {
                label: "Afryka",
                data: africaOb,
                backgroundColor: '#FFEA80',
                minBarLength: 100
            },
            {
                label: "Azja",
                data: asiaOb,
                backgroundColor: '#FFAA80',
                minBarLength: 100
            },
            {
                label: "Australia",
                data: australiaOb,
                backgroundColor: '#B3B300',
                minBarLength: 100
            },
            {
                label: "Ameryka Południowa",
                data: southamericaOb,
                backgroundColor: '#4DFF88',
                minBarLength: 100
            },
            {
                label: "Ameryka Północna",
                data: northamericaOb,
                backgroundColor: '#E14DFF',
                minBarLength: 100
            },
            {
                label: "Europa",
                data: europeOb,
                backgroundColor: '#4D6AFF',
                minBarLength: 100
            },
        ]
    },
    options:{
    }
})