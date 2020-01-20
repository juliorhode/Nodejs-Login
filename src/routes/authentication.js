const express = require('express');
const router = express.Router();
// esto es a passport no al archivo en lib
const passport = require('passport');

const {usuarioAccedido,bloqueoAcceso} =require('../lib/salir');

router.get('/registro',bloqueoAcceso, (req, res) => {
    res.render('auth/registro');
});

router.post('/registro',bloqueoAcceso, passport.authenticate('local.registro', {
    successRedirect: '/profile',
    failureRedirect: '/registro',
    failureFlash: true
}));

router.get('/acceso',bloqueoAcceso, (req, res) => {
    // res.send('Este es el acceso');
    res.render('auth/acceso');
});

router.post('/acceso',bloqueoAcceso, (req, res, next) => {
    passport.authenticate('local.acceso', {
        successRedirect: '/perfil',
        failureRedirect: '/acceso',
        failureFlash: true
    })(req, res, next);
});

router.get('/perfil', usuarioAccedido, (req, res) => {
    // res.send('Este es el profile');
    res.render('perfil');
});

router.get('/salir',usuarioAccedido, (req, res) => {
    req.logOut();
    res.redirect('/acceso');
    
});

module.exports = router;