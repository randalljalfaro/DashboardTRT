app.factory('chartDataFactory', ['formater', function(formater) {

	function groupForTableEdit(data, properties, channels){
		//Se asume que solo viene un canal
		var tableData = {};
		var monthlyTotals = {};
		var yearTotals = {};
		var channelYearTotals = {};

		for(var i in data){
			if(!tableData[data[i]._id.year]){
				//Categorización de los datos por año
				tableData[data[i]._id.year] = {};
				//Totales mensuales por año de cada variable
				monthlyTotals[data[i]._id.year] = {
					"0":{amount: 0, bedroom_count: 0},
					"1":{amount: 0, bedroom_count: 0},
					"2":{amount: 0, bedroom_count: 0},
					"3":{amount: 0, bedroom_count: 0},
					"4":{amount: 0, bedroom_count: 0},
					"5":{amount: 0, bedroom_count: 0},
					"6":{amount: 0, bedroom_count: 0},
					"7":{amount: 0, bedroom_count: 0},
					"8":{amount: 0, bedroom_count: 0},
					"9":{amount: 0, bedroom_count: 0},
					"10":{amount: 0, bedroom_count: 0},
					"11":{amount: 0, bedroom_count: 0},
				};
				//Totales anuales de cada variable
				yearTotals[data[i]._id.year] = {
					amount: 0, bedroom_count: 0
				};
				//Sumatoria anual de cada canal, para cada vaiable
				channelYearTotals[data[i]._id.year] = {};
			}
			if(!tableData[data[i]._id.year][data[i]._id.channel]){
				tableData[data[i]._id.year][data[i]._id.channel] = {
					"0":{amount: 0, bedroom_count: 0},
					"1":{amount: 0, bedroom_count: 0},
					"2":{amount: 0, bedroom_count: 0},
					"3":{amount: 0, bedroom_count: 0},
					"4":{amount: 0, bedroom_count: 0},
					"5":{amount: 0, bedroom_count: 0},
					"6":{amount: 0, bedroom_count: 0},
					"7":{amount: 0, bedroom_count: 0},
					"8":{amount: 0, bedroom_count: 0},
					"9":{amount: 0, bedroom_count: 0},
					"10":{amount: 0, bedroom_count: 0},
					"11":{amount: 0, bedroom_count: 0},
				};
				channelYearTotals[data[i]._id.year][data[i]._id.channel] = {
					amount: 0, bedroom_count: 0
				};
			}
			for(var j in data[i].months){
				var month = data[i].months[j];
				tableData[data[i]._id.year][data[i]._id.channel][""+month.number].amount += month.amount;
				tableData[data[i]._id.year][data[i]._id.channel][""+month.number].bedroom_count += month.bedroom_count;
				monthlyTotals[data[i]._id.year][""+month.number].amount += month.amount;
				monthlyTotals[data[i]._id.year][""+month.number].bedroom_count += month.bedroom_count;
				yearTotals[data[i]._id.year].amount += month.amount;
				yearTotals[data[i]._id.year].bedroom_count += month.bedroom_count;
				channelYearTotals[data[i]._id.year][data[i]._id.channel].amount += month.amount;
				channelYearTotals[data[i]._id.year][data[i]._id.channel].bedroom_count += month.bedroom_count;
			}
		}
		for (var year in tableData){
			for (var channelId in tableData[year]){
				for (var month in tableData[year][channelId]){
					tableData[year][channelId][month].amount = formater.toNumberFormat(tableData[year][channelId][month].amount);
					tableData[year][channelId][month].bedroom_count = formater.toNumberFormat(tableData[year][channelId][month].bedroom_count);
				}
			}
		}

		return {
			tableData : tableData,
			yearTotals : yearTotals,
			monthlyTotals : monthlyTotals,
			channelYearTotals : channelYearTotals
		};
	}

	function groupForTable(data){
		var monthlyTotal = {};
		var yearTotals = {
			amount: {}, bedroom_count: {}
		};
		var channelYearTotals = {
			amount: {}, bedroom_count: {}
		};

		for(var i in data){
			if(!monthlyTotal[data[i]._id.year]){
				monthlyTotal[data[i]._id.year] = {};
				yearTotals.amount[data[i]._id.year] = {};
				yearTotals.bedroom_count[data[i]._id.year] = {};
				channelYearTotals[data[i]._id.year] = 0;
			}
			if(!monthlyTotal[data[i]._id.year][data[i]._id.channel]){
				monthlyTotal[data[i]._id.year][data[i]._id.channel] = {};
				yearTotals.amount[data[i]._id.year][data[i]._id.channel] = 0;
				yearTotals.bedroom_count[data[i]._id.year][data[i]._id.channel] = 0;
				ol[data[i]._id.year][data[i]._id.channel] = 0;
			}
			for(var j in data[i].months){
				var month = data[i].months[j];
				monthlyTotal[data[i]._id.year][data[i]._id.channel][month] = month;
				yearTotals.amount[data[i]._id.year] = 0;
				yearTotals.bedroom_count[data[i]._id.year] = 0;
			}
		}
		return {
			grouped : monthlyTotal,
			yearTotals : yearTotals,
			channelYearTotals : channelYearTotals
		};
	}
	
	function groupYearByMonth(data, config){
		var series = [];
		var chartData = [];
		var dataByYear = {};

		for(var i in data){
			if(!dataByYear[data[i]._id.year]){
				dataByYear[data[i]._id.year] = [0,0,0,0,0,0,0,0,0,0,0,0];
				series.push(data[i]._id.year);
			}
			for(var j in data[i].months){
				dataByYear[data[i]._id.year][data[i].months[j].number] += data[i].months[j][config.variable];
			}
		}



		for(var year in dataByYear){
			var yearArray = [];
			for(var numMonth in dataByYear[year]){
				yearArray.push(dataByYear[year][numMonth]);
			}
			chartData.push(yearArray);
		}

		return {
			data : chartData,
			series : series,
			options :  getOptions(config, null, null, null, config.title)
		}
	}

	function groupYearsByChannel(data, config, properties, channels){
		//var totalChartData = [];
		var dataByYear = {};
		//Clasificar por año
		//Todo lo que se sea del mismo año, se pone en el mismo array
		for(var i in data){
			if(!dataByYear[data[i]._id.year]){
				dataByYear[data[i]._id.year] = {};
			}
			if(!dataByYear[data[i]._id.year][data[i]._id.channel]){
				dataByYear[data[i]._id.year][data[i]._id.channel] = [data[i].months];
			}
			else{
				dataByYear[data[i]._id.year][data[i]._id.channel].push(data[i].months);
			};
		}

		//Clasificar por canal, cada uno de los años
		var total = 0;
		var allDataArray = [];
		var allLabelsArray = [];
		var allTotalsArray = [];
		//var allPercArray = [];
		var allOptionsArray = [];

		for(year in dataByYear){
			var yearTotal = 0;
			var dataArray = [];
			var labelsArray = [];
			var percArray = [];
			for(channelId in dataByYear[year]){
				var channelYearTotal = 0;
				for(i in dataByYear[year][channelId]){
					var months = dataByYear[year][channelId][i];
					for(j in months){
						channelYearTotal += months[j][config.variable];
					}
				}
				total += channelYearTotal;
				yearTotal += channelYearTotal;
				dataArray.push(channelYearTotal);
				labelsArray.push(channels[channelId].name);
			}
			for(i in dataArray){
				percArray.push((100/yearTotal)*dataArray[i]);
			}
			allDataArray.push(dataArray);
			allLabelsArray.push(labelsArray);
			allTotalsArray.push(yearTotal);
			//allPercArray.push(percArray);
			allOptionsArray.push(getOptions(config, dataArray, labelsArray, percArray, 
				"Año "+year));
		}

		return {
			data : allDataArray,
			labels : allLabelsArray,
			//percentages : allPercArray,
			totals : allTotalsArray,
			total : total,
			options : allOptionsArray
		}


	}

	function groupChannelByMonth(data, config, properties, channels, filterConfig){
		var chartData = [];
		var series = [];
		var labels = [];

		var fromYear = Number(filterConfig.fromYear);
		var toYear = Number(filterConfig.toYear);

		var dataByChannel = {};
		for(var i in data){
			var channelId = data[i]._id.channel;
			if(!dataByChannel[channelId]){
				dataByChannel[channelId] = {};
				//Con esto se rellenan todos los años y los meses con cero
				for(var year=fromYear; year<=toYear; year++){
					dataByChannel[channelId][year] = {};
					for(var numMonth=0; numMonth<12; numMonth++){
						dataByChannel[channelId][year][numMonth] = 0;
					}
				}
			}

			// Se sobreescriben los valores reales
			for(var j in data[i].months){
				var numMonth = data[i].months[j].number;
				dataByChannel[channelId][data[i]._id.year][numMonth] = data[i].months[j][config.variable];
			}
		}
		//console.log(dataByChannel);

		for(var channelId in dataByChannel){
			var dataArray = [];
			for(var year in dataByChannel[channelId]){
				for(var numMonth in dataByChannel[channelId][year]){
					dataArray.push(dataByChannel[channelId][year][numMonth]);
				}
			}
			series.push(channels[channelId].name);
			chartData.push(dataArray);
		}

		for(var year=fromYear; year<=toYear; year++){
			var strYear = (""+year);
			var lastDigits = strYear.substring(strYear.length-2, strYear.length);
			for(var numMonth=1; numMonth<=12; numMonth++){
				labels.push(numMonth+"/"+lastDigits);
			}
		}

		return {
			data : chartData,
			series : series,
			labels : labels,
			options :  getOptions(config, null, null, null, config.title)
		}
	}


	function getOptions(config, data, labels, percentages, title){
		//
		var options = {
			colors : ["#97BBCD", "#F74654","#46BFBD", "#FDB45C", "#228B22", 
			"#4682b4", '#949FB1','#fdb45c', "#008B8B", "#5F9EA0", "#CD853F"],
			defaultFontSize: 20,
			responsive: true,
			scaleShowGridLines: true,
			barValueSpacing: 10,
			barDatasetSpacing: 3,
			title: {
				display: true,
				text: title,
				fontSize: 30,
				fontColor:"#000",
				padding:50
			},
			legend: {
				display: true,
				position : "right",
				fullWidth:true,
				labels : {
					fontSize:25,
					padding: 20,
					fontColor:"#000"
				}
			},
			tooltips: {
				enabled: true,
				mode: 'single',
				bodyFontSize:17,
				callbacks: {
					/*label: function(tooltipItem, data) {
						var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
						return $attrs.symbol + mathUtil.format(datasetLabel,$attrs.fixed);
					}*/
				}
			}
		};
		if(config.type=="bar" || config.type=="line" ) {
			options.scales = {
				yAxes: [{
					scaleLabel: {
						fontSize:30,
						display: true,
						labelString: config.ylabel,
						fontColor:"#000"
					},
					display: true,
					ticks: {
						beginAtZero: true,
						fontSize: 27,
						//callback: function(value) { 
						//	return '' + mathUtil.format(value,0); 
						//}
					}
				}],
				xAxes: [{
					scaleLabel: {
						fontSize:30,
						display: true,
						labelString: config.xlabel,
						fontColor:"#000"
					},
					display: true,
					ticks: {
						fontSize: 27
					}
				}]
			};
		}
		else {
			options.animation={
				duration: 0,
				onComplete: update,
				onProgress: update
			};
			function update() {
				var self = this,
				chartInstance = this.chart,
				ctx = chartInstance.ctx;
				chartAux = this.chart;

				ctx.font = '25px Arial';
				ctx.textAlign = "center";
				ctx.fillStyle = "#000000";

				Chart.helpers.each(self.data.datasets.forEach(function (dataset, datasetIndex) {
					var meta = self.getDatasetMeta(datasetIndex),
					labelxy = [], offset = Math.PI / 2, radius, centerx, centery, lastend = 0; 

					Chart.helpers.each(meta.data.forEach( function (element, index) {
						radius = 0.9 * element._model.outerRadius - element._model.innerRadius;
						centerx = element._model.x;
						centery = element._model.y;
						var thispart = dataset.data[index],
						arcsector = Math.PI * (2 * thispart / config.total);
						if (element.hasValue() && dataset.data[index] > 0) {
							labelxy.push(lastend + arcsector / 2 + Math.PI + offset);
						}
						else {
							labelxy.push(-1);
						}
						lastend += arcsector;
					}), self)

					var lradius = radius * 3 / 4;
					var i = 0;
					for (var idx in labelxy) {
						if (labelxy[idx] === -1) continue;
						var langle = labelxy[idx],
						dx = centerx + lradius * Math.cos(langle),
						dy = centery + lradius * Math.sin(langle);
						//if(val>=5 || $scope.config.showLowerValues){
							//if($scope.config.showName){
								ctx.fillText(labels[i], dx, dy-40);
							//}
							//if($scope.config.showPerc){
								ctx.fillText(percentages[i].toFixed(3) + '%', dx, dy-15);
							//}
							//if($scope.config.showValues){
								ctx.fillText(data[i], dx, dy+10);
							//}
						//ctx.fillText($attrs.symbol+' '+mathUtil.format(dataset.data[idx],2), dx, dy+40);
						//}
						i++;
					}

				}), self);
			}
		}
		return options;
	}
	return {
		groupForTable : groupForTable,
		groupForTableEdit : groupForTableEdit,
		groupYearByMonth : groupYearByMonth,
		groupYearsByChannel : groupYearsByChannel,
		groupChannelByMonth : groupChannelByMonth
	};
}]);