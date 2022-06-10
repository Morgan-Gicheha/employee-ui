import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees$: Observable<any>;

  displayedColumns: string[] = ['id', 'employeeNumber', 'employeeName', 'jobDescription','employementDate','branch'];

  constructor(private employeeService:EmployeesService) { }

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe((res)=>{
      this.employees$ = res
    })

  }

}
