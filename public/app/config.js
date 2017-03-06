app.config(["$authProvider", function($authProvider) {
	var url = "http://127.0.0.1:3000/";
	$authProvider.loginUrl = url+"auth/login";
	$authProvider.signupUrl = url+"auth/signup";
	$authProvider.tokenName = "Dashboard";
	$authProvider.tokenPrefix = "TRT";
}]);

