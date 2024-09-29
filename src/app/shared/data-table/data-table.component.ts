import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() headers: any[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() globalFilter: any;
  @Input() selectedRecords: any[] = []; // Input to track selected records

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() selectedRecordsChange = new EventEmitter<any[]>(); // Emit changes to selected records

  globalFilterFields: string[] = [];

  ngOnInit() {
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

  // Handle record selection
  onRowSelect(event: any) {
    this.selectedRecordsChange.emit(this.selectedRecords); // Emit the selected records back to the parent
  }

  onRowUnselect(event: any) {
    this.selectedRecordsChange.emit(this.selectedRecords); // Emit the unselected records back to the parent
  }
}
