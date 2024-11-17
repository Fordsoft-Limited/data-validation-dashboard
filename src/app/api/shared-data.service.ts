import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private userDataSource = new BehaviorSubject<{ name: string; role: string } | null>(null);
  userData$ = this.userDataSource.asObservable();

  setUserData(data: { name: string; role: string }) {
    this.userDataSource.next(data);
  }
  constructor() { }
}
