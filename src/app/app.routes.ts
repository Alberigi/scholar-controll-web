import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolListComponent } from './pages/school-list/school-list.component';
import { ClassRoomListComponent } from './pages/class-room-list/class-room-list.component';
import { StudentListComponent } from './pages/student-list/student-list.component';

export const routes: Routes = [
  { path: '', component: SchoolListComponent },
  { path: 'school/:id/class-room', component: ClassRoomListComponent },
  { path: 'school/:schoolId/class-room/:id/student', component: StudentListComponent },
];
