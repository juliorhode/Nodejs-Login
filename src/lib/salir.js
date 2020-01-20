module.exports ={
    usuarioAccedido(req,res,next) {
        if (req.isAuthenticated()) {
            return next();
        }else{
            return res.redirect('/acceso');
        }
    },
    bloqueoAcceso(req,res,next){
        if (!req.isAuthenticated()) {
            return next();
        }else{
            return res.redirect('/perfil');
        }
    }
};