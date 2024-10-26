
import { Component } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { LoginModel } from '../model/loginModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntranceService } from '../../api/entrance.service';
import { entranceLogin } from '../../model/user';

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
    private entranceService:EntranceService
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


  onSubmit() {
    this.isLoading = true;  // Start the loading spinner
  
    // Reset the messages
    this.loginSuccess = false;
    this.loginError = false;
  
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
  
    // Check if username or password is missing
    if (!username) {
        this.errorMessage = 'The email/username field must not be left empty.';
        this.loginError = true; // Show error notification
        this.autoDismissError();
        this.isLoading = false;  // Stop the loading spinner
    } else if (!password) {
        this.errorMessage = 'The password field must not be left empty.';
        this.loginError = true; // Show error notification
        this.autoDismissError();
        this.isLoading = false;  // Stop the loading spinner
    } else {
        // Call the backend login API using the service
        const loginPayload = { username, password };  // Create payload

        this.entranceService.entranceLogin(loginPayload).subscribe({
            next: (response) => {
                this.isLoading = false;  // Stop the loading spinner
                this.loginSuccess = true; // Show success notification
                this.autoDismissSuccess();
                this.router.navigate(['/app']);  // Navigate after successful login
            },
            error: (error) => {
                this.isLoading = false;  // Stop the loading spinner
                this.errorMessage = 'Invalid credentials, please try again.';
                this.loginError = true; // Show error notification
                this.autoDismissError();
            }
        });
    }
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
