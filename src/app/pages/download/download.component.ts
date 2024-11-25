import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../../api/customer.service';
import { HttpClient } from '@angular/common/http';

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
  constructor(private messageService: MessageService, private customerService: CustomerService,private http: HttpClient) { }

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
  parentDownload(uid: string, fileNames: string): void {
    this.customerService.getScheduleReportListDownload(uid).subscribe({
      next: (response: any) => {
         const fileName = fileNames || 'default_report.zip'; 


        const blob = new Blob([response], { type: 'application/zip' });
  
        
        const blobUrl = URL.createObjectURL(blob);
        console.log(blobUrl);
       
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName; 
        a.click(); 
  
        
        URL.revokeObjectURL(blobUrl);
      },
      error: (err) => {
        console.error('Error during download:', err);
        alert('An error occurred while downloading the file. Please try again.');
      }
    });
  }
  
  childDownloaded(uid: string, fileNames: string) {
    this.customerService.getScheduleReportListDownloadFile(uid, fileNames).subscribe({
      next: (response: any) => {
        const fileName = fileNames || 'default_report.xlsx'; 


       const blob = new Blob([response], { type: 'application/xlsx' });
 
       
       const blobUrl = URL.createObjectURL(blob);
       console.log(blobUrl);
      
       const a = document.createElement('a');
       a.href = blobUrl;
       a.download = fileName; 
       a.click(); 
 
       
       URL.revokeObjectURL(blobUrl);
     },
     error: (err) => {
       console.error('Error during download:', err);
       alert('An error occurred while downloading the file. Please try again.');
     }
    })
  }
  delete(item:any){
  console.log(item)
  }

  // getChildReportNames(node: any): string[] {
  //   if (node?.children?.length > 0) {
  //     return node.children.map((child: any) => child.data.reportName);
  //   }
  //   return [];
  // }

  download(item:any){
    const node = item?.node
    const nodeName = node?.data.reportName
    const uid = node?.data.uid
    const childNames = node?.children?.map((child: any) => child.data.reportName) || [];
    // const child = node?.children?.data.reportName;
    // console.log(child)
    console.log("Child Report Names:", childNames);
    if(item.level==0){
      this.parentDownload(uid,nodeName)
      console.log("This is parent node with ", nodeName, uid)
    }else{
      this.childDownloaded(uid,nodeName)
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
