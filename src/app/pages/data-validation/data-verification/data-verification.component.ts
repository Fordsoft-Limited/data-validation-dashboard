import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataValidation } from '../model/bulk-validation';
import { DataValidationService } from '../service/data-validation.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Customer } from '../../../shared/model/customer';
//import { CustomerService } from '../../../shared/services/customer.service';
import { CustomerService } from '../../../api/customer.service';
import { AuthService } from '../../../auth/service/auth.service';
import { Token } from '@angular/compiler';
import { customerApproveOrReject } from '../../../model/customer';

interface RecordData {
  newData: any;
  oldData: any;
}
@Component({
  selector: 'app-data-verification',
  templateUrl: './data-verification.component.html',
  styleUrls: ['./data-verification.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class DataVerificationComponent implements OnInit {
  // selectedRecords: any[] = [];
  // currentRecord: any; // Use this to track the selected record
  selectedRecords: any[] = [];
  currentRecord!: {
    newData: any;
    oldData: any;
  };
  currentIndex: number = 0;

  comments: string = ' Well done ';
  rejectDialog: boolean = false;
  reviewDialog: boolean = false;
  rejectReason: string = '';
  currentNewData: any;
  statusCodes: any[] = []; // Array for status codes
  accountTypes: any[] = []; // Array for account types
  supplyTypes: any[] = []; // Array for supply types
  currentTariffCode: any[] = [];
  tariffCode: any[] = [];
  correctTariffCode: any[] = [];
  customerHasMeter: any[] = [];
  accountCategory: any[] = [];
  connectionType: any[] = [];
  customerMeterCategory: any[] = [];
  meterLocation: any[] = [];
  customerMeterAccessible: any[] = [];
  customerMeterSealed: any[] = [];
  customerHasAccountNo: any[] = [];
  customerGroup: any[] = [];
  isLandlord: any[] = [];

  constructor(
    private router: Router,
    private dataValidationService: DataValidationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private customerService: CustomerService,
    private authService: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.selectedRecords =
      navigation?.extras.state?.['selectedCustomers'] || [];
    // for (let i = 0; i < this.selectedRecords.length;i++){
    //   this.currentRecord = this.selectedRecords[i] || null;
    // }
  }

  get totalSelectedRecords(): number {
    return this.selectedRecords.length;
  }

  // confirm1(event: Event) {
  //   this.confirmationService.confirm({
  //     target: event.target as EventTarget,
  //     message: 'Are you sure you want to approve the selected record?',
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     acceptIcon: 'none',
  //     rejectIcon: 'none',
  //     rejectButtonStyleClass: 'p-button-text',
  //     accept: () => {
  //       this.messageService.add({
  //         severity: 'info',
  //         summary: 'Confirmed',
  //         detail: 'You have accepted',
  //       });
  //     },
  //     reject: () => {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Rejected',
  //         detail: 'You have rejected',
  //         life: 3000,
  //       });
  //     },
  //   });
  // }



  confirm1(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to approve the selected record?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'none',
        rejectIcon: 'none',
        rejectButtonStyleClass: 'p-button-text',
        accept: () => {
            const token = this.authService.getToken();

            if (!token) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Authorization Error',
                    detail: 'Authentication token is missing. Please log in again.',
                });
                return;
            }

            // Define payload based on the current record
            const updatePayload: customerApproveOrReject = {
                uid: this.currentRecord.newData.uid,  // Double-check this field name
                approval_status: 'Approved',
                approval_comments: this.comments,
            };

            console.log("Payload being sent:", updatePayload); // Debugging line

            this.customerService.customerApproveOrReject(updatePayload, token).subscribe(
                (response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Record Approved',
                        detail: 'Customer record has been approved.',
                    });
                    this.nextRecord(); 

                    this.selectedRecords = this.selectedRecords.filter(
                      record => record.uid !== this.currentRecord.newData.uid
                  );
                },
                (error) => {
                    console.error('Error response:', error); // Log detailed error response
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.error.errorMessage ? JSON.stringify(error.error.errorMessage) : 'There was an error updating the customer approval.',
                    });
                }
            );
        },
        reject: () => {
            this.messageService.add({
                severity: 'error',
                summary: 'Rejected',
                detail: 'You have rejected the record.',
                life: 3000,
            });
        },
    });
}

  
  nextRecord() {
    if (this.currentIndex < this.selectedRecords.length - 1) {
      this.currentIndex++;
      const uid = this.selectedRecords[this.currentIndex].uid;
      this.loadCustomerByUid(uid); // Load new customer data by UID
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'End of List',
        detail: 'No more records to approve.',
      });
    }
  }
  
  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to reject the selected record??',
      header: 'Reject Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        const token = this.authService.getToken();

        if (!token) {
            this.messageService.add({
                severity: 'error',
                summary: 'Authorization Error',
                detail: 'Authentication token is missing. Please log in again.',
            });
            return;
        }

        // Define payload based on the current record
        const updatePayload: customerApproveOrReject = {
            uid: this.currentRecord.newData.uid,  // Double-check this field name
            approval_status: 'Rejected',
            approval_comments: this.comments,
        };

        console.log("Payload being sent:", updatePayload); // Debugging line

        this.customerService.customerApproveOrReject(updatePayload, token).subscribe(
            (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Record Approved',
                    detail: 'Customer record has been approved.',
                });
                this.nextRecord(); 
                this.selectedRecords = this.selectedRecords.filter(
                  record => record.uid !== this.currentRecord.newData.uid
              );
            },
            (error) => {
                console.error('Error response:', error); // Log detailed error response
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.error.errorMessage ? JSON.stringify(error.error.errorMessage) : 'There was an error updating the customer approval.',
                });
            }
        );
    },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  ngOnInit() {
    console.log('Selected Customers:', this.selectedRecords);
    this.initializeDropdowns();
    if (this.selectedRecords.length > 0) {
      this.loadCustomerByUid(this.selectedRecords[this.currentIndex].uid);
    }
    console.log(this.currentIndex);
  }
  loadCustomerByUid(uid: string) {
    const token = this.authService.getToken();
    if (!token) {
      //  this.errorMessage = 'No authentication token found. Please log in again.';
      return; // Exit the function early
    }

    this.customerService.getCustomerById(uid, token).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.currentRecord = {
            newData: response.data.new,
            oldData: response.data.old,
          };
        }
        console.log(this.currentRecord.newData.customer_full_name);
      },
      (error) => {
        console.error('Error fetching customer data:', error);
      }
    );
  }

  // onRecordSelect(selectedRecord: any) {
  //   this.currentRecord = selectedRecord;
  //   console.log('Selected Record:', this.currentRecord);
  //   if (this.currentRecord) {
  //     console.log(this.currentRecord.newData);
  // }
  // }

  //   onRecordSelect(record: { newData: any; oldData: any }) {
  //     this.currentRecord = record;
  //     this.loadCustomerByUid(record.uid);
  //     if (this.currentRecord) {
  //            console.log(this.currentRecord.newData);
  //        }
  // }

  // onSelectedRecordChange(index: number) {
  //   // const recordUid = selectedRecord.uid;
  //   // this.loadCustomerByUid(recordUid);

  //   this.currentIndex = index;
  //   this.loadCustomerByUid(this.selectedRecords[this.currentIndex].uid);
  //   console.log('Current index updated to:', this.currentIndex);
  // }
  onSelectedRecordChange(selectedRecord: any) {
    this.currentIndex = this.selectedRecords.indexOf(selectedRecord); // Find the index of the selected record
    const uid = selectedRecord.uid; // Extract the UID from the selected record
    this.loadCustomerByUid(uid); // Load the customer data by UID
    console.log('Current index updated to:', this.currentIndex);
  }

  initializeDropdowns(): void {
    // Populate the dropdowns with data
    this.statusCodes = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Suspended', value: 'suspended' },
      { label: 'Close', value: 'close' },
    ];

    this.currentTariffCode = [
      { label: 'R1', value: 'r1' },
      { label: 'R2', value: 'r2' },
      { label: 'R3', value: 'r3' },
      { label: 'C1', value: 'c1' },
      { label: 'C2', value: 'c2' },
      { label: 'C3', value: 'c3' },
      { label: 'D1', value: 'd1' },
      { label: 'D2', value: 'd2' },
    ];
    this.correctTariffCode = [
      { label: 'R1', value: 'r1' },
      { label: 'R2', value: 'r2' },
      { label: 'R3', value: 'r3' },
      { label: 'C1', value: 'c1' },
      { label: 'C2', value: 'c2' },
      { label: 'C3', value: 'c3' },
      { label: 'D1', value: 'd1' },
      { label: 'D2', value: 'd2' },
    ];

    this.tariffCode = [
      { label: 'LFN', value: 'lfm' },
      { label: 'NMD', value: 'nmd' },
      { label: 'MD1', value: 'md1' },
      { label: 'MD2', value: 'md2' },
      { label: 'MD3', value: 'md3' },
    ];
    this.isLandlord = [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ];
    this.customerHasMeter = [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ];
    this.connectionType = [
      { label: 'Metered', value: 'metered' },
      { label: 'Unmetered', value: 'unmetered' },
    ];

    this.accountCategory = [
      { label: 'Resident', value: 'resident' },
      { label: 'Commercial', value: 'commercial' },
    ];

    this.customerMeterCategory = [
      { label: 'Prepaid Wall-mounted', value: 'prepaid-wall-mounted' },
      { label: 'Prepaid Pole-mounted', value: 'prepaid-pole' },
      { label: 'Postpaid-Electronic', value: 'postpaid-electronic' },
      { label: 'Postpaid Digital', value: 'postpaid-digital' },
    ];

    this.customerMeterSealed = [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ];

    this.customerMeterAccessible = [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ];

    this.customerHasAccountNo = [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ];
    this.meterLocation = [
      { label: 'Indoor', value: 'indoor' },
      { label: 'Outdoor', value: 'outdoor' },
    ];
    this.customerGroup = [
      { label: 'New', value: 'new' },
      { label: 'Existing', value: 'existing' },
      { label: 'Potential', value: 'potential' },
    ];

    this.accountTypes = [
      { label: 'PostPaid', value: 'postpaid' },
      { label: 'PrePaid', value: 'prepaid' },
    ];

    this.supplyTypes = [
      { label: 'Single Phase', value: 'single-phase' },
      { label: 'Three Phase', value: 'three-phase' },
    ];
  }

  // nextRecord() {
  //   if (this.currentIndex < this.selectedRecords.length - 1) {
  //     this.currentIndex++;
  //     this.currentRecord = this.selectedRecords[this.currentIndex];
  //   }
  // }
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
   // this.comments = ''; // Clear comments for the next review
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

  customerFields: { name: string; key: keyof any }[] = [
    { name: 'Customer Full Name', key: 'customer_full_name' },
    { name: 'Account Number', key: 'account_no' },
    { name: 'Meter Number', key: 'meter_no' },
    { name: 'Address', key: 'address' },
    { name: 'City', key: 'city' },
    { name: 'LGA', key: 'lga' },
    { name: 'State', key: 'state' },
    { name: 'Nearest Landmark', key: 'nearest_landmark' },
    { name: 'Setup Date', key: 'setup_date' },
    { name: 'Latitude', key: 'latitude' },
    { name: 'Longitude', key: 'longitude' },
    { name: 'Customer ID', key: 'customer_id' },
    { name: 'CIN', key: 'cin' },
    { name: 'Application Date', key: 'application_date' },
    { name: 'Mobile Number', key: 'mobile' },
    { name: 'Email', key: 'email' },
    { name: 'Status Code', key: 'status_code' },
    { name: 'Account Type', key: 'account_type' },
    { name: 'Current Tariff Code', key: 'current_tariff_code' },
    { name: 'Correct Tariff Code', key: 'correct_tariff_code' },
    { name: 'Tariff Class', key: 'tariff_class' },
    { name: 'Feeder', key: 'feeder' },
    { name: 'Feeder ID', key: 'feeder_id' },
    { name: 'Service Center', key: 'service_center' },
    { name: 'Distribution Name', key: 'distribution_name' },
    { name: 'DSS ID', key: 'dss_id' },
    { name: 'LT Pole ID', key: 'lt_pole_id' },
    { name: 'Service Wire', key: 'service_wire' },
    { name: 'Upriser', key: 'upriser' },
    { name: 'Region', key: 'region' },
    { name: 'Business Hub', key: 'business_hub' },
    { name: 'Account Category', key: 'account_category' },
    { name: 'Connection Type', key: 'connection_type' },
    { name: "Customer's Nature of Business", key: 'cust_nature_of_business' },
    { name: 'Customer NIN', key: 'customer_nin' },
    { name: 'Customer Supply Type', key: 'customer_supply_type' },
    { name: 'Customer Estimated Load', key: 'customer_estimated_load' },
    { name: 'Customer Has Meter', key: 'cust_has_meter' },
    { name: 'Customer Meter Category', key: 'customer_meter_category' },
    { name: 'Customer Meter Manufacturer', key: 'customer_meter_manufacturer' },
    { name: 'Customer Meter Sealed', key: 'customer_meter_saled' },
    { name: 'Customer Meter Accessible', key: 'customer_meter_accessible' },
    { name: 'Customer Meter Location', key: 'customer_meter_location' },
    { name: 'Customer Bill Name', key: 'customer_bill_name' },
    { name: 'Customer Has Account Number', key: 'customer_has_account_no' },
    { name: 'Customer Group', key: 'customer_group' },
    { name: 'Is Landlord', key: 'is_landlord' },
    { name: 'Landlord Name', key: 'landlord_name' },
    { name: 'Landlord Phone', key: 'landlord_phone' },
    { name: 'Tenant Name', key: 'tenant_name' },
    { name: 'Tenant Phone', key: 'tenant_phone' },
    { name: 'Meter CT Ratio', key: 'meter_ct_ratio' },
    { name: 'Customer Batch', key: 'customer_group' },
  ];
}