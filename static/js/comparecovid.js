let c1Whole = {
    cases: [],
    update: [],
    deaths: [],
    recovered: [],
    daily: []
};

let c2Whole = {
    cases: [],
    update: [],
    deaths: [],
    recovered: [],
    daily: []
};

let c3Whole = {
    cases: [],
    update: [],
    deaths: [],
    recovered: [],
    daily: []
};

let n = 0;

function createChart(idx){
    if(idx == 'c1'){
        let myChart1 = document.getElementById("myChart1").getContext('2d');
        let chart = new Chart(myChart, {
            type:'line',
            data:{
                labels: labels,
                datasets: [
                    {
                        label: "Potwierdzone przypadki",
                        data: cases,
                        backgroundColor: '#8b0000',
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
                        backgroundColor: '#7188e6',
                        minBarLength: 100
                    }
                ]
            },
            options:{}
        })
    } else if(idx == 'c2'){
        let myChart2 = document.getElementById("myChart2").getContext('2d')
    } else if(idx == 'c3'){
        let myChart3 = document.getElementById("myChart3").getContext('2d')
    }
}

function getCovidData(country, idx){
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    fetch(`https://covid19-api.org/api/timeline/${country}`, requestOptions)
      .then(response => response.json())
      .then(result => 
            result.forEach(res => {
                if(idx == 'c1'){
                    c1Whole.cases.unshift(res.cases);
                    c1Whole.deaths.unshift(res.deaths);
                    c1Whole.recovered.unshift(res.recovered);
                    let x = res.last_update;
                    c1Whole.update.unshift(x.replace("T", " "));
                    if(n == 0){
                        c1Whole.daily.unshift(res.cases)
                    } else {
                        let y = c1Whole.daily[0];
                        c1Whole.daily[0] = y - res.cases
                        c1Whole.daily.unshift(res.cases)
                    }
                } else if(idx == 'c2'){
                    c2Whole.cases.unshift(res.cases);
                    c2Whole.deaths.unshift(res.deaths);
                    c2Whole.recovered.unshift(res.recovered);
                    let x = res.last_update;
                    c2Whole.update.unshift(x.replace("T", " "));
                    if(n == 0){
                        c2Whole.daily.unshift(res.cases)
                    } else {
                        let y = c2Whole.cases[0];
                        c2Whole.daily[0] = y - res.cases
                        c2Whole.daily.unshift(res.cases)
                    }
                } else if(idx == 'c3'){
                    c3Whole.cases.unshift(res.cases);
                    c3Whole.deaths.unshift(res.deaths);
                    c3Whole.recovered.unshift(res.recovered);
                    let x = res.last_update;
                    c3Whole.update.unshift(x.replace("T", " "));
                    if(n == 0){
                        c3Whole.daily.unshift(res.cases)
                    } else {
                        let y = c3Whole.daily[0];
                        c3Whole.daily[0] = y - res.cases
                        c3Whole.daily.unshift(res.cases)
                    }
                }
                n++;
            })
            
        )
        .then(createChart(idx))
      .catch(error => console.log('error', error));
}


document.querySelector('.sub').addEventListener('click', () => {
    let c1 = document.querySelector('#c1').value;
    let c2 = document.querySelector('#c2').value;
    let c3 = document.querySelector('#c3').value;
    let main = document.querySelector('.main');
    if(c1 && c2 && c3){
        let c1Data = getCovidData(c1, 'c1');
        let c2Data = getCovidData(c2, 'c2');
        let c3Data = getCovidData(c3, 'c3');

        
    }
})