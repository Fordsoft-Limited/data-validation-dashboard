import { Component ,OnInit, ViewChild,ElementRef } from '@angular/core';
import { DataValidation } from './model/bulk-validation';
import { DataValidationService } from './service/data-validation.service';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
//import { ImportsModule } from './imports';


@Component({
  selector: 'app-data-validation',
  templateUrl: './data-validation.component.html',
  styleUrl: './data-validation.component.scss',

})
export class DataValidationComponent implements OnInit {

  @ViewChild('filter') filter!: ElementRef;

  dataValidations!:DataValidation[];

  filteredDataValidations: DataValidation[] = [];

  loading: boolean = true;

  statuses!: any[];

  searchValue: string = '';

  showDetailsDialog: boolean = false;

  selectedDataValidation: DataValidation | null = null;

  comments: string = '';

  filterForm!: FormGroup;

   // Sample feeders and business units
   feeders: string[] = ['Feeder1', 'Feeder2', 'Feeder3'];
   businessUnits: string[] = ['Hub1', 'Hub2', 'Hub3'];

  constructor(private dataValidationService: DataValidationService, private fb: FormBuilder,private router: Router) {
    this.filterForm = this.fb.group({
      dateRange: [],
      feeder: [],
      businessUnit: [],
    });

    
  }

  

  ngOnInit() {
    this.loadData();
  }

 



  loadData() {
    this.dataValidationService.getValidation().then(data => {
      // Set status to Pending by default if not set
      this.dataValidations = data.map(item => ({
        ...item,
        status: item.status || 'Pending', // Set default status
        comments: item.comments || '' // Set default comments
      }));
      this.filteredDataValidations = this.dataValidations; 
      this.loading = false;
    });
  }
  filterData() {
    const { dateRange, feeder, businessUnit } = this.filterForm.value;

    this.filteredDataValidations = this.dataValidations.filter((item) => {
      const withinDateRange =
  dateRange && dateRange.length === 2
    ? item.date
      ? new Date(item.date) >= dateRange[0] && new Date(item.date) <= dateRange[1]
      : false // If item.date is undefined, this item should not match
    : true;
      const matchesFeeder = feeder ? item.feeder === feeder : true;
      const matchesBusinessUnit = businessUnit ? item.businessHub === businessUnit : true;

      return withinDateRange && matchesFeeder && matchesBusinessUnit;
    });
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
        (event.target as HTMLInputElement).value,
        'contains'
    );
}

showDetails(dataValidation: DataValidation) {
  this.selectedDataValidation = { ...dataValidation }; // Clone the object
  this.comments = this.selectedDataValidation.comments ?? '';// Load existing comments
  //this.navigateToDetail(dataValidation);
 // this.showDetailsDialog = true;
}
// navigateToDetail(selectedRecord: any) {
//   this.router.navigate(['/data-verification', selectedRecord.id]); // Adjust the path and parameter as needed
// }
navigateToDetails() {
  this.router.navigate(['app/data-validation/data-verification']);
}

openDialog() {
  if (this.selectedDataValidation) {
    this.showDetailsDialog = true; // Open the dialog
  }
}




approveRecord() {
  if (this.selectedDataValidation) {
    this.selectedDataValidation.status = 'Approved'; // Set status to Approved
    this.selectedDataValidation.comments = this.comments; // Set comments
  }
}

rejectRecord() {
  if (this.selectedDataValidation) {
    this.selectedDataValidation.status = 'Rejected'; // Set status to Rejected
    this.selectedDataValidation.comments = this.comments; // Set comments
  }
}
nextRecord() {
    const currentIndex = this.dataValidations.findIndex(
      (item) => item.id === this.selectedDataValidation?.id
    );
    if (currentIndex < this.dataValidations.length - 1) {
      this.selectedDataValidation = this.dataValidations[currentIndex + 1];
    }
  }

  previousRecord() {
    const currentIndex = this.dataValidations.findIndex(
      (item) => item.id === this.selectedDataValidation?.id
    );
    if (currentIndex > 0) {
      this.selectedDataValidation = this.dataValidations[currentIndex - 1];
    }
  }


  closeDialog() {
    this.showDetailsDialog = false;
  }


  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
    this.searchValue = '';
}

// In your data-validation.component.ts

isPreviousDisabled(): boolean {
  return !this.selectedDataValidation || 
         this.dataValidations.findIndex(item => item.id === this.selectedDataValidation?.id) === 0;
}

isNextDisabled(): boolean {
  return !this.selectedDataValidation || 
         this.dataValidations.findIndex(item => item.id === this.selectedDataValidation?.id) === this.dataValidations.length - 1;
}



getSeverity(status?: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
  switch (status) {
    case 'Approved':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Rejected':
      return 'danger';
    default:
      return 'info'; 
  }
}

}