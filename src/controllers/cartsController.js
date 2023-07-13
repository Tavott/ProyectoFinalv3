import { request } from "express";
import CartsService from "../services/cartsService.js";
import ProductsService from "../services/productsService.js";//se agrega
import TicketService from "../services/ticketService.js";//se agrega

const ticketManager = new TicketService//se agrega
const productsService = new ProductsService//se agrega
const cartsService = new CartsService

class CartsController {
    createCart = async (req = request, res) => {
        await cartsService.createCart()

        res.send({mensaje: "carrito creado"})
    }

    getCartProducts = async (req = request, res) => {
        const { cid } = req.params
        const {limit = 1 , page = 1, query} = req.query
        try {
            const cartProducts = await cartsService.getCartProducts(cid, limit, page)
            
            res.send(cartProducts)
        } catch (error) {
            console.log(error)
        }
    }

    newProduct = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.uploadProduct(cid, pid)

            res.send({mensaje: "producto agregado al carrito"})

        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.deleteProduct(cid, pid)

            res.send({mensaje: "producto eliminado del carrito"})

        } catch (error) {
            console.log(error)
        }
    }

    uploadProduct = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.uploadProduct(cid, pid)

            res.send({mensaje: "producto agregado al carrito"})

        } catch (error) {
            console.log(error)
        }
    }

    deleteCartProducts = async (req = request, res) => {
        const { cid, pid } = req.params

        try {
            await cartsService.deleteCartProducts(cid)

            res.send({mensaje: "todos los productos eliminados del carrito"})

        } catch (error) {
            console.log(error)
        }
    }

    arrayProductsUpdate = async (req = request, res) => {
        const { cid } = req.params
        const data = req.body

        try {
            await cartsService.arrayProductsUpdate(cid, data)

            res.send({mensaje: "Array de productos agregado al carrito"})

        } catch (error) {
            console.log(error)
        }
    }

    //Funcion agregada
    createTicket = async(req = request, res) => {
        const { cid } = req.params
        const {limit = 1 , page = 1, query} = req.query

        try {
            let sbProducts = []
            let amount = 0

            const cartProducts = await cartsService.getCartProducts(cid, limit, page)

            if(!cartProducts) return res.status(401).send({status: 'error', error:  cartProducts})
            for (const product of cartProducts.docs[0].products) {
                
                if (product.quantity < product.pid.stock) {
                    
                    let updateProduct = product.pid
                    
                    updateProduct.stock = updateProduct.stock - product.quantity
                    
                    amount += product.pid.price
                    console.log('updateProduct: ', updateProduct)
                    
                    await productsService.updateProduct(product.pid._id, updateProduct)
                    
                }else{
                    sbProducts.push(product)
                }
            }
            if(sbProducts.length == cartProducts.docs[0].products.length) return res.status(401).send({status: 'error', error:  sbProducts})
            
            await cartsService.arrayProductsUpdate(cid, sbProducts)
            console.log("sbProducts", sbProducts);
            let purchase_datetime = new Date()

            let purchaser = req.session.email
            console.log(amount, purchaser, purchase_datetime);

            let ticket = await ticketManager.createTicket(purchase_datetime, amount, purchaser)

            res.send({
                status: "success",
                payload: ticket
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default CartsController