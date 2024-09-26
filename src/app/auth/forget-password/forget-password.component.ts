import { Component } from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';
import { ForgetPassword } from '../../layout/api/forget-passwordModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './forget-password.component.html',
})
export class ForgetPasswordComponent {
  requestPasswordForm!: FormGroup;
  logins!:ForgetPassword[];
  loginSuccess: boolean = false;
  loginError: boolean = false;
  rememberMe: boolean = false;
  errorMessage: string = '';

  constructor(private layoutService: LayoutService) {}

  get dark(): boolean {
      return this.layoutService.config().colorScheme !== 'light';
  }

  ngOnInit(): void {
      this.requestPasswordForm = new FormGroup({
          emailPhone: new FormControl('', [Validators.required, Validators.pattern(
              '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),])
      });
  }

  // Updated onSubmit method
  onSubmit() {
      // Reset the messages
      this.loginSuccess = false;
      this.loginError = false;
  
      const emailPhone = this.requestPasswordForm.get('emailPhone')?.value;

      if (!emailPhone) {
          this.errorMessage = 'Please enter a valid email address.';
          this.loginError = true; // Show error notification
          this.autoDismissError();
      } else {
          // Simulate a successful login
          this.errorMessage = '';
          this.loginError = false; // Hide error notification
          this.loginSuccess = true; // Show success notification
          this.autoDismissSuccess();
      }
  }
  
  // Function to auto-dismiss error notification
  private autoDismissError() {
      setTimeout(() => {
          this.loginError = false;
      }, 3000); // Change to 3000 for 3 seconds
  }
  
  // Function to auto-dismiss success notification
  private autoDismissSuccess() {
      setTimeout(() => {
          this.loginSuccess = false;
      }, 3000); // Change to 3000 for 3 seconds
  }


  get emailPhone() {
      return this.requestPasswordForm.get('emailPhone');
  }

}