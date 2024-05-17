import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ISchool } from '../../interfaces/models';
import { SchoolService } from '../../services/school.service';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbPagination, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, NgbPagination, NgbToast, FormsModule],
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {
  schools: ISchool[] = [];

  pageSize = 4;
  page = 1;
  totalPages = 1;

  showNotification = true;
  isLoading: boolean = false;

  schoolsForm!: FormGroup;
  schoolName = '';

  constructor(
    private schoolService: SchoolService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.schoolsForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      cnpj: ['', Validators.required]
    });

    this.getSchools();
  }

  async getSchools(): Promise<void> {
    try {
      const result = await this.schoolService.get(this.page, this.pageSize);
      this.schools = result.items;
      this.totalPages =  result.total;

    } catch (error) {
      window.alert('Erro ao buscar as escolas.');
    }
  }

  addSchool(){
    if(!this.schools[0].id) return;

    this.schools.unshift({
      changeValues: true,
    });
  }

  resetChangeValues(index: number){
    this.schools[index].changeValues = false;
    this.schoolsForm.reset();

    if(!this.schools[index].id) this.schools.shift();
  }

  async save(index: number){
    try {
      const data = {...this.schoolsForm.value};
      let result = { ...this.schools[index]};
      if(this.schoolsForm.value.id) {
        result = await this.schoolService.update(this.schoolsForm.value.id, data);
      } else {
        result = await this.schoolService.create(data);
      };

      this.schools[index] = {...result};
      this.resetChangeValues(index);
    } catch (error) {
      window.alert('Erro ao salvar à escola.')
    }
  }

  setEditMode(index: number, school: ISchool){
    this.schools[index].changeValues = !this.schools[index].changeValues;

    this.schoolsForm.setValue({
      id: school.id,
      name: school.name,
      email: school.email,
      address: school.address,
      phone: school.phone,
      cnpj: school.cnpj
    });
  }

  selectSchool(id?: string): void {
    this.router.navigate([`/school/${id}/class-room`]);
  }

  async refreshSchool(){
    try {
      this.schoolsForm.reset();

      const result = await this.schoolService.get(this.page, this.pageSize);

      this.schools = result.items;
      this.page =  result.page;
      this.totalPages =  result.total;
    } catch (error) {
      window.alert('Erro ao buscar as escolas.');
    }
  }
}
