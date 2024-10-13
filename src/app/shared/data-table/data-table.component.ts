import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements OnInit {
  @Input() headers: any[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() globalFilter: any;
  @Input() rowsPerPage: number = 10; // Default number of rows per page
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onBulkDelete = new EventEmitter<any[]>();
  globalFilterFields: string[] = [];
  selectedRows: any[] = []; // Stores selected rows

  ngOnInit() {
    // Initialize the globalFilterFields property by extracting fields from headers
    this.globalFilterFields = this.headers.map(header => header.field);
  }

  // Trigger edit event
  edit(row: any) {
    this.onEdit.emit(row);
  }

  // Trigger delete event
  delete(row: any) {
    this.onDelete.emit(row);
  }

  getSeverity(status?: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'Approved':
      case 'Active':
        return 'success';
      case 'Inactive':
      case 'Rejected':
        return 'danger';
      case 'Pending':
        return 'warning';
      default:
        return 'info'; 
    }
  }
}
