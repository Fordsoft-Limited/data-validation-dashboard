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
import { TreeNode } from 'primeng/api';

@Component({ 
  selector: 'app-approved-asset',
  templateUrl: './approved-asset.component.html',
  styleUrl: './approved-asset.component.scss',
  providers: [MessageService ]

})


export class ApprovedAssetComponent implements OnInit{
  approvedRecords !: any[];
  display: boolean = false;
  filteredRecords  : any[]=[];
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
  errorMessage:string =""
  selectedApprovedRecord: any | null = null
  totalRecords:number=0
  filterForm!: FormGroup;
  nodes: TreeNode[] = [];
  selectedNode: TreeNode | null = null;

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
   this.reload()

  }
reload(){
  this.loadCustomers(this.currentPage,this.pageSize)
}
openSearch() {
  this.showDetailsDialog = true;
}
filterApplied(response: any): void {
  this.filteredRecords = response?.results;
  this.totalRecords = response?.count;
}
onClearFilters(): void {
  this.reload()
}
onDialogClosed(event: boolean) {
  this.showDetailsDialog = event;
}


  handleNodeSelect(event: any) {
    const node = event.node;
    if (node.data?.method) {
      node.data.method(); 
    }
  }
  

  loadCustomers(page: number, pageSize: number): void {
    this.loading = true; 
    this.customerService.getCustomersWithApprovedOrRejectedStatus(page, pageSize)
    .subscribe(
      (response) => {
        this.filteredRecords =  response.data?.results || [];
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.loading = false;
      }
    );

  }

  showDetails(record: Customer) {
    // Implement the function to show record details
    this.selectedApprovedRecord = {...record};
    
    console.log('Record details:', record);

  }

  viewDetails(record: any): void {
    this.router.navigate(['/app/customer-details', record.uid]); // Pass the record ID or unique identifier as a route parameter
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