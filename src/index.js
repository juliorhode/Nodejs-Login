const express = require('express');
const morgan = require('morgan');
const path = require('path');
const engine = require('ejs-mate');
const handlebars = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport');
// -------------------------- Inicializaciones -------------------------- //

const app = express();
require('./lib/passport');

// -------------------------- Configuraciones -------------------------- //

// EJS-MATE

// Establecemos la ruta de la carpeta donde se encuentran las plantillas de las vistas
app.set('views', path.join(__dirname,'views')); 
// Indicamos que vamos a utilizar el motor de plantillas ejs
app.engine('ejs',engine); 
// Establecer el motor de plantilla
app.set('view engine','ejs')

// EXPRESS-HANDLEBARS
app.engine('.hbs', handlebars({
    defaultLayout : 'main',
    // indicar donde se encuentra el archivo
    layoutsDir : path.join(app.get('views'),'layouts'),
    partialsDir : path.join(app.get('views'),'partials'),
    // esto es porque los archivos son .handlebars, pero los estamos resumiendo a .hbs... asi le indicamos que son esos archivos
    extname : '.hbs',
    helpers : require('./lib/handlebars')
}));
app.set('view engine','.hbs')


// Indicamos por donde va a escuchar el servidor
app.set('port', process.env.PORT || 3000);

// -------------------------- Middleawares -------------------------- //
app.use(session({
    // nombre de como va a guardar las sesiones
    secret: 'mysqlnodesession',
    // false para que no se comience a renovar
    resave:false,
    // false para que no se restablezca la sesion
    saveUninitialized:false,
    // donde va a guardarse la sesion... y esta la vamos a guardar dentro de la bbdd
    store: new mysqlStore(database)
}))
app.use(flash()); // para poder enviar mensajes entre las vistas
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// con esto se le indica a passport que se inicie
app.use(passport.initialize());
app.use(passport.session());


// -------------------------- Variables Globales -------------------------- //
// esto toma la informacion del usuario, toma lo que el servidor quiera responder y tambien toma una funcion para continuar con el resto del codigo
app.use((req,res,next) =>{
    // aqui lo tenemos para que sea disponible para todas las vistas
    app.locals.registrado = req.flash('exito');
    app.locals.registrado = req.flash('mensaje');
    app.locals.usuario = req.user; 
    // console.log(app.locals.usuario);
    
    next();
});

// -------------------------- Rutas -------------------------- //

// EXPRESS-HANDLEBARS
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

// -------------------------- Archivos Publicos -------------------------- //
app.use(express.static(path.join(__dirname,'public')))

// -------------------------- Inicio del servidor -------------------------- //
app.listen( app.get('port'), () =>{
    console.log('Servidor iniciado en puerto:',app.get('port'));
});