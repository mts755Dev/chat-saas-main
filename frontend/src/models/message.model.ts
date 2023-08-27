import { Schema, models, model, Document, Model } from "mongoose";

interface IMessage {
  question: string;
  answer: string;
  room: Schema.Types.ObjectId;
}

export interface IMessageDocument extends IMessage, Document { }

export interface IMessageModel extends Model<IMessageDocument> { }

const MessageSchema = new Schema<IMessageDocument, IMessageModel>({
  question: String,
  answer: String,
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
  }
});

export default models.Message || model<IMessageDocument, IMessageModel>('Message', MessageSchema);
