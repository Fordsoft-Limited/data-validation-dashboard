import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Customer } from '../../shared/model/customer';
//import { CustomerService } from '../../shared/services/customer.service';
import { CustomerService } from '../../api/customer.service';
import { validateCustomer } from '../../model/customer';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-data-validation',
  templateUrl: './data-validation.component.html',
  styleUrl: './data-validation.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class DataValidationComponent implements OnInit {
  customers!: any[];
  filteredCustomers: any[] = [];
  selectedCustomers: any[] = [];

  loading: boolean = false;
  statuses!: any[];

  searchValue: string = '';
  showDetailsDialog: boolean = false;
  selectedCustomer: any  | null = null;
  comments: string = '';
  errorMessage: string = "";
  filterForm!: FormGroup;
  currentPage: number = 1;
  pageSize : number = 20;
  feeders: string[] = ['Feeder1', 'Feeder2', 'Feeder3'];
  businessUnits: string[] = ['Hub1', 'Hub2', 'Hub3'];

  @ViewChild('filter') filter!: ElementRef;

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
  
    this.customerService.getCustomersWithAwaitingReview(page, pageSize, token).subscribe(
      (response) => {
        console.log('Data loaded:', response); // Debugging check
        this.customers = response.data?.results || []; // Handle cases where results might be undefined
        this.filteredCustomers = [...this.customers]; // Keep a copy for filtering
        this.loading = false; // Stop loading
      },
      (error) => {
        console.error('Error loading customers:', error);
        this.errorMessage = 'Failed to load customers. Please try again later.'; // Set error message
        this.loading = false; // Stop loading
        // Optional: Notify the user of the error using MessageService
        // this.messageService.add({ severity: 'error', summary: 'Error', detail: this.errorMessage });
      }
    );
  }
  
  
  
  applyStatusFilter() {
    // Filter customers based on status
    this.filteredCustomers = this.customers.filter(
      customer => customer.aproval_status === 'Awaiting Review'
    );
  }
  filterData() {
    this.loading = true;
    const { dateRange, feeder, businessUnit } = this.filterForm.value;

    setTimeout(() => {
      this.loading = false;
      this.filteredCustomers = this.customers.filter((item) => {
        const withinDateRange =
          dateRange && dateRange.length === 2
            ? item.date_created
              ? new Date(item.date_created) >= dateRange[0] && new Date(item.date_created) <= dateRange[1]
              : false
            : true;
        const matchesFeeder = feeder ? item.feeder === feeder : true;
        const matchesBusinessUnit = businessUnit ? item.business_hub === businessUnit : true;

        return withinDateRange && matchesFeeder && matchesBusinessUnit;
      });
    }, 2000);
  }

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
      this.router.navigate(['app/data-validation/data-verification'], {
        state: { selectedCustomers: this.selectedCustomers }
      });
    }, 2000);
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

  // rejectRecord() {
  //   if (this.selectedCustomer) {
  //     this.selectedCustomer.status = 'Rejected';
  //     this.selectedCustomer.comments = this.comments;
  //   }
  // }

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

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
    this.searchValue = '';
  }

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
