import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { customerApproveOrReject, customerValidateBulk, validateCustomer } from '../model/customer';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = this.base._baseUrl + '/customer' 


  constructor(private http: HttpClient, private base: BaseService) { }



  // Post Request  
  validateCustomer(payload: validateCustomer): Observable<any> {
    return this.http.post<any>(this.baseUrl +
      `/validate`, payload)
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }


  validateCustomerBulk(payload: customerValidateBulk): Observable<any> {
    return this.http.post<any>(this.baseUrl +
      `/validate/bulk`, payload)
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }


  customerApproveOrReject(payload: customerApproveOrReject, token: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Add any other headers if necessary
    });
    return this.http.post<any>(this.baseUrl +
      `/vet/approve-or-reject`, payload, { headers })
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }

  // Get Request  

  getCustomerById(uid: string , token:string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Add any other headers if necessary
    });
    
    return this.http.get<any>(`${this.baseUrl}/${uid}`, { headers })
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }

  getCustomerList(): Observable<any> {
    return this.http.get<any>(this.baseUrl +
      `/list`)
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }

  getCustomerValidateBatches(): Observable<any> {
    return this.http.get<any>(this.baseUrl +
      `/validate/batches`)
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }

  getCustomerValidateBatchesByPages(page: number, pageSize: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Add any other headers if necessary
    });
    const params = new HttpParams()
    .set('page', page.toString())
    .set('page_size', pageSize.toString());

    return this.http.get<any>(this.baseUrl +
      `/validate/batches-pages`, { params } )
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }

  getCustomersWithAwaitingReview(page: number, pageSize: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Include the token in the header
      'Content-Type': 'application/json'
    });
  
    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString())
      .set('approval_status', 'Awaiting review');
  
    return this.http.get<any>(`${this.baseUrl}/status/`,{ headers, params })
      .pipe(
        catchError(err => this.base.errorHandler(err))
      );
  }


  getCustomerValidateBatchesByUuid(uid: string): Observable<any> {
    return this.http.get<any>(this.baseUrl +
      `/validate/batches/uid?uid=${uid}`)
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }



}
