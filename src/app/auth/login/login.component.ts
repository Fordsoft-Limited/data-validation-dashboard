import { Component ,EventEmitter,Output} from '@angular/core';
import { LayoutService } from '../../layout/service/app.layout.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { LoginModel } from '../model/loginModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EntranceService } from '../../api/entrance.service';
import { entranceLogin } from '../../model/user';
import { AuthService } from '../service/auth.service';
import { SharedDataService } from '../../api/shared-data.service';

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
    private authService: AuthService,
    private sharedDataService: SharedDataService 
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
    const encryptedPayload = this.authService.encryptPayload(loginPayload);

   
    // Send the login request to the API
    this.entranceService.entranceLogin(loginPayload).subscribe({
      next: (response) => {
        this.isLoading = false;
        const token = response.data?.access_token;
        const role = response.data?.role;
        const name = response.data?.name;
        console.log('Received token:', token);

  
        if (token) {
          this.authService.setToken(token); 
          this.authService.setLoginData(username, password); 
          this.sharedDataService.setUserData({ name, role });
          this.autoDismissSuccess();
          this.router.navigate(['/app']);          
        } else {
          this.errorMessage = 'Login failed. Please try again.';
          this.loginError = true;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Invalid credentials, please try again.';
        this.loginError = true;
        this.autoDismissError();
      }
    });
  }
  
  private autoDismissError() {
    setTimeout(() => {
        this.loginError = false;
    }, 4000);
}
private autoDismissSuccess() {
    setTimeout(() => {
        this.loginSuccess = false;
    }, 4000); 
}


get username() {
    return this.loginForm.get('username');
}
get password() {
    return this.loginForm.get('password');
} 


}
