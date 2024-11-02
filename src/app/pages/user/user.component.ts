import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { User } from './model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { UserService } from '../../api/user.service';
import { addUser } from '../../model/user';
import { AuthService } from '../../auth/service/auth.service';

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

  fetchError: string = ''; // For error messages

  visible: boolean = false;
  userAddedSuccess: boolean = false;

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



loadUsers(page:number,pageSize:number) {
  const token = this.authService.getToken();
  console.log(token);
if (!token) {
  this.loading = false;
  this.hasErrors = true;
  this.errorMessage = 'No authentication token found. Please log in again.';
  setTimeout(() => {
    this.userAddedError = false;
  }, 3000);
  return; // Exit the function early
}
  this.loading = true;
  this.userService.getUserList(page,pageSize,token).subscribe(
    (response) => {
      this.loading = false;
      if (response && response.data && response.data.results) {
        this.users = response.data.results;
        this.totalRecords = response.data.count; 
      } else {
        this.users = []; 
        this.messageService.add({ severity: 'info', summary: 'No Data', detail: 'No batches found.' });
      }
    },
    (error) => {
      this.loading = false;
      console.error('Error fetching batches:', error); // Log the error
      this.users = []; // Clear batches on error
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load batches.' });
    }
  );
}
onPageChange(event:any){
  this.currentPage = event.page + 1;
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


  getSeverity(status: string | undefined): 'success' | 'info' | 'warning' | 'danger' | null | undefined {
      if (!status) {
          return undefined;
      }

      switch (status.toUpperCase()) {
          case 'ENABLE':
              return 'success';
          case 'DISABLE':
              return 'danger';
          default:
              return undefined;
      }
  }
}
