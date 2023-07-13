export function auth (req, res, next){
    if (req.session?.usuario || req.session?.admin ) {
        return next()
    }
    return res.status(401).send('Inicie Sesion')
    // return res.redirect('http://localhost:8080/auth/')
    
}