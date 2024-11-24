import { Component,OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../api/customer.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss',
  providers: [MessageService]
})
export class DownloadComponent implements OnInit {

  files: any[] = []; // Replace with your tree table data
  cols: any[] = [];
  selectedNode: any = {};
  currentPage: number = 1;
  pageSize : number = 20;
  constructor(private messageService: MessageService, private customerService: CustomerService) {}
  
   ngOnInit(): void {
       
    this.cols = [
      { field: 'reportName', header: 'Report Name' },
      { field: 'createdBy', header: 'Created By' },
      {field:'fileSize', header: 'File Size' },
      { field: 'status', header: 'Status' },
      { field: 'date', header: 'Date' },
     
    ];

    this.fetchReports();
   
    // this.files = [
    //   {
    //     data: {
    //       reportName: "Monthly Sales Report",
    //       createdBy: "John Doe",
    //       filter: "Date Range: Jan 1 - Jan 31",
    //       status: "Completed",
    //       date: "2024-01-31" 
    //     },
    //     children: [
    //       {
    //         data: {
    //           reportName: "January Sales Breakdown",
    //           createdBy: "John Doe",
    //           filter: "Date: Jan 1 - Jan 31, Region: All",
    //           status: "Completed",
    //           date: "2024-01-31" 
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     data: {
    //       reportName: "Inventory Summary",
    //       createdBy: "Jane Smith",
    //       filter: "Category: Electronics",
    //       status: "In Progress",
    //       date: "2024-02-15" 
    //     },
    //     children: [
    //       {
    //         data: {
    //           reportName: "Electronics Inventory ",
    //           createdBy: "Jane Smith",
    //           filter: "Category: Electronics, Location: Warehouse A",
    //           status: "In Progress",
    //           date: "2024-02-15" 
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     data: {
    //       reportName: "Customer Feedback ",
    //       createdBy: "Mike Johnson",
    //       filter: "Region: North America",
    //       status: "Pending",
    //       date: "2024-03-10" 
    //     },
    //     children: [
    //       {
    //         data: {
    //           reportName: "Feedback Breakdown - North America",
    //           createdBy: "Mike Johnson",
    //           filter: "Region: North America, Rating: 4+",
    //           status: "Pending",
    //           date: "2024-03-10" 
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     data: {
    //       reportName: "Annual Financial Report",
    //       createdBy: "Sarah Brown",
    //       filter: "Year: 2024",
    //       status: "Completed",
    //       date: "2024-04-01" 
    //     },
    //     children: [
    //       {
    //         data: {
    //           reportName: "Q4 Financial Summary",
    //           createdBy: "Sarah Brown",
    //           filter: "Quarter: Q4 2024",
    //           status: "Completed",
    //           date: "2024-04-01" 
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     data: {
    //       reportName: "Employee Performance ",
    //       createdBy: "David Lee",
    //       filter: "Department: HR",
    //       status: "In Progress",
    //       date: "2024-05-05" 
    //     },
    //     children: [
    //       {
    //         data: {
    //           reportName: "HR Performance Metrics",
    //           createdBy: "David Lee",
    //           filter: "Period: Jan - June 2024",
    //           status: "In Progress",
    //           date: "2024-05-05" 
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     data: {
    //       reportName: "Market Trends Analysis",
    //       createdBy: "Emily Davis",
    //       filter: "Sector: Technology",
    //       status: "Pending",
    //       date: "2024-06-01" 
    //     },
    //     children: [
    //       {
    //         data: {
    //           reportName: "Tech Sector Overview",
    //           createdBy: "Emily Davis",
    //           filter: "Sector: Technology, Year: 2024",
    //           status: "Pending",
    //           date: "2024-06-01" 
    //         }
    //       }
    //     ]
    //   }    ];

   }  

   fetchReports(): void {
    this.customerService.getCustomerScheduleReportList(this.currentPage,this.pageSize).subscribe((response) => {
      if (response && response.data && response.data.results) {
        this.files = response.data.results.map((report: any) => {
          return {
            data: {
              reportName: report.report_name,
              createdBy: report.scheduled_by?.name || 'Unknown',
              fileSize: report.report_size,
              status: report.status,
              date: new Date(report.date_created).toLocaleDateString(),
            },
            children: report.files_metadata.map((file: any) => {
              return {
                data: {
                  reportName: file.name,
                  createdBy: report.scheduled_by?.name || 'Unknown',
                  fileSize: file.file_size,
                  status: report.status,
                  date: new Date(report.date_created).toLocaleDateString(),
                },
              };
            }),
          };
        });
      }
    })
   }

  // Event handler for node selection
  nodeSelect(event: any): void {
    this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.data.reportName  });
  }

  // Event handler for node unselection
  nodeUnselect(event: any): void {
    this.messageService.add({ severity: 'warn', summary: 'Node Unselected', detail: event.node.data.reportName  });
  }




}
