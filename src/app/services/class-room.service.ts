import { Injectable } from '@angular/core';
import { HttpClientService } from './httpClient.service';
import { IClassRoom } from '../interfaces/models/classRoom.model';
import { PagedSchoolDTO } from '../interfaces/dtos';

@Injectable()
export class ClassRoomService {
  private _baseUrl = 'http://localhost:5101';

  constructor(
    private httpClientService: HttpClientService,
  ) {}

  async get(schoolId: string, page: number, pageSize: number): Promise<PagedSchoolDTO<IClassRoom>> {
    return this.httpClientService.get<PagedSchoolDTO<IClassRoom>>(`${this._baseUrl}/School/${schoolId}/ClassRoom?page=${page}&pageSize=${pageSize}`);
  }

  async create(schoolId: string, classRoom: IClassRoom): Promise<IClassRoom>{
    return this.httpClientService.post<IClassRoom>(`${this._baseUrl}/School/${schoolId}/ClassRoom`, classRoom);
  }

  async update(schoolId: string, id: string, classRoom: any): Promise<IClassRoom>{
    return this.httpClientService.put<IClassRoom>(`${this._baseUrl}/School/${schoolId}/ClassRoom/${id}`, classRoom);
  }
}
