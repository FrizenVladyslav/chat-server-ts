export interface IUser {
  email: string
  fullname: string
  password: string
  avatar?: string
  confirmed?: boolean
  confirmedHash?: string
  lastSeen?: Date
}

export interface IUserAuthRequest extends Express.Request {
  payload?: {
    id: string
  }
}
