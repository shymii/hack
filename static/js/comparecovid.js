document.querySelector('.sub').addEventListener('click', (e) => {
    e.preventDefault();
    let c1input = document.querySelector('#c1');
    let c2input = document.querySelector('#c2');
    let c1 = c1input.value;
    let c2 = c2input.value;
    
    if(c1 && c2){
        let p = document.querySelector('.msg');
        p.classList.remove('visible');
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
                var myChart1 = document.getElementById("myChart1")
                var chart1 = new Chart(myChart1, {
                    type:'line',
                    data:{
                        labels: c1Whole.update,
                        datasets: [
                            {
                                label: "Potwierdzone przypadki",
                                data: c1Whole.cases,
                                backgroundColor: '#CE0217',
                                minBarLength: 100
                            },

                            {
                                label: "Liczba zgonów",
                                data: c1Whole.deaths,
                                backgroundColor: '#696969',
                                minBarLength: 100
                            },
                            
                            {
                                label: "Wyleczone przypadki",
                                data: c1Whole.recovered,
                                backgroundColor: '#32cd32',
                                minBarLength: 100
                            }
                        ]
                    },
                    options: {
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
                                        backgroundColor: '#CE0217',
                                        minBarLength: 100
                                    },

                                    {
                                        label: "Liczba zgonów",
                                        data: c2Whole.deaths,
                                        backgroundColor: '#696969',
                                        minBarLength: 100
                                    },
                                    
                                    {
                                        label: "Wyleczone przypadki",
                                        data: c2Whole.recovered,
                                        backgroundColor: '#32cd32',
                                        minBarLength: 100
                                    }
                                ]
                            },
                            options: {
                            }
                        });
                        
                    })
                    .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));
    } else {
        let p = document.querySelector('.msg');
        p.classList.add('alert');
        p.classList.add('visible');
        setTimeout(() => {
            p.classList.add('alert-hide');
            setTimeout(() => {
                p.classList.remove('alert');
                p.classList.remove('visible');
            }, 1000)
        }, 3000);
    }
})