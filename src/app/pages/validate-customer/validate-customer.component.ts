import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../api/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from '../../shared/model/customer';
import { CustomerService } from '../../api/customer.service';
import { AuthService } from '../../auth/service/auth.service';
import { CUSTOMER_REGION } from '../../shared/constants';
import { UtilsService } from '../../shared/services/utils.service'; 

export interface ServiceCentre {
  name: string;
}

export interface BusinessHub {
  name: string;
  serviceCentres: ServiceCentre[];
}

export interface Region {
  name: string;
  businessHubs: BusinessHub[];
}

export interface DropdownOption {
  label: string;
  value: any; // Can be BusinessHub or ServiceCentre, depending on the context
}
@Component({
  selector: 'app-validate-customer',
  templateUrl: './validate-customer.component.html',
  styleUrl: './validate-customer.component.scss',
  providers: [MessageService, ProductService]
})
export class ValidateCustomerComponent implements OnInit {
  customers!: any[];
  filteredNewCustomers: any[] = [];
  selectedNewCustomer: any[] = [];
  regions: DropdownOption[] = [];
  businessUnits: DropdownOption[] = [];
  feeders: DropdownOption[] = [];
  loading: boolean = false;
  statuses!: any[];

  searchValue: string = '';
  showDetailsDialog: boolean = false;
  selectedCustomer: any | null = null;
  comments: string = '';
  errorMessage: string = "";
  filterForm!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 200;
  newCustomers !: Customer[];
  isResetLoading: boolean = false;
  totalRecords:number=0

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router,
    private utilService: UtilsService
  ) {
    this.filterForm = this.fb.group({
      dateRange: [],
      feeder: [],
      businessUnit: [],
    });
  }

  ngOnInit(): void {

    this.initializeForm()
    this.reload()

  }
  reload() {
    this.loadCustomers(this.currentPage, this.pageSize);
  }
  openSearch() {
    this.showDetailsDialog = true;
  }
  filterApplied(response: any): void {
    console.log(response)
    this.filteredNewCustomers = response?.results;
    this.totalRecords = response?.count;
  }
  onClearFilters(): void {
    this.reload()
  }
  onDialogClosed(event: boolean) {
    this.showDetailsDialog = event;
  }
  initializeForm() {

    this.filterForm = this.fb.group({
      region: [null],
      businessUnit: [null],
      feeder: [null],
      dateCreatedFrom: [null],
      dateCreatedTo: [null]
    });

    this.regions = CUSTOMER_REGION.map(region => ({
      label: region.name,  // Display the region name
      value: region        // Store the entire region object as value
    }));
  }
  onRegionChange(event: any): void {
    const selectedRegion = event.value;
    this.updateBusinessUnits(selectedRegion);
    this.filterForm.get('businessUnit')?.reset(); // Reset the business unit dropdown
    this.filterForm.get('feeder')?.reset(); // Reset the service dropdown
  }

  // On business hub change, update the feeders (service centres)
  onBusinessHubChange(event: any): void {
    const selectedHub = event.value;
    this.updateFeeders(selectedHub);
    this.filterForm.get('feeder')?.reset(); // Reset the service dropdown
  }

  // Update the business hubs based on selected region
  private updateBusinessUnits(region: Region): void {
    this.businessUnits = region.businessHubs.map(hub => ({
      label: hub.name,
      value: hub
    }));
  }

  // Update the service centres (feeders) based on selected business hub
  private updateFeeders(businessHub: BusinessHub): void {
    if (businessHub && businessHub.serviceCentres) {
      this.feeders = businessHub.serviceCentres.map((service: ServiceCentre) => ({
        label: service.name,
        value: service
      }));
    } else {
      this.feeders = [];
    }
  }


  resetFilter() {
    this.isResetLoading = true;
    setTimeout(() => {
      this.isResetLoading = false;
      this.filterForm.reset();  // Reset the form fields
      this.filteredNewCustomers = [...this.newCustomers];  // Restore the original list
    }, 2000)

  }

  loadCustomers(page: number, pageSize: number): void {
    this.loading = true; // Start loading before the request

    this.customerService.getCustomerFilterByValidated(page, pageSize).subscribe( 
      (response) => {
        this.filteredNewCustomers = response.data?.results || []; 
        this.totalRecords = response?.data?.count
        this.loading = false; 
      },
      (error) => {
        console.error('Error loading customers:', error);
        this.errorMessage = 'Failed to load customers. Please try again later.'; // Set error message
        this.loading = false; // Stop loading

      }
    );
  }



  applyStatusFilter() {
    this.filteredNewCustomers = this.customers.filter(
      customer => customer.aproval_status === 'Awaiting Review'
    );
  }

  filterData() {
    this.loading = true;
    const { dateCreatedFrom, dateCreatedTo, feeder, businessUnit, region } = this.filterForm.value;

    const selectedRegion = region ? region.name : null;  // Get the region name

    const selectedBusinessHub = businessUnit ? businessUnit.name : null;
    const selectedFeeder = feeder ? feeder.name : null;

    this.customerService
      .getNewCustomerFilter(
       
        selectedRegion,  // Only pass region name here
        selectedBusinessHub,
        selectedFeeder,
        dateCreatedFrom,
        dateCreatedTo
      )
      .subscribe(
        (response) => {
          console.log('Filtered customers:', response);
          this.customers = response.data?.results || [];
          this.filteredNewCustomers = [...this.customers];
          this.loading = false;
        },
        (error) => {
          console.error('Error loading customers:', error);
          this.errorMessage = 'Failed to load customers. Please try again later.';
          this.loading = false;
        }
      );
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  showDetails(customer: any) {
    this.selectedCustomer = { ...customer };
    // this.comments = this.selectedCustomer.comments ?? '';
  }

  navigateToDetails() {
      const firstItemUid = this.selectedNewCustomer[0].uid
      this.utilService.saveItems(this.selectedNewCustomer)
      this.router.navigate(['app/validate/review/'+firstItemUid]);

  }
  viewDetails(record: any): void {
    this.router.navigate(['/app/customer-details', record.uid]); 
  }

  openDialog() {
    if (this.selectedCustomer) {
      this.showDetailsDialog = true;
    }
  }


  rejectRecord() {
    if (this.selectedCustomer) {
      this.selectedCustomer.status = 'Rejected';
      this.selectedCustomer.comments = this.comments;
    }
  }

  closeDialog() {
    this.showDetailsDialog = false;
  }

  getSeverity(approval_status?: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (approval_status) {
      case 'Approved':
        return 'success';
      case 'Awaiting review':
        return 'warning';
      case 'Rejected':
        return 'danger';
      default:
        return 'info';
    }
  }

}