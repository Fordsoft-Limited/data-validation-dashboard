import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { customerApproveOrReject, customerValidateBulk, validateCustomer } from '../model/customer';
import { catchError, map, Observable, of, Subject, tap, throwError } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = `${this.base._baseUrl}/customer`;
  private cancelSubject = new Subject<void>();
  SUCCESS: any;

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

  customerApproveOrReject(payload: customerApproveOrReject): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.baseUrl}/vet/approve-or-reject`, payload, { headers })
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  // Get Request
  getCustomerById(uid: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${this.baseUrl}/${uid}`, { headers })
      .pipe(catchError(err => this.base.errorHandler(err)));
  }


  getCustomerList(): Observable<number> {
    return this.http.get<any>(`${this.baseUrl}/list`).pipe(
      map(response => response.data?.count || 0),
      catchError(err => {
        this.base.errorHandler(err);
        return of(0);
      })
    );
  }

  getCustomersWithApprovedOrRejectedStatus(page: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString())
      .set('approval_status', 'Approved,Rejected');

    return this.http.get<any>(`${this.baseUrl}/status/`, { headers, params })
      .pipe(
        catchError(err => this.base.errorHandler(err))
      );
  }

  getCustomerValidateBatches(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/validate/batches`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  viewBatchDetails(uid: string): Observable<any> {
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
          console.error('Error in service:', err);
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


  getNewCustomerFilterByPages(page: number, pageSize: number, ): Observable<any> {
    const headers = new HttpHeaders({
     
      'Content-Type': 'application/json'
    });

    const params = new HttpParams()
      .set('category', 'New Customer') // Ensure the category matches the intended filter
      .set('page', page.toString())

      .set('page_size', pageSize.toString())
      .set('approval_status', 'Approved,Rejected');
  
    return this.http.get<any>(`${this.baseUrl}/filter/`, { headers, params })
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  getCustomerFilterByPages(page: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    const params = new HttpParams()
      .set('category', 'New Customer') // Ensure the category matches the intended filter
      .set('page', page.toString())
      .set('page_size', pageSize.toString())
      .set('approval_status', 'Awaiting review');
  
    return this.http.get<any>(`${this.baseUrl}/filter/`, { headers, params })
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  
  getCustomerStatusByReViewed(page: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    
    const params = new HttpParams()
      //.set('category', 'New Customer') // Ensure the category matches the intended filter
      .set('page', page.toString())
      .set('page_size', pageSize.toString())
      .set('approval_status', 'Reviewed');
    return this.http.get<any>(`${this.baseUrl}/filter/`, { headers, params })
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  getCustomerScheduleReportList(page: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    
    const params = new HttpParams()
      //.set('category', 'New Customer') // Ensure the category matches the intended filter
      .set('page', page.toString())
      .set('page_size', pageSize.toString())
     
    return this.http.get<any>(`${this.baseUrl}/schedule_report/list/`, { headers, params })
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  getNewCustomerFilter(
    region: string,
    businessHub: string,
    serviceCenter: string,
    dateCreatedFrom: string,
    dateCreatedTo: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
 
    const params = new HttpParams()
      .set('region', region)
      .set('business_hub', businessHub)
      .set('service_center', serviceCenter)
      .set('date_created_from', dateCreatedFrom)
      .set('date_created_to', dateCreatedTo)
    return this.http.get<any>(`${this.baseUrl}/filter/`, { params })
      .pipe(catchError(err => this.base.errorHandler(err)));
  }


  getNewCustomerFilter2(payload: any): Observable<any> {
    let params = new HttpParams();

    if (payload.region) {
      params = params.set('region', payload.region);
    }
    if (payload.businessHub) {
      params = params.set('business_hub', payload.businessHub);
    }
    if (payload.serviceCenter) {
      params = params.set('service_center', payload.serviceCenter);
    }
    if (payload.dateCreatedFrom) {
      params = params.set('date_created_from', payload.dateCreatedFrom);
    }
    if (payload.dateCreatedTo) {
      params = params.set('date_created_to', payload.dateCreatedTo);
    }
    if (payload.status) {
      params = params.set('status_code', payload.status);
    }
    if (payload.createdBy) {
      params = params.set('created_By', payload.createdBy);
    }
    if (payload.updatedBy) {
      params = params.set('updated_By', payload.updatedBy);
    }
    if (payload.approvedBy) {
      params = params.set('approved_By', payload.approvedBy);
    }
    if (payload.aplicationDate) {
      params = params.set('application_date', payload.aplicationDate);
    }
    return this.http.get<any>(`${this.baseUrl}/filter/`, { params })
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

    const params = new HttpParams()
      .set('region', region)
      .set('business_hub', businessHub)
      .set('service_center', serviceCenter)
      .set('date_created_from', dateCreatedFrom)
      .set('date_created_to', dateCreatedTo)
      .set('approval_status', 'Approved,Rejected');
    return this.http.get<any>(`${this.baseUrl}/filter/`, { params })
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  getCustomerQrCode(customerNo: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`${this.baseUrl}/qrcode/${customerNo}/`, { headers })
  }
  // getCustomersWithAwaitingReview(page: number, pageSize: number): Observable<any> {
  //   const headers = new HttpHeaders({
     
  //     'Content-Type': 'application/json'
  //   });


  getCustomersWithAwaitingReview(page: number, pageSize: number): Observable<any> {

    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString())
      .set('approval_status', 'Awaiting review');

    return this.http.get<any>(`${this.baseUrl}/status/`, { params })
      .pipe(catchError(err => this.base.errorHandler(err)));
  }


  getCustomerValidateBatchesByUuid(uid: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/validate/batches/uid?uid=${uid}`)
      .pipe(catchError(err => this.base.errorHandler(err)));
  }

  saveBulkCustomers(customers: validateCustomer[]): Observable<any> {
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
      // 'Authorization': token ? `Bearer ${token}` : '',
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



  getCustomerAwaitingReviewStatus(status: string, ): Observable<any> {
    const headers = new HttpHeaders({
      
      'Content-Type': 'application/json'
    });
    const params = new HttpParams().set('approval_status', status);

    return this.http.get<any>(`${this.baseUrl}/status/`, { headers, params }).pipe(
      catchError((err) => {
        console.error('Error occurred:', err);
        throw err; // Handle the error accordingly
      })
    );
  }

  getCustomerRejectStatus(status: string): Observable<any> {
    const headers = new HttpHeaders({
     
      'Content-Type': 'application/json'
    });
    const params = new HttpParams().set('approval_status', status);

    return this.http.get<any>(`${this.baseUrl}/status/`, { headers, params }).pipe(
      catchError((err) => {
        console.error('Error occurred:', err);
        throw err; // Handle the error accordingly
      })
    );
  }


  getCustomerApprovalStatus(status: string): Observable<any> {
    const headers = new HttpHeaders({
     
      'Content-Type': 'application/json'
    });
    const params = new HttpParams().set('approval_status', status);

    return this.http.get<any>(`${this.baseUrl}/status/`, { headers, params }).pipe(
      catchError((err) => {
        console.error('Error occurred:', err);
        throw err; // Handle the error accordingly
      })
    );
  }


  getPieChartData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard/`).pipe(
      map(response => {
        // Extract pie chart data from the response
        const pieChartData = response.data.pie_chart_data;

        // Format the data for the pie chart
        return {
          labels: Object.keys(pieChartData), // ['Approved', 'Rejected', 'Awaiting Review']
          datasets: [
            {
              data: Object.values(pieChartData), // [8, 2, 715]
              backgroundColor: ['blue', '#28a745', '#dc3545', '#ffc107'], // Custom colors for each slice
            }
          ]
        };
      }),
      catchError((err) => {
        console.error('Error occurred:', err);
        throw err; // Handle the error accordingly
      })
    );
  }


  getRecentActivities(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/dashboard/`).pipe(
      map((response) => {
        // Extract recent_event_logs
        return response.data.recent_event_logs.map((log: { description: any; category: any; status: any; posted_by: { username: any; }; }) => ({
          description: log.description,
          postedBy: log.posted_by.username, // Pick the username only
          status: log.status,
          category: log.category,
          createdDate: new Date().toLocaleDateString() // Assuming you get a created date, use it here
        }));
      }),
      catchError((err) => {
        console.error('Error occurred:', err);
        throw err; // Handle the error accordingly
      })
    );
  }

  // Define the return type as AuditLogResponse
  getAuditLog(page: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders({
      
      'Content-Type': 'application/json',
    });

    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    return this.http.get<any>(`${this.baseUrl}/events/`, { headers, params }).pipe(
      catchError(err => this.base.errorHandler(err)) // Assuming you have a base error handler
    );
  }

}
