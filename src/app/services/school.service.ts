import { Injectable } from '@angular/core';
import { HttpClientService } from './httpClient.service';
import { ISchool } from '../interfaces/models';
import { PagedSchoolDTO } from '../interfaces/dtos';

@Injectable()
export class SchoolService {
  private _baseUrl = 'http://localhost:5101';

  constructor(
    private httpClientService: HttpClientService,
  ) {}

  async get(page: number, pageSize: number): Promise<PagedSchoolDTO<ISchool>> {
    return this.httpClientService.get<PagedSchoolDTO<ISchool>>(`${this._baseUrl}/School?page=${page}&pageSize=${pageSize}`);
  }

  async create(school: ISchool): Promise<ISchool>{
    return this.httpClientService.post<ISchool>(`${this._baseUrl}/School`, school);
  }

  async update(id: string, school: ISchool): Promise<ISchool>{
    return this.httpClientService.put<ISchool>(`${this._baseUrl}/School/${id}`, school);
  }

  async delete(id: string): Promise<ISchool>{
    return this.httpClientService.delete<ISchool>(`${this._baseUrl}/School/${id}`);
  }
}
