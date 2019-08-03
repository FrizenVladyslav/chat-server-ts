import mongoose, { Schema, Document } from 'mongoose'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { isEmail } from 'validator'
import config from '../config'
import { IUser } from '../types'

interface IUserMetods {
  generateJWT: () => string
  setPassword: (password: string) => void
  toAuthJSON: () => IUser
  validatePassword: (password: string) => boolean
}

export type UserModelType = IUser & Document & IUserMetods

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: 'Email is required',
      validate: [isEmail, 'Invalid email'],
      unique: true,
    },
    fullname: {
      type: String,
      required: 'Fullname is required',
    },
    avatar: String,
    confirmed: Boolean,
    confirmedHash: String,
    lastSeen: Date,
    hash: String,
    salt: String,
  },
  {
    timestamps: true,
  }
)

UserSchema.methods.setPassword = function(password: string) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
}

UserSchema.methods.validatePassword = function(password: string) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
  return this.hash === hash
}

UserSchema.methods.generateJWT = function() {
  const today = new Date()
  const expirationDate = new Date(today)
  expirationDate.setDate(today.getDate() + 60)

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt('' + expirationDate.getTime() / 1000, 10),
    },
    config.JWT_SECRET
  )
}

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    fullname: this.fullname,
  }
}

export default mongoose.model<UserModelType>('User', UserSchema)
