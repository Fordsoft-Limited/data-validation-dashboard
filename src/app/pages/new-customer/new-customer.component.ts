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
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss' ],
  providers: [MessageService,ProductService ]
})
export class NewCustomerComponent implements OnInit {
  newCustomers !: Customer[];

  filteredNewCustomers  : any[]=[];
  loading: boolean = false;
  hasErrors: boolean = false;
  errorMessage: string ='';
  totalRecords: number = 0; 
  regions: DropdownOption[] = [];
  businessUnits: DropdownOption[] = [];
  feeders: DropdownOption[] = [];  
  isFilterLoading: boolean = false;
  isResetLoading: boolean = false;
  userAddedError: boolean = false;

  isShowDetails:boolean = false;

  searchValue: string = '';
  currentPage: number = 1;
  pageSize: number = 20;
  showDetailsDialog: boolean = false;

  selectedNewCustomer: Customer | null = null

  filterForm!: FormGroup;
  
  constructor( private fb: FormBuilder, private customerService:CustomerService,private router: Router, private authService:AuthService,private messageService: MessageService  ){
    this.filterForm = this.fb.group({
      dateRange: [],
      feeder: [],
      businessUnit: [],
    });
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      region: [null],
      businessUnit: [null],
      feeder: [null],
      dateCreatedFrom: [null],  // Start date control
      dateCreatedTo: [null] 
    });

    this.regions = CUSTOMER_REGION.map(region => ({
      label: region.name,  // Display the region name
      value: region        // Store the entire region object as value
    }));


    this.loadNewCustomer(this.currentPage, this.pageSize);
  }

  
loadNewCustomer(page:number,pageSize:number) {
  const token = this.authService.getToken();
  console.log(token);
if (!token) {
  this.loading = false;
  this.hasErrors = true;
  this.errorMessage = 'No authentication token found. Please log in again.';
  setTimeout(() => {
    this.userAddedError = false;
  }, 3000);
  return; // Exit the function early
}
  this.loading = true;
  this.customerService.getNewCustomerFilterByPages(page,pageSize,token).subscribe(
    (response) => {
      this.loading = false;
      if (response && response.data && response.data.results) {
        this.filteredNewCustomers  = response.data.results;
        this.totalRecords = response.data.count; 
      } else {
        this.filteredNewCustomers = []; 
        this.messageService.add({ severity: 'info', summary: 'No Data', detail: 'No new customer found.' });
      }
    },
    (error) => {
      this.loading = false;
      console.error('Error fetching new customer:', error); // Log the error
      this.filteredNewCustomers  = []; // Clear batches on error
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
        this. newCustomers = response.data?.results || [];
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
    this.isResetLoading=true;
    setTimeout(() => {
      this.isResetLoading=false;
      this.filterForm.reset();  // Reset the form fields
      this.filteredNewCustomers = [...this.newCustomers];  // Restore the original list
    },2000)
    
  }
  private isWithinDateRange(recordDate: string | Date, dateRange: [string, string]): boolean {
    const [startDate, endDate] = dateRange;
    const recordTime = new Date(recordDate).getTime();  
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
  
    return recordTime >= startTime && recordTime <= endTime;
  }

  showDetails(record: Customer) {
    const uid = record.uid; // Access uid directly from record
    this.selectedNewCustomer = { ...record }; // Set the selected customer
  }

  navigateToCustomerDetails(){
    this.isShowDetails=true;
    setTimeout(() => {
      this.isShowDetails=false;
       if (this.selectedNewCustomer) {
     //  this.showDetailsDialog = true; // Open the dialog
     this.router.navigate(['/app/customer-details', this.selectedNewCustomer.uid]);
    }
    },2000)
  
  }

  clear(table:Table) {
    table.clear();
  }

  onGlobalFilter(table:Table, event:Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


}
