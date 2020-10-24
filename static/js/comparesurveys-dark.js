Chart.defaults.global.defaultFontColor = "#FFFBFC";
Chart.defaults.global.defaultFontFamily = "'Work Sans', sans-serif";


fetch('../sendjson')
    .then(res => res.json())
        .then(out => {
            let weight = out.survey_results.weight;
            let height = out.survey_results.height;
            let chest = out.survey_results.chest;
            let bicep = out.survey_results.bicep;
            let thigh = out.survey_results.thigh;
            let waist = out.survey_results.waist;
            let hips = out.survey_results.hips;
            let arms = out.survey_results.arms;
            let stress = out.survey_results.stress;
            let date = out.survey_results.date;

            var myChartWeight = document.getElementById("chartWeight").getContext('2d');
            var myChartHeight = document.getElementById("chartHeight").getContext('2d');
            var myChartChest = document.getElementById("chartChest").getContext('2d');
            var myChartBicep = document.getElementById("chartBicep").getContext('2d');
            var myChartThigh = document.getElementById("chartThigh").getContext('2d');
            var myChartHips= document.getElementById("chartHips").getContext('2d');
            var myChartWaist= document.getElementById("chartWaist").getContext('2d');
            var myChartArms = document.getElementById("chartArms").getContext('2d');
            var myChartStress = document.getElementById("chartStress").getContext('2d');

            var stressTab = [0,0,0];
            var stressLabel = ['niski', 'zrównoważony', 'wysoki'];
            stress.forEach(el =>{
                if(el == 'niski'){
                    console.log(el);
                    stressTab[0]++; 
                }else if(el == 'zrównoważony'){
                    stressTab[1]++;
                    console.log(stressTab[1]);
                }else if(el == 'wysoki'){
                    stressTab[2]++;
                }
            });

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
                    labels: date,
                    datasets: [
                        {
                            label: "waga [kg]",
                            data: weight,
                            backgroundColor: gradient1,
                            minBarLength: 100,
                            borderWidth: 5,
                            borderColor: '#fff'
                        }
                    ]
                },
                options:{
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            position: 'top',
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

            var chartHeight = new Chart(myChartHeight, {
                type:'line',
                data:{
                    labels: date,
                    datasets: [
                        {
                            label: "wzrost [cm]",
                            data: height,
                            backgroundColor: gradient2,
                            minBarLength: 100,
                            borderWidth: 5,
                            borderColor: '#fff'
                        }
                    ]
                },
                options:{
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            position: 'top',
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

            var chartChest = new Chart(myChartChest, {
                type:'line',
                data:{
                    labels: date,
                    datasets: [
                        {
                            label: "klatka [cm]",
                            data: chest,
                            backgroundColor: gradient3,
                            minBarLength: 100,
                            borderWidth: 5,
                            borderColor: '#fff'
                        }
                    ]
                },
                options:{
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            position: 'top',
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

            var chartBicep = new Chart(myChartBicep, {
                type:'line',
                data:{
                    labels: date,
                    datasets: [
                        {
                            label: "biceps [cm]",
                            data: bicep,
                            backgroundColor: gradient4,
                            minBarLength: 100,
                            borderWidth: 5,
                            borderColor: '#fff'
                        }
                    ]
                },
                options:{
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            position: 'top',
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

            var chartHips = new Chart(myChartHips, {
                type:'line',
                data:{
                    labels: date,
                    datasets: [
                        {
                            label: "biodra [cm]",
                            data: hips,
                            backgroundColor: gradient5,
                            minBarLength: 100,
                            borderWidth: 5,
                            borderColor: '#fff'
                        }
                    ]
                },
                options:{
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            position: 'top',
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

            var chartThigh = new Chart(myChartThigh, {
                type:'line',
                data:{
                    labels: date,
                    datasets: [
                        {
                            label: "udo [cm]",
                            data: thigh,
                            backgroundColor: gradient6,
                            minBarLength: 100,
                            borderWidth: 5,
                            borderColor: '#fff'
                        }
                    ]
                },
                options:{ 
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            position: 'top',
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

            var chartWaist = new Chart(myChartWaist, {
                type:'line',
                data:{
                    labels: date,
                    datasets: [
                        {
                            label: "talia [cm]",
                            data: waist,
                            backgroundColor: gradient7,
                            minBarLength: 100,
                            borderWidth: 5,
                            borderColor: '#fff'
                        }
                    ]
                },
                options:{ 
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            position: 'top',
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

            var chartArms = new Chart(myChartArms, {
                type:'line',
                data:{
                    labels: date,
                    datasets: [
                        {
                            label: "barki [cm]",
                            data: arms,
                            backgroundColor: gradient8,
                            minBarLength: 100,
                            borderWidth: 5,
                            borderColor: '#fff'
                        }
                    ]
                },
                options:{ 
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            position: 'top',
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

            var chartStress = new Chart(myChartStress, {
                type:'doughnut',
                data:{
                    labels: stressLabel,
                    datasets: [
                        {
                            label: "stres",
                            data: stressTab,
                            backgroundColor: [gradient1, gradient4, gradient6],
                            minBarLength: 100,
                            borderWidth: 3,
                            borderColor: '#fff'
                        }
                    ]
                },
                options:{
                    legend: {
                        position: 'bottom',
                        display: true,
                        onClick: null
                    }
                }
            });

        });


      