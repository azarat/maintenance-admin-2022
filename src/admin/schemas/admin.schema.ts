import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Type } from '../enums/type.enum';

export type AdminDocument = Admin & Document

@Schema()
export class Admin {
  @Prop({ type: String, required: true, unique: true })
  cockpitId: string;
  @Prop({ type: String, required: true, unique: true })
  email: string;
  @Prop({
    type: String,
    required: true,
    enum: Object.values(Type),
  })
  type: Type;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
