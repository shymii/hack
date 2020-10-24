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

            var gradient1 = myChartWeight.createLinearGradient(0, 0, 0, 400);
            gradient1.addColorStop(0, 'rgba(250,174,50,1)');   
            gradient1.addColorStop(1, 'rgba(250,174,50,0)');

            var gradient2 = myChartHeight.createLinearGradient(0, 0, 0, 400);
            gradient2.addColorStop(0, 'rgba(150,174,50,1)');   
            gradient2.addColorStop(1, 'rgba(150,174,50,0)');

            var gradient3 = myChartChest.createLinearGradient(0, 0, 0, 400);
            gradient3.addColorStop(0, 'rgba(150,74,50,1)');   
            gradient3.addColorStop(1, 'rgba(150,74,50,0)');

            var gradient4 = myChartBicep.createLinearGradient(0, 0, 0, 400);
            gradient4.addColorStop(0, 'rgba(10,204,10,1)');   
            gradient4.addColorStop(1, 'rgba(10,204,10,0)');

            var gradient5 = myChartHips.createLinearGradient(0, 0, 0, 400);
            gradient5.addColorStop(0, 'rgba(50,174,150,1)');   
            gradient5.addColorStop(1, 'rgba(50,174,150,0)');

            var gradient6 = myChartThigh.createLinearGradient(0, 0, 0, 400);
            gradient6.addColorStop(0, 'rgba(50,20,50,1)');   
            gradient6.addColorStop(1, 'rgba(50,20,50,0)');

            var gradient7 = myChartWaist.createLinearGradient(0, 0, 0, 400);
            gradient7.addColorStop(0, 'rgba(110,174,60,1)');   
            gradient7.addColorStop(1, 'rgba(110,174,60,0)');

            var gradient8 = myChartArms.createLinearGradient(0, 0, 0, 400);
            gradient8.addColorStop(0, 'rgba(120,74,10,1)');   
            gradient8.addColorStop(1, 'rgba(120,74,10,0)');


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
                        backgroundColor: gradient1,
                        minBarLength: 100,
                        borderWidth: 5,
                        borderColor: '#fff'
                   });
            };
            chartWeight.update();

            var chartHeight = new Chart(myChartHeight, {
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
            chartHeight.data.labels = dates;
            for(let i=0;i<users.length;i++){
                let temp;
                for(let j=0;j<dates.length;j++){
                    if(dates[j] != users[i]['date'][j] && users[i]['date'][j] != undefined){
                        temp = users[i]['height'][j];
                        users[i]['height'][j] = (users[i]['height'][j-1]+users[i]['height'][j])/2;
                        users[i]['height'][j+1] = temp;
                    }
                }
                chartHeight.data.datasets.push({
                        label: users[i]['user'],
                        data: users[i]['height'],
                        backgroundColor: gradient2,
                        minBarLength: 100,
                        borderWidth: 5,
                        borderColor: '#fff'
                   });
            };
            chartHeight.update();

            var chartChest = new Chart(myChartChest, {
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
            chartChest.data.labels = dates;
            for(let i=0;i<users.length;i++){
                let temp;
                for(let j=0;j<dates.length;j++){
                    if(dates[j] != users[i]['date'][j] && users[i]['date'][j] != undefined){
                        temp = users[i]['chest'][j];
                        users[i]['chest'][j] = (users[i]['chest'][j-1]+users[i]['chest'][j])/2;
                        users[i]['chest'][j+1] = temp;
                    }
                }
                chartChest.data.datasets.push({
                        label: users[i]['user'],
                        data: users[i]['chest'],
                        backgroundColor: gradient3,
                        minBarLength: 100,
                        borderWidth: 5,
                        borderColor: '#fff'
                   });
            };
            chartChest.update();

            var chartBicep = new Chart(myChartBicep, {
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
            chartBicep.data.labels = dates;
            for(let i=0;i<users.length;i++){
                let temp;
                for(let j=0;j<dates.length;j++){
                    if(dates[j] != users[i]['date'][j] && users[i]['date'][j] != undefined){
                        temp = users[i]['bicep'][j];
                        users[i]['bicep'][j] = (users[i]['bicep'][j-1]+users[i]['bicep'][j])/2;
                        users[i]['bicep'][j+1] = temp;
                    }
                }
                chartBicep.data.datasets.push({
                        label: users[i]['user'],
                        data: users[i]['bicep'],
                        backgroundColor: gradient4,
                        minBarLength: 100,
                        borderWidth: 5,
                        borderColor: '#fff'
                   });
            };
            chartBicep.update();

            var chartHips = new Chart(myChartHips, {
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
            chartHips.data.labels = dates;
            for(let i=0;i<users.length;i++){
                let temp;
                for(let j=0;j<dates.length;j++){
                    if(dates[j] != users[i]['date'][j] && users[i]['date'][j] != undefined){
                        temp = users[i]['hips'][j];
                        users[i]['hips'][j] = (users[i]['hips'][j-1]+users[i]['hips'][j])/2;
                        users[i]['hips'][j+1] = temp;
                    }
                }
                chartHips.data.datasets.push({
                        label: users[i]['user'],
                        data: users[i]['hips'],
                        backgroundColor: gradient5,
                        minBarLength: 100,
                        borderWidth: 5,
                        borderColor: '#fff'
                   });
            };
            chartHips.update();

            var chartThigh = new Chart(myChartThigh, {
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
            chartThigh.data.labels = dates;
            for(let i=0;i<users.length;i++){
                let temp;
                for(let j=0;j<dates.length;j++){
                    if(dates[j] != users[i]['date'][j] && users[i]['date'][j] != undefined){
                        temp = users[i]['thigh'][j];
                        users[i]['thigh'][j] = (users[i]['thigh'][j-1]+users[i]['thigh'][j])/2;
                        users[i]['thigh'][j+1] = temp;
                    }
                }
                chartThigh.data.datasets.push({
                        label: users[i]['user'],
                        data: users[i]['thigh'],
                        backgroundColor: gradient6,
                        minBarLength: 100,
                        borderWidth: 5,
                        borderColor: '#fff'
                   });
            };
            chartThigh.update();

            var chartWaist = new Chart(myChartWaist, {
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
            chartWaist.data.labels = dates;
            for(let i=0;i<users.length;i++){
                let temp;
                for(let j=0;j<dates.length;j++){
                    if(dates[j] != users[i]['date'][j] && users[i]['date'][j] != undefined){
                        temp = users[i]['waist'][j];
                        users[i]['waist'][j] = (users[i]['waist'][j-1]+users[i]['waist'][j])/2;
                        users[i]['waist'][j+1] = temp;
                    }
                }
                chartWaist.data.datasets.push({
                        label: users[i]['user'],
                        data: users[i]['waist'],
                        backgroundColor: gradient7,
                        minBarLength: 100,
                        borderWidth: 5,
                        borderColor: '#fff'
                   });
            };
            chartWaist.update();

            var chartArms = new Chart(myChartArms, {
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
            chartArms.data.labels = dates;
            for(let i=0;i<users.length;i++){
                let temp;
                for(let j=0;j<dates.length;j++){
                    if(dates[j] != users[i]['date'][j] && users[i]['date'][j] != undefined){
                        temp = users[i]['arms'][j];
                        users[i]['arms'][j] = (users[i]['arms'][j-1]+users[i]['arms'][j])/2;
                        users[i]['arms'][j+1] = temp;
                    }
                }
                chartArms.data.datasets.push({
                        label: users[i]['user'],
                        data: users[i]['arms'],
                        backgroundColor: gradient8,
                        minBarLength: 100,
                        borderWidth: 5,
                        borderColor: '#fff'
                   });
            };
            chartArms.update();
        });


      