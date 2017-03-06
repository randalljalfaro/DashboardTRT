/*
db.properties.aggregate( [ 
{
	$match: {
		"_id" : ObjectId("58a6191095aa42bc449a82bc"),
		"data.years.year" : 2015
	}
},
{ 
	$unwind: { 
		path: "$data"
	} 
},
{ 
	$unwind: { 
		path: "$data.years"
	} 
},
{ 
	$unwind: { 
		path: "$data.years.months"
	} 
},
{
	$match: {
		"data.years.months.number" : {
			"$gt":8,
			"$lt":11
		}
	}
},
] ).pretty();
*/

//******************************************************************************
//Colección que tiene los tipos de permisos por cada módulo
/*db.createCollection("permission");
db.permission.insert({
	module:"billing_information", 
	types:[
	{
		name:"data_admin",
		divided_by:"property",
		label:"Administrador de datos"
	},
	{
		name:"reports",
		divided_by:"property",
		label:"Visualizar reportes"
	}
	]
});

//Colección que tiene los canales a los que pueden estar suscritos las propiedades
db.createCollection("channels");
db.channels.insert({
	_id: "ID_BE",
	name:"Booking Engine"
});
db.channels.insert({
	_id: "ID_EX",
	name:"Expedia"
});


//Colección que tiene las propiedades (Hoteles)
db.createCollection("property");
db.property.insert({
	_id:"ID_HLP",
	name:"Hotel Los Patitos",
	type:"Con booking",
	channels:[{_id: "ID_EX"}]
});
db.property.insert({
	_id:"ID_ET",
	name:"Hotel El Test",
	type:"Sin booking",
	channels:[
	{_id: "ID_BE"},
	{_id: "ID_EX"}
	]
});
*/







//**************************************************************************************
//DUMMYS

/*
var permissions = [
{
	module:"billing_information", 
	types:[
	//El de admin se da por sentado
	{
		name:"data_admin",
		divided_by:"property",
		label:"Administrar datos"
	},
	{
		name:"reports",
		divided_by:"property",
		label:"Visualizar reportes"
	}
	]
}
];

var channels = [
{
	_id: "ID_BE",
	name:"Booking engine",
	link: "www.booking.com"
},
{
	_id: "ID_EX",
	name:"Expedia",
	link: "www.expedia.com"
}
]


//Usando populate en mongoose, debería traer este array
var properties = [
{
	_id:"ID_HLP",
	name:"Hotel Los Patitos",
	type:"Con booking",
	channels:[

	{
		_id: "ID_BE",
		name:"Booking engine",
		link: "www.booking.com"
	},
	{
		_id: "ID_EX",
		name:"Expedia",
		link: "www.expedia.com"
	}
	]
},
{
	_id:"ID_ET",
	name:"Hotel El Test",
	type:"Sin booking",
	channels:[

	{
		_id: "ID_BE",
		name:"Booking engine",
		link: "www.booking.com"
	},
	{
		_id: "ID_EX",
		name:"Expedia",
		link: "www.expedia.com"
	}
	]
}
];
*/