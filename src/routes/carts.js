import { Router } from "express"
import { MongoCartManager } from "../dao/mongo/MongoCartManager.js"
import CartsController from "../controllers/cartsController.js"
import { rollUserVerify } from "../middleware/rollVerify.js"

const router = Router()

const cartsController = new CartsController

router.post('/', cartsController.createCart)

router.get('/:cid', cartsController.getCartProducts)

router.post('/:cid/product/:pid', rollUserVerify, cartsController.newProduct)

router.delete('/:cid/product/:pid', rollUserVerify, cartsController.deleteProduct)

router.put('/:cid/product/:pid', cartsController.uploadProduct)

router.delete('/:cid', cartsController.deleteCartProducts)

router.put('/:cid', cartsController.arrayProductsUpdate)

router.get('/:cid/purchase', cartsController.createTicket)

export default router