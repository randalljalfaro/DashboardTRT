app.factory('formater', function() {
	function toNumberFormat(num){
		//console.log(num);
		var arrayStr = (""+num).split(".");
		if(arrayStr.length>2){
			return null;
		}
		var units = reverse(toFormatMilis(reverse(arrayStr[0])));
		var decimals = null;
		if(arrayStr.length==2){
			decimals = toFormatMilis(arrayStr[1]);
		}
		if(decimals!=null){
			return units+","+decimals;
		}
		else return units;
	}

	function toFormatMilis(strNum){
		var result = "";
		for(var i in strNum){
			if(i!=0 && i%3==0){
				result+=("."+strNum[i]);
			}else{
				result+=strNum[i];
			}
		}
		return result;
	}

	//12.343.333,454.54 ---> 1.343.333 / 454.54
	function fromNumberFormat(str, decimalsCount){
		if(str.length==0){
			return null;
		}

		var arrayStr = (String(str)).split(",");
		if(arrayStr.length==0 || arrayStr.length>2){
			return null;
		}


		var validUnits = null;
		var validDecimals = null;
		if(arrayStr.length>0){
			validUnits = integerFormat(""+arrayStr[0]);
		}
		if(arrayStr.length>1){
			validDecimals = integerFormat(reverse(""+arrayStr[1]));
		}

		var result = "";
		if(validUnits==null || (validDecimals==null && arrayStr.length==2)){
			return null;
		}
		if(validUnits!=null && validDecimals!=null){
			return parseFloat(validUnits+"."+reverse(validDecimals));
		}
		return parseInt(validUnits);
	}

	//12.343.333 ---> 12 / 343 / 333
	function integerFormat(str){
		//alert(typeof str);
		if(str.length==1){
			return parseInt(str);
		}
		var arrayStr = str.split(".");

		var result = "";
		for (var i in arrayStr) {
			var section = arrayStr[i];
			if(i == 0 && (section.length == 0 || section.length>3)){
				return null;
			}
			else if(i > 0 && section.length != 3){
				return null;
			}
			var validSection = integerValid(section);
			if(isNaN(validSection) || validSection==null){
				return null;
			}
			result += validSection;
		}
		return result;
	}

	//12 ---> 1 / 2
	function integerValid(section){
		var result = "";
		for (var i in section) {
			var validNumber = parseInt(section[i]);
			if(!isNaN(validNumber) || validNumber!=null){
				result += (""+validNumber);
			}
			else return null;
		}
		return result;
	}

	function reverse(str){
		return (""+str).split("").reverse().join("")+"";
	}

	return { 
		fromNumberFormat : fromNumberFormat,
		toNumberFormat : toNumberFormat
	};
});