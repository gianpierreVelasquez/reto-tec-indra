import { v4 as uuidv4 } from 'uuid'
import { getProduct, getProducts, modifyProduct, removeProduct, saveProduct } from '../models/productModel.mjs'

export const listProducts = async (req, res, next) => {
  try {
    const products = await getProducts()

    res.status(200).json({ code: 200, data: products })
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (req, res, next) => {
  try {
    const product = await getProduct(req.params.id)

    if (!product) return res.status(404).json({ code: 404, message: 'Product not found' })

    res.status(200).json({ code: 200, data: product })
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = {
      id: uuidv4(),
      ...req.body
    }

    await saveProduct(newProduct)

    res.status(201).json({ code: 201, message: 'Product registered successfully' })
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const product = req.body

    await modifyProduct(req.params.id, product)

    res.status(200).json({ code: 200, message: 'Product updated successfully' })
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    await removeProduct(req.params.id)

    res.status(200).json({ code: 200, message: 'Product successfully deleted' })
  } catch (error) {
    next(error)
  }
}
