import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from '../../shared/model/customer';
import { CustomerService } from '../../shared/services/customer.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.scss' 
})
export class NewCustomerComponent implements OnInit {
  newCustomers !: Customer[];

  filteredNewCustomers  : Customer[]=[];

  loading: boolean = false;

  isFilterLoading: boolean = false;
  isResetLoading: boolean = false;

  isShowDetails:boolean = false;

  searchValue: string = '';

  showDetailsDialog: boolean = false;

  selectedNewCustomer: Customer | null = null

  filterForm!: FormGroup;
  feeders = [{ label: 'Feeder 1', value: 'Feeder1' }, { label: 'Feeder 2', value: 'Feeder2' }];  // Example data
  businessUnits = [{ label: 'Business Unit 1', value: 'Business Unit 1' }, { label: 'Business Unit 2', value: 'Business Unit 2' }];
  regions =[{label: 'Region 1', value: 'Region1'}, { label: 'Region 2', value: 'Region2' }];

  constructor( private fb: FormBuilder, private customerService:CustomerService,private router: Router,  ){

  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      dateRange: [''],
      feeder: [''],
      businessUnit: [''],
      region:['']
    });

    this.customerService.getCustomer().then((data) => {
      this.newCustomers = data;
      this.filteredNewCustomers = data; // Initially display all records
      this.loading = false;
    });
  }

  

  filterData() {
    this.loading = true;
    const { dateRange, feeder, businessHub, region } = this.filterForm.value;
  
    setTimeout(() => {
      this.loading = false;
      this.filteredNewCustomers = this.newCustomers.filter(record => {
        const matchesFeeder = feeder ? record.feeder === feeder : true;
        const matchesBusinessUnit = businessHub ? record.businessHub === businessHub : true;
        const matchesRegion = region ? record.region === region : true; // Add region filtering
  
        // Assuming dateRange is an array with [startDate, endDate]
        const matchesDateRange = dateRange ? this.isWithinDateRange(record.dateApproved, dateRange) : true;
  
        return matchesFeeder && matchesBusinessUnit && matchesRegion && matchesDateRange;
      });
    }, 2000);
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
    // Implement the function to show record details
    this.selectedNewCustomer = {...record};

  }

  navigateToCustomerDetails(){
    this.isShowDetails=true;
    setTimeout(() => {
      this.isShowDetails=false;
       if (this.selectedNewCustomer) {
     //  this.showDetailsDialog = true; // Open the dialog
     this.router.navigate(['/app/customer-details', this.selectedNewCustomer.id]);
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