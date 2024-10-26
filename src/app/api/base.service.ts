import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  [x: string]: any;

  public _baseUrl: string = 'http://208.87.133.54:8000'


  constructor() {}


  errorHandler(error: HttpErrorResponse) {
    return throwError(error || "Server Error");
  }

  
}
