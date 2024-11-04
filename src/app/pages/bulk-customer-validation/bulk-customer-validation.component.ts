import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { CustomerService } from '../../api/customer.service';
import { validateCustomer, ValidationError } from '../../model/customer';
import { CustomerMapper2 } from './customerMapper2';
import { AuthService } from '../../auth/service/auth.service';
import { FileUpload } from 'primeng/fileupload'; // Adjust import based on your setup

@Component({
  selector: 'app-bulk-customer-validation',
  templateUrl: './bulk-customer-validation.component.html',
  styleUrls: ['./bulk-customer-validation.component.scss'],
  providers: [MessageService],
})
export class BulkCustomerValidationComponent implements OnInit {
  objectKeys(_t10: ValidationError): any {
    throw new Error('Method not implemented.');
  }
  uploadedFiles: any[] = [];
  messages: any[] = [];
  customers: validateCustomer[] = [];
  uploadError: string  = "";
  uploadSuccess: string | null = null;
  isProcessing: boolean = false;
  progressValue: number = 0;
  isUploading = false;
  private abortController = new AbortController();
  @ViewChild('fileUpload') fileUpload!: FileUpload; // Reference to the file upload component

  uploadResponse: any;
  errors: ValidationError[] = [];

  private readonly allowedFileTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
  ];
  private readonly maxFileSize = 1 * 1024 * 1024; // 1MB in bytes
  constructor(
    private messageService: MessageService,
    private service: CustomerService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  // Triggered when files are selected
  onFileUpload(event: any) {
    this.uploadedFiles = event.files;
    this.uploadError = ""; // Reset upload error message
    this.errors = []; // Reset errors

    for (let file of event.files) {
      if (this.validateFile(file)) {
        this.readAndUploadFile(file);
      }
    }
  }

  // Validate file before processing
  private validateFile(file: File): boolean {
    if (!this.allowedFileTypes.includes(file.type)) {
      this.uploadError =
        'Invalid file type. Please upload an .xlsx or .csv file.';
      return false;
    }

    if (file.size > this.maxFileSize) {
      this.uploadError = 'File size exceeds the limit of 1MB.';
      return false;
    }

    return true;
  }

  // Reads and uploads the file content as customer data
  public readAndUploadFile(file: File) {
    const reader = new FileReader();

    reader.onloadstart = () => {
      this.isUploading = true;
      this.isProcessing = true;
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
        .filter((row: any[]) => row.some((cell) => cell !== null && cell !== undefined && cell !== ''))
        .map((row: any[]) => row.filter((cell) => cell !== null && cell !== undefined && cell !== ''));

      // Map filtered data to validateCustomer instances
      const customers: validateCustomer[] = CustomerMapper2.mapJsonToCustomers(filteredData);
      console.log('Mapped Customers Payload:', customers);

      // Get the authentication token
      const token = this.authService.getToken();
      if (!token) {
        this.uploadError = 'User is not authenticated. Please log in again.';
        return;
      }
      console.log(token);

      // Start the upload by calling the service
      this.service.saveBulkCustomers(customers, token).subscribe({
        next: (response) => {
          this.isUploading = false;
          this.isProcessing = false;
          this.progressValue = 0;

          // Check if the response contains both success and error messages
          if (response.code === 200 && response.status === 'Success') {
            this.customers = response.data; // Update with successful customers
            this.uploadSuccess = 'File uploaded successfully';
            
             // Reset the file upload component state
             this.resetFileUpload();

            // Reset the success message after a timeout
            setTimeout(() => {
              this.uploadSuccess = ''; // Clear the success message
            }, 5000); // Change 5000 to your desired timeout duration in milliseconds
            
          } else if (response.partialSuccess) {
            this.customers = response.data; // Update with successful customers
            this.errors = response.errors; // Set validation errors for failed rows
            this.uploadSuccess = 'Upload completed with some errors. Check the error report.';
            
            // Reset the success message after a timeout
            setTimeout(() => {
              this.uploadSuccess = ''; // Clear the success message
            }, 5000);
          }

          console.log('Bulk save response:', response);
        },
        error: (error) => {
          this.isUploading = false;
          this.isProcessing = false;
          this.progressValue = 0; // Reset progress on error
          this.uploadError = 'Upload failed. Please try again.';

          // Check for specific server errors
          if (error.status === 400 && error.error) {
            this.uploadError = error.error.errorMessage;
            this.errors.push({ general: [this.uploadError] });
            if (error.error && error.error.validationErrors) {
              for (const [key, messages] of Object.entries(error.error.validationErrors)) {
                const typedMessages: string[] = messages as string[];
                this.errors.push({ [key]: typedMessages });
              }
            } 
          } else if (error.status === 403) {
            this.uploadError = 'Access Forbidden. You do not have permission to perform this action.';
            this.errors.push({ general: ['You are not authorized to upload this data.'] });
          } else if (error.status === 500) {
            this.uploadError = 'Server Error. Please try again later.';
            this.errors.push({ general: ['A server error occurred. Please try again.'] });
          } else if (error.status === 0) {
            // Check if the error is actually a network issue
            this.uploadError = 'Network error. Please check your connection.';
            this.errors.push({ general: ['Unable to reach the server.'] });
          } else {
            this.uploadError = 'An unexpected error occurred. Please check your connection.';
            this.errors.push({ general: ['An unexpected error occurred.'] });
          }
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
    this.uploadError = ""; // Clear the error message
    this.errors = [];
  }


  private resetFileUpload() {
    this.fileUpload.clear(); // This method clears the selected files in PrimeNG FileUpload
    this.uploadedFiles = []; // Clear the uploaded files array
  }
  
}