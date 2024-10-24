import { HttpClient, HttpParams } from '@angular/common/http';
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


  customerApproveOrReject(payload: customerApproveOrReject): Observable<any> {
    return this.http.post<any>(this.baseUrl +
      `/vet/approve-or-reject`, payload)
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }


  // Get Request  

  getCustomerById(uid: string) {
    return this.http.get<any>(this.baseUrl +
      `/uid?uid=${uid}`)
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

  getCustomerValidateBatchesByPages(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('page_size', pageSize.toString());

    return this.http.get<any>(this.baseUrl +
      `/validate/batches-pages`, { params } )
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }


  getCustomerValidateBatchesByUuid(uid: string): Observable<any> {
    return this.http.get<any>(this.baseUrl +
      `/validate/batches/uid?uid=${uid}`)
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }



}
