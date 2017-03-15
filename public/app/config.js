app.config(["$authProvider", function($authProvider) {
	//var url = "http://ec2-54-91-182-133.compute-1.amazonaws.com:3000/";
	var url = window.location.protocol + "//" + window.location.host + "/";
	$authProvider.loginUrl = url+"auth/login";
	$authProvider.signupUrl = url+"auth/signup";
	$authProvider.tokenName = "Dashboard";
	$authProvider.tokenPrefix = "TRT";
}]);

app.filter('startFrom', function() {
	return function(input, start) {
        start = +start; //parse to int
        if (input)
        	return input.slice(start);
    }
});