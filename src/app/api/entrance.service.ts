import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { catchError, Observable } from 'rxjs';
import { entranceLogin } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class EntranceService {

  constructor(private http: HttpClient, private base: BaseService) {
    console.log(this.baseUrl);
   }

  private baseUrl = this.base._baseUrl + '/entrance';

  
  


  entranceLogin(payload: entranceLogin): Observable<any> {
    return this.http.post<any>(this.baseUrl +
       `/login` , payload).pipe(
      catchError(err => this.base.errorHandler(err))  
    );
  

  }


  // entranceLogin2(username: string, password: any): Observable<any>{
  //     return this.http.get<any>(this.baseUrl + 
  //       `/login?password=${password}&username=${username}`)
  //       .pipe(
  //       catchError(err => this.base.errorHandler(err))
  //     )
  //   }



}