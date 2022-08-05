import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Type } from '../enums/type.enum';

export type QrDocument = Qr & Document

@Schema()
export class Qr {
  @Prop({ type: Types.ObjectId, ref: 'Admin', required: true })
  admin: Types.ObjectId;
  @Prop({ type: String, required: true })
  user: string;
  @Prop({
    type: String,
    required: true,
    enum: Object.values(Type),
  })
  type: Type;
}

export const QrSchema = SchemaFactory.createForClass(Qr);
