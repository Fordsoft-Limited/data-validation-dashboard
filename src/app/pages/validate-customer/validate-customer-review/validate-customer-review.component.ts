import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerService } from '../../../api/customer.service';
import { AuthService } from '../../../auth/service/auth.service';
import { Token } from '@angular/compiler';
import { customerApproveOrReject } from '../../../model/customer';

@Component({
  selector: 'app-validate-customer-review',
  templateUrl: './validate-customer-review.component.html',
  styleUrl: './validate-customer-review.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ValidateCustomerReviewComponent implements OnInit{
  selectedRecords: any[] = [];
  currentRecord!: {
    newData: any;
    oldData: any;
  };
  currentIndex: number = 0;
  qrCode: string | null = null;
  comments: string = ' Well done ';
  rejectDialog: boolean = false;
  reviewDialog: boolean = false;
  rejectReason: string = '';
  reviewReason: string = '';
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
  
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private customerService: CustomerService,
    private authService: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.selectedRecords =
      navigation?.extras.state?.['selectedNewCustomer'] || [];
   
    this.setCurrentRecord();
  }

  get totalSelectedRecords(): number {
    return this.selectedRecords.length;
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
      message: 'Are you sure you want to review the selected record??',
      header: 'Review Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-primary p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
       
        this.reviewDialog = true;
    },
      reject: () => {
       
      },
    });
  }

  confirmReView() {
    const token = this.authService.getToken();
    if (!token) {
      this.messageService.add({
        severity: 'error',
        summary: 'Authorization Error',
        detail: 'Authentication token is missing. Please log in again.',
      });
      return;
    }
  
    const updatePayload: customerApproveOrReject = {
      uid: this.currentRecord.newData.uid,
      approval_status: 'Reviewed',
      approval_comments: this.reviewReason,
    };
  
    this.customerService.customerApproveOrReject(updatePayload, token).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Record Reviewed',
          detail: 'Customer record has been reviwed.',
        });
        this.reviewDialog = false; // Close the rejection dialog
        this.reviewReason = ''; // Clear rejection reason after use
        this.removeCurrentRecordAndRedirectIfEmpty();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.errorMessage || 'Error updating the customer approval status.',
        });
      }
    );
  }
  
  private removeCurrentRecordAndRedirectIfEmpty() {
    this.selectedRecords.shift(); // Remove the first record
    if (this.selectedRecords.length === 0) {
      this.redirectToDataValidation();
    } else {
      this.setCurrentRecord(); // Load the next record if available
    }
  }
  ngOnInit() {
    console.log('Selected Customers:', this.selectedRecords);
   
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
        const customerNo = this.currentRecord.newData.customer_no;
        if (customerNo) {
          this.loadQrCode(customerNo); // Fetch QR code using customerNo
          console.log(customerNo);
        } else {
          console.error('Customer number is not available.');
        }
        console.log(this.currentRecord.newData.customer_full_name);
      },
      (error) => {
        console.error('Error fetching customer data:', error);
      }
    );
  }
  loadQrCode(customerId: string): void {
    const token = this.authService.getToken();
  
    if (!token ) {
      console.error('No valid authentication token found. Please log in again.');
      alert('Session expired. Please log in again.');
      return;
    }
  
    this.customerService.getCustomerQrCode(customerId, token).subscribe({
      next: (response: any) => {
        if (response.code === 200) {
          this.qrCode = response.data?.qr_code; // Ensure safe access
          console.log('QR Code URL:', this.qrCode);
        } else {
          console.error('Failed to fetch QR code:', response.message || response);
          alert('Failed to retrieve the QR code. Please try again.');
        }
      },
      error: (error) => {
        console.error('Error retrieving QR code:', error);
      }
    });
  }
  

  
  onSelectedRecordChange(selectedRecord: any) {
    this.currentIndex = this.selectedRecords.indexOf(selectedRecord); // Find the index of the selected record
    const uid = selectedRecord.uid; // Extract the UID from the selected record
    this.router.navigate([], {
      relativeTo: this.router.routerState.root,  // Maintain the current route
      queryParams: { uid: uid },  // Add the uid as a query parameter
      queryParamsHandling: 'merge'  // Preserve other query parameters if any
    });
  
    this.loadCustomerByUid(uid); // Load the customer data by UID
    console.log('Current index updated to:', this.currentIndex);
  }

  
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

  // confirmReject() {
  //   console.log('Rejected Reason:', this.rejectReason);
  //   this.rejectDialog = false;
  //   this.rejectReason = ''; // Clear the reject reason for the next time
  //   this.nextRecord(); // Move to the next record after rejection
  // }

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
  private setCurrentRecord() {
    if (this.selectedRecords.length > 0) {
      const uid = this.selectedRecords[0].uid;
      this.loadCustomerByUid(uid);
    } else {
      this.redirectToDataValidation();
    }
  }

  private redirectToDataValidation() {
    this.messageService.add({
      severity: 'info',
      summary: 'No more records to process',
      detail: 'Redirecting to data validation page.',
    });
    this.router.navigate(['/app/validate']);
  } 
  // Check if the current record is the last one
  isLastRecord(): boolean {
    return this.currentIndex === this.selectedRecords.length - 1;
  }

  customerFields: { name: string; key: keyof any }[] = [
    { name: 'Customer Full Name', key: 'customer_full_name' },
    { name: 'Customer ID', key: 'customer_id' },
    { name: 'Account Number', key: 'account_no' },
    { name: 'Meter Number', key: 'meter_no' },
    { name: 'Address', key: 'address' },
    { name: 'City', key: 'city' },
    { name: 'LGA', key: 'lga' },
    { name: 'State', key: 'state' },
    { name: 'Nearest Landmark', key: 'nearest_landmark' },
    { name: 'Setup Date', key: 'setup_date' },
    { name: 'Application Date', key: 'application_date' },
    { name: 'Latitude', key: 'latitude' },
    { name: 'Longitude', key: 'longitude' },
    { name: 'CIN', key: 'cin' },
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
  ];
}
