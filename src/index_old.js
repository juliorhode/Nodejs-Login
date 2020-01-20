const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');

// -------------------------- Inicializaciones -------------------------- //
const app = express();
const con = require('./database_old');
// Prueba de coneccion
/*
con.query("SELECT * FROM usuario", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});
*/


// -------------------------- Configuraciones -------------------------- //

// Establecemos la ruta de la carpeta donde se encuentran las plantillas de las vistas
app.set('views', path.join(__dirname,'vista')); 
// Indicamos que vamos a utilizar el motor de plantillas ejs
app.engine('ejs',engine); 
// Establecer el motor de plantilla
app.set('view engine','ejs')
// Indicamos por donde va a escuchar el servidor
app.set('port', process.env.PORT || 3000);

// -------------------------- Middleawares -------------------------- //

// Con esto vemos las peticiones hacia el servidor
app.use(morgan('dev'));
// Indicamos que vamos a recibir datos desde un formulario
// Con extended:false le decimos que no vamos a recibir imagenes ni archivos pesados
app.use(express.urlencoded({extended:false}));

// -------------------------- Rutas -------------------------- //

// Principal
app.use('/',require('./rutas/index'));

// -------------------------- Inicio del servidor -------------------------- //
app.listen( app.get('port'), () =>{
    console.log('Servidor iniciado en puerto:',app.get('port'));
    
});