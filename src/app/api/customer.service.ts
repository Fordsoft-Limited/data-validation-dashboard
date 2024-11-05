import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient, private base: BaseService) { }

  // Post Request
  validateCustomer(payload: validateCustomer): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/validate`, payload)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  validateCustomerBulk(payload: customerValidateBulk): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/validate/bulk`, payload)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  customerApproveOrReject(payload: customerApproveOrReject, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.baseUrl}/vet/approve-or-reject`, payload, { headers })
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // Get Request
  getCustomerById(uid: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    
    return this.http.get<any>(`${this.baseUrl}/${uid}`, { headers })
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  getCustomerList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/list`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  getCustomersWithApprovedOrRejectedStatus(page: number, pageSize: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Include the token in the header
      'Content-Type': 'application/json'
    });
  
    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString())
      .set('approval_status', 'Approved,Rejected'); // Set to only show Approved and Rejected
  
    return this.http.get<any>(`${this.baseUrl}/status/`, { headers, params })
      .pipe(
        catchError(err => this.base.errorHandler(err))
      );
  }

  getCustomerValidateBatches(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/validate/batches`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  getCustomerValidateBatchesByPages(page: number, pageSize: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    return this.http.get<any>(`${this.baseUrl}/validate/batches-pages`, { headers, params })
      .pipe(catchError(err => this.base.errorHandler(err)));
  }


  
  getNewCustomerFilterByPages(page: number, pageSize: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    
    const params = new HttpParams()
      .set('category', 'New Customer') // Ensure the category matches the intended filter
      .set('page', page.toString())
      .set('page_size', pageSize.toString());
  
    return this.http.get<any>(`${this.baseUrl}/filter/`, { headers, params })
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  getCustomersWithAwaitingReview(page: number, pageSize: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString())
      .set('approval_status', 'Awaiting review');
  
    return this.http.get<any>(`${this.baseUrl}/status/`, { headers, params })
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  getCustomerValidateBatchesByUuid(uid: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/validate/batches/uid?uid=${uid}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  saveBulkCustomers(customers: validateCustomer[], token: string): Observable<any> {
    // Create a Blob from the workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(customers);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    // Prepare the FormData for the request
    const formData = new FormData();
    formData.append('file', excelBlob, 'customers.xlsx');
  
    // Set up headers
    const headers = new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Accept': 'application/json'
    });
  
    // Send the FormData with the file
    return this.http.post<any>(`${this.baseUrl}/validate/bulk`, formData, { headers })
      .pipe(catchError(error => {
        console.error('Upload error:', error);
        return throwError(error);
      }));
  }

  cancelUpload() {
    this.cancelSubject.next(); // Trigger cancellation
    this.cancelSubject.complete(); // Close the subject
    this.cancelSubject = new Subject<void>(); // Reset for future use
    console.log('Upload cancelled');
  }
}
