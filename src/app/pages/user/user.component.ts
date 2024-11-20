import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { User } from './model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { UserService } from '../../api/user.service';
import { addUser } from '../../model/user';
import { AuthService } from '../../auth/service/auth.service';
import { Logout } from '../../model/user';
@Component({
  selector: 'app-user',
  providers: [MessageService, ConfirmationService],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  users!: addUser[];
  selectedUsers!: addUser[];
  statuses!: SelectItem[];
  loading: boolean = true;
  hasErrors : boolean = false
  clonedUsers: { [s: string]: addUser } = {}; // Update type here
  activityValues: number[] = [0, 100];
  searchValue: string = '';
  currentPage: number = 1;
  userAddedError: boolean = false;
  errorMessage: string = "";
  pageSize : number = 10;
  totalRecords : number = 0
  user: addUser = new addUser(); 
  checked: boolean = true;
  fetchError: string = ''; // For error messages

  visible: boolean = false;
  userAddedSuccess: boolean = false;

  totalUserCount: number = 0;
  @ViewChild('filter') filter!: ElementRef;

  constructor(
      private userService: UserService,
      private messageService: MessageService,
      private authService: AuthService
  ) {}

  ngOnInit(): void {
      // Load users data
      this.loadUsers(this.currentPage,this.pageSize);
      // this.fetchUsers();

      
     
  }

  loadUsers(page: number, pageSize: number) {
    const token = this.authService.getToken();
    if (!token) {
      this.loading = false;
      this.hasErrors = true;
      this.errorMessage = 'No authentication token found. Please log in again.';
      return;
    }
  
    this.loading = true;
  
    this.userService.getUserList(page, pageSize, token).subscribe(
      (response) => {
        this.loading = false;
        if (response && response.data && response.data.results) {
          this.users = response.data.results.map((user: any) => {
            const isActive = user.status === 'Active'; 
            console.log('Mapped is_active:', isActive); 
            return {
              ...user,
              is_active: isActive,
            };
          });
  
          this.totalRecords = response.data.count;
        } else {
          this.users = [];
          this.messageService.add({ severity: 'info', summary: 'No Data', detail: 'No users found.' });
        }
      },
      (error) => {
        this.loading = false;
        this.users = [];
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load users.' });
      }
    );
  }
  
  
onPageChange(event:any){
  this.currentPage = event.page + 1;
  this.pageSize = event.rows;
  this.loadUsers(this.currentPage,this.pageSize);
}
  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal(
          (event.target as HTMLInputElement).value,
          'contains'
      );
  }

  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }


  getSeverity(role: string) {
    switch (role) {
        case 'ADMIN':
            return 'success';
        case 'USER':
            return 'info'; // Use info for User
        case 'APPROVAL':
            return 'warning'; // Use warning for Approval
       case 'REVIEWER':
            return 'contrast'; // Use warning for Approval
        default:
            return 'danger'; // Default for any unexpected roles
    }
}



getSeverityStatus(status: string) {
  switch (status) {
      case 'Active':
          return 'info'; //
      case 'Inactive': // Assuming this is what you meant for the empty case
          return 'warning'; 
      default:
          return 'danger'; // Default for any unexpected statuses
      
  }
}


toggleUserStatus(user: any, event: any) {
  const token = this.authService.getToken();
  if (!token) {
    this.loading = false;
    this.hasErrors = true;
    this.errorMessage = 'No authentication token found. Please log in again.';
    return;
  }

  this.loading = true;
  const currentStatus = user.is_active;
  const newStatus = event.checked; 
  
  user.is_active = newStatus; 

  this.userService.updateUserStatus(user.uid, newStatus, token).subscribe(
    (response) => {
      this.loading = false;
      if (response.code === 200 && response.status === 'Success') {
        const statusMessage = response.data;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: statusMessage
        });
        this.loadUsers(1, this.pageSize);
      } else {
        user.is_active = !newStatus; 
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update user status.'
        });
      }
    },
    (error) => {
      this.loading = false;
      user.is_active = !newStatus; 
      const errorMessage = error.error ? error.error.message : 'Failed to update user status. Please try again.';
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage
      });
    }
  );
}





}


