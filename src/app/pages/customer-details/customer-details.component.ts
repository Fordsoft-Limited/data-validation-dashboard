import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { CustomerService } from '../../api/customer.service';
import { Customer } from '../../shared/model/customer';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  customerId: string = '';
  customer: any | null = null;
  newData: any | null = null;
  existingData: any | null = null;
  event: any | null = null;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('uid');
    this.customerId = idParam ? idParam : '';
    this.loadCustomerDetails(this.customerId);
    console.log(this.customerId)
    console.log(idParam)
  }

  loadCustomerDetails(uid: string): void {
    const token = this.authService.getToken();

    if (!token) {
      console.error('No authentication token found. Please log in again.');
      return;
    }

    if (this.customerId) {
      this.customerService.getCustomerById(uid, token)
        .subscribe(

          (response: any) => {
            console.log('API response:', response);
            if (response.code === 200) {
              
              const { new: newCustomer, old: existingCustomer } = response.data;
              this.newData = newCustomer;
              this.existingData = existingCustomer;
              this.event =this.newData.events;
              console.log('New Data:', this.newData);
            console.log('Existing Data:', this.existingData);
            console.log('Event:', this.event);
            }
          },
          (error) => {
            console.error('Error fetching customer data:', error);
          }
          // response => {
          //   if (response.code === 200) {
          //     const { new: newCustomer, old: existingCustomer } = response.data;
          //     this.newData = newCustomer.new;
          //     this.existingData = existingCustomer.old;
              
          //     console.log(newCustomer)
          //   } else {
          //     console.error('Unexpected response structure', response);
          //   }
          // },
          // error => {
          //   console.error('Error fetching customer data', error);
          // }

        );
    }
  }

  goBack() {
    window.history.back();
  }

  // Data Entry History for Events
  dataEntryHistory = [
    { content: "Description", date_created: this.newData?.events?.description, icon: 'pi pi-cloud-upload', color: '#10e01a' },
    { content: 'Category', date_created: this.newData?.events?.category, icon: 'pi pi-eraser', color: '#f5d902' },
    { content: 'Status', date_created: this.newData?.events?.status, icon: 'pi pi-cloud-upload', color: '#dd02f5' },
    { content: 'Posted By', date_created: this.newData?.events?.posted_by?.name, icon: 'pi pi-pencil', color: '#f57c02' }
  ];

  events = this.dataEntryHistory.map(entry => ({
    status: entry.content,
    date: entry.date_created,
    icon: entry.icon,
    color: entry.color
  }));


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