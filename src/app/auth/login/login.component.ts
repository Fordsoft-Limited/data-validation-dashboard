import { Component } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  rememberMe: boolean = false;
  isLoading: boolean = false;  // Loading state

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  get dark(): boolean {
    return this.layoutService.config().colorScheme !== 'light';
  }

  login() {
    this.isLoading = true;  // Start the loading spinner

    // Simulate a login process with a delay (e.g., an HTTP request)
    setTimeout(() => {
      const isLoginSuccessful = true; // Replace with actual login logic

      this.isLoading = false;  // Stop the loading spinner

      if (isLoginSuccessful) {
        // this.snackbarService.showSuccess('Login successful!');
        this.router.navigate(['/app']); // Navigate after successful login
      } else {
        // this.snackbarService.showError('Invalid credentials, please try again.');
      }
    }, 2000); // Simulate a 2-second delay
  }
}
