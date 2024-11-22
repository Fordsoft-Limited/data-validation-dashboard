import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { CustomerService } from '../../api/customer.service';
import { MessageService } from 'primeng/api/messageservice';
import { AuthService } from '../../auth/service/auth.service';
import { DatePipe } from '@angular/common';
import { CUSTOMER_REGION } from '../../shared/constants';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [DatePipe], // Provide DatePipe if not globally available
})
export class FilterComponent {
  @ViewChild('dt') table: Table | undefined;

  display = false;
  pageloading = false;
  errOccured = false;
  customers: any[] = []; // Adjust type to match customer structure
  filteredCustomers: any[] = []; // For displaying in the table
  statuses: any[] = [];
  approvedBys: any[] = [];
  activityValues: number[] = [0, 100];
  loading = false;
  errorMessage = '';
  custloading = false;

  regions = CUSTOMER_REGION;
  businessHubs: any[] = [];
  serviceCenters: any[] = [];

  // Temporary filter values
  tempRegion: any = null;
  tempBusinessHub: any = null;
  tempServiceCenter: any = null;
  tempDateCreatedFrom!: string;
  tempDateCreatedTo!: string;
  tempStatus!: string;
  tempApproveBy!: string;
  tempAplicationDates!: string;

  // Applied filter values
  region = '';
  businessHub = '';
  serviceCenter = '';
  dateCreatedFrom: string | null = null;
  dateCreatedTo: string | null = null;
  status = '';
  approvedBy = '';
  aplicationDate = '';

  currentPage = 1;
  pageSize = 100;
  selectedCustomer: any;

  constructor(
    private service: CustomerService,
    private route: Router,
    private authService: AuthService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadCustomers(this.currentPage, this.pageSize);
    this.businessHubs = this.getAllBusinessHubs();
    this.serviceCenters = this.getAllServiceCenters();
  }

  getAllBusinessHubs(): any[] {
    return this.regions.flatMap((region) => region.businessHubs);
  }

  getAllServiceCenters(): any[] {
    return this.getAllBusinessHubs().flatMap((hub) => hub.serviceCentres);
  }

  onRegionChange(): void {
    const selectedRegion = this.regions.find(
      (region) => region.name === this.tempRegion
    );
    this.businessHubs =
      selectedRegion?.businessHubs || this.getAllBusinessHubs();

    if (this.tempBusinessHub) {
      const selectedHub = this.businessHubs.find(
        (hub) => hub.name === this.tempBusinessHub
      );
      this.serviceCenters = selectedHub?.serviceCentres || [];
    } else {
      this.serviceCenters = this.getAllServiceCenters();
    }
  }

  onBusinessHubChange(): void {
    const selectedHub = this.businessHubs.find(
      (hub) => hub.name === this.tempBusinessHub
    );
    this.serviceCenters =
      selectedHub?.serviceCentres || this.getAllServiceCenters();
  }

  loadCustomers(page: number, pageSize: number): void {

  
  
    this.loading = true;
  

    this.loading = true;
    this.service.getCustomersWithAwaitingReview(page, pageSize).subscribe(
      (response) => {
        this.customers = response.data?.results || [];
        this.filteredCustomers = [...this.customers];
        this.loading = false;

        // Populate dropdown filters
        this.statuses = Array.from(
          new Set(this.customers.map((customer: any) => customer.status_code))
        ).map((status) => ({ name: status, value: status }));

        console.log('Customer Data Loaded:', this.customers);
      },
      (error) => {
        console.error('Error loading customers:', error);
        this.errorMessage = 'Failed to load customers. Please try again later.';
        this.loading = false;
      }
    );
  }

  getFilterCustomer(): void {
    const payload = {
      region: this.region || '',
      businessHub: this.businessHub || '',
      serviceCenter: this.serviceCenter || '',
      dateCreatedFrom:
        this.datePipe.transform(this.dateCreatedFrom, 'yyyy-MM-dd') || '',
      dateCreatedTo:
        this.datePipe.transform(this.dateCreatedTo, 'yyyy-MM-dd') || '',
      status: this.status || '',
      approvedBy: this.approvedBy || '',
      aplicationDate:
        this.datePipe.transform(this.aplicationDate, 'yyyy-MM-dd') || '',
    };

    console.log('Filter Payload:', payload);

    this.loading = true;
    this.service.getNewCustomerFilter2(payload).subscribe(
      (response) => {
        if (response.code === 200 && response.status === 'Success') {
          this.filteredCustomers = response.data || [];
          console.log('Filtered Data:', this.filteredCustomers);
        } else {
          this.filteredCustomers = [];
          console.warn('Unexpected response:', response);
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error filtering customers:', error);
        this.errorMessage = 'Failed to apply filters. Please try again later.';
        this.filteredCustomers = [];
        this.loading = false;
      }
    );
  }

  onFilterButtonClick(): void {
    this.filteredCustomers = this.customers.filter((customer) => {
      const matchesRegion =
        !this.tempRegion || customer.region === this.tempRegion;
      const matchesBusinessHub =
        !this.tempBusinessHub || customer.businessHub === this.tempBusinessHub;
      const matchesServiceCenter =
        !this.tempServiceCenter ||
        customer.serviceCenter === this.tempServiceCenter;
      const matchesStatus =
        !this.tempStatus || customer.status_code === this.tempStatus;
      const matchesDateFrom =
        !this.tempDateCreatedFrom ||
        new Date(customer.dateCreated) >= new Date(this.tempDateCreatedFrom);
      const matchesDateTo =
        !this.tempDateCreatedTo ||
        new Date(customer.dateCreated) <= new Date(this.tempDateCreatedTo);

      return (
        matchesRegion &&
        matchesBusinessHub &&
        matchesServiceCenter &&
        matchesStatus &&
        matchesDateFrom &&
        matchesDateTo
      );
    });

    this.hideDialog();
    console.log('Filtered Customers:', this.filteredCustomers);
  }

  showDialog(): void {
    this.display = true;
  }

  hideDialog(): void {
    this.display = false;
    this.clearFilters();
  }

  clearFilters(): void {
    // Clear temporary and applied filters
    this.tempRegion = null;
    this.tempBusinessHub = null;
    this.tempServiceCenter = null;
    this.tempDateCreatedFrom = '';
    this.tempDateCreatedTo = '';
    this.tempStatus = '';
    this.tempApproveBy = '';
    this.tempAplicationDates = '';

    this.region = '';
    this.businessHub = '';
    this.serviceCenter = '';
    this.dateCreatedFrom = '';
    this.dateCreatedTo = '';
    this.status = '';
    this.approvedBy = '';
    this.aplicationDate = '';
  }
}
