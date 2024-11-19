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

// // Inside your component class
// toggleUserStatus(user: any) {
//   const token = this.authService.getToken();
//   if (!token) {
//     this.loading = false;
//     this.hasErrors = true;
//     this.errorMessage = 'No authentication token found. Please log in again.';
//     return;
//   }

//   this.loading = true;

//   // Ensure 'uid' is available before making the request
//   if (!user.uid) {
//     console.error('User UID is missing');
//     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User UID is missing.' });
//     return;
//   }

//   console.log('Before toggle: ', user.is_active);  // Log the current value of user.is_active
//   const newStatus = !user.is_active;  // Toggle the current 'is_active' value
//   console.log('Toggled status: ', newStatus);  // Log the new status after toggling

//   // Log the status that will be sent to the backend (debugging)
//   console.log(`Toggling user status: ${user.is_active} -> ${newStatus}`);
//   console.log(`Toggling user status: ${!user.is_active} -> ${newStatus}`);
//   // Disable the switch UI temporarily until we get the response from the backend
//   user.is_active = newStatus; // Optimistic UI update
//   this.messageService.add({
//     severity: 'info',
//     summary: 'Updating status',
//     detail: 'Please wait while we update the user status.'
//   });

//   // Call the service to update the user status
//   this.userService.updateUserStatus(user.uid,newStatus, token).subscribe(
//     (response) => {
//       this.loading = false;
//       if (response && response.code === 200 && response.status === 'Success') {
//         // Log the response from the backend (debugging)
//         console.log('Backend response:', response);

//         // Use the message from the backend response directly
//         const statusMessage = response.data; // "User 'james' has been enabled." or "User 'james' has been disabled."
        
//         // Show the success message from the backend response
//         this.messageService.add({
//           severity: 'success',
//           summary: 'Success',
//           detail: statusMessage // Display the backend message like "User 'james' has been enabled."
//         });
//        // user.is_active = newStatus;
//       } else {
//         // Revert status if something went wrong
//         user.is_active = !newStatus;
//         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update user status.' });
//       }
//     },
//     (error) => {
//       this.loading = false;
//       user.is_active = !newStatus; // Revert status in case of error
//       console.error('Error updating user status:', error);
//       const errorMessage = error.error ? error.error.message : 'Failed to update user status. Please try again.';
//       this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
//     }
//   );
// }


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
  // The toggled value comes from the 'event' object
  const newStatus = event.checked; // Get the toggled value from the event (true or false)
  
  // Debugging: Log the initial state and the toggled value
  console.log('Before toggle: ', currentStatus); // Log the value before the toggle
  console.log('Toggled status: ', newStatus); // Log the new toggled value

  // Optimistically update UI
  user.is_active = newStatus; 

  this.messageService.add({
    severity: 'info',
    summary: 'Updating status',
    detail: 'Please wait while we update the user status.'
  });

  // Call the update service with the new toggled value
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
        user.is_active = !newStatus; // Revert status if something went wrong
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update user status.'
        });
      }
    },
    (error) => {
      this.loading = false;
      user.is_active = !newStatus;  // Revert status in case of error
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


