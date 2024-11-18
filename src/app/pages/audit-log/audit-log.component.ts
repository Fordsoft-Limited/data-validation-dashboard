import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { User } from './model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { UserService } from '../../api/user.service';
import { addUser } from '../../model/user';
import { AuthService } from '../../auth/service/auth.service';
import { CustomerService } from '../../api/customer.service';

export interface PostedBy {
  username: string;
  uid: string;
  name: string;
  
}

export interface AuditLog {
  event_uid: string;
  description: string;
  category: string;
  status: string;
  posted_by: PostedBy;
  event_date: string; 
}

@Component({
  selector: 'app-audit-log',
  providers: [MessageService, ConfirmationService],
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss']
})
export class AuditLogComponent implements OnInit {
  value: string | undefined;
  
  users: AuditLog[] = []; // Now typing 'users' as AuditLog[]
  selectedUsers: AuditLog[] = [];
  pageSize: number = 100; // Default number of rows per page
  totalRecords: number = 0; // Total records for pagination
  currentPage: number = 1;
  loading: boolean = false;
  errorMessage: string = '';
  hasErrors: boolean = false;
  userAddedError: boolean = false;


  constructor(
      private userService: UserService,
      private messageService: MessageService,
      private authService: AuthService,
      private customerService: CustomerService
  ) {}

  ngOnInit(): void {
      // Load users data
      this.loadAuditLog(this.currentPage,this.pageSize);
  }



  

  loadAuditLog(page: number, pageSize: number): void {
    const token = this.authService.getToken(); // Retrieve the token from the auth service
    if (!token) {
      this.loading = false;
      this.hasErrors = true;
      this.errorMessage = 'No authentication token found. Please log in again.';
      setTimeout(() => {
        this.userAddedError = false;
      }, 3000);
      return; // Exit the function early if no token
    }

    this.loading = true;
    this.customerService.getAuditLog(page, pageSize, token).subscribe(
      (response) => {
        this.loading = false;
        if (response && response.data && response.data.results) {
          // Use 'log' with the correct 'AuditLog' type
          this.users = response.data.results.map((log: AuditLog) => ({
            name: log.posted_by?.name || 'Unknown', // Using posted_by.name
            description: log.description || 'No description available', // Using description
            category: log.category || 'No category available', // Using category
            status: log.status || 'Unknown', // Using posted_by.name
            event_date: log.event_date ? new Date(log.event_date) : null,

          }));
          this.totalRecords = response.data.count; // Total records for pagination
        } else {
          this.users = []; // Empty array if no results found
          this.messageService.add({ severity: 'info', summary: 'No Data', detail: 'No logs found.' });
        }
      },
      (error) => {
        this.loading = false;
        this.users = []; // Clear users in case of error
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load audit logs.' });
      }
    );
  }

  // Pagination handler: when the user changes page in the table
  onPageChange(event: any): void {
    this.currentPage = event.page + 1; // API is 1-indexed, so add 1
    this.pageSize = event.rows;
    this.loadAuditLog(this.currentPage, this.pageSize); // Fetch new data based on the new page
  }


  // Pagination handler: when the user changes page in the table

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal(
          (event.target as HTMLInputElement).value,
          'contains'
      );
  }


  // Show success message
  showSuccessMessage(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  // Show error message
  showErrorMessage(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


 

}
