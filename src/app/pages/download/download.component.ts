import { Component, OnInit } from '@angular/core';
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
  pageSize: number = 20;
  constructor(private messageService: MessageService, private customerService: CustomerService) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'reportName', header: 'Report Name' },
      { field: 'createdBy', header: 'Created By' },
      { field: 'fileSize', header: 'File Size' },
      { field: 'status', header: 'Status' },
      { field: 'date', header: 'Date' },

    ];

    this.fetchReports();


  }
  delete(item:any){
  console.log(item)
  }

  download(item:any){
    const node = item?.node
    const nodeName = node?.data.reportName
    const uid = node?.data.uid
    if(item.level==0){
      console.log("This is parent node with ", nodeName, uid)
    }else{
      console.log("This is a child node", nodeName, uid)
    }
  }
  convertToTree(results: any[]) {
    return results?.map((report: any) => {
      return {
        data: {
          reportName: report.report_name,
          createdBy: report.scheduled_by?.name || 'Unknown',
          fileSize: report.report_size,
          status: report.status,
          date: new Date(report.date_created).toLocaleDateString(),
          deleteVisible: true,
          downloadVisible: true,
          uid: report.uid
        },
        children: (report.files_metadata || []).map((file: any) => {
          return {
            data: {
              deleteVisible: false,
              downloadVisible: true,
              reportName: file.name,
              createdBy: report.scheduled_by?.name || 'Unknown',
              fileSize: file.file_size,
              status: report.status,
              uid: report.uid,
              date: new Date(report.date_created).toLocaleDateString(),
            },
          };
        }),
      };
    });
  }
  
  fetchReports(): void {
    this.customerService
      .getCustomerScheduleReportList(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          if (response?.code == 200 && response?.status == 'Success') {
            this.files = this.convertToTree(response.data?.results || []);
          }
        },
        error: (err) => {
          console.error('Failed to fetch reports:', err);
          // Optionally, add a toast notification or other error-handling logic
        },
      });
  }

  // Event handler for node selection
  nodeSelect(event: any): void {
    this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.data.reportName });
  }

  // Event handler for node unselection
  nodeUnselect(event: any): void {
    this.messageService.add({ severity: 'warn', summary: 'Node Unselected', detail: event.node.data.reportName });
  }




}
