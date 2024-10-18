import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

  tableHeaders = [
    { field: 'name', label: 'Name', minWidth: '150px' },
    { field: 'date', label: 'Date', minWidth: '120px' },
    { field: 'status', label: 'Status', status: true, minWidth: '100px' },
    { field: 'actions', label: 'Actions', isAction: true, minWidth: '150px' }
  ];

  tableData = [
    { name: 'Chukwuemeka', date: new Date(), status: 'Active' },
    { name: 'Ifeoma', date: new Date(), status: 'Inactive' },
    { name: 'Abimbola', date: new Date(), status: 'Pending' }
  ];

  isLoading = false;


  handleEdit(row: any) {
    console.log('Editing row:', row);
    // Add your edit logic here (e.g., open an edit modal)
  }

  // Handle delete event
  handleDelete(row: any) {
    console.log('Deleting row:', row);
    // Add your delete logic here (e.g., confirm deletion and update the data array)
  }

}
