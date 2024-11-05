import { Component ,OnInit} from '@angular/core';
import { ApprovedRecord } from './model/approved';
import { ApprovedAssetService } from './service/approved-asset.service';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from '../../shared/model/customer';
//import { CustomerService } from '../../shared/services/customer.service';
import { CustomerService } from '../../api/customer.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../shared/services/loading.service';
import { Location } from '@angular/common';
import { AuthService } from '../../auth/service/auth.service';
@Component({ 
  selector: 'app-approved-asset',
  templateUrl: './approved-asset.component.html',
  styleUrl: './approved-asset.component.scss'
})
export class ApprovedAssetComponent implements OnInit{
  approvedRecords !: any[];

  filteredRecords  : any[]=[];

  loading: boolean = false;

  isFilterLoading: boolean = false;
  isResetLoading: boolean = false;
  currentPage: number = 1;
  pageSize : number = 20;
  isShowDetails:boolean = false;

  searchValue: string = '';

  showDetailsDialog: boolean = false;

  selectedApprovedRecord: any | null = null

  filterForm!: FormGroup;
  feeders = [{ label: 'Feeder 1', value: 'Feeder1' }, { label: 'Feeder 2', value: 'Feeder2' }];  // Example data
  businessUnits = [{ label: 'Business Unit 1', value: 'Business Unit 1' }, { label: 'Business Unit 2', value: 'Business Unit 2' }]; // Example data
  regions =[{label: 'Region 1', value: 'Region1'}, { label: 'Region 2', value: 'Region2' }];

    constructor(private authService: AuthService ,private fb: FormBuilder, private customerService:CustomerService,private router: Router,  private loadingService: LoadingService){

    }
  ngOnInit(): void {
   // this.loadData();

   this.filterForm = this.fb.group({
    dateRange: [''],
    feeder: [''],
    businessUnit: [''],
    region:['']
  });

  // const token = this.authService.getToken();
   

  // this.customerService.getCustomer().then((data) => {
  //   this.approvedRecords = data;
  //   this.filteredRecords = data; // Initially display all records
  //   this.loading = false;
  // });

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
}