const express = require('express');
const router = express.Router();

// Rutas
router.get('/', (req,res,next) =>{
    // res.send('Funcionando');
    res.render('index');
    // Con ejs-mate
    // res.render('index');

    // Con express-handlebars
});

module.exports = router;