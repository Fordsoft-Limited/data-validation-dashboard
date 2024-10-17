import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
          {
            // label: 'Favorites',
             icon: 'pi pi-home',
             items: [
                 { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/app'] },
                 {label: 'User Management', icon: 'pi pi-fw pi-users', routerLink: ['/app/user-management'] },
                 {label: 'Checker', icon: 'pi pi-fw pi-check-square', routerLink: ['/app/data-validation'] },
                 {label: 'Bulk Upload', icon: 'pi pi-fw pi-users', routerLink: ['/app/customer-validation'] },
                //  {label: 'Customer Information', icon: 'pi pi-fw pi-users', routerLink: ['/app/customer-information'] },
                {label: 'New Customer', icon: 'pi pi-fw pi-users', routerLink: ['/app/new-customer'] },
                 {label: 'Reports', icon: 'pi pi-fw pi-file', routerLink: ['/app/reports'] },
                 {label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: ['/app/settings'] },
             ]
         },

        ];
    }
}
