import { ISchool } from "./school.model";

export interface IClassRoom {
  id?: string;
  schoolId?: string;
  school?: ISchool;
  name?: string;
  shift?: string;
  grade?: number;
  academicYear?: number;
  studentLimit?: number;
  changeValues?:boolean;
}
