import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { catchError, map, Observable } from 'rxjs';
import { addUser, changePassword, Logout, refreshToken } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = this.base._baseUrl + '/user' 



  constructor(private http: HttpClient, private base: BaseService) { }


  changePassword(paylod: { old_password: string; new_password: string }, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Add any other headers if necessary
    });
  
    // Send the passwordData as the request body
    return this.http.post<any>(this.baseUrl + `/change/password`, paylod, { headers }).pipe(
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
 

  getUserList(page: number, pageSize: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const params = new HttpParams()
    .set('page', page.toString())
    .set('page_size', pageSize.toString());
    return this.http.get<any>(this.baseUrl +
      `/list`,{headers,params})
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }


  updateUserStatus(uid: string, isActive: boolean, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    const body = {
      is_active: isActive // Send 'is_active' as part of the request body
    };
  
    // Correct URL format using 'uid'
    const url = `${this.baseUrl}/${uid}/status/`;
  
    return this.http.patch<any>(url, body, { headers }).pipe(
      catchError(err => {
        console.error('Error in API call:', err);
        this.base.errorHandler(err);
        throw err; // Rethrow error to handle it elsewhere
      })
    );
  }
  
  
  


  getTotalUser(): Observable<number> {
   
    return this.http.get<any>(`${this.baseUrl}/list`).pipe(
      map(response => response.data.count),  // Access the 'count' from the response data
      catchError(err => this.base.errorHandler(err))
    );
  }


  logOutUser(payload: Logout, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post<any>(this.baseUrl + '/logout', payload, { headers })
      .pipe(
        catchError(err => this.base.errorHandler(err))
      );
  }


  refreshToken(payload: refreshToken): Observable<any> {
    return this.http.post<any>(this.baseUrl +
      `/token/refresh`, payload)
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }

// Fetch user data with pagination support


getAuditLog(page: number, pageSize: number, token: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  const params = new HttpParams()
    .set('page', page.toString())
    .set('page_size', pageSize.toString());

  return this.http.get<any>(`${this.baseUrl}/events`, { headers, params }).pipe(
    catchError(err => this.base.errorHandler(err)) // Assuming you have a base error handler
  );
}
  
  
  
  
  

}
