import { Component, ElementRef, OnInit,OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { SharedDataService } from '../api/shared-data.service';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './app.menuprofile.component.html',
  animations: [
    trigger('menu', [
      transition('void => inline', [
        style({ height: 0 }),
        animate(
          '400ms cubic-bezier(0.86, 0, 0.07, 1)',
          style({ opacity: 1, height: '*' })
        ),
      ]),
      transition('inline => void', [
        animate(
          '400ms cubic-bezier(0.86, 0, 0.07, 1)',
          style({ opacity: 0, height: '0' })
        ),
      ]),
      transition('void => overlay', [
        style({ opacity: 0, transform: 'scaleY(0.8)' }),
        animate('.12s cubic-bezier(0, 0, 0.2, 1)'),
      ]),
      transition('overlay => void', [
        animate('.1s linear', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppMenuProfileComponent implements OnInit,OnDestroy {
  name: string = '';
  role: string = '';
  constructor(
    public layoutService: LayoutService,
    public el: ElementRef,
    private router: Router,
    private authService: AuthService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
   

    const userData = localStorage.getItem('userData');
    if (userData) {
      // If data exists in localStorage, parse and use it
      const data = JSON.parse(userData);
      this.name = data.name || 'Guest';
      this.role = data.role || 'User';
      console.log('Data from localStorage:', this.name, this.role);
    } else {
      // If no data in localStorage, fallback to SharedDataService
      this.sharedDataService.userData$.subscribe((data) => {
        if (data) {
          localStorage.setItem('userData', JSON.stringify(data)); // Save data to localStorage
          this.name = data.name || 'Guest';
          this.role = data.role || 'User';
          console.log('Data from SharedDataService:', this.name, this.role);
        }
      });
    }
  }

  
  ngOnDestroy(): void {
    // Optionally clear localStorage here as well
    this.clearLocalStorage();
  }

  clearLocalStorage(): void {
    // Clear userData from localStorage
    localStorage.removeItem('userData');
    console.log('userData cleared from localStorage');
  }
  toggleMenu() {
    this.layoutService.onMenuProfileToggle();
  }

  get isHorizontal() {
    return this.layoutService.isHorizontal() && this.layoutService.isDesktop();
  }

  get menuProfileActive(): boolean {
    return this.layoutService.state.menuProfileActive;
  }

  get menuProfilePosition(): string {
    return this.layoutService.config().menuProfilePosition;
  }

  get isTooltipDisabled(): boolean {
    return !this.layoutService.isSlim();
  }

  logout(): void {
    this.authService.logout();
    this.clearLocalStorage();
    this.router.navigate(['/']); // Redirect to login page
  }
}