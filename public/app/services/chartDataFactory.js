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
		//var totalChartData = [];
		config.total = 0;
		config.data = [];
		config.labels = [];
		config.percentages = [];
		for(var channelId in data){
			var channel = data[channelId];
			config.data.push(0);
			config.labels.push(channel.name);
			var channelIndex = config.data.length - 1;
			for(var yearPos in channel.years){
				var yearData = channel.years[yearPos];
				//alert(JSON.stringify(yearData.months));

				for(var monthPos in yearData.months){
					var month = yearData.months[monthPos];
					var value = month[config.variable];
					if(value==null)
						value = 0;
					config.data[channelIndex] += value;
					config.total+=value;
				}
			}
		}
		for(var i in config.data){
			config.percentages.push((100/config.total)*config.data[i]);
		}
		return {
			data : config.data,
			labels : config.labels,
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
				text: config.title,
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
		if(config.type=="bar" || config.type=="line" ){
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
		}else{
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
					labelxy = [],
					offset = Math.PI / 2, 
					radius,
					centerx,
					centery, 
					lastend = 0; 

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
								ctx.fillText(config.labels[i], dx, dy-40);
							//}
							//if($scope.config.showPerc){
								ctx.fillText(config.percentages[i].toFixed(3) + '%', dx, dy-15);
							//}
							//if($scope.config.showValues){
								ctx.fillText(config.data[i], dx, dy+10);
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
		groupYearByMonth : groupYearByMonth,
		groupChannelValues : groupChannelValues,
		groupChannelByMonth : groupChannelByMonth
	};
});