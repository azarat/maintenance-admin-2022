import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TokenDocument = Token & Document

@Schema()
export class Token {
  @Prop({ type: String, required: true })
  token: string;

  @Prop({ type: Types.ObjectId, ref: 'Admin', required: true, unique: true })
  admin: Types.ObjectId;
}

export const TokenSchema = SchemaFactory.createForClass(Token);