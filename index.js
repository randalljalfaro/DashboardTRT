//Variables de dependencias
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var expressValidator = require('express-validator');
var mongo = require('mongodb');
var mongoose = require('mongoose');


//Controladores para las ruutas aceptadas
var auth = require('./routes/auth');
var users = require('./routes/users');
var channels = require('./routes/channels');
var properties = require('./routes/properties');
var properties_data = require('./routes/properties_data');

//Inicialización de la aplicación básica de Express
var app = express();

//Middleware que traduce el "body"
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Carpeta estática 
app.use(express.static(path.join(__dirname, 'public')));


//Configuración del validador de express
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root    = namespace.shift()
    , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Configuración de las rutas con su controlador
app.use('/auth', auth);
app.use('/users', users);
app.use('/channels', channels);
app.use('/properties', properties);
app.use('/properties_data', properties_data);

//Configuración del puerto del servidor
app.set('port', (process.env.PORT || 3000));

//Se conecta a la base de datos
//Ejecución del servidor
mongoose.connect('mongodb://localhost/trt_dashboard',
  function(err){
    if(!err){
      app.listen(app.get('port'), function(){
        console.log('El servidor se inició en el puerto  '+ app.get('port'));
      });
    }
    else {
     console.log('Error al iniciar el servidor');
     console.log(err);
   }
 });
var db = mongoose.connection;