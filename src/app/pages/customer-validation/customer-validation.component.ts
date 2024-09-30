import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-customer-validation',
  templateUrl: './customer-validation.component.html',
  styleUrls: ['./customer-validation.component.scss'], // Fixed typo here from styleUrl to styleUrls
  providers: [MessageService]
})
export class CustomerValidationComponent {

  batches = [
    { batchCode: 'BATCH001', startDate: new Date('2024-09-15'), endDate: null, status: 'Pending', uploadedBy: 'Admin' },
    { batchCode: 'BATCH002', startDate: new Date('2024-09-16'), endDate: new Date('2024-09-17'), status: 'Completed', uploadedBy: 'Reviewer' },
    // More sample data...
  ];
  @ViewChild('dt') dt!: Table; // Add this line to define dt


  uploading: boolean = false;

  constructor(private messageService: MessageService) {}

  exportData() {
    // Logic to export the table data as CSV or Excel
    console.log('Exporting batch data...');
    // Implement your export logic here
    this.messageService.add({ severity: 'info', summary: 'Exporting', detail: 'Exporting batch data as CSV/Excel...' });
  }

  onFileSelect(event: any) {
    // Handle file selection
    console.log('Selected file:', event.files[0]);
    this.messageService.add({ severity: 'info', summary: 'File Selected', detail: event.files[0].name });
  }

  onUpload(event: any) {
    this.uploading = true;
    // Simulate file upload and real-time validation feedback
    setTimeout(() => {
      this.uploading = false;

      // Simulate real-time feedback for batch upload
      this.showSuccess('Batch uploaded successfully.');
      // Here you would typically call your backend API to upload and validate the data

      // Simulating additional feedback messages
      this.showSuccess('Record 1 successfully validated.');
      this.showError('Row 5: Invalid Customer ID.');
    }, 3000);
  }

  // Real-time feedback for each validation
  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
