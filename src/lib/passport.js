const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.acceso',new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
}, async (req,username,password,done) => {
    console.log(req.body);
    console.log(username);
    console.log(password);
    const resultado = await pool.query('select * from users where username = ?',[username]);
    if (resultado.length > 0) {
        const usuario = resultado[0];
        console.log(usuario);
        const validacion = await helpers.comparaPassword(password,usuario.password);
        console.log(validacion);
        
        if (validacion) {
            done(null,usuario, req.flash('exito','Bienvenido ' + usuario.fullname));
        }else{
            done(null,false, req.flash('mensaje','Password invalido'));
        }
    }else{
        done(null,false, req.flash('mensaje','Usuario invalido'));
    }
}));

passport.use('local.registro',new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
}, async (req,username,password,done) => {
    // console.log(req.body);
    const {fullname} = req.body
    const nuevoUsuario ={
        username,
        password,
        fullname
    };
    // invocamos el metodo de cifrado para la contraseña que viene en texto plano. Al terminar, prosigue a insertar en bbdd
    nuevoUsuario.password = await helpers.cifraPassword(password);
    const resultado = await pool.query('insert into users set ?',[nuevoUsuario]);
    console.log(resultado);
    
    // como no tenemos el id del usuario en el objeto, se lo vamos a incorporar
    nuevoUsuario.id = resultado.insertId;
    return done(null,nuevoUsuario);
}));

// Serializar el usuario para guardarlo en una sesion
passport.serializeUser((usuario,done) => {
    done(null,usuario.id);
});
// Desserializar
passport.deserializeUser( async (id,done) =>{
    const resultado = await pool.query('select * from users where id = ?',[id]);
    done(null,resultado[0]);
});