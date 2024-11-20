import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { CustomerService } from '../../api/customer.service';
import { MessageService } from 'primeng/api/messageservice';
import { AuthService } from '../../auth/service/auth.service';
import { DatePipe } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { Customer } from '../../shared/model/customer';
import { CUSTOMER_REGION } from '../../shared/constants';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  providers: [DatePipe], // Provide DatePipe if not globally available

})
export class FilterComponent {

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

  regions = CUSTOMER_REGION;
  businessHubs: any[] = [];
  serviceCenters: any[] = [];

  tempRegion: any = null;
  tempBusinessHub: any = null;
  tempServiceCenter: any = null;

  createdBys: any[] = [];
  updatedBys: any[] = [];
  approvedBys: any[] = [];


  // createdBys = [{ name: 'Emmanuel' }, { name: 'Seun' }];

  // updatedBys = [{ name: 'Emmanuel' }, { name: 'Seun' }];

  // approvedBys = [{ name: 'Emmanuel' }, { name: 'Seun' }];


  token!: string;
  region!: string;
  businessHub!: string;
  serviceCenter!: string;
  dateCreatedFrom!: string;
  dateCreatedTo!: string;
  status!: boolean;
  createdBy!: string;
  updatedBy!: string;
  aplicationDate!: string;
  approvedBy!: string;

  tempToken!: string;
  tempDateCreatedFrom!: string;
  tempDateCreatedTo!: string;
  tempStatus!: string;
  tempCreatedBy!: string;
  tempUpdatedBy!: string;
  tempAplicationDates!: string;
  tempApproveBy!: string;


  uploadError!: string;
  errorMessage: string = "";
  loading: boolean = false;
  filteredNewCustomers: Customer[] = [];
  currentPage: number = 1;
  pageSize: number = 100;


  constructor(private service: CustomerService, private route: Router, private authService: AuthService,
    private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.loadCustomers(this.currentPage, this.pageSize);
    // this.getCustomerByRegionByBussinessHubByServiceCenter();
    this.businessHubs = this.getAllBusinessHubs();
    this.serviceCenters = this.getAllServiceCenters();

  }


  getAllBusinessHubs(): any[] {
    return this.regions.flatMap(region => region.businessHubs);
  }

  getAllServiceCenters(): any[] {
    return this.getAllBusinessHubs().flatMap(hub => hub.serviceCentres);
  }

  onRegionChange() {
    const selectedRegion = this.regions.find((region) => region.name === this.tempRegion);

    this.businessHubs = selectedRegion?.businessHubs || this.getAllBusinessHubs();

    if (this.tempBusinessHub) {
      const selectedHub = this.businessHubs.find(
        (hub) => hub.name === this.tempBusinessHub
      );
      this.serviceCenters = selectedHub?.serviceCentres || [];
    } else {
      this.serviceCenters = this.getAllServiceCenters();
    }
  }

  onBusinessHubChange() {
    const selectedHub = this.businessHubs.find(
      (hub) => hub.name === this.tempBusinessHub
    );
    this.serviceCenters = selectedHub?.serviceCentres || this.getAllServiceCenters();
  }



  loadCustomers(page: number, pageSize: number): void {
  
  
    this.loading = true;
  
    this.service.getCustomersWithAwaitingReview(page, pageSize).subscribe(
      (response) => {
        console.log('Customer API Response:', response);
        this.customers = response.data?.results || [];
        this.filteredNewCustomers = [...this.customers];
        this.loading = false;
  
        this.statuses = Array.from(
          new Set(this.customers.map((customer: any) => customer.status_code))
        ).map((statusCode) => ({ name: statusCode, value: statusCode }));
  
        // this.createdBys = Array.from(
        //   new Set(this.customers.map((customer: any) => customer.created_by))
        // ).map((createdBy) => ({ name: createdBy, value: createdBy }));
  
        // this.updatedBys = Array.from(
        //   new Set(this.customers.map((customer: any) => customer.updated_by))
        // ).map((updatedBy) => ({ name: updatedBy, value: updatedBy }));
  
        this.approvedBys = Array.from(
          new Set(this.customers.map((customer: any) => customer.approved_by))
        ).map((approvedBy) => ({ name: approvedBy, value: approvedBy }));
  
        console.log('Dropdown Data:', { 
          statuses: this.statuses,
          createdBys: this.createdBys,
          updatedBys: this.updatedBys,
          approvedBys: this.approvedBys,
        });
      },
      (error) => {
        console.error('Error loading customers:', error);
        this.errorMessage = 'Failed to load customers. Please try again later.';
        this.loading = false;
      }
    );
  }
  
  
  
  



  getCustomerByRegionByBussinessHubByServiceCenter() {
    const token = this.authService.getToken();
    if (!token) {
      this.uploadError = 'User is not authenticated. Please log in again.';
      return;
    }

    // Format the dates to 'YYYY-MM-DD'
    const formattedDateCreatedFrom = this.datePipe.transform(this.dateCreatedFrom, 'yyyy-MM-dd') || '';
    const formattedDateCreatedTo = this.datePipe.transform(this.dateCreatedTo, 'yyyy-MM-dd') || '';

    // Construct the payload
    const payload = {
      token: this.token,
      region: this.region,
      businessHub: this.businessHub,
      serviceCenter: this.serviceCenter,
      dateCreatedFrom: formattedDateCreatedFrom,
      dateCreatedTo: formattedDateCreatedTo,
    };

    console.log('Payload:', payload);

    // Call the service
    this.service.getNewCustomerFilter2(payload).subscribe(
      res => {
        if (res.code === 200 && res.status === 'Success') {
          this.customers = res['data'];
          console.log(res['data']);

          this.clear();

          this.hideDialog()
        }
      },
      err => {
        this.pageloading = false;
        this.errOccured = true;
        console.log(err);
      }
    );
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
    this.clear();
  }


  clear() {
    // Temporary fields
    this.tempRegion = null;
    this.tempBusinessHub = null;
    this.tempServiceCenter = null;
    this.tempToken = '';
    this.tempDateCreatedFrom = '';
    this.tempDateCreatedTo = '';
    this.tempStatus = '';
    this.tempCreatedBy = '';
    this.tempUpdatedBy = '';
    this.tempAplicationDates = '';
    this.tempApproveBy = '';

    // Permanent fields
    this.region = '';
    this.businessHub = '';
    this.serviceCenter = '';
    this.dateCreatedFrom = '';
    this.dateCreatedTo = '';
    this.status = false;
    this.createdBy = '';
    this.updatedBy = '';
    this.aplicationDate = '';
    this.approvedBy = '';
  }





}
