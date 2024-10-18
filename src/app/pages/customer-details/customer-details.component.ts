import { Component, OnInit } from '@angular/core';
import { Customer } from '../../shared/model/customer';
import { CustomerService } from '../../shared/services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent implements OnInit {
 // customerId: number = 1001;
  // customerId: number;
  customerId: number  = 0; 
  customer: Customer | null = null;
  newData: Customer | null = null;
  existingData: Customer | null = null;


  constructor(private customerService: CustomerService, private route: ActivatedRoute, private router: Router) {
    // this.customerId=0;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.customerId = idParam ? +idParam : 0; // Update customerId based on route parameter
    this.loadCustomerDetails();
  }
  // loadCustomerDetails(): void {
  //   // Fetch existing customer data
  //   this.customerService.getCustomerById(this.customerId).then(existingCustomer => {
  //     this.existingData = existingCustomer;
  //     // Fetch new customer data
  //     return this.customerService.getNewCustomerById(this.customerId);
  //   }).then(newCustomer => {
  //     this.newData = newCustomer;

     
     
  //   }).catch(error => {
  //     console.error('Error fetching customer data', error);
  //   });
  // }

  loadCustomerDetails(): void {
    if (this.customerId !== null) {
      this.customerService.getCustomerById(this.customerId).then(existingCustomer => {
        this.existingData = existingCustomer;
        return this.customerService.getNewCustomerById(this.customerId);
      }).then(newCustomer => {
        this.newData = newCustomer;
      }).catch(error => {
        console.error('Error fetching customer data', error);
      });
    }
  }

 

  dataEntryHistory = [
    { content: 'Updated meter number', date_created: '2023-10-01',icon: 'pi pi-cloud-upload' ,color:'#10e01a'},
    { content: 'Changed tariff code', date_created: '2023-09-15' ,icon: 'pi pi-eraser',color:'#f5d902'},
    { content: 'Updated contact number', date_created: '2023-08-20' ,icon: 'pi pi-cloud-upload',color:'#dd02f5'},
    { content: 'Address correction', date_created: '2023-07-10' ,icon: 'pi pi-pencil',color:'#f57c02'}
  ];

  events = this.dataEntryHistory.map(entry => ({
    status: entry.content,
    date: entry.date_created,
    icon: entry.icon, // Optionally add an icon
    color: entry.color      // Optionally add a color
  }));
  // Navigation method to go back
  goBack() {
    window.history.back();
   }



   customerFields: { name: string; key: keyof Customer }[] = [
    { name: 'Customer Full Name', key: 'customerFullName' },
    { name: 'Account Number', key: 'accountNo' },
    { name: 'Meter Number', key: 'meterNo' },
    { name: 'Address', key: 'address' },
    { name: 'City', key: 'city' },
    { name: 'LGA', key: 'lga' },
    { name: 'State', key: 'state' },
    { name: 'Nearest Landmark', key: 'nearestLandmark' },
    { name: 'Setup Date', key: 'applicationDate' },
    { name: 'Latitude', key: 'latitude' },
    { name: 'Longitude', key: 'longitude' },
    { name: 'Customer ID', key: 'customerId' },
    { name: 'CIN', key: 'cin' },
    { name: 'Application Date', key: 'applicationDate' },
    { name: 'Mobile Number', key: 'mobile' },
    { name: 'Email', key: 'email' },
    { name: 'Status Code', key: 'statusCode' },
    { name: 'Account Type', key: 'accountType' },
    { name: 'Current Tariff Code', key: 'currentTariffCode' },
    { name: 'Correct Tariff Code', key: 'correctTariffCode' },
    { name: 'Tariff Class', key: 'tariffClass' },
    { name: 'Feeder', key: 'feeder' },
    { name: 'Feeder ID', key: 'feederId' },
    { name: 'Service Center', key: 'serviceCenter' },
    { name: 'Distribution Name', key: 'distributionName' },
    { name: 'DSS ID', key: 'dssId' },
    { name: 'LT Pole ID', key: 'ltPoleId' },
    { name: 'Service Wire', key: 'serviceWire' },
    { name: 'Upriser', key: 'upriser' },
    { name: 'Region', key: 'region' },
    { name: 'Business Hub', key: 'businessHub' },
    { name: 'Account Category', key: 'accountCategory' },
    { name: 'Connection Type', key: 'connectionType' },
    { name: "Customer's Nature of Business", key: 'custNatureOfBusiness' },
    { name: 'Customer NIN', key: 'customerNIN' },
    { name: 'Customer Supply Type', key: 'customerSupplyType' },
    { name: 'Customer Estimated Load', key: 'customerEstimatedLoad' },
    { name: 'Customer Has Meter', key: 'custHasMeter' },
    { name: 'Customer Meter Category', key: 'customerMeterCategory' },
    { name: 'Customer Meter Manufacturer', key: 'customerMeterManufacturer' },
    { name: 'Customer Meter Sealed', key: 'customerMeterSaled' },
    { name: 'Customer Meter Accessible', key: 'customerMeterAccessible' },
    { name: 'Customer Meter Location', key: 'customerMeterLocation' },
    { name: 'Customer Bill Name', key: 'customerBillName' },
    { name: 'Customer Has Account Number', key: 'customerHasAccountNo' },
    { name: 'Customer Group', key: 'customerGroup' },
    { name: 'Is Landlord', key: 'isLandlord' },
    { name: 'Landlord Name', key: 'landlordName' },
    { name: 'Landlord Phone', key: 'landlordPhone' },
    { name: 'Tenant Name', key: 'tenantName' },
    { name: 'Tenant Phone', key: 'tenantPhone' },
    { name: 'Meter CT Ratio', key: 'supplyType' },
    { name: 'Customer Batch', key: 'customerGroup' },
    //{ name: 'Slug', key: 'slug' }
  ];
  
}
