import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-bulk-customer-validation',
  templateUrl: './bulk-customer-validation.component.html',
  styleUrls: ['./bulk-customer-validation.component.scss'],
  providers: [MessageService]
})
export class BulkCustomerValidationComponent implements OnInit {
  uploadedFiles: any[] = [];
  messages: Message[] = [];  // Ensure `messages` is initialized as an empty array

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    // Optional: initialize with a sample message
    this.messages = [{ severity: 'error', detail: 'Error during bulk validation upload' }];
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push({
        name: file.name,
        size: file.size
      });
    }

    // Add a success message to the `p-messages` component
    this.messages = [
      ...this.messages, 
      { severity: 'info', summary: 'File Uploaded', detail: 'All files uploaded successfully.' }
    ];

    // Optionally add a message using the MessageService (if `enableService` is set to true for p-messages)
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: 'All files uploaded successfully.' });
  }


  showErrorViaMessages() {
    this.messages = [];
    this.messages.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
}
}
