import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { addUser } from '../../model/user';
import { Router } from '@angular/router';
import { UserService } from '../../api/user.service';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ManageUserComponent implements OnInit {
  userForm!: FormGroup;  
  users!: addUser[];
  isLoading: boolean = false;  

  user: addUser = new addUser(); 
  userDialog: boolean = false;
  submitted: boolean = false;

  selectedRole: string[] = [];
  role: any[]; 

  visible: boolean = false;

  userAddedSuccess: boolean = false;
  userAddedError: boolean = false;  // New property to show error message
  successMessage: string = '';      // Success message text
  errorMessage: string = '';   

  constructor(private userService: UserService, private authService: AuthService, private router: Router,) {
    this.role = [
      { name: 'Admin', code: 'ADMIN' },
      { name: 'User', code: 'USER' },
      { name: 'APPROVAl', code: 'APPROVAl' },
    ];
  }

passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}
ngOnInit(): void {
  this.userForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    confirmPassword: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });
}

  

onSubmit() {
  this.submitted = true;
    this.isLoading = true;
    this.userAddedSuccess = false;
    this.userAddedError = false;

  if (this.userForm.valid) {
    const payload: addUser = {
      username: this.userForm.value.username,
      name: this.userForm.value.name,
      role: this.userForm.value.role,
      password: this.userForm.value.password
    };
    const token = this.authService.getToken();
    console.log(token);
  if (!token) {
    this.isLoading = false;
    this.userAddedError = true;
    this.errorMessage = 'No authentication token found. Please log in again.';
    setTimeout(() => {
      this.userAddedError = false;
    }, 3000);
    return; 
  }
    this.userService.createUser(payload,token).subscribe({
      next: (response) => {
        this.userAddedSuccess = true;
        this.successMessage = 'Success! Your account has been successfully created!';
        this.userForm.reset();
        this.isLoading = false;
        this.router.navigate(['/user-management']);
        setTimeout(() => {
          this.userAddedSuccess = false;
        }, 3000);
        
      },
      error: (error) => {
        this.isLoading = false;
        this.userAddedError = true;
        this.errorMessage = error.status === 401 
          ? 'You are not authenticated to create a user.' 
          : 'There was an error creating the user.';

          setTimeout(() => {
            this.userAddedError = false;
          }, 3000);
      }
    });
  } else {
    this.isLoading = false;
    console.log('Form is not valid', this.userForm.errors);
  }
}


  // Getters for form controls
  get name() {
    return this.userForm.get('name');
  }

  get username() {
    return this.userForm.get('username'); // Corrected to 'username'
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }
}
