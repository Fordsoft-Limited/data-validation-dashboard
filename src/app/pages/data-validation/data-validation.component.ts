import { Component ,OnInit, ViewChild,ElementRef } from '@angular/core';
import { DataValidation } from './model/bulk-validation';
import { DataValidationService } from './service/data-validation.service';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-data-validation',
  templateUrl: './data-validation.component.html',
  styleUrl: './data-validation.component.scss'
})
export class DataValidationComponent implements OnInit {

  @ViewChild('filter') filter!: ElementRef;

  dataValidations!:DataValidation[];

  loading: boolean = true;

  statuses!: any[];

  searchValue: string = '';

  showDetailsDialog: boolean = false;

  selectedDataValidation: DataValidation | null = null;

  comments: string = '';

  constructor(private dataValidationService: DataValidationService) {}

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
      this.loading = false;
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
 // this.showDetailsDialog = true;
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
