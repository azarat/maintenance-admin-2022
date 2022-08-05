import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { AdminService } from './admin.service';
import { AdminDbRepository } from './admin-db.repository';
import { AdminCockpitRepository } from './admin-cockpit.repository';
import { Admin, AdminSchema } from './schemas/admin.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),],
  providers: [AdminService, AdminDbRepository, AdminCockpitRepository],
  exports: [AdminService, AdminDbRepository],
})
export class AdminModule { }
