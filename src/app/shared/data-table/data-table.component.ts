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

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  globalFilterFields: string[] = [];

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
}
