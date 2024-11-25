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
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss'],
  providers: [MessageService, ProductService]
})
export class NewCustomerComponent implements OnInit {
  newCustomers !: Customer[];

  filteredNewCustomers: any[] = [];
  loading: boolean = false;
  hasErrors: boolean = false;
  errorMessage: string = '';
  totalRecords: number = 0;
  regions: DropdownOption[] = [];
  businessUnits: DropdownOption[] = [];
  feeders: DropdownOption[] = [];
  isFilterLoading: boolean = false;
  isResetLoading: boolean = false;
  userAddedError: boolean = false;

  isShowDetails: boolean = false;

  searchValue: string = '';
  currentPage: number = 1;
  pageSize: number = 100;
  showDetailsDialog: boolean = false;
  selectedCustomer: any | null = null;
  selectedNewCustomer: any[] = [];

  filterForm!: FormGroup;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router, private authService: AuthService, private messageService: MessageService, private utilService: UtilsService) {
    this.filterForm = this.fb.group({
      dateRange: [],
      feeder: [],
      businessUnit: [],
    });
  }

  ngOnInit(): void {
    this.reload()
  }
  reload() {
    this.loadNewCustomer(this.currentPage, this.pageSize);
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
  loadNewCustomer(page: number, pageSize: number) {
    this.loading = true;
    this.customerService.getCustomerFilterByPages(page, pageSize).subscribe(
      (response) => {
        this.loading = false;
        if (response && response.data && response.data.results) {
          this.filteredNewCustomers = response.data.results;
          this.totalRecords = response.data.count;
        } else {
          this.filteredNewCustomers = [];
          this.messageService.add({ severity: 'info', summary: 'No Data', detail: 'No new customer found.' });
        }
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching new customer:', error); // Log the error
        this.filteredNewCustomers = []; // Clear batches on error
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load customers.' });
      }
    );
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

  filterData() {
    this.loading = true;
    const { dateCreatedFrom, dateCreatedTo, feeder, businessUnit, region } = this.filterForm.value;

    const selectedRegion = region ? region.name : null;  // Get the region name

    const selectedBusinessHub = businessUnit ? businessUnit.name : null;
    const selectedFeeder = feeder ? feeder.name : null;

    // Now, call the service to get filtered customers
    this.customerService
      .getNewCustomerFilter(
        selectedRegion,  // Only pass region name here
        selectedBusinessHub,
        selectedFeeder,
        dateCreatedFrom,
        dateCreatedTo,
      )
      .subscribe(
        (response) => {
          console.log('Filtered customers:', response);
          this.newCustomers = response.data?.results || [];
          this.filteredNewCustomers = [...this.newCustomers];
          this.loading = false;
        },
        (error) => {
          console.error('Error loading customers:', error);
          this.errorMessage = 'Failed to load customers. Please try again later.';
          this.loading = false;
        }
      );
  }



  resetFilter() {
    this.isResetLoading = true;
    setTimeout(() => {
      this.isResetLoading = false;
      this.filterForm.reset();  // Reset the form fields
      this.filteredNewCustomers = [...this.newCustomers];  // Restore the original list
    }, 2000)

  }
  private isWithinDateRange(recordDate: string | Date, dateRange: [string, string]): boolean {
    const [startDate, endDate] = dateRange;
    const recordTime = new Date(recordDate).getTime();
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();

    return recordTime >= startTime && recordTime <= endTime;
  }

  showDetails(customer: any) {
    this.selectedCustomer = { ...customer };
    // this.comments = this.selectedCustomer.comments ?? '';
  }

  navigateToDetails() {
    const firstItemUid = this.selectedNewCustomer[0].uid
    this.utilService.saveItems(this.selectedNewCustomer)
    this.router.navigate(['app/validate/review/' + firstItemUid]);

  }

  viewDetails(record: any): void {
    this.router.navigate(['/app/customer-details', record.uid]); // Pass the record ID or unique identifier as a route parameter
  }
  clear(table: Table) {
    table.clear();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
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
