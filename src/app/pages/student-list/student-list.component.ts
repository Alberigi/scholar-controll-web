import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbPagination, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from '../../interfaces/models/student.model';
import { StudentService } from '../../services/student.service';


@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, NgbPagination, NgbToast, FormsModule],
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: IStudent[] = [];

  pageSize = 4;
  page = 1;
  totalPages = 1;

  showNotification = true;
  isLoading: boolean = false;

  studentForm!: FormGroup;
  schoolId = '';
  classRoomId = '';
  classRoomName = '';

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.classRoomId = this.route.snapshot.paramMap.get('id') as string;
    this.schoolId = this.route.snapshot.paramMap.get('schoolId') as string;
    this.studentForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      guardian: ['', Validators.required]
    });

    this.getStudents();
  }

  async getStudents(): Promise<void> {
    try {
      const result = await this.studentService.get(this.schoolId, this.classRoomId, this.page, this.pageSize);
      this.students = result.items;
      this.totalPages =  result.total;
      this.classRoomName = result.items[0]?.classRoom?.name as string;

    } catch (error) {
      window.alert('Erro ao buscar os alunos.');
    }
  }

  addStudent(){
    if(!this.students[0].id) return;

    this.students.unshift({
      changeValues: true,
    });
  }

  resetChangeValues(index: number){
    this.students[index].changeValues = false;
    this.studentForm.reset();

    if(!this.students[index].id) this.students.shift();
  }

  async save(index: number){
    try {
      const data = {...this.studentForm.value};
      let result = { ...this.students[index]};

      if(this.studentForm.value.id) {
        result = await this.studentService.update( this.schoolId, this.classRoomId,this.studentForm.value.id, data);
      } else {
        result = await this.studentService.create(this.schoolId, this.classRoomId, data);
      };

      this.students[index] = {...result};
      this.resetChangeValues(index);
    } catch (error) {
      window.alert('Erro ao salvar o aluno.')
    }
  }

  setEditMode(index: number, student: IStudent){
    this.students[index].changeValues = !this.students[index].changeValues;

    this.studentForm.setValue({
      id: student.id,
      name: student.name,
      date: student.date,
      address: student.address,
      phone: student.phone,
    });
  }

  selectStudent(id?: string): void {
    this.router.navigate([`/School/${id}/class-room`]);
  }

  async refreshStudent(){
    try {
      this.studentForm.reset();

      const result = await this.studentService.get(this.schoolId, this.classRoomId, this.page, this.pageSize);

      this.students = result.items;
      this.page =  result.page;
      this.totalPages =  result.total;
    } catch (error) {
      window.alert('Erro ao buscar os alunos.');
    }
  }
}
