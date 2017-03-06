use trt_dashboard;

//Limpia la base de datos
db.dropDatabase();

//Colección que tiene las propiedades (Hoteles)
db.createCollection("users");
db.users.insert({
	"_id" : new ObjectId(),
	"complete_name" : "Administrador",
	"email" : "admin@admin.com",
	"username" : "admin",
	"password" : "$2a$10$AYkcMXzcOjoupeZHSTnVe.QmZSkvw2ZwzrTboGu8awy.xpmBLWS2y",
	"roles" : [
	{
		"type" : "admin",
		"_id" : "admin_role",
		"sections" : [ ]
	}
	],
	"__v" : 0
});
//Colección que tiene las propiedades (Hoteles)
db.createCollection("channels");
var channelId = new ObjectId();
db.channels.insert({
	"_id" : channelId,
	"name" : "Canal El Test",
	"link" : "www.test.com"
});
var channelId2 = new ObjectId();
db.channels.insert({
	"_id" : channelId2,
	"name" : "Canal Los Patitos",
	"link" : "www.patitos.com"
});

//Colección que tiene las propiedades (Hoteles)
db.createCollection("properties");
var propertyId = new ObjectId();
db.properties.insert({
	"_id" : propertyId,
	"name" : "Hotel El Test",
	"type" : "Con booking",
	"channels" : [channelId, channelId2]
});

db.createCollection("property_data");
db.property_data.insert({
	"property" : propertyId,
	"channel" : channelId,
	"year" : 2015,
	"months": [
	{
		number:0,
		bedroom_count:34,
		amount: 34000
	},
	{
		number:1,
		bedroom_count:12,
		amount: 12000
	},
	{
		number:2,
		bedroom_count:15,
		amount: 15000
	},
	{
		number:3,
		bedroom_count:40,
		amount: 40000
	},
	{
		number:4,
		bedroom_count:19,
		amount: 19000
	},
	{
		number:5,
		bedroom_count:14,
		amount: 14000
	},
	{
		number:6,
		bedroom_count:32,
		amount: 32000
	},
	{
		number:7,
		bedroom_count:27,
		amount: 27000
	},
	{
		number:8,
		bedroom_count:18,
		amount: 18000
	},
	{
		number:9,
		bedroom_count:23,
		amount: 23000,
	},
	{
		number:10,
		bedroom_count:49,
		amount: 49000
	},
	{
		number:11,
		bedroom_count:45,
		amount: 45000
	}
	]
});
db.property_data.insert({
	"property" : propertyId,
	"channel" : channelId,
	"year" : 2016,
	"months": [
	{
		number:0,
		bedroom_count:29,
		amount: 29000
	},
	{
		number:1,
		bedroom_count:4,
		amount: 4000
	},
	{
		number:2,
		bedroom_count:22,
		amount: 22000
	},
	{
		number:3,
		bedroom_count:20,
		amount: 20000
	},
	{
		number:4,
		bedroom_count:12,
		amount: 12000
	},
	{
		number:5,
		bedroom_count:28,
		amount: 28000,
	},
	{
		number:6,
		bedroom_count:10,
		amount: 10000
	},
	{
		number:7,
		bedroom_count:30,
		amount: 30000
	},
	{
		number:8,
		bedroom_count:59,
		amount: 59000
	},
	{
		number:9,
		bedroom_count:24,
		amount: 24000
	},
	{
		number:10,
		bedroom_count:19,
		amount: 19000
	},
	{
		number:11,
		bedroom_count:50,
		amount: 50000
	}
	]
});
db.property_data.insert({
	"property" : propertyId,
	"channel" : channelId,
	"year" : 2018,
	"months": [
	{
		number:0,
		bedroom_count:19,
		amount: 19000
	},
	{
		number:1,
		bedroom_count:18,
		amount: 18000
	},
	{
		number:2,
		bedroom_count:23,
		amount: 23000
	},
	{
		number:3,
		bedroom_count:36,
		amount: 36000
	},
	{
		number:4,
		bedroom_count:12,
		amount: 12000
	},
	{
		number:5,
		bedroom_count:20,
		amount: 20000,
	},
	{
		number:6,
		bedroom_count:60,
		amount: 60000
	},
	{
		number:7,
		bedroom_count:43,
		amount: 43000
	},
	{
		number:8,
		bedroom_count:11,
		amount: 11000
	},
	{
		number:9,
		bedroom_count:14,
		amount: 14000
	},
	{
		number:10,
		bedroom_count:12,
		amount: 12000
	},
	{
		number:11,
		bedroom_count:55,
		amount: 55000
	}
	]
});

//Data de la propiedad dos
db.property_data.insert({
	"property" : propertyId,
	"channel" : channelId2,
	"year" : 2015,
	"months": [
	{
		number:0,
		bedroom_count:14,
		amount: 14000
	},
	{
		number:1,
		bedroom_count:32,
		amount: 32000
	},
	{
		number:2,
		bedroom_count:25,
		amount: 25000
	},
	{
		number:3,
		bedroom_count:46,
		amount: 46000
	},
	{
		number:4,
		bedroom_count:11,
		amount: 11000
	},
	{
		number:5,
		bedroom_count:18,
		amount: 18000
	},
	{
		number:6,
		bedroom_count:12,
		amount: 12000
	},
	{
		number:7,
		bedroom_count:23,
		amount: 23000
	},
	{
		number:8,
		bedroom_count:10,
		amount: 10000
	},
	{
		number:9,
		bedroom_count:28,
		amount: 28000,
	},
	{
		number:10,
		bedroom_count:42,
		amount: 42000
	},
	{
		number:11,
		bedroom_count:55,
		amount: 55000
	}
	]
});
db.property_data.insert({
	"property" : propertyId,
	"channel" : channelId2,
	"year" : 2016,
	"months": [
	{
		number:0,
		bedroom_count:19,
		amount: 19000
	},
	{
		number:1,
		bedroom_count:12,
		amount: 12000
	},
	{
		number:2,
		bedroom_count:15,
		amount: 15000
	},
	{
		number:3,
		bedroom_count:22,
		amount: 22000
	},
	{
		number:4,
		bedroom_count:32,
		amount: 32000
	},
	{
		number:5,
		bedroom_count:29,
		amount: 29000,
	},
	{
		number:6,
		bedroom_count:30,
		amount: 30000
	},
	{
		number:7,
		bedroom_count:30,
		amount: 30000
	},
	{
		number:8,
		bedroom_count:52,
		amount: 52000
	},
	{
		number:9,
		bedroom_count:44,
		amount: 44000
	},
	{
		number:10,
		bedroom_count:19,
		amount: 19000
	},
	{
		number:11,
		bedroom_count:53,
		amount: 53000
	}
	]
});
db.property_data.insert({
	"property" : propertyId,
	"channel" : channelId2,
	"year" : 2018,
	"months": [
	{
		number:0,
		bedroom_count:19,
		amount: 19000
	},
	{
		number:1,
		bedroom_count:18,
		amount: 18000
	},
	{
		number:2,
		bedroom_count:23,
		amount: 23000
	},
	{
		number:3,
		bedroom_count:36,
		amount: 36000
	},
	{
		number:4,
		bedroom_count:12,
		amount: 12000
	},
	{
		number:5,
		bedroom_count:20,
		amount: 20000,
	},
	{
		number:6,
		bedroom_count:60,
		amount: 60000
	},
	{
		number:7,
		bedroom_count:43,
		amount: 43000
	},
	{
		number:8,
		bedroom_count:11,
		amount: 11000
	},
	{
		number:9,
		bedroom_count:14,
		amount: 14000
	},
	{
		number:10,
		bedroom_count:12,
		amount: 12000
	},
	{
		number:11,
		bedroom_count:55,
		amount: 55000
	}
	]
});



