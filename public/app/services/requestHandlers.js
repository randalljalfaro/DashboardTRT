app.factory('requestHandlers', function($http) {
	//Users
	function get_users(successCallback, errorCallback){
		$http({
			method: 'GET',
			url: '/users'
		}).then(successCallback, errorCallback);
	}
	function get_current_user(successCallback, errorCallback){
		$http({
			method: 'GET',
			url: '/users/current'
		}).then(successCallback, errorCallback);
	}
	function delete_user(_id, successCallback, errorCallback){
		//Usar un confirmation dialog para confirmar que quiere borrar
		$http({
			method: 'DELETE',
			url: '/users/'+_id
		}).then(successCallback, errorCallback);
	}
	function new_password_user(data, successCallback, errorCallback){
		var req = {
			method: 'PUT',
			url: '/users/newPassword',
			headers: {
				'Content-Type': "application/json"
			},
			data: data
		}
		$http(req).success(successCallback).error(errorCallback);
	}

	//*****************************************************************
	//Channels
	function get_channels(successCallback, errorCallback){
		$http({
			method: 'GET',
			url: '/channels'
		}).then(successCallback, errorCallback);
	}
	function create_channel(channel, successCallback, errorCallback){
		$http.post('/channels/', JSON.stringify(channel))
		.success(successCallback)
		.error(errorCallback);
	}
	function delete_channel(_id, successCallback, errorCallback){
		//Usar un confirmation dialog para confirmar que quiere borrar
		$http({
			method: 'DELETE',
			url: '/channels/'+_id
		}).then(successCallback, errorCallback);
	}

	//*****************************************************************
	//Properties
	function get_properties(data, successCallback, errorCallback){
		var req = {
			method: 'POST',
			url: '/properties/get',
			headers: {
				'Content-Type': "application/json"
			},
			data: data
		}
		$http(req).success(successCallback).error(errorCallback);
	}
	function update_property(data, successCallback, errorCallback){
		var req = {
			method: 'PUT',
			url: '/properties',
			headers: {
				'Content-Type': "application/json"
			},
			data: data
		}
		$http(req).success(successCallback).error(errorCallback);
	}
	function create_property(property, successCallback, errorCallback){
		$http.post('/properties/', JSON.stringify(property))
		.success(successCallback)
		.error(errorCallback);
	}
	function delete_property(_id, successCallback, errorCallback){
		//Usar un confirmation dialog para confirmar que quiere borrar
		$http({
			method: 'DELETE',
			url: '/properties/'+_id
		}).then(successCallback, errorCallback);
	}

	//*****************************************************************
	//Properties Data
	function get_properties_data(query, successCallback, errorCallback){
		var req = {
			method: 'POST',
			url: '/properties_data/get',
			headers: {
				'Content-Type': "application/json"
			},
			data: query
		}
		$http(req).success(successCallback).error(errorCallback);
	}
	function update_properties_data(data, successCallback, errorCallback){
		var req = {
			method: 'POST',
			url: '/properties_data/update',
			headers: {
				'Content-Type': "application/json"
			},
			data: data
		}
		$http(req).success(successCallback).error(errorCallback);
	}

	return {
		users: {
			get : get_users,
			getCurrent : get_current_user,
			delete : delete_user,
			newPassword : new_password_user
		},
		channels: {
			get : get_channels,
			create : create_channel,
			delete : delete_channel
		},
		properties: {
			get : get_properties,
			create : create_property,
			delete : delete_property,
			update : update_property
		},
		properties_data: {
			get : get_properties_data,
			update: update_properties_data
		}
	};
});

/*
success(function(response, status, headers, config) {
	console.log(data);
}).
error(function(response, status, headers, config) {
});
*/