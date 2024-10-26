import express from 'express'
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.mjs'
import { validateProduct } from '../validators/productValidator.mjs'

const router = express.Router()

router.get('/', listProducts)
router.get('/:id', getProductById)

router.post('/', validateProduct, createProduct)
router.patch('/:id', validateProduct, updateProduct)
router.delete('/:id', deleteProduct)

export default router
