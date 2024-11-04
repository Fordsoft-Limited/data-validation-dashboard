import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { customerApproveOrReject, customerValidateBulk, validateCustomer } from '../model/customer';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = `${this.base._baseUrl}/customer`;
  private cancelSubject = new Subject<void>();

  constructor(private http: HttpClient, private base: BaseService) {}

  // Post Requests
  validateCustomer(payload: validateCustomer): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/validate`, payload).pipe(
      catchError(err => this.base.errorHandler(err))
    );
  }

  saveBulkCustomers(customers: validateCustomer[], token: string): Observable<any> {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(customers);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const formData = new FormData();
    formData.append('file', excelBlob, 'customers.xlsx');

    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Accept': 'application/json'
    });

    return this.http.post<any>(`${this.baseUrl}/validate/bulk`, formData, { headers }).pipe(
      catchError(error => {
        console.error('Upload error:', error);
        return throwError(error);
      })
    );
  }

  cancelUpload() {
    this.cancelSubject.next();
    this.cancelSubject.complete();
    this.cancelSubject = new Subject<void>(); // Reset for future use
    console.log('Upload cancelled');
  }

  customerApproveOrReject(payload: customerApproveOrReject): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/vet/approve-or-reject`, payload).pipe(
      catchError(err => this.base.errorHandler(err))
    );
  }

  
  // Get Requests
  getCustomerById(uid: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/uid?uid=${uid}`).pipe(
      catchError(err => this.base.errorHandler(err))
    );
  }

  getCustomerList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/list`).pipe(
      catchError(err => this.base.errorHandler(err))
    );
  }

  getCustomerValidateBatches(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/validate/batches`).pipe(
      catchError(err => this.base.errorHandler(err))
    );
  }

  getCustomerValidateBatchesByPages(page: number, pageSize: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    return this.http.get<any>(`${this.baseUrl}/validate/batches-pages`, { headers, params }).pipe(
      catchError(err => this.base.errorHandler(err))
    );
  }

  getCustomerValidateBatchesByUuid(uid: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/validate/batches/uid?uid=${uid}`).pipe(
      catchError(err => this.base.errorHandler(err))
    );
  }
}
