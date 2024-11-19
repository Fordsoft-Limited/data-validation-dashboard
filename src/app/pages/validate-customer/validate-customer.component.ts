import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../api/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from '../../shared/model/customer';
import { CustomerService } from '../../api/customer.service';
import { AuthService } from '../../auth/service/auth.service';
import { CUSTOMER_REGION } from '../../shared/constants';

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
  providers: [MessageService,ProductService ]
})
export class ValidateCustomerComponent implements OnInit{
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
  selectedCustomer: any  | null = null;
  comments: string = '';
  errorMessage: string = "";
  filterForm!: FormGroup;
  currentPage: number = 1;
  pageSize : number = 200;
  newCustomers !: Customer[];
  isResetLoading: boolean = false;
//  filteredNewCustomers  : Customer[]=[];

 

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.filterForm = this.fb.group({
      dateRange: [],
      feeder: [],
      businessUnit: [],
    });
  }

  ngOnInit(): void {
    this.loadCustomers(this.currentPage, this.pageSize);

    this.filterForm = this.fb.group({
      region: [null],
      businessUnit: [null],
      feeder: [null],
      dateCreatedFrom: [null],  // Start date control
      dateCreatedTo: [null]     // End date control
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
    this.isResetLoading=true;
    setTimeout(() => {
      this.isResetLoading=false;
      this.filterForm.reset();  // Reset the form fields
      this.filteredNewCustomers = [...this.newCustomers];  // Restore the original list
    },2000)
    
  }
  
  loadCustomers(page: number, pageSize: number): void {
    const token = this.authService.getToken();
    console.log(token);
    
    if (!token) {
      this.loading = false;
      this.errorMessage = 'No authentication token found. Please log in again.';
      return; // Exit the function early
    }
  
    this.loading = true; // Start loading before the request
  
    this.customerService.getCustomerFilterByPages(page, pageSize, token).subscribe(
      (response) => {
        console.log('Data loaded:', response); // Debugging check
        this.customers = response.data?.results || []; // Handle cases where results might be undefined
        this.filteredNewCustomers = [...this.customers]; // Keep a copy for filtering
        this.loading = false; // Stop loading
      },
      (error) => {
        console.error('Error loading customers:', error);
        this.errorMessage = 'Failed to load customers. Please try again later.'; // Set error message
        this.loading = false; // Stop loading
       
      }
    );
  }
  
  
  
  applyStatusFilter() {
    // Filter customers based on status
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
  
    const token = this.authService.getToken();
  
    if (!token) {
      this.loading = false;
      this.errorMessage = 'No authentication token found. Please log in again.';
      return;
    }
  
    // Now, call the service to get filtered customers
    this.customerService
      .getNewCustomerFilter(
        token,
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
  
  // Helper function to format the date into YYYY-MM-DD format

 

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  showDetails(customer: any ) {
    this.selectedCustomer = { ...customer }; 
   // this.comments = this.selectedCustomer.comments ?? '';
  }

  navigateToDetails() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['app/validate/review'], {
        state: { selectedNewCustomer: this.selectedNewCustomer }
      });
    }, 2000);
  }
  viewDetails(record: any): void {
    this.router.navigate(['/app/customer-details', record.uid]); // Pass the record ID or unique identifier as a route parameter
  }

  openDialog() {
    if (this.selectedCustomer) {
      this.showDetailsDialog = true;
    }
  }

  // approveRecord() {
  //   if (this.selectedCustomer) {
  //     this.selectedCustomer.status = 'Approved';
  //     this.selectedCustomer.comments = this.comments;
  //   }
  // }

  rejectRecord() {
    if (this.selectedCustomer) {
      this.selectedCustomer.status = 'Rejected';
      this.selectedCustomer.comments = this.comments;
    }
  }

  // nextRecord() {
  //   const currentIndex = this.customers.findIndex(
  //     (item) => item. customer_id === this.selectedCustomer?.id
  //   );
  //   if (currentIndex < this.customers.length - 1) {
  //     this.selectedCustomer = this.customers[currentIndex + 1];
  //   }
  // }

  // previousRecord() {
  //   const currentIndex = this.customers.findIndex(
  //     (item) => item.id === this.selectedCustomer?.id
  //   );
  //   if (currentIndex > 0) {
  //     this.selectedCustomer = this.customers[currentIndex - 1];
  //   }
  // }

  closeDialog() {
    this.showDetailsDialog = false;
  }

  // clear(table: Table) {
  //   table.clear();
  //   this.filter.nativeElement.value = '';
  //   this.searchValue = '';
  // }

  // isPreviousDisabled(): boolean {
  //   return !this.selectedCustomer || 
  //          this.customers.findIndex(item => item.id === this.selectedCustomer?.id) === 0;
  // }

  // isNextDisabled(): boolean {
  //   return !this.selectedCustomer || 
  //          this.customers.findIndex(item => item.id === this.selectedCustomer?.id) === this.customers.length - 1;
  // }

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
