import { IClassRoom } from "./classRoom.model";

export interface IStudent {
  id?: string;
  name?: string;
  classRoomId?: string;
  classRoom?: IClassRoom
  phone?: string;
  guardian?: string;
  address?: number;
  date?: Date;
  changeValues?: boolean
}
