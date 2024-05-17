import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IClassRoom } from '../../interfaces/models/classRoom.model';
import { NgIf } from '@angular/common';
import { NgbPagination, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ClassRoomService } from '../../services/class-room.service';

@Component({
  selector: 'app-class-room-list',
  templateUrl: './class-room-list.component.html',
  styleUrls: ['./class-room-list.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgbPagination,NgbToast, FormsModule]
})
export class ClassRoomListComponent implements OnInit {
  classRooms: IClassRoom[] = [];

  pageSize = 4;
  page = 1;
  totalPages = 1;

  classRoomForm!: FormGroup;

  schoolId = '';
  schoolName = '';

  constructor(
    private classRoomService: ClassRoomService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.schoolId = this.route.snapshot.paramMap.get('id') as string;
    this.classRoomForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      shift: ['', Validators.required],
      grade: ['', Validators.required],
      studentLimit: ['', Validators.required],
      academicYear: ['', Validators.required]
    });

    this.loadAttendants();
  }

  async loadAttendants() {
    try {
      const result = await this.classRoomService.get(this.schoolId, this.page, this.pageSize);

      this.classRooms = result.items;
      this.schoolName = this.classRooms[0]?.school?.name as string;
      this.totalPages =  result.total;
    } catch (error) {
      window.alert('Erro ao buscar as turmas.');
    }
  };

  addClassRoom(){
    if(!this.classRooms[0].id) return;

    this.classRooms.unshift({
      changeValues: true,
    });
  }

  resetChangeValues(index: number){
    this.classRooms[index].changeValues = false;
    this.classRoomForm.reset();

    if(!this.classRooms[index].id) this.classRooms.shift();
  }

  async saveClass(index: number){
    try {
      const data = {...this.classRoomForm.value, schoolId: this.schoolId};
      let result = { ...this.classRooms[index]};

      if(this.classRoomForm.value.id) {
        result = await this.classRoomService.update(this.schoolId, this.classRoomForm.value.id, data);
      } else {
        result = await this.classRoomService.create(this.schoolId, data);
      };

      this.classRooms[index] = {...result};
      this.resetChangeValues(index);
    } catch (error) {
      window.alert('Erro ao salvar a turma.');
    }
  }

  setEditMode(index: number, classRoom: IClassRoom){
    this.classRooms[index].changeValues = !this.classRooms[index].changeValues;

    this.classRoomForm.setValue({
      id: classRoom.id,
      name: classRoom.name,
      shift: classRoom.shift,
      grade: classRoom.grade,
      studentLimit: classRoom.studentLimit,
      academicYear: classRoom.academicYear
    });
  }

  async refreshClassRooms(){
    try {
      this.classRoomForm.reset();

      const result = await this.classRoomService.get(this.schoolId, this.page, this.pageSize);

      this.classRooms = result.items;
      this.page =  result.page;
      this.totalPages =  result.total;
    } catch (error) {
      window.alert('Erro ao buscar as turmas.');
    }
  }

  selectStudents(id?: string): void {
    this.router.navigate([`/school/${this.schoolId}/class-room/${id}/student`]);
  }
}

