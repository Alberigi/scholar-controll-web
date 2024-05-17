import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClassRoomListComponent } from './class-room-list.component';
import { ServiceModule } from '../../services/service.module';

@NgModule({
  declarations: [ClassRoomListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ServiceModule,
    FormsModule
  ],
})
export class ClassRoomListModule { }
