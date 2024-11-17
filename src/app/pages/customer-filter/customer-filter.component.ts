import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { CustomerService } from '../../api/customer.service';
import { MessageService } from 'primeng/api/messageservice';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrl: './customer-filter.component.scss',
})
export class CustomerFilterComponent {

  display: boolean = false;

  pageloading: boolean = false
  errOccured: boolean = false
  customers: [] = [];
  selectedCustomer = [];
  statuses: any[] = [];
  rowGroupMetadata: any;
  activityValues: number[] = [0, 100];

  @ViewChild('dt') table: Table | undefined;
  customerloading: boolean | undefined;

  regions = [{ name: 'First' }, { name: 'Second' }]
  business_hubs = [{ name: 'ND' }, { name: 'HND' }]
  service_centers = [{ name: 'I' }, { name: 'II' }]

  token!: string;
  region!: string; 
  businessHub!: string;
  serviceCenter!: string; 
  dateCreatedFrom!: string;
  dateCreatedTo!: string;

  tempToken!: string;
  tempRegion!: string; 
  tempBusinessHub!: string;
  tempServiceCenter!: string; 
  tempDateCreatedFrom!: string;
  tempDateCreatedTo!: string;
  uploadError!: string;



  constructor(private service: CustomerService, private route: Router,private authService: AuthService
  ) { }

  ngOnInit(): void {

    // this.getAvailableDepartment();
    this.getCustomerByRegionByBussinessHubByServiceCenter();

  }




  getCustomerByRegionByBussinessHubByServiceCenter() {
    // Get the authentication token
    const token = this.authService.getToken();
    if (!token) {
      this.uploadError = 'User is not authenticated. Please log in again.';
      return;
    }
    console.log(token);

    if (this.token != null && this.region != null && this.businessHub != null && this.serviceCenter != null 
      && this.dateCreatedFrom != null && this.dateCreatedTo != null
    ) {
      this.pageloading = true
      this.errOccured = false
      this.customers = []
      // console.log(this.department, this.programme, this.session)
      this.service.getNewCustomerFilter(this.token, this.region, this.businessHub, 
        this.serviceCenter, this.dateCreatedFrom, this.dateCreatedTo ).subscribe(res => {

          this.customers = res['data']
          this.pageloading = false
    
          this.pageloading = false
          console.log(res['data'])
        
      }, err => {
        this.pageloading = false
        this.errOccured = true
        console.log(err)
      })
    }
    else {
      this.customers = []
    }
  }


  onFilterButtonClick() {
    // Apply the selected values from temporary variables
    this.token = this.tempToken || '';
    this.region = this.tempRegion || '';
    this.businessHub = this.tempBusinessHub || '';
    this.serviceCenter = this.tempServiceCenter || '';
    this.dateCreatedFrom = this.tempDateCreatedFrom || '';
    this.dateCreatedTo = this.tempDateCreatedTo || '';


    // Debugging statements to see values
    console.log('Selected token:', this.token);
    console.log('Selected region:', this.region);
    console.log('Selected businessHub:', this.businessHub);
    console.log('Selected serviceCenter:', this.serviceCenter);
    console.log('Selected dateCreatedFrom:', this.dateCreatedFrom);
    console.log('Selected dateCreatedTo:', this.dateCreatedTo);


    // Call your filtering function here
    this.getCustomerByRegionByBussinessHubByServiceCenter();
  }

  showDialog() {
    this.display = true;
  }

  hideDialog() {
    this.display = false
  }







}
