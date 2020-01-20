const {format} = require('timeago.js');

// esto va a ser utilizado desde las vistas
const helpers = {};

helpers.timeago = (timestamp) => {
    // console.log(timestamp);
    
    // va a retornar el tiempo hacia atras de cuanto ha pasado desde la publicacion
    return format(timestamp);
};
module.exports = helpers;