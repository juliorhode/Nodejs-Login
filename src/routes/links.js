const express = require('express');
const router = express.Router();
const pool = require('../database');
const {usuarioAccedido} =require('../lib/salir');

router.get('/add',usuarioAccedido,(req,res)=>{
    // res.send('Aqui va el Formulario');
    res.render('links/add');
});

router.post('/add',usuarioAccedido, async(req,res)=>{
    console.log(req.body);
    
    // haciendo destructuring
    const {title,url,description} = req.body;
    const nuevoEnlace = {
        title,
        url,
        description,
        user_id : req.user.id
    };
    console.log(nuevoEnlace);
    // el ? es lo que va a recibir del arreglo [nuevoEnlace]
    // Esta conexion es una peticion asincrona y por tanto va a tomar tiempo, con await lo que indica es que al teminar, siga con la siguiente linea de codigo
    await pool.query('insert into links set ?', [nuevoEnlace]);
    
    // flash recibe dos parametros... el primero es el nombre que se quiere para el mensaje y el segundo es el valor del mensaje
    req.flash('exito','Enlace guardado correctamente');
    // res.send('Datos recibidos');
    res.redirect('/links')
    
});

router.get('/',usuarioAccedido, async(req,res)=>{
    const links = await pool.query('select * from links where user_id= ?',[req.user.id]);
    console.log(links);
    // res.send('Aqui iran las listas');
    res.render('links/list', { links } );
    
});

router.get('/eliminar/:id',usuarioAccedido, async (req,res)=>{
    console.log(req.params.id);
    const {id} = req.params;
    await pool.query('delete from links where id = ?',[id]);
    // res.send('Eliminado');
    req.flash('exito','Enlace eliminado correctamente');
    res.redirect('/links');
});

router.get('/editar/:id',usuarioAccedido, async (req,res)=>{
    console.log(req.params.id);
    const {id} = req.params;
    // res.send('Editado');
    const link =  await pool.query('select * from links where id = ?',[id])
    console.log(link[0]);
    
    res.render('links/edit', { link : link[0] } );
    
});

router.post('/editar/:id',usuarioAccedido, async(req,res)=>{
    const {id} = req.params;
    const {title,url,description} = req.body;
    const nuevoEnlace = {
        title,
        url,
        description
    };
    console.log(nuevoEnlace);
    await pool.query('update links set ? where id = ?',[nuevoEnlace,id]);
    req.flash('exito','Enlace actualizado correctamente');
    res.redirect('/links');
});

module.exports = router;