Chart.defaults.global.defaultFontColor = "#303030";
Chart.defaults.global.defaultFontFamily = "'Work Sans', sans-serif";


function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
    val = val.toString().replace(/(\d+)(\d{3})/, '$1'+' '+'$2');
    }
    return val;
}
fetch(`https://covid19-api.org/api/timeline`)
        .then(res => res.json())
        .then(data => {
        var cases = []
        var labels = []
        var deaths = []
        var recovered = []
        var daily = []
        var active = []
        let n = 0;
        data.forEach(element => {
            cases.unshift(data[n].total_cases);
            let masno = data[n].last_update;
            let update = "";
            for (let i = 5; i < 10 ; i++) {
                update += masno[i]
            }
            update = update.replace("-", ".");
            labels.unshift(update)
            deaths.unshift(data[n].total_deaths)
            recovered.unshift(data[n].total_recovered)
            n++;
        });
        n--;
        let k = n;
        document.getElementById("dailyRes").innerHTML = `Dzisiejsza liczba przypadków: ${commaSeparateNumber(cases[n] - cases[n-1])}`;
        document.getElementById("casesRes").innerHTML = `Łączna liczba przypadków: ${commaSeparateNumber(cases[n])}`;
        document.getElementById("deathRes").innerHTML = `Śmierci łącznie: ${commaSeparateNumber(deaths[n])}`;
        document.getElementById("recoveredRes").innerHTML = `Wyzdrowiałych łącznie: ${commaSeparateNumber(recovered[n])}`;
        for (n ; n > 0 ; n--) {
            let val = cases[n + 1] - cases[n];
            let wal = cases[n] - recovered[n];
            if (val < 0) {
                val = -(val);
            }
            daily.unshift(val);
            active.unshift(wal);
        }
        document.getElementById("activeRes").innerHTML = `Liczba aktywnych przypadków: ${commaSeparateNumber(active[k - 1])}`;
        var myChart = document.getElementById("myChart").getContext('2d');
        var dailyChart = document.getElementById("dailyChart").getContext('2d');
        var deathChart = document.getElementById("deathChart").getContext('2d');
        var activeChart = document.getElementById("activeChart").getContext('2d');
        var chart = new Chart(myChart, {
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
        })
        var dailyCh = new Chart(dailyChart, {
            type:'line',
            data:{
                labels: labels,
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
        })
        var deathCh = new Chart(deathChart, {
            type:'line',
            data:{
                labels: labels,
                datasets: [
                    {
                        label: "Ozdrowione przypadki",
                        data: recovered,
                        backgroundColor: 'rgba(50, 205, 50, 0.6)',
                        minBarLength: 100
                    },

                    {
                        label: "Śmierci",
                        data: deaths,
                        backgroundColor: 'rgba(105, 105, 105, 0.6)',
                        minBarLength: 100
                    }
                ]
            },
            options:{
            }
        })
        var activeCh = new Chart(activeChart, {
            type:'line',
            data:{
                labels: labels,
                datasets: [
                    {
                        label: "Aktywne przypadki",
                        data: active,
                        backgroundColor: 'rgba(255, 195, 77, 0.6)',
                        minBarLength: 100
                    }
                ]
            },
            options:{
            }
        })
    });