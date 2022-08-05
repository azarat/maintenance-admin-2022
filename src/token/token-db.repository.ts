
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Token, TokenDocument } from './schemas/token.schema';

@Injectable()
export class TokenDbRepository {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
  ) { }

  async findByToken(token: string): Promise<TokenDocument> {
    return this.tokenModel.findOne({ token });
  }

  async create(admin: Types.ObjectId, token: string): Promise<void> {
    await this.tokenModel.create({ admin, token });
  }

  async deleteToken(token: string): Promise<void> {
    await this.tokenModel.deleteOne({ token });
  }

  async deleteTokenByAdmin(admin: Types.ObjectId): Promise<void> {
    await this.tokenModel.deleteOne({
      admin,
    });
  }

  async existsByToken(token: string): Promise<boolean> {
    return this.tokenModel.exists({
      token,
    });
  }
}
