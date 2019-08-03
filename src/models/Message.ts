import mongoose, { Schema, Document } from 'mongoose'

export interface IMessage extends Document {
  text: string
  unread: boolean
  dialog: Schema.Types.ObjectId
}

const MessageSchema = new Schema({
  text: { type: String, required: 'Message is not be empty' },
  unread: { type: Boolean, default: false },
  dialog: { type: Schema.Types.ObjectId, ref: 'Dialog', required: true },
})

export default mongoose.model<IMessage>('Message', MessageSchema)
