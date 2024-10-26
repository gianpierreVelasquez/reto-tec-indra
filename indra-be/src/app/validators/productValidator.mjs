import { check } from 'express-validator'
import { validateResult } from '../helpers/validatorHelper.mjs'

export const validateProduct = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),

  check('description')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Description must be at most 200 characters'),

  check('src').optional(),

  check('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]
