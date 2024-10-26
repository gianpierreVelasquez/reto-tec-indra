import { prismaDB } from '../../config/prismaDB.mjs'

export const getProducts = async () => {
  try {
    const products = await prismaDB.product.findMany()
    return products
  } catch (err) {
    throw new Error('Error retrieving products from DB: ', err.message)
  }
}

export const getProduct = async (uuid) => {
  try {
    const product = await prismaDB.product.findUnique({
      where: { id: uuid }
    })
    return product
  } catch (err) {
    throw new Error(`Error retrieving product with id: ${uuid}`)
  }
}

export const saveProduct = async (product) => {
  try {
    await prismaDB.product.create({ data: { ...product } })
    return true
  } catch (err) {
    throw new Error('Error saving product on DB: ', err.message)
  }
}

export const modifyProduct = async (uuid, product) => {
  try {
    const updatedProduct = await prismaDB.product.update({
      where: { id: uuid },
      data: { ...product }
    })
    return updatedProduct
  } catch (err) {
    throw new Error(`Error updating product with id: ${uuid}`)
  }
}

export const removeProduct = async (uuid) => {
  try {
    await prismaDB.product.delete({
      where: { id: uuid }
    })
    return true
  } catch (err) {
    throw new Error(`Error deleting product with id: ${uuid}`)
  }
}
