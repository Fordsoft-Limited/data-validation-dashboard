import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { CustomerService } from '../../api/customer.service';
import { MessageService } from 'primeng/api/messageservice';
import { AuthService } from '../../auth/service/auth.service';
import { DatePipe } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { Customer } from '../../shared/model/customer';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  providers: [DatePipe], // Provide DatePipe if not globally available

})
export class FilterComponent {

  display: boolean = false;

  pageloading: boolean = false
  errOccured: boolean = false
  customers: [] = [];
  selectedCustomer = [];
  statuses: any[] = [];
  rowGroupMetadata: any;
  activityValues: number[] = [0, 100];

  @ViewChild('dt') table: Table | undefined;
  customerloading: boolean | undefined;

  regions = [
    { name: 'Ogun' }, { name: 'Oyo' }, { name: 'Ojoo' }, { name: 'Monatan' }, 
    { name: 'Ibadan' }, { name: 'Sun' }, { name: 'Kwara' }, 
  ]

  business_hubs = [{ name: 'Saganmu' }, { name: 'Ota' }, { name: 'Mowe-Ibafo' }, { name: 'Ijeun' }, { name: 'Sango' },  
     { name: 'Olumo' }, { name: 'Ijebu-Ode' }, { name: 'Mowe-Imowo 2' },  { name: 'Molete' },   { name: 'Dugbe' },
     { name: 'Apata' },  { name: 'Akanran' },  { name: 'Oyo' },  { name: 'Ojoo' },  { name: 'Monatan' }, { name: 'Ilesa' },
     { name: 'Ikirun' }, { name: 'Ile-Ife' }, { name: 'Ede' }, { name: 'Osogbo' }, { name: 'Challenge' }, { name: 'Ogbomoso' },
     { name: 'Omu-Aran' }, { name: 'Baboko' }, { name: 'Jebba' }, { name: 'Sagamu' }, 
    ]


    service_centers = [
      { name: 'Ogijo' },
      { name: 'Eyita' },
      { name: 'Iperu' },
      { name: 'Sapade' },
      { name: 'Igbobi 2' },
      { name: 'Sabo-Sagamu' },
      { name: 'Ikenne' },
      { name: 'Hospital road' },
      { name: 'Odogbolu' },
      { name: 'Igbobi 1' },
      { name: 'Abebi' },
      { name: 'Ado-odo' },
      { name: 'Atan-ota' },
      { name: 'Estate- Ota' },
      { name: 'Itele' },
      { name: 'Owode-ota' },
      { name: 'Akeja' },
      { name: 'Lafenwa-Ota' },
      { name: 'Idiroko road' },
      { name: 'Iganmode' },
      { name: 'Iju' },
      { name: 'Lusada' },
      { name: 'Ewupe' },
      { name: 'Ilogbo' },
      { name: 'Iyesi' },
      { name: 'Ewupe' },
      { name: 'Ibafo 2' },
      { name: 'Ashimolowo' },
      { name: 'Ibafo 1' },
      { name: 'Magboro' },
      { name: 'Adesan' },
      { name: 'Owode-Mowe' },
      { name: 'Imedu nla' },
      { name: 'Obantoko' },
      { name: 'Bode' },
      { name: 'Elega' },
      { name: 'Imo-Ijeun' },
      { name: 'Odeda' },
      { name: 'Kemta' },
      { name: 'Somorin' },
      { name: 'Ake' },
      { name: 'GRA-Ijeun' },
      { name: 'Asero' },
      { name: 'Ipamesan' },
      { name: 'Ifo 2' },
      { name: 'Temidire' },
      { name: 'Ijako 11' },
      { name: 'Owode ijako' },
      { name: 'Ijako 1' },
      { name: 'Ifo 1' },
      { name: 'Ilaro' },
      { name: 'Papalanto' },
      { name: 'Idiroko' },
      { name: 'Oke aro 1' },
      { name: 'Oke ola' },
      { name: 'Gasline' },
      { name: 'Oke aro 2' },
      { name: 'Obada l' },
      { name: 'Obada ll' },
      { name: 'Adigbe' },
      { name: 'Lafenwa-Olumo' },
      { name: 'Kolobo' },
      { name: 'Olomore' },
      { name: 'Ayetoro-Olumo' },
      { name: 'Rounder' },
      { name: 'Itori l' },
      { name: 'Itori ll' },
      { name: 'Sapon' },
      { name: 'Itaoshin' },
      { name: 'Iberekodo' },
      { name: 'Imowo 1' },
      { name: 'Imowo 2' },
      { name: 'Ikangba' },
      { name: 'Oke-owa' },
      { name: 'Apebi' },
      { name: 'Ikoto' },
      { name: 'Oke-agbo' },
      { name: 'Oru' },
      { name: 'Atan' },
      { name: 'Gra-Ijebu' },
      { name: 'Ijebu-ife' },
      { name: 'Ibadan road' },
      { name: 'Ijebu-igbo' },
      { name: 'Idowa' },
      { name: 'Sabo-Ijebu' },
      { name: 'Aitba' },
      { name: 'Ago-iwoye' },
      { name: 'Challenge' },
      { name: 'Arapaja' },
      { name: 'Felele' },
      { name: 'Ajinde' },
      { name: 'Odo ona' },
      { name: 'Oke ado' },
      { name: 'Oleyo' },
      { name: 'Liberty' },
      { name: 'Abese' },
      { name: 'Elebu' },
      { name: 'Odo oba' },
      { name: 'Boluwaji' },
      { name: 'Academy' },
      { name: 'Bodija-Dugbe' },
      { name: 'Eleyele' },
      { name: 'Ajibode' },
      { name: 'Awotan' },
      { name: 'Apete' },
      { name: 'Mokola' },
      { name: 'Agodi' },
      { name: 'Foko' },
      { name: 'Sango-Dugbe' },
      { name: 'Jericho' },
      { name: 'Omi adio' },
      { name: 'Oluyole' },
      { name: 'Eruwa' },
      { name: 'Ologuneru' },
      { name: 'Idi ishin' },
      { name: 'BCGA' },
      { name: 'Orisunmbare' },
      { name: 'Airport' },
      { name: 'Oje' },
      { name: 'Agugu' },
      { name: 'Gbagi' },
      { name: 'Gbaremu' },
      { name: 'Sawmill' },
      { name: 'Muslim' },
      { name: 'Adegbayi' },
      { name: 'Olorunsogo' },
      { name: 'Olunde' },
      { name: 'Akanran' },
      { name: 'Soka' },
      { name: 'Akinfenwa-Akanran' },
      { name: 'Olomi' },
      { name: 'Ilora' },
      { name: 'Awe' },
      { name: 'Araromi' },
      { name: 'Owode-Oyo' },
      { name: 'Otu' },
      { name: 'Jobele' },
      { name: 'Erelu' },
      { name: 'Isale oyo' },
      { name: 'Oke ebo' },
      { name: 'Oluwole' },
      { name: 'Koso' },
      { name: 'Okeho' },
      { name: 'Sango-Oyo' },
      { name: 'Ago are' },
      { name: 'Ajegunle' },
      { name: 'Iwo Road' },
      { name: 'Akinyele' },
      { name: 'Igbo oloyin' },
      { name: 'Moniya' },
      { name: 'Labi' },
      { name: 'Aduloju' },
      { name: 'Ashi' },
      { name: 'Akingbile' },
      { name: 'Bodija' },
      { name: 'Orogun' },
      { name: 'Bashorun' },
      { name: 'Ojoo' },
      { name: 'Estate' },
      { name: 'Akobo' },
      { name: 'Adogba' },
      { name: 'Hajj - Camp' },
      { name: 'Olode' },
      { name: 'Alakia' },
      { name: 'Olorundaaba' },
      { name: 'Oluwo' },
      { name: 'Kajola' },
      { name: 'Olodo' },
      { name: 'Papa' },
      { name: 'Labo' },
      { name: 'Yawiri' },
      { name: 'Lalupon' },
      { name: 'Wakajaiye' },
      { name: 'Osu' },
      { name: 'Ipetu' },
      { name: 'Isare' },
      { name: 'Ilaje' },
      { name: 'Esa-oke' },
      { name: 'Isokun' },
      { name: 'Ijebu jesha' },
      { name: 'Efon alaye' },
      { name: 'Imo' },
      { name: 'Ibokun' },
      { name: 'Iragbiji' },
      { name: 'Inisa' },
      { name: 'Okuku' },
      { name: 'Odofun' },
      { name: 'Eweta' },
      { name: 'Iree' },
      { name: 'Station road' },
      { name: 'Ila' },
      { name: 'Oke-do' },
      { name: 'Ipetumodu' },
      { name: 'Oke-soda' },
      { name: 'Apomu' },
      { name: 'Ikire' },
      { name: 'Fajuyi' },
      { name: 'Gbongan' },
      { name: 'Mayfair' },
      { name: 'Ilobu' },
      { name: 'Ifon' },
      { name: 'Ejigbo 2' },
      { name: 'Cottage 2' },
      { name: 'Agunbelewo' },
      { name: 'Owode-ede' },
      { name: 'Cottage 1' },
      { name: 'Okinni' },
      { name: 'Ogbagba' },
      { name: 'Ejigbo 1' },
      { name: 'Ofatedo 1' },
      { name: 'Feesu' },
      { name: 'Ofatedo 2' },
      { name: 'Iwo' },
      { name: 'Ojatimi 2' },
      { name: 'Ojatimi 1' },
      { name: 'Ogo-oluwa' },
      { name: 'Ayepe' },
      { name: 'GRA-Osogbo' },
      { name: 'Ota-Efun' },
      { name: 'Kelebe 1' },
      { name: 'Kelebe 2' },
      { name: 'Oke-fia' },
      { name: 'Osogbo 2' },
      { name: 'Osogbo 1' },
      { name: 'Ayetoro-Osogbo' },
      { name: 'Agba' },
      { name: 'GRA-Challenge' },
      { name: 'Ero omo' },
      { name: 'Olunlade' },
      { name: 'Ganmo' },
      { name: 'Irewolede' },
      { name: 'Tanke' },
      { name: 'Ojagbo' },
      { name: 'Owode-Ogbomoso' },
      { name: 'Ilorin road' },
      { name: 'Odooba' },
      { name: 'High school' },
      { name: 'Takie' },
      { name: 'Iloffa' },
      { name: 'Orita-Merin' },
      { name: 'Idi-Ogun' },
      { name: 'Oro' },
      { name: 'Owode-Omuaran' },
      { name: 'Omu-Aran' },
      { name: 'Egbe' },
      { name: 'Shao' },
      { name: 'Oyun' },
      { name: 'Alagbado' },
      { name: 'Aiyetoro' },
      { name: 'Unity' },
      { name: 'Surulere' },
      { name: 'Alore' },
      { name: 'Kishi' },
      { name: 'Taiwo' },
      { name: 'Otte' },
      { name: 'Share' },
      { name: 'Jebba' },
      { name: 'New bussa' },
      { name: 'Mokwa' }
    ];
    
  token!: string;
  region!: string; 
  businessHub!: string;
  serviceCenter!: string; 
  dateCreatedFrom!: string;
  dateCreatedTo!: string;

  tempToken!: string;
  tempRegion!: string; 
  tempBusinessHub!: string;
  tempServiceCenter!: string; 
  tempDateCreatedFrom!: string;
  tempDateCreatedTo!: string;
  uploadError!: string;
  errorMessage: string = "";
  loading: boolean = false;
  filteredNewCustomers  : Customer[]=[];
  currentPage: number = 1;
  pageSize : number = 20;


  constructor(private service: CustomerService, private route: Router,private authService: AuthService,
     private datePipe: DatePipe) {
    
   }

  ngOnInit(): void {

    this.loadCustomers(this.currentPage, this.pageSize);
    // this.getCustomerByRegionByBussinessHubByServiceCenter();

  }



  loadCustomers(page: number, pageSize: number): void {
    const token = this.authService.getToken();
    console.log(token);
    
    if (!token) {
      this.loading = false;
      this.errorMessage = 'No authentication token found. Please log in again.';
      return; // Exit the function early
    }
  
    this.loading = true; // Start loading before the request
  
    this.service.getCustomersWithAwaitingReview(page, pageSize, token).subscribe(
      (response) => {
        console.log('Data loaded:', response); // Debugging check
        this.customers = response.data?.results || []; // Handle cases where results might be undefined
        this.filteredNewCustomers = [...this.customers]; // Keep a copy for filtering
        this.loading = false; // Stop loading
      },
      (error) => {
        console.error('Error loading customers:', error);
        this.errorMessage = 'Failed to load customers. Please try again later.'; // Set error message
        this.loading = false; // Stop loading
        // Optional: Notify the user of the error using MessageService
        // this.messageService.add({ severity: 'error', summary: 'Error', detail: this.errorMessage });
      }
    );
  }


  getCustomerByRegionByBussinessHubByServiceCenter() {
    const token = this.authService.getToken();
    if (!token) {
      this.uploadError = 'User is not authenticated. Please log in again.';
      return;
    }
  
    // Format the dates to 'YYYY-MM-DD'
    const formattedDateCreatedFrom = this.datePipe.transform(this.dateCreatedFrom, 'yyyy-MM-dd') || '';
    const formattedDateCreatedTo = this.datePipe.transform(this.dateCreatedTo, 'yyyy-MM-dd') || '';
  
    // Construct the payload
    const payload = {
      token: this.token,
      region: this.region,
      businessHub: this.businessHub,
      serviceCenter: this.serviceCenter,
      dateCreatedFrom: formattedDateCreatedFrom,
      dateCreatedTo: formattedDateCreatedTo,
    };
  
    console.log('Payload:', payload);
  
    // Call the service
    this.service.getNewCustomerFilter2(payload).subscribe(
      res => {
        if (res.code === 200 && res.status === 'Success') {
          this.customers = res['data'];
          console.log(res['data']);
  
          // Clear the fields
          this.region = "";
          this.businessHub = "";
          this.serviceCenter = "";
          this.dateCreatedFrom = "";
          this.dateCreatedTo = "null";
  
         this.hideDialog() 
        }
      },
      err => {
        this.pageloading = false;
        this.errOccured = true;
        console.log(err);
      }
    );
  }
    

  onFilterButtonClick() {
    // Apply the selected values from temporary variables
    this.token = this.tempToken || '';
    this.region = this.tempRegion || '';
    this.businessHub = this.tempBusinessHub || '';
    this.serviceCenter = this.tempServiceCenter || '';
    this.dateCreatedFrom = this.tempDateCreatedFrom || '';
    this.dateCreatedTo = this.tempDateCreatedTo || '';

    // Debugging statements to see values
    console.log('Selected token:', this.token);
    console.log('Selected region:', this.region);
    console.log('Selected businessHub:', this.businessHub);
    console.log('Selected serviceCenter:', this.serviceCenter);
    console.log('Selected dateCreatedFrom:', this.dateCreatedFrom);
    console.log('Selected dateCreatedTo:', this.dateCreatedTo);


    // Call your filtering function here
    this.getCustomerByRegionByBussinessHubByServiceCenter();
  }

  showDialog() {
    this.display = true;
  }

  hideDialog() {
    this.display = false
  }







}
