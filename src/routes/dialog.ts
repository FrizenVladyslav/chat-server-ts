import { Router } from 'express'
import errorHandler from '../utils/errorHandler'
import jwt from '../utils/jwt'
import { Dialog } from '../models'
import { IUserAuthRequest } from '../types'

const router = Router()

router.get('/', jwt.required, async (req: IUserAuthRequest, res) => {
  if (!req.payload) return res.status(403)
  const { id } = req.payload

  try {
    const dialogs = await Dialog.find({ author: id })
    res.json(dialogs)
  } catch (e) {
    errorHandler(e, res)
  }
})

router.post('/', async (req, res) => {
  const { author, partner } = req.body

  try {
    const dialog = await Dialog.create({ author, partner })
    res.json(dialog)
  } catch (e) {
    errorHandler(e, res)
  }
})

export default router

router.get('/:id', jwt.required, async (req, res) => {
  const { id } = req.params

  try {
    const dialog = await Dialog.findById(id).populate([
      { path: 'author', select: ['_id', 'email', 'fullname'] },
      { path: 'partner', select: ['_id', 'email', 'fullname'] },
    ])
    res.json(dialog)
  } catch (e) {
    errorHandler(e, res)
  }
})

router.delete('/:id', jwt.required, async (req, res) => {
  const { id } = req.params

  try {
    const dialog = await Dialog.findByIdAndDelete(id)
    res.status(204).json(dialog)
  } catch (e) {
    errorHandler(e, res)
  }
})
