document.querySelector('.sub').addEventListener('click', () => {
    let c1 = document.querySelector('#c1').value;
    let c2 = document.querySelector('#c2').value;
    
    if(c1 && c2){
        document.querySelector('#cipsko').innerHTML = '';
        document.querySelector('#cipsko').innerHTML = '<canvas id="myChart1"></canvas><canvas id="myChart2"></canvas>';
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        let n = 0;
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
                    if(n % 10 == 0 || n + 1 == result.length){
                        c1Whole.cases.unshift(res.cases);
                        c1Whole.deaths.unshift(res.deaths);
                        c1Whole.recovered.unshift(res.recovered);
                        c1Whole.update.unshift(res.last_update.replace("T", " "));
                        c1Whole.update[0] = '';
                        for(let i = 5; i < 10; i++){
                            c1Whole.update[0] +=  res.last_update[i];
                        }
                        n++;
                    } else {
                        n++;
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
                                backgroundColor: '#8b0000',
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
                let y = 0;
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
                            if(y % 10 == 0 || y + 1 == result.length){
                                c2Whole.cases.unshift(res.cases);
                                c2Whole.deaths.unshift(res.deaths);
                                c2Whole.recovered.unshift(res.recovered);
                                c2Whole.update.unshift(res.last_update.replace("T", " "));
                                c2Whole.update[0] = '';
                                for(let i = 5; i < 10; i++){
                                    c2Whole.update[0] +=  res.last_update[i];
                                }
                                y++;
                            } else {
                                y++;
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
                                        backgroundColor: '#8b0000',
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
    }
})