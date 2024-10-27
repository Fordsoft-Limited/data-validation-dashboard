import { Component } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { LoginModel } from '../model/loginModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntranceService } from '../../api/entrance.service';
import { entranceLogin } from '../../model/user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  loginForm!: FormGroup;
  loginModel!: entranceLogin[];
  loginSuccess: boolean = false;
  loginError: boolean = false;
  rememberMe: boolean = false;
  errorMessage: string = '';
  // rememberMe: boolean = false;
  isLoading: boolean = false;  // Loading state

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private snackbarService: SnackbarService,
    private entranceService:EntranceService,
    private authService: AuthService
  ) {}

  get dark(): boolean {
    return this.layoutService.config().colorScheme !== 'light';
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('',  [Validators.required, Validators.minLength(4)])
    });

  } 


//   onSubmit() {
//     this.isLoading = true;  // Start the loading spinner
  
//     // Reset the messages
//     this.loginSuccess = false;
//     this.loginError = false;
  
//     const username = this.loginForm.get('username')?.value;
//     const password = this.loginForm.get('password')?.value;
  
//     // Check if username or password is missing
//     if (!username) {
//         this.errorMessage = 'The email/username field must not be left empty.';
//         this.loginError = true; // Show error notification
//         this.autoDismissError();
//         this.isLoading = false;  // Stop the loading spinner
//     } else if (!password) {
//         this.errorMessage = 'The password field must not be left empty.';
//         this.loginError = true; // Show error notification
//         this.autoDismissError();
//         this.isLoading = false;  // Stop the loading spinner
//     } else {
//         // Call the backend login API using the service
//         const loginPayload = { username, password };  // Create payload

//         this.entranceService.entranceLogin(loginPayload).subscribe({
//             next: (response) => {
//                 this.isLoading = false;  // Stop the loading spinner
//                 this.loginSuccess = true; // Show success notification
//                 this.autoDismissSuccess();
//                 const token = response.data.access_token;// Make sure this path is correct
//                 console.log('Received token:', token); // Debug log
            
//                 this.authService.setToken(token); // Save the token
//                 this.router.navigate(['/app']);  // Navigate after successful login
//             },
//             error: (error) => {
//                 this.isLoading = false;  // Stop the loading spinner
//                 this.errorMessage = 'Invalid credentials, please try again.';
//                 this.loginError = true; // Show error notification
//                 this.autoDismissError();
//             }
//         });
//     }
// }

onSubmit() {
    this.isLoading = true;
  
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
  
    if (!username || !password) {
      this.errorMessage = 'Both username and password are required.';
      this.loginError = true;
      this.isLoading = false;
      return;
    }
  
    const loginPayload = { username, password };
  
    //const encryptedPayload = this.authService.encryptPayload(loginPayload);
    const encryptedPayload = this.authService.encryptPayload(loginPayload);

   
    // Send the login request to the API
    this.entranceService.entranceLogin(loginPayload).subscribe({
      next: (response) => {
        this.isLoading = false;
        const token = response.data?.access_token;
        console.log('Received token:', token);
  
        if (token) {
          this.authService.setToken(token);           // Encrypt and store token
          this.authService.setLoginData(username, password); // Encrypt and store login data
          this.router.navigate(['/app']);             // Redirect to dashboard
        } else {
          this.errorMessage = 'Login failed. Please try again.';
          this.loginError = true;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Invalid credentials, please try again.';
        this.loginError = true;
      }
    });
  }
  

  private autoDismissError() {
    setTimeout(() => {
        this.loginError = false;
    }, 4000); // Change to 3000 for 3 seconds
}

// Function to auto-dismiss success notification
private autoDismissSuccess() {
    setTimeout(() => {
        this.loginSuccess = false;
    }, 4000); // Change to 3000 for 3 seconds
}


get username() {
    return this.loginForm.get('username');
}
get password() {
    return this.loginForm.get('password');
} 


}