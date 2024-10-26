import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { addUser } from '../../model/user';
import { UserService } from '../../api/user.service';

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

  constructor(private userService: UserService) {
    this.role = [
      { name: 'Admin', code: 'ADMIN' },
      { name: 'User', code: 'USER' },
    ];
  }

//   ngOnInit(): void {
//     this.userForm = new FormGroup({
//         name: new FormControl('', [
//             Validators.required,
//             Validators.pattern('^[a-zA-Z ]+$'),
//         ]),
//         username: new FormControl('', [
//             Validators.required
//         ]),
//         password: new FormControl('', [
//             Validators.required,
//             Validators.minLength(4),
//         ]),
//         confirmPassword: new FormControl('', Validators.required),
//         role: new FormControl('', Validators.required), // Ensure role is required
//     });
// }

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

  

//   onSubmit() {
//     this.submitted = true;

//     if (this.userForm.valid) {
//         const payload: addUser = {
//             username: this.userForm.value.username,
//             name: this.userForm.value.name,
//             role: this.selectedRole[0], // Use the first selected role
//             password: this.userForm.value.password
//         };

//         console.log('Payload to create user:', payload); // Log payload for debugging

//         this.userService.createUser(payload).subscribe({
//             next: (response) => {
//                 console.log('User created:', response);
//                 this.userAddedSuccess = true; 
//                 alert(`Thank You ${this.userForm.value.name}`);
//                 this.userForm.reset();
//                 setTimeout(() => this.userAddedSuccess = false, 3000);
//             },
//             error: (error) => {
//                 console.error('Error creating user:', error);
//                 if (error.error && error.error.message) {
//                     alert(`Error creating user: ${error.error.message}`);
//                 } else {
//                     alert('There was an error creating the user.');
//                 }
//             }
//         });
//     } else {
//         console.log('Form is not valid', this.userForm.errors);
//     }
// }

onSubmit() {
  this.submitted = true;
  this.isLoading = true;

  if (this.userForm.valid) {
    const payload: addUser = {
      username: this.userForm.value.username,
      name: this.userForm.value.name,
      role: this.userForm.value.role,
      password: this.userForm.value.password
    };

    this.userService.createUser(payload).subscribe({
      next: (response) => {
        this.userAddedSuccess = true;
        this.userForm.reset();
        this.isLoading = false;
        // Show a success message using toast or another UI element
      },
      error: (error) => {
        this.isLoading = false;
        // Handle error as described above
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
