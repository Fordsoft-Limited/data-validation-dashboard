import { Component,OnInit , OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from '../../api/shared-data.service';
import { CustomerService } from '../../api/customer.service';
import { AuthService } from '../../auth/service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-verification',
  templateUrl: './customer-verification.component.html',
  styleUrl: './customer-verification.component.scss'
})
export class CustomerVerificationComponent implements OnInit , OnDestroy{
  modeForm!: FormGroup;
  accountVisibility:boolean = false;
  meterVisibility:boolean = false;
  buttonVisibility:boolean = false;
  customerDetailsVisibility:boolean = false;
  errorVisibility:boolean = false;
  sucessVisibility:boolean = false;
  isError: boolean = false;
  loading:boolean = false;
  url:string='';
  errorMessage:string = '';
  successMessage:string = '';
  name:string='';
  customer_name: string = '';
  address: string = '';
  meter_number: string = '';
  account_number: string = '';
  business_unit: string = '';
  undertaking: string = '';
  phone_number: string = '';
  email: string = '';
  business_unit_id: string = '';
  last_transaction_date: string = '';
  minimum_purchase: number | null = null;
  tariff_code: string = '';
  customer_arrears: number | null = null;
  tariff: string = '';
  service_band: string = '';
  feeder_name: string = '';
  dss_name: string = '';
  band_adjustment: number | null = null;
  tin: string = '';
  krn1: string = '';
  krn2: string = '';
  tariff_id: number | null = null;
  sgc: string = '';
  old_ti: number | null = null;
  old_sgc: string = '';
  previousItemNo = null;
  code:number=0;

  constructor(private fb: FormBuilder, private sharedDataService: SharedDataService,private customerService: CustomerService,private router: Router , private authService: AuthService) {}

  ngOnInit(): void {
    this.modeForm = this.fb.group({
      selectMode: ['', Validators.required], // Default value is empty; required validation
      meterNo: ['', [Validators.required, ]], // Numeric validation
      //accountNo: ['', [Validators.required, ]] // Minimum length validation
    });
    this.formVisbilityCheck();

    const userData = localStorage.getItem('userData');
    if (userData) {
      const data = JSON.parse(userData);
      this.name = data.name || 'Guest';
      console.log('Data from localStorage:', this.name);
    } else {
      this.sharedDataService.userData$.subscribe((data) => {
        if (data) {
          localStorage.setItem('userData', JSON.stringify(data));
          this.name = data.name || 'Guest';
          console.log('Data from SharedDataService:', this.name);
        }
      });
    }
  }


  ngOnDestroy(): void {
    // Clear userData from localStorage when the component is destroyed (i.e., user leaves the page)
    localStorage.removeItem('userData');
    console.log('userData cleared from localStorage');
  }
  formVisbilityCheck(){
    this.modeForm.get('selectMode')?.valueChanges.subscribe((value: string) => {
      this.resetVisibility()
      if(value === 'Prepaid'){
        this.meterVisibility=true;
        this.buttonVisibility=true;
      }else if(value === 'Postpaid'){
        this.accountVisibility=true;
        this.buttonVisibility=true;
      }
    })
  }

  resetVisibility(): void {
    this.meterVisibility = false;
    this.accountVisibility = false;
    this.buttonVisibility = false;
  }

  populateCustomerDetails(response: any): void {
    this.customer_name = response.customer_name;
    this.address = response.address;
    this.meter_number = response.meter_number;
    this.account_number = response.account_number;
    this.business_unit = response.business_unit;
    this.undertaking = response.undertaking;
    this.phone_number = response.phone_number;
    this.email = response.email;
    this.business_unit_id = response.business_unit_id;
    this.last_transaction_date = response.last_transaction_date;
    this.minimum_purchase = Number(response.minimum_purchase);
    this.tariff_code = response.tariff_code;
    this.customer_arrears = Number(response.customer_arrears);
    this.tariff = response.tariff;
    this.service_band = response.service_band;
    this.feeder_name = response.feeder_name;
    this.dss_name = response.dss_name;
    this.band_adjustment = Number(response.band_adjustment);
    this.tin = response.tin;
    this.krn1 = response.krn1;
    this.krn2 = response.krn2;
    this.tariff_id = response.tariff_id;
    this.sgc = response.sgc;
    this.old_ti = response.old_ti;
    this.old_sgc = response.old_sgc;


  }
  
  

  onSubmit(): void {
    const meterNo = this.modeForm.get('meterNo')?.value;
    const accountType = this.modeForm.get('selectMode')?.value;
  
   
  
    if (!meterNo || !accountType) {
      return; // Prevent API call if required values are missing
    }
    this.previousItemNo = meterNo;
    this.loading=true
    //this.customerDetailsVisibility = true;
    
    const payload = {
      account_type: accountType,
      item_number: meterNo
    };
  
    this.customerService.draftValidate(payload).subscribe(
      (response) => {
        this.successMessage = response.data.message;
        this.customerDetailsVisibility = true;
        this.sucessVisibility=true;
        this.errorVisibility=false;
        this.populateCustomerDetails(response.data.customer_draft);
        this.code = response.code;
        this.url = response.data.url;
        this.loading=false
        
        console.log(this.code);
        
      },
      (error) => {
        console.error('Error during API call:', error);
        this.loading=false;
        if(error.error.code == 404){
          this.errorVisibility=true
          this.errorMessage = error.error.errorMessage;
          this.sucessVisibility=false;
          this.isError=true;
         
        }else if(error.error.code == 500){
          this.errorVisibility=true
          this.isError = false;
          this.sucessVisibility=false;
          this.errorMessage = error.error.errorMessage;
        }
        console.log(this.errorMessage);
      }
    );
  }

  onProceed(): void {
    window.location.href= this.url;
  }

  newValidate(){
    this.loading=true;
    if(this.code == 200){
      this.redirectToUrl()
      this.loading=false;
    }else{
    this.loading=true;

    const meterNo = this.modeForm.get('meterNo')?.value;
    const accountType = this.modeForm.get('selectMode')?.value;
  
    console.log('Form Values:', { meterNo, accountType });
  
    if (!meterNo || !accountType) {
      console.error('Form values are missing!');
      return; // Prevent API call if required values are missing
    }
  
    
    //this.customerDetailsVisibility = true;
    
    const payload = {
      account_type: accountType,
      item_number: meterNo
    };
  
    this.customerService.draftNewValidate(payload).subscribe(
      (response) => {
        this.successMessage = response.data.message;
        this.url = response.data.url;
        this.sucessVisibility=true;
        this.errorVisibility =false
        this.populateCustomerDetails(response.data.customer_draft);
        this.redirectToUrl()
        console.log(this.url);
        this.loading=false;
      },
      (error) => {
        console.error('Error during API call:', error);
      }
    );
  }
  }
  get isNewAccount(){
    const meterNo = this.modeForm.get('meterNo')?.value;
    return meterNo != this.previousItemNo
  }

  private redirectToUrl(): void {
   
      
        window.location.href = this.url;
        console.log(this.url)
    
  }

  logout(){
    this.authService.logout();
    localStorage.clear();
    this.router.navigate(['/login-validate']);
  }
}
