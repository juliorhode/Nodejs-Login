const mysql = require('mysql');
// esto nos permite usar async await y promesas
const {promisify} = require('util');
const { database } = require('./keys');



const pool = mysql.createPool(database);
pool.getConnection((err,con)=>{
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Conexion cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Muchas conexions');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Conexion rechazada');
        }
    }

    if(con){
        con.release();
        console.log('Conectado!!!');
        
    }
});
// esto nos permite usar async await y promesas
pool.query = promisify(pool.query);
module.exports = pool;