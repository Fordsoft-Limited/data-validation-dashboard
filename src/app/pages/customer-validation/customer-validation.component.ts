import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CustomerService } from '../../api/customer.service';
import { AuthService } from '../../auth/service/auth.service';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { ProductService } from '../../api/product.service';
import { Product } from '../../model/user';
import { catchError, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-validation',
  templateUrl: './customer-validation.component.html',
  styleUrls: ['./customer-validation.component.scss'],
  providers: [MessageService,ProductService ]
})
export class CustomerValidationComponent {
  products!: Product[];

  // expandedRows = {};
  expandedRows: Record<string, boolean> = {};

  uploadedFiles: any[] = [];
  searchValue: string = ''; // Initialize searchValue
  loading:boolean = false;
  batches: any[] = [];
  uploading: boolean = false;
  hasErrors: boolean = false;
  userAddedError: boolean = false;
  errorMessage: string = "";
  errorLogs: string[] = [];
  currentPage: number = 1;
  totalRecords: number = 0; 
  pageSize: number = 100;

  nextPageUrl: string | null = null;  // URL for the next page
  previousPageUrl: string | null = null;  // URL for the previous page
  
  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  @ViewChild('filter') filter!: ElementRef;

  constructor(private productService: ProductService, private messageService: MessageService,
    private customerService: CustomerService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBatches(this.currentPage, this.pageSize);

    // this.productService.getProductsWithOrdersSmall().then((data) => (this.products = data));
}


getSeverity(status: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
  switch (status) {
      case 'INSTOCK':
          return 'success';
      case 'LOWSTOCK':
          return 'warning';
      case 'OUTOFSTOCK':
          return 'danger';
      default:
          return undefined; // Return undefined instead of 'unknown'
  }
}

getStatusSeverity(status: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
  switch (status) {
      case 'PENDING':
          return 'warning';
      case 'DELIVERED':
          return 'success';
      case 'CANCELLED':
          return 'danger';
      default:
          return undefined; // Use undefined instead of 'unknown'
  }
}




loadBatches(page: number, pageSize: number) {
  this.loading = true;
  this.customerService.getCustomerValidateBatchesByPages(page, pageSize).subscribe(
    (response) => {
      this.loading = false;
      if (response && response.data && response.data.results) {
        this.batches = response.data.results;
        this.totalRecords = response.data.count;

        // Handle pagination: store next and previous URLs for future navigation
        this.nextPageUrl = response.data.next;
        this.previousPageUrl = response.data.previous;
      } else {
        this.batches = [];
        this.messageService.add({ severity: 'info', summary: 'No Data', detail: 'No batches found.' });
      }
    },
    (error) => {
      this.loading = false;
      console.error('Error fetching batches:', error);
      this.batches = [];
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load batches.' });
    }
  );
}

listEvents(uid: string): Observable<any> {
  this.loading = true;
  return this.customerService.viewBatchDetails(uid).pipe(
    tap((response) => {
      this.loading = false;
    }),
    catchError((error) => {
      this.loading = false;
      console.error('Error fetching batches:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load batches.' });
      return of([]); 
    })
  );
}


onRowExpand(event: TableRowExpandEvent) {
  if( event.data['logs']==null && event.data?.total_error>0){
  this.listEvents(event.data.uid).subscribe((data) => {
    event.data['logs'] = data?.data?.events || [];
  });
}
 
}

onRowCollapse(event: TableRowCollapseEvent) {

}

// onPageChange(event:any){
//   this.currentPage = event.page + 1;
//   this.pageSize = event.rows;
//   this.loadBatches(this.currentPage,this.pageSize);
// }

onPageChange(event: any) {
  this.loading = true;

  const page = event.page + 1;  // API expects 1-based pagination
  const pageSize = event.rows;  // The number of rows per page

  // Check if there's a next page and use the nextPageUrl
  if (this.nextPageUrl) {
    this.loadBatchesFromUrl(this.nextPageUrl);
  } 
  // Check if there's a previous page and use the previousPageUrl
  else if (this.previousPageUrl) {
    this.loadBatchesFromUrl(this.previousPageUrl);
  } else {
    // Default to loading with page and page size if no URL exists
    this.loadBatches(page, pageSize);
  }
}


loadBatchesFromUrl(url: string) {
  this.loading = true;

  // Use the URL directly for pagination
  this.customerService.getCustomerValidateBatchesByPages(0, 0, url).subscribe(  // We don't need page and pageSize here
    (response) => {
      this.loading = false;
      if (response && response.data && response.data.results) {
        this.batches = response.data.results;
        this.totalRecords = response.data.count;

        // Store the next and previous URLs for navigation
        this.nextPageUrl = response.data.next;
        this.previousPageUrl = response.data.previous;
      } else {
        this.batches = [];
        this.messageService.add({ severity: 'info', summary: 'No Data', detail: 'No batches found.' });
      }
    },
    (error) => {
      this.loading = false;
      console.error('Error fetching batches from URL:', error);
      this.batches = [];
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load batches.' });
    }
  );
}



convertToCSV(batches: any[]): string {
  const header = 'Batch Code,Start Date,End Date,Status,Uploaded By\n';
  const rows = batches.map(batch =>
    `${batch.batchCode},${batch.startDate.toISOString()},${batch.endDate ? batch.endDate.toISOString() : ''},${batch.status},${batch.uploadedBy}`
  ).join('\n');

  return header + rows;
}

onUpload(event: any) {
  for (let file of event.files) {
    this.uploadedFiles.push({
      name: file.name,
      size: file.size
    });
  }

  this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: 'All files uploaded successfully.' });
}

onFileSelect(event: any) {
  const file = event.files[0];
  if (!file) {
    this.messageService.add({ severity: 'error', summary: 'File Selection', detail: 'No file selected!' });
    return;
  }

  this.uploadFile(file);
}

uploadFile(file: File) {
  this.uploading = true;
  this.hasErrors = false;
  this.errorLogs = []; // Reset error logs

  // Simulate reading and processing of the file
  const reader = new FileReader();
  reader.onload = (e: any) => {
    const content = e.target.result;
    this.processFileContent(content);
  };

  reader.onerror = () => {
    this.uploading = false;
    this.messageService.add({ severity: 'error', summary: 'File Error', detail: 'Error reading file!' });
  };

  reader.readAsText(file);
}

processFileContent(content: string) {
  // Simulate backend validation
  setTimeout(() => {
    this.uploading = false;
    const isValid = Math.random() > 0.5; // Randomly decide if validation succeeds or fails

    if (isValid) {
      this.messageService.add({ severity: 'success', summary: 'Batch Uploaded', detail: 'Upload completed successfully.' });
      this.batches.push({
        batchCode: `BATCH${this.batches.length + 1}`,
        startDate: new Date(),
        endDate: null,
        status: 'Pending',
        uploadedBy: 'User',
        fileName: "file.name",
        fileSize: "file.size"
      });
      this.hasErrors = false;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Upload Failed', detail: 'Validation issues detected. Please check the logs.' });
      this.errorLogs = [
        'Row 5: Invalid Customer ID',
        'Row 10: Missing required field'
      ]; // Simulate some validation errors
      this.hasErrors = true;
    }
  }, 3000);
}

downloadErrorLogs() {
  if (!this.hasErrors || this.errorLogs.length === 0) {
    this.messageService.add({ severity: 'warn', summary: 'No Errors', detail: 'There are no errors to download.' });
    return;
  }

  // Convert error logs to CSV format
  const errorLogContent = 'Row,Error\n' + this.errorLogs.join('\n');
  const blob = new Blob([errorLogContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', 'error_logs.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


exportData() {
  this.loading=true;

  setTimeout(() => {
    this.loading=false;
    const csvContent = this.convertToCSV(this.batches);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    
    link.setAttribute('href', url);
    link.setAttribute('download', 'batch_history.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },2000) 
}


}
