import express from 'express'
import productCtr from '../controllers/productCtrl'
import { checkProductData } from '../middleware/validate'

const router = express.Router()
router.get('/products', productCtr.getProducts)

router.get('/products/:id', productCtr.getProduct)
// : phia truoc id duoc hieu la tham so
router.post('/products', checkProductData, productCtr.addProduct)

router.put('/products/:id', checkProductData, productCtr.updateProduct)

router.delete('/products/:id', productCtr.deleteProduct)
export default router;