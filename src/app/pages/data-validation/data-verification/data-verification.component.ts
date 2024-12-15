import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataValidationService } from '../service/data-validation.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerService } from '../../../api/customer.service';
import { AuthService } from '../../../auth/service/auth.service';
import { Token } from '@angular/compiler';
import { customerApproveOrReject } from '../../../model/customer';
import { UtilsService } from '../../../shared/services/utils.service';

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

  selectedRecords: any[] = [];
  currentRecord!: {
    newData: any;
    oldData: any;
  };
  qrCode: string | null = null;
  currentIndex: number = 0;
  events: any | null = null;
  comments: string = ' Well done ';
  rejectDialog: boolean = false;
  reviewDialog: boolean = false;
  approveDialog: boolean = false;
  approveReason: string ='';
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
    private authService: AuthService,
    private utilService: UtilsService,
    private activatedRoute: ActivatedRoute
  ) {
    // const navigation = this.router.getCurrentNavigation();
    // this.selectedRecords =
    //   navigation?.extras.state?.['selectedCustomers'] || [];
   
    // this.setCurrentRecord();
  }

  get totalSelectedRecords(): number {
    return this.selectedRecords.length;
  }




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
            // const token = this.authService.getToken();

            // if (!token) {
            //     this.messageService.add({
            //         severity: 'error',
            //         summary: 'Authorization Error',
            //         detail: 'Authentication token is missing. Please log in again.',
            //     });
            //     return;
            // }

          
            // const updatePayload: customerApproveOrReject = {
            //     uid: this.currentRecord.newData.uid,  // Double-check this field name
            //     approval_status: 'Approved',
            //     approval_comments: this.comments,
            // };

            // console.log("Payload being sent:", updatePayload); // Debugging line

            // this.customerService.customerApproveOrReject(updatePayload, token).subscribe(
            //     (response) => {
            //         this.messageService.add({
            //             severity: 'success',
            //             summary: 'Record Approved',
            //             detail: 'Customer record has been approved.',
            //         });
            //         this.nextRecord(); 

            //       //   this.selectedRecords = this.selectedRecords.filter(
            //       //     record => record.uid !== this.currentRecord.newData.uid
            //       // );
            //       this.removeCurrentRecordAndRedirectIfEmpty();
            //     },
            //     (error) => {
            //         console.error('Error response:', error); // Log detailed error response
            //         this.messageService.add({
            //             severity: 'error',
            //             summary: 'Error',
            //             detail: error.error.errorMessage ? JSON.stringify(error.error.errorMessage) : 'There was an error updating the customer approval.',
            //         });
            //     }
            // );
            this.approveDialog=true;
        },
        reject: () => {
           
           
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
        // const token = this.authService.getToken();

        // if (!token) {
        //     this.messageService.add({
        //         severity: 'error',
        //         summary: 'Authorization Error',
        //         detail: 'Authentication token is missing. Please log in again.',
        //     });
        //     return;
        // }

        // // Define payload based on the current record
        // const updatePayload: customerApproveOrReject = {
        //     uid: this.currentRecord.newData.uid,  // Double-check this field  name
        //     approval_status: 'Rejected',
        //     approval_comments: this.comments,
        // };

        // console.log("Payload being sent:", updatePayload); // Debugging line

        // this.customerService.customerApproveOrReject(updatePayload, token).subscribe(
        //     (response) => {
        //         this.messageService.add({
        //             severity: 'success',
        //             summary: 'Record Approved',
        //             detail: 'Customer record has been approved.',
        //         });
            
        //       this.removeCurrentRecordAndRedirectIfEmpty();
        //     },
        //     (error) => {
        //         console.error('Error response:', error); // Log detailed error response
        //         this.messageService.add({
        //             severity: 'error',
        //             summary: 'Error',
        //             detail: error.error.errorMessage ? JSON.stringify(error.error.errorMessage) : 'There was an error updating the customer approval.',
        //         });
        //     }
        // );
        this.rejectDialog = true;
    },
      reject: () => {
       
      },
    });
  }

  confirmReject() {
   
    const updatePayload: customerApproveOrReject = {
      uid: this.currentRecord.newData.uid,
      approval_status: 'Rejected',
      approval_comments: this.rejectReason,
    };
  
    this.customerService.customerApproveOrReject(updatePayload).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Record Rejected',
          detail: 'Customer record has been rejected.',
        });
        this.rejectDialog = false; // Close the rejection dialog
        this.rejectReason = ''; // Clear rejection reason after use
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


  confirmApprove() {

    const updatePayload: customerApproveOrReject = {
      uid: this.currentRecord.newData.uid,
      approval_status: 'Approved',
      approval_comments: this.approveReason,
    };
  
    this.customerService.customerApproveOrReject(updatePayload).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Record Approved',
          detail: 'Customer record has been approved.',
        });
        this.approveDialog = false; // Close the rejection dialog
        this.approveReason = ''; // Clear rejection reason after use
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
  
  // private removeCurrentRecordAndRedirectIfEmpty() {
  //   this.selectedRecords.shift(); // Remove the first record
  //   if (this.selectedRecords.length === 0) {
  //     this.redirectToDataValidation();
  //   } else {
  //     this.setCurrentRecord(); // Load the next record if available
  //   }
  // }

  // private removeCurrentRecordAndRedirectIfEmpty() {
  //   this.selectedRecords.shift();
  //   if (this.selectedRecords.length === 0) {
  //     this.utilService.clearItems()
  //     this.redirectToDataValidation();
  //   } else {
  //    this.utilService.deleteItem(this.currentRecord.newData.uid)
  //    this.onSelectedRecordChange(this.selectedRecords[0])
     
  //   }
  // }

  private removeCurrentRecordAndRedirectIfEmpty() {
    // Find and remove the current record from selectedRecords
    const index = this.selectedRecords.findIndex(record => record.uid === this.currentRecord.newData.uid);
    if (index !== -1) {
      this.selectedRecords.splice(index, 1); // Remove the current record
    }
  
    // Check if there are no more records left
    if (this.selectedRecords.length === 0) {
      this.utilService.clearItems();
      this.redirectToDataValidation();
    } else {
      // If there are still records left, move to the next record
      this.onSelectedRecordChange(this.selectedRecords[0]);
    }
  }
  ngOnInit() {
    // console.log('Selected Customers:', this.selectedRecords);
   
    // if (this.selectedRecords.length > 0) {
    //   this.loadCustomerByUid(this.selectedRecords[this.currentIndex].uid);
    // }
    // console.log(this.currentIndex);
    this.loadData()
  }

  loadData() {
    this.selectedRecords = this.utilService.getItems()
    this.activatedRoute.paramMap.subscribe(params => {
      const uid = params.get('uid');
      if (uid) {
        this.loadCustomerByUid(uid)
        console.log(uid)
      }
    });
  }
  loadCustomerByUid(uid: string) {

    this.customerService.getCustomerById(uid).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.currentRecord = {
            newData: response.data.new,
            oldData: response.data.old,
          };
          this.events=this.currentRecord.newData.events;
          this.qrCode = this.currentRecord.newData.qr_code;

        }
       


       
      },
      (error) => {
        console.error('Error fetching customer data:', error);
      }
    );
  }

  // loadQrCode(customerId: string): void {
  
  //   this.customerService.getCustomerQrCode(customerId).subscribe({
  //     next: (response: any) => {
  //       if (response.code === 200) {
  //         this.qrCode = response.data?.qr_code; // Ensure safe access
  //         console.log('QR Code URL:', this.qrCode);
  //       } else {
  //         console.error('Failed to fetch QR code:', response.message || response);
  //         alert('Failed to retrieve the QR code. Please try again.');
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error retrieving QR code:', error);
  //     }
  //   });
  // }
  

  // onSelectedRecordChange(selectedRecord: any) {
  //   this.currentIndex = this.selectedRecords.indexOf(selectedRecord); // Find the index of the selected record
  //   const uid = selectedRecord.uid; // Extract the UID from the selected record
  
  //   // Update the URL with the selected UID
  //   this.router.navigate([], {
  //     relativeTo: this.router.routerState.root,  // Maintain the current route
  //     queryParams: { uid: uid },  // Add the uid as a query parameter
  //     queryParamsHandling: 'merge'  // Preserve other query parameters if any
  //   });
  
  //   // Load the customer data by UID
  //   this.loadCustomerByUid(uid); 
  //   console.log('Current index updated to:', this.currentIndex);
  // }

  onSelectedRecordChange(selectedRecord: any) {
    this.currentIndex = this.selectedRecords.indexOf(selectedRecord);
    this.router.navigate(['../', selectedRecord.uid], {
      relativeTo: this.activatedRoute
    }).then(() => {
      console.log('Navigation successful to:', selectedRecord.uid);
    });
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
    this.router.navigate(['/app/data-validation']);
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