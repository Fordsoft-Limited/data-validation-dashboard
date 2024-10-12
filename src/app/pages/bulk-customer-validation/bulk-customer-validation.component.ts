import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';

interface Customer {
  email?: string;
  status?: string;
  errorReason?: string;
}

@Component({
  selector: 'app-bulk-customer-validation',
  templateUrl: './bulk-customer-validation.component.html',
  styleUrls: ['./bulk-customer-validation.component.scss'],
  providers: [MessageService]
})
export class BulkCustomerValidationComponent implements OnInit {
  uploadedFiles: any[] = [];
  messages: any[] = []; // Messages for notifications
  customers: Customer[] = [];
  uploadError: string | null = null; // For storing upload errors
  uploadSuccess: string | null = null; // For storing upload success messages
  isProcessing: boolean = false;
  progressValue: number = 0;

  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  handleUpload(event: any) {
    console.log('Upload event:', event); // Log the upload event

    this.uploadedFiles = event.files; // Store uploaded files
    const file = event.files[0];

    if (!file) {
      this.addMessage('error', 'No file selected. Please upload a file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      this.customers = XLSX.utils.sheet_to_json(worksheet);
      this.validateData(this.customers);
      this.uploadSuccess = 'File uploaded and validated successfully!'; // Set success message
      this.addMessage('success', this.uploadSuccess); // Add to messages
    };

    reader.onerror = () => {
      this.uploadError = 'Error reading file. Please try again.'; // Set error message
      this.addMessage('error', this.uploadError); // Add to messages
    };

    reader.readAsArrayBuffer(file);
  }

  validateData(data: Customer[]) {
    this.isProcessing = true;
    this.progressValue = 0;
    const totalRecords = data.length;
    let validCount = 0;
    let invalidCount = 0;
  
    data.forEach((customer: Customer, index: number) => {
      // Validate the customer data
      customer.status = customer.email ? 'Valid' : 'Invalid';
      customer.errorReason = customer.email ? '' : 'Missing email address';
  
      if (customer.status === 'Invalid') {
        invalidCount++;
      } else {
        validCount++;
      }
  
      // Update progress bar
      this.progressValue = ((index + 1) / totalRecords) * 100;
      this.addMessage('info', `Validating record ${index + 1} of ${totalRecords}`);
    });
  
    this.isProcessing = false;
  
    // Summary report
    const summaryMessage = `Validation complete. ${validCount} valid records, ${invalidCount} invalid records.`;
    this.addMessage('success', summaryMessage);
  
    if (invalidCount > 0) {
      this.uploadError = 'Some records are invalid. Check details in the table.';
      this.addMessage('error', this.uploadError);
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
