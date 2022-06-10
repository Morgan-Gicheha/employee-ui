import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { EmployeesService } from 'src/app/services/employees.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-post-employee',
  templateUrl: './post-employee.component.html',
  styleUrls: ['./post-employee.component.css']
})
export class PostEmployeeComponent implements OnInit {

  constructor(private employeeService:EmployeesService,   private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  form: FormGroup = new FormGroup({
		employeeName: new FormControl(""),
		employeeNumber: new FormControl(""),
		jobDescription: new FormControl(""),
		branch: new FormControl(""),
		// employeeName: new FormControl(""),
	});
  
  submit(){
      this.employeeService.postEmployee(this.form.value).subscribe(()=>{     let snackBarRef = this._snackBar.open('Employee created', 'close');})
  }

}
