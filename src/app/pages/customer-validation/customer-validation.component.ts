import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-customer-validation',
  templateUrl: './customer-validation.component.html',
  styleUrls: ['./customer-validation.component.scss'],
  providers: [MessageService]
})
export class CustomerValidationComponent {
  uploadedFiles: any[] = [];
  searchValue: string = ''; // Initialize searchValue
  loading:boolean = false;

  @ViewChild('filter') filter!: ElementRef;


  batches = [
    { batchCode: 'BATCH001', startDate: new Date(), endDate: null, status: 'Pending', uploadedBy: 'Admin',fileName: "example.jpg", fileSize: "512 Bytes" },
    { batchCode: 'BATCH002', startDate: new Date(), endDate: new Date(), status: 'Completed', uploadedBy: 'Reviewer', fileName: "video.mp4", fileSize: "2.5 GB" },
    // More sample data...
  ];

  uploading: boolean = false;
  hasErrors: boolean = false; // To track if there are any errors
  errorLogs: string[] = []; // Array to store error logs

  constructor(private messageService: MessageService) {}



  
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
        (event.target as HTMLInputElement).value,
        'contains'
    );
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
}
