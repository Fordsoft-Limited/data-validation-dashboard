import { Component, ElementRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router'; // Import the Router to navigate after logout
import { UserService } from '../api/user.service';
export interface LogoutPayload {
    username: string;
}

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
export class AppMenuProfileComponent {
    
    constructor(public layoutService: LayoutService, public el: ElementRef,
        private userService: UserService,  
        private router: Router           
    ) {}

    toggleMenu() {
        this.layoutService.onMenuProfileToggle();
    }

    get isHorizontal() {
        return (
            this.layoutService.isHorizontal() && this.layoutService.isDesktop()
        );
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


    // logOut() {
    //     console.log('Logout clicked');
        
    //     const token = localStorage.getItem('auth_token');
    //     const username = localStorage.getItem('username');
    //     console.log(token, username);
    
    //     if (token && username) {
    //         const payload: LogoutPayload = {
    //             username: username
    //         };
    
    //         // Call the logOutUser service method to invalidate the session
    //         this.userService.logOutUser(payload, token).subscribe(
    //             response => {
    //                 console.log('Logout successful:', response);
    //                 localStorage.removeItem('auth_token');
    //                 localStorage.removeItem('username');
    //                 this.router.navigate(['/login']);
    //             },
    //             error => {
    //                 console.error('Logout failed:', error);
    //             }
    //         );
    //     } else {
    //         console.error('No token or username found, unable to log out.');
    //     }
    // }
    
    


}
