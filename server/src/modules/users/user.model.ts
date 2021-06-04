import { Document, model, PopulatedDoc, Schema } from 'mongoose';

import { hashPassword } from '../../utils/hash-password';
import { Image } from '../images/image.model';

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  roles: UserRole[];
  profileImage?: PopulatedDoc<Image & Document>;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  User = 'user',
}

const userSchema = new Schema<User>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    roles: {
      type: [String],
      enum: Object.values(UserRole),
      default: [UserRole.User],
    },
    profileImage: { type: Schema.Types.ObjectId, ref: 'Image' },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  this.password = await hashPassword(this.password);
});

export const UserModel = model<User>('User', userSchema, 'users');
