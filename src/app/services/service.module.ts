import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServicesProviders } from './providers';
import { SchoolService } from './school.service';
import { ClassRoomService } from './class-room.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [...ServicesProviders],
  exports: [SchoolService, ClassRoomService]
})
export class ServiceModule {}
