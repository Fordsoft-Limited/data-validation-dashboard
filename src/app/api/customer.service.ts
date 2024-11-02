import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { customerApproveOrReject, customerValidateBulk, validateCustomer } from '../model/customer';
import { catchError, Observable, Subject, takeUntil, throwError } from 'rxjs';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = this.base._baseUrl + '/customer' 
  private cancelSubject = new Subject<void>();



  constructor(private http: HttpClient, private base: BaseService, ) { }


  // Post Request  
  validateCustomer(payload: validateCustomer): Observable<any> {
    return this.http.post<any>(this.baseUrl +
      `/validate`, payload)
      .pipe(
        catchError(err => this.base.errorHandler(err))
      )
  }


saveBulkCustomers(customers: validateCustomer[]): Observable<any> {
  // Convert customers to an Excel file
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(customers);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
  
  // Create a Blob from the workbook
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Prepare the FormData for the request
  const formData = new FormData();
  formData.append('file', excelBlob, 'customers.xlsx');

  // Send the FormData with the file
  return this.http.post<any>(`${this.baseUrl}/validate/bulk`, formData, {
    headers: new HttpHeaders({
      'Accept': 'application/json'
    }),
  });
}


  cancelUpload() {
    this.cancelSubject.next(); // Trigger cancellation
    this.cancelSubject.complete(); // Close the subject
    this.cancelSubject = new Subject<void>(); // Reset for future use
    console.log('Upload cancelled');
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
