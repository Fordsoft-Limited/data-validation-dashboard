import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    userRole: string | null = null;
  
    constructor(private authService: AuthService) {}
  
    ngOnInit() {
      // Get the user's role
      this.userRole = this.authService.getUserRole();
  
      // Define the full menu model with role-based visibility
      const fullModel = [
        {
          icon: 'pi pi-home',
          items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/app'], roles: ['ADMIN', 'USER', 'APPROVAL','REVIEWER'] },
            { label: 'User Management', icon: 'pi pi-fw pi-users', routerLink: ['/app/user-management'], roles: ['ADMIN'] },
            { label: 'Approval/Rejection', icon: 'pi pi-fw pi-check-square', routerLink: ['/app/data-validation'], roles: ['ADMIN','REVIEWER'] },
            { label: 'Validate Customer', icon: 'pi pi-fw pi-users', routerLink: ['/app/validate'], roles: ['ADMIN', 'APPROVAL'] },
            { label: 'Bulk Upload', icon: 'pi pi-fw pi-sitemap', routerLink: ['/app/customer-validation'], roles: ['ADMIN', 'USER'] },
            { label: 'New Customer', icon: 'pi pi-fw pi-users', routerLink: ['/app/new-customer'], roles: ['ADMIN',"APPROVAL"] },
            { label: 'Reports', icon: 'pi pi-fw pi-file', routerLink: ['/app/reports'], roles: ['ADMIN', 'REVIEWER', 'APPROVAL'] },
            { label: 'Download report', icon: 'pi pi-fw pi-download', routerLink: ['/app/download'], roles: ['ADMIN', 'APPROVAL', 'REVIEWER'] },
            { label: 'Audit Log', icon: 'pi pi-fw pi-users', routerLink: ['/app/audit-log'], roles: ['ADMIN'] }
          ]
        }
      ];
  
      // Filter the model based on the user's role
      this.model = fullModel.map(section => ({
        ...section,
        items: section.items.filter(item => item.roles.includes(this.userRole || ''))
      }));
    }
}
