import mongoose, { Schema, Document } from 'mongoose'

export interface IDialog extends Document {
  partner: {
    type: Schema.Types.ObjectId
    ref: string
  }
  author: {
    type: Schema.Types.ObjectId
    ref: string
  }
  lastMessage: {
    type: Schema.Types.ObjectId
    ref: string
  }
}

const DialogSchema = new Schema(
  {
    partner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IDialog>('Dialog', DialogSchema)
