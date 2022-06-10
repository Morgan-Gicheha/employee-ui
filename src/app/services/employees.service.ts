import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }


  private employeeSource = new BehaviorSubject<any>(null!);
  id$ = new BehaviorSubject<number>(null!);
 meetingSource$ = this.employeeSource.asObservable();



 getEmployee():Observable<any>{
   return this.http.get<any>(environment.baseUrl+'/employees/').pipe(
     map((res)=>{
       this.employeeSource.next(res)
     })
   )

 }

 postEmployee(data:any):Observable<any>{
   return this.http.post<any>(environment.baseUrl+'employees/',data)

 }
}
