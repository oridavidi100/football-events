import mongoose from 'mongoose';
import { Event } from '../../@types/Event';

const UserSchema = new mongoose.Schema<Event>(
  {
    _id: { type: String, required: true },
    location: {
      type: String,
      required: true,
    },
    Players: {
      type: [String],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model<Event>('Event', UserSchema);
export { Event };
