import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SchoolListComponent } from './pages/school-list/school-list.component';
import { ClassRoomListModule } from './pages/class-room-list/class-room-list.module';
import { RouterModule } from '@angular/router';
import { ClassRoomListComponent } from './pages/class-room-list/class-room-list.component';
import { ServiceModule } from './services/service.module';
import { ServicesProviders } from './services/providers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentListComponent } from './pages/student-list/student-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SchoolListComponent,
    StudentListComponent,
    ClassRoomListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceModule,
    NgbModule,
    ClassRoomListModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [...ServicesProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
