import { Response } from 'express'
import { IError } from 'types/error'

const badRequestNames = ['ValidationError', 'MongoError']

export default function(e: IError, res: Response): Response {
  console.log('e', e)
  if (e && badRequestNames.includes('' + e.name)) {
    return res.status(400).json({
      message: e.message,
    })
  } else {
    return res.status(500).json({
      message: e.message || e,
    })
  }
}
