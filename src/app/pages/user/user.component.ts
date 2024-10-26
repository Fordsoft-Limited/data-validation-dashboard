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
  selectedUsers!: User[];
  statuses!: SelectItem[];
  loading: boolean = true;
  clonedUsers: { [s: string]: addUser } = {}; // Update type here
  activityValues: number[] = [0, 100];
  searchValue: string = '';
  user: User = {};
  
  visible: boolean = false;
  userAddedSuccess: boolean = false;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
      private userService: UserService,
      private messageService: MessageService
  ) {}

  ngOnInit(): void {
      // Load users data
      this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true; // Set loading to true while fetching data
    this.userService.getUserList().subscribe(
        (data: addUser[]) => {
            this.users = data; // Assign fetched users to the users array
            this.loading = false; // Set loading to false after fetching
        },
        (error) => {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to load users.',
            });
            this.loading = false; // Set loading to false on error
        }
    );
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
