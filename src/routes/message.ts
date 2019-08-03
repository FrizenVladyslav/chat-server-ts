import { Router } from 'express'
import errorHandler from '../utils/errorHandler'
import jwt from '../utils/jwt'
import { Message } from '../models'

const router = Router()

router.get('/', jwt.required, async (req, res) => {
  const { dialog } = req.params

  try {
    const dialogs = await Message.find({ dialog }).populate('dialog')
    res.json(dialogs)
  } catch (e) {
    errorHandler(e, res)
  }
})

router.post('/', jwt.required, async (req, res) => {
  const { dialog, text } = req.body

  try {
    const message = await Message.create({ dialog, text })
    res.json(message)
  } catch (e) {
    errorHandler(e, res)
  }
})

export default router
