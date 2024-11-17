import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  showError(errorMessage: any) {
    throw new Error('Method not implemented.');
  }
  showSuccess(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
