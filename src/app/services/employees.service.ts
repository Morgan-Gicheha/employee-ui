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
  employeeSource$ = this.employeeSource.asObservable();

  private singleEmployeeSource = new BehaviorSubject<any>(null!);
  singleEmployeeSource$ =this.singleEmployeeSource.asObservable();


 getEmployee():Observable<any>{
   return this.http.get<any>(environment.baseUrl+'/employees/').pipe(
    map((res)=>{
      this.employeeSource.next(res['response'])
    })
  )

 }

 getSingleEmployee(id:number){
  return this.http.get<any>(environment.baseUrl+'/employees/'+id).pipe(
    map((res)=>{
      this.singleEmployeeSource.next(res['response'])
    })
  )
 }

 postEmployee(data:any):Observable<any>{
   return this.http.post<any>(environment.baseUrl+'/employees/',data)

 }

 deleteEmployee(id:number){
  return this.http.delete<any>(environment.baseUrl+'/employees/'+id)
 }

 putEmployee(id:number,data:any):Observable<any>{
  return this.http.put<any>(environment.baseUrl+'/employees/'+id,data)

}
}
