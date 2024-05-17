import { Injectable } from '@angular/core';
import { HttpClientService } from './httpClient.service';
import { PagedSchoolDTO } from '../interfaces/dtos';
import { IStudent } from '../interfaces/models/student.model';

@Injectable()
export class StudentService {
  private _baseUrl = 'http://localhost:5101';

  constructor(
    private httpClientService: HttpClientService,
  ) {}

  async get(schoolId: string, classId: string, page: number, pageSize: number): Promise<PagedSchoolDTO<IStudent>> {
    return this.httpClientService.get<PagedSchoolDTO<IStudent>>(`${this._baseUrl}/School/${schoolId}/ClassRoom/${classId}?page=${page}&pageSize=${pageSize}`);
  }

  async create(schoolId: string, classId: string, classRoom: IStudent): Promise<IStudent>{
    return this.httpClientService.post<IStudent>(`${this._baseUrl}/School/${schoolId}/ClassRoom/${classId}/Student`, classRoom);
  }

  async update(schoolId: string, classId: string, id: string, classRoom: any): Promise<IStudent>{
    return this.httpClientService.put<IStudent>(`${this._baseUrl}/School/${schoolId}/ClassRoom/${classId}/Student/${id}`, classRoom);
  }
}
