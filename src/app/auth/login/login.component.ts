import { Component } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { LoginModel } from '../../layout/api/loginModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginModel!: LoginModel[];
  loginSuccess: boolean = false;
  loginError: boolean = false;
  rememberMe: boolean = false;
  errorMessage: string = '';
  // rememberMe: boolean = false;
  isLoading: boolean = false;  // Loading state

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  get dark(): boolean {
    return this.layoutService.config().colorScheme !== 'light';
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
        emailPhone: new FormControl('', [Validators.required, Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        ),]),
        password: new FormControl('',  [Validators.required, Validators.minLength(4)])
    });

  } 


  onSubmit() {
    this.isLoading = true;  // Start the loading spinner
  
    // Reset the messages
    this.loginSuccess = false;
    this.loginError = false;
  
    const emailPhone = this.loginForm.get('emailPhone')?.value;
    const password = this.loginForm.get('password')?.value;
  
    // Check if emailPhone or password is missing
    if (!emailPhone) {
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
        // Simulate login process (you can replace this with actual login logic)
        setTimeout(() => {
          this.isLoading = false;  // Stop the loading spinner
  
          // Simulate login success
          const isLoginSuccessful = true;  // Replace with actual login logic
  
          if (isLoginSuccessful) {
            this.loginSuccess = true; // Show success notification
            this.autoDismissSuccess();
            this.router.navigate(['/app']);  // Navigate after successful login
          } else {
            this.errorMessage = 'Invalid credentials, please try again.';
            this.loginError = true; // Show error notification
            this.autoDismissError();
          }
        }, 2000); // Simulate a 2-second delay
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


get emailPhone() {
    return this.loginForm.get('emailPhone');
}
get password() {
    return this.loginForm.get('password');
} 


}
