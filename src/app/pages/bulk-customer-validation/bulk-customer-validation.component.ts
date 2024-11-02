import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { CustomerService } from '../../api/customer.service';
import { customerValidateBulk, validateCustomer, ValidationError } from '../../model/customer';
import { CustomerMapper2 } from './customerMapper2';



@Component({
  selector: 'app-bulk-customer-validation',
  templateUrl: './bulk-customer-validation.component.html',
  styleUrls: ['./bulk-customer-validation.component.scss'],
  providers: [MessageService]
})
export class BulkCustomerValidationComponent implements OnInit {
objectKeys(_t10: ValidationError): any {
throw new Error('Method not implemented.');
}
  uploadedFiles: any[] = [];
  messages: any[] = []; // Messages for notifications
  customers: validateCustomer[] = [];
  uploadError: string | null = null; // For storing upload errors
  uploadSuccess: string | null = null; // For storing upload success messages
  isProcessing: boolean = false;
  progressValue: number = 0;
  isUploading = false;
  private abortController = new AbortController(); // for cancellation

  uploadResponse: any;
  errors: ValidationError[] = [];

  private readonly allowedFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
  private readonly maxFileSize = 1 * 1024 * 1024; // 1MB in bytes




  constructor(private messageService: MessageService, private service: CustomerService) {}

  ngOnInit() {}



// Triggered when files are selected
onFileUpload(event: any) {
  this.uploadedFiles = event.files;

  for (let file of event.files) {
    this.readAndUploadFile(file);
  }
}


 // Reads and uploads the file content as customer data
 public readAndUploadFile(file: File) {
  const reader = new FileReader();

  reader.onloadstart = () => {
    this.isUploading = true;
    this.progressValue = 0;
  };

  reader.onprogress = (event) => {
    if (event.lengthComputable) {
      this.progressValue = Math.round((event.loaded / event.total) * 100);
    }
  };

  reader.onload = (e: any) => {
    this.progressValue = 100;
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Filter out empty rows and columns
    const filteredData = jsonData
      .filter((row: any[]) => row.some(cell => cell !== null && cell !== undefined && cell !== ''))  // Remove empty rows
      .map((row: any[]) => row.filter(cell => cell !== null && cell !== undefined && cell !== '')); // Remove empty columns in each row

    // Map filtered data to `validateCustomer` instances
    const customers: validateCustomer[] = CustomerMapper2.mapJsonToCustomers(filteredData);

    // Debugging: Inspect the mapped payload before uploading
    console.log('Mapped Customers Payload:', customers);

    // Start the upload by calling the service
    this.service.saveBulkCustomers(customers).subscribe({
      next: (response) => {
        this.isUploading = false;
        this.progressValue = 0;
        console.log('Bulk save successful', response);
      },
      error: (error) => {
        this.isUploading = false;
        this.progressValue = 0; // Reset progress on error

        // Enhanced error handling: Log detailed error information
        console.error('Bulk save failed or cancelled:', error);

      },
    });
  };

  reader.onerror = (error) => {
    this.isUploading = false;
    this.progressValue = 0;
    console.error('Error reading file:', error);
  };

  reader.readAsArrayBuffer(file);
}



// Method to cancel upload
cancelUpload() {
  if (this.isUploading) {
    this.abortController.abort(); // Trigger the cancellation
    this.isUploading = false;
    this.progressValue = 0;
    console.log('Upload cancelled');
  }
}

  addMessage(severity: string, summary: string) {
    this.messages.push({ severity, summary, detail: summary });
  }


  retryUpload() {
    this.uploadedFiles = []; // Reset the uploaded files
    this.uploadError = ''; // Clear the error message
  }


  

}
