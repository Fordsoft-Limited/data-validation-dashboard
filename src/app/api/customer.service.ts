import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { customerApproveOrReject, customerValidateBulk, validateCustomer } from '../model/customer';
import { catchError, Observable, of, Subject, throwError } from 'rxjs';
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
  viewBatchDetails(uid:string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/validate/batches/${uid}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  getCustomerValidateBatchesByPages(page: number, pageSize: number, url?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    let params = new HttpParams();
    if (!url) {  // If no URL is passed, use page and pageSize
      params = params.set('page', page.toString())
                     .set('page_size', pageSize.toString());
    }
  
    // Use URL if provided (for next/previous pagination)
    const requestUrl = url ? url : `${this.baseUrl}/validate/batches-pages`;
  
    return this.http.get<any>(requestUrl, { headers, params })
      .pipe(
        catchError(err => {
          // Log the error to console
          console.error('Error in service:', err);
  
          // Handle the error gracefully by returning a fallback object
          // You can customize this fallback object as needed
          return of({ 
            data: { 
              results: [], 
              count: 0, 
              next: null, 
              previous: null 
            } 
          });
        })
      );
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

  getNewCustomerFilter(
    token: string, 
    region: string, 
    businessHub: string, 
    serviceCenter: string, 
    dateCreatedFrom: string, 
    dateCreatedTo: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Prepare the query parameters for filtering
    const params = new HttpParams()
      .set('region', region)
      .set('business_hub', businessHub)
      .set('service_center', serviceCenter)
      .set('date_created_from', dateCreatedFrom)
      .set('date_created_to', dateCreatedTo)
    // Make the GET request with headers and query parameters
    return this.http.get<any>(`${this.baseUrl}/filter/`, { headers, params })
      .pipe(catchError(err => this.base.errorHandler(err)));
  }


  getNewCustomerFilterApproveRegion(
    token: string, 
    region: string, 
    businessHub: string, 
    serviceCenter: string, 
    dateCreatedFrom: string, 
    dateCreatedTo: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Prepare the query parameters for filtering
    const params = new HttpParams()
      .set('region', region)
      .set('business_hub', businessHub)
      .set('service_center', serviceCenter)
      .set('date_created_from', dateCreatedFrom)
      .set('date_created_to', dateCreatedTo)
      .set('approval_status', 'Approved,Rejected');
    // Make the GET request with headers and query parameters
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
