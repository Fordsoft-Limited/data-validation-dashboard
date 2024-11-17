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
            // label: 'Favorites',Approval/Rejection
             icon: 'pi pi-home',
             items: [
                 { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/app'] },
                 {label: 'User Management', icon: 'pi pi-fw pi-users', routerLink: ['/app/user-management'] },
                 {label: 'Approval/Rejection', icon: 'pi pi-fw pi-check-square', routerLink: ['/app/data-validation'] },
                 {label: 'Validate Customer', icon: 'pi pi-fw pi-users', routerLink: ['/app/validate'] },
                 {label: 'Bulk Upload', icon: 'pi pi-fw pi-sitemap', routerLink: ['/app/customer-validation'] },
                {label: 'New Customer', icon: 'pi pi-fw pi-users', routerLink: ['/app/new-customer'] },
                 {label: 'Reports', icon: 'pi pi-fw pi-file', routerLink: ['/app/reports'] },
                 {label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: ['/app/settings'] },
                 {label: 'Audit Log', icon: 'pi pi-fw pi-users', routerLink: ['/app/audit-log'] },

             ]
         },

        ];
    }
}
