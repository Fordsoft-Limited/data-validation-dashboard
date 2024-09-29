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
                 { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/app/'] },
                // { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['dashboard-banking'] },
                 // {label: 'Login2', icon: 'pi pi-fw pi-users', routerLink: ['login2'] },
                 {label: 'Reports', icon: 'pi pi-fw pi-file', routerLink: ['/app/reports'] },
                 {label: 'Processed Data', icon: 'pi pi-fw pi-folder', routerLink: ['/app/processed-data'] },
                 {label: 'Checker', icon: 'pi pi-fw pi-check-square', routerLink: ['/app/checkers'] },
                 {label: 'Users Management', icon: 'pi pi-fw pi-users', routerLink: ['users-management'] },
                 {label: 'Data Validation', icon: 'pi pi-fw pi-sitemap', routerLink: ['/app/data-validation'] },
                 {label: 'Data table', icon: 'pi pi-fw pi-qrcode', routerLink: ['data-table'] },
             ]
         },

        ];
    }
}
