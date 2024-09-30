import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-customer-validation',
  templateUrl: './customer-validation.component.html',
  styleUrls: ['./customer-validation.component.scss'],
  providers: [MessageService]
})
export class CustomerValidationComponent {

  batches = [
    { batchCode: 'BATCH001', startDate: new Date(), endDate: null, status: 'Pending', uploadedBy: 'Admin' },
    { batchCode: 'BATCH002', startDate: new Date(), endDate: new Date(), status: 'Completed', uploadedBy: 'Reviewer' },
    // More sample data...
  ];

  uploading: boolean = false;
  hasErrors: boolean = false; // To track if there are any errors

  constructor(private messageService: MessageService) {}

  exportData() {
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
  }

  convertToCSV(batches: any[]): string {
    const header = 'Batch Code,Start Date,End Date,Status,Uploaded By\n';
    const rows = batches.map(batch =>
      `${batch.batchCode},${batch.startDate.toISOString()},${batch.endDate ? batch.endDate.toISOString() : ''},${batch.status},${batch.uploadedBy}`
    ).join('\n');

    return header + rows;
  }

  onFileSelect(event: any) {
    console.log('Selected file:', event.files[0]);
    this.hasErrors = false; // Reset error state when a new file is selected
  }

  onUpload() {
    if (this.uploading) {
      this.messageService.add({ severity: 'warn', summary: 'Upload in Progress', detail: 'Please wait for the current upload to finish.' });
      return;
    }

    // Simulate the upload process
    this.uploading = true;

    // Here, you would typically handle your actual file upload logic
    setTimeout(() => {
      this.uploading = false;

      // Simulate a response from backend (for demo purposes)
      const success = Math.random() > 0.5; // Randomly determine success or failure

      if (success) {
        this.messageService.add({ severity: 'success', summary: 'Batch Uploaded', detail: 'Upload completed successfully.' });
        this.batches.push({
          batchCode: `BATCH${this.batches.length + 1}`,
          startDate: new Date(),
          endDate: null,
          status: 'Pending',
          uploadedBy: 'User'
        });
        this.hasErrors = false; // No errors on successful upload
      } else {
        this.messageService.add({ severity: 'error', summary: 'Upload Failed', detail: 'Validation issues detected. Please check the logs.' });
        this.hasErrors = true; // Set error state if there are validation issues
      }
    }, 3000);
  }

  downloadErrorLogs() {
    // Logic to download error logs
    const errorLog = 'Row,Error\n5,Invalid Customer ID\n10,Missing required field';
    const blob = new Blob([errorLog], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'error_logs.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
