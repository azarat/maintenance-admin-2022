import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Type } from './enums/type.enum';
import { Qr, QrDocument } from './schemas/qr.schema';

@Injectable()
export class QrDbRepository {
  constructor(
    @InjectModel(Qr.name) private readonly qrModel: Model<QrDocument>,
  ) { }

  async create(admin: Types.ObjectId, user: string, type: Type) {
    await this.qrModel.create({
      admin,
      user,
      type,
    });
  }
}
