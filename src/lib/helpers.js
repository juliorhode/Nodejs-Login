const bcrypt = require('bcryptjs');
const helpers= {};

// Aqui vamos a recibir password tal como lo coloca el usuario
helpers.cifraPassword = async (password) =>{
    // a mayor veces se ejecute, mayor sera la seguridad
    // Esto es el patron
    const salt = await bcrypt.genSalt(10); // 10 es la cantidad de veces que lo va a hacer
    // aqui se cifra la contraseña
    const hash = await bcrypt.hash(password,salt);
    return hash;
};

helpers.comparaPassword = async (password,passbbdd) =>{
    try {
        // password es el del usuario escrito y passbbdd es el almacenado en bbdd
        return await bcrypt.compare(password,passbbdd);
    } catch (error) {
        console.log(error);
        
    }

};

module.exports= helpers;