import { Provider } from '@angular/core';
import axios from 'axios';
import { IAxiosInstance } from '../interfaces/instances';
import { HttpClientService } from './httpClient.service';
import { SchoolService } from './school.service';
import { ClassRoomService } from './class-room.service';
import { StudentService } from './student.service';

export const ServicesProviders: Provider[] = [
  {
    provide: IAxiosInstance.name,
    useFactory: () => axios,
  },
  HttpClientService,
  SchoolService,
  ClassRoomService,
  StudentService
];
