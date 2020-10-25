Chart.defaults.global.defaultFontColor = "#303030";
Chart.defaults.global.defaultFontFamily = "'Work Sans', sans-serif";


const countrybtn = document.querySelector("#countrybtn");
function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
    val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
}
document.getElementById("show").style.display = "none";
countrybtn.addEventListener("click", (e) => {
    e.preventDefault();
    let c1 = document.querySelector('#country').value;
    if(c1){
        document.getElementById("show").style.display = "grid";
        let country = document.getElementById("country").value;
        fetch(`https://covid19-api.org/api/timeline/${country}`)
                .then(res => res.json())
                .then(data => {
                let cases = []
                let labels = []
                let deaths = []
                let recovered = []
                let daily = []
                let active = []
                let n = 0;
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
                let k = n;
                k--;
                for (n ; n > 0 ; n--) {
                    let val = cases[n + 1] - cases[n];
                    let wal = cases[n] - recovered[n];
                    if (val < 0) {
                        val = -(val);
                    }
                    active.unshift(wal);
                    daily.unshift(val);
                }
                daily.unshift(0);
                daily.unshift(0);
                document.getElementById("cipsko").innerHTML = '&nbsp;';
                document.getElementById("cipsko").innerHTML = '<canvas id="myChart"></canvas>';
                document.getElementById("allCases").innerHTML = `Liczba wszystkich przypadków: ${commaSeparateNumber(cases[k])}`;
                document.getElementById("todayCases").innerHTML = `Liczba dzisiejszych przypadków: ${commaSeparateNumber(daily[k])}`;
                document.getElementById("activeCases").innerHTML = `Liczba aktywnych przypadków: ${commaSeparateNumber(active[k - 1])}`;
                let myChart = document.getElementById("myChart").getContext('2d')

                let chart = new Chart(myChart, {
                    type:'line',
                    data:{
                        labels: labels,
                        datasets: [
                            {
                                label: "Potwierdzone przypadki",
                                data: cases,
                                backgroundColor: 'rgba(206, 2, 23, 0.6)',
                                minBarLength: 100
                            },

                            {
                                label: "Aktywne przypadki",
                                data: active,
                                backgroundColor: 'rgba(255, 195, 77, 0.6)',
                                minBarLength: 100
                            },

                            {
                                label: "Liczba zgonów",
                                data: deaths,
                                backgroundColor: 'rgba(105, 105, 105, 0.6)',
                                minBarLength: 100
                            },
                            
                            {
                                label: "Wyleczone przypadki",
                                data: recovered,
                                backgroundColor: 'rgba(50, 205, 50, 0.6)',
                                minBarLength: 100
                            },

                            {
                                label: "Dzienna liczba przypadków",
                                data: daily,
                                backgroundColor: 'rgba(53, 133, 202, 0.6)',
                                minBarLength: 100
                            }
                        ]
                    },
                    options:{
                    }
                })
            });

            fetch(`https://covid19-api.org/api/prediction/${country}`)
            .then(res => res.json())
            .then(data => {
                if(!data['error']){
                    let a = document.getElementsByClassName('pred');
                    for(let item of a){
                        item.style.display = 'block'
                    }
                    let cases = []
                    let labels = []
                    let daily = []
                    let idkidk = []
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
                    daily.reverse();
                    document.getElementById("pred").innerHTML = '&nbsp;';
                    document.getElementById("pred").innerHTML = '<canvas id="predChart"></canvas>';
                    document.getElementById("dailypred").innerHTML = '&nbsp;';
                    document.getElementById("dailypred").innerHTML = '<canvas id="dpredChart"></canvas>';
                    let predChart = document.getElementById("predChart").getContext('2d');
                    let dailypredChart = document.getElementById("dpredChart").getContext('2d');
                    let pchart = new Chart(predChart, {
                        type:'line',
                        data:{
                            labels: labels,
                            datasets: [
                                {
                                    label: "Potwierdzone przypadki",
                                    data: cases,
                                    backgroundColor: 'rgba(206, 2, 23, 0.6)',
                                    minBarLength: 100
                                }
                            ]
                        },
                        options:{
                        }
                    });
                    let dpredCh = new Chart(dailypredChart, {
                        type:'line',
                        data:{
                            labels: idkidk,
                            datasets: [
                                {
                                    label: "Dzienne przypadki",
                                    data: daily,
                                    backgroundColor: 'rgba(53, 133, 202, 0.6)',
                                    minBarLength: 100
                                }
                            ]
                        },
                        options:{
                        }
                    });
                } else {
                    let a = document.getElementsByClassName('pred');
                    for(let item of a){
                        item.style.display = 'none'
                    }
                }
            })
            .catch(error => console.log(error));
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