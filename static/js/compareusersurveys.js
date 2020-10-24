fetch('../../sendjsoncompare')
    .then(res => res.json())
        .then(out => {
            let result = out.survey_results;
            let users = [];
            let i = 0;
            for(let key in result){
                users[i] = ['user','weight','height','chest','bicep','thigh','waist','hips','arms','stress','date']
                users[i]['user'] = key;
                users[i]['weight'] = result[key]['weight'];
                users[i]['height'] = result[key]['height'];
                users[i]['chest'] = result[key]['chest'];
                users[i]['bicep'] = result[key]['bicep'];
                users[i]['thigh'] = result[key]['thigh'];
                users[i]['waist'] = result[key]['waist'];
                users[i]['hips'] = result[key]['hips'];
                users[i]['arms'] = result[key]['arms'];
                users[i]['stress'] = result[key]['stress'];
                users[i]['date'] = result[key]['date'];
                i++;
            }

            var dates = [];
            var j = 0;
            for(let i=0; i < users.length; i++){
                for(let date in users[i]['date']){
                    if(!dates.includes(users[i]['date'][date])){
                        dates[j] = users[i]['date'][date];
                        j++;
                    }
                }
            }
            dates.sort(function(a,b){
                var da = new Date(a).getTime();
                var db = new Date(b).getTime(); 
                return da < db ? -1 : da > db ? 1 : 0
              });
            var myChartWeight = document.getElementById("chartWeight").getContext('2d');
            var myChartHeight = document.getElementById("chartHeight").getContext('2d');
            var myChartChest = document.getElementById("chartChest").getContext('2d');
            var myChartBicep = document.getElementById("chartBicep").getContext('2d');
            var myChartThigh = document.getElementById("chartThigh").getContext('2d');
            var myChartHips= document.getElementById("chartHips").getContext('2d');
            var myChartWaist= document.getElementById("chartWaist").getContext('2d');
            var myChartArms = document.getElementById("chartArms").getContext('2d');
            var myChartStress = document.getElementById("chartStress").getContext('2d');

            // var stressTab = [0,0,0];
            // var stressLabel = ['niski', 'zrównoważony', 'wysoki'];
            // stress.forEach(el =>{
            //     if(el == 'niski'){
            //         console.log(el);
            //         stressTab[0]++; 
            //     }else if(el == 'zrównoważony'){
            //         stressTab[1]++;
            //         console.log(stressTab[1]);
            //     }else if(el == 'wysoki'){
            //         stressTab[2]++;
            //     }
            // });

            var gradient = myChartWeight.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(250,174,50,1)');   
            gradient.addColorStop(1, 'rgba(250,174,50,0)');

            var chartWeight = new Chart(myChartWeight, {
                type:'line',
                data:{
                    datasets: []
                },
                options:{
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [
                            {
                            type: 'time',
                            time: {
                                parser: 'YYYY-MM-DD',
                                unit: 'day',
                                displayFormats: {
                                   day: 'YYYY-MM-DD'
                                },
                             },
                            gridLines: {
                                drawOnChartArea: false
                                }
                            }
                        ],
                        yAxes: [{
                            gridLines: {
                                drawOnChartArea: false
                            }                      
                        }]
                    }
                }
            });
            chartWeight.data.labels = dates;
            for(let i=0;i<users.length;i++){
                let temp;
                for(let j=0;j<dates.length;j++){
                    if(dates[j] != users[i]['date'][j] && users[i]['date'][j] != undefined){
                        temp = users[i]['weight'][j];
                        users[i]['weight'][j] = (users[i]['weight'][j-1]+users[i]['weight'][j])/2;
                        users[i]['weight'][j+1] = temp;
                    }
                }
                chartWeight.data.datasets.push({
                        label: users[i]['user'],
                        data: users[i]['weight'],
                        backgroundColor: gradient,
                        minBarLength: 100,
                        borderWidth: 5,
                        borderColor: '#fff'
                   });
            };
            chartWeight.update();

            // var chartHeight = new Chart(myChartHeight, {
            //     type:'line',
            //     data:{
            //         labels: date,
            //         datasets: [
            //             {
            //                 label: "wzrost [cm]",
            //                 data: height,
            //                 backgroundColor: '#696969',
            //                 minBarLength: 100
            //             }
            //         ]
            //     },
            //     options:{
            //     }
            // });

            // var chartChest = new Chart(myChartChest, {
            //     type:'line',
            //     data:{
            //         labels: date,
            //         datasets: [
            //             {
            //                 label: "klatka [cm]",
            //                 data: chest,
            //                 backgroundColor: '#32cd32',
            //                 minBarLength: 100
            //             }
            //         ]
            //     },
            //     options:{ 
            //     }
            // });

            // var chartBicep = new Chart(myChartBicep, {
            //     type:'line',
            //     data:{
            //         labels: date,
            //         datasets: [
            //             {
            //                 label: "biceps [cm]",
            //                 data: bicep,
            //                 backgroundColor: '#32cd32',
            //                 minBarLength: 100
            //             }
            //         ]
            //     },
            //     options:{ 
            //     }
            // });

            // var chartHips = new Chart(myChartHips, {
            //     type:'line',
            //     data:{
            //         labels: date,
            //         datasets: [
            //             {
            //                 label: "biodra [cm]",
            //                 data: hips,
            //                 backgroundColor: '#32cd32',
            //                 minBarLength: 100
            //             }
            //         ]
            //     },
            //     options:{ 
            //     }
            // });

            // var chartThigh = new Chart(myChartThigh, {
            //     type:'line',
            //     data:{
            //         labels: date,
            //         datasets: [
            //             {
            //                 label: "udo [cm]",
            //                 data: thigh,
            //                 backgroundColor: '#32cd32',
            //                 minBarLength: 100
            //             }
            //         ]
            //     },
            //     options:{ 
            //     }
            // });

            // var chartWaist = new Chart(myChartWaist, {
            //     type:'line',
            //     data:{
            //         labels: date,
            //         datasets: [
            //             {
            //                 label: "talia [cm]",
            //                 data: waist,
            //                 backgroundColor: '#32cd32',
            //                 minBarLength: 100
            //             }
            //         ]
            //     },
            //     options:{ 
            //     }
            // });

            // var chartArms = new Chart(myChartArms, {
            //     type:'line',
            //     data:{
            //         labels: date,
            //         datasets: [
            //             {
            //                 label: "barki [cm]",
            //                 data: arms,
            //                 backgroundColor: '#32cd32',
            //                 minBarLength: 100
            //             }
            //         ]
            //     },
            //     options:{ 
            //     }
            // });

            // var chartStress = new Chart(myChartStress, {
            //     type:'doughnut',
            //     data:{
            //         labels: stressLabel,
            //         datasets: [
            //             {
            //                 label: "stres",
            //                 data: stressTab,
            //                 backgroundColor: ['#fff', '#000','#333'],
            //                 minBarLength: 100
            //             }
            //         ]
            //     },
            //     options:{ 
            //     }
            // });

        });


      