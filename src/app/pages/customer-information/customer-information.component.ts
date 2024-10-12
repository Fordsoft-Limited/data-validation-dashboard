import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerInformation } from './model/customer-information';
import { CustomerInformationService } from './service/customer-infomation.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.scss'],
  providers: [ConfirmationService, MessageService]

})
export class CustomerInformationComponent implements OnInit {

  selectedRecords: CustomerInformation[] = []; // Change type to DataValidation
  currentRecord!: CustomerInformation ;
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
  searchValue: string = ''; 

  
  @ViewChild('filter') filter!: ElementRef;


  constructor(private customerInformationService: CustomerInformationService ,  private confirmationService: ConfirmationService, private messageService: MessageService) {}




  onRecordSelect(selectedRecord: any) {
    this.currentRecord = selectedRecord; // Set the current record to the selected one
  }
  ngOnInit() {
    this.customerInformationService.getValidation().then((data) => {
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


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
        (event.target as HTMLInputElement).value,
        'contains'
    );
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

  

  // Check if the current record is the first one
  isFirstRecord(): boolean {
    return this.currentIndex === 0;
  }

  // Check if the current record is the last one
  isLastRecord(): boolean {
    return this.currentIndex === this.selectedRecords.length - 1;
  }

  
}
