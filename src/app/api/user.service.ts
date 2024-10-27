import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { catchError, Observable } from 'rxjs';
import { addUser, changePassword, logout, refreshToken } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = this.base._baseUrl + '/user' 



  constructor(private http: HttpClient, private base: BaseService) { }


  changePassword(paylod: changePassword): Observable<any> {
    return this.http.post<any>(this.baseUrl +
        `/change/password`, paylod).pipe(
      catchError(err => this.base.errorHandler(err)) 
    );
  }

  createUser(payload: addUser, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Add any other headers if necessary
    });

    return this.http.post(`${this.baseUrl}/create`, payload, { headers });
  }
  // createUser(payload: addUser): Observable<any> {
    
  //   return this.http.post<any>(this.baseUrl +
  //     `/create`, payload)
  //     .pipe(
  //       catchError(err => this.base.errorHandler(err))
  //     )
  // }


  getUserList(): Observable<any> {
    return this.http.get<any>(this.baseUrl +
      `/list`)
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }

  logOutUser(payload: logout): Observable<any> {
    return this.http.post<any>(this.baseUrl +
      `/logout`, payload)
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }


  refreshToken(payload: refreshToken): Observable<any> {
    return this.http.post<any>(this.baseUrl +
      `/token/refresh`, payload)
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }



}
