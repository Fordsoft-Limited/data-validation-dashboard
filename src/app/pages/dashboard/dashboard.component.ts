import { Component, OnInit } from '@angular/core';
import { BulkValidation } from './model/bulk';
import { BulkService } from './service/bulk.service';
import { Subscription, debounceTime } from 'rxjs';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../api/user.service';
import { CustomerService } from '../../api/customer.service';
import { AuthService } from '../../auth/service/auth.service';
import { TooltipItem, ChartTypeRegistry } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  bulk!: BulkValidation[];

  pieData: any;

  pieOptions: any;

  cols: any[] = [];

  items!: MenuItem[];

  chartData: any;

  chartOptions: any;
  totalUserCount: number = 0;
  totalCustomerCount: number = 0;

  customerList: any[] = [];
  loading: boolean = false;
  error: string | null = null;
  totalAwaitingReviewStatus: number = 0;
  totalRejectStatus: number = 0;
  totalApprovalStatus: number = 0;
  hasErrors: boolean = false;
  userAddedError: boolean = false;
  errorMessage: string = '';
  recentActivities: any[] = []; // Holds the list of recent activities


  constructor(
    public bulkService: BulkService,
    private userService: UserService,
    private customerService: CustomerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.bulkService.getBulk().then((data) => (this.bulk = data));

    this.cols = [
      { header: 'Request Id', field: 'requestId' },
      { header: 'Submission Date', field: 'submissionDate' },
      { header: 'Status', field: 'status' },
      { header: 'Records Processed', field: 'recordsProcessed' },
      { header: 'Success Rate', field: 'successRate' },
      { header: 'Errors', field: 'errors' },
    ];
    // this.chartInit();

    this.loadUserCount();
    this.loadCustomerCount();
    this.fetchCustomersByStatus('Awaiting review');
    this.fetchCustomersRejectStatus('Rejected');
    this.fetchApprovalStatus('Approved');
    this.loadPieChartData();
    this.loadRecentActivities();

  }

  loadUserCount(): void {
    this.userService.getTotalUser().subscribe(
      (count) => {
        console.log('User count received:', count); // Log the count

        this.totalUserCount = count; // Assign the result to the totalUserCount variable
      },
      (error) => {
        console.error('Error fetching user count:', error);
      }
    );
  }

  loadCustomerCount(): void {
    this.customerService.getCustomerList().subscribe(
      (count) => {
        console.log('Customer count received:', count); // Log the customer count
        this.totalCustomerCount = count; // Assign the result to totalCustomerCount
      },
      (error) => {
        console.error('Error fetching customer count:', error);
      }
    );
  }

  fetchCustomersByStatus(status: string): void {
    const token = this.authService.getToken();
    console.log(token);
    if (!token) {
      this.loading = false;
      this.hasErrors = true;
      this.errorMessage = 'No authentication token found. Please log in again.';
      setTimeout(() => {
        this.userAddedError = false;
      }, 3000);
      return; // Exit the function early
    }
    this.loading = true;

    this.customerService.getCustomerAwaitingReviewStatus(status, token).subscribe({
      next: (response) => {
        this.totalAwaitingReviewStatus = response.data.count; // Set total count
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch customer data';
        this.loading = false;
        console.error(err);
      },
    });
  }

  fetchCustomersRejectStatus(status: string): void {
    const token = this.authService.getToken();
    console.log(token);
    if (!token) {
      this.loading = false;
      this.hasErrors = true;
      this.errorMessage = 'No authentication token found. Please log in again.';
      setTimeout(() => {
        this.userAddedError = false;
      }, 3000);
      return; // Exit the function early
    }
    this.loading = true;

    this.customerService.getCustomerRejectStatus(status, token).subscribe({
      next: (response) => {
        this.totalRejectStatus = response.data.count; // Set total count
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch customer data';
        this.loading = false;
        console.error(err);
      },
    });
  }

  fetchApprovalStatus(status: string): void {
    const token = this.authService.getToken();
    console.log(token);
    if (!token) {
      this.loading = false;
      this.hasErrors = true;
      this.errorMessage = 'No authentication token found. Please log in again.';
      setTimeout(() => {
        this.userAddedError = false;
      }, 3000);
      return; // Exit the function early
    }
    this.loading = true;
    this.customerService.getCustomerApprovalStatus(status, token).subscribe({
      next: (response) => {
        this.totalApprovalStatus = response.data.count; // Set total count
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch customer data';
        this.loading = false;
        console.error(err);
      },
    });
  }

  // chartInit() {
  //   const textColor =
  //     getComputedStyle(document.body).getPropertyValue('--text-color') ||
  //     'rgba(0, 0, 0, 0.87)';
  //   const surface300 = getComputedStyle(document.body).getPropertyValue(
  //     '--surface-300'
  //   );
  //   const documentStyle = getComputedStyle(document.documentElement);

  //   this.items = [
  //     {
  //       label: 'Options',
  //       items: [
  //         { label: 'Add New', icon: 'pi pi-fw pi-plus' },
  //         { label: 'Search', icon: 'pi pi-fw pi-search' },
  //       ],
  //     },
  //   ];

  //   this.chartData = {
  //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //     datasets: [
  //       {
  //         label: 'New',
  //         data: [11, 17, 30, 60, 88, 92],
  //         backgroundColor: 'rgba(13, 202, 240, .2)',
  //         borderColor: '#0dcaf0',
  //         pointBackgroundColor: '#0dcaf0',
  //         pointBorderColor: '#0dcaf0',
  //         pointBorderWidth: 0,
  //         pointStyle: 'line',
  //         fill: false,
  //         tension: 0.4,
  //       },
  //       {
  //         label: 'Completed',
  //         data: [11, 19, 39, 59, 69, 71],
  //         backgroundColor: 'rgba(253, 126, 20, .2)',
  //         borderColor: '#fd7e14',
  //         pointBackgroundColor: '#fd7e14',
  //         pointBorderColor: '#fd7e14',
  //         pointBorderWidth: 0,
  //         pointStyle: 'line',
  //         fill: false,
  //         tension: 0.4,
  //       },
  //       {
  //         label: 'Canceled',
  //         data: [11, 17, 21, 30, 47, 83],
  //         backgroundColor: 'rgba(111, 66, 193, .2)',
  //         borderColor: '#6f42c1',
  //         pointBackgroundColor: '#6f42c1',
  //         pointBorderColor: '#6f42c1',
  //         pointBorderWidth: 0,
  //         pointStyle: 'line',
  //         fill: true,
  //         tension: 0.4,
  //       },
  //     ],
  //   };

  //   this.chartOptions = {
  //     plugins: {
  //       legend: {
  //         fill: true,
  //         labels: {
  //           color: textColor,
  //         },
  //       },
  //     },
  //     scales: {
  //       y: {
  //         max: 100,
  //         min: 0,
  //         grid: {
  //           color: surface300,
  //         },
  //         ticks: {
  //           color: textColor,
  //         },
  //       },
  //       x: {
  //         grid: {
  //           display: true,
  //           color: surface300,
  //         },
  //         ticks: {
  //           color: textColor,
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   };

  //   this.pieData = {
  //     labels: ['Success ', 'Pending', 'Error'],
  //     datasets: [
  //       {
  //         data: [740, 325, 502],
  //         backgroundColor: [
  //           documentStyle.getPropertyValue('--green-500'),
  //           documentStyle.getPropertyValue('--yellow-500'),
  //           documentStyle.getPropertyValue('--red-500'),
  //         ],
  //         hoverBackgroundColor: [
  //           documentStyle.getPropertyValue('--green-400'),
  //           documentStyle.getPropertyValue('--yellow-400'),
  //           documentStyle.getPropertyValue('--red-400'),
  //         ],
  //       },
  //     ],
  //   };

  //   this.pieOptions = {
  //     plugins: {
  //       legend: {
  //         labels: {
  //           usePointStyle: true,
  //           color: textColor,
  //         },
  //       },
  //     },
  //   };
  // }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


  loadPieChartData() {
    this.customerService.getPieChartData().subscribe(
      data => {
        this.pieData = data;  // Bind the pie chart data
        this.pieOptions = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                // Update tooltip callback to use the correct type from ChartTypeRegistry
                label: (tooltipItem: TooltipItem<'pie'>) => {  // 'pie' corresponds to pie chart type
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                }
              }
            }
          }
        };
      },
      error => {
        console.error('Error loading pie chart data:', error);
      }
    );
  }


  // Fetch the recent activities when the component initializes
  loadRecentActivities(): void {
    this.customerService.getRecentActivities().subscribe(
      (data) => {
        this.recentActivities = data; // Store the fetched activities
      },
      (error) => {
        console.error('Error loading recent activities:', error);
      }
    );
  }
  


  
}
