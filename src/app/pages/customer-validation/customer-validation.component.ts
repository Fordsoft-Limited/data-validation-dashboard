import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CustomerService } from '../../api/customer.service';
import { AuthService } from '../../auth/service/auth.service';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { ProductService } from '../../api/product.service';
import { Product } from '../../model/user';


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
  pageSize: number = 10;

  
  @ViewChild('filter') filter!: ElementRef;

  constructor(private productService: ProductService, private messageService: MessageService,
    private customerService: CustomerService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.loadBatches(this.currentPage, this.pageSize);

    this.productService.getProductsWithOrdersSmall().then((data) => (this.products = data));
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


// expandAll() {
//   this.expandedRows = this.batches.reduce((acc, batch) => {
//     if (batch.batch_code !== undefined) { // Ensure 'batch' is used for each array item
//       acc[batch.batch_code] = true;
//     }
//     return acc;
//   }, {} as Record<string, boolean>);
// }

// collapseAll() {
//   this.expandedRows = {}; // Reset expandedRows to collapse all rows
// }


loadBatches(page: number, pageSize: number) {
  const token = this.authService.getToken();
  console.log(token);
if (!token) {
  this.loading = false;
  this.hasErrors = true;
  this.errorMessage = 'No authentication token found. Please log in again.';
  setTimeout(() => {
    this.userAddedError = false;
  }, 3000);
  return; // Exit the function early
}
  this.loading = true;
  this.customerService.getCustomerValidateBatchesByPages(page, pageSize, token).subscribe(
    (response) => {
      this.loading = false;
      if (response && response.data && response.data.results) {
        this.batches = response.data.results;
        this.totalRecords = response.data.count; 
      } else {
        this.batches = []; 
        this.messageService.add({ severity: 'info', summary: 'No Data', detail: 'No batches found.' });
      }
    },
    (error) => {
      this.loading = false;
      console.error('Error fetching batches:', error); // Log the error
      this.batches = []; // Clear batches on error
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load batches.' });
    }
  );
}
onPageChange(event: any) {
  this.currentPage = event.page + 1; // PrimeNG pagination is 0-based
  this.loadBatches(this.currentPage, this.pageSize); // Load the new page
}

  


onRowExpand(event: TableRowExpandEvent) {
  // Collapse all other rows
  this.batches.forEach(batch => {
      if (batch.batch_code !== event.data.batch_code) {
          this.expandedRows[batch.batch_code] = false; // Collapse other rows
      }
  });

  this.expandedRows[event.data.batch_code] = true; // Expand the current row
  this.messageService.add({ severity: 'info', summary: 'Bulk Upload Expanded', detail: event.data.batch_code, life: 3000 });
}

onRowCollapse(event: TableRowCollapseEvent) {
  this.expandedRows[event.data.id] = false; // Collapse the current row
  this.messageService.add({ severity: 'success', summary: 'Close Upload Collapsed', detail: event.data.batch_code, life: 3000 });
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
