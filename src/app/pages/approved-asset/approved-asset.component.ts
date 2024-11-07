import { Component ,OnInit} from '@angular/core';
import { ApprovedRecord } from './model/approved';
import { ApprovedAssetService } from './service/approved-asset.service';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from '../../shared/model/customer';
import { CustomerService } from '../../api/customer.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../shared/services/loading.service';
import { Location } from '@angular/common';
import { AuthService } from '../../auth/service/auth.service';
import { CUSTOMER_REGION } from '../../shared/constants';
import { MessageService } from 'primeng/api';

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
  selector: 'app-approved-asset',
  templateUrl: './approved-asset.component.html',
  styleUrl: './approved-asset.component.scss',
  providers: [MessageService ]

})


export class ApprovedAssetComponent implements OnInit{
  approvedRecords !: any[];

  filteredRecords  : any[]=[];
  regions: DropdownOption[] = [];
  businessUnits: DropdownOption[] = [];
  feeders: DropdownOption[] = [];  
  loading: boolean = false;
  isFilterLoading: boolean = false;
  isResetLoading: boolean = false;
  currentPage: number = 1;
  pageSize : number = 20;
  isShowDetails:boolean = false;
  uploadedFiles: any[] = [];
  searchValue: string = '';
  errorLogs: string[] = [];
  uploading: boolean = false;
  hasErrors: boolean = false;
  showDetailsDialog: boolean = false;
  exportLoading = false;
  selectedApprovedRecord: any | null = null

  filterForm!: FormGroup;
  
    constructor(private authService: AuthService ,private fb: FormBuilder, private customerService:CustomerService,private router: Router,  private loadingService: LoadingService,
      private messageService: MessageService
    ){
      this.filterForm = this.fb.group({
        dateRange: [],
        feeder: [],
        businessUnit: [],
      });
    }
  ngOnInit(): void {
   // this.loadData();

   this.filterForm = this.fb.group({
    region: [null],
    businessUnit: [null],
    feeder: [null]
  });

  this.regions = CUSTOMER_REGION.map(region => ({
    label: region.name,  // Display the region name
    value: region        // Store the entire region object as value
  }));


  this.loadCustomers(this.currentPage,this.pageSize)
  }

  loadCustomers(page: number, pageSize: number): void {
    const token = this.authService.getToken();
    console.log(token);
    
    if (!token) {
      this.loading = false;
    //  this.errorMessage = 'No authentication token found. Please log in again.';
      return; // Exit the function early
    }
  
    this.loading = true; 
    this.customerService.getCustomersWithApprovedOrRejectedStatus(page, pageSize, token)
    .subscribe(
      (response) => {
        this.approvedRecords =  response.data?.results || [];;
        this.filteredRecords =  [...this.approvedRecords]; // Initially display all records
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.loading = false;
      }
    );

  }


  filterData() {
    this.loading=true;
    const { dateRange, feeder, businessHub,region } = this.filterForm.value;

    setTimeout(() => {
      this.loading=false;
    this.filteredRecords = this.approvedRecords.filter(record => {
      const matchesFeeder = feeder ? record.feeder === feeder : true;
      const matchesBusinessUnit = businessHub ? record.businessHub === businessHub : true;
      const matchesRegion = region ? record.region === region : true;
      
      // Assuming dateRange is an array with [startDate, endDate]
      const matchesDateRange = dateRange ? this.isWithinDateRange(record.dateApproved, dateRange) : true;

      return matchesFeeder && matchesBusinessUnit && matchesDateRange && matchesRegion;
    });
    },2000)

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
      this.filteredRecords = [...this.approvedRecords];  // Restore the original list
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
    // Implement the function to show record details
    this.selectedApprovedRecord = {...record};
    
    console.log('Record details:', record);

  }
  openDialog() {
    this.isShowDetails=true;
    setTimeout(() => {
      this.isShowDetails=false;
       if (this.selectedApprovedRecord) {
     //  this.showDetailsDialog = true; // Open the dialog 
     this.router.navigate(['/app/customer-details', this.selectedApprovedRecord.uid]);
    }
    },2000)
   
  }
  
  
  closeDialog() {
    this.showDetailsDialog = false;
  }

  clear(table:Table) {
    table.clear();
  }

  navigateToDetails() {
    // Implement navigation to details view
    console.log('Navigating to details...');
  }

  onGlobalFilter(table:Table, event:Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getSeverity(approval_status?: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (approval_status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'danger';
      default:
        return 'info';
    }
  }


  convertToCSV(filteredRecords: any[]): string {
    const header = 'Customer No,Customer Name,Feeder,Status,Date Captured,Date Modified\n';
  
    const rows = filteredRecords.map(record => {
      // Format dates if needed (e.g., MM/dd/yyyy)
      const dateCaptured = record.date_created ? new Date(record.date_created).toLocaleDateString('en-US') : '';
      const dateModified = record.last_modified ? new Date(record.last_modified).toLocaleDateString('en-US') : '';
      
      // Return a CSV row as a string
      return `${record.customer_no},${record.customer_full_name},${record.feeder},${record.approval_status},${dateCaptured},${dateModified}`;
    }).join('\n');
    
    return header + rows;
  }
  
  
  

  exportData() {
    this.exportLoading = true;
  
    // Simulate loading delay (if needed) and then proceed to export
    setTimeout(() => {
      this.exportLoading = false;
      
      // Convert filtered records to CSV string
      const csvContent = this.convertToCSV(this.filteredRecords);
      
      // Create a Blob for the CSV content
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      
      // Create a link element to download the CSV file
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', 'approved_assets.csv'); // Set file name for the download
      link.style.visibility = 'hidden';
      
      // Append the link to the document, click it to start the download, and then remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2000); // Simulate a loading delay (if needed)
  }
  
}