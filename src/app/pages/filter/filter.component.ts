import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { CustomerService } from '../../api/customer.service';
import { DatePipe } from '@angular/common';
import { CUSTOMER_REGION } from '../../shared/constants';
import { NgModel } from '@angular/forms';
import { UserService } from '../../api/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [DatePipe],
})
export class FilterComponent {
  @Input() display = false;
  @Input() statusVisible =false;
  @Output() filterApplied = new EventEmitter<any>(); 
  @Output() clearFiltersEvent = new EventEmitter<void>(); 
  @Output() closeFiltersEvent = new EventEmitter<boolean>(); 
  
  @ViewChildren(NgModel) formControls!: QueryList<NgModel>;
  loading = false;

  regions = CUSTOMER_REGION;
  businessHubs: any[] = [];
  serviceCenters: any[] = [];
  statuses: string[] = ["Approved", "Rejected", "Awaiting review", "Reviewed"];
  userList: any[] = [];

  // Applied filter values
  region = '';
  business_hub = '';
  service_center = '';
  date_created_from: string | null = null;
  date_created_to: string | null = null;
  approval_status = '';
  approved_by: string = '';
  reviewed_by: string=''
  created_by: string=''
  application_date_from = '';
  application_date_to = '';
  setup_date_from = '';
  setup_date_to = '';

  constructor(
    private service: CustomerService,
    private userService: UserService,
    private datePipe: DatePipe,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.listUsers()
  }
  /**
     * Returns business hubs for a given region name.
     * @param regionName The name of the region.
     * @returns An array of business hubs or an empty array if not found.
     */
  getBusinessHubsByRegion(regionName: string): { name: string, serviceCentres: { name: string }[] }[] {
    const region = CUSTOMER_REGION.find(r => r.name.toLowerCase() === regionName.toLowerCase());
    return region ? region.businessHubs : [];
  }

  /**
   * Returns service centres for a given business hub name.
   * @param hubName The name of the business hub.
   * @returns An array of service centres or an empty array if not found.
   */
  getServiceCentresByBusinessHub(hubName: string): { name: string }[] {
    for (const region of CUSTOMER_REGION) {
      const businessHub = region.businessHubs.find(hub => hub.name.toLowerCase() === hubName.toLowerCase());
      if (businessHub) {
        return businessHub.serviceCentres;
      }
    }
    return [];
  }

  onRegionChange(item: any): void {
    this.businessHubs = this.getBusinessHubsByRegion(item)
  }

  onBusinessHubChange(item: any): void {
    this.serviceCenters = this.getServiceCentresByBusinessHub(item)
  }
  clearFilters(): void {
    this.formControls.forEach((control) => control.reset());
    this.clearFiltersEvent.emit();
  }
  download(): void {
    const queryParams: any = {};
    this.formControls.forEach((control) => {
      const key = control.name;
      const value = control.value;

      if (value) {
        if (
          key === 'date_created_from' ||
          key === 'date_created_to' ||
          key === 'applidation_date_from'
          ||
          key === 'applidation_date_to'
          ||
          key === 'setup_date_from'
          ||
          key === 'setup_date_to'
        ) {
          queryParams[key] = this.datePipe.transform(value, 'yyyy-MM-dd');
        } else {
          queryParams[key] = value;
        }
      }
    });
    const queryString = new URLSearchParams(queryParams).toString();
    this.loading = true;
    this.service.scheduleReportDownload(queryString).subscribe(
      (response) => {
        if (response.code == 200 && response.status == 'Success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Download Scheduled',
            detail: 'Your report download has been scheduled successfully.',
          });
          this.loading=false;
        }
      },
      (error) => {
        console.error('Error filtering customers:', error);
        this.loading = false;
      }
    );
  }
  onDialogClose(): void {
   this.closeFiltersEvent.emit(false)
  }
  listUsers(): void {
    this.userService.getUserList(1, 150).subscribe(
      (response) => {
        if (response.code == 200 && response.status === 'Success') {
          this.userList = response?.data?.results
        }
      },
      (error) => {
        this.loading = false;
        this.filterApplied.emit({});
      }
    );
  }

  onFilterButtonClick(): void {
    const queryParams: any = {};
    this.formControls.forEach((control) => {
      const key = control.name;
      const value = control.value;

      if (value) {
        if (
          key === 'date_created_from' ||
          key === 'date_created_to' ||
          key === 'applidation_date_from'
          ||
          key === 'applidation_date_to'
          ||
          key === 'setup_date_from'
          ||
          key === 'setup_date_to'
        ) {
          queryParams[key] = this.datePipe.transform(value, 'yyyy-MM-dd');
        } else {
          queryParams[key] = value;
        }
      }
    });
    const queryString = new URLSearchParams(queryParams).toString();
    this.loading = true;
    this.service.filterAll(queryString).subscribe(
      (response) => {
        if (response.code == 200 && response.status == 'Success') {
          this.filterApplied.emit(response.data);
          this.loading=false;
        }
      },
      (error) => {
        console.error('Error filtering customers:', error);
        this.loading = false;
        this.filterApplied.emit({});
      }
    );
  }

  showDialog(): void {
    this.display = true;
  }

  hideDialog(): void {
    this.clearFilters();
  }

}
