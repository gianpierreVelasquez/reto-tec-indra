import { validationResult } from 'express-validator'

export const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (err) {
    res.status(400)
    const errorArr = err.array()
    const errCustomMsg = errorArr.map((e) => {
      return `${e.path} : ${e.msg}`
    })

    res.send({
      status: 400,
      message:
        errCustomMsg.length && errCustomMsg.length > 0
          ? errCustomMsg
          : errCustomMsg[0]
    })
  }
}
