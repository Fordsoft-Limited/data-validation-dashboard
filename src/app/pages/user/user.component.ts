import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem  } from 'primeng/api';
import { UserService } from './service/user.service';
import { User } from './model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-user',
  providers: [MessageService, ConfirmationService],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']  // Fixed property name (styleUrls instead of styleUrl)
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;  // Declare userForm
  users!: User[];
  selectedUsers!: User[];
  statuses!: SelectItem[];
  loading: boolean = true;
  clonedUsers: { [s: string]: User } = {};
  activityValues: number[] = [0, 100];
  searchValue: string = ''; // Initialize searchValue
  user: User = {};
  userDialog: boolean = false;
  submitted: boolean = false;
  deleteUserDialog: boolean = false;
  deleteUsersDialog: boolean = false;
  selectedRole: string[] = [];
  role: any[];
  ingredient!: string;

  visible: boolean = false;

  userAddedSuccess: boolean = false;


  @ViewChild('filter') filter!: ElementRef;

  constructor(
      private userService: UserService,
      private messageService: MessageService
  ) {
      this.role = [
          { name: 'Admin', code: 'ADMIN' },
          { name: 'User', code: 'USER' },
      ];
  }

  ngOnInit(): void {
      // Initialize userForm with passwordMatchValidator
      this.userForm = new FormGroup({
          name: new FormControl('', [
              Validators.required, Validators.pattern('^[a-zA-Z ]+$'),  ]),
          role: new FormControl([], [Validators.required]),
          email: new FormControl('', [ Validators.required, Validators.pattern(
                  '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
              ),]),
          password: new FormControl('', [ Validators.required,Validators.minLength(4),]),
          cfPassword: new FormControl('', Validators.required), // Rename to match the validator
          inventoryStatus: new FormControl(''),
          date: new FormControl(''),
      }); // Add validator here

      // Load users data
      this.userService.getUsersMini().then((data) => {
          this.users = data;
          this.loading = false;
      });

      // Set the statuses
      this.statuses = [
          { label: 'Enable', value: 'ENABLE' },
          { label: 'Disable', value: 'DISABLE' },
      ];
  }

  // Custom validator function to check if passwords match
  passwordMatchValidator(form: FormGroup) {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;
    
      return password === confirmPassword ? null : { passwordMismatch: true };
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

  onRowEditInit(user: User) {
      this.clonedUsers[user.id as string] = { ...user };
  }

  onRowEditSave(user: User) {
      if (user.name) {
          delete this.clonedUsers[user.id as string];
          this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User is updated',
          });
      } else {
          this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Invalid Name',
          });
      }
  }

  onRowEditCancel(user: User, index: number) {
      this.users[index] = this.clonedUsers[user.id as string];
      delete this.clonedUsers[user.id as string];
  }

  getSeverity(status: string | undefined): 'success' | 'info' | 'warning' | 'danger' | null | undefined {
      if (!status) {
          return undefined; // Or return null based on your preference
      }
  
      switch (status.toUpperCase()) {
          case 'ENABLE':
              return 'success';  // Green badge for "ENABLE"
          case 'DISABLE':
              return 'danger';   // Red badge for "DISABLE"
          default:
              return undefined;  // Default case for other statuses
      }
  }

  openNew() {
      this.user = {};
      this.submitted = false;
      this.userDialog = true;
  }

  hideDialog() {
      this.userDialog = false;
      this.submitted = false;
  }

  addUser() {
      this.submitted = true;
  
      // Check if the form is valid before proceeding
      if (this.userForm.valid) {
          // Handle product save logic here (assuming user data is bound to the form)
          this.users = [...this.users]; // Update the users array
  
          // Show success notification
          this.userAddedSuccess = true; 
          alert(`Thank You ${this.userForm.value.name}`); // Success message (optional)
  
          // Close the dialog and reset the form after submission
          this.userDialog = false;
          this.userForm.reset(); // Reset the form
          
          // Hide the notification after 3 seconds
          setTimeout(() => {
              this.userAddedSuccess = false;
          }, 3000);
      } else {
          // You can add additional logic to handle invalid form submission if needed
          console.log('Form is not valid');
      }
  }
  

  get name() {
      return this.userForm.get('name');
  }
  get email() {
      return this.userForm.get('email');
  }
  get password() {
      return this.userForm.get('password');
  }
  get cfPassword() {
      return this.userForm.get('cfPassword');
  }
 
}
