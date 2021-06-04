import { Document, model, PopulatedDoc, Schema } from 'mongoose';

import { createExpiresAtDate } from '../../utils/create-expires-at-date';
import { User } from '../users/user.model';

export interface Token extends Document {
  user: PopulatedDoc<User & Document>;
  token: string;
  type: TokenType;
  expiresAt: Date;
  revokedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum TokenType {
  UserVerification = 'userVerification',
  RefreshAuth = 'refreshAuth',
}

const tokenSchema = new Schema<Token>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: Object.values(TokenType),
    },
    expiresAt: { type: Date, default: createExpiresAtDate(30) },
    revokedAt: Date,
  },
  { timestamps: true }
);

export const TokenModel = model<Token>('Token', tokenSchema, 'tokens');
