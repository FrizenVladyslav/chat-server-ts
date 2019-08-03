// import { Request, Response, NextFunction, RequestHandler } from 'express'
// import User from '../models/User'
// import { IUserAuthRequest } from '../types/user'

// export const isUserValid: RequestHandler = async (
//   req: IUserAuthRequest,
//   res,
//   next
// ) => {
//   if (!req.payload) return res.sendStatus(403)
//   const { id } = req.payload

//   try {
//     const user = await User.findById(id)
//     if (user) next()
//     else res.sendStatus(403)
//   } catch (e) {
//     res.status(500).json({ message: e.message || e })
//   }
// }
