import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";

import { configuration } from "src/config/configuration";

class HttpClient {
  private static client: AxiosInstance;
  private constructor() { }

  static async gethttpClient() {
    if (!HttpClient.client) {
      const { cockpitUri, cockpitSecret } = await configuration();
      HttpClient.client = axios.create({
        baseURL: cockpitUri,
        headers: {
          'Authorization': `Bearer ${cockpitSecret}`,
          'Content-Type': 'application/json',
        },
      });
    }

    return HttpClient.client;
  }
}

@Injectable()
export class AdminCockpitRepository {
  async getServiceStationById(id: string): Promise<string> {
    const client = await HttpClient.gethttpClient();
    const { data: { entries } } = await client.get('/STOVerify', {
      params: {
        'filter[_id]': id
      }
    });
    return entries[0].name;
  }

  async getWashStationById(id: string): Promise<string> {
    const client = await HttpClient.gethttpClient();
    const { data: { entries } } = await client.get('/WashVerify', {
      params: {
        'filter[_id]': id
      }
    });
    return entries[0].name;
  }

  async getGasEquipmentStationById(id: string): Promise<string> {
    const client = await HttpClient.gethttpClient();
    const { data: { entries } } = await client.get('/CarGasEquipment', {
      params: {
        'filter[_id]': id
      }
    });
    return entries[0].companyName;
  }

  async getDetailingById(id: string): Promise<string> {
    const client = await HttpClient.gethttpClient();
    const { data: { entries } } = await client.get('/CarGasEquipment', {
      params: {
        'filter[_id]': id
      }
    });
    return entries[0].companyName;
  }

  async getShopById(id: string): Promise<string> {
    const client = await HttpClient.gethttpClient();
    const { data: { entries } } = await client.get('/CarGasEquipment', {
      params: {
        'filter[_id]': id
      }
    });
    return entries[0].companyName;
  }

  async getTireStationById(id: string): Promise<string> {
    const client = await HttpClient.gethttpClient();
    const { data: { entries } } = await client.get('/CarGasEquipment', {
      params: {
        'filter[_id]': id
      }
    });
    return entries[0].companyName;
  }
}