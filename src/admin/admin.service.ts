import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AdminCockpitRepository } from './admin-cockpit.repository';
import { AdminDbRepository } from './admin-db.repository';
import { AdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminDbRepository: AdminDbRepository,
    private readonly adminCockpitRepository: AdminCockpitRepository,
  ) { }


  async getStationByEmail(email: string): Promise<AdminDto> {
    const serviceTypes = {
      'SERVICE_STATION': this.adminCockpitRepository.getServiceStationById.bind(AdminCockpitRepository),
      'WASH_STATION': this.adminCockpitRepository.getWashStationById.bind(AdminCockpitRepository),
      'GAS_EQUIPMENT_STATION': this.adminCockpitRepository.getGasEquipmentStationById.bind(AdminCockpitRepository),
      'DETAILING': this.adminCockpitRepository.getDetailingById.bind(AdminCockpitRepository),
      'SHOP': this.adminCockpitRepository.getShopById.bind(AdminCockpitRepository),
      'TIRE_STATION': this.adminCockpitRepository.getTireStationById.bind(AdminCockpitRepository),
    };

    const admin = await this.adminDbRepository.findByEmail(email);

    if (!admin) {
      throw new HttpException('Admin doesn\'t exist', HttpStatus.FORBIDDEN);
    }

    const { cockpitId, id, type } = admin;
    const name = await serviceTypes[type](cockpitId);

    if (!name) {
      throw new HttpException('Station doesn\'t exist', HttpStatus.SERVICE_UNAVAILABLE);
    }

    return {
      id,
      cockpitId,
      name,
    };
  }

  async getStationById(id: string): Promise<AdminDto> {
    const admin = await this.adminDbRepository.findById(id);

    if (!admin) {
      throw new HttpException('Admin doesn\'t exist', HttpStatus.FORBIDDEN);
    }

    const { cockpitId } = admin;
    const name = await this.adminCockpitRepository.getServiceStationById(cockpitId);

    if (!name) {
      throw new HttpException('Station doesn\'t exist', HttpStatus.SERVICE_UNAVAILABLE);
    }

    return {
      id,
      cockpitId,
      name,
    };
  }

  async getStationByCockpitId(cockpitId: string): Promise<AdminDto> {
    const serviceTypes = {
      'SERVICE_STATION': this.adminCockpitRepository.getServiceStationById.bind(AdminCockpitRepository),
      'WASH_STATION': this.adminCockpitRepository.getWashStationById.bind(AdminCockpitRepository),
      'GAS_EQUIPMENT_STATION': this.adminCockpitRepository.getGasEquipmentStationById.bind(AdminCockpitRepository),
      'DETAILING': this.adminCockpitRepository.getDetailingById.bind(AdminCockpitRepository),
      'SHOP': this.adminCockpitRepository.getShopById.bind(AdminCockpitRepository),
      'TIRE_STATION': this.adminCockpitRepository.getTireStationById.bind(AdminCockpitRepository),
    };

    const admin = await this.adminDbRepository.findByCockpitId(cockpitId);

    if (!admin) {
      throw new HttpException('Admin doesn\'t exist', HttpStatus.FORBIDDEN);
    }

    const { id, type } = admin;
    const name = await serviceTypes[type](cockpitId);

    if (!name) {
      throw new HttpException('Station doesn\'t exist', HttpStatus.SERVICE_UNAVAILABLE);
    }

    return {
      id,
      cockpitId,
      name,
    };
  }
}
