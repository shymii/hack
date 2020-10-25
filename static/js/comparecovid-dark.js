Chart.defaults.global.defaultFontColor = "#ccc8c9";


document.querySelector('.sub').addEventListener('click', (e) => {
    e.preventDefault();
    let c1input = document.querySelector('#c1');
    let c2input = document.querySelector('#c2');
    let c1 = c1input.value;
    let c2 = c2input.value;
    
    if(c1 && c2){
        document.querySelector('#chart-box').innerHTML = '';
        document.querySelector('#chart-box').innerHTML = `<section class="global-stats-section" id="first-chart"><div class="global-stats-chart"><canvas id="myChart1"></canvas></div><p class="global-stats-desc">${c1input.options[c1input.selectedIndex].text}</p></section><section class="global-stats-section" id="second-chart"><div class="global-stats-chart"><canvas id="myChart2"></canvas></div><p class="global-stats-desc">${c2input.options[c2input.selectedIndex].text}</p></section>`;
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(`https://covid19-api.org/api/timeline/${c1}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                let c1Whole = {
                    cases: [],
                    update: [],
                    deaths: [],
                    recovered: []
                };
                result.forEach(res => {
                        c1Whole.cases.unshift(res.cases);
                        c1Whole.deaths.unshift(res.deaths);
                        c1Whole.recovered.unshift(res.recovered);
                        c1Whole.update.unshift(res.last_update.replace("T", " "));
                        c1Whole.update[0] = '';
                        for(let i = 5; i < 10; i++){
                            c1Whole.update[0] +=  res.last_update[i];
                        }
                });

                var myChart1 = document.getElementById("myChart1").getContext('2d');
                let rand1, rand2, rand3;
                let gradient = [];
                for(let i=0; i<=6; i++){
                        rand1 = Math.floor(255 * Math.random());
                        rand2 = Math.floor(255 * Math.random());
                        rand3 = Math.floor(255 * Math.random());
                        gradient[i] = myChart1.createLinearGradient(0, 0, 0, 400);
                        gradient[i].addColorStop(0, `rgba(${rand1},${rand2},${rand3},1)`);   
                        gradient[i].addColorStop(1, `rgba(${rand1},${rand2},${rand3},0)`);
                }
                
                var chart1 = new Chart(myChart1, {
                    type:'line',
                    data:{
                        labels: c1Whole.update,
                        datasets: [
                            {
                                label: "Potwierdzone przypadki",
                                data: c1Whole.cases,
                                backgroundColor: gradient[1],
                                minBarLength: 100
                            },

                            {
                                label: "Liczba zgonów",
                                data: c1Whole.deaths,
                                backgroundColor: gradient[2],
                                minBarLength: 100
                            },
                            
                            {
                                label: "Wyleczone przypadki",
                                data: c1Whole.recovered,
                                backgroundColor: gradient[3],
                                minBarLength: 100
                            }
                        ]
                    },
                    options:{
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
                fetch(`https://covid19-api.org/api/timeline/${c2}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        let c2Whole = {
                            cases: [],
                            update: [],
                            deaths: [],
                            recovered: []
                        };
                        result.forEach(res => {
                                c2Whole.cases.unshift(res.cases);
                                c2Whole.deaths.unshift(res.deaths);
                                c2Whole.recovered.unshift(res.recovered);
                                c2Whole.update.unshift(res.last_update.replace("T", " "));
                                c2Whole.update[0] = '';
                                for(let i = 5; i < 10; i++){
                                    c2Whole.update[0] +=  res.last_update[i];
                                }
                        });
                        var myChart2 = document.getElementById("myChart2")
                        var chart2 = new Chart(myChart2, {
                            type:'line',
                            data:{
                                labels: c2Whole.update,
                                datasets: [
                                    {
                                        label: "Potwierdzone przypadki",
                                        data: c2Whole.cases,
                                        backgroundColor: gradient[4],
                                        minBarLength: 100
                                    },

                                    {
                                        label: "Liczba zgonów",
                                        data: c2Whole.deaths,
                                        backgroundColor: gradient[5],
                                        minBarLength: 100
                                    },
                                    
                                    {
                                        label: "Wyleczone przypadki",
                                        data: c2Whole.recovered,
                                        backgroundColor: gradient[6],
                                        minBarLength: 100
                                    }
                                ]
                            },
                            options:{
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
                        
                    })
                    .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));
    } else {
        let y = document.querySelector('.huh');
        y.classList.remove('huh');
        y.classList.add('alert');
        y.classList.add('alert-error');
        setTimeout(() => {
            y.classList.add('alert-hide');
            setTimeout(() => {
                y.classList.remove('alert');
                y.classList.remove('alert-error');
                y.classList.remove('alert-hide');
                y.classList.add('huh');
            }, 1000)
        }, 3000);
    }
})