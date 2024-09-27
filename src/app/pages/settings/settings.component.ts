import { Component, ViewEncapsulation,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  profileForm: FormGroup; 
  imageUrl: string | ArrayBuffer | null = null; 
  selectedFile: File | null = null; 
  passwordForm: FormGroup;

 
  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['Asiyanbola Ahmad', Validators.required],  
      email: ['dolapo@fordsoft.tech', [Validators.required, Validators.email]], 
      phone: ['09001010202', Validators.required], 
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
    if (this.passwordForm.valid) {
      console.log('Form Submitted', this.passwordForm.value);
      // Handle password change logic here
    } else {
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
