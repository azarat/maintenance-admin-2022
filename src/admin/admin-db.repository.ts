import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Admin, AdminDocument } from "./schemas/admin.schema";

@Injectable()
export class AdminDbRepository {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
  ) { }

  async findByEmail(email: string): Promise<AdminDocument> {
    return this.adminModel.findOne({
      email,
    });
  }

  async findByCockpitId(cockpitId: string): Promise<AdminDocument> {
    return this.adminModel.findOne({
      cockpitId,
    });
  };

  async findById(id: string): Promise<AdminDocument> {
    return this.adminModel.findById(id);
  }
}
