function renderComparision(usernameTemplate){
fetch('../../sendjsoncompare')
    .then(res => res.json())
        .then(out => {
            let result = out.survey_results;
            let users = [];
            let i = 0;
            for(let key in result){
                users[i] = ['user','weight','height','chest','bicep','thigh','waist','hips','arms','stress','date', 'gradient'];
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

            console.log(users[3]['date']);

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
            let rand1, rand2, rand3;
            for(let i=0;i<users.length;i++){
                rand1 = Math.floor(255 * Math.random());
                rand2 = Math.floor(255 * Math.random());
                rand3 = Math.floor(255 * Math.random());
                users[i]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);
                users[i]['gradient'].addColorStop(0, `rgba(${rand1},${rand2},${rand3},1)`);   
                users[i]['gradient'].addColorStop(1, `rgba(${rand1},${rand2},${rand3},0)`);
                let temp;
                let tempDates = users[i]['date'].map(function (i) { return i });
                for(let j=0;j<dates.length;j++){
                    if(dates[j] != tempDates[j] && tempDates[j] != undefined){
                        temp = users[i]['weight'][j];
                        users[i]['weight'][j] = (users[i]['weight'][j-1]+users[i]['weight'][j])/2;
                        users[i]['weight'][j+1] = temp;
                        if(tempDates[j+1] == undefined){
                            tempDates[j+1] = dates[j];
                        }
                    }else{
                        if(j<dates.length-1 && tempDates[j+1] == undefined){
                            tempDates[j+1] = dates[j+1];
                            temp = users[i]['weight'][j];
                            users[i]['weight'][j+1] = temp;
                        }
                    }
                }
                if(users[i]['user'] == usernameTemplate){
                    chartWeight.data.datasets.push({
                            label: users[i]['user'],
                            data: users[i]['weight'],
                            backgroundColor: users[i]['gradient'],
                            minBarLength: 100,
                            borderWidth: 5,
                            borderColor: '#6573e0'
                    });
                }else{
                    chartWeight.data.datasets.push({
                        label: users[i]['user'],
                        data: users[i]['weight'],
                        backgroundColor: users[i]['gradient'],
                        minBarLength: 100,
                        borderWidth: 2,
                        borderColor: '#fff'
                    });
                }
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
                rand1 = Math.floor(255 * Math.random());
                rand2 = Math.floor(255 * Math.random());
                rand3 = Math.floor(255 * Math.random());
                users[i]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);
                users[i]['gradient'].addColorStop(0, `rgba(${rand1},${rand2},${rand3},1)`);   
                users[i]['gradient'].addColorStop(1, `rgba(${rand1},${rand2},${rand3},0)`);
                let temp;
                let tempDates = users[i]['date'].map(function (i) { return i });
                for(let j=0;j<dates.length;j++){
                    if(dates[j] != tempDates[j] && tempDates[j] != undefined){
                        temp = users[i]['height'][j];
                        users[i]['height'][j] = (users[i]['height'][j-1]+users[i]['height'][j])/2;
                        users[i]['height'][j+1] = temp;
                        if(tempDates[j+1] == undefined){
                            tempDates[j+1] = dates[j];
                        }
                    }else{
                        if(j<dates.length-1 && tempDates[j+1] == undefined){
                            tempDates[j+1] = dates[j+1];
                            temp = users[i]['height'][j];
                            users[i]['height'][j+1] = temp;
                        }
                    }
                }
                if(users[i]['user'] == usernameTemplate){
                    chartHeight.data.datasets.push({
                            label: users[i]['user'],
                            data: users[i]['height'],
                            backgroundColor: users[i]['gradient'],
                            minBarLength: 100,
                            borderWidth: 5,
                            borderColor: '#6573e0'
                    });
                }else{
                    chartHeight.data.datasets.push({
                        label: users[i]['user'],
                        data: users[i]['height'],
                        backgroundColor: users[i]['gradient'],
                        minBarLength: 100,
                        borderWidth: 2,
                        borderColor: '#fff'
                    });
                }
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
                rand1 = Math.floor(255 * Math.random());
                rand2 = Math.floor(255 * Math.random());
                rand3 = Math.floor(255 * Math.random());
                users[i]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);
                users[i]['gradient'].addColorStop(0, `rgba(${rand1},${rand2},${rand3},1)`);   
                users[i]['gradient'].addColorStop(1, `rgba(${rand1},${rand2},${rand3},0)`);
                let temp;
                let tempDates = users[i]['date'].map(function (i) { return i });
                for(let j=0;j<dates.length;j++){
                    if(dates[j] != tempDates[j] && tempDates[j] != undefined){
                        temp = users[i]['chest'][j];
                        users[i]['chest'][j] = (users[i]['chest'][j-1]+users[i]['chest'][j])/2;
                        users[i]['chest'][j+1] = temp;
                        if(tempDates[j+1] == undefined){
                            tempDates[j+1] = dates[j];
                        }
                    }else{
                        if(j<dates.length-1 && tempDates[j+1] == undefined){
                            tempDates[j+1] = dates[j+1];
                            temp = users[i]['chest'][j];
                            users[i]['chest'][j+1] = temp;
                        }
                    }
                }
                if(users[i]['user'] == usernameTemplate){
                    chartChest.data.datasets.push({
                            label: users[i]['user'],
                            data: users[i]['chest'],
                            backgroundColor: users[i]['gradient'],
                            minBarLength: 100,
                            borderWidth: 5,
                            borderColor: '#6573e0'
                    });
                }else{
                    chartChest.data.datasets.push({
                        label: users[i]['user'],
                        data: users[i]['chest'],
                        backgroundColor: users[i]['gradient'],
                        minBarLength: 100,
                        borderWidth: 2,
                        borderColor: '#fff'
                    });
                }
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
                rand1 = Math.floor(255 * Math.random());
                rand2 = Math.floor(255 * Math.random());
                rand3 = Math.floor(255 * Math.random());
                users[i]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);
                users[i]['gradient'].addColorStop(0, `rgba(${rand1},${rand2},${rand3},1)`);   
                users[i]['gradient'].addColorStop(1, `rgba(${rand1},${rand2},${rand3},0)`);
                let temp;
                let tempDates = users[i]['date'].map(function (i) { return i });
                for(let j=0;j<dates.length;j++){
                    if(dates[j] != tempDates[j] && tempDates[j] != undefined){
                        temp = users[i]['bicep'][j];
                        users[i]['bicep'][j] = (users[i]['bicep'][j-1]+users[i]['bicep'][j])/2;
                        users[i]['bicep'][j+1] = temp;
                        if(tempDates[j+1] == undefined){
                            tempDates[j+1] = dates[j];
                        }
                    }else{
                        if(j<dates.length-1 && tempDates[j+1] == undefined){
                            tempDates[j+1] = dates[j+1];
                            temp = users[i]['bicep'][j];
                            users[i]['bicep'][j+1] = temp;
                        }
                    }
                }
                if(users[i]['user'] == usernameTemplate){
                    chartBicep.data.datasets.push({
                            label: users[i]['user'],
                            data: users[i]['bicep'],
                            backgroundColor: users[i]['gradient'],
                            minBarLength: 100,
                            borderWidth: 5,
                            borderColor: '#6573e0'
                    });
                }else{
                    chartBicep.data.datasets.push({
                        label: users[i]['user'],
                        data: users[i]['bicep'],
                        backgroundColor: users[i]['gradient'],
                        minBarLength: 100,
                        borderWidth: 2,
                        borderColor: '#fff'
                    });
                }
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
                rand1 = Math.floor(255 * Math.random());
                rand2 = Math.floor(255 * Math.random());
                rand3 = Math.floor(255 * Math.random());
                users[i]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);
                users[i]['gradient'].addColorStop(0, `rgba(${rand1},${rand2},${rand3},1)`);   
                users[i]['gradient'].addColorStop(1, `rgba(${rand1},${rand2},${rand3},0)`);
                let temp;
                let tempDates = users[i]['date'].map(function (i) { return i });
                for(let j=0;j<dates.length;j++){
                    if(dates[j] != tempDates[j] && tempDates[j] != undefined){
                        temp = users[i]['hips'][j];
                        users[i]['hips'][j] = (users[i]['hips'][j-1]+users[i]['hips'][j])/2;
                        users[i]['hips'][j+1] = temp;
                        if(tempDates[j+1] == undefined){
                            tempDates[j+1] = dates[j];
                        }
                    }else{
                        if(j<dates.length-1 && tempDates[j+1] == undefined){
                            tempDates[j+1] = dates[j+1];
                            temp = users[i]['hips'][j];
                            users[i]['hips'][j+1] = temp;
                        }
                    }
                }
                if(users[i]['user'] == usernameTemplate){
                    chartHips.data.datasets.push({
                            label: users[i]['user'],
                            data: users[i]['hips'],
                            backgroundColor: users[i]['gradient'],
                            minBarLength: 100,
                            borderWidth: 5,
                            borderColor: '#6573e0'
                    });
                }else{
                    chartHips.data.datasets.push({
                        label: users[i]['user'],
                        data: users[i]['hips'],
                        backgroundColor: users[i]['gradient'],
                        minBarLength: 100,
                        borderWidth: 2,
                        borderColor: '#fff'
                    });
                }
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
                rand1 = Math.floor(255 * Math.random());
                rand2 = Math.floor(255 * Math.random());
                rand3 = Math.floor(255 * Math.random());
                users[i]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);
                users[i]['gradient'].addColorStop(0, `rgba(${rand1},${rand2},${rand3},1)`);   
                users[i]['gradient'].addColorStop(1, `rgba(${rand1},${rand2},${rand3},0)`);
                let temp;
                let tempDates = users[i]['date'].map(function (i) { return i });
                for(let j=0;j<dates.length;j++){
                    if(dates[j] != tempDates[j] && tempDates[j] != undefined){
                        temp = users[i]['thigh'][j];
                        users[i]['thigh'][j] = (users[i]['thigh'][j-1]+users[i]['thigh'][j])/2;
                        users[i]['thigh'][j+1] = temp;
                        if(tempDates[j+1] == undefined){
                            tempDates[j+1] = dates[j];
                        }
                    }else{
                        if(j<dates.length-1 && tempDates[j+1] == undefined){
                            tempDates[j+1] = dates[j+1];
                            temp = users[i]['thigh'][j];
                            users[i]['thigh'][j+1] = temp;
                        }
                    }
                }
                if(users[i]['user'] == usernameTemplate){
                    chartThigh.data.datasets.push({
                            label: users[i]['user'],
                            data: users[i]['thigh'],
                            backgroundColor: users[i]['gradient'],
                            minBarLength: 100,
                            borderWidth: 5,
                            borderColor: '#6573e0'
                    });
                }else{
                    chartThigh.data.datasets.push({
                        label: users[i]['user'],
                        data: users[i]['thigh'],
                        backgroundColor: users[i]['gradient'],
                        minBarLength: 100,
                        borderWidth: 2,
                        borderColor: '#fff'
                    });
                }
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
                rand1 = Math.floor(255 * Math.random());
                rand2 = Math.floor(255 * Math.random());
                rand3 = Math.floor(255 * Math.random());
                users[i]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);
                users[i]['gradient'].addColorStop(0, `rgba(${rand1},${rand2},${rand3},1)`);   
                users[i]['gradient'].addColorStop(1, `rgba(${rand1},${rand2},${rand3},0)`);
                let temp;
                let tempDates = users[i]['date'].map(function (i) { return i });
                for(let j=0;j<dates.length;j++){
                    if(dates[j] != tempDates[j] && tempDates[j] != undefined){
                        temp = users[i]['waist'][j];
                        users[i]['waist'][j] = (users[i]['waist'][j-1]+users[i]['waist'][j])/2;
                        users[i]['waist'][j+1] = temp;
                        if(tempDates[j+1] == undefined){
                            tempDates[j+1] = dates[j];
                        }
                    }else{
                        if(j<dates.length-1 && tempDates[j+1] == undefined){
                            tempDates[j+1] = dates[j+1];
                            temp = users[i]['waist'][j];
                            users[i]['waist'][j+1] = temp;
                        }
                    }
                }
                if(users[i]['user'] == usernameTemplate){
                    chartWaist.data.datasets.push({
                            label: users[i]['user'],
                            data: users[i]['waist'],
                            backgroundColor: users[i]['gradient'],
                            minBarLength: 100,
                            borderWidth: 5,
                            borderColor: '#6573e0'
                    });
                }else{
                    chartWaist.data.datasets.push({
                        label: users[i]['user'],
                        data: users[i]['waist'],
                        backgroundColor: users[i]['gradient'],
                        minBarLength: 100,
                        borderWidth: 2,
                        borderColor: '#fff'
                    });
                }
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
                rand1 = Math.floor(255 * Math.random());
                rand2 = Math.floor(255 * Math.random());
                rand3 = Math.floor(255 * Math.random());
                users[i]['gradient'] = myChartWeight.createLinearGradient(0, 0, 0, 400);
                users[i]['gradient'].addColorStop(0, `rgba(${rand1},${rand2},${rand3},1)`);   
                users[i]['gradient'].addColorStop(1, `rgba(${rand1},${rand2},${rand3},0)`);
                let temp;
                let tempDates = users[i]['date'].map(function (i) { return i });
                for(let j=0;j<dates.length;j++){
                    if(dates[j] != tempDates[j] && tempDates[j] != undefined){
                        temp = users[i]['arms'][j];
                        users[i]['arms'][j] = (users[i]['arms'][j-1]+users[i]['arms'][j])/2;
                        users[i]['arms'][j+1] = temp;
                        if(tempDates[j+1] == undefined){
                            tempDates[j+1] = dates[j];
                        }
                    }else{
                        if(j<dates.length-1 && tempDates[j+1] == undefined){
                            tempDates[j+1] = dates[j+1];
                            temp = users[i]['arms'][j];
                            users[i]['arms'][j+1] = temp;
                        }
                    }
                }
                if(users[i]['user'] == usernameTemplate){
                    chartArms.data.datasets.push({
                            label: users[i]['user'],
                            data: users[i]['arms'],
                            backgroundColor: users[i]['gradient'],
                            minBarLength: 100,
                            borderWidth: 5,
                            borderColor: '#6573e0'
                    });
                }else{
                    chartArms.data.datasets.push({
                        label: users[i]['user'],
                        data: users[i]['arms'],
                        backgroundColor: users[i]['gradient'],
                        minBarLength: 100,
                        borderWidth: 2,
                        borderColor: '#fff'
                    });
                }
            };
            chartArms.update();
        });
    }

      