import mongoose from 'mongoose';
import { User } from '../../@types/user';

const UserSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    nameOfPet: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<User>('User', UserSchema);
export { User };
