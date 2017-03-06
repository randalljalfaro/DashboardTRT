app.factory('chartDataFactory', function() {
	
	function groupYearByMonth(data, config){
		var chartData = [];
		var series = [];
		var yearIndexes = {};

		for(var channelId in data){
			var channel = data[channelId];
			for(var yearPos in channel.years){
				var yearData = channel.years[yearPos];
				//Si no existe el año, agregamos todos los meses en cero
				if(yearIndexes[yearData.year]==null){
					chartData.push([0,0,0,0,0,0,0,0,0,0,0,0]);
					series.push(yearData.year);
					yearIndexes[yearData.year] = chartData.length - 1;
				}
				for(var monthPos in yearData.months){
					var month = yearData.months[monthPos];
					var value = month[config.variable];
					if(value==null)
						value = 0;
					chartData[yearIndexes[yearData.year]][month.number] += value;
				}
			}
		}
		return {
			data : chartData,
			series : series,
			options :  getOptions(config)
		}
	}

	function groupChannelValues(data, config){
		var totalChartData = [];
		var chartData = [];
		var labels = [];
		for(var channelId in data){
			var channel = data[channelId];
			totalChartData.push(0);
			labels.push(channel.name);
			var channelIndex = totalChartData.length - 1;
			for(var yearPos in channel.years){
				var yearData = channel.years[yearPos];
				//alert(JSON.stringify(yearData.months));

				for(var monthPos in yearData.months){
					var month = yearData.months[monthPos];
					var value = month[config.variable];
					if(value==null)
						value = 0;
					totalChartData[channelIndex] += value;
				}
			}
		}
		var total = 0;
		for(var i in totalChartData){
			total += totalChartData[i];
		}
		for(var i in totalChartData){
			chartData.push((100/total)*totalChartData[i]);
		}
		return {
			data : chartData,
			labels : labels,
			options :  getOptions(config)
		}
	}

	function groupChannelByMonth(data, config){
		var chartData = [];
		var series = [];

		for(var channelId in data){
			var channel = data[channelId];
			var anualArray = [0,0,0,0,0,0,0,0,0,0,0,0];
			for(var yearPos in channel.years){
				var yearData = channel.years[yearPos];
				for(var monthPos in yearData.months){
					var month = yearData.months[monthPos];
					var value = month[config.variable];
					if(value==null)
						value = 0;
					anualArray[month.number] += value;
				}
			}
			chartData.push(anualArray);
			series.push(channel.name);
		}

		return {
			data : chartData,
			series : series,
			options :  getOptions(config)
		}
	}


	function getOptions(config){
		var options = {
			defaultFontSize: 20,
			responsive: true,
			scaleShowGridLines: true,
			barValueSpacing: 10,
			barDatasetSpacing: 3,
			title: {
				display: true,
				text: config.title,
				fontSize: 22,
				fontColor:"#000",
				padding:50
			},
			legend: {
				display: true,
				position : "right",
				fullWidth:true,
				labels : {
					fontSize:20,
					padding: 20,
					fontColor:"#000"
				}
			},
			tooltips: {
				enabled: true,
				mode: 'single',
				bodyFontSize:15,
				callbacks: {
					/*label: function(tooltipItem, data) {
						var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
						return $attrs.symbol + mathUtil.format(datasetLabel,$attrs.fixed);
					}*/
				}
			},
			animation: {
				duration: 0,
				//onComplete: update,
				//onProgress: update
			}
		};
		if(config.type=="bar" || config.type=="line" ){
			options.scales = {
				yAxes: [{
					scaleLabel: {
						fontSize:25,
						display: true,
						labelString: config.ylabel,
						fontColor:"#000"
					},
					display: true,
					ticks: {
						beginAtZero: true,
						fontSize: 25,
						//callback: function(value) { 
						//	return '' + mathUtil.format(value,0); 
						//}
					}
				}],
				xAxes: [{
					scaleLabel: {
						fontSize:20,
						display: true,
						labelString: config.xlabel,
						fontColor:"#000"
					},
					display: true,
					ticks: {
						beginAtZero: true,
						fontSize: 25
					}
				}]
			};
		}
		return options;
	}
	return {
		groupYearByMonth : groupYearByMonth,
		groupChannelValues : groupChannelValues,
		groupChannelByMonth : groupChannelByMonth
	};
});