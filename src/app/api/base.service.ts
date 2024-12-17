import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  [x: string]: any;

  public _baseUrl: string = environment.apiBaseUrl


  constructor() {}


  errorHandler(error: HttpErrorResponse) {
    return throwError(error || "Server Error");
  }


}
