import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceModule } from '../../services/service.module';
import { SchoolService } from '../../services/school.service';

@NgModule({
  imports: [
    CommonModule,
    ServiceModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [SchoolService]
})
export class StudentListModule { }
