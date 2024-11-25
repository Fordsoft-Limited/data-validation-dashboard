import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { User } from './model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { UserService } from '../../api/user.service';
import { addUser } from '../../model/user';
import { AuthService } from '../../auth/service/auth.service';
import { CustomerService } from '../../api/customer.service';
import { DatePipe } from '@angular/common';

export interface PostedBy {
  username: string;
  uid: string;
  name: string;

}

export interface AuditLog {
  username: string;
  event_uid: string;
  description: string;
  category: string;
  status: string;
  posted_by: PostedBy;
  event_date: string;
}

@Component({
  selector: 'app-audit-log',
  providers: [MessageService, ConfirmationService, DatePipe],
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

  usernames: any[] = [];
  categories: any[] = [];

  tempusername!: string;
  tempCategory!: string;
  tempDateFrom!: string;
  tempDateTo!: string;

  username = '';
  category = '';
  dateFrom: string | null = null;
  dateTo: string | null = null;
  datePipe: any;
  filteredUsers: any[] = [];


  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private authService: AuthService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    // Load users data
    this.loadAuditLog(this.currentPage, this.pageSize);
  }



  loadAuditLog(page: number, pageSize: number): void {

    this.loading = true;
    this.customerService.getAuditLog(page, pageSize).subscribe(
      (response) => {
        this.loading = false;
        if (response && response.data && response.data.results) {
          this.users = response.data.results.map((log: AuditLog) => ({
            name: log.posted_by?.name || 'Unknown',
            description: log.description || 'No description available',
            category: log.category || 'No category available',
            status: log.status || 'Unknown',
            event_date: log.event_date ? new Date(log.event_date) : null,
          }));
          this.filteredUsers = response.data || [];

          this.categories = Array.from(
            new Set(this.users.map((user: any) => user.category))
          ).map((category) => ({ name: category, value: category }));

          this.usernames = Array.from(
            new Set(this.users.map((user: any) => user.posted_by?.username))
          ).map((username) => ({ name: username, value: username }));

          this.totalRecords = response.data.count;

        } else {
          this.users = [];
          this.messageService.add({ severity: 'info', summary: 'No Data', detail: 'No logs found.' });
        }
      },
      (error) => {
        this.loading = false;
        this.users = [];
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load audit logs.' });
      }
    );
  }


  getFilterUser(): void {
    const payload = {
      username: this.username || '',
      category: this.category || '',
      dateFrom: this.datePipe.transform(this.dateFrom, 'yyyy-MM-dd') || '',
      dateCreatedTo: this.datePipe.transform(this.dateTo, 'yyyy-MM-dd') || '',
    };

    console.log('Filter Payload:', payload);

    this.loading = true;
    this.customerService.getAuditLogFilter(payload,).subscribe(
      (response) => {
        if (response.code === 200 && response.status === 'Success') {
          this.filteredUsers = response.data || [];
          console.log('Filtered Data:', this.filteredUsers);
        } else {
          this.filteredUsers = [];
          console.warn('Unexpected response:', response);
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error filtering customers:', error);
        this.errorMessage = 'Failed to apply filters. Please try again later.';
        this.filteredUsers = [];
        this.loading = false;
      }
    );
  }


  onFilterButtonClick(): void {
    this.filteredUsers = this.users.filter((user) => {
      const matchesUsername = !this.tempusername || user.username === this.tempusername;
      const matchesCategory = !this.tempCategory || user.category === this.tempCategory;
      // const matchesDateFrom = !this.tempDateFrom || new Date(user.dateFrom) >= new Date(this.tempDateFrom);
      // const matchesDateTo = !this.tempDateTo || new Date(user.dateTo) <= new Date(this.tempDateTo);

      return (
        matchesUsername &&
        matchesCategory
        // matchesDateFrom &&
        // matchesDateTo
      );
    });
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
