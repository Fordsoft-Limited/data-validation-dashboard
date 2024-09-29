import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']  // Corrected this to 'styleUrls'
})
export class ReviewComponent implements OnInit {
  selectedRecords: any[] = [];
  currentRecord: any; // Use this to track the selected record
  currentIndex: number = 0;
  comments: string = '';
  rejectDialog: boolean = false;
  reviewDialog: boolean = false;
  rejectReason: string = '';
  statusCodes: any[] = []; // Array for status codes
  accountTypes: any[] = []; // Array for account types
  supplyTypes: any[] = []; // Array for supply types

  constructor(private router: Router) {}

  ngOnInit() {
    const state = history.state;
    if (state.selectedRecords) {
      this.selectedRecords = state.selectedRecords;
      this.currentRecord = this.selectedRecords[0]; // Display first record initially
    }
    this.initializeDropdowns();
  }



  // Method to initialize dropdown options
  initializeDropdowns(): void {
    // Populate the dropdowns with data
    this.statusCodes = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      // Add more status codes as necessary
    ];

    this.accountTypes = [
      { label: 'Residential', value: 'residential' },
      { label: 'Commercial', value: 'commercial' },
      // Add more account types as necessary
    ];

    this.supplyTypes = [
      { label: 'Single Phase', value: 'single-phase' },
      { label: 'Three Phase', value: 'three-phase' },
      // Add more supply types as necessary
    ];
  }
  // Navigate to next record
  nextRecord() {
    if (this.currentIndex < this.selectedRecords.length - 1) {
      this.currentIndex++;
      this.currentRecord = this.selectedRecords[this.currentIndex];
    }
  }

  // Navigate to previous record
  previousRecord() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentRecord = this.selectedRecords[this.currentIndex];
    }
  }

  // Approve record (opens review dialog)
  approveRecord() {
    this.reviewDialog = true;
  }

  // Reject record (opens reject dialog)
  rejectRecord(record: any) {
    this.currentRecord = record; // Set the current record to the one being rejected
    this.rejectDialog = true;
  }

  // Confirm Reject action
  confirmReject() {
    console.log('Rejected Reason:', this.rejectReason);
    this.rejectDialog = false;
    this.rejectReason = ''; // Clear the reject reason for next time
    this.nextRecord(); // Move to the next record after rejection
  }

  // Confirm Review action (Approve)
  confirmReview() {
    console.log('Review Comments:', this.comments);
    this.reviewDialog = false;
    this.comments = ''; // Clear comments for next review
    this.nextRecord(); // Move to the next record after review
  }

  // Cancel Reject dialog
  cancelReject() {
    this.rejectDialog = false;
  }

  // Cancel Review dialog
  cancelReview() {
    this.reviewDialog = false;
  }

  // Check if the current record is the first one
  isFirstRecord(): boolean {
    return this.currentIndex === 0;
  }

  // Check if the current record is the last one
  isLastRecord(): boolean {
    return this.currentIndex === this.selectedRecords.length - 1;
  }
}
