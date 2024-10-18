import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataValidation } from '../model/bulk-validation';
import { DataValidationService } from '../service/data-validation.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Customer } from '../../../shared/model/customer';
import { CustomerService } from '../../../shared/services/customer.service';
@Component({
  selector: 'app-data-verification',
  templateUrl: './data-verification.component.html',
  styleUrls: ['./data-verification.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DataVerificationComponent implements OnInit {

  // selectedRecords: any[] = [];
  // currentRecord: any; // Use this to track the selected record
  selectedRecords: Customer[] = []; // Change type to DataValidation
  currentRecord!: Customer ;
  currentIndex: number = 0;
  comments: string = '';
  rejectDialog: boolean = false;
  reviewDialog: boolean = false;
  rejectReason: string = '';
  statusCodes: any[] = []; // Array for status codes
  accountTypes: any[] = []; // Array for account types
  supplyTypes: any[] = []; // Array for supply types
  currentTariffCode:any[]=[];
  tariffCode:any[]=[];
  correctTariffCode:any[]=[];
  customerHasMeter:any[]=[];
  accountCategory:any[]=[];
  connectionType:any[]=[];
  customerMeterCategory:any[]=[];
  meterLocation:any[]=[];
  customerMeterAccessible:any[]=[];
  customerMeterSealed:any[]=[];
  customerHasAccountNo:any[]=[];
  customerGroup:any[]=[];
  isLandlord:any[]=[];



  constructor(private router: Router,
    private dataValidationService: DataValidationService ,private confirmationService: ConfirmationService, private messageService: MessageService, private  customerService:CustomerService) {
    
  
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to approve the selected record?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}

confirm2(event: Event) {
  this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to reject the selected record??',
      header: 'Reject Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
  });
}
  onRecordSelect(selectedRecord: any) {
    this.currentRecord = selectedRecord; // Set the current record to the selected one
  }
  ngOnInit() {
    // const state = history.state;
    // if (state.selectedRecords) {
    //   this.selectedRecords = state.selectedRecords;
    //   this.currentRecord = this.selectedRecords[0]; // Display the first record initially
    // }
    this.customerService.getCustomer().then((data) => {
      this.selectedRecords = data;
      this.currentRecord = this.selectedRecords[0] || null; // Display the first record initially
    });
    this.initializeDropdowns();
  }

  initializeDropdowns(): void {
    // Populate the dropdowns with data
    this.statusCodes = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Suspended', value: 'suspended' },
      { label: 'Close', value: 'close' },
    ];

    this.currentTariffCode =[
      {label: 'R1',value: 'r1'},
      {label: 'R2',value: 'r2'},
      {label: 'R3',value: 'r3'},
      {label: 'C1',value: 'c1'},
      {label: 'C2',value: 'c2'},
      {label: 'C3',value: 'c3'},
      {label: 'D1',value: 'd1'},
      {label: 'D2',value: 'd2'}
    ];
    this.correctTariffCode=[
      {label: 'R1',value: 'r1'},
      {label: 'R2',value: 'r2'},
      {label: 'R3',value: 'r3'},
      {label: 'C1',value: 'c1'},
      {label: 'C2',value: 'c2'},
      {label: 'C3',value: 'c3'},
      {label: 'D1',value: 'd1'},
      {label: 'D2',value: 'd2'}
    ];

    this.tariffCode =[
      {label: 'LFN',value: 'lfm'},
      {label: 'NMD', value: 'nmd'},
      {label: 'MD1', value: 'md1'},
      {label: 'MD2', value: 'md2'},
      {label: 'MD3', value: 'md3'},
    ];
    this.isLandlord=[
      {label: 'Yes',value: 'yes'},
      {label: 'No',value: 'no'}
    ];
    this.customerHasMeter=[
      {label: 'Yes',value: 'yes'},
      {label: 'No',value: 'no'},
    ];
    this.connectionType = [
      { label: 'Metered', value:'metered'},
      {label:'Unmetered', value:'unmetered'}
    ];

    this.accountCategory = [
      {label: 'Resident', value:'resident'},
      {label:'Commercial', value:'commercial'}
    ];

    this.customerMeterCategory=[
      {label: 'Prepaid Wall-mounted', value:'prepaid-wall-mounted'},
      {label:'Prepaid Pole-mounted', value:'prepaid-pole'},
      {label:'Postpaid-Electronic', value:'postpaid-electronic'},
      {label:'Postpaid Digital', value:'postpaid-digital'}
    ];

    this.customerMeterSealed= [
      {label: 'Yes',value: 'yes'},
      {label: 'No',value: 'no'},
    ];

    this.customerMeterAccessible=[
      {label: 'Yes',value: 'yes'},
      {label: 'No',value: 'no'},
    ];

    this.customerHasAccountNo=[
      {label: 'Yes',value: 'yes'},
      {label: 'No',value: 'no'},
    ];
    this.meterLocation=[
      {label:'Indoor',value: 'indoor'},
      {label: 'Outdoor',value: 'outdoor'},
    ];
    this.customerGroup=[
      {label:'New',value: 'new'},
      {label: 'Existing',value: 'existing'},
      {label:'Potential',value: 'potential'},
    ]

    this.accountTypes = [
      { label: 'PostPaid', value: 'postpaid' },
      { label: 'PrePaid', value: 'prepaid' },
    ];

    this.supplyTypes = [
      { label: 'Single Phase', value: 'single-phase' },
      { label: 'Three Phase', value: 'three-phase' },
    ];
  }

  nextRecord() {
    if (this.currentIndex < this.selectedRecords.length - 1) {
      this.currentIndex++;
      this.currentRecord = this.selectedRecords[this.currentIndex];
    }
  }
  // reviewRecord() {
  //   this.reviewRecord = true;
  // }
  previousRecord() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentRecord = this.selectedRecords[this.currentIndex];
    }
  }

  approveRecord() {
    this.reviewDialog = true;
  }

  rejectRecord() {
    // this.selectedRecords = this.currentRecord; // Set the current record to the one being rejected
    this.rejectDialog = true;
  }

  confirmReject() {
    console.log('Rejected Reason:', this.rejectReason);
    this.rejectDialog = false;
    this.rejectReason = ''; // Clear the reject reason for the next time
    this.nextRecord(); // Move to the next record after rejection
  }

  confirmReview() {
    console.log('Review Comments:', this.comments);
    this.reviewDialog = false;
    this.comments = ''; // Clear comments for the next review
    this.nextRecord(); // Move to the next record after review
  }

  cancelReject() {
    this.rejectDialog = false;
  }

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
