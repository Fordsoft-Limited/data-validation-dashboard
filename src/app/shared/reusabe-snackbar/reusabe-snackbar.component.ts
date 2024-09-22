import { Component } from '@angular/core';

@Component({
  selector: 'app-reusabe-snackbar',
  templateUrl: './reusabe-snackbar.component.html',
  styleUrl: './reusabe-snackbar.component.scss',

})
export class ReusabeSnackbarComponent {
  toasts: any[] = [];

  ngOnInit() {}

  showToast(message: string, type: string) {
    const toast = { message, type };
    this.toasts.push(toast);

    setTimeout(() => {
      this.removeToast(toast);
    }, 3000); // Auto-remove after 3 seconds
  }

  removeToast(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
