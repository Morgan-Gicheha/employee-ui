import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeesService } from 'src/app/services/employees.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostEmployeeComponent } from '../post-employee/post-employee.component';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees$: Observable<any>;

  displayedColumns: string[] = [
    'employeeNumber',
    'employeeName',
    'jobDescription',
    'employementDate',
    'branch',
    'update',
    'Delete',
  ];

  constructor(
    private employeeService: EmployeesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(PostEmployeeComponent);
    dialogRef.afterClosed().subscribe(() => {
      setInterval(() => {
        this.fetcher();
      }, 500);
 
    });
  }

  updateDialog(employeeNumber: number) {
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
      data: { employeeNumber: employeeNumber },
    });
    dialogRef.afterClosed().subscribe(() => {
      setInterval(() => {
        this.fetcher();
      }, 500);
      let snackBarRef = this._snackBar.open('Details updated', 'close');
    } 
    );
  }
  fetcher() {
    this.employeeService.getEmployee().subscribe(() => {
      this.employees$ = this.employeeService.employeeSource$;
    });
  }

  onDelete(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      setInterval(() => {
        this.fetcher();
      }, 100);
      let snackBarRef = this._snackBar.open('Employee deleted', 'close');
    });
  }

  ngOnInit(): void {
    this.fetcher();
  }
}
