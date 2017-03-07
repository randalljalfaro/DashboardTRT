app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
	var appDir = "/app/";
	$urlRouterProvider.otherwise("home");
	$stateProvider
	.state("home", {
		url: "/home",
		templateUrl: appDir+"views/home.html",
		controller: "HomeCtrl"
	})
	//Authentication states
	.state("login", {
		url: "/auth/login",
		templateUrl: appDir+"views/authentication/login.html",
		controller: "LoginCtrl",
		controllerAs: "login"
	})
	.state("signup", {
		url: "/auth/signup",
		templateUrl: appDir+"views/authentication/signup.html",
		controller: "SignUpCtrl",
		controllerAs: "signup"
	})
	.state("logout", {
		url: "/auth/logout",
		templateUrl: null,
		controller: "LogoutCtrl"
	})
	.state("users", {
		url: "/users",
		templateUrl: appDir+"views/users/index.html",
		controller: "UsersCtrl"
	})

	//Channels
	.state("channels", {
		url: "/channels",
		templateUrl: appDir+"views/channels/index.html",
		controller: "ChannelsCtrl"
	})
	.state("channels_create", {
		url: "/channels/create",
		templateUrl: appDir+"views/channels/create.html",
		controller: "ChannelCreateCtrl"
	})

	//Properties
	.state("properties", {
		url: "/properties",
		templateUrl: appDir+"views/properties/index.html",
		controller: "PropertiesCtrl"
	})
	.state("properties_create", {
		url: "/properties/create",
		templateUrl: appDir+"views/properties/create.html",
		controller: "PropertyCreateCtrl"
	})
	.state("properties_update", {
		url: "/properties/update/:property",
		templateUrl: appDir+"views/properties/create.html",
		controller: "PropertyCreateCtrl"
	})

	//Properties Data
	.state("properties_data", {
		url: "/properties_data",
		templateUrl: appDir+"views/properties_data/index.html",
		controller: "PropertiesDataCtrl"
	})

	//Reports
	.state("reports", {
		url: "/reports",
		templateUrl: appDir+"views/reports/index.html",
		controller: "ReportsCtrl"
	});
	

}]);