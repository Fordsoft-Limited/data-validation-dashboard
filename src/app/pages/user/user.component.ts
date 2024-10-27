import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { User } from './model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { UserService } from '../../api/user.service';
import { addUser } from '../../model/user';

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
  clonedUsers: { [s: string]: addUser } = {}; // Update type here
  activityValues: number[] = [0, 100];
  searchValue: string = '';
  currentPage: number = 1;
  pageSize : number = 10;
  totalRecords : number = 0
  user: addUser = new addUser(); 

  fetchError: string = ''; // For error messages

  visible: boolean = false;
  userAddedSuccess: boolean = false;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
      private userService: UserService,
      private messageService: MessageService
  ) {}

  ngOnInit(): void {
      // Load users data
      this.loadUsers(this.currentPage,this.pageSize);
      // this.fetchUsers();
  }


  // fetchUsers(): void {
  //   this.userService.getUserList().subscribe(
  //     (data) => {
  //       this.users = data;
  //       this.loading = false;
  //     },
  //     (error) => {
  //       this.fetchError = 'Error fetching users: ' + error.message;
  //       this.loading = false;
  //     }
  //   );
  // }

//   loadUsers(): void {
//     this.loading = true; // Set loading to true while fetching data
//     this.userService.getUserList().subscribe(
//         (data: addUser[]) => {
//             this.users = data; // Assign fetched users to the users array
//             this.loading = false; // Set loading to false after fetching
//         },
//         (error) => {
//             this.messageService.add({
//                 severity: 'error',
//                 summary: 'Error',
//                 detail: 'Failed to load users.',
//             });
//             this.loading = false; // Set loading to false on error
//         }
//     );
// }


loadUsers(page:number,pageSize:number) {
  this.loading = true;
  this.userService.getUserList(page,pageSize).subscribe(
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

//   onRowEditInit(user: addUser) { // Change type to addUser
//       this.clonedUsers[user.id as string] = { ...user };
//   }

//   onRowEditSave(user: addUser) { // Change type to addUser
//       if (user.name) {
//           delete this.clonedUsers[user.id as string];
//           this.messageService.add({
//               severity: 'success',
//               summary: 'Success',
//               detail: 'User is updated',
//           });
//       } else {
//           this.messageService.add({
//               severity: 'error',
//               summary: 'Error',
//               detail: 'Invalid Name',
//           });
//       }
//   }

//   onRowEditCancel(user: addUser, index: number) { // Change type to addUser
//       this.users[index] = this.clonedUsers[user.id as string];
//       delete this.clonedUsers[user.id as string];
//   }

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
