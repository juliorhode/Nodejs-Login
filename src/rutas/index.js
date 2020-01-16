const express = require('express');
const router = express.Router();

// Rutas
router.get('/', (req,res,next) =>{
    res.render('index');
});
// Aqui enviamos la ventana al usuario
router.get('/registro', (req,res,next) =>{
    res.render('registro');
});
// Aqui el servidor escucha los datos del usuario
router.post('/registro', (req,res,next) =>{
    console.log(req.body);
    res.send('Datos recibidos');
    
});
// Aqui enviamos la ventana al usuario
router.get('/ingreso', (req,res,next) =>{

});
// Aqui el servidor escucha los datos del usuario
router.post('/ingreso', (req,res,next) =>{

});

module.exports = router;