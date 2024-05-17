import { Inject, Injectable } from '@angular/core';
import { IAxiosInstance } from '../interfaces/instances';

@Injectable()
export class HttpClientService {
  constructor(
    @Inject(IAxiosInstance.name) private axiosInstance: IAxiosInstance
  ) {}

  async get<T>(url: string, config = {}): Promise<T> {
    const result = await this.axiosInstance.get(url, config);
    return result.data;
  }

  async post<T>(url: string, data: any, config = {}): Promise<T> {
    const result = await this.axiosInstance.post(url, data, config);
    return result.data;
  }

  async put<T>(url: string, data: any, config = {}): Promise<T> {
    const result = await this.axiosInstance.put(url, data, config);
    return result.data;
  }

  async delete<T>(url: string, config = {}): Promise<T> {
    const result = await this.axiosInstance.delete(url, config);
    return result.data;
  }
}
