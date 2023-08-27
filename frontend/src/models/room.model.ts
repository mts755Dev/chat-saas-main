import { Schema, model, models, Document, Model } from "mongoose";

interface IRoom {
  name: string;
  createdBy: String

  messages: Schema.Types.ObjectId[];
}

export interface IRoomDocument extends IRoom, Document { }

export interface IRoomModel extends Model<IRoomDocument> { }

const RoomSchema = new Schema<IRoomDocument, IRoomModel>({
  name: String,
  createdBy: String,
  messages: [{
    type: Schema.Types.ObjectId,
    ref: "Message"
  }]
});

export default models.Room || model<IRoomDocument, IRoomModel>('Room', RoomSchema);
