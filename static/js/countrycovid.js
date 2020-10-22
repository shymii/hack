function masno(){
    let country = document.getElementById("country").value;
    fetch(`https://covid19-api.org/api/timeline/${country}`)
            .then(res => res.json())
            .then(data => {
            var cases = []
            var labels = []
            var deaths = []
            var recovered = []
            var daily = []
            let n = 0;
            console.log(data);
            data.forEach(element => {
                cases.unshift(data[n].cases);
                let masno = data[n].last_update;
                let update = "";
                for (let i = 5; i < 10 ; i++) {
                    update += masno[i]
                }
                update = update.replace("-", ".");
                labels.unshift(update)
                deaths.unshift(data[n].deaths)
                recovered.unshift(data[n].recovered)
                n++;
            });
            for (n ; n > 0 ; n--) {
                let val = cases[n + 1] - cases[n];
                if (val < 0) {
                    val = -(val);
                }
                daily.unshift(val);
            }
            daily.unshift(0);
            daily.unshift(0);
            document.getElementById("cipsko").innerHTML = '&nbsp;';
            document.getElementById("cipsko").innerHTML = '<canvas id="myChart"></canvas>';
            var myChart = document.getElementById("myChart").getContext('2d')

            var chart = new Chart(myChart, {
                type:'line',
                data:{
                    labels: labels,
                    datasets: [
                        {
                            label: "Potwierdzone przypadki",
                            data: cases,
                            backgroundColor: '#CE0217',
                            minBarLength: 100
                        },

                        {
                            label: "Liczba zgonów",
                            data: deaths,
                            backgroundColor: '#696969',
                            minBarLength: 100
                        },
                        
                        {
                            label: "Wyleczone przypadki",
                            data: recovered,
                            backgroundColor: '#32cd32',
                            minBarLength: 100
                        },

                        {
                            label: "Dzienna liczba przypadków",
                            data: daily,
                            backgroundColor: '#3585CA',
                            minBarLength: 100
                        }
                    ]
                },
                options:{}
            })
        });

        fetch(`https://covid19-api.org/api/prediction/${country}`)
        .then(res => res.json())
        .then(data => {
            var cases = []
            var labels = []
            var daily = []
            var idkidk = []
            let n = 0;
            data.forEach(element => {
                cases.push(data[n].cases);
                let masno = data[n].date;
                let update = "";
                for (let i = 5; i < 10 ; i++) {
                    update += masno[i]
                }
                update = update.replace("-", ".");
                labels.push(update);
                idkidk.push(update);
                n++;
            });
            for (n ; n > 0 ; n--) {
                let val = cases[n - 1] - cases[n];
                if (val < 0) {
                    val = -(val);
                }
                daily.push(val);
            };
            idkidk.shift();
            daily.shift();
            document.getElementById("pred").innerHTML = '&nbsp;';
            document.getElementById("pred").innerHTML = '<canvas id="predChart"></canvas>';
            document.getElementById("dailypred").innerHTML = '&nbsp;';
            document.getElementById("dailypred").innerHTML = '<canvas id="dpredChart"></canvas>';
            let predChart = document.getElementById("predChart").getContext('2d');
            let dailypredChart = document.getElementById("dpredChart").getContext('2d');
            var pchart = new Chart(predChart, {
                type:'line',
                data:{
                    labels: labels,
                    datasets: [
                        {
                            label: "Potwierdzone przypadki",
                            data: cases,
                            backgroundColor: '#CE0217',
                            minBarLength: 100
                        }
                    ]
                },
                options:{}
            });
            var dpredCh = new Chart(dailypredChart, {
                type:'line',
                data:{
                    labels: idkidk,
                    datasets: [
                        {
                            label: "Dzienne przypadki",
                            data: daily,
                            backgroundColor: '#3585CA',
                            minBarLength: 100
                        }
                    ]
                },
                options:{}
            });
        });
}