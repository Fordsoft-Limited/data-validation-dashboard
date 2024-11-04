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


  getSeverity(role: string) {
    switch (role) {
        case 'ADMIN':
            return 'success';
        case 'USER':
            return 'info'; // Use info for User
        case 'APPROVAL':
            return 'warning'; // Use warning for Approval
        default:
            return 'danger'; // Default for any unexpected roles
    }
}



getSeverityStatus(status: string) {
  switch (status) {
      case 'ACTIVE':
          return 'success';
      case 'INACTIVE': // Assuming this is what you meant for the empty case
          return 'info'; 
      case 'NOT_ACTIVE':
          return 'warning';
      default:
          return 'danger'; // Default for any unexpected statuses
      
  }
}


onRowEditInit(user: any) {
  // Set all users' editing state to false
  for (const key in this.users) {
      if (this.users[key]) {
          this.users[key].editing = false;
      }
  }
  
  this.clonedUsers[user.id as string] = { ...user };
  user.editing = true; // Set editing state for this specific user
}

onRowEditSave(user: any) {
    // Allow updating any of the fields optionally
    if (user.name || user.username || user.role) {
        delete this.clonedUsers[user.id as string];
        user.editing = false; // Reset editing state on save
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully.' });
    } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'At least one field must be filled out.' });
    }
}

onRowEditCancel(user: any) {
    if (this.clonedUsers[user.id as string]) {
        Object.assign(user, this.clonedUsers[user.id as string]); // Restore original values
        delete this.clonedUsers[user.id as string];
    }
    user.editing = false; // Reset editing state on cancel
}
}
