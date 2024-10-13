import { Component ,OnInit} from '@angular/core';
import { ApprovedRecord } from './model/approved';
import { ApprovedAssetService } from './service/approved-asset.service';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-approved-asset',
  templateUrl: './approved-asset.component.html',
  styleUrl: './approved-asset.component.scss'
})
export class ApprovedAssetComponent implements OnInit{
  approvedRecords !: ApprovedRecord[];

  filteredRecords  : ApprovedRecord[]=[];

  loading: boolean = true;

  searchValue: string = '';

  showDetailsDialog: boolean = false;

  selectedApprovedRecord: ApprovedRecord | null = null

  filterForm!: FormGroup;
  feeders = [{ label: 'Feeder 1', value: 'Feeder 1' }, { label: 'Feeder 2', value: 'Feeder 2' }];  // Example data
  businessUnits = [{ label: 'Business Unit 1', value: 'Business Unit 1' }, { label: 'Business Unit 2', value: 'Business Unit 2' }]; // Example data

    constructor(private approvedAssetService:ApprovedAssetService ,private fb: FormBuilder){

    }
  ngOnInit(): void {
   // this.loadData();

   this.filterForm = this.fb.group({
    dateRange: [''],
    feeder: [''],
    businessUnit: ['']
  });

  this.approvedAssetService.getRecord().then((data) => {
    this.approvedRecords = data;
    this.filteredRecords = data; // Initially display all records
    this.loading = false;
  });
  }


  filterData() {
    const { dateRange, feeder, businessUnit } = this.filterForm.value;

    this.filteredRecords = this.approvedRecords.filter(record => {
      const matchesFeeder = feeder ? record.feeder === feeder : true;
      const matchesBusinessUnit = businessUnit ? record.businessUnit === businessUnit : true;
      
      // Assuming dateRange is an array with [startDate, endDate]
      const matchesDateRange = dateRange ? this.isWithinDateRange(record.dateApproved, dateRange) : true;

      return matchesFeeder && matchesBusinessUnit && matchesDateRange;
    });
  }
  resetFilter() {
    this.filterForm.reset();  // Reset the form fields
    this.filteredRecords = [...this.approvedRecords];  // Restore the original list
  }

  private isWithinDateRange(recordDate: string | Date, dateRange: [string, string]): boolean {
    const [startDate, endDate] = dateRange;
    const recordTime = new Date(recordDate).getTime();  
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
  
    return recordTime >= startTime && recordTime <= endTime;
  }
  
  showDetails(record: ApprovedRecord) {
    // Implement the function to show record details
    this.selectedApprovedRecord = {...record};

    console.log('Record details:', record);

  }
  openDialog() {
    if (this.selectedApprovedRecord) {
      this.showDetailsDialog = true; // Open the dialog
    }
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
}
 


