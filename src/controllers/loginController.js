import { request } from "express";
import config  from '../config/env.js'
class LoginController {
    loginRender = (req = request, res)=>{
        res.render('login')
    }

    registerRender = (req = request, res)=>{
        res.render('register')
    }

    failLoginRender = (req = request, res)=>{
        res.send({status: 'error', message: 'fallo el login'})
    }

    failRegisterRender = (req = request, res)=>{
        res.send({status: 'error', message: 'fallo el registro'})
    }

    loginVoid = (req = request, res)=>{
        const { username, password } = req.body

        try {
            
            if (username !== config.adminName || password !== config.adminPassword) {
                req.session.user = username
                req.session.email = username
                req.session.admin = false
                req.session.usuario = true
                req.logger.info('usted es usuario')
                // console.log('usted es usuario')
                res.redirect('http://localhost:8080/products')
            } else {
                req.session.user = username
                req.session.email = username
                req.session.admin = true
                req.session.usuario = false
                req.logger.info('usted es admin')
                // console.log('usted es admin')
                res.redirect('http://localhost:8080/products')
            }
        } catch (error) {
            console.log(error)
        }
    }

    registerVoid = (req = request, res)=>{
        try {
            res.redirect('http://localhost:8080/auth/login')
        } catch (error) {
            console.log(error)
        }
    }

    logoutVoid = (req = request, res)=>{
        try {
            req.session.destroy(err => {
                if(!err) res.redirect('http://localhost:8080/auth/login')
                else res.send({status:'Logout error', message: err})
            })
        } catch (error) {
            console.log(error)
        }
    }

    githubcallback = (req = request, res)=>{
        req.logger.info('req: ',req.user)
        // console.log('req: ',req.user)
        req.session.user = req.user.first_name
        req.session.email = req.user.email
        req.session.admin = false
        req.session.usuario = true
        res.redirect('http://localhost:8080/products')
    }
}

export default LoginController