import { Component, ViewEncapsulation,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../api/user.service';
import { changePassword } from '../../model/user';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  providers: [MessageService, ],

})
export class SettingsComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  profileForm: FormGroup; 
  imageUrl: string | ArrayBuffer | null = null; 
  selectedFile: File | null = null; 
  passwordForm: FormGroup;
  backendErrorMessage: string | null = null;  
  backendsuccessMessage: string | null = null;  

  passwordChanged: boolean = false;  
  hasErrors: boolean = false;
  errorMessage: string = '';
  loading: boolean = false;
  userAddedError: boolean = false;

  constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private snackbarService: SnackbarService,
    private authService: AuthService
   
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]], 
      phone: ['', Validators.required], 
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordsMatchValidator });
  }


  passwordsMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  handlePasswordChange() {
    
    this.loading = true;
  
    if (this.passwordForm.valid) {
      // Map the form values to match the backend expected fields
      const passwordData: changePassword = {
        old_password: this.passwordForm.get('currentPassword')?.value, // currentPassword from the form
        new_password: this.passwordForm.get('newPassword')?.value,   // newPassword from the form
      };
  
      // Call the service to change the password, passing the token as a header
      this.userService.changePassword(passwordData).subscribe({
        next: (response) => {
          console.log('Password change response', response);
  
          // Check if the response is successful (status === 'Success')
          if (response.status === 'Success') {
            // Show success notification to the user
            this.backendsuccessMessage = 'Password changed successfully!';  // Set the success message
  
            // Clear any previous error message
            this.backendErrorMessage = null;
            this.passwordChanged = true;  // Display success message
  
            // Reset the form fields after success
            this.passwordForm.reset();
  
            // Hide the success message after 4 seconds
            setTimeout(() => {
              this.passwordChanged = false;  // Hide success message after 4 seconds
            }, 4000);
  
          } else {
            // Handle the case if the backend response is unexpected
            this.backendErrorMessage = 'Failed to change password. Please try again.';
          }
        },
        error: (err) => {
          console.error('Error changing password', err);
  
          // Check if the backend returned a specific error message
          if (err.error && err.error.errorMessage) {
            this.backendErrorMessage = err.error.errorMessage;  // Show backend error message
          } else {
            this.backendErrorMessage = 'Failed to change password. Please try again.';  // Generic error message
          }
  
          // Hide the success message if there's an error and show the error message
          this.passwordChanged = false;
  
          // Hide the error message after 4 seconds
          setTimeout(() => {
            this.backendErrorMessage = null;  // Hide the error message after 4 seconds
          }, 4000);
        }
      });
    } else {
      // Mark all form controls as touched to trigger validation messages
      this.passwordForm.markAllAsTouched();
    }
  }
  
  
    

 
  onImageSelect(event: any): void {
    const file = event.files[0]; 
    this.selectedFile = file;

    
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageUrl = e.target?.result ?? null; 
    };
    reader.readAsDataURL(file);
  }

  
  onUpload(event?: any): void {
    if (!this.selectedFile) {
      console.log('No file selected');
      return;
    }

    // Prepare the form data for the file upload
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);


    // For demonstration purposes, we'll just log the form data
    console.log('Form Data:', formData);

   this.cancelUpload();
  }

  // Handle form submission
  onSubmit(): void {
    if (this.profileForm.valid) {
     
      const profileData = this.profileForm.value;
      console.log('Profile Data:', profileData);
      
    }
  }

  cancelUpload(): void {
    this.selectedFile = null; // Reset the selected file
    this.imageUrl = null; // Reset the image preview

    if (this.fileInput) {
      this.fileInput.nativeElement.value = ''; // Reset the file input element
    }
  
   
  }
}
