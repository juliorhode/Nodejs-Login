const passport = require('passport');
const localStrategy= require('passport-local').Strategy;

passport.use('registro-local',new localStrategy({
    // Datos por la cual se va a autenticar el usuario
    usernameField:'email',
    passwordField: 'password',
    // Con esto permitimos recibir datos request por si enviamos mas datos cmo telefono, direccion, etc
    passReqToCallback:true

    // donde es un callback, que cuando termine el proceso de autenticacion lo vamos a utilizar para devolverle una respuesta l cliente
}, (req,email,password,done) =>{
    
}));