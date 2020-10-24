Chart.defaults.global.defaultFontColor = "#FFFBFC";
Chart.defaults.global.defaultFontFamily = "'Work Sans', sans-serif";


let labels = ["1990", "1995","2000", "2005", "2010", "2015"];
        let africa = [9592, 9495, 14110, 18596, 22194, 26608];
        let asia = [17110, 23845, 28948, 31031, 48634, 60945];
        let australia = [3230, 4252, 3405, 3446, 3524, 3608];
        let southamerica = [8018, 11488, 13305, 16414, 16324, 16890];
        let northamerica = [24851, 30289, 37913, 42353, 44593, 44951];
        let europe = [82817, 92752, 87741, 86320, 92717, 99499];

        let females = [324570000, 371720000, 403940000, 435010000, 461990000, 491870000];
        let males = [326590000, 354070000, 381640000, 407880000, 431630000, 457070000];

        var myChart = document.getElementById("myChart").getContext('2d');
        var mySecondChart = document.getElementById("mySecondChart").getContext('2d');

        var chart = new Chart(myChart, {
            type:'line',
            data:{
                labels: labels,
                datasets: [
                    {
                        label: "Afryka",
                        data: africa,
                        backgroundColor: '#FFEA80',
                        minBarLength: 100
                    },
                    {
                        label: "Azja",
                        data: asia,
                        backgroundColor: '#FFAA80',
                        minBarLength: 100
                    },
                    {
                        label: "Australia",
                        data: australia,
                        backgroundColor: '#B3B300',
                        minBarLength: 100
                    },
                    {
                        label: "Ameryka Południowa",
                        data: southamerica,
                        backgroundColor: '#4DFF88',
                        minBarLength: 100
                    },
                    {
                        label: "Ameryka Północna",
                        data: northamerica,
                        backgroundColor: '#E14DFF',
                        minBarLength: 100
                    },
                    {
                        label: "Europa",
                        data: europe,
                        backgroundColor: '#4D6AFF',
                        minBarLength: 100
                    },
                ]
            },
            options:{
            }
        })
        var newchart = new Chart(mySecondChart, {
            type:'line',
            data:{
                labels: labels,
                datasets: [
                    {
                        label: "Kobiety",
                        data: females,
                        backgroundColor: '#BB33FF',
                        minBarLength: 100
                    },
                    {
                        label: "Mężczyźni",
                        data: males,
                        backgroundColor: '#3355FF',
                        minBarLength: 100
                    },
                ]
            },
            options:{
            }
        })