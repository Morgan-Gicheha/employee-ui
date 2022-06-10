import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { employeeNumber: number },
    private employeeService: EmployeesService
  ) {}

id:number;
employeeName:string
jobDescription:string
branch:string
employeeNumber:number
  

  submit() {
    this.employeeService.putEmployee(this.employeeNumber,this.formupdate.value).subscribe()
  }

  formupdate: FormGroup = new FormGroup({
    employeeName: new FormControl(''),
    employeeNumber: new FormControl(''),
    jobDescription: new FormControl(''),
    branch: new FormControl(''),
    // employeeName: new FormControl(""),
  });
  
  ngOnInit(): void {
    this.employeeService
      .getSingleEmployee(this.data.employeeNumber)
      .subscribe((x) => {
        this.employeeService.employeeSource$.subscribe((res)=>{this.id = res[0]['id'],
      this.employeeName = res[0]['employeeName'],
      this.jobDescription = res[0]['jobDescription'],
      this.branch = res[0]['branch'],
      this.employeeNumber = res[0]['employeeNumber']
    })
      });
  }
}
