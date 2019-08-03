import dotenv from 'dotenv'
import path from 'path'

const root = path.join.bind(this, __dirname)
dotenv.config({ path: root('../.env') })

export default {
  PORT: process.env.PORT || 8080,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/chatts',
  IS_PODUCTION: process.env.NODE_ENV === 'production',
  JWT_SECRET: process.env.JWT_SECRET || 'secretkey',
}
