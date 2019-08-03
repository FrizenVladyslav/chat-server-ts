import { Router } from 'express'
import passport from 'passport'
import errorHandler from '../utils/errorHandler'
import jwt from '../utils/jwt'
import { User } from '../models'
import { IUserAuthRequest } from '../types'

const router = Router()

// router.get('/:id', async (req, res) => {
//   const { id } = req.params

//   try {
//     const user = await User.findById(id)
//     if (!user) return res.status(400).send('User not found')
//     res.json(user)
//   } catch (e) {
//     errorHandler(e, res)
//   }
// })

router.post('/login', (req, res, next) => {
  return passport.authenticate(
    'local',
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return res.status(400).json({ message: 'Login or password incorrect' })
      }

      if (passportUser) {
        const user = passportUser
        user.token = passportUser.generateJWT()

        return res.json({ token: user.token })
      }

      return res.status(400).json({ info })
    }
  )(req, res, next)
})

router.post('/register', async (req, res) => {
  const {
    body: { email, password, fullname },
  } = req

  try {
    const user = await User.create({ email, password, fullname })
    user.setPassword(password)
    user.save().then(() => res.json({ token: user.generateJWT() }))
  } catch (e) {
    return errorHandler(e, res)
  }
})

router.get('/getUserInfo', jwt.required, async (req: IUserAuthRequest, res) => {
  if (!req.payload) return res.status(403)
  const { id } = req.payload

  try {
    const user = await User.findById(id)
    if (!user) return res.status(401).json({ message: 'User not found' })

    res.json(user.toAuthJSON())
  } catch (e) {
    errorHandler(e, res)
  }
})

export default router
