import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user/model/user';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ManageUserComponent implements OnInit {
  userForm!: FormGroup;  // Declare userForm
  users!: User[];
  isLoading: boolean = false;  // Loading state


  user: User = {};
  userDialog: boolean = false;
  submitted: boolean = false;

  selectedRole: string[] = [];
  role: any[]; 

  visible: boolean = false;

  userAddedSuccess: boolean = false;

  ingredient!: string;

  constructor(private messageService: MessageService) {
    this.role = [
      { name: 'Admin', code: 'ADMIN' },
      { name: 'User', code: 'USER' },
    ];
  }

  ngOnInit(): void {
    this.userForm = new FormGroup(
      {
          name: new FormControl('', [
              Validators.required,
              Validators.pattern('^[a-zA-Z ]+$'),
          ]),
          email: new FormControl('', [
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
          ]),
          password: new FormControl('', [
              Validators.required,
              Validators.minLength(4),
          ]),
          confirmPassword: new FormControl('', Validators.required),
          ingredient: new FormControl(''), // Add ingredient control
      },
      // { validators: this.passwordMatchValidator }
  );
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword= form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    this.submitted = true;

    // Check if the form is valid before proceeding
    if (this.userForm.valid) {
      // Handle user data
      console.log('User data:', this.userForm.value);

      // Show success notification
      this.userAddedSuccess = true; 
      alert(`Thank You ${this.userForm.value.name}`); // Success message

      this.userForm.reset(); // Reset the form

      // Hide the notification after 3 seconds
      setTimeout(() => {
        this.userAddedSuccess = false;
      }, 3000);
    } else {
      console.log('Form is not valid');
    }
  }

  // Getters for form controls
  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }
}
